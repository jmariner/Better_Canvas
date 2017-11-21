var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function init() {
    return __awaiter(this, void 0, void 0, function* () {
        DATA = new Data();
        PAGE = new Page();
        DATA.extensionId = chrome.runtime.id;
        DATA.name = chrome.runtime.getManifest().name;
        for (let logType of "log debug info warn error dir".split(" ")) {
            const orig = console[logType];
            console[logType] = orig.bind(console, `[${DATA.name}] [${logType.toUpperCase()}]`);
        }
        const urlMatch = /courses\/(\d+)(?:\/(\w+))?.*/.exec(document.location.pathname);
        const onCoursePage = urlMatch !== null;
        DATA.coursePage = onCoursePage ? CanvasPage[(urlMatch[2] || "home").toUpperCase()] : null;
        DATA.courseID = onCoursePage ? Number(urlMatch[1]) : null;
        DATA.onMainPage = [CanvasPage.MODULES, CanvasPage.GRADES].includes(DATA.coursePage);
        if (onCoursePage)
            console.debug(`On course #${DATA.courseID} page, at ${CanvasPage[DATA.coursePage]}`);
        const initStart = performance.now();
        V = Vars.VARS;
        V.init(DATA.courseID);
        try {
            ACCESS_TOKEN = yield UtilsAsync.loadToken();
        }
        catch (e) {
            Utils.accessTokenPrompt();
            throw new Exception("Missing access token; must refresh", true);
        }
        const courseTabFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const courseColors = (yield UtilsAsync.getJSON(V.canvas.api.urls.custom_colors)).custom_colors;
                const favoriteCourses = yield UtilsAsync.getJSON(V.canvas.api.urls.favorite_courses);
                for (let courseData of favoriteCourses) {
                    const color = courseColors["course_" + courseData.id];
                    DATA.courseTabs.set(courseData.id, new CustomCourseTab(courseData, color));
                }
            });
        };
        const navTabFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const navTabUrl = Utils.perPage(V.canvas.api.urls.navigation_tabs, 25);
                const navTabs = yield UtilsAsync.getJSON(navTabUrl);
                for (let tab of navTabs)
                    DATA.navTabs.set(tab.id, new NavTab(tab));
            });
        };
        const assignmentFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const assignmentsUrl = Utils.perPage(V.canvas.api.urls.assignments, 1000);
                const assignments = yield UtilsAsync.getJSON(assignmentsUrl);
                for (let assignmentJson of assignments) {
                    let contentId;
                    if (assignmentJson.quiz_id)
                        contentId = assignmentJson.quiz_id;
                    else if (assignmentJson.discussion_topic)
                        contentId = assignmentJson.discussion_topic.id;
                    else
                        contentId = assignmentJson.id;
                    let item;
                    if (ModuleItem.byContentId.has(contentId))
                        item = ModuleItem.byContentId.get(contentId);
                    else
                        item = ModuleItem.fromContentId(contentId);
                    item.setAssignmentId(assignmentJson.id);
                }
            });
        };
        const moduleItemFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const modulesUrl = Utils.perPage(V.canvas.api.urls.modules, 25);
                const modules = yield UtilsAsync.getJSON(modulesUrl);
                for (let moduleData of modules) {
                    DATA.modules.set(moduleData.id, new Module(moduleData));
                }
                const moduleIds = Array.from(DATA.modules.keys());
                const itemSetPromises = moduleIds.map(modId => DATA.modules.get(modId))
                    .filter(mod => mod.itemCount > 0)
                    .map(module => {
                    const moduleItemsUrl = Utils.perPage(Utils.format(V.canvas.api.urls.module_items, { moduleID: module.id }), module.itemCount);
                    return UtilsAsync.getJSON(moduleItemsUrl);
                });
                const moduleItemSets = yield Promise.all(itemSetPromises);
                for (let items of moduleItemSets) {
                    const module = DATA.modules.get(items[0].module_id);
                    for (let modItemJson of items) {
                        let item;
                        let contentId = modItemJson.content_id;
                        if (ModuleItem.byContentId.has(contentId))
                            item = ModuleItem.byContentId.get(contentId);
                        else if (contentId)
                            item = ModuleItem.fromContentId(contentId);
                        else
                            item = new ModuleItem();
                        item.update(modItemJson);
                        DATA.moduleItems.set(modItemJson.id, item);
                        module.items.push(item);
                    }
                }
                const fileItems = Array.from(DATA.moduleItems.values())
                    .filter(item => item.type == ModuleItemType.FILE);
                const filePromises = fileItems.map(item => {
                    const fileDataUrl = Utils.format(V.canvas.api.urls.file_direct, { fileID: item.contentId });
                    return UtilsAsync.getJSON(fileDataUrl);
                });
                const files = yield Promise.all(filePromises);
                for (let file of files)
                    ModuleItem.byContentId.get(file.id).setFileData(file);
            });
        };
        const customDataFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const customDataUrl = Utils.format(V.canvas.api.urls.custom_data, { dataPath: "" });
                const customData = (yield UtilsAsync.getJSON(customDataUrl)).data;
                if (customData === undefined)
                    return;
                const complete = Utils.getOrDefault(customData.completed_assignments, DATA.courseID, new Array());
                const hidden = Utils.getOrDefault(customData.hidden_assignments, DATA.courseID, new Array());
                for (let [modItemId, modItem] of DATA.moduleItems) {
                    modItem.checked = complete.includes(modItemId);
                    modItem.hidden = hidden.includes(modItemId);
                }
                const activeStates = customData.active_states || [];
                $.each(V.state, (name, stateData) => {
                    const stateObj = new State(name, stateData, activeStates.includes(name));
                    DATA.states.set(name, stateObj);
                });
                const tabPositions = Utils.getOrDefault(customData.tab_positions, DATA.courseID, {});
                for (let [tabId, navTab] of DATA.navTabs) {
                    if (tabPositions[tabId] !== undefined)
                        navTab.setPosition(tabPositions[tabId]);
                }
            });
        };
        const promises = [courseTabFlow(), navTabFlow()];
        if (DATA.onMainPage)
            promises.push(assignmentFlow(), moduleItemFlow());
        yield Promise.all(promises);
        if (DATA.onMainPage)
            yield customDataFlow();
        return performance.now() - initStart;
    });
})()
    .catch((reason) => {
    if (reason instanceof Exception) {
        if (reason.isFatal)
            throw reason.toString();
        else
            console.warn("Exception in init:", reason.toString());
    }
    else {
        throw "Unknown error in init: " + reason;
    }
})
    .then((totalDuration) => {
    console.debug(`Initialization completed in ${Math.round(totalDuration)}ms`);
    Main.initPage();
    chrome.runtime.onMessage.addListener(Main.onMessage);
});
class Main {
    static initPage() {
        PAGE.initialize();
        $(window).scroll(UI.updateScrollPosition);
        $(document).ready(UI.updateScrollPosition);
        $("[class]").attr("class", (i, oldClass) => (oldClass.match(/\S+/g) || []).join(" "));
        $("#grades_summary tbody")
            .find("tr.group_total, tr.final_grade")
            .find("td.points_possible").attr("colspan", "3").css("text-align", "center").end()
            .find("td.details, td.status").remove();
        const origCourseNav = $("#global_nav_courses_link");
        const newCourseNav = $("<a>")
            .attr("href", "/courses")
            .addClass("ic-app-header__menu-list-link")
            .html(origCourseNav.prop("innerHTML"));
        const courseNavLi = origCourseNav.parent();
        origCourseNav.remove();
        courseNavLi
            .append(newCourseNav)
            .find(".menu-item__text")
            .text("All Courses");
        const $insertionPoint = PAGE.sidebar.children().eq(2);
        for (let [tabID, courseTab] of DATA.courseTabs) {
            $insertionPoint.after(Utils.format(V.element.course_link, {
                tabColor: courseTab.color,
                tabID,
                name: courseTab.name,
                code: courseTab.code
            }));
        }
        DATA.elements.jump_button =
            $(V.element.jump_button)
                .find("i")
                .click(() => {
                if (PAGE.scrollingElement.prop("scrollTop") > 0)
                    $("body").animate({ scrollTop: 0 }, V.ui.scroll_time);
            })
                .end()
                .appendTo(PAGE.main);
        if (DATA.coursePage === null)
            return;
        $("ul#menu > li").removeClass("ic-app-header__menu-list-item--active");
        for (let [, state] of DATA.states) {
            if (state.active && state.onPages.includes(DATA.coursePage))
                PAGE.body.addClass(state.bodyClass);
        }
        if (DATA.courseTabs.has(DATA.courseID)) {
            const color = DATA.courseTabs.get(DATA.courseID).color;
            document.documentElement.style.setProperty("--ic-brand-primary", color);
        }
        $(V.canvas.selector.nav_tabs).find("li:empty").remove();
        Array.from(DATA.navTabs.values()).filter(tab => tab.hasCustomPosition)
            .sort((tabA, tabB) => tabA.position - tabB.position)
            .forEach(UI.updateNavTabPosition);
        if (!DATA.onMainPage)
            return;
        for (let [item_id, item] of DATA.moduleItems) {
            const mainEl = $("#" + item.canvasElementId);
            let parentEl;
            let hasCheckbox;
            let hasHideButton;
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
                    $(Utils.format(V.element.checkbox, { item_id })).appendTo(parentEl);
                UI.updateCheckbox(item);
                item.checkboxElement.show();
            }
            if (hasHideButton) {
                item.hideElement =
                    $(Utils.format(V.element.hide_button, { item_id })).appendTo(parentEl);
                UI.updateHideButton(item);
                item.hideElement.show();
            }
        }
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
        PAGE.main.on("change", `.${V.cssClass.checkbox_parent} > input`, function () {
            Main.onCheckboxChange(this);
        });
        if (DATA.coursePage !== CanvasPage.MODULES)
            return;
        $(V.canvas.selector.module_items).filter((i, el) => !el.innerHTML.trim().length).html("");
        const disabledIndent = DATA.states.get("disable_indent_override").active;
        $(V.canvas.selector.module_item).each(function () {
            const defIndent = [0, 1, 2, 3, 4, 5].filter(level => $(this).hasClass("indent_" + level))[0];
            $(this).attr(V.data_attr.def_indent, defIndent);
            if (!disabledIndent)
                $(this).removeClass("indent_" + defIndent);
        });
        if (!disabledIndent) {
            $(V.canvas.selector.subheader).addClass("indent_" + V.ui.subheader_indent);
            $(V.canvas.selector.not_subheader).addClass("indent_" + V.ui.main_indent);
        }
        const toc = $(V.element.toc);
        const ul = toc.find("ul");
        for (let [modId, mod] of DATA.modules) {
            let formatted = Utils.format(V.element.toc_item, { item_name: mod.name, item_id: modId });
            $(formatted)
                .find("a")
                .click(e => {
                const moduleEl = $("#context_module_" + modId);
                UI.scrollToElement(moduleEl);
                if (moduleEl.hasClass("collapsed_module"))
                    moduleEl.find(".expand_module_link").click();
                e.preventDefault();
            })
                .end()
                .appendTo(ul);
        }
        DATA.elements.toc = toc
            .css("top", PAGE.left.height() + V.ui.toc_top_margin)
            .appendTo(PAGE.main)
            .data("cutoff", toc.offset().top - V.ui.toc_top_margin);
        Array.from(DATA.modules.values()).forEach(UI.updateModule);
        PAGE.main.on("click", `.${V.cssClass.hide_button} > i`, function () {
            Main.onHideButtonClick($(this));
        });
        for (let [, item] of DATA.moduleItems) {
            if (item.type == ModuleItemType.FILE) {
                const element = Utils.format(V.element.download_button, {
                    file_url: item.fileData.url,
                    filename: item.fileData.display_name
                });
                $(element).insertBefore(item.checkboxElement);
            }
            else if (item.type === ModuleItemType.EXTERNAL_URL) {
                const element = Utils.format(V.element.url_button, {
                    external_url: item.externalUrl
                });
                $(element).insertBefore(item.checkboxElement);
                $("#" + item.canvasElementId).find("a.external_url_link.title")
                    .attr("href", function () { return $(this).attr("data-item-href"); })
                    .removeAttr("target rel")
                    .removeClass("external")
                    .addClass("ig-title")
                    .find(".ui-icon").remove();
            }
        }
        $("." + V.cssClass.download).add("." + V.cssClass.external_url).show();
    }
    static getState(stateName) {
        if (DATA.states.has(stateName)) {
            const state = DATA.states.get(stateName);
            return state.active;
        }
        else {
            return null;
        }
    }
    static setState(stateName, state) {
        if (!DATA.states.has(stateName))
            return;
        const stateObj = DATA.states.get(stateName);
        if (!stateObj.onPages.includes(DATA.coursePage))
            return;
        if (stateObj.bodyClass)
            PAGE.body.toggleClass(stateObj.bodyClass, state);
        stateObj.active = state;
        stateObj.onChange(state, V, PAGE.body);
        const url = Utils.format(V.canvas.api.urls.custom_data, { dataPath: "/active_states" });
        Utils.editDataArray(url, state, [stateName]);
    }
    static setNavTabPosition(tab, position) {
        const url = Utils.format(V.canvas.api.urls.custom_data, {
            dataPath: ["", V.canvas.api.data_urls.tab_positions, DATA.courseID, tab.id].join("/")
        });
        Utils.putData(url, position, success => {
            if (success) {
                tab.setPosition(position);
                UI.updateNavTabPosition(tab);
            }
            else
                throw "Tab position update failed.";
        });
    }
    static onCheckboxChange(el) {
        const id = Number($(el).attr(V.data_attr.mod_item_id));
        const item = DATA.moduleItems.get(id);
        const status = el.checked;
        const oldTitle = el.title;
        el.checked = !status;
        if (status === item.checked) {
            console.error("Checkbox desync at item", item);
            return;
        }
        el.disabled = true;
        el.title = V.tooltip.waiting;
        const url = Utils.format(V.canvas.api.urls.custom_data, {
            dataPath: `/${V.canvas.api.data_urls.completed_assignments}/${DATA.courseID}`
        });
        Utils.editDataArray(url, status, [id], success => {
            el.disabled = false;
            el.title = oldTitle;
            if (success) {
                item.checked = status;
                UI.updateModule(item.module);
                UI.updateCheckbox(item);
                console.debug(`Item ID ${id} (${item.name.substr(0, 25)}...) has been ${el.checked ? "" : "un"}checked`);
            }
        });
    }
    static onHideButtonClick(el) {
        const id = Number(el.attr(V.data_attr.mod_item_id));
        const item = DATA.moduleItems.get(id);
        if (item.isGraded || item.hideElement.hasClass(V.cssClass.hide_disabled))
            return;
        const newState = !item.hidden;
        item.hideElement
            .addClass(V.cssClass.hide_disabled)
            .find("i")
            .attr("title", V.tooltip.waiting);
        const url = Utils.format(V.canvas.api.urls.custom_data, {
            dataPath: `/${V.canvas.api.data_urls.hidden_assignments}/${DATA.courseID}`
        });
        Utils.editDataArray(url, newState, [id], success => {
            if (success)
                item.hidden = newState;
            UI.updateHideButton(item, success, () => {
                if (success) {
                    UI.updateModule(item.module);
                    console.debug(`Item ID ${id} (${item.name.substr(0, 25)}...) has been ${item.hidden ? "" : "un"}hidden`);
                }
            });
        });
    }
    static onMessage(data, source, respondFunc) {
        if (source.id !== DATA.extensionId)
            return;
        if (data.type === MessageType.BASIC) {
            const unchecked = Array.from(DATA.moduleItems.values()).filter(i => !i.checked && !i.hidden && !i.isSubHeader);
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
                    let uncheckedEls = unchecked
                        .map(i => document.getElementById(i.canvasElementId));
                    UI.scrollToElement($(uncheckedEls).first());
                    respondFunc();
                    break;
                default:
                    console.warn("Unknown basic message in content script:", data);
            }
        }
        else if (data.type === MessageType.STATE) {
            const stateData = data;
            if (data.action === "get") {
                const state = Main.getState(stateData.stateName);
                respondFunc({ state });
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
    }
}
class UI {
    static updateCheckbox(item) {
        if (item.checkboxElement === null)
            throw "No checkbox to update";
        item.checkboxElement
            .find("input")
            .prop("checked", item.checked)
            .attr("title", item.checked ? V.tooltip.mark_incomplete : V.tooltip.mark_complete)
            .closest(V.canvas.selector.module_item)
            .toggleClass(V.cssClass.checkbox_checked, item.checked);
    }
    static updateHideButton(item, animate, after) {
        if (item.hideElement === null)
            throw "No hide button to update";
        const modItemEl = item.hideElement.closest(V.canvas.selector.module_item);
        const iEl = item.hideElement.find("i");
        iEl.add(modItemEl).toggleClass(V.cssClass.item_hidden, item.hidden);
        const update = () => {
            item.hideElement.toggleClass(V.cssClass.hide_disabled, item.isGraded);
            iEl.attr("title", item.isGraded ? V.tooltip.hide_disabled : item.hidden ? V.tooltip.unhide : V.tooltip.hide);
            Utils.runCb(after);
        };
        if (animate)
            setTimeout(update, V.ui.fade_time);
        else
            update();
    }
    static updateTableOfContents(module) {
        const allItems = module.items.filter(i => !i.isSubHeader && !i.hidden);
        const totalItems = allItems.length;
        let checkedItems, percent;
        if (totalItems > 0) {
            checkedItems = allItems.filter(i => i.checked).length;
            percent = Math.round(checkedItems / totalItems * 100);
        }
        else {
            checkedItems = 0;
            percent = 0;
        }
        const backgroundImage = Utils.format(V.misc.toc_background, { percent });
        DATA.elements.toc
            .find(`[${V.data_attr.toc_module_id}='${module.id}']`)
            .attr(V.data_attr.toc_total, totalItems)
            .attr(V.data_attr.toc_checked_count, checkedItems)
            .attr(V.data_attr.toc_percentage, percent)
            .closest("li")
            .toggleClass(V.cssClass.item_hidden, totalItems === 0)
            .css({ backgroundImage });
    }
    static updateModule(module) {
        if (DATA.elements.toc !== null)
            UI.updateTableOfContents(module);
        const noItems = module.items.filter(i => !i.isSubHeader && !i.hidden).length === 0;
        $("#context_module_" + module.id).toggleClass(V.cssClass.item_hidden, noItems);
    }
    static updateNavTabPosition(tab) {
        if (!tab.hasCustomPosition)
            throw "Tab has no custom position";
        const tabList = $(V.canvas.selector.nav_tabs);
        const tabEl = tabList.find("a." + tab.id).parent();
        if (tab.hidden)
            tabEl.hide();
        else
            tabEl.show().detach().insertBefore(tabList.children().eq(tab.position - 1));
    }
    static updateScrollPosition() {
        const scrollTop = PAGE.scrollingElement.prop("scrollTop");
        if (DATA.elements.toc !== null) {
            DATA.elements.toc
                .toggleClass(V.cssClass.fixed, scrollTop > DATA.elements.toc.data("cutoff"));
        }
        if (DATA.elements.jump_button !== null) {
            DATA.elements.jump_button
                .toggleClass(V.cssClass.active, scrollTop > V.ui.jump_top_cutoff);
        }
    }
    static scrollToElement(element) {
        const elRect = element[0].getBoundingClientRect();
        const cliHeight = document.documentElement.clientHeight;
        const topRatio = V.ui.top_inside_ratio;
        if ((elRect.height < cliHeight && elRect.top >= 0 && elRect.bottom < cliHeight) ||
            (elRect.top >= 0 && elRect.top <= cliHeight * topRatio)) {
            UI.flashElement(element);
        }
        else {
            let scrollTop = element.offset().top - V.ui.scroll_top_offset;
            PAGE.scrollingElement.animate({ scrollTop }, V.ui.scroll_time, () => UI.flashElement(element));
        }
    }
    static flashElement(element) {
        element.addClass(V.cssClass.flash);
        setTimeout(() => element.removeClass(V.cssClass.flash), 1000);
    }
}
//# sourceMappingURL=main.js.map