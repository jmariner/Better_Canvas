var MAIN_FLOW = [
    function initialize(callback) {
        DATA = new Data();
        PAGE = new Page();
        DATA.extensionId = chrome.runtime.id;
        DATA.name = chrome.runtime.getManifest().name;
        "log debug info warn error dir".split(" ").forEach(function (s) {
            var orig = console[s];
            console[s] = orig.bind(console, "[" + DATA.name + "] [" + s.toUpperCase() + "]");
        });
        var urlMatch = /courses\/(\d+)(?:\/(\w+))?.*/.exec(document.location.pathname);
        var onCoursePage = urlMatch !== null;
        DATA.coursePage = onCoursePage ? CanvasPage[(urlMatch[2] || "home").toUpperCase()] : null;
        DATA.courseID = onCoursePage ? Number(urlMatch[1]) : null;
        DATA.onMainPage = [CanvasPage.MODULES, CanvasPage.GRADES].includes(DATA.coursePage);
        if (onCoursePage)
            console.debug("On course #" + DATA.courseID + " page, at " + CanvasPage[DATA.coursePage]);
        V = Vars.VARS;
        V.init(DATA.courseID);
        Utils.loadToken(function (success) {
            if (success)
                Utils.runCb(callback);
            else
                Utils.accessTokenPrompt();
        });
    },
    function getCourseTabs(callback, end) {
        Utils.getJSON(V.canvas.api.urls.custom_colors, function (colorData) {
            Utils.getJSON(V.canvas.api.urls.favorite_courses, function (resultData) {
                resultData.forEach(function (courseData) {
                    var color = colorData.custom_colors["course_" + courseData.id];
                    DATA.courseTabs.set(courseData.id, new CustomCourseTab(courseData, color));
                });
                Utils.runCb(DATA.onMainPage ? callback : end);
            });
        });
    },
    function getItemData(callback) {
        var firstDone = false;
        var partDone = function () {
            if (firstDone)
                Utils.runCb(callback);
            else
                firstDone = true;
        };
        var assignmentsUrl = Utils.perPage(V.canvas.api.urls.assignments, 1000);
        Utils.getJSON(assignmentsUrl, function (resultData) {
            resultData.forEach(function (assignmentJson) {
                var contentId;
                if (assignmentJson.quiz_id)
                    contentId = assignmentJson.quiz_id;
                else if (assignmentJson.discussion_topic)
                    contentId = assignmentJson.discussion_topic.id;
                else
                    contentId = assignmentJson.id;
                var item;
                if (ModuleItem.byContentId.has(contentId))
                    item = ModuleItem.byContentId.get(contentId);
                else
                    item = ModuleItem.fromContentId(contentId);
                item.setAssignmentId(assignmentJson.id);
                item.isSubmitted = typeof (assignmentJson.has_submitted_submissions) === "boolean" ?
                    assignmentJson.has_submitted_submissions : null;
            });
            partDone();
        });
        new Promise(function (next) {
            var modulesUrl = Utils.perPage(V.canvas.api.urls.modules, 25);
            Utils.getJSON(modulesUrl, function (resultData) {
                resultData.forEach(function (moduleData) {
                    DATA.modules.set(moduleData.id, new Module(moduleData));
                });
                next();
            });
        })
            .then(function () { return new Promise(function (next) {
            var moduleIDs = Array.from(DATA.modules.keys());
            var waitingCount = moduleIDs.length;
            moduleIDs.forEach(function (moduleID) {
                var itemCount = DATA.modules.get(moduleID).itemCount;
                if (itemCount === 0) {
                    if (--waitingCount === 0)
                        next();
                    return;
                }
                var moduleItemsUrl = Utils.perPage(Utils.format(V.canvas.api.urls.module_items, { moduleID: moduleID }), itemCount);
                Utils.getJSON(moduleItemsUrl, function (resultData) {
                    resultData.forEach(function (modItemJson) {
                        var item;
                        var contentId = modItemJson.content_id;
                        if (ModuleItem.byContentId.has(contentId))
                            item = ModuleItem.byContentId.get(contentId);
                        else if (contentId)
                            item = ModuleItem.fromContentId(contentId);
                        else
                            item = new ModuleItem();
                        item.update(modItemJson);
                        DATA.moduleItems.set(modItemJson.id, item);
                        DATA.modules.get(modItemJson.module_id).items.push(item);
                    });
                    if (--waitingCount === 0)
                        next();
                });
            });
        }); }).then(function () { return new Promise(function (next) {
            var customDataUrl = Utils.format(V.canvas.api.urls.custom_data, { dataPath: "" });
            Utils.getJSON(customDataUrl, function (resultData) {
                var customData = resultData.data;
                if (customData === undefined) {
                    Utils.runCb(callback);
                    return;
                }
                var complete = customData.completed_assignments && customData.completed_assignments[DATA.courseID] || [];
                var hidden = customData.hidden_assignments && customData.hidden_assignments[DATA.courseID] || [];
                DATA.moduleItems.forEach(function (modItem, modItemId) {
                    modItem.checked = complete.includes(modItemId);
                    modItem.hidden = hidden.includes(modItemId);
                });
                var activeStates = customData.active_states || [];
                $.each(V.state, function (name, stateData) {
                    var stateObj = new State(name, stateData, activeStates.includes(name));
                    DATA.states.set(name, stateObj);
                });
                next();
            });
        }); }).then(function () { return new Promise(function (next) {
            var fileItems = Array.from(DATA.moduleItems.values())
                .filter(function (item) { return item.type == ModuleItemType.FILE; });
            var waitingCount = fileItems.length;
            fileItems.forEach(function (item) {
                var fileDataUrl = Utils.scopeFormat(V.canvas.api.urls.file_direct, { fileID: item.contentId });
                Utils.getJSON(fileDataUrl, function (resultData) {
                    item.setFileData(resultData);
                    if (--waitingCount === 0)
                        next();
                });
            });
        }); })
            .then(partDone);
    },
];
(function init() {
    var start = $.now();
    var lastTiming;
    var flowComplete = function () {
        PAGE.initialize();
        chrome.runtime.onMessage.addListener(Main.onMessage);
        Main.initPage();
        console.debug("Initialization done, took " + ($.now() - start) + "ms");
    };
    var runStep = function (item, lastItem) {
        if (lastItem !== undefined)
            console.debug("Completed init item #" + (lastItem + 1) + " (" + MAIN_FLOW[lastItem].name + ") in " + ($.now() - lastTiming) + "ms");
        if (item >= MAIN_FLOW.length) {
            flowComplete();
            return;
        }
        lastTiming = $.now();
        MAIN_FLOW[item](function () { return runStep(item + 1, item); }, function () { return runStep(MAIN_FLOW.length, item); });
    };
    runStep(0);
})();
var Main = (function () {
    function Main() {
    }
    Main.initPage = function () {
        $(window).scroll(UI.updateScrollPosition);
        $(document).ready(UI.updateScrollPosition);
        $("[class]").attr("class", function (i, oldClass) { return (oldClass.match(/\S+/g) || []).join(" "); });
        $("#discussion_subentries .discussion_entry .message.user_content p > img")
            .css("max-width", "100%");
        $("#grades_summary tbody")
            .find("tr.group_total, tr.final_grade")
            .find("td.points_possible").attr("colspan", "3").css("text-align", "center").end()
            .find("td.details, td.status").remove();
        var origCourseNav = $("#global_nav_courses_link");
        var newCourseNav = $("<a>")
            .attr("href", "/courses")
            .addClass("ic-app-header__menu-list-link")
            .html(origCourseNav.prop("innerHTML"));
        var courseNavLi = origCourseNav.parent();
        origCourseNav.remove();
        courseNavLi
            .append(newCourseNav)
            .find(".menu-item__text")
            .text("All Courses");
        var $insertionPoint = PAGE.sidebar.children().eq(2);
        DATA.courseTabs.forEach(function (courseTab) {
            $insertionPoint.after(Utils.format(V.element.course_link, {
                tabColor: courseTab.color,
                tabID: courseTab.id,
                name: courseTab.name,
                code: courseTab.code
            }));
        });
        DATA.elements.jump_button =
            $(V.element.jump_button)
                .find("i")
                .click(function () {
                if (document.body.scrollTop > 0)
                    $("body").animate({ scrollTop: 0 }, V.ui.scroll_time);
            })
                .end()
                .appendTo(PAGE.main);
        if (DATA.coursePage === null)
            return;
        $("ul#menu > li").removeClass("ic-app-header__menu-list-item--active");
        var color = DATA.courseTabs.get(DATA.courseID).color;
        document.documentElement.style.setProperty("--ic-brand-primary", color);
        if (!DATA.onMainPage)
            return;
        Array.from(DATA.states.values())
            .filter(function (s) { return s.active && s.onPages.includes(DATA.coursePage); })
            .forEach(function (s) { return PAGE.body.addClass(s.bodyClass); });
        Array.from(DATA.moduleItems.values()).forEach(function (item) {
            var item_id = item.id;
            var mainEl = $("#" + item.canvasElementId);
            var parentEl;
            var hasCheckbox;
            var hasHideButton;
            item.checkboxElement = null;
            item.hideElement = null;
            if (DATA.coursePage === CanvasPage.MODULES) {
                parentEl = mainEl.find("div.ig-row");
                hasHideButton = true;
                hasCheckbox = !item.isSubHeader;
            }
            else if (DATA.coursePage === CanvasPage.GRADES) {
                parentEl = $("<td>")
                    .addClass(V.cssClass.checkbox_td)
                    .prependTo(mainEl);
                hasHideButton = false;
                hasCheckbox = item.isGraded;
            }
            if (hasCheckbox) {
                item.checkboxElement =
                    $(Utils.format(V.element.checkbox, { item_id: item_id })).appendTo(parentEl);
                UI.updateCheckbox(item);
                item.checkboxElement.show();
            }
            if (hasHideButton) {
                item.hideElement =
                    $(Utils.format(V.element.hide_button, { item_id: item_id })).appendTo(parentEl);
                UI.updateHideButton(item);
                item.hideElement.show();
            }
        });
        if (DATA.coursePage === CanvasPage.GRADES) {
            PAGE.grades
                .find("td[colspan='5']")
                .attr("colspan", 6)
                .end().find("> thead > tr")
                .prepend($("<th>")
                .attr("scope", "col")
                .append("<i class='icon-check'></i>"))
                .end().find("tr.student_assignment")
                .prepend(function () {
                return $(this).has("td:first-child").length === 0 ?
                    $("<td>").addClass(V.cssClass.checkbox_td) : undefined;
            });
        }
        PAGE.main.on("change", "." + V.cssClass.checkbox_parent + " > input", function () {
            Main.onCheckboxChange(this);
        });
        if (DATA.coursePage !== CanvasPage.MODULES)
            return;
        $(V.canvas.selector.module_items).filter(function (i, el) { return !el.innerHTML.trim().length; }).html("");
        var disabledIndent = DATA.states.get("disable_indent_override").active;
        $(V.canvas.selector.module_item).each(function () {
            var _this = this;
            var defIndent = [0, 1, 2, 3, 4, 5].filter(function (level) { return $(_this).hasClass("indent_" + level); })[0];
            $(this).attr(V.data_attr.def_indent, defIndent);
            if (!disabledIndent)
                $(this).removeClass("indent_" + defIndent);
        });
        if (!disabledIndent) {
            $(V.canvas.selector.subheader).addClass("indent_" + V.ui.subheader_indent);
            $(V.canvas.selector.not_subheader).addClass("indent_" + V.ui.main_indent);
        }
        var toc = $(V.element.toc);
        var ul = toc.find("ul");
        DATA.modules.forEach(function (mod, modId) {
            var formatted = Utils.format(V.element.toc_item, { item_name: mod.name, item_id: modId });
            $(formatted)
                .find("a")
                .click(function (e) {
                var moduleEl = $("#context_module_" + modId);
                UI.scrollToElement(moduleEl);
                if (moduleEl.hasClass("collapsed_module"))
                    moduleEl.find(".expand_module_link").click();
                e.preventDefault();
            })
                .end()
                .appendTo(ul);
        });
        DATA.elements.toc = toc
            .css("top", PAGE.left.height() + V.ui.toc_top_margin)
            .appendTo(PAGE.main)
            .data("cutoff", toc.offset().top - V.ui.toc_top_margin);
        UI.updateModules();
        PAGE.main.on("click", "." + V.cssClass.hide_button + " > i", function () {
            Main.onHideButtonClick($(this));
        });
        var modItems = Array.from(DATA.moduleItems.values());
        modItems.filter(function (item) { return item.type == ModuleItemType.FILE; })
            .forEach(function (item) {
            var element = Utils.format(V.element.download_button, {
                file_url: item.fileData.url,
                filename: item.fileData.display_name
            });
            $(element).insertBefore(item.checkboxElement);
        });
        $("." + V.cssClass.download).show();
        modItems.filter(function (item) { return item.type == ModuleItemType.EXTERNAL_URL; })
            .forEach(function (item) {
            var element = Utils.format(V.element.url_button, {
                external_url: item.externalUrl
            });
            $(element).insertBefore(item.checkboxElement);
            $("#" + item.canvasElementId).find("a.external_url_link.title")
                .attr("href", function () { return $(this).attr("data-item-href"); })
                .removeAttr("target rel")
                .removeClass("external")
                .addClass("ig-title")
                .find(".ui-icon").remove();
        });
        $("." + V.cssClass.external_url).show();
    };
    Main.getState = function (stateName) {
        if (DATA.states.has(stateName)) {
            var state = DATA.states.get(stateName);
            return state.active;
        }
        else {
            return null;
        }
    };
    Main.setState = function (stateName, state) {
        if (!DATA.states.has(stateName))
            return;
        var stateObj = DATA.states.get(stateName);
        if (!stateObj.onPages.includes(DATA.coursePage))
            return;
        if (stateObj.bodyClass)
            PAGE.body.toggleClass(stateObj.bodyClass, state);
        stateObj.active = state;
        stateObj.onChange(state, V, PAGE.body);
        var url = Utils.format(V.canvas.api.urls.custom_data, { dataPath: "/active_states" });
        Utils.editDataArray(url, state, [stateName]);
    };
    Main.onCheckboxChange = function (el) {
        var id = Number($(el).attr(V.data_attr.mod_item_id));
        var item = DATA.moduleItems.get(id);
        var status = el.checked;
        var oldTitle = el.title;
        el.checked = !status;
        if (status === item.checked) {
            console.error("Checkbox desync at item", item);
            return;
        }
        el.disabled = true;
        el.title = V.tooltip.waiting;
        var url = Utils.format(V.canvas.api.urls.custom_data, {
            dataPath: "/" + V.canvas.api.data_urls.completed_assignments + "/" + DATA.courseID
        });
        Utils.editDataArray(url, status, [id], function (success) {
            el.disabled = false;
            el.title = oldTitle;
            if (success) {
                item.checked = status;
                UI.updateModule(item.module);
                UI.updateCheckbox(item);
                console.debug("Item ID " + id + " (" + item.name.substr(0, 25) + "...) has been " + (el.checked ? "" : "un") + "checked");
            }
        });
    };
    Main.onHideButtonClick = function (el) {
        var id = Number(el.attr(V.data_attr.mod_item_id));
        var item = DATA.moduleItems.get(id);
        if (item.isGraded || item.hideElement.hasClass(V.cssClass.hide_disabled))
            return;
        var newState = !item.hidden;
        item.hideElement
            .addClass(V.cssClass.hide_disabled)
            .find("i")
            .attr("title", V.tooltip.waiting);
        var url = Utils.format(V.canvas.api.urls.custom_data, {
            dataPath: "/" + V.canvas.api.data_urls.hidden_assignments + "/" + DATA.courseID
        });
        Utils.editDataArray(url, newState, [id], function (success) {
            if (success)
                item.hidden = newState;
            UI.updateHideButton(item, success, function () {
                if (success) {
                    UI.updateModule(item.module);
                    console.debug("Item ID " + id + " (" + item.name.substr(0, 25) + "...) has been " + (item.hidden ? "" : "un") + "hidden");
                }
            });
        });
    };
    Main.onMessage = function (data, source, respondFunc) {
        if (source.id !== DATA.extensionId)
            return;
        if (data.type === MessageType.BASIC) {
            var unchecked = Array.from(DATA.moduleItems.values()).filter(function (i) { return !i.checked && !i.hidden && !i.isSubHeader; });
            switch (data.action) {
                case "ping":
                    respondFunc({ pong: $.now() });
                    break;
                case "count unchecked":
                    respondFunc({ count: unchecked.length });
                    break;
                case "update token":
                    Utils.loadToken(respondFunc);
                    break;
                case "jump to first unchecked":
                    var uncheckedEls = unchecked
                        .map(function (i) { return document.getElementById(i.canvasElementId); });
                    UI.scrollToElement($(uncheckedEls).first());
                    respondFunc();
                    break;
                default:
                    console.warn("Unknown basic message in content script:", data);
            }
        }
        else if (data.type === MessageType.STATE) {
            var stateData = data;
            if (data.action === "get") {
                var state = Main.getState(stateData.stateName);
                respondFunc({ state: state });
            }
            else if (data.action === "set") {
                Main.setState(stateData.stateName, stateData.state);
                respondFunc();
            }
            else {
                console.warn("Unknown state message in content script:", data);
            }
        }
        else {
            console.warn("Unknown message in content script:", data);
        }
    };
    return Main;
}());
var UI = (function () {
    function UI() {
    }
    UI.updateCheckbox = function (item) {
        if (item.checkboxElement === null)
            throw "No checkbox to update";
        item.checkboxElement
            .find("input")
            .prop("checked", item.checked)
            .attr("title", item.checked ? V.tooltip.mark_incomplete : V.tooltip.mark_complete)
            .closest(V.canvas.selector.module_item)
            .toggleClass(V.cssClass.checkbox_checked, item.checked);
    };
    UI.updateHideButton = function (item, animate, after) {
        if (item.hideElement === null)
            throw "No hide button to update";
        var modItemEl = item.hideElement.closest(V.canvas.selector.module_item);
        var iEl = item.hideElement.find("i");
        iEl.add(modItemEl).toggleClass(V.cssClass.item_hidden, item.hidden);
        var update = function () {
            item.hideElement.toggleClass(V.cssClass.hide_disabled, item.isGraded);
            iEl.attr("title", item.isGraded ? V.tooltip.hide_disabled : item.hidden ? V.tooltip.unhide : V.tooltip.hide);
            Utils.runCb(after);
        };
        if (animate)
            setTimeout(update, V.ui.fade_time);
        else
            update();
    };
    UI.updateTableOfContents = function (module) {
        var allItems = module.items.filter(function (i) { return !i.isSubHeader && !i.hidden; });
        var totalItems = allItems.length;
        var checkedItems, percent;
        if (totalItems > 0) {
            checkedItems = allItems.filter(function (i) { return i.checked; }).length;
            percent = Math.round(checkedItems / totalItems * 100);
        }
        else {
            checkedItems = 0;
            percent = 0;
        }
        var backgroundImage = Utils.format(V.misc.toc_background, { percent: percent });
        DATA.elements.toc
            .find("[" + V.data_attr.toc_module_id + "='" + module.id + "']")
            .attr(V.data_attr.toc_total, totalItems)
            .attr(V.data_attr.toc_checked_count, checkedItems)
            .attr(V.data_attr.toc_percentage, percent)
            .closest("li")
            .toggleClass(V.cssClass.item_hidden, totalItems === 0)
            .css({ backgroundImage: backgroundImage });
    };
    UI.updateModules = function () {
        Array.from(DATA.modules.values()).forEach(UI.updateModule);
    };
    UI.updateModule = function (module) {
        if (DATA.elements.toc !== null)
            UI.updateTableOfContents(module);
        var noItems = module.items.filter(function (i) { return !i.isSubHeader && !i.hidden; }).length === 0;
        $("#context_module_" + module.id).toggleClass(V.cssClass.item_hidden, noItems);
    };
    UI.updateScrollPosition = function () {
        var scrollTop = document.body.scrollTop;
        if (DATA.elements.toc !== null) {
            DATA.elements.toc
                .toggleClass(V.cssClass.fixed, scrollTop > DATA.elements.toc.data("cutoff"));
        }
        if (DATA.elements.jump_button !== null) {
            DATA.elements.jump_button
                .toggleClass(V.cssClass.active, scrollTop > V.ui.jump_top_cutoff);
        }
    };
    UI.scrollToElement = function (element) {
        var elRect = element[0].getBoundingClientRect();
        var cliHeight = document.documentElement.clientHeight;
        var topRatio = V.ui.top_inside_ratio;
        if ((elRect.height < cliHeight && elRect.top >= 0 && elRect.bottom < cliHeight) ||
            (elRect.top >= 0 && elRect.top <= cliHeight * topRatio)) {
            UI.flashElement(element);
        }
        else {
            var scrollTop = element.offset().top - V.ui.scroll_top_offset;
            PAGE.body.animate({ scrollTop: scrollTop }, V.ui.scroll_time, function () { return UI.flashElement(element); });
        }
    };
    UI.flashElement = function (element) {
        element.addClass(V.cssClass.flash);
        setTimeout(function () { return element.removeClass(V.cssClass.flash); }, 1000);
    };
    return UI;
}());
//# sourceMappingURL=main.js.map