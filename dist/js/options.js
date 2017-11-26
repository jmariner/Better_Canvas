/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vars__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects__ = __webpack_require__(2);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class Utils {
    static format(str, obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key))
                str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), obj[key]);
        }
        return str;
    }
    static getOrDefault(obj, key, def) {
        if (obj === undefined || obj[key] === undefined)
            return def;
        else
            return obj[key];
    }
    static perPage(url, perPage) {
        return `${url}?per_page=${perPage}`;
    }
    static getJSON(url) {
        return __awaiter(this, void 0, void 0, function* () {
            Utils.checkToken();
            const resp = yield fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + Utils.ACCESS_TOKEN
                })
            });
            if (resp.status === 404) {
                throw new Error("404 error when getting JSON");
            }
            else {
                if (resp.status === 400)
                    console.debug("400 error when getting JSON was OKAY");
                let json = yield resp.text();
                json = json.replace("while(1);", "");
                return JSON.parse(json);
            }
        });
    }
    static putData(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            Utils.checkToken();
            const bodyData = { ns: __WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].canvas.api.namespace, data };
            const method = data instanceof Array && data.length > 0 || data !== undefined ? "PUT" : "DELETE";
            if (method === "DELETE")
                delete bodyData.data;
            const ops = {
                method,
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + Utils.ACCESS_TOKEN
                }),
                body: JSON.stringify(bodyData)
            };
            const resp = yield fetch(url, ops);
            if (!resp.ok || resp.status === 401) {
                console.error(`Unable to ${method} data to ${url}. resp:`, JSON.stringify(resp));
                return false;
            }
            else {
                return true;
            }
        });
    }
    static editDataArray(url, append, values) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingData = (yield Utils.getJSON(url)).data || [];
            let newArray;
            if (append) {
                newArray = existingData.concat(values);
            }
            else {
                if (existingData.length === 0)
                    return true;
                newArray = existingData.filter(val => !values.includes(val));
            }
            return Utils.putData(url, newArray);
        });
    }
    static wait(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => {
                setTimeout(resolve, ms);
            });
        });
    }
    static checkToken() {
        if (Utils.ACCESS_TOKEN === null)
            throw new Error("Access token not set");
    }
    static loadToken() {
        return __awaiter(this, void 0, void 0, function* () {
            Utils.ACCESS_TOKEN = yield new Promise((resolve, reject) => {
                chrome.storage.sync.get(__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].misc.token_key, resultData => {
                    const success = Utils.ACCESS_TOKEN !== null || resultData[__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].misc.token_key];
                    if (success)
                        resolve(resultData[__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].misc.token_key]);
                    else
                        reject();
                });
            });
        });
    }
    static accessTokenPrompt() {
        const openOptions = confirm("Missing access token, press OK to open extension options");
        if (openOptions)
            chrome.runtime.sendMessage(new __WEBPACK_IMPORTED_MODULE_1__objects__["e" /* MessageData */]("open options"));
    }
    static runCb(callbackFunction) {
        if (callbackFunction !== undefined)
            callbackFunction();
    }
    static safeCb(callbackFunction) {
        if (callbackFunction !== undefined)
            return callbackFunction;
        else
            return (() => { });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Utils;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);

class SassVars {
    constructor() {
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
            popup_require_page: "require-page"
        };
        this.dataAttr = {
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
                onDisable: (vars, body) => {
                    [0, 1, 2, 3, 4, 5].forEach(level => $(vars.canvas.selector.module_item, body).removeClass("indent_" + level));
                    $(vars.canvas.selector.subheader, body).addClass("indent_" + vars.ui.subheader_indent);
                    $(vars.canvas.selector.not_subheader, body).addClass("indent_" + vars.ui.main_indent);
                },
                onEnable: (vars, body) => {
                    $(vars.canvas.selector.module_item, body).each(function () {
                        [0, 1, 2, 3, 4, 5].forEach(level => $(this).removeClass("indent_" + level));
                        const defLevel = $(this).attr(vars.data_attr.def_indent);
                        $(this).addClass("indent_" + defLevel);
                    });
                }
            }
        };
        const types = new Set(SassVars.prefixTypes);
        const processObject = (obj, objName) => {
            for (const key in obj) {
                if (!obj.hasOwnProperty(key))
                    continue;
                let val = obj[key];
                if (typeof val === "object") {
                    processObject(val, key);
                }
                else if (typeof val === "string") {
                    if (!key.startsWith("popup_") && (types.has(objName) || types.has(key))) {
                        val = this.prefix + "-" + val;
                    }
                    if (objName === "dataAttr") {
                        val = "data-" + val;
                    }
                    obj[key] = val;
                }
            }
        };
        processObject(this, "root");
        this.sassJson = JSON.stringify(this);
    }
}
SassVars.prefixTypes = ["cssClass", "dataAttr", "id"];
class Vars extends SassVars {
    constructor() {
        super(...arguments);
        this.tooltip = {
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
        this.misc = {
            toc_background: `-webkit-linear-gradient(left, ${this.color.toc_fill} {percent}%, transparent {percent}%)`,
            token_key: "accessToken"
        };
        this.element = {
            checkbox: `<div style='display:none' class='${this.cssClass.checkbox_parent}'>
					<input type='checkbox' ${this.dataAttr.mod_item_id}='{item_id}'>
				</div>`,
            download_button: `<div style='display:none' class='${this.cssClass.download}' title='${this.tooltip.download}'>
					<a href="{file_url}"></a>
				</div>`,
            url_button: `<div style='display:none' class='${this.cssClass.external_url}' title='${this.tooltip.external_url}'>
					<a href="{external_url}" class="not_external" target="_blank"></a>
				</div>`,
            hide_button: `<div style='display:none' class='${this.cssClass.hide_button}'>
					<i ${this.dataAttr.mod_item_id}='{item_id}'></i>
				</div>`,
            course_link: `<li style='background-color: {tabColor}' class='menu-item ic-app-header__menu-list-item'>
				<a href='/courses/{tabID}/modules' class='ic-app-header__menu-list-link'>
					<div class='menu-item-icon-container' aria-hidden='true'><i></i></div>
					<div style='background-color: {tabColor}; border-right-color: {tabColor}'
							${this.dataAttr.course_name}='{name}' ${this.dataAttr.course_code}='{code}'
							class='menu-item__text ${this.cssClass.course_link_text}'></div>
				</a>
			</li>`,
            toc: `<div id='${this.id.toc}' class='ic-app-course-menu list-view'>
				<div class='${this.cssClass.toc_title}'>Table of Contents</div>
				<nav><ul></ul></nav>
			</div>`,
            toc_item: `<li>
				<a href='#' title='{item_name}'>
					{item_name}
					<div class='${this.cssClass.toc_ratio}' ${this.dataAttr.toc_module_id}='{item_id}'></div>
				</a>
			</li>`,
            jump_button: `<div id='${this.id.jump_button}'>
				<i title='${this.tooltip.jump_button}'></i>
			</div>`,
            submission_icon: `<div title='${this.tooltip.has_submission}' class='${this.cssClass.item_icon}'>
				<i class='icon-publish'></i>
			</div>`,
            popup_state_switch: `<div class="switch ${this.cssClass.popup_require_page}">
				<label for="{name}" class="mdl-switch mdl-js-switch mdl-js-ripple-effect">
					<span class="mdl-switch__label">{desc}</span>
					<input id="{name}" type="checkbox" class="mdl-switch__input">
				</label>
			</div>`
        };
        this._canvas = {
            namespace: `com.jmariner.${this.prefix}`,
            root_url: "/api/v1/"
        };
        this.canvas = {
            selector: {
                module: "div.context_module",
                module_item: "li.context_module_item",
                module_items: "ul.context_module_items",
                subheader: "li.context_module_sub_header",
                not_subheader: "li.context_module_item:not(.context_module_sub_header)",
                nav_tabs: "ul#section-tabs"
            },
            api: {
                namespace: this._canvas.namespace,
                root_url: this._canvas.root_url,
                per_page: 100,
                urls: {
                    custom_data: `users/self/custom_data{dataPath}?ns=${this._canvas.namespace}`,
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
            }
        };
    }
    init(courseID) {
        $.each(this.canvas.api.urls, (key, url) => {
            this.canvas.api.urls[key] = this.canvas.api.root_url + __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].format(url, { courseID });
        });
    }
}
const VARS = new Vars();
const V = VARS;
/* harmony export (immutable) */ __webpack_exports__["a"] = V;

/* unused harmony default export */ var _unused_webpack_default_export = (VARS.sassJson);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return ModuleItemType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CanvasPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return MessageType; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);

class Data {
    constructor() {
        this.modules = new Map();
        this.moduleItems = new Map();
        this.states = new Map();
        this.courseTabs = new Map();
        this.navTabs = new Map();
        this.elements = { jump_button: null, toc: null };
    }
}
class Page {
    initialize() {
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
    }
}
class CustomCourseTab {
    constructor(courseData, color) {
        this.id = courseData.id;
        this.name = courseData.name;
        this.code = courseData.course_code;
        this.color = color;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = CustomCourseTab;

class NavTab {
    constructor(tabData) {
        this.id = tabData.id;
        this._position = null;
        this.initPosition = tabData.position;
    }
    setPosition(pos) {
        this._position = pos;
    }
    get hasCustomPosition() {
        return this._position != null;
    }
    get position() {
        return this._position == null ? this.initPosition : this._position === -1 ? null : this._position;
    }
    get hidden() {
        return this._position === -1;
    }
}
/* harmony export (immutable) */ __webpack_exports__["j"] = NavTab;

class State {
    constructor(key, stateData, active) {
        this.name = key;
        this.bodyClass = stateData.cssClass;
        this.onEnable = stateData.onEnable;
        this.onDisable = stateData.onDisable;
        this.active = active;
        this.onPages = [];
        stateData.pages.forEach((page) => {
            const _page = CanvasPage[page.toUpperCase()];
            if (_page !== undefined)
                this.onPages.push(_page);
        });
    }
    onChange(newState, vars, body) {
        if (newState)
            __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].safeCb(this.onEnable)(vars, body);
        else
            __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].safeCb(this.onDisable)(vars, body);
    }
}
/* harmony export (immutable) */ __webpack_exports__["l"] = State;

class Module {
    constructor(moduleJson) {
        this.name = moduleJson.name;
        this.id = moduleJson.id;
        this.itemCount = moduleJson.items_count;
        this.items = [];
    }
}
/* harmony export (immutable) */ __webpack_exports__["g"] = Module;

class ModuleItem {
    constructor(moduleItemJson) {
        if (moduleItemJson)
            this.update(moduleItemJson);
    }
    static fromContentId(contentId) {
        const item = new ModuleItem();
        item._contentId = contentId;
        ModuleItem.byContentId.set(contentId, item);
        return item;
    }
    update(moduleItemJson) {
        this._id = moduleItemJson.id;
        this._name = moduleItemJson.title;
        this.moduleId = moduleItemJson.module_id;
        this._externalUrl = moduleItemJson.external_url || null;
        const typeString = moduleItemJson.type
            .replace(/([A-Z])/g, (r, s) => "_" + s)
            .replace(/^_/, "").toUpperCase();
        this._type = ModuleItemType[typeString];
        if (this._type === undefined)
            console.warn(`Unknown module item type: "${typeString}"`);
        this.checked = false;
        this.hidden = false;
        if (this._type === ModuleItemType.ASSIGNMENT)
            this.setAssignmentId(moduleItemJson.content_id);
        else
            this.assignmentId = null;
    }
    setAssignmentId(id) { this.assignmentId = id; }
    setFileData(data) { this._fileData = data; }
    get canvasElementId() {
        switch (DATA.coursePage) {
            case CanvasPage.MODULES:
                return "context_module_item_" + this._id;
            case CanvasPage.GRADES:
                return "submission_" + this.assignmentId;
            default:
                return null;
        }
    }
    get id() { return this._id; }
    get name() { return this._name; }
    get type() { return this._type; }
    get isGraded() { return this.assignmentId !== null; }
    get isSubHeader() { return this._type === ModuleItemType.SUB_HEADER; }
    get module() { return DATA.modules.get(this.moduleId); }
    get externalUrl() { return this._externalUrl; }
    get contentId() { return this._contentId; }
    get checkboxElement() { return this._checkboxElement; }
    set checkboxElement(value) {
        if (value === null || value.length === 1)
            this._checkboxElement = value;
        else
            throw new Error("Invalid Module Item Element: " + value);
    }
    get hideElement() { return this._hideElement; }
    set hideElement(value) {
        if (value === null || value.length === 1)
            this._hideElement = value;
        else
            throw new Error("Invalid Module Item Element: " + value);
    }
    get fileData() { return this._fileData; }
}
/* harmony export (immutable) */ __webpack_exports__["h"] = ModuleItem;

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
class MessageData {
    constructor(action, type) {
        this.action = action;
        this.type = type || MessageType.BASIC;
    }
}
/* harmony export (immutable) */ __webpack_exports__["e"] = MessageData;

class StateMessageData extends MessageData {
    constructor(action, stateName, state) {
        super(action, MessageType.STATE);
        this.stateName = stateName;
        this.state = state;
        if (action === "set" && this.state === undefined)
            throw new Error("Invalid state message: no boolean to set state to");
    }
}
/* harmony export (immutable) */ __webpack_exports__["m"] = StateMessageData;

class Exception {
    constructor(reason, fatal) {
        if (fatal === undefined)
            fatal = false;
        this.reason = reason;
        this.fatal = fatal;
    }
    get isFatal() {
        return this.fatal;
    }
    toString() {
        return this.reason;
    }
}
/* harmony export (immutable) */ __webpack_exports__["d"] = Exception;

const DATA = new Data();
/* harmony export (immutable) */ __webpack_exports__["c"] = DATA;

const PAGE = new Page();
/* harmony export (immutable) */ __webpack_exports__["k"] = PAGE;



/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vars__ = __webpack_require__(1);

$(function () {
    const tokenEl = $("#token");
    const statusEl = $("#status");
    const saveEl = $("#save");
    chrome.storage.sync.get(__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].misc.token_key, data => {
        if (data[__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].misc.token_key])
            tokenEl.val(data[__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].misc.token_key]);
    });
    saveEl.click(() => {
        const token = tokenEl.val();
        chrome.storage.sync.set({
            [__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].misc.token_key]: token
        }, () => {
            if (chrome.runtime.lastError === undefined) {
                statusEl.text("Access token saved");
                setTimeout(window.close, 500);
            }
        });
    });
});


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjkzZmNiYWYzODMxNjA4NzE1YjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy92YXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9vYmplY3RzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0QyQjtBQUNhO0FBRTFCO0lBSWIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFXLEVBQUUsR0FBVztRQUVyQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ1osQ0FBQztJ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QUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDcEMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFJL0IsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFFSixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJvcHRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZjkzZmNiYWYzODMxNjA4NzE1YjQiLCJpbXBvcnQgeyBWIH0gZnJvbSBcIi4vdmFyc1wiO1xyXG5pbXBvcnQgeyBNZXNzYWdlRGF0YSB9IGZyb20gXCIuL29iamVjdHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFV0aWxzIHtcclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgQUNDRVNTX1RPS0VOOiBzdHJpbmc7XHJcblxyXG5cdHN0YXRpYyBmb3JtYXQoc3RyOiBzdHJpbmcsIG9iajogb2JqZWN0KTogc3RyaW5nIHtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuXHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG5cdFx0XHRcdHN0ciA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoXCJcXFxce1wiICsga2V5ICsgXCJcXFxcfVwiLCBcImdpXCIpLCBvYmpba2V5XSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHN0cjtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXRPckRlZmF1bHQ8VD4ob2JqOiBvYmplY3QsIGtleTogUHJvcGVydHlLZXksIGRlZjogVCk6IFQge1xyXG5cdFx0aWYgKG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9ialtrZXldID09PSB1bmRlZmluZWQpIHJldHVybiBkZWY7XHJcblx0XHRlbHNlIHJldHVybiBvYmpba2V5XTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBwZXJQYWdlKHVybDogc3RyaW5nLCBwZXJQYWdlOiBudW1iZXIpIHtcclxuXHRcdHJldHVybiBgJHt1cmx9P3Blcl9wYWdlPSR7cGVyUGFnZX1gO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIGdldEpTT048VD4odXJsOiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcclxuXHJcblx0XHRVdGlscy5jaGVja1Rva2VuKCk7XHJcblxyXG5cdFx0Y29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHVybCwge1xyXG5cdFx0XHRtZXRob2Q6IFwiR0VUXCIsXHJcblx0XHRcdGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcclxuXHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuXHRcdFx0XHRcIkF1dGhvcml6YXRpb25cIjogXCJCZWFyZXIgXCIgKyBVdGlscy5BQ0NFU1NfVE9LRU5cclxuXHRcdFx0fSlcclxuXHRcdH0gYXMgUmVxdWVzdEluaXQpO1xyXG5cclxuXHRcdGlmIChyZXNwLnN0YXR1cyA9PT0gNDA0KSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIjQwNCBlcnJvciB3aGVuIGdldHRpbmcgSlNPTlwiKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRpZiAocmVzcC5zdGF0dXMgPT09IDQwMClcclxuXHRcdFx0XHRjb25zb2xlLmRlYnVnKFwiNDAwIGVycm9yIHdoZW4gZ2V0dGluZyBKU09OIHdhcyBPS0FZXCIpO1xyXG5cclxuXHRcdFx0bGV0IGpzb24gPSBhd2FpdCByZXNwLnRleHQoKTtcclxuXHRcdFx0anNvbiA9IGpzb24ucmVwbGFjZShcIndoaWxlKDEpO1wiLCBcIlwiKTtcclxuXHJcblx0XHRcdHJldHVybiBKU09OLnBhcnNlKGpzb24pO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyBwdXREYXRhKHVybCwgZGF0YTogYW55W10gfCBhbnkpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuXHJcblx0XHRVdGlscy5jaGVja1Rva2VuKCk7XHJcblxyXG5cdFx0Y29uc3QgYm9keURhdGEgPSB7bnM6IFYuY2FudmFzLmFwaS5uYW1lc3BhY2UsIGRhdGF9O1xyXG5cdFx0Y29uc3QgbWV0aG9kID0gZGF0YSBpbnN0YW5jZW9mIEFycmF5ICYmIGRhdGEubGVuZ3RoID4gMCB8fCBkYXRhICE9PSB1bmRlZmluZWQgPyBcIlBVVFwiIDogXCJERUxFVEVcIjtcclxuXHJcblx0XHRpZiAobWV0aG9kID09PSBcIkRFTEVURVwiKVxyXG5cdFx0XHRkZWxldGUgYm9keURhdGEuZGF0YTtcclxuXHJcblx0XHRjb25zdCBvcHMgPSB7XHJcblx0XHRcdG1ldGhvZCxcclxuXHRcdFx0aGVhZGVyczogbmV3IEhlYWRlcnMoe1xyXG5cdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdFx0XHRcdFwiQXV0aG9yaXphdGlvblwiOiBcIkJlYXJlciBcIiArIFV0aWxzLkFDQ0VTU19UT0tFTlxyXG5cdFx0XHR9KSxcclxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoYm9keURhdGEpXHJcblx0XHR9IGFzIFJlcXVlc3RJbml0O1xyXG5cclxuXHRcdGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaCh1cmwsIG9wcyk7XHJcblxyXG5cdFx0aWYgKCFyZXNwLm9rIHx8IHJlc3Auc3RhdHVzID09PSA0MDEpIHsgLy8gNDAxIHVuYXV0aG9yaXplZFxyXG5cdFx0XHRjb25zb2xlLmVycm9yKGBVbmFibGUgdG8gJHttZXRob2R9IGRhdGEgdG8gJHt1cmx9LiByZXNwOmAsIEpTT04uc3RyaW5naWZ5KHJlc3ApKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyBlZGl0RGF0YUFycmF5KHVybDogc3RyaW5nLCBhcHBlbmQ6IGJvb2xlYW4sIHZhbHVlczogYW55W10pOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuXHJcblx0XHRjb25zdCBleGlzdGluZ0RhdGE6IGFueVtdID0gKFxyXG5cdFx0XHQvLyB1cmwgaXMgc2FtZSBmb3IgZ2V0L3B1dFxyXG5cdFx0XHRhd2FpdCBVdGlscy5nZXRKU09OPHtkYXRhOiBhbnlbXX0+KHVybClcclxuXHRcdCkuZGF0YSB8fCBbXTtcclxuXHJcblx0XHRsZXQgbmV3QXJyYXk7XHJcblxyXG5cdFx0aWYgKGFwcGVuZCkge1xyXG5cdFx0XHRuZXdBcnJheSA9IGV4aXN0aW5nRGF0YS5jb25jYXQodmFsdWVzKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgeyAvLyBzdWJ0cmFjdCBmcm9tIGRhdGEgYXJyYXlcclxuXHRcdFx0aWYgKGV4aXN0aW5nRGF0YS5sZW5ndGggPT09IDApXHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdG5ld0FycmF5ID0gZXhpc3RpbmdEYXRhLmZpbHRlcih2YWwgPT4gIXZhbHVlcy5pbmNsdWRlcyh2YWwpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gVXRpbHMucHV0RGF0YSh1cmwsIG5ld0FycmF5KTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyB3YWl0KG1zOiBudW1iZXIpIHtcclxuXHRcdGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHRzZXRUaW1lb3V0KHJlc29sdmUsIG1zKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGNoZWNrVG9rZW4oKTogdm9pZCB8IG5ldmVyIHtcclxuXHRcdGlmIChVdGlscy5BQ0NFU1NfVE9LRU4gPT09IG51bGwpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkFjY2VzcyB0b2tlbiBub3Qgc2V0XCIpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIGxvYWRUb2tlbigpIHtcclxuXHRcdFV0aWxzLkFDQ0VTU19UT0tFTiA9IGF3YWl0IG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuXHRcdFx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoVi5taXNjLnRva2VuX2tleSwgcmVzdWx0RGF0YSA9PiB7XHJcblxyXG5cdFx0XHRcdGNvbnN0IHN1Y2Nlc3MgPSBVdGlscy5BQ0NFU1NfVE9LRU4gIT09IG51bGwgfHwgcmVzdWx0RGF0YVtWLm1pc2MudG9rZW5fa2V5XTtcclxuXHRcdFx0XHRpZiAoc3VjY2VzcykgcmVzb2x2ZShyZXN1bHREYXRhW1YubWlzYy50b2tlbl9rZXldKTtcclxuXHRcdFx0XHRlbHNlIHJlamVjdCgpO1xyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYWNjZXNzVG9rZW5Qcm9tcHQoKSB7XHJcblx0XHRjb25zdCBvcGVuT3B0aW9ucyA9IGNvbmZpcm0oXCJNaXNzaW5nIGFjY2VzcyB0b2tlbiwgcHJlc3MgT0sgdG8gb3BlbiBleHRlbnNpb24gb3B0aW9uc1wiKTtcclxuXHRcdGlmIChvcGVuT3B0aW9ucykgLy8gVE9ETyBzZW5kIHRhYiBJRCB3aXRoIHRoaXMgbWVzc2FnZT9cclxuXHRcdFx0Y2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UobmV3IE1lc3NhZ2VEYXRhKFwib3BlbiBvcHRpb25zXCIpKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBydW5DYihjYWxsYmFja0Z1bmN0aW9uOiAoKSA9PiB2b2lkKSB7XHJcblx0XHRpZiAoY2FsbGJhY2tGdW5jdGlvbiAhPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRjYWxsYmFja0Z1bmN0aW9uKCk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgc2FmZUNiPEYgZXh0ZW5kcyAoKC4uLmFyZ3MpID0+IHZvaWQpPihjYWxsYmFja0Z1bmN0aW9uOiBGIHwgdW5kZWZpbmVkKTogRiB7XHJcblx0XHRpZiAoY2FsbGJhY2tGdW5jdGlvbiAhPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRyZXR1cm4gY2FsbGJhY2tGdW5jdGlvbjtcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuICgoKSA9PiB7fSkgYXMgRjsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1lbXB0eVxyXG5cdH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxzLnRzIiwiaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XHJcblxyXG5jbGFzcyBTYXNzVmFycyB7XHJcblxyXG5cdHByZWZpeCA9IFwiYmV0dGVyQ2FudmFzXCI7XHJcblxyXG5cdGNzc0NsYXNzID0ge1xyXG5cdFx0YWN0aXZlOiBcImFjdGl2ZVwiLFxyXG5cdFx0Y2hlY2tib3hfcGFyZW50OiBcImNoZWNrYm94LXBhcmVudFwiLFxyXG5cdFx0Y2hlY2tib3hfY2hlY2tlZDogXCJjaGVja2JveC1jaGVja2VkXCIsXHJcblx0XHRjaGVja2JveF90ZDogXCJjaGVja2JveC10ZFwiLFxyXG5cdFx0Zmxhc2g6IFwiYW5pbS1mbGFzaFwiLFxyXG5cdFx0Y291cnNlX2xpbmtfdGV4dDogXCJjb3Vyc2UtbGluay10ZXh0XCIsXHJcblx0XHRpdGVtX2hpZGRlbjogXCJoaWRkZW5cIixcclxuXHRcdGhpZGVfYnV0dG9uOiBcImJ0bi1oaWRlXCIsXHJcblx0XHRoaWRlX2Rpc2FibGVkOiBcImhpZGUtZGlzYWJsZWRcIixcclxuXHRcdHRvY19yYXRpbzogXCJ0b2MtcmF0aW9cIixcclxuXHRcdHRvY190aXRsZTogXCJ0b2MtdGl0bGVcIixcclxuXHRcdGZpeGVkOiBcImZpeGVkXCIsXHJcblx0XHRpdGVtX2ljb246IFwiaWNvbi13cmFwcGVyXCIsXHJcblx0XHRkb3dubG9hZDogXCJkb3dubG9hZC1idG5cIixcclxuXHRcdGV4dGVybmFsX3VybDogXCJ1cmwtYnRuXCIsXHJcblxyXG5cdFx0cG9wdXBfbG9hZGVkOiBcImRvbmUtbG9hZGluZ1wiLFxyXG5cdFx0cG9wdXBfY29ubmVjdGVkOiBcInBhZ2UtY29ubmVjdGVkXCIsXHJcblx0XHRwb3B1cF9yZXF1aXJlX3BhZ2U6IFwicmVxdWlyZS1wYWdlXCJcclxuXHR9O1xyXG5cclxuXHRkYXRhQXR0ciA9IHtcclxuXHRcdHRvY19tb2R1bGVfaWQ6IFwidG9jLW1vZHVsZS1pZFwiLFxyXG5cdFx0dG9jX3RvdGFsOiBcInRvYy10b3RhbFwiLFxyXG5cdFx0dG9jX2NoZWNrZWRfY291bnQ6IFwidG9jLWNoZWNrZWQtY291bnRcIixcclxuXHRcdHRvY19wZXJjZW50YWdlOiBcInRvYy1wZXJjZW50YWdlXCIsXHJcblx0XHRtb2RfaXRlbV9pZDogXCJpdGVtLWlkXCIsXHJcblx0XHRjb3Vyc2VfbmFtZTogXCJjb3Vyc2UtbmFtZVwiLFxyXG5cdFx0Y291cnNlX2NvZGU6IFwiY291cnNlLWNvZGVcIixcclxuXHRcdGRlZl9pbmRlbnQ6IFwiZGVmYXVsdC1pbmRlbnRcIlxyXG5cdH07XHJcblxyXG5cdGlkID0ge1xyXG5cdFx0dG9jOiBcInRvY1wiLFxyXG5cdFx0anVtcF9idXR0b246IFwianVtcC10by10b3BcIixcclxuXHJcblx0XHRwb3B1cF9wYWdlX21pc3Npbmc6IFwicGFnZS1taXNzaW5nLWVycm9yXCIsXHJcblx0XHRwb3B1cF9leF9uYW1lOiBcImV4dGVuc2lvbi1uYW1lXCIsXHJcblx0XHRwb3B1cF9pbnNlcnRpb25fcG9pbnQ6IFwiaW5zZXJ0aW9uLXBvaW50XCIsXHJcblx0XHRwb3B1cF9qdW1wX2J1dHRvbjogXCJqdW1wLXRvXCJcclxuXHR9O1xyXG5cclxuXHRjb2xvciA9IHtcclxuXHRcdHRvY19maWxsOiBcInJnYmEoMCwgMjU1LCAwLCAuNzUpXCIsXHJcblx0XHR0b2NfYm9yZGVyOiBcInJnYigxMDIsIDEyMCwgMTM1KVwiLFxyXG5cdFx0dG9jX3RpdGxlOiBcInZhcigtLWljLWJyYW5kLXByaW1hcnkpXCIsIC8vIHdhcyBcInJnYig1NywgNzUsIDg4KVwiLFxyXG5cdFx0Y2hlY2tib3hfY2hlY2s6IFwicmdiKDIyLCAxNjAsIDEzMylcIixcclxuXHRcdGNoZWNrYm94X2JvcmRlcjogXCJyZ2IoMTAyLCAxMjAsIDEzNSlcIixcclxuXHRcdGhpZ2hsaWdodF9vcmFuZ2U6IFwicmdiKDI1NSwgMTUyLCAwKVwiLFxyXG5cdFx0aGlnaGxpZ2h0X3JlZDogXCJyZ2IoMjU1LCAwLCAwKVwiLFxyXG5cdFx0anVtcF9idXR0b246IFwicmdiKDU3LCA3NSwgODgpXCJcclxuXHR9O1xyXG5cclxuXHR1aSA9IHtcclxuXHRcdHRvcF9pbnNpZGVfcmF0aW86IDAuMDUsXHJcblx0XHRzY3JvbGxfdG9wX29mZnNldDogNSxcclxuXHRcdGp1bXBfdG9wX2N1dG9mZjogMTAwLFxyXG5cdFx0dG9jX3RvcF9tYXJnaW46IDMyLFxyXG5cdFx0c2Nyb2xsX3RpbWU6IDUwMCxcclxuXHRcdGZhZGVfdGltZTogNTAwLFxyXG5cdFx0c3ViaGVhZGVyX2luZGVudDogMCxcclxuXHRcdG1haW5faW5kZW50OiAxXHJcblx0fTtcclxuXHJcblx0c3RhdGUgPSB7XHJcblx0XHRzaG93X2hpZGRlbjoge1xyXG5cdFx0XHRjc3NDbGFzczogXCJzaG93LWhpZGRlblwiLFxyXG5cdFx0XHRwYWdlczogW1wibW9kdWxlc1wiXSxcclxuXHRcdFx0ZGVzYzogXCJTaG93IGhpZGRlbiBpdGVtc1wiXHJcblx0XHR9LFxyXG5cdFx0aGlkZV9jaGVja2VkOiB7XHJcblx0XHRcdGNzc0NsYXNzOiBcImhpZGUtY2hlY2tlZFwiLFxyXG5cdFx0XHRwYWdlczogW1wibW9kdWxlc1wiLCBcImdyYWRlc1wiXSxcclxuXHRcdFx0ZGVzYzogXCJIaWRlIGNvbXBsZXRlZCBpdGVtc1wiXHJcblx0XHR9LFxyXG5cdFx0aGlnaGxpZ2h0X3VuY2hlY2tlZDoge1xyXG5cdFx0XHRjc3NDbGFzczogXCJtYXJrLXVuY2hlY2tlZFwiLFxyXG5cdFx0XHRwYWdlczogW1wibW9kdWxlc1wiLCBcImdyYWRlc1wiXSxcclxuXHRcdFx0ZGVzYzogXCJNYXJrIHVuY2hlY2tlZCBpdGVtc1wiXHJcblx0XHR9LFxyXG5cdFx0ZGlzYWJsZV9pbmRlbnRfb3ZlcnJpZGU6IHtcclxuXHRcdFx0cGFnZXM6IFtcIm1vZHVsZXNcIl0sXHJcblx0XHRcdGRlc2M6IFwiRGlzYWJsZSBpbmRlbnQgb3ZlcnJpZGVzXCIsXHJcblx0XHRcdG9uRGlzYWJsZTogKHZhcnMsIGJvZHkpID0+IHtcclxuXHRcdFx0XHRbMCwxLDIsMyw0LDVdLmZvckVhY2gobGV2ZWwgPT5cclxuXHRcdFx0XHRcdCQodmFycy5jYW52YXMuc2VsZWN0b3IubW9kdWxlX2l0ZW0sIGJvZHkpLnJlbW92ZUNsYXNzKFwiaW5kZW50X1wiICsgbGV2ZWwpKTtcclxuXHRcdFx0XHQkKHZhcnMuY2FudmFzLnNlbGVjdG9yLnN1YmhlYWRlciwgYm9keSkuYWRkQ2xhc3MoXCJpbmRlbnRfXCIgKyB2YXJzLnVpLnN1YmhlYWRlcl9pbmRlbnQpO1xyXG5cdFx0XHRcdCQodmFycy5jYW52YXMuc2VsZWN0b3Iubm90X3N1YmhlYWRlciwgYm9keSkuYWRkQ2xhc3MoXCJpbmRlbnRfXCIgKyB2YXJzLnVpLm1haW5faW5kZW50KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0b25FbmFibGU6ICh2YXJzLCBib2R5KSA9PiB7XHJcblx0XHRcdFx0JCh2YXJzLmNhbnZhcy5zZWxlY3Rvci5tb2R1bGVfaXRlbSwgYm9keSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFswLDEsMiwzLDQsNV0uZm9yRWFjaChsZXZlbCA9PiAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiaW5kZW50X1wiICsgbGV2ZWwpKTtcclxuXHRcdFx0XHRcdGNvbnN0IGRlZkxldmVsID0gJCh0aGlzKS5hdHRyKHZhcnMuZGF0YV9hdHRyLmRlZl9pbmRlbnQpO1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhcImluZGVudF9cIiArIGRlZkxldmVsKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHNhc3NKc29uOiBzdHJpbmc7XHJcblxyXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHByZWZpeFR5cGVzID0gW1wiY3NzQ2xhc3NcIiwgXCJkYXRhQXR0clwiLCBcImlkXCJdO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHRjb25zdCB0eXBlcyA9IG5ldyBTZXQoU2Fzc1ZhcnMucHJlZml4VHlwZXMpO1xyXG5cclxuXHRcdGNvbnN0IHByb2Nlc3NPYmplY3QgPSAob2JqLCBvYmpOYW1lKSA9PiB7XHJcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG5cdFx0XHRcdGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0XHRsZXQgdmFsOiBvYmplY3QgfCBzdHJpbmcgPSBvYmpba2V5XTtcclxuXHRcdFx0XHRpZiAodHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIikge1xyXG5cdFx0XHRcdFx0cHJvY2Vzc09iamVjdCh2YWwsIGtleSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcclxuXHJcblx0XHRcdFx0XHRpZiAoIWtleS5zdGFydHNXaXRoKFwicG9wdXBfXCIpICYmICh0eXBlcy5oYXMob2JqTmFtZSkgfHwgdHlwZXMuaGFzKGtleSkpKSB7XHJcblx0XHRcdFx0XHRcdHZhbCA9IHRoaXMucHJlZml4ICsgXCItXCIgKyB2YWw7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKG9iak5hbWUgPT09IFwiZGF0YUF0dHJcIikge1xyXG5cdFx0XHRcdFx0XHR2YWwgPSBcImRhdGEtXCIgKyB2YWw7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0b2JqW2tleV0gPSB2YWw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0cHJvY2Vzc09iamVjdCh0aGlzLCBcInJvb3RcIik7XHJcblxyXG5cdFx0dGhpcy5zYXNzSnNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXMpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIFZhcnMgZXh0ZW5kcyBTYXNzVmFycyB7XHJcblxyXG5cdHRvb2x0aXAgPSB7XHJcblx0XHRtYXJrX2NvbXBsZXRlOiBcIk1hcmsgYXMgY29tcGxldGVkXCIsXHJcblx0XHRtYXJrX2luY29tcGxldGU6IFwiTWFyayBhcyBpbmNvbXBsZXRlXCIsXHJcblx0XHRoaWRlOiBcIkhpZGUgdGhpcyBpdGVtXCIsXHJcblx0XHR1bmhpZGU6IFwiVW5oaWRlIHRoaXMgaXRlbVwiLFxyXG5cdFx0aGlkZV9kaXNhYmxlZDogXCJDYW5ub3QgaGlkZSBncmFkZWQgaXRlbVwiLFxyXG5cdFx0anVtcF9idXR0b246IFwiSnVtcCB0byB0b3BcIixcclxuXHRcdHdhaXRpbmc6IFwiV2FpdGluZy4uLlwiLFxyXG5cdFx0ZG93bmxvYWQ6IFwiRG93bmxvYWQgZmlsZTogXFxcIntmaWxlbmFtZX1cXFwiXCIsXHJcblx0XHRleHRlcm5hbF91cmw6IFwiVmlzaXQgZXh0ZXJuYWwgVVJMXCIsXHJcblx0XHRoYXNfc3VibWlzc2lvbjogXCJBc3NpZ25tZW50IGhhcyBzdWJtaXNzaW9uXCIsXHJcblx0XHRwb3B1cF9ub191bmNoZWNrZWQ6IFwiTm8gdW5jaGVja2VkIGl0ZW1zIHRvIGp1bXAgdG9cIlxyXG5cdH07XHJcblxyXG5cdG1pc2MgPSB7XHJcblx0XHR0b2NfYmFja2dyb3VuZDogYC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQsICR7dGhpcy5jb2xvci50b2NfZmlsbH0ge3BlcmNlbnR9JSwgdHJhbnNwYXJlbnQge3BlcmNlbnR9JSlgLFxyXG5cdFx0dG9rZW5fa2V5OiBcImFjY2Vzc1Rva2VuXCJcclxuXHR9O1xyXG5cclxuXHRlbGVtZW50ID0ge1xyXG5cclxuXHRcdGNoZWNrYm94OlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuY2hlY2tib3hfcGFyZW50fSc+XHJcblx0XHRcdFx0XHQ8aW5wdXQgdHlwZT0nY2hlY2tib3gnICR7dGhpcy5kYXRhQXR0ci5tb2RfaXRlbV9pZH09J3tpdGVtX2lkfSc+XHJcblx0XHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRkb3dubG9hZF9idXR0b246XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5kb3dubG9hZH0nIHRpdGxlPScke3RoaXMudG9vbHRpcC5kb3dubG9hZH0nPlxyXG5cdFx0XHRcdFx0PGEgaHJlZj1cIntmaWxlX3VybH1cIj48L2E+XHJcblx0XHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHR1cmxfYnV0dG9uOlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuZXh0ZXJuYWxfdXJsfScgdGl0bGU9JyR7dGhpcy50b29sdGlwLmV4dGVybmFsX3VybH0nPlxyXG5cdFx0XHRcdFx0PGEgaHJlZj1cIntleHRlcm5hbF91cmx9XCIgY2xhc3M9XCJub3RfZXh0ZXJuYWxcIiB0YXJnZXQ9XCJfYmxhbmtcIj48L2E+XHJcblx0XHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRoaWRlX2J1dHRvbjpcclxuXHRcdFx0XHRgPGRpdiBzdHlsZT0nZGlzcGxheTpub25lJyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLmhpZGVfYnV0dG9ufSc+XHJcblx0XHRcdFx0XHQ8aSAke3RoaXMuZGF0YUF0dHIubW9kX2l0ZW1faWR9PSd7aXRlbV9pZH0nPjwvaT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGNvdXJzZV9saW5rOlxyXG5cdFx0XHRgPGxpIHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiB7dGFiQ29sb3J9JyBjbGFzcz0nbWVudS1pdGVtIGljLWFwcC1oZWFkZXJfX21lbnUtbGlzdC1pdGVtJz5cclxuXHRcdFx0XHQ8YSBocmVmPScvY291cnNlcy97dGFiSUR9L21vZHVsZXMnIGNsYXNzPSdpYy1hcHAtaGVhZGVyX19tZW51LWxpc3QtbGluayc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdtZW51LWl0ZW0taWNvbi1jb250YWluZXInIGFyaWEtaGlkZGVuPSd0cnVlJz48aT48L2k+PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiB7dGFiQ29sb3J9OyBib3JkZXItcmlnaHQtY29sb3I6IHt0YWJDb2xvcn0nXHJcblx0XHRcdFx0XHRcdFx0JHt0aGlzLmRhdGFBdHRyLmNvdXJzZV9uYW1lfT0ne25hbWV9JyAke3RoaXMuZGF0YUF0dHIuY291cnNlX2NvZGV9PSd7Y29kZX0nXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3M9J21lbnUtaXRlbV9fdGV4dCAke3RoaXMuY3NzQ2xhc3MuY291cnNlX2xpbmtfdGV4dH0nPjwvZGl2PlxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0PC9saT5gLFxyXG5cclxuXHRcdHRvYzpcclxuXHRcdFx0YDxkaXYgaWQ9JyR7dGhpcy5pZC50b2N9JyBjbGFzcz0naWMtYXBwLWNvdXJzZS1tZW51IGxpc3Qtdmlldyc+XHJcblx0XHRcdFx0PGRpdiBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLnRvY190aXRsZX0nPlRhYmxlIG9mIENvbnRlbnRzPC9kaXY+XHJcblx0XHRcdFx0PG5hdj48dWw+PC91bD48L25hdj5cclxuXHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHR0b2NfaXRlbTpcclxuXHRcdFx0YDxsaT5cclxuXHRcdFx0XHQ8YSBocmVmPScjJyB0aXRsZT0ne2l0ZW1fbmFtZX0nPlxyXG5cdFx0XHRcdFx0e2l0ZW1fbmFtZX1cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy50b2NfcmF0aW99JyAke3RoaXMuZGF0YUF0dHIudG9jX21vZHVsZV9pZH09J3tpdGVtX2lkfSc+PC9kaXY+XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHQ8L2xpPmAsXHJcblxyXG5cdFx0anVtcF9idXR0b246XHJcblx0XHRcdGA8ZGl2IGlkPScke3RoaXMuaWQuanVtcF9idXR0b259Jz5cclxuXHRcdFx0XHQ8aSB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuanVtcF9idXR0b259Jz48L2k+XHJcblx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0c3VibWlzc2lvbl9pY29uOlxyXG5cdFx0XHRgPGRpdiB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuaGFzX3N1Ym1pc3Npb259JyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLml0ZW1faWNvbn0nPlxyXG5cdFx0XHRcdDxpIGNsYXNzPSdpY29uLXB1Ymxpc2gnPjwvaT5cclxuXHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRwb3B1cF9zdGF0ZV9zd2l0Y2g6XHJcblx0XHRcdGA8ZGl2IGNsYXNzPVwic3dpdGNoICR7dGhpcy5jc3NDbGFzcy5wb3B1cF9yZXF1aXJlX3BhZ2V9XCI+XHJcblx0XHRcdFx0PGxhYmVsIGZvcj1cIntuYW1lfVwiIGNsYXNzPVwibWRsLXN3aXRjaCBtZGwtanMtc3dpdGNoIG1kbC1qcy1yaXBwbGUtZWZmZWN0XCI+XHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cIm1kbC1zd2l0Y2hfX2xhYmVsXCI+e2Rlc2N9PC9zcGFuPlxyXG5cdFx0XHRcdFx0PGlucHV0IGlkPVwie25hbWV9XCIgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJtZGwtc3dpdGNoX19pbnB1dFwiPlxyXG5cdFx0XHRcdDwvbGFiZWw+XHJcblx0XHRcdDwvZGl2PmBcclxuXHR9O1xyXG5cclxuXHQvLyBzZXBhcmF0ZWQgZm9yIHVzZSBpbiB0ZW1wbGF0ZSBzdHJpbmdzIGJlbG93XHJcblx0cHJpdmF0ZSBfY2FudmFzID0ge1xyXG5cdFx0bmFtZXNwYWNlOiBgY29tLmptYXJpbmVyLiR7dGhpcy5wcmVmaXh9YCxcclxuXHRcdHJvb3RfdXJsOiBcIi9hcGkvdjEvXCJcclxuXHR9O1xyXG5cclxuXHRjYW52YXMgPSB7XHJcblx0XHRzZWxlY3Rvcjoge1xyXG5cdFx0XHRtb2R1bGU6IFwiZGl2LmNvbnRleHRfbW9kdWxlXCIsXHJcblx0XHRcdG1vZHVsZV9pdGVtOiBcImxpLmNvbnRleHRfbW9kdWxlX2l0ZW1cIixcclxuXHRcdFx0bW9kdWxlX2l0ZW1zOiBcInVsLmNvbnRleHRfbW9kdWxlX2l0ZW1zXCIsXHJcblx0XHRcdHN1YmhlYWRlcjogXCJsaS5jb250ZXh0X21vZHVsZV9zdWJfaGVhZGVyXCIsXHJcblx0XHRcdG5vdF9zdWJoZWFkZXI6IFwibGkuY29udGV4dF9tb2R1bGVfaXRlbTpub3QoLmNvbnRleHRfbW9kdWxlX3N1Yl9oZWFkZXIpXCIsXHJcblx0XHRcdG5hdl90YWJzOiBcInVsI3NlY3Rpb24tdGFic1wiXHJcblx0XHR9LFxyXG5cdFx0YXBpOiB7XHJcblx0XHRcdG5hbWVzcGFjZTogdGhpcy5fY2FudmFzLm5hbWVzcGFjZSxcclxuXHRcdFx0cm9vdF91cmw6IHRoaXMuX2NhbnZhcy5yb290X3VybCxcclxuXHRcdFx0cGVyX3BhZ2U6IDEwMCxcclxuXHRcdFx0dXJsczoge1xyXG5cdFx0XHRcdGN1c3RvbV9kYXRhOiBgdXNlcnMvc2VsZi9jdXN0b21fZGF0YXtkYXRhUGF0aH0/bnM9JHt0aGlzLl9jYW52YXMubmFtZXNwYWNlfWAsXHJcblx0XHRcdFx0ZmF2b3JpdGVfY291cnNlczogXCJ1c2Vycy9zZWxmL2Zhdm9yaXRlcy9jb3Vyc2VzXCIsXHJcblx0XHRcdFx0Y3VzdG9tX2NvbG9yczogXCJ1c2Vycy9zZWxmL2NvbG9yc1wiLFxyXG5cdFx0XHRcdGFzc2lnbm1lbnRzOiBcInVzZXJzL3NlbGYvY291cnNlcy97Y291cnNlSUR9L2Fzc2lnbm1lbnRzXCIsXHJcblx0XHRcdFx0bW9kdWxlczogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vbW9kdWxlc1wiLFxyXG5cdFx0XHRcdG1vZHVsZV9pdGVtczogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vbW9kdWxlcy97bW9kdWxlSUR9L2l0ZW1zXCIsXHJcblx0XHRcdFx0ZmlsZV9kaXJlY3Q6IFwiY291cnNlcy97Y291cnNlSUR9L2ZpbGVzL3tmaWxlSUR9XCIsXHJcblx0XHRcdFx0bmF2aWdhdGlvbl90YWJzOiBcImNvdXJzZXMve2NvdXJzZUlEfS90YWJzXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0ZGF0YV91cmxzOiB7XHJcblx0XHRcdFx0YWN0aXZlX3N0YXRlczogXCJhY3RpdmVfc3RhdGVzXCIsXHJcblx0XHRcdFx0Y29tcGxldGVkX2Fzc2lnbm1lbnRzOiBcImNvbXBsZXRlZF9hc3NpZ25tZW50c1wiLFxyXG5cdFx0XHRcdGhpZGRlbl9hc3NpZ25tZW50czogXCJoaWRkZW5fYXNzaWdubWVudHNcIixcclxuXHRcdFx0XHR0YWJfcG9zaXRpb25zOiBcInRhYl9wb3NpdGlvbnNcIlxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0aW5pdChjb3Vyc2VJRDogbnVtYmVyKSB7XHJcblx0XHQkLmVhY2godGhpcy5jYW52YXMuYXBpLnVybHMsIChrZXksIHVybCkgPT4ge1xyXG5cdFx0XHR0aGlzLmNhbnZhcy5hcGkudXJsc1trZXldID0gdGhpcy5jYW52YXMuYXBpLnJvb3RfdXJsICsgVXRpbHMuZm9ybWF0KHVybCwge2NvdXJzZUlEfSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IFZBUlMgPSBuZXcgVmFycygpO1xyXG5leHBvcnQgY29uc3QgViA9IFZBUlM7XHJcbmV4cG9ydCBkZWZhdWx0IFZBUlMuc2Fzc0pzb247XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy92YXJzLnRzIiwiaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XHJcbmltcG9ydCAqIGFzIENhbnZhc0FQSSBmcm9tIFwiLi9jYW52YXNfYXBpXCI7XHJcblxyXG5jbGFzcyBEYXRhIHtcclxuXHRjb3Vyc2VQYWdlOiBDYW52YXNQYWdlO1xyXG5cdGNvdXJzZUlEOiBudW1iZXI7XHJcblx0bW9kdWxlczogTWFwPG51bWJlciwgTW9kdWxlPjsgLy8gbW9kdWxlIGlkID0+IGFycmF5IG9mIE1vZHVsZUl0ZW1cclxuXHRtb2R1bGVJdGVtczogTWFwPG51bWJlciwgTW9kdWxlSXRlbT47IC8vIG1vZHVsZSBpdGVtIGlkID0+IE1vZHVsZUl0ZW1cclxuXHRzdGF0ZXM6IE1hcDxzdHJpbmcsIFN0YXRlPjsgLy8gc3RhdGVOYW1lID0+IFN0YXRlXHJcblx0Y291cnNlVGFiczogTWFwPG51bWJlciwgQ3VzdG9tQ291cnNlVGFiPjsgLy8gY291cnNlIGlkID0+IGNvdXJzZSB0YWJcclxuXHRuYXZUYWJzOiBNYXA8c3RyaW5nLCBOYXZUYWI+OyAvLyB0YWIgaWQgc3RyaW5nID0+IHRhYlxyXG5cdG9uTWFpblBhZ2U6IGJvb2xlYW47XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdGV4dGVuc2lvbklkOiBzdHJpbmc7XHJcblx0ZWxlbWVudHM6IHtqdW1wX2J1dHRvbjogSlF1ZXJ5LCB0b2M6IEpRdWVyeX07XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5tb2R1bGVzID0gbmV3IE1hcCgpO1xyXG5cdFx0dGhpcy5tb2R1bGVJdGVtcyA9IG5ldyBNYXAoKTtcclxuXHRcdHRoaXMuc3RhdGVzID0gbmV3IE1hcCgpO1xyXG5cdFx0dGhpcy5jb3Vyc2VUYWJzID0gbmV3IE1hcCgpO1xyXG5cdFx0dGhpcy5uYXZUYWJzID0gbmV3IE1hcCgpO1xyXG5cclxuXHRcdHRoaXMuZWxlbWVudHMgPSB7anVtcF9idXR0b246IG51bGwsIHRvYzogbnVsbH07XHJcblxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgUGFnZSB7XHJcblxyXG5cdGJvZHk6IEpRdWVyeTtcclxuXHRzY3JvbGxpbmdFbGVtZW50OiBKUXVlcnk7XHJcblx0bWFpbj86IEpRdWVyeTtcclxuXHRjb250ZW50PzogSlF1ZXJ5O1xyXG5cdGxlZnQ/OiBKUXVlcnk7XHJcblx0c2lkZWJhcjogSlF1ZXJ5O1xyXG5cdGdyYWRlcz86IEpRdWVyeTtcclxuXHJcblx0aW5pdGlhbGl6ZSgpIHtcclxuXHJcblx0XHR0aGlzLmJvZHkgPSAkKFwiYm9keVwiKTtcclxuXHRcdHRoaXMuc2Nyb2xsaW5nRWxlbWVudCA9ICQoZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudCB8fCBkb2N1bWVudC5ib2R5KTtcclxuXHRcdHRoaXMuc2lkZWJhciA9ICQoXCIjbWVudVwiKTtcclxuXHRcdHRoaXMubWFpbiA9ICQoXCIjbWFpblwiKTtcclxuXHJcblx0XHRpZiAoREFUQS5vbk1haW5QYWdlKSB7XHJcblx0XHRcdHRoaXMuY29udGVudCA9ICQoXCIjY29udGVudFwiKTtcclxuXHRcdFx0dGhpcy5sZWZ0ID0gJChcIiNsZWZ0LXNpZGVcIik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKERBVEEuY291cnNlUGFnZSA9PT0gQ2FudmFzUGFnZS5HUkFERVMpXHJcblx0XHRcdHRoaXMuZ3JhZGVzID0gJChcIiNncmFkZXNfc3VtbWFyeVwiKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDdXN0b21Db3Vyc2VUYWIge1xyXG5cdHJlYWRvbmx5IGlkOiBudW1iZXI7XHJcblx0cmVhZG9ubHkgbmFtZTogc3RyaW5nO1xyXG5cdHJlYWRvbmx5IGNvZGU6IHN0cmluZztcclxuXHRyZWFkb25seSBjb2xvcjogc3RyaW5nO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihjb3Vyc2VEYXRhOiBDYW52YXNBUEkuQ291cnNlLCBjb2xvcjogc3RyaW5nKSB7XHJcblx0XHR0aGlzLmlkID0gY291cnNlRGF0YS5pZDtcclxuXHRcdHRoaXMubmFtZSA9IGNvdXJzZURhdGEubmFtZTtcclxuXHRcdHRoaXMuY29kZSA9IGNvdXJzZURhdGEuY291cnNlX2NvZGU7XHJcblx0XHR0aGlzLmNvbG9yID0gY29sb3I7XHJcblx0fVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5hdlRhYiB7XHJcblx0cmVhZG9ubHkgaWQ6IHN0cmluZztcclxuXHRwcml2YXRlIHJlYWRvbmx5IGluaXRQb3NpdGlvbjogbnVtYmVyO1xyXG5cdHByaXZhdGUgX3Bvc2l0aW9uOiBudW1iZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHRhYkRhdGE6IENhbnZhc0FQSS5UYWIpIHtcclxuXHRcdHRoaXMuaWQgPSB0YWJEYXRhLmlkO1xyXG5cdFx0dGhpcy5fcG9zaXRpb24gPSBudWxsO1xyXG5cdFx0dGhpcy5pbml0UG9zaXRpb24gPSB0YWJEYXRhLnBvc2l0aW9uO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldFBvc2l0aW9uKHBvcykge1xyXG5cdFx0dGhpcy5fcG9zaXRpb24gPSBwb3M7XHJcblx0fVxyXG5cclxuXHRnZXQgaGFzQ3VzdG9tUG9zaXRpb24oKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcG9zaXRpb24gIT0gbnVsbDtcclxuXHR9XHJcblxyXG5cdGdldCBwb3NpdGlvbigpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9uID09IG51bGwgPyB0aGlzLmluaXRQb3NpdGlvbiA6IHRoaXMuX3Bvc2l0aW9uID09PSAtMSA/IG51bGwgOiB0aGlzLl9wb3NpdGlvbjtcclxuXHR9XHJcblxyXG5cdGdldCBoaWRkZW4oKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcG9zaXRpb24gPT09IC0xO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXRlIHtcclxuXHRwcml2YXRlIG5hbWU6IHN0cmluZztcclxuXHRwcml2YXRlIG9uRW5hYmxlOiAodmFyczogYW55LCBib2R5OiBKUXVlcnkpID0+IHZvaWQ7XHJcblx0cHJpdmF0ZSBvbkRpc2FibGU6ICh2YXJzOiBhbnksIGJvZHk6IEpRdWVyeSkgPT4gdm9pZDtcclxuXHJcblx0cmVhZG9ubHkgYm9keUNsYXNzOiBzdHJpbmc7XHJcblx0cmVhZG9ubHkgb25QYWdlczogQ2FudmFzUGFnZVtdO1xyXG5cclxuXHRwdWJsaWMgYWN0aXZlOiBib29sZWFuO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihrZXksIHN0YXRlRGF0YSwgYWN0aXZlKSB7XHJcblx0XHR0aGlzLm5hbWUgPSBrZXk7XHJcblx0XHR0aGlzLmJvZHlDbGFzcyA9IHN0YXRlRGF0YS5jc3NDbGFzcztcclxuXHRcdHRoaXMub25FbmFibGUgPSBzdGF0ZURhdGEub25FbmFibGU7XHJcblx0XHR0aGlzLm9uRGlzYWJsZSA9IHN0YXRlRGF0YS5vbkRpc2FibGU7XHJcblx0XHR0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcclxuXHRcdHRoaXMub25QYWdlcyA9IFtdO1xyXG5cclxuXHRcdHN0YXRlRGF0YS5wYWdlcy5mb3JFYWNoKChwYWdlOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0Y29uc3QgX3BhZ2UgPSBDYW52YXNQYWdlW3BhZ2UudG9VcHBlckNhc2UoKV07XHJcblx0XHRcdGlmIChfcGFnZSAhPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdHRoaXMub25QYWdlcy5wdXNoKF9wYWdlKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0b25DaGFuZ2UobmV3U3RhdGU6IGJvb2xlYW4sIHZhcnMsIGJvZHk6IEpRdWVyeSkge1xyXG5cdFx0aWYgKG5ld1N0YXRlKSBVdGlscy5zYWZlQ2IodGhpcy5vbkVuYWJsZSkodmFycywgYm9keSk7XHJcblx0XHRlbHNlIFV0aWxzLnNhZmVDYih0aGlzLm9uRGlzYWJsZSkodmFycywgYm9keSk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vZHVsZSB7XHJcblx0cmVhZG9ubHkgbmFtZTogc3RyaW5nO1xyXG5cdHJlYWRvbmx5IGlkOiBudW1iZXI7XHJcblx0cmVhZG9ubHkgaXRlbUNvdW50OiBudW1iZXI7XHJcblx0cmVhZG9ubHkgaXRlbXM6IE1vZHVsZUl0ZW1bXTtcclxuXHJcblx0Y29uc3RydWN0b3IobW9kdWxlSnNvbjogQ2FudmFzQVBJLk1vZHVsZSkge1xyXG5cdFx0dGhpcy5uYW1lID0gbW9kdWxlSnNvbi5uYW1lO1xyXG5cdFx0dGhpcy5pZCA9IG1vZHVsZUpzb24uaWQ7XHJcblx0XHR0aGlzLml0ZW1Db3VudCA9IG1vZHVsZUpzb24uaXRlbXNfY291bnQ7XHJcblx0XHR0aGlzLml0ZW1zID0gW107XHJcblx0fVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vZHVsZUl0ZW0ge1xyXG5cdHByaXZhdGUgX2lkOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xyXG5cdHByaXZhdGUgbW9kdWxlSWQ6IG51bWJlcjtcclxuXHRwcml2YXRlIF90eXBlOiBNb2R1bGVJdGVtVHlwZTtcclxuXHRwcml2YXRlIGFzc2lnbm1lbnRJZDogbnVtYmVyO1xyXG5cdHByaXZhdGUgX2NvbnRlbnRJZDogbnVtYmVyO1xyXG5cdHByaXZhdGUgX2ZpbGVEYXRhOiBDYW52YXNBUEkuRmlsZTtcclxuXHRwcml2YXRlIF9leHRlcm5hbFVybDogc3RyaW5nO1xyXG5cclxuXHRwdWJsaWMgaXNTdWJtaXR0ZWQ6IGJvb2xlYW47XHJcblxyXG5cdHB1YmxpYyBjaGVja2VkOiBib29sZWFuO1xyXG5cdHB1YmxpYyBoaWRkZW46IGJvb2xlYW47XHJcblx0cHJpdmF0ZSBfY2hlY2tib3hFbGVtZW50OiBKUXVlcnk7XHJcblx0cHJpdmF0ZSBfaGlkZUVsZW1lbnQ6IEpRdWVyeTtcclxuXHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBieUNvbnRlbnRJZCA9IG5ldyBNYXA8bnVtYmVyLCBNb2R1bGVJdGVtPigpO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihtb2R1bGVJdGVtSnNvbj86IENhbnZhc0FQSS5Nb2R1bGVJdGVtKSB7XHJcblx0XHRpZiAobW9kdWxlSXRlbUpzb24pIHRoaXMudXBkYXRlKG1vZHVsZUl0ZW1Kc29uKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgZnJvbUNvbnRlbnRJZChjb250ZW50SWQ6IG51bWJlcik6IE1vZHVsZUl0ZW0ge1xyXG5cdFx0Y29uc3QgaXRlbSA9IG5ldyBNb2R1bGVJdGVtKCk7XHJcblx0XHRpdGVtLl9jb250ZW50SWQgPSBjb250ZW50SWQ7XHJcblx0XHRNb2R1bGVJdGVtLmJ5Q29udGVudElkLnNldChjb250ZW50SWQsIGl0ZW0pO1xyXG5cdFx0cmV0dXJuIGl0ZW07XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdXBkYXRlKG1vZHVsZUl0ZW1Kc29uOiBDYW52YXNBUEkuTW9kdWxlSXRlbSkge1xyXG5cdFx0dGhpcy5faWQgPSBtb2R1bGVJdGVtSnNvbi5pZDtcclxuXHRcdHRoaXMuX25hbWUgPSBtb2R1bGVJdGVtSnNvbi50aXRsZTtcclxuXHRcdHRoaXMubW9kdWxlSWQgPSBtb2R1bGVJdGVtSnNvbi5tb2R1bGVfaWQ7XHJcblx0XHR0aGlzLl9leHRlcm5hbFVybCA9IG1vZHVsZUl0ZW1Kc29uLmV4dGVybmFsX3VybCB8fCBudWxsO1xyXG5cclxuXHRcdGNvbnN0IHR5cGVTdHJpbmc6IHN0cmluZyA9IG1vZHVsZUl0ZW1Kc29uLnR5cGVcclxuXHRcdFx0LnJlcGxhY2UoLyhbQS1aXSkvZywgKHIsIHMpID0+IFwiX1wiICsgcylcclxuXHRcdFx0LnJlcGxhY2UoL15fLywgXCJcIikudG9VcHBlckNhc2UoKTtcclxuXHJcblx0XHR0aGlzLl90eXBlID0gTW9kdWxlSXRlbVR5cGVbdHlwZVN0cmluZ107XHJcblxyXG5cdFx0aWYgKHRoaXMuX3R5cGUgPT09IHVuZGVmaW5lZClcclxuXHRcdFx0Y29uc29sZS53YXJuKGBVbmtub3duIG1vZHVsZSBpdGVtIHR5cGU6IFwiJHt0eXBlU3RyaW5nfVwiYCk7XHJcblxyXG5cdFx0dGhpcy5jaGVja2VkID0gZmFsc2U7XHJcblx0XHR0aGlzLmhpZGRlbiA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICh0aGlzLl90eXBlID09PSBNb2R1bGVJdGVtVHlwZS5BU1NJR05NRU5UKVxyXG5cdFx0XHR0aGlzLnNldEFzc2lnbm1lbnRJZChtb2R1bGVJdGVtSnNvbi5jb250ZW50X2lkKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy5hc3NpZ25tZW50SWQgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldEFzc2lnbm1lbnRJZChpZDogbnVtYmVyKSB7IHRoaXMuYXNzaWdubWVudElkID0gaWQ7IH1cclxuXHRwdWJsaWMgc2V0RmlsZURhdGEoZGF0YTogQ2FudmFzQVBJLkZpbGUpIHsgdGhpcy5fZmlsZURhdGEgPSBkYXRhOyB9XHJcblxyXG5cdGdldCBjYW52YXNFbGVtZW50SWQoKSB7XHJcblx0XHRzd2l0Y2ggKERBVEEuY291cnNlUGFnZSkge1xyXG5cdFx0XHRjYXNlIENhbnZhc1BhZ2UuTU9EVUxFUzpcclxuXHRcdFx0XHRyZXR1cm4gXCJjb250ZXh0X21vZHVsZV9pdGVtX1wiICsgdGhpcy5faWQ7IC8vIGxpIGVsZW1lbnRcclxuXHRcdFx0Y2FzZSBDYW52YXNQYWdlLkdSQURFUzpcclxuXHRcdFx0XHRyZXR1cm4gXCJzdWJtaXNzaW9uX1wiICsgdGhpcy5hc3NpZ25tZW50SWQ7IC8vIHRyIGVsZW1lbnRcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBpZCgpIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcblx0Z2V0IG5hbWUoKSB7IHJldHVybiB0aGlzLl9uYW1lO1x0fVxyXG5cdGdldCB0eXBlKCk6IE1vZHVsZUl0ZW1UeXBlIHsgcmV0dXJuIHRoaXMuX3R5cGU7IH1cclxuXHRnZXQgaXNHcmFkZWQoKSB7IHJldHVybiB0aGlzLmFzc2lnbm1lbnRJZCAhPT0gbnVsbDsgfVxyXG5cdGdldCBpc1N1YkhlYWRlcigpIHsgcmV0dXJuIHRoaXMuX3R5cGUgPT09IE1vZHVsZUl0ZW1UeXBlLlNVQl9IRUFERVI7IH1cclxuXHRnZXQgbW9kdWxlKCkgeyByZXR1cm4gREFUQS5tb2R1bGVzLmdldCh0aGlzLm1vZHVsZUlkKTsgfVxyXG5cdGdldCBleHRlcm5hbFVybCgpIHsgcmV0dXJuIHRoaXMuX2V4dGVybmFsVXJsOyB9XHJcblx0Z2V0IGNvbnRlbnRJZCgpIHsgcmV0dXJuIHRoaXMuX2NvbnRlbnRJZDsgfVxyXG5cclxuXHRnZXQgY2hlY2tib3hFbGVtZW50KCk6IEpRdWVyeSB7IHJldHVybiB0aGlzLl9jaGVja2JveEVsZW1lbnQ7IH1cclxuXHRzZXQgY2hlY2tib3hFbGVtZW50KHZhbHVlOiBKUXVlcnkpIHtcclxuXHRcdGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPT09IDEpXHJcblx0XHRcdHRoaXMuX2NoZWNrYm94RWxlbWVudCA9IHZhbHVlO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE1vZHVsZSBJdGVtIEVsZW1lbnQ6IFwiICsgdmFsdWUpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGhpZGVFbGVtZW50KCk6IEpRdWVyeSB7IHJldHVybiB0aGlzLl9oaWRlRWxlbWVudDsgfVxyXG5cdHNldCBoaWRlRWxlbWVudCh2YWx1ZTogSlF1ZXJ5KSB7XHJcblx0XHRpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUubGVuZ3RoID09PSAxKVxyXG5cdFx0XHR0aGlzLl9oaWRlRWxlbWVudCA9IHZhbHVlO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE1vZHVsZSBJdGVtIEVsZW1lbnQ6IFwiICsgdmFsdWUpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGZpbGVEYXRhKCk6IENhbnZhc0FQSS5GaWxlIHsgcmV0dXJuIHRoaXMuX2ZpbGVEYXRhOyB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZW51bSBNb2R1bGVJdGVtVHlwZSB7XHJcblx0QVNTSUdOTUVOVCwgU1VCX0hFQURFUiwgRElTQ1VTU0lPTiwgUVVJWiwgUEFHRSwgRklMRSwgRVhURVJOQUxfVVJMLCBFWFRFUk5BTF9UT09MXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENhbnZhc1BhZ2Uge1xyXG5cdE1PRFVMRVMsIEdSQURFUywgSE9NRSwgVVNFUlMsIEdST1VQUywgQ09MTEFCT1JBVElPTlMsIERJU0NVU1NJT05fVE9QSUNTLCBFWFRFUk5BTF9UT09MUywgQVNTSUdOTUVOVFNcclxufVxyXG5cclxuZXhwb3J0IGVudW0gTWVzc2FnZVR5cGUge1xyXG5cdEJBU0lDLCBTVEFURVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZURhdGEge1xyXG5cdGFjdGlvbjogc3RyaW5nO1xyXG5cdHR5cGU6IE1lc3NhZ2VUeXBlO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihhY3Rpb246IHN0cmluZywgdHlwZT86IE1lc3NhZ2VUeXBlKSB7XHJcblx0XHR0aGlzLmFjdGlvbiA9IGFjdGlvbjtcclxuXHRcdHRoaXMudHlwZSA9IHR5cGUgfHwgTWVzc2FnZVR5cGUuQkFTSUM7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdGVNZXNzYWdlRGF0YSBleHRlbmRzIE1lc3NhZ2VEYXRhIHtcclxuXHRzdGF0ZU5hbWU6IHN0cmluZztcclxuXHRzdGF0ZTogYm9vbGVhbjtcclxuXHJcblx0Y29uc3RydWN0b3IoYWN0aW9uOiBcImdldFwiIHwgXCJzZXRcIiwgc3RhdGVOYW1lOiBzdHJpbmcsIHN0YXRlPzogYm9vbGVhbikge1xyXG5cdFx0c3VwZXIoYWN0aW9uLCBNZXNzYWdlVHlwZS5TVEFURSk7XHJcblxyXG5cdFx0dGhpcy5zdGF0ZU5hbWUgPSBzdGF0ZU5hbWU7XHJcblx0XHR0aGlzLnN0YXRlID0gc3RhdGU7XHJcblxyXG5cdFx0aWYgKGFjdGlvbiA9PT0gXCJzZXRcIiAmJiB0aGlzLnN0YXRlID09PSB1bmRlZmluZWQpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc3RhdGUgbWVzc2FnZTogbm8gYm9vbGVhbiB0byBzZXQgc3RhdGUgdG9cIik7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXhjZXB0aW9uIHtcclxuXHRwcml2YXRlIHJlYXNvbjogc3RyaW5nO1xyXG5cdHByaXZhdGUgZmF0YWw6IGJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKHJlYXNvbjogc3RyaW5nLCBmYXRhbD86IGJvb2xlYW4pIHtcclxuXHRcdGlmIChmYXRhbCA9PT0gdW5kZWZpbmVkKSBmYXRhbCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5yZWFzb24gPSByZWFzb247XHJcblx0XHR0aGlzLmZhdGFsID0gZmF0YWw7XHJcblx0fVxyXG5cclxuXHRnZXQgaXNGYXRhbCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmZhdGFsO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHRvU3RyaW5nKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVhc29uO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IERBVEEgPSBuZXcgRGF0YSgpO1xyXG5leHBvcnQgY29uc3QgUEFHRSA9IG5ldyBQYWdlKCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9vYmplY3RzLnRzIiwiaW1wb3J0IHsgViB9IGZyb20gXCIuL3ZhcnNcIjtcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblxyXG5cdGNvbnN0IHRva2VuRWwgPSAkKFwiI3Rva2VuXCIpO1xyXG5cdGNvbnN0IHN0YXR1c0VsID0gJChcIiNzdGF0dXNcIik7XHJcblx0Y29uc3Qgc2F2ZUVsID0gJChcIiNzYXZlXCIpO1xyXG5cclxuXHRjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChWLm1pc2MudG9rZW5fa2V5LCBkYXRhID0+IHtcclxuXHRcdGlmIChkYXRhW1YubWlzYy50b2tlbl9rZXldKVxyXG5cdFx0XHR0b2tlbkVsLnZhbChkYXRhW1YubWlzYy50b2tlbl9rZXldKTtcclxuXHR9KTtcclxuXHJcblx0c2F2ZUVsLmNsaWNrKCgpID0+IHtcclxuXHRcdGNvbnN0IHRva2VuID0gdG9rZW5FbC52YWwoKTtcclxuXHJcblx0XHRjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7XHJcblx0XHRcdFtWLm1pc2MudG9rZW5fa2V5XTogdG9rZW5cclxuXHRcdH0sICgpID0+IHtcclxuXHRcdFx0aWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvciA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0c3RhdHVzRWwudGV4dChcIkFjY2VzcyB0b2tlbiBzYXZlZFwiKTtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KHdpbmRvdy5jbG9zZSwgNTAwKTtcclxuXHJcblx0XHRcdFx0Ly8gVE9ETyB1cGRhdGUgdGhlIGN1cnJlbnQgY2FudmFzIHBhZ2VzIHdpdGggdGhlIGFjY2VzcyB0b2tlblxyXG5cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL29wdGlvbnMudHMiXSwic291cmNlUm9vdCI6IiJ9