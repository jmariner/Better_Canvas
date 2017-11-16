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
        this.courseTabs = new Map();
        this.navTabs = new Map();
        this.elements = { jump_button: null, toc: null };
    }
    return Data;
}());
var Page = (function () {
    function Page() {
    }
    Page.prototype.initialize = function () {
        this.body = $("body");
        this.scrollingElement = $(document.scrollingElement || document.body);
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
var NavTab = (function () {
    function NavTab(tabData) {
        this.id = tabData.id;
        this._position = null;
        this.initPosition = tabData.position;
    }
    NavTab.prototype.setPosition = function (pos) {
        this._position = pos;
    };
    Object.defineProperty(NavTab.prototype, "hasCustomPosition", {
        get: function () {
            return this._position != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavTab.prototype, "position", {
        get: function () {
            return this._position == null ? this.initPosition : this._position == -1 ? null : this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavTab.prototype, "hidden", {
        get: function () {
            return this._position == -1;
        },
        enumerable: true,
        configurable: true
    });
    return NavTab;
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
            Utils.safeCb(this.onEnable)(vars, body);
        else
            Utils.safeCb(this.onDisable)(vars, body);
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
        item._contentId = contentId;
        ModuleItem.byContentId.set(contentId, item);
        return item;
    };
    ModuleItem.prototype.update = function (moduleItemJson) {
        this._id = moduleItemJson.id;
        this._name = moduleItemJson.title;
        this.moduleId = moduleItemJson.module_id;
        this._externalUrl = moduleItemJson.external_url || null;
        var typeString = moduleItemJson.type
            .replace(/([A-Z])/g, function (r, s) { return "_" + s; })
            .replace(/^_/, "").toUpperCase();
        this._type = ModuleItemType[typeString];
        if (this._type === undefined)
            console.warn("Unknown module item type: \"" + typeString + "\"");
        this.checked = false;
        this.hidden = false;
        if (this._type === ModuleItemType.ASSIGNMENT)
            this.setAssignmentId(moduleItemJson.content_id);
        else
            this.assignmentId = null;
    };
    ModuleItem.prototype.setAssignmentId = function (id) { this.assignmentId = id; };
    ModuleItem.prototype.setFileData = function (data) { this._fileData = data; };
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
    Object.defineProperty(ModuleItem.prototype, "type", {
        get: function () { return this._type; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "isGraded", {
        get: function () { return this.assignmentId !== null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "isSubHeader", {
        get: function () { return this._type === ModuleItemType.SUB_HEADER; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "module", {
        get: function () { return DATA.modules.get(this.moduleId); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "externalUrl", {
        get: function () { return this._externalUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "contentId", {
        get: function () { return this._contentId; },
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
    Object.defineProperty(ModuleItem.prototype, "fileData", {
        get: function () { return this._fileData; },
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
    ModuleItemType[ModuleItemType["EXTERNAL_TOOL"] = 7] = "EXTERNAL_TOOL";
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
    Utils.pathFormat = function (string, scope) {
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
    Utils.putData = function (url, data, callback) {
        var bodyData = { ns: V.canvas.api.namespace, data: data };
        var action = data instanceof Array && data.length > 0 || data !== undefined ? "PUT" : "DELETE";
        if (action === "DELETE")
            delete bodyData.data;
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                Utils.safeCb(callback)(true);
            }
        };
        req.open(action, url);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("Authorization", "Bearer " + ACCESS_TOKEN);
        req.send(JSON.stringify(bodyData));
    };
    Utils.appendDataArray = function (url, values, callback) {
        Utils.getJSON(url, function (resultData) {
            var array = resultData.data ? resultData.data.concat(values) : values;
            Utils.putData(url, array, callback);
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
            Utils.putData(url, array, callback);
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
                download: "download-btn",
                external_url: "url-btn",
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
                toc_title: "var(--ic-brand-primary)",
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
                    desc: "Disable indent overrides",
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
                download: "Download file: \"{filename}\"",
                external_url: "Visit external URL",
                has_submission: "Assignment has submission",
                popup_no_unchecked: "No unchecked items to jump to"
            };
            _this.misc = {
                toc_background: "-webkit-linear-gradient(left, " + _this.color.toc_fill + " {percent}%, transparent {percent}%)",
                token_key: "accessToken"
            };
            _this.element = {
                checkbox: "<div style='display:none' class='" + _this.cssClass.checkbox_parent + "'>\n\t\t\t\t\t\t<input type='checkbox' " + _this.data_attr.mod_item_id + "='{item_id}'>\n\t\t\t\t\t</div>",
                download_button: "<div style='display:none' class='" + _this.cssClass.download + "' title='" + _this.tooltip.download + "'>\n\t\t\t\t\t\t<a href=\"{file_url}\"></a>\n\t\t\t\t\t</div>",
                url_button: "<div style='display:none' class='" + _this.cssClass.external_url + "' title='" + _this.tooltip.external_url + "'>\n\t\t\t\t\t\t<a href=\"{external_url}\" class=\"not_external\" target=\"_blank\"></a>\n\t\t\t\t\t</div>",
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
                    not_subheader: "li.context_module_item:not(.context_module_sub_header)",
                    nav_tabs: "ul#section-tabs"
                },
                api: {
                    namespace: _this._canvas.namespace,
                    root_url: _this._canvas.root_url,
                    per_page: 100,
                    urls: {
                        custom_data: "users/self/custom_data{dataPath}?ns=" + _this._canvas.namespace,
                        favorite_courses: "users/self/favorites/courses",
                        custom_colors: "users/self/colors",
                        assignments: "users/self/courses/{courseID}/assignments",
                        modules: "courses/{courseID}/modules",
                        module_items: "courses/{courseID}/modules/{moduleID}/items",
                        file_direct: "courses/{courseID}/files/{fileID}",
                        navigation_tabs: "courses/{courseID}/tabs"
                    },
                    data_urls: {
                        active_states: "active_states",
                        completed_assignments: "completed_assignments",
                        hidden_assignments: "hidden_assignments",
                        tab_positions: "tab_positions"
                    }
                },
            };
            return _this;
        }
        Vars.prototype.init = function (courseID) {
            var _this = this;
            $.each(this.canvas.api.urls, function (key, url) {
                _this.canvas.api.urls[key] = _this.canvas.api.root_url + Utils.format(url, { courseID: courseID });
            });
        };
        return Vars;
    }(Sass));
    Vars_1.Vars = Vars;
    Vars_1.VARS = new Vars();
    if (typeof module !== "undefined")
        module.exports = Vars_1.VARS.sassJson;
})(Vars || (Vars = {}));;var MAIN_FLOW = [
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
    function getMainData(callback) {
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
            var fileItems = Array.from(DATA.moduleItems.values())
                .filter(function (item) { return item.type == ModuleItemType.FILE; });
            var waitingCount = fileItems.length;
            fileItems.forEach(function (item) {
                var fileDataUrl = Utils.format(V.canvas.api.urls.file_direct, { fileID: item.contentId });
                Utils.getJSON(fileDataUrl, function (resultData) {
                    item.setFileData(resultData);
                    if (--waitingCount === 0)
                        next();
                });
            });
        }); })
            .then(function () { return new Promise(function (next) {
            var navTabUrl = Utils.perPage(V.canvas.api.urls.navigation_tabs, 25);
            Utils.getJSON(navTabUrl, function (resultData) {
                resultData.forEach(function (tab) {
                    DATA.navTabs.set(tab.id, new NavTab(tab));
                });
                next();
            });
        }); })
            .then(partDone);
    },
    function getCustomData(callback) {
        var customDataUrl = Utils.format(V.canvas.api.urls.custom_data, { dataPath: "" });
        Utils.getJSON(customDataUrl, function (resultData) {
            var customData = resultData.data;
            if (customData === undefined) {
                Utils.runCb(callback);
                return;
            }
            var complete = customData.completed_assignments ? customData.completed_assignments[DATA.courseID] : [];
            var hidden = customData.hidden_assignments ? customData.hidden_assignments[DATA.courseID] : [];
            DATA.moduleItems.forEach(function (modItem, modItemId) {
                modItem.checked = complete.includes(modItemId);
                modItem.hidden = hidden.includes(modItemId);
            });
            var activeStates = customData.active_states || [];
            $.each(V.state, function (name, stateData) {
                var stateObj = new State(name, stateData, activeStates.includes(name));
                DATA.states.set(name, stateObj);
            });
            var tabPositions = customData.tab_positions ? customData.tab_positions[DATA.courseID] : [];
            DATA.navTabs.forEach(function (navTab, tabId) {
                if (tabPositions[tabId] !== undefined)
                    navTab.setPosition(tabPositions[tabId]);
            });
            Utils.runCb(callback);
        });
    }
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
        Array.from(DATA.states.values())
            .filter(function (s) { return s.active && s.onPages.includes(DATA.coursePage); })
            .forEach(function (s) { return PAGE.body.addClass(s.bodyClass); });
        var color = DATA.courseTabs.get(DATA.courseID).color;
        document.documentElement.style.setProperty("--ic-brand-primary", color);
        $(V.canvas.selector.nav_tabs).find("li:empty").remove();
        Array.from(DATA.navTabs.values()).filter(function (tab) { return tab.hasCustomPosition; })
            .sort(function (tabA, tabB) { return tabA.position - tabB.position; })
            .forEach(UI.updateNavTabPosition);
        if (!DATA.onMainPage)
            return;
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
        Array.from(DATA.modules.values()).forEach(UI.updateModule);
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
    Main.setNavTabPosition = function (tab, position) {
        var url = Utils.format(V.canvas.api.urls.custom_data, {
            dataPath: ["", V.canvas.api.data_urls.tab_positions, DATA.courseID, tab.id].join("/")
        });
        Utils.putData(url, position, function (success) {
            if (success) {
                tab.setPosition(position);
                UI.updateNavTabPosition(tab);
            }
            else
                throw "Tab position update failed.";
        });
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
    UI.updateModule = function (module) {
        if (DATA.elements.toc !== null)
            UI.updateTableOfContents(module);
        var noItems = module.items.filter(function (i) { return !i.isSubHeader && !i.hidden; }).length === 0;
        $("#context_module_" + module.id).toggleClass(V.cssClass.item_hidden, noItems);
    };
    UI.updateNavTabPosition = function (tab) {
        if (!tab.hasCustomPosition)
            throw "Tab has no custom position";
        var tabList = $(V.canvas.selector.nav_tabs);
        var tabEl = tabList.find("a." + tab.id).parent();
        if (tab.hidden)
            tabEl.hide();
        else
            tabEl.show().detach().insertBefore(tabList.children().eq(tab.position - 1));
    };
    UI.updateScrollPosition = function () {
        var scrollTop = PAGE.scrollingElement.prop("scrollTop");
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
            PAGE.scrollingElement.animate({ scrollTop: scrollTop }, V.ui.scroll_time, function () { return UI.flashElement(element); });
        }
    };
    UI.flashElement = function (element) {
        element.addClass(V.cssClass.flash);
        setTimeout(function () { return element.removeClass(V.cssClass.flash); }, 1000);
    };
    return UI;
}());
//# sourceMappingURL=content_script.js.map