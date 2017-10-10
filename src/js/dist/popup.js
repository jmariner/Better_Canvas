var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var V;
var ACCESS_TOKEN = null;
var DATA;
var PAGE;
var Data = (function () {
    function Data() {
        this.modules = new Map();
        this.moduleItems = new Map();
        this.states = new Map();
        this.courseTabs = [];
        this.elements = { jump_button: null, toc: null };
    }
    return Data;
}());
var Page = (function () {
    function Page() {
    }
    Page.prototype.initialize = function () {
        this.body = $("body");
        this.sidebar = $("#menu");
        this.main = $("#main");
        if (DATA.onMainPage) {
            this.content = $("#content");
            this.left = $("#left-side");
        }
        if (DATA.coursePage === CanvasPage.GRADES)
            this.grades = $("#grades_summary");
    };
    return Page;
}());
var CustomCourseTab = (function () {
    function CustomCourseTab(courseData, color) {
        this.id = courseData.id;
        this.name = courseData.name;
        this.code = courseData.course_code;
        this.color = color;
    }
    return CustomCourseTab;
}());
var State = (function () {
    function State(key, stateData, active) {
        var _this = this;
        this.name = key;
        this.bodyClass = stateData.cssClass;
        this.onEnable = stateData.onEnable;
        this.onDisable = stateData.onDisable;
        this.active = active;
        this.onPages = [];
        stateData.pages.forEach(function (page) {
            var _page = CanvasPage[page.toUpperCase()];
            if (_page !== undefined)
                _this.onPages.push(_page);
        });
    }
    State.prototype.onChange = function (newState, vars, body) {
        if (newState)
            this.onEnable(vars, body);
        else
            this.onDisable(vars, body);
    };
    return State;
}());
var Module = (function () {
    function Module(moduleJson) {
        this.name = moduleJson.name;
        this.id = moduleJson.id;
        this.itemCount = moduleJson.items_count;
        this.items = [];
    }
    return Module;
}());
var ModuleItem = (function () {
    function ModuleItem(moduleItemJson) {
        if (moduleItemJson)
            this.update(moduleItemJson);
    }
    ModuleItem.fromContentId = function (contentId) {
        var item = new ModuleItem();
        item.contentId = contentId;
        ModuleItem.byContentId.set(contentId, item);
        return item;
    };
    ModuleItem.prototype.update = function (moduleItemJson) {
        this._id = moduleItemJson.id;
        this._name = moduleItemJson.title;
        this.moduleId = moduleItemJson.module_id;
        var typeString = moduleItemJson.type
            .replace(/([A-Z])/g, function (r, s) { return "_" + s; })
            .replace(/^_/, "").toUpperCase();
        this.type = ModuleItemType[typeString];
        this.checked = false;
        this.hidden = false;
        if (this.type === ModuleItemType.ASSIGNMENT)
            this.setAssignmentId(moduleItemJson.content_id);
        else
            this.assignmentId = null;
    };
    ModuleItem.prototype.setAssignmentId = function (id) { this.assignmentId = id; };
    Object.defineProperty(ModuleItem.prototype, "canvasElementId", {
        get: function () {
            switch (DATA.coursePage) {
                case CanvasPage.MODULES:
                    return "context_module_item_" + this._id;
                case CanvasPage.GRADES:
                    return "submission_" + this.assignmentId;
                default:
                    return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "isGraded", {
        get: function () { return this.assignmentId !== null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "isSubHeader", {
        get: function () { return this.type === ModuleItemType.SUB_HEADER; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "module", {
        get: function () { return DATA.modules.get(this.moduleId); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "checkboxElement", {
        get: function () { return this._checkboxElement; },
        set: function (value) {
            if (value === null || value.length === 1)
                this._checkboxElement = value;
            else
                throw "Invalid Module Item Element: " + value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "hideElement", {
        get: function () { return this._hideElement; },
        set: function (value) {
            if (value === null || value.length === 1)
                this._hideElement = value;
            else
                throw "Invalid Module Item Element: " + value;
        },
        enumerable: true,
        configurable: true
    });
    return ModuleItem;
}());
ModuleItem.byContentId = new Map();
var ModuleItemType;
(function (ModuleItemType) {
    ModuleItemType[ModuleItemType["ASSIGNMENT"] = 0] = "ASSIGNMENT";
    ModuleItemType[ModuleItemType["SUB_HEADER"] = 1] = "SUB_HEADER";
    ModuleItemType[ModuleItemType["DISCUSSION"] = 2] = "DISCUSSION";
    ModuleItemType[ModuleItemType["QUIZ"] = 3] = "QUIZ";
    ModuleItemType[ModuleItemType["PAGE"] = 4] = "PAGE";
    ModuleItemType[ModuleItemType["FILE"] = 5] = "FILE";
    ModuleItemType[ModuleItemType["EXTERNAL_URL"] = 6] = "EXTERNAL_URL";
})(ModuleItemType || (ModuleItemType = {}));
var CanvasPage;
(function (CanvasPage) {
    CanvasPage[CanvasPage["MODULES"] = 0] = "MODULES";
    CanvasPage[CanvasPage["GRADES"] = 1] = "GRADES";
    CanvasPage[CanvasPage["HOME"] = 2] = "HOME";
    CanvasPage[CanvasPage["USERS"] = 3] = "USERS";
    CanvasPage[CanvasPage["GROUPS"] = 4] = "GROUPS";
    CanvasPage[CanvasPage["COLLABORATIONS"] = 5] = "COLLABORATIONS";
    CanvasPage[CanvasPage["DISCUSSION_TOPICS"] = 6] = "DISCUSSION_TOPICS";
    CanvasPage[CanvasPage["EXTERNAL_TOOLS"] = 7] = "EXTERNAL_TOOLS";
    CanvasPage[CanvasPage["ASSIGNMENTS"] = 8] = "ASSIGNMENTS";
})(CanvasPage || (CanvasPage = {}));
var MessageType;
(function (MessageType) {
    MessageType[MessageType["BASIC"] = 0] = "BASIC";
    MessageType[MessageType["STATE"] = 1] = "STATE";
})(MessageType || (MessageType = {}));
var MessageData = (function () {
    function MessageData(action, type) {
        this.action = action;
        this.type = type || MessageType.BASIC;
    }
    return MessageData;
}());
var StateMessageData = (function (_super) {
    __extends(StateMessageData, _super);
    function StateMessageData(action, stateName, state) {
        var _this = _super.call(this, action, MessageType.STATE) || this;
        _this.stateName = stateName;
        _this.state = state;
        if (action === "set" && _this.state === undefined)
            throw "Invalid state message: no boolean to set state to";
        return _this;
    }
    return StateMessageData;
}(MessageData));
var Utils = (function () {
    function Utils() {
    }
    Utils.format = function (string) {
        var formatArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            formatArgs[_i - 1] = arguments[_i];
        }
        var formatParams = (formatArgs.length === 1 && typeof formatArgs[0] === "object") ? formatArgs[0] : formatArgs;
        for (var i in formatParams)
            string = string.replace(new RegExp("\\{" + i + "\\}", "gi"), formatParams[i]);
        return "" + string;
    };
    Utils.scopeFormat = function (string, scope) {
        if (!string.includes("{"))
            return string;
        return string.replace(/{([^{}]+)}/g, function (match, p1) {
            if (p1.includes(".")) {
                var val = Utils.getPathValue(scope, p1);
                if (val !== null)
                    return val;
            }
            else if (scope.hasOwnProperty(p1)) {
                return scope[p1];
            }
            return match;
        });
    };
    Utils.getPathValue = function (object, pathString) {
        var pathParts = pathString.split(".");
        var current = object;
        for (var part in pathParts) {
            part = pathParts[part];
            if (!current.hasOwnProperty(part))
                return null;
            if (typeof current === "object")
                current = current[part];
        }
        return current;
    };
    Utils.perPage = function (url, perPage) {
        return url + "?per_page=" + perPage;
    };
    Utils.getJSON = function (url, callback) {
        if (ACCESS_TOKEN === null)
            throw new Error("Access token not set");
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                switch (req.status) {
                    case 404:
                        throw "404 error when getting JSON";
                    case 400:
                        console.info("400 error when getting JSON was OKAY");
                    default:
                        Utils.safeCb(callback)(JSON.parse(req.responseText.replace("while(1);", "")));
                }
            }
        };
        req.open("GET", url);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("Authorization", "Bearer " + ACCESS_TOKEN);
        req.send();
    };
    Utils.putDataArray = function (url, array, callback) {
        var data = { ns: V.canvas.api.namespace, data: array };
        var action = array.length > 0 ? "PUT" : "DELETE";
        if (action === "DELETE")
            delete data.data;
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                Utils.safeCb(callback)(true);
            }
        };
        req.open(action, url);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("Authorization", "Bearer " + ACCESS_TOKEN);
        req.send(JSON.stringify(data));
    };
    Utils.appendDataArray = function (url, values, callback) {
        Utils.getJSON(url, function (resultData) {
            var array = resultData.data ? resultData.data.concat(values) : values;
            Utils.putDataArray(url, array, callback);
        });
    };
    Utils.subtractDataArray = function (url, values, callback) {
        Utils.getJSON(url, function (resultData) {
            var array = resultData.data || [];
            if (array.length === 0) {
                Utils.safeCb(callback)(true);
                return;
            }
            array = array.filter(function (val) { return !values.includes(val); });
            Utils.putDataArray(url, array, callback);
        });
    };
    Utils.editDataArray = function (url, append, values, callback) {
        if (append)
            Utils.appendDataArray(url, values, callback);
        else
            Utils.subtractDataArray(url, values, callback);
    };
    Utils.loadToken = function (callback) {
        chrome.storage.sync.get(V.misc.token_key, function (resultData) {
            var success = ACCESS_TOKEN !== null || resultData[V.misc.token_key];
            if (success)
                ACCESS_TOKEN = resultData[V.misc.token_key];
            Utils.safeCb(callback)(success);
        });
    };
    Utils.accessTokenPrompt = function () {
        var openOptions = confirm("Missing access token, press OK to open extension options");
        if (openOptions)
            chrome.runtime.sendMessage(new MessageData("open options"));
    };
    Utils.runCb = function (callbackFunction) {
        if (callbackFunction !== undefined)
            callbackFunction();
    };
    Utils.safeCb = function (callbackFunction) {
        if (callbackFunction !== undefined)
            return callbackFunction;
        else
            return (function () { });
    };
    return Utils;
}());;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vars;
(function (Vars_1) {
    var Sass = (function () {
        function Sass() {
            var _this = this;
            this.prefix = "betterCanvas";
            this.cssClass = {
                active: "active",
                checkbox_parent: "checkbox-parent",
                checkbox_checked: "checkbox-checked",
                checkbox_td: "checkbox-td",
                flash: "anim-flash",
                course_link_text: "course-link-text",
                item_hidden: "hidden",
                hide_button: "btn-hide",
                hide_disabled: "hide-disabled",
                toc_ratio: "toc-ratio",
                toc_title: "toc-title",
                fixed: "fixed",
                item_icon: "icon-wrapper",
                popup_loaded: "done-loading",
                popup_connected: "page-connected",
                popup_require_page: "require-page",
            };
            this.data_attr = {
                toc_module_id: "toc-module-id",
                toc_total: "toc-total",
                toc_checked_count: "toc-checked-count",
                toc_percentage: "toc-percentage",
                mod_item_id: "item-id",
                course_name: "course-name",
                course_code: "course-code",
                def_indent: "default-indent"
            };
            this.id = {
                toc: "toc",
                jump_button: "jump-to-top",
                popup_page_missing: "page-missing-error",
                popup_ex_name: "extension-name",
                popup_insertion_point: "insertion-point",
                popup_jump_button: "jump-to"
            };
            this.color = {
                toc_fill: "rgba(0, 255, 0, .75)",
                toc_border: "rgb(102, 120, 135)",
                toc_title: "rgb(57, 75, 88)",
                checkbox_check: "rgb(22, 160, 133)",
                checkbox_border: "rgb(102, 120, 135)",
                highlight_orange: "rgb(255, 152, 0)",
                highlight_red: "rgb(255, 0, 0)",
                jump_button: "rgb(57, 75, 88)"
            };
            this.ui = {
                top_inside_ratio: 0.05,
                scroll_top_offset: 5,
                jump_top_cutoff: 100,
                toc_top_margin: 32,
                scroll_time: 500,
                fade_time: 500,
                subheader_indent: 0,
                main_indent: 1
            };
            this.state = {
                show_hidden: {
                    cssClass: "show-hidden",
                    pages: ["modules"],
                    desc: "Show hidden items"
                },
                hide_checked: {
                    cssClass: "hide-checked",
                    pages: ["modules", "grades"],
                    desc: "Hide completed items"
                },
                highlight_unchecked: {
                    cssClass: "mark-unchecked",
                    pages: ["modules", "grades"],
                    desc: "Mark unchecked items"
                },
                disable_indent_override: {
                    pages: ["modules"],
                    desc: "Disable Indent Overrides",
                    onDisable: function (vars, body) {
                        [0, 1, 2, 3, 4, 5].forEach(function (level) {
                            return $(vars.canvas.selector.module_item, body).removeClass("indent_" + level);
                        });
                        $(vars.canvas.selector.subheader, body).addClass("indent_" + vars.ui.subheader_indent);
                        $(vars.canvas.selector.not_subheader, body).addClass("indent_" + vars.ui.main_indent);
                    },
                    onEnable: function (vars, body) {
                        $(vars.canvas.selector.module_item, body).each(function () {
                            var _this = this;
                            [0, 1, 2, 3, 4, 5].forEach(function (level) { return $(_this).removeClass("indent_" + level); });
                            var defLevel = $(this).attr(vars.data_attr.def_indent);
                            $(this).addClass("indent_" + defLevel);
                        });
                    }
                }
            };
            var processObject = function (obj, objName) {
                for (var key in obj) {
                    if (!obj.hasOwnProperty(key))
                        continue;
                    var val = obj[key];
                    if (typeof val === "object") {
                        processObject(val, key);
                    }
                    else if (typeof val === "string") {
                        if ((Sass.prefix_types.indexOf(objName) > -1 || Sass.prefix_types.indexOf(key) > -1)
                            && !key.startsWith("popup_")) {
                            val = _this.prefix + "-" + val;
                        }
                        if (objName == "data_attr") {
                            val = "data-" + val;
                        }
                        obj[key] = val;
                    }
                }
            };
            processObject(this, "root");
            this.sassJson = JSON.stringify(this);
        }
        return Sass;
    }());
    Sass.prefix_types = ["cssClass", "data_attr", "id"];
    var Vars = (function (_super) {
        __extends(Vars, _super);
        function Vars() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tooltip = {
                mark_complete: "Mark as completed",
                mark_incomplete: "Mark as incomplete",
                hide: "Hide this item",
                unhide: "Unhide this item",
                hide_disabled: "Cannot hide graded item",
                jump_button: "Jump to top",
                waiting: "Waiting...",
                has_submission: "Assignment has submission",
                popup_no_unchecked: "No unchecked items to jump to"
            };
            _this.misc = {
                toc_background: "-webkit-linear-gradient(left, " + _this.color.toc_fill + " {percent}%, transparent {percent}%)",
                token_key: "accessToken"
            };
            _this.element = {
                checkbox: "<div style='display:none' class='" + _this.cssClass.checkbox_parent + "'>\n\t\t\t\t\t\t<input type='checkbox' " + _this.data_attr.mod_item_id + "='{item_id}'>\n\t\t\t\t\t</div>",
                hide_button: "<div style='display:none' class='" + _this.cssClass.hide_button + "'>\n\t\t\t\t\t\t<i " + _this.data_attr.mod_item_id + "='{item_id}'></i>\n\t\t\t\t\t</div>",
                course_link: "<li style='background-color: {tabColor}' class='menu-item ic-app-header__menu-list-item'>\n\t\t\t\t\t<a href='/courses/{tabID}/modules' class='ic-app-header__menu-list-link'>\n\t\t\t\t\t\t<div class='menu-item-icon-container' aria-hidden='true'><i></i></div>\n\t\t\t\t\t\t<div style='background-color: {tabColor}; border-right-color: {tabColor}'\n\t\t\t\t\t\t\t\t" + _this.data_attr.course_name + "='{name}' " + _this.data_attr.course_code + "='{code}'\n\t\t\t\t\t\t\t\tclass='menu-item__text " + _this.cssClass.course_link_text + "'></div>\n\t\t\t\t\t</a>\n\t\t\t\t</li>",
                toc: "<div id='" + _this.id.toc + "' class='ic-app-course-menu list-view'>\n\t\t\t\t\t<div class='" + _this.cssClass.toc_title + "'>Table of Contents</div>\n\t\t\t\t\t<nav><ul></ul></nav>\n\t\t\t\t</div>",
                toc_item: "<li>\n\t\t\t\t\t<a href='#' title='{item_name}'>\n\t\t\t\t\t\t{item_name}\n\t\t\t\t\t\t<div class='" + _this.cssClass.toc_ratio + "' " + _this.data_attr.toc_module_id + "='{item_id}'></div>\n\t\t\t\t\t</a>\n\t\t\t\t</li>",
                jump_button: "<div id='" + _this.id.jump_button + "'>\n\t\t\t\t\t<i title='" + _this.tooltip.jump_button + "'></i>\n\t\t\t\t</div>",
                submission_icon: "<div title='" + _this.tooltip.has_submission + "' class='" + _this.cssClass.item_icon + "'>\n\t\t\t\t\t<i class='icon-publish'></i>\n\t\t\t\t</div>",
                popup_state_switch: "<div class=\"switch " + _this.cssClass.popup_require_page + "\">\n\t\t\t\t\t<label for=\"{name}\" class=\"mdl-switch mdl-js-switch mdl-js-ripple-effect\">\n\t\t\t\t\t\t<span class=\"mdl-switch__label\">{desc}</span>\n\t\t\t\t\t\t<input id=\"{name}\" type=\"checkbox\" class=\"mdl-switch__input\">\n\t\t\t\t\t</label>\n\t\t\t\t</div>"
            };
            _this._canvas = {
                namespace: "com.jmariner." + _this.prefix,
                root_url: "/api/v1/"
            };
            _this.canvas = {
                selector: {
                    module: "div.context_module",
                    module_item: "li.context_module_item",
                    module_items: "ul.context_module_items",
                    subheader: "li.context_module_sub_header",
                    not_subheader: "li.context_module_item:not(.context_module_sub_header)"
                },
                api: {
                    namespace: _this._canvas.namespace,
                    root_url: _this._canvas.root_url,
                    per_page: 100,
                    urls: {
                        custom_data: _this._canvas.root_url + "users/self/custom_data{dataPath}?ns=" + _this._canvas.namespace,
                        favorite_courses: _this._canvas.root_url + "users/self/favorites/courses",
                        custom_colors: _this._canvas.root_url + "users/self/colors",
                        assignments: _this._canvas.root_url + "users/self/courses/{courseID}/assignments",
                        modules: _this._canvas.root_url + "courses/{courseID}/modules",
                        module_items: _this._canvas.root_url + "courses/{courseID}/modules/{moduleID}/items"
                    },
                    data_urls: {
                        active_states: "active_states",
                        completed_assignments: "completed_assignments",
                        hidden_assignments: "hidden_assignments"
                    }
                },
            };
            return _this;
        }
        Vars.prototype.init = function (courseID) {
            var _this = this;
            var formatData = { courseID: courseID };
            $.each(this.canvas.api.urls, function (key, val) {
                _this.canvas.api.urls[key] = Utils.scopeFormat(val, formatData);
            });
        };
        return Vars;
    }(Sass));
    Vars_1.Vars = Vars;
    Vars_1.VARS = new Vars();
    if (typeof module !== "undefined")
        module.exports = Vars_1.VARS.sassJson;
})(Vars || (Vars = {}));;var QUERY = { active: true, currentWindow: true };
$(function () {
    V = Vars.VARS;
    var BODY = $("body");
    var jumpButton = $("#" + V.id.popup_jump_button);
    var insertionPoint = $("#" + V.id.popup_insertion_point);
    $("#" + V.id.popup_ex_name).text(chrome.runtime.getManifest().name);
    Promise.resolve()
        .then(function () { return new Promise(function (next) {
        var startPing = $.now();
        sendMessage(new MessageData("ping"), function (resp) {
            if (resp !== undefined) {
                console.log("page ping", resp.pong - startPing);
                BODY.addClass(V.cssClass.popup_connected);
                next();
            }
            else {
                BODY.addClass(V.cssClass.popup_loaded);
            }
        });
    }); }).then(function () { return new Promise(function (next) {
        sendMessage(new MessageData("count unchecked"), function (resp) {
            if (resp !== undefined) {
                if (resp.count === 0)
                    jumpButton.prop("disabled", true).attr("title", V.tooltip.popup_no_unchecked);
                next();
            }
        });
    }); }).then(function () { return new Promise(function (next) {
        var remaining = Object.keys(V.state).length;
        $.each(V.state, function (stateName, stateData) {
            sendMessage(new StateMessageData("get", stateName), function (resp) {
                var el = $(Utils.format(V.element.popup_state_switch, { name: stateName, desc: stateData.desc }));
                el.insertAfter(insertionPoint);
                componentHandler.upgradeElement(el.find("label").get(0));
                var inputEl = el.find("input").get(0);
                el.change(function () {
                    var newState = inputEl.checked;
                    setMdlChecked(inputEl, !newState);
                    inputEl.title = V.tooltip.waiting;
                    inputEl.disabled = true;
                    sendMessage(new StateMessageData("set", stateName, newState), function (resp) {
                        if (resp !== undefined) {
                            setMdlChecked(inputEl, newState);
                            inputEl.title = "";
                            inputEl.disabled = false;
                        }
                    });
                });
                setMdlChecked(inputEl, resp.state);
                if (--remaining === 0)
                    next();
            });
        });
        jumpButton.click(function () {
            sendMessage(new MessageData("jump to first unchecked"), function (resp) { return window.close(); });
        });
    }); }).then(function () { return new Promise(function (next) {
        insertionPoint.remove();
        BODY.addClass(V.cssClass.popup_loaded);
        next();
    }); });
});
function sendMessage(data, callback) {
    chrome.tabs.query(QUERY, function (tabs) { return chrome.tabs.sendMessage(tabs[0].id, data, callback); });
}
function setMdlChecked(checkbox, checked) {
    $(checkbox)
        .prop("checked", checked)
        .parent()
        .toggleClass("is-checked", checked);
}
//# sourceMappingURL=popup.js.map