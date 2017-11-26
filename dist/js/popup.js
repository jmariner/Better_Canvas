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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vars__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objects__ = __webpack_require__(2);



const QUERY = { active: true, currentWindow: true };
$(function () {
    const BODY = $("body");
    const jumpButton = $("#" + __WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].id.popup_jump_button);
    const insertionPoint = $("#" + __WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].id.popup_insertion_point);
    $("#" + __WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].id.popup_ex_name).text(chrome.runtime.getManifest().name);
    Promise.resolve()
        .then(() => new Promise(next => {
        const startPing = $.now();
        sendMessage(new __WEBPACK_IMPORTED_MODULE_2__objects__["e" /* MessageData */]("ping"), resp => {
            if (resp !== undefined) {
                console.log("page ping", resp.pong - startPing);
                BODY.addClass(__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].cssClass.popup_connected);
                next();
            }
            else {
                BODY.addClass(__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].cssClass.popup_loaded);
            }
        });
    })).then(() => new Promise(next => {
        sendMessage(new __WEBPACK_IMPORTED_MODULE_2__objects__["e" /* MessageData */]("count unchecked"), resp => {
            if (resp !== undefined) {
                if (resp.count === 0)
                    jumpButton.prop("disabled", true).attr("title", __WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].tooltip.popup_no_unchecked);
                next();
            }
        });
    })).then(() => new Promise(next => {
        let remaining = Object.keys(__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].state).length;
        $.each(__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].state, (stateName, stateData) => {
            sendMessage(new __WEBPACK_IMPORTED_MODULE_2__objects__["m" /* StateMessageData */]("get", stateName), resp => {
                const el = $(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].format(__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].element.popup_state_switch, { name: stateName, desc: stateData.desc }));
                el.insertAfter(insertionPoint);
                componentHandler.upgradeElement(el.find("label").get(0));
                const inputEl = el.find("input").get(0);
                el.change(() => {
                    const newState = inputEl.checked;
                    setMdlChecked(inputEl, !newState);
                    inputEl.title = __WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].tooltip.waiting;
                    inputEl.disabled = true;
                    sendMessage(new __WEBPACK_IMPORTED_MODULE_2__objects__["m" /* StateMessageData */]("set", stateName, newState), success => {
                        if (success) {
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
        jumpButton.click(() => {
            sendMessage(new __WEBPACK_IMPORTED_MODULE_2__objects__["e" /* MessageData */]("jump to first unchecked"), resp => window.close());
        });
    })).then(() => new Promise(next => {
        insertionPoint.remove();
        BODY.addClass(__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].cssClass.popup_loaded);
        next();
    }));
});
function sendMessage(data, callback) {
    chrome.tabs.query(QUERY, tabs => chrome.tabs.sendMessage(tabs[0].id, data, callback));
}
function setMdlChecked(checkbox, checked) {
    $(checkbox)
        .prop("checked", checked)
        .parent()
        .toggleClass("is-checked", checked);
}


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjkzZmNiYWYzODMxNjA4NzE1YjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy92YXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9vYmplY3RzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdEMkI7QUFDYTtBQUUxQjtJQUliLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBVyxFQUFFLEdBQVc7UUFFckMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFF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QyxLQUFLLENBQUMsQ0FBQztnQkFFbkMsRUFBRSxDQUFDLENBQUMsRUFBRSxTQUFTLEtBQUssQ0FBQyxDQUFDO29CQUFDLElBQUksRUFBRSxDQUFDO1lBRS9CLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQ2hCLFdBQVcsQ0FBQyxJQUFJLDZEQUFXLENBQUMseUJBQXlCLENBQUMsRUFBRSxJQUFJLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDakYsQ0FBQyxDQUFDLENBQUM7SUFFSixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLElBQUk7UUFFOUIsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsZ0RBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdkMsSUFBSSxFQUFFLENBQUM7SUFFUixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUM7QUFFSCxxQkFBcUIsSUFBaUIsRUFBRSxRQUFrQztJQUN6RSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDdkYsQ0FBQztBQUVELHVCQUF1QixRQUEwQixFQUFFLE9BQWdCO0lBQ2xFLENBQUMsQ0FBQyxRQUFRLENBQUM7U0FDVCxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztTQUN4QixNQUFNLEVBQUU7U0FDUixXQUFXLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3RDLENBQUMiLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmOTNmY2JhZjM4MzE2MDg3MTViNCIsImltcG9ydCB7IFYgfSBmcm9tIFwiLi92YXJzXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VEYXRhIH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xyXG5cclxuXHRwcml2YXRlIHN0YXRpYyBBQ0NFU1NfVE9LRU46IHN0cmluZztcclxuXHJcblx0c3RhdGljIGZvcm1hdChzdHI6IHN0cmluZywgb2JqOiBvYmplY3QpOiBzdHJpbmcge1xyXG5cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG5cdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpXHJcblx0XHRcdFx0c3RyID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcXFx7XCIgKyBrZXkgKyBcIlxcXFx9XCIsIFwiZ2lcIiksIG9ialtrZXldKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3RyO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldE9yRGVmYXVsdDxUPihvYmo6IG9iamVjdCwga2V5OiBQcm9wZXJ0eUtleSwgZGVmOiBUKTogVCB7XHJcblx0XHRpZiAob2JqID09PSB1bmRlZmluZWQgfHwgb2JqW2tleV0gPT09IHVuZGVmaW5lZCkgcmV0dXJuIGRlZjtcclxuXHRcdGVsc2UgcmV0dXJuIG9ialtrZXldO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHBlclBhZ2UodXJsOiBzdHJpbmcsIHBlclBhZ2U6IG51bWJlcikge1xyXG5cdFx0cmV0dXJuIGAke3VybH0/cGVyX3BhZ2U9JHtwZXJQYWdlfWA7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgZ2V0SlNPTjxUPih1cmw6IHN0cmluZyk6IFByb21pc2U8VD4ge1xyXG5cclxuXHRcdFV0aWxzLmNoZWNrVG9rZW4oKTtcclxuXHJcblx0XHRjb25zdCByZXNwID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcblx0XHRcdG1ldGhvZDogXCJHRVRcIixcclxuXHRcdFx0aGVhZGVyczogbmV3IEhlYWRlcnMoe1xyXG5cdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdFx0XHRcdFwiQXV0aG9yaXphdGlvblwiOiBcIkJlYXJlciBcIiArIFV0aWxzLkFDQ0VTU19UT0tFTlxyXG5cdFx0XHR9KVxyXG5cdFx0fSBhcyBSZXF1ZXN0SW5pdCk7XHJcblxyXG5cdFx0aWYgKHJlc3Auc3RhdHVzID09PSA0MDQpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiNDA0IGVycm9yIHdoZW4gZ2V0dGluZyBKU09OXCIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGlmIChyZXNwLnN0YXR1cyA9PT0gNDAwKVxyXG5cdFx0XHRcdGNvbnNvbGUuZGVidWcoXCI0MDAgZXJyb3Igd2hlbiBnZXR0aW5nIEpTT04gd2FzIE9LQVlcIik7XHJcblxyXG5cdFx0XHRsZXQganNvbiA9IGF3YWl0IHJlc3AudGV4dCgpO1xyXG5cdFx0XHRqc29uID0ganNvbi5yZXBsYWNlKFwid2hpbGUoMSk7XCIsIFwiXCIpO1xyXG5cclxuXHRcdFx0cmV0dXJuIEpTT04ucGFyc2UoanNvbik7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHB1dERhdGEodXJsLCBkYXRhOiBhbnlbXSB8IGFueSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG5cclxuXHRcdFV0aWxzLmNoZWNrVG9rZW4oKTtcclxuXHJcblx0XHRjb25zdCBib2R5RGF0YSA9IHtuczogVi5jYW52YXMuYXBpLm5hbWVzcGFjZSwgZGF0YX07XHJcblx0XHRjb25zdCBtZXRob2QgPSBkYXRhIGluc3RhbmNlb2YgQXJyYXkgJiYgZGF0YS5sZW5ndGggPiAwIHx8IGRhdGEgIT09IHVuZGVmaW5lZCA/IFwiUFVUXCIgOiBcIkRFTEVURVwiO1xyXG5cclxuXHRcdGlmIChtZXRob2QgPT09IFwiREVMRVRFXCIpXHJcblx0XHRcdGRlbGV0ZSBib2R5RGF0YS5kYXRhO1xyXG5cclxuXHRcdGNvbnN0IG9wcyA9IHtcclxuXHRcdFx0bWV0aG9kLFxyXG5cdFx0XHRoZWFkZXJzOiBuZXcgSGVhZGVycyh7XHJcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcblx0XHRcdFx0XCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIFwiICsgVXRpbHMuQUNDRVNTX1RPS0VOXHJcblx0XHRcdH0pLFxyXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShib2R5RGF0YSlcclxuXHRcdH0gYXMgUmVxdWVzdEluaXQ7XHJcblxyXG5cdFx0Y29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHVybCwgb3BzKTtcclxuXHJcblx0XHRpZiAoIXJlc3Aub2sgfHwgcmVzcC5zdGF0dXMgPT09IDQwMSkgeyAvLyA0MDEgdW5hdXRob3JpemVkXHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoYFVuYWJsZSB0byAke21ldGhvZH0gZGF0YSB0byAke3VybH0uIHJlc3A6YCwgSlNPTi5zdHJpbmdpZnkocmVzcCkpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIGVkaXREYXRhQXJyYXkodXJsOiBzdHJpbmcsIGFwcGVuZDogYm9vbGVhbiwgdmFsdWVzOiBhbnlbXSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG5cclxuXHRcdGNvbnN0IGV4aXN0aW5nRGF0YTogYW55W10gPSAoXHJcblx0XHRcdC8vIHVybCBpcyBzYW1lIGZvciBnZXQvcHV0XHJcblx0XHRcdGF3YWl0IFV0aWxzLmdldEpTT048e2RhdGE6IGFueVtdfT4odXJsKVxyXG5cdFx0KS5kYXRhIHx8IFtdO1xyXG5cclxuXHRcdGxldCBuZXdBcnJheTtcclxuXHJcblx0XHRpZiAoYXBwZW5kKSB7XHJcblx0XHRcdG5ld0FycmF5ID0gZXhpc3RpbmdEYXRhLmNvbmNhdCh2YWx1ZXMpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7IC8vIHN1YnRyYWN0IGZyb20gZGF0YSBhcnJheVxyXG5cdFx0XHRpZiAoZXhpc3RpbmdEYXRhLmxlbmd0aCA9PT0gMClcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0bmV3QXJyYXkgPSBleGlzdGluZ0RhdGEuZmlsdGVyKHZhbCA9PiAhdmFsdWVzLmluY2x1ZGVzKHZhbCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBVdGlscy5wdXREYXRhKHVybCwgbmV3QXJyYXkpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHdhaXQobXM6IG51bWJlcikge1xyXG5cdFx0YXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY2hlY2tUb2tlbigpOiB2b2lkIHwgbmV2ZXIge1xyXG5cdFx0aWYgKFV0aWxzLkFDQ0VTU19UT0tFTiA9PT0gbnVsbClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQWNjZXNzIHRva2VuIG5vdCBzZXRcIik7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgbG9hZFRva2VuKCkge1xyXG5cdFx0VXRpbHMuQUNDRVNTX1RPS0VOID0gYXdhaXQgbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG5cdFx0XHRjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChWLm1pc2MudG9rZW5fa2V5LCByZXN1bHREYXRhID0+IHtcclxuXHJcblx0XHRcdFx0Y29uc3Qgc3VjY2VzcyA9IFV0aWxzLkFDQ0VTU19UT0tFTiAhPT0gbnVsbCB8fCByZXN1bHREYXRhW1YubWlzYy50b2tlbl9rZXldO1xyXG5cdFx0XHRcdGlmIChzdWNjZXNzKSByZXNvbHZlKHJlc3VsdERhdGFbVi5taXNjLnRva2VuX2tleV0pO1xyXG5cdFx0XHRcdGVsc2UgcmVqZWN0KCk7XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhY2Nlc3NUb2tlblByb21wdCgpIHtcclxuXHRcdGNvbnN0IG9wZW5PcHRpb25zID0gY29uZmlybShcIk1pc3NpbmcgYWNjZXNzIHRva2VuLCBwcmVzcyBPSyB0byBvcGVuIGV4dGVuc2lvbiBvcHRpb25zXCIpO1xyXG5cdFx0aWYgKG9wZW5PcHRpb25zKSAvLyBUT0RPIHNlbmQgdGFiIElEIHdpdGggdGhpcyBtZXNzYWdlP1xyXG5cdFx0XHRjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShuZXcgTWVzc2FnZURhdGEoXCJvcGVuIG9wdGlvbnNcIikpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHJ1bkNiKGNhbGxiYWNrRnVuY3Rpb246ICgpID0+IHZvaWQpIHtcclxuXHRcdGlmIChjYWxsYmFja0Z1bmN0aW9uICE9PSB1bmRlZmluZWQpXHJcblx0XHRcdGNhbGxiYWNrRnVuY3Rpb24oKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBzYWZlQ2I8RiBleHRlbmRzICgoLi4uYXJncykgPT4gdm9pZCk+KGNhbGxiYWNrRnVuY3Rpb246IEYgfCB1bmRlZmluZWQpOiBGIHtcclxuXHRcdGlmIChjYWxsYmFja0Z1bmN0aW9uICE9PSB1bmRlZmluZWQpXHJcblx0XHRcdHJldHVybiBjYWxsYmFja0Z1bmN0aW9uO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gKCgpID0+IHt9KSBhcyBGOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWVtcHR5XHJcblx0fVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbHMudHMiLCJpbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcclxuXHJcbmNsYXNzIFNhc3NWYXJzIHtcclxuXHJcblx0cHJlZml4ID0gXCJiZXR0ZXJDYW52YXNcIjtcclxuXHJcblx0Y3NzQ2xhc3MgPSB7XHJcblx0XHRhY3RpdmU6IFwiYWN0aXZlXCIsXHJcblx0XHRjaGVja2JveF9wYXJlbnQ6IFwiY2hlY2tib3gtcGFyZW50XCIsXHJcblx0XHRjaGVja2JveF9jaGVja2VkOiBcImNoZWNrYm94LWNoZWNrZWRcIixcclxuXHRcdGNoZWNrYm94X3RkOiBcImNoZWNrYm94LXRkXCIsXHJcblx0XHRmbGFzaDogXCJhbmltLWZsYXNoXCIsXHJcblx0XHRjb3Vyc2VfbGlua190ZXh0OiBcImNvdXJzZS1saW5rLXRleHRcIixcclxuXHRcdGl0ZW1faGlkZGVuOiBcImhpZGRlblwiLFxyXG5cdFx0aGlkZV9idXR0b246IFwiYnRuLWhpZGVcIixcclxuXHRcdGhpZGVfZGlzYWJsZWQ6IFwiaGlkZS1kaXNhYmxlZFwiLFxyXG5cdFx0dG9jX3JhdGlvOiBcInRvYy1yYXRpb1wiLFxyXG5cdFx0dG9jX3RpdGxlOiBcInRvYy10aXRsZVwiLFxyXG5cdFx0Zml4ZWQ6IFwiZml4ZWRcIixcclxuXHRcdGl0ZW1faWNvbjogXCJpY29uLXdyYXBwZXJcIixcclxuXHRcdGRvd25sb2FkOiBcImRvd25sb2FkLWJ0blwiLFxyXG5cdFx0ZXh0ZXJuYWxfdXJsOiBcInVybC1idG5cIixcclxuXHJcblx0XHRwb3B1cF9sb2FkZWQ6IFwiZG9uZS1sb2FkaW5nXCIsXHJcblx0XHRwb3B1cF9jb25uZWN0ZWQ6IFwicGFnZS1jb25uZWN0ZWRcIixcclxuXHRcdHBvcHVwX3JlcXVpcmVfcGFnZTogXCJyZXF1aXJlLXBhZ2VcIlxyXG5cdH07XHJcblxyXG5cdGRhdGFBdHRyID0ge1xyXG5cdFx0dG9jX21vZHVsZV9pZDogXCJ0b2MtbW9kdWxlLWlkXCIsXHJcblx0XHR0b2NfdG90YWw6IFwidG9jLXRvdGFsXCIsXHJcblx0XHR0b2NfY2hlY2tlZF9jb3VudDogXCJ0b2MtY2hlY2tlZC1jb3VudFwiLFxyXG5cdFx0dG9jX3BlcmNlbnRhZ2U6IFwidG9jLXBlcmNlbnRhZ2VcIixcclxuXHRcdG1vZF9pdGVtX2lkOiBcIml0ZW0taWRcIixcclxuXHRcdGNvdXJzZV9uYW1lOiBcImNvdXJzZS1uYW1lXCIsXHJcblx0XHRjb3Vyc2VfY29kZTogXCJjb3Vyc2UtY29kZVwiLFxyXG5cdFx0ZGVmX2luZGVudDogXCJkZWZhdWx0LWluZGVudFwiXHJcblx0fTtcclxuXHJcblx0aWQgPSB7XHJcblx0XHR0b2M6IFwidG9jXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJqdW1wLXRvLXRvcFwiLFxyXG5cclxuXHRcdHBvcHVwX3BhZ2VfbWlzc2luZzogXCJwYWdlLW1pc3NpbmctZXJyb3JcIixcclxuXHRcdHBvcHVwX2V4X25hbWU6IFwiZXh0ZW5zaW9uLW5hbWVcIixcclxuXHRcdHBvcHVwX2luc2VydGlvbl9wb2ludDogXCJpbnNlcnRpb24tcG9pbnRcIixcclxuXHRcdHBvcHVwX2p1bXBfYnV0dG9uOiBcImp1bXAtdG9cIlxyXG5cdH07XHJcblxyXG5cdGNvbG9yID0ge1xyXG5cdFx0dG9jX2ZpbGw6IFwicmdiYSgwLCAyNTUsIDAsIC43NSlcIixcclxuXHRcdHRvY19ib3JkZXI6IFwicmdiKDEwMiwgMTIwLCAxMzUpXCIsXHJcblx0XHR0b2NfdGl0bGU6IFwidmFyKC0taWMtYnJhbmQtcHJpbWFyeSlcIiwgLy8gd2FzIFwicmdiKDU3LCA3NSwgODgpXCIsXHJcblx0XHRjaGVja2JveF9jaGVjazogXCJyZ2IoMjIsIDE2MCwgMTMzKVwiLFxyXG5cdFx0Y2hlY2tib3hfYm9yZGVyOiBcInJnYigxMDIsIDEyMCwgMTM1KVwiLFxyXG5cdFx0aGlnaGxpZ2h0X29yYW5nZTogXCJyZ2IoMjU1LCAxNTIsIDApXCIsXHJcblx0XHRoaWdobGlnaHRfcmVkOiBcInJnYigyNTUsIDAsIDApXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJyZ2IoNTcsIDc1LCA4OClcIlxyXG5cdH07XHJcblxyXG5cdHVpID0ge1xyXG5cdFx0dG9wX2luc2lkZV9yYXRpbzogMC4wNSxcclxuXHRcdHNjcm9sbF90b3Bfb2Zmc2V0OiA1LFxyXG5cdFx0anVtcF90b3BfY3V0b2ZmOiAxMDAsXHJcblx0XHR0b2NfdG9wX21hcmdpbjogMzIsXHJcblx0XHRzY3JvbGxfdGltZTogNTAwLFxyXG5cdFx0ZmFkZV90aW1lOiA1MDAsXHJcblx0XHRzdWJoZWFkZXJfaW5kZW50OiAwLFxyXG5cdFx0bWFpbl9pbmRlbnQ6IDFcclxuXHR9O1xyXG5cclxuXHRzdGF0ZSA9IHtcclxuXHRcdHNob3dfaGlkZGVuOiB7XHJcblx0XHRcdGNzc0NsYXNzOiBcInNob3ctaGlkZGVuXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIlNob3cgaGlkZGVuIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRoaWRlX2NoZWNrZWQ6IHtcclxuXHRcdFx0Y3NzQ2xhc3M6IFwiaGlkZS1jaGVja2VkXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCIsIFwiZ3JhZGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIkhpZGUgY29tcGxldGVkIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRoaWdobGlnaHRfdW5jaGVja2VkOiB7XHJcblx0XHRcdGNzc0NsYXNzOiBcIm1hcmstdW5jaGVja2VkXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCIsIFwiZ3JhZGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIk1hcmsgdW5jaGVja2VkIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRkaXNhYmxlX2luZGVudF9vdmVycmlkZToge1xyXG5cdFx0XHRwYWdlczogW1wibW9kdWxlc1wiXSxcclxuXHRcdFx0ZGVzYzogXCJEaXNhYmxlIGluZGVudCBvdmVycmlkZXNcIixcclxuXHRcdFx0b25EaXNhYmxlOiAodmFycywgYm9keSkgPT4ge1xyXG5cdFx0XHRcdFswLDEsMiwzLDQsNV0uZm9yRWFjaChsZXZlbCA9PlxyXG5cdFx0XHRcdFx0JCh2YXJzLmNhbnZhcy5zZWxlY3Rvci5tb2R1bGVfaXRlbSwgYm9keSkucmVtb3ZlQ2xhc3MoXCJpbmRlbnRfXCIgKyBsZXZlbCkpO1xyXG5cdFx0XHRcdCQodmFycy5jYW52YXMuc2VsZWN0b3Iuc3ViaGVhZGVyLCBib2R5KS5hZGRDbGFzcyhcImluZGVudF9cIiArIHZhcnMudWkuc3ViaGVhZGVyX2luZGVudCk7XHJcblx0XHRcdFx0JCh2YXJzLmNhbnZhcy5zZWxlY3Rvci5ub3Rfc3ViaGVhZGVyLCBib2R5KS5hZGRDbGFzcyhcImluZGVudF9cIiArIHZhcnMudWkubWFpbl9pbmRlbnQpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRvbkVuYWJsZTogKHZhcnMsIGJvZHkpID0+IHtcclxuXHRcdFx0XHQkKHZhcnMuY2FudmFzLnNlbGVjdG9yLm1vZHVsZV9pdGVtLCBib2R5KS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0WzAsMSwyLDMsNCw1XS5mb3JFYWNoKGxldmVsID0+ICQodGhpcykucmVtb3ZlQ2xhc3MoXCJpbmRlbnRfXCIgKyBsZXZlbCkpO1xyXG5cdFx0XHRcdFx0Y29uc3QgZGVmTGV2ZWwgPSAkKHRoaXMpLmF0dHIodmFycy5kYXRhX2F0dHIuZGVmX2luZGVudCk7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwiaW5kZW50X1wiICsgZGVmTGV2ZWwpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0c2Fzc0pzb246IHN0cmluZztcclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgcHJlZml4VHlwZXMgPSBbXCJjc3NDbGFzc1wiLCBcImRhdGFBdHRyXCIsIFwiaWRcIl07XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdGNvbnN0IHR5cGVzID0gbmV3IFNldChTYXNzVmFycy5wcmVmaXhUeXBlcyk7XHJcblxyXG5cdFx0Y29uc3QgcHJvY2Vzc09iamVjdCA9IChvYmosIG9iak5hbWUpID0+IHtcclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XHJcblx0XHRcdFx0aWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkgY29udGludWU7XHJcblxyXG5cdFx0XHRcdGxldCB2YWw6IG9iamVjdCB8IHN0cmluZyA9IG9ialtrZXldO1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKSB7XHJcblx0XHRcdFx0XHRwcm9jZXNzT2JqZWN0KHZhbCwga2V5KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xyXG5cclxuXHRcdFx0XHRcdGlmICgha2V5LnN0YXJ0c1dpdGgoXCJwb3B1cF9cIikgJiYgKHR5cGVzLmhhcyhvYmpOYW1lKSB8fCB0eXBlcy5oYXMoa2V5KSkpIHtcclxuXHRcdFx0XHRcdFx0dmFsID0gdGhpcy5wcmVmaXggKyBcIi1cIiArIHZhbDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAob2JqTmFtZSA9PT0gXCJkYXRhQXR0clwiKSB7XHJcblx0XHRcdFx0XHRcdHZhbCA9IFwiZGF0YS1cIiArIHZhbDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRvYmpba2V5XSA9IHZhbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRwcm9jZXNzT2JqZWN0KHRoaXMsIFwicm9vdFwiKTtcclxuXHJcblx0XHR0aGlzLnNhc3NKc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcyk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuY2xhc3MgVmFycyBleHRlbmRzIFNhc3NWYXJzIHtcclxuXHJcblx0dG9vbHRpcCA9IHtcclxuXHRcdG1hcmtfY29tcGxldGU6IFwiTWFyayBhcyBjb21wbGV0ZWRcIixcclxuXHRcdG1hcmtfaW5jb21wbGV0ZTogXCJNYXJrIGFzIGluY29tcGxldGVcIixcclxuXHRcdGhpZGU6IFwiSGlkZSB0aGlzIGl0ZW1cIixcclxuXHRcdHVuaGlkZTogXCJVbmhpZGUgdGhpcyBpdGVtXCIsXHJcblx0XHRoaWRlX2Rpc2FibGVkOiBcIkNhbm5vdCBoaWRlIGdyYWRlZCBpdGVtXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJKdW1wIHRvIHRvcFwiLFxyXG5cdFx0d2FpdGluZzogXCJXYWl0aW5nLi4uXCIsXHJcblx0XHRkb3dubG9hZDogXCJEb3dubG9hZCBmaWxlOiBcXFwie2ZpbGVuYW1lfVxcXCJcIixcclxuXHRcdGV4dGVybmFsX3VybDogXCJWaXNpdCBleHRlcm5hbCBVUkxcIixcclxuXHRcdGhhc19zdWJtaXNzaW9uOiBcIkFzc2lnbm1lbnQgaGFzIHN1Ym1pc3Npb25cIixcclxuXHRcdHBvcHVwX25vX3VuY2hlY2tlZDogXCJObyB1bmNoZWNrZWQgaXRlbXMgdG8ganVtcCB0b1wiXHJcblx0fTtcclxuXHJcblx0bWlzYyA9IHtcclxuXHRcdHRvY19iYWNrZ3JvdW5kOiBgLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCwgJHt0aGlzLmNvbG9yLnRvY19maWxsfSB7cGVyY2VudH0lLCB0cmFuc3BhcmVudCB7cGVyY2VudH0lKWAsXHJcblx0XHR0b2tlbl9rZXk6IFwiYWNjZXNzVG9rZW5cIlxyXG5cdH07XHJcblxyXG5cdGVsZW1lbnQgPSB7XHJcblxyXG5cdFx0Y2hlY2tib3g6XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5jaGVja2JveF9wYXJlbnR9Jz5cclxuXHRcdFx0XHRcdDxpbnB1dCB0eXBlPSdjaGVja2JveCcgJHt0aGlzLmRhdGFBdHRyLm1vZF9pdGVtX2lkfT0ne2l0ZW1faWR9Jz5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGRvd25sb2FkX2J1dHRvbjpcclxuXHRcdFx0XHRgPGRpdiBzdHlsZT0nZGlzcGxheTpub25lJyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLmRvd25sb2FkfScgdGl0bGU9JyR7dGhpcy50b29sdGlwLmRvd25sb2FkfSc+XHJcblx0XHRcdFx0XHQ8YSBocmVmPVwie2ZpbGVfdXJsfVwiPjwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHVybF9idXR0b246XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5leHRlcm5hbF91cmx9JyB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuZXh0ZXJuYWxfdXJsfSc+XHJcblx0XHRcdFx0XHQ8YSBocmVmPVwie2V4dGVybmFsX3VybH1cIiBjbGFzcz1cIm5vdF9leHRlcm5hbFwiIHRhcmdldD1cIl9ibGFua1wiPjwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGhpZGVfYnV0dG9uOlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuaGlkZV9idXR0b259Jz5cclxuXHRcdFx0XHRcdDxpICR7dGhpcy5kYXRhQXR0ci5tb2RfaXRlbV9pZH09J3tpdGVtX2lkfSc+PC9pPlxyXG5cdFx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0Y291cnNlX2xpbms6XHJcblx0XHRcdGA8bGkgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHt0YWJDb2xvcn0nIGNsYXNzPSdtZW51LWl0ZW0gaWMtYXBwLWhlYWRlcl9fbWVudS1saXN0LWl0ZW0nPlxyXG5cdFx0XHRcdDxhIGhyZWY9Jy9jb3Vyc2VzL3t0YWJJRH0vbW9kdWxlcycgY2xhc3M9J2ljLWFwcC1oZWFkZXJfX21lbnUtbGlzdC1saW5rJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9J21lbnUtaXRlbS1pY29uLWNvbnRhaW5lcicgYXJpYS1oaWRkZW49J3RydWUnPjxpPjwvaT48L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHt0YWJDb2xvcn07IGJvcmRlci1yaWdodC1jb2xvcjoge3RhYkNvbG9yfSdcclxuXHRcdFx0XHRcdFx0XHQke3RoaXMuZGF0YUF0dHIuY291cnNlX25hbWV9PSd7bmFtZX0nICR7dGhpcy5kYXRhQXR0ci5jb3Vyc2VfY29kZX09J3tjb2RlfSdcclxuXHRcdFx0XHRcdFx0XHRjbGFzcz0nbWVudS1pdGVtX190ZXh0ICR7dGhpcy5jc3NDbGFzcy5jb3Vyc2VfbGlua190ZXh0fSc+PC9kaXY+XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHQ8L2xpPmAsXHJcblxyXG5cdFx0dG9jOlxyXG5cdFx0XHRgPGRpdiBpZD0nJHt0aGlzLmlkLnRvY30nIGNsYXNzPSdpYy1hcHAtY291cnNlLW1lbnUgbGlzdC12aWV3Jz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPScke3RoaXMuY3NzQ2xhc3MudG9jX3RpdGxlfSc+VGFibGUgb2YgQ29udGVudHM8L2Rpdj5cclxuXHRcdFx0XHQ8bmF2Pjx1bD48L3VsPjwvbmF2PlxyXG5cdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHRvY19pdGVtOlxyXG5cdFx0XHRgPGxpPlxyXG5cdFx0XHRcdDxhIGhyZWY9JyMnIHRpdGxlPSd7aXRlbV9uYW1lfSc+XHJcblx0XHRcdFx0XHR7aXRlbV9uYW1lfVxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLnRvY19yYXRpb30nICR7dGhpcy5kYXRhQXR0ci50b2NfbW9kdWxlX2lkfT0ne2l0ZW1faWR9Jz48L2Rpdj5cclxuXHRcdFx0XHQ8L2E+XHJcblx0XHRcdDwvbGk+YCxcclxuXHJcblx0XHRqdW1wX2J1dHRvbjpcclxuXHRcdFx0YDxkaXYgaWQ9JyR7dGhpcy5pZC5qdW1wX2J1dHRvbn0nPlxyXG5cdFx0XHRcdDxpIHRpdGxlPScke3RoaXMudG9vbHRpcC5qdW1wX2J1dHRvbn0nPjwvaT5cclxuXHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRzdWJtaXNzaW9uX2ljb246XHJcblx0XHRcdGA8ZGl2IHRpdGxlPScke3RoaXMudG9vbHRpcC5oYXNfc3VibWlzc2lvbn0nIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuaXRlbV9pY29ufSc+XHJcblx0XHRcdFx0PGkgY2xhc3M9J2ljb24tcHVibGlzaCc+PC9pPlxyXG5cdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHBvcHVwX3N0YXRlX3N3aXRjaDpcclxuXHRcdFx0YDxkaXYgY2xhc3M9XCJzd2l0Y2ggJHt0aGlzLmNzc0NsYXNzLnBvcHVwX3JlcXVpcmVfcGFnZX1cIj5cclxuXHRcdFx0XHQ8bGFiZWwgZm9yPVwie25hbWV9XCIgY2xhc3M9XCJtZGwtc3dpdGNoIG1kbC1qcy1zd2l0Y2ggbWRsLWpzLXJpcHBsZS1lZmZlY3RcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwibWRsLXN3aXRjaF9fbGFiZWxcIj57ZGVzY308L3NwYW4+XHJcblx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJ7bmFtZX1cIiB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cIm1kbC1zd2l0Y2hfX2lucHV0XCI+XHJcblx0XHRcdFx0PC9sYWJlbD5cclxuXHRcdFx0PC9kaXY+YFxyXG5cdH07XHJcblxyXG5cdC8vIHNlcGFyYXRlZCBmb3IgdXNlIGluIHRlbXBsYXRlIHN0cmluZ3MgYmVsb3dcclxuXHRwcml2YXRlIF9jYW52YXMgPSB7XHJcblx0XHRuYW1lc3BhY2U6IGBjb20uam1hcmluZXIuJHt0aGlzLnByZWZpeH1gLFxyXG5cdFx0cm9vdF91cmw6IFwiL2FwaS92MS9cIlxyXG5cdH07XHJcblxyXG5cdGNhbnZhcyA9IHtcclxuXHRcdHNlbGVjdG9yOiB7XHJcblx0XHRcdG1vZHVsZTogXCJkaXYuY29udGV4dF9tb2R1bGVcIixcclxuXHRcdFx0bW9kdWxlX2l0ZW06IFwibGkuY29udGV4dF9tb2R1bGVfaXRlbVwiLFxyXG5cdFx0XHRtb2R1bGVfaXRlbXM6IFwidWwuY29udGV4dF9tb2R1bGVfaXRlbXNcIixcclxuXHRcdFx0c3ViaGVhZGVyOiBcImxpLmNvbnRleHRfbW9kdWxlX3N1Yl9oZWFkZXJcIixcclxuXHRcdFx0bm90X3N1YmhlYWRlcjogXCJsaS5jb250ZXh0X21vZHVsZV9pdGVtOm5vdCguY29udGV4dF9tb2R1bGVfc3ViX2hlYWRlcilcIixcclxuXHRcdFx0bmF2X3RhYnM6IFwidWwjc2VjdGlvbi10YWJzXCJcclxuXHRcdH0sXHJcblx0XHRhcGk6IHtcclxuXHRcdFx0bmFtZXNwYWNlOiB0aGlzLl9jYW52YXMubmFtZXNwYWNlLFxyXG5cdFx0XHRyb290X3VybDogdGhpcy5fY2FudmFzLnJvb3RfdXJsLFxyXG5cdFx0XHRwZXJfcGFnZTogMTAwLFxyXG5cdFx0XHR1cmxzOiB7XHJcblx0XHRcdFx0Y3VzdG9tX2RhdGE6IGB1c2Vycy9zZWxmL2N1c3RvbV9kYXRhe2RhdGFQYXRofT9ucz0ke3RoaXMuX2NhbnZhcy5uYW1lc3BhY2V9YCxcclxuXHRcdFx0XHRmYXZvcml0ZV9jb3Vyc2VzOiBcInVzZXJzL3NlbGYvZmF2b3JpdGVzL2NvdXJzZXNcIixcclxuXHRcdFx0XHRjdXN0b21fY29sb3JzOiBcInVzZXJzL3NlbGYvY29sb3JzXCIsXHJcblx0XHRcdFx0YXNzaWdubWVudHM6IFwidXNlcnMvc2VsZi9jb3Vyc2VzL3tjb3Vyc2VJRH0vYXNzaWdubWVudHNcIixcclxuXHRcdFx0XHRtb2R1bGVzOiBcImNvdXJzZXMve2NvdXJzZUlEfS9tb2R1bGVzXCIsXHJcblx0XHRcdFx0bW9kdWxlX2l0ZW1zOiBcImNvdXJzZXMve2NvdXJzZUlEfS9tb2R1bGVzL3ttb2R1bGVJRH0vaXRlbXNcIixcclxuXHRcdFx0XHRmaWxlX2RpcmVjdDogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vZmlsZXMve2ZpbGVJRH1cIixcclxuXHRcdFx0XHRuYXZpZ2F0aW9uX3RhYnM6IFwiY291cnNlcy97Y291cnNlSUR9L3RhYnNcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRkYXRhX3VybHM6IHtcclxuXHRcdFx0XHRhY3RpdmVfc3RhdGVzOiBcImFjdGl2ZV9zdGF0ZXNcIixcclxuXHRcdFx0XHRjb21wbGV0ZWRfYXNzaWdubWVudHM6IFwiY29tcGxldGVkX2Fzc2lnbm1lbnRzXCIsXHJcblx0XHRcdFx0aGlkZGVuX2Fzc2lnbm1lbnRzOiBcImhpZGRlbl9hc3NpZ25tZW50c1wiLFxyXG5cdFx0XHRcdHRhYl9wb3NpdGlvbnM6IFwidGFiX3Bvc2l0aW9uc1wiXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRpbml0KGNvdXJzZUlEOiBudW1iZXIpIHtcclxuXHRcdCQuZWFjaCh0aGlzLmNhbnZhcy5hcGkudXJscywgKGtleSwgdXJsKSA9PiB7XHJcblx0XHRcdHRoaXMuY2FudmFzLmFwaS51cmxzW2tleV0gPSB0aGlzLmNhbnZhcy5hcGkucm9vdF91cmwgKyBVdGlscy5mb3JtYXQodXJsLCB7Y291cnNlSUR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuY29uc3QgVkFSUyA9IG5ldyBWYXJzKCk7XHJcbmV4cG9ydCBjb25zdCBWID0gVkFSUztcclxuZXhwb3J0IGRlZmF1bHQgVkFSUy5zYXNzSnNvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3ZhcnMudHMiLCJpbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0ICogYXMgQ2FudmFzQVBJIGZyb20gXCIuL2NhbnZhc19hcGlcIjtcclxuXHJcbmNsYXNzIERhdGEge1xyXG5cdGNvdXJzZVBhZ2U6IENhbnZhc1BhZ2U7XHJcblx0Y291cnNlSUQ6IG51bWJlcjtcclxuXHRtb2R1bGVzOiBNYXA8bnVtYmVyLCBNb2R1bGU+OyAvLyBtb2R1bGUgaWQgPT4gYXJyYXkgb2YgTW9kdWxlSXRlbVxyXG5cdG1vZHVsZUl0ZW1zOiBNYXA8bnVtYmVyLCBNb2R1bGVJdGVtPjsgLy8gbW9kdWxlIGl0ZW0gaWQgPT4gTW9kdWxlSXRlbVxyXG5cdHN0YXRlczogTWFwPHN0cmluZywgU3RhdGU+OyAvLyBzdGF0ZU5hbWUgPT4gU3RhdGVcclxuXHRjb3Vyc2VUYWJzOiBNYXA8bnVtYmVyLCBDdXN0b21Db3Vyc2VUYWI+OyAvLyBjb3Vyc2UgaWQgPT4gY291cnNlIHRhYlxyXG5cdG5hdlRhYnM6IE1hcDxzdHJpbmcsIE5hdlRhYj47IC8vIHRhYiBpZCBzdHJpbmcgPT4gdGFiXHJcblx0b25NYWluUGFnZTogYm9vbGVhbjtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0ZXh0ZW5zaW9uSWQ6IHN0cmluZztcclxuXHRlbGVtZW50czoge2p1bXBfYnV0dG9uOiBKUXVlcnksIHRvYzogSlF1ZXJ5fTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLm1vZHVsZXMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLm1vZHVsZUl0ZW1zID0gbmV3IE1hcCgpO1xyXG5cdFx0dGhpcy5zdGF0ZXMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLmNvdXJzZVRhYnMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLm5hdlRhYnMgPSBuZXcgTWFwKCk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50cyA9IHtqdW1wX2J1dHRvbjogbnVsbCwgdG9jOiBudWxsfTtcclxuXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBQYWdlIHtcclxuXHJcblx0Ym9keTogSlF1ZXJ5O1xyXG5cdHNjcm9sbGluZ0VsZW1lbnQ6IEpRdWVyeTtcclxuXHRtYWluPzogSlF1ZXJ5O1xyXG5cdGNvbnRlbnQ/OiBKUXVlcnk7XHJcblx0bGVmdD86IEpRdWVyeTtcclxuXHRzaWRlYmFyOiBKUXVlcnk7XHJcblx0Z3JhZGVzPzogSlF1ZXJ5O1xyXG5cclxuXHRpbml0aWFsaXplKCkge1xyXG5cclxuXHRcdHRoaXMuYm9keSA9ICQoXCJib2R5XCIpO1xyXG5cdFx0dGhpcy5zY3JvbGxpbmdFbGVtZW50ID0gJChkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IGRvY3VtZW50LmJvZHkpO1xyXG5cdFx0dGhpcy5zaWRlYmFyID0gJChcIiNtZW51XCIpO1xyXG5cdFx0dGhpcy5tYWluID0gJChcIiNtYWluXCIpO1xyXG5cclxuXHRcdGlmIChEQVRBLm9uTWFpblBhZ2UpIHtcclxuXHRcdFx0dGhpcy5jb250ZW50ID0gJChcIiNjb250ZW50XCIpO1xyXG5cdFx0XHR0aGlzLmxlZnQgPSAkKFwiI2xlZnQtc2lkZVwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoREFUQS5jb3Vyc2VQYWdlID09PSBDYW52YXNQYWdlLkdSQURFUylcclxuXHRcdFx0dGhpcy5ncmFkZXMgPSAkKFwiI2dyYWRlc19zdW1tYXJ5XCIpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEN1c3RvbUNvdXJzZVRhYiB7XHJcblx0cmVhZG9ubHkgaWQ6IG51bWJlcjtcclxuXHRyZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcblx0cmVhZG9ubHkgY29kZTogc3RyaW5nO1xyXG5cdHJlYWRvbmx5IGNvbG9yOiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGNvdXJzZURhdGE6IENhbnZhc0FQSS5Db3Vyc2UsIGNvbG9yOiBzdHJpbmcpIHtcclxuXHRcdHRoaXMuaWQgPSBjb3Vyc2VEYXRhLmlkO1xyXG5cdFx0dGhpcy5uYW1lID0gY291cnNlRGF0YS5uYW1lO1xyXG5cdFx0dGhpcy5jb2RlID0gY291cnNlRGF0YS5jb3Vyc2VfY29kZTtcclxuXHRcdHRoaXMuY29sb3IgPSBjb2xvcjtcclxuXHR9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2VGFiIHtcclxuXHRyZWFkb25seSBpZDogc3RyaW5nO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgaW5pdFBvc2l0aW9uOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfcG9zaXRpb246IG51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IodGFiRGF0YTogQ2FudmFzQVBJLlRhYikge1xyXG5cdFx0dGhpcy5pZCA9IHRhYkRhdGEuaWQ7XHJcblx0XHR0aGlzLl9wb3NpdGlvbiA9IG51bGw7XHJcblx0XHR0aGlzLmluaXRQb3NpdGlvbiA9IHRhYkRhdGEucG9zaXRpb247XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0UG9zaXRpb24ocG9zKSB7XHJcblx0XHR0aGlzLl9wb3NpdGlvbiA9IHBvcztcclxuXHR9XHJcblxyXG5cdGdldCBoYXNDdXN0b21Qb3NpdGlvbigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbiAhPSBudWxsO1xyXG5cdH1cclxuXHJcblx0Z2V0IHBvc2l0aW9uKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcG9zaXRpb24gPT0gbnVsbCA/IHRoaXMuaW5pdFBvc2l0aW9uIDogdGhpcy5fcG9zaXRpb24gPT09IC0xID8gbnVsbCA6IHRoaXMuX3Bvc2l0aW9uO1xyXG5cdH1cclxuXHJcblx0Z2V0IGhpZGRlbigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbiA9PT0gLTE7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdGUge1xyXG5cdHByaXZhdGUgbmFtZTogc3RyaW5nO1xyXG5cdHByaXZhdGUgb25FbmFibGU6ICh2YXJzOiBhbnksIGJvZHk6IEpRdWVyeSkgPT4gdm9pZDtcclxuXHRwcml2YXRlIG9uRGlzYWJsZTogKHZhcnM6IGFueSwgYm9keTogSlF1ZXJ5KSA9PiB2b2lkO1xyXG5cclxuXHRyZWFkb25seSBib2R5Q2xhc3M6IHN0cmluZztcclxuXHRyZWFkb25seSBvblBhZ2VzOiBDYW52YXNQYWdlW107XHJcblxyXG5cdHB1YmxpYyBhY3RpdmU6IGJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKGtleSwgc3RhdGVEYXRhLCBhY3RpdmUpIHtcclxuXHRcdHRoaXMubmFtZSA9IGtleTtcclxuXHRcdHRoaXMuYm9keUNsYXNzID0gc3RhdGVEYXRhLmNzc0NsYXNzO1xyXG5cdFx0dGhpcy5vbkVuYWJsZSA9IHN0YXRlRGF0YS5vbkVuYWJsZTtcclxuXHRcdHRoaXMub25EaXNhYmxlID0gc3RhdGVEYXRhLm9uRGlzYWJsZTtcclxuXHRcdHRoaXMuYWN0aXZlID0gYWN0aXZlO1xyXG5cdFx0dGhpcy5vblBhZ2VzID0gW107XHJcblxyXG5cdFx0c3RhdGVEYXRhLnBhZ2VzLmZvckVhY2goKHBhZ2U6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRjb25zdCBfcGFnZSA9IENhbnZhc1BhZ2VbcGFnZS50b1VwcGVyQ2FzZSgpXTtcclxuXHRcdFx0aWYgKF9wYWdlICE9PSB1bmRlZmluZWQpXHJcblx0XHRcdFx0dGhpcy5vblBhZ2VzLnB1c2goX3BhZ2UpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRvbkNoYW5nZShuZXdTdGF0ZTogYm9vbGVhbiwgdmFycywgYm9keTogSlF1ZXJ5KSB7XHJcblx0XHRpZiAobmV3U3RhdGUpIFV0aWxzLnNhZmVDYih0aGlzLm9uRW5hYmxlKSh2YXJzLCBib2R5KTtcclxuXHRcdGVsc2UgVXRpbHMuc2FmZUNiKHRoaXMub25EaXNhYmxlKSh2YXJzLCBib2R5KTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9kdWxlIHtcclxuXHRyZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcblx0cmVhZG9ubHkgaWQ6IG51bWJlcjtcclxuXHRyZWFkb25seSBpdGVtQ291bnQ6IG51bWJlcjtcclxuXHRyZWFkb25seSBpdGVtczogTW9kdWxlSXRlbVtdO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihtb2R1bGVKc29uOiBDYW52YXNBUEkuTW9kdWxlKSB7XHJcblx0XHR0aGlzLm5hbWUgPSBtb2R1bGVKc29uLm5hbWU7XHJcblx0XHR0aGlzLmlkID0gbW9kdWxlSnNvbi5pZDtcclxuXHRcdHRoaXMuaXRlbUNvdW50ID0gbW9kdWxlSnNvbi5pdGVtc19jb3VudDtcclxuXHRcdHRoaXMuaXRlbXMgPSBbXTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9kdWxlSXRlbSB7XHJcblx0cHJpdmF0ZSBfaWQ6IG51bWJlcjtcclxuXHRwcml2YXRlIF9uYW1lOiBzdHJpbmc7XHJcblx0cHJpdmF0ZSBtb2R1bGVJZDogbnVtYmVyO1xyXG5cdHByaXZhdGUgX3R5cGU6IE1vZHVsZUl0ZW1UeXBlO1xyXG5cdHByaXZhdGUgYXNzaWdubWVudElkOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfY29udGVudElkOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfZmlsZURhdGE6IENhbnZhc0FQSS5GaWxlO1xyXG5cdHByaXZhdGUgX2V4dGVybmFsVXJsOiBzdHJpbmc7XHJcblxyXG5cdHB1YmxpYyBpc1N1Ym1pdHRlZDogYm9vbGVhbjtcclxuXHJcblx0cHVibGljIGNoZWNrZWQ6IGJvb2xlYW47XHJcblx0cHVibGljIGhpZGRlbjogYm9vbGVhbjtcclxuXHRwcml2YXRlIF9jaGVja2JveEVsZW1lbnQ6IEpRdWVyeTtcclxuXHRwcml2YXRlIF9oaWRlRWxlbWVudDogSlF1ZXJ5O1xyXG5cclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGJ5Q29udGVudElkID0gbmV3IE1hcDxudW1iZXIsIE1vZHVsZUl0ZW0+KCk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG1vZHVsZUl0ZW1Kc29uPzogQ2FudmFzQVBJLk1vZHVsZUl0ZW0pIHtcclxuXHRcdGlmIChtb2R1bGVJdGVtSnNvbikgdGhpcy51cGRhdGUobW9kdWxlSXRlbUpzb24pO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBmcm9tQ29udGVudElkKGNvbnRlbnRJZDogbnVtYmVyKTogTW9kdWxlSXRlbSB7XHJcblx0XHRjb25zdCBpdGVtID0gbmV3IE1vZHVsZUl0ZW0oKTtcclxuXHRcdGl0ZW0uX2NvbnRlbnRJZCA9IGNvbnRlbnRJZDtcclxuXHRcdE1vZHVsZUl0ZW0uYnlDb250ZW50SWQuc2V0KGNvbnRlbnRJZCwgaXRlbSk7XHJcblx0XHRyZXR1cm4gaXRlbTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGUobW9kdWxlSXRlbUpzb246IENhbnZhc0FQSS5Nb2R1bGVJdGVtKSB7XHJcblx0XHR0aGlzLl9pZCA9IG1vZHVsZUl0ZW1Kc29uLmlkO1xyXG5cdFx0dGhpcy5fbmFtZSA9IG1vZHVsZUl0ZW1Kc29uLnRpdGxlO1xyXG5cdFx0dGhpcy5tb2R1bGVJZCA9IG1vZHVsZUl0ZW1Kc29uLm1vZHVsZV9pZDtcclxuXHRcdHRoaXMuX2V4dGVybmFsVXJsID0gbW9kdWxlSXRlbUpzb24uZXh0ZXJuYWxfdXJsIHx8IG51bGw7XHJcblxyXG5cdFx0Y29uc3QgdHlwZVN0cmluZzogc3RyaW5nID0gbW9kdWxlSXRlbUpzb24udHlwZVxyXG5cdFx0XHQucmVwbGFjZSgvKFtBLVpdKS9nLCAociwgcykgPT4gXCJfXCIgKyBzKVxyXG5cdFx0XHQucmVwbGFjZSgvXl8vLCBcIlwiKS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuXHRcdHRoaXMuX3R5cGUgPSBNb2R1bGVJdGVtVHlwZVt0eXBlU3RyaW5nXTtcclxuXHJcblx0XHRpZiAodGhpcy5fdHlwZSA9PT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRjb25zb2xlLndhcm4oYFVua25vd24gbW9kdWxlIGl0ZW0gdHlwZTogXCIke3R5cGVTdHJpbmd9XCJgKTtcclxuXHJcblx0XHR0aGlzLmNoZWNrZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuaGlkZGVuID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3R5cGUgPT09IE1vZHVsZUl0ZW1UeXBlLkFTU0lHTk1FTlQpXHJcblx0XHRcdHRoaXMuc2V0QXNzaWdubWVudElkKG1vZHVsZUl0ZW1Kc29uLmNvbnRlbnRfaWQpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLmFzc2lnbm1lbnRJZCA9IG51bGw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0QXNzaWdubWVudElkKGlkOiBudW1iZXIpIHsgdGhpcy5hc3NpZ25tZW50SWQgPSBpZDsgfVxyXG5cdHB1YmxpYyBzZXRGaWxlRGF0YShkYXRhOiBDYW52YXNBUEkuRmlsZSkgeyB0aGlzLl9maWxlRGF0YSA9IGRhdGE7IH1cclxuXHJcblx0Z2V0IGNhbnZhc0VsZW1lbnRJZCgpIHtcclxuXHRcdHN3aXRjaCAoREFUQS5jb3Vyc2VQYWdlKSB7XHJcblx0XHRcdGNhc2UgQ2FudmFzUGFnZS5NT0RVTEVTOlxyXG5cdFx0XHRcdHJldHVybiBcImNvbnRleHRfbW9kdWxlX2l0ZW1fXCIgKyB0aGlzLl9pZDsgLy8gbGkgZWxlbWVudFxyXG5cdFx0XHRjYXNlIENhbnZhc1BhZ2UuR1JBREVTOlxyXG5cdFx0XHRcdHJldHVybiBcInN1Ym1pc3Npb25fXCIgKyB0aGlzLmFzc2lnbm1lbnRJZDsgLy8gdHIgZWxlbWVudFxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IGlkKCkgeyByZXR1cm4gdGhpcy5faWQ7IH1cclxuXHRnZXQgbmFtZSgpIHsgcmV0dXJuIHRoaXMuX25hbWU7XHR9XHJcblx0Z2V0IHR5cGUoKTogTW9kdWxlSXRlbVR5cGUgeyByZXR1cm4gdGhpcy5fdHlwZTsgfVxyXG5cdGdldCBpc0dyYWRlZCgpIHsgcmV0dXJuIHRoaXMuYXNzaWdubWVudElkICE9PSBudWxsOyB9XHJcblx0Z2V0IGlzU3ViSGVhZGVyKCkgeyByZXR1cm4gdGhpcy5fdHlwZSA9PT0gTW9kdWxlSXRlbVR5cGUuU1VCX0hFQURFUjsgfVxyXG5cdGdldCBtb2R1bGUoKSB7IHJldHVybiBEQVRBLm1vZHVsZXMuZ2V0KHRoaXMubW9kdWxlSWQpOyB9XHJcblx0Z2V0IGV4dGVybmFsVXJsKCkgeyByZXR1cm4gdGhpcy5fZXh0ZXJuYWxVcmw7IH1cclxuXHRnZXQgY29udGVudElkKCkgeyByZXR1cm4gdGhpcy5fY29udGVudElkOyB9XHJcblxyXG5cdGdldCBjaGVja2JveEVsZW1lbnQoKTogSlF1ZXJ5IHsgcmV0dXJuIHRoaXMuX2NoZWNrYm94RWxlbWVudDsgfVxyXG5cdHNldCBjaGVja2JveEVsZW1lbnQodmFsdWU6IEpRdWVyeSkge1xyXG5cdFx0aWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlLmxlbmd0aCA9PT0gMSlcclxuXHRcdFx0dGhpcy5fY2hlY2tib3hFbGVtZW50ID0gdmFsdWU7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgTW9kdWxlIEl0ZW0gRWxlbWVudDogXCIgKyB2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRnZXQgaGlkZUVsZW1lbnQoKTogSlF1ZXJ5IHsgcmV0dXJuIHRoaXMuX2hpZGVFbGVtZW50OyB9XHJcblx0c2V0IGhpZGVFbGVtZW50KHZhbHVlOiBKUXVlcnkpIHtcclxuXHRcdGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPT09IDEpXHJcblx0XHRcdHRoaXMuX2hpZGVFbGVtZW50ID0gdmFsdWU7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgTW9kdWxlIEl0ZW0gRWxlbWVudDogXCIgKyB2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRnZXQgZmlsZURhdGEoKTogQ2FudmFzQVBJLkZpbGUgeyByZXR1cm4gdGhpcy5fZmlsZURhdGE7IH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE1vZHVsZUl0ZW1UeXBlIHtcclxuXHRBU1NJR05NRU5ULCBTVUJfSEVBREVSLCBESVNDVVNTSU9OLCBRVUlaLCBQQUdFLCBGSUxFLCBFWFRFUk5BTF9VUkwsIEVYVEVSTkFMX1RPT0xcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQ2FudmFzUGFnZSB7XHJcblx0TU9EVUxFUywgR1JBREVTLCBIT01FLCBVU0VSUywgR1JPVVBTLCBDT0xMQUJPUkFUSU9OUywgRElTQ1VTU0lPTl9UT1BJQ1MsIEVYVEVSTkFMX1RPT0xTLCBBU1NJR05NRU5UU1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBNZXNzYWdlVHlwZSB7XHJcblx0QkFTSUMsIFNUQVRFXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlRGF0YSB7XHJcblx0YWN0aW9uOiBzdHJpbmc7XHJcblx0dHlwZTogTWVzc2FnZVR5cGU7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFjdGlvbjogc3RyaW5nLCB0eXBlPzogTWVzc2FnZVR5cGUpIHtcclxuXHRcdHRoaXMuYWN0aW9uID0gYWN0aW9uO1xyXG5cdFx0dGhpcy50eXBlID0gdHlwZSB8fCBNZXNzYWdlVHlwZS5CQVNJQztcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZU1lc3NhZ2VEYXRhIGV4dGVuZHMgTWVzc2FnZURhdGEge1xyXG5cdHN0YXRlTmFtZTogc3RyaW5nO1xyXG5cdHN0YXRlOiBib29sZWFuO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihhY3Rpb246IFwiZ2V0XCIgfCBcInNldFwiLCBzdGF0ZU5hbWU6IHN0cmluZywgc3RhdGU/OiBib29sZWFuKSB7XHJcblx0XHRzdXBlcihhY3Rpb24sIE1lc3NhZ2VUeXBlLlNUQVRFKTtcclxuXHJcblx0XHR0aGlzLnN0YXRlTmFtZSA9IHN0YXRlTmFtZTtcclxuXHRcdHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuXHJcblx0XHRpZiAoYWN0aW9uID09PSBcInNldFwiICYmIHRoaXMuc3RhdGUgPT09IHVuZGVmaW5lZClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzdGF0ZSBtZXNzYWdlOiBubyBib29sZWFuIHRvIHNldCBzdGF0ZSB0b1wiKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFeGNlcHRpb24ge1xyXG5cdHByaXZhdGUgcmVhc29uOiBzdHJpbmc7XHJcblx0cHJpdmF0ZSBmYXRhbDogYm9vbGVhbjtcclxuXHJcblx0Y29uc3RydWN0b3IocmVhc29uOiBzdHJpbmcsIGZhdGFsPzogYm9vbGVhbikge1xyXG5cdFx0aWYgKGZhdGFsID09PSB1bmRlZmluZWQpIGZhdGFsID0gZmFsc2U7XHJcblx0XHR0aGlzLnJlYXNvbiA9IHJlYXNvbjtcclxuXHRcdHRoaXMuZmF0YWwgPSBmYXRhbDtcclxuXHR9XHJcblxyXG5cdGdldCBpc0ZhdGFsKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZmF0YWw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdG9TdHJpbmcoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWFzb247XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgREFUQSA9IG5ldyBEYXRhKCk7XHJcbmV4cG9ydCBjb25zdCBQQUdFID0gbmV3IFBhZ2UoKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL29iamVjdHMudHMiLCJpbXBvcnQgeyBWIH0gZnJvbSBcIi4vdmFyc1wiO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgTWVzc2FnZURhdGEsIFN0YXRlTWVzc2FnZURhdGEgfSBmcm9tIFwiLi9vYmplY3RzXCI7XHJcblxyXG5kZWNsYXJlIGNvbnN0IGNvbXBvbmVudEhhbmRsZXI7XHJcbmNvbnN0IFFVRVJZID0ge2FjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZX07XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG5cclxuY29uc3QgQk9EWSA9ICQoXCJib2R5XCIpO1xyXG5jb25zdCBqdW1wQnV0dG9uID0gJChcIiNcIiArIFYuaWQucG9wdXBfanVtcF9idXR0b24pO1xyXG5jb25zdCBpbnNlcnRpb25Qb2ludCA9ICQoXCIjXCIgKyBWLmlkLnBvcHVwX2luc2VydGlvbl9wb2ludCk7XHJcblxyXG4kKFwiI1wiICsgVi5pZC5wb3B1cF9leF9uYW1lKS50ZXh0KGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkubmFtZSk7XHJcblxyXG5Qcm9taXNlLnJlc29sdmUoKVxyXG5cclxuXHQudGhlbigoKSA9PiBuZXcgUHJvbWlzZShuZXh0ID0+IHtcclxuXHJcblx0XHRjb25zdCBzdGFydFBpbmcgPSAkLm5vdygpO1xyXG5cclxuXHRcdHNlbmRNZXNzYWdlKG5ldyBNZXNzYWdlRGF0YShcInBpbmdcIiksIHJlc3AgPT4ge1xyXG5cdFx0XHRpZiAocmVzcCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJwYWdlIHBpbmdcIiwgcmVzcC5wb25nIC0gc3RhcnRQaW5nKTtcclxuXHJcblx0XHRcdFx0Qk9EWS5hZGRDbGFzcyhWLmNzc0NsYXNzLnBvcHVwX2Nvbm5lY3RlZCk7XHJcblx0XHRcdFx0bmV4dCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdEJPRFkuYWRkQ2xhc3MoVi5jc3NDbGFzcy5wb3B1cF9sb2FkZWQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0fSkpLnRoZW4oKCkgPT4gbmV3IFByb21pc2UobmV4dCA9PiB7XHJcblxyXG5cdFx0c2VuZE1lc3NhZ2UobmV3IE1lc3NhZ2VEYXRhKFwiY291bnQgdW5jaGVja2VkXCIpLCByZXNwID0+IHtcclxuXHRcdFx0aWYgKHJlc3AgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGlmIChyZXNwLmNvdW50ID09PSAwKVxyXG5cdFx0XHRcdFx0anVtcEJ1dHRvbi5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSkuYXR0cihcInRpdGxlXCIsIFYudG9vbHRpcC5wb3B1cF9ub191bmNoZWNrZWQpO1xyXG5cdFx0XHRcdG5leHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdH0pKS50aGVuKCgpID0+IG5ldyBQcm9taXNlKG5leHQgPT4ge1xyXG5cclxuXHRcdGxldCByZW1haW5pbmcgPSBPYmplY3Qua2V5cyhWLnN0YXRlKS5sZW5ndGg7XHJcblxyXG5cdFx0JC5lYWNoKFYuc3RhdGUsIChzdGF0ZU5hbWUsIHN0YXRlRGF0YSkgPT4ge1xyXG5cdFx0XHRzZW5kTWVzc2FnZShuZXcgU3RhdGVNZXNzYWdlRGF0YShcImdldFwiLCBzdGF0ZU5hbWUpLCByZXNwID0+IHtcclxuXHJcblx0XHRcdFx0Y29uc3QgZWwgPSAkKFV0aWxzLmZvcm1hdChWLmVsZW1lbnQucG9wdXBfc3RhdGVfc3dpdGNoLCB7bmFtZTogc3RhdGVOYW1lLCBkZXNjOiBzdGF0ZURhdGEuZGVzY30pKTtcclxuXHJcblx0XHRcdFx0ZWwuaW5zZXJ0QWZ0ZXIoaW5zZXJ0aW9uUG9pbnQpO1xyXG5cdFx0XHRcdGNvbXBvbmVudEhhbmRsZXIudXBncmFkZUVsZW1lbnQoZWwuZmluZChcImxhYmVsXCIpLmdldCgwKSk7XHJcblxyXG5cdFx0XHRcdGNvbnN0IGlucHV0RWwgPSBlbC5maW5kKFwiaW5wdXRcIikuZ2V0KDApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG5cdFx0XHRcdGVsLmNoYW5nZSgoKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCBuZXdTdGF0ZSA9IGlucHV0RWwuY2hlY2tlZDtcclxuXHJcblx0XHRcdFx0XHRzZXRNZGxDaGVja2VkKGlucHV0RWwsICFuZXdTdGF0ZSk7XHJcblx0XHRcdFx0XHRpbnB1dEVsLnRpdGxlID0gVi50b29sdGlwLndhaXRpbmc7XHJcblx0XHRcdFx0XHRpbnB1dEVsLmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0XHRzZW5kTWVzc2FnZShuZXcgU3RhdGVNZXNzYWdlRGF0YShcInNldFwiLCBzdGF0ZU5hbWUsIG5ld1N0YXRlKSwgc3VjY2VzcyA9PiB7XHJcblx0XHRcdFx0XHRcdGlmIChzdWNjZXNzKSB7XHJcblx0XHRcdFx0XHRcdFx0c2V0TWRsQ2hlY2tlZChpbnB1dEVsLCBuZXdTdGF0ZSk7XHJcblx0XHRcdFx0XHRcdFx0aW5wdXRFbC50aXRsZSA9IFwiXCI7IC8vIFRPRE8gc3RhdGUubG9uZ19kZXNjID9cclxuXHRcdFx0XHRcdFx0XHRpbnB1dEVsLmRpc2FibGVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRzZXRNZGxDaGVja2VkKGlucHV0RWwsIHJlc3Auc3RhdGUpO1xyXG5cclxuXHRcdFx0XHRpZiAoLS1yZW1haW5pbmcgPT09IDApIG5leHQoKTtcclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0anVtcEJ1dHRvbi5jbGljaygoKSA9PiB7XHJcblx0XHRcdHNlbmRNZXNzYWdlKG5ldyBNZXNzYWdlRGF0YShcImp1bXAgdG8gZmlyc3QgdW5jaGVja2VkXCIpLCByZXNwID0+IHdpbmRvdy5jbG9zZSgpKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9KSkudGhlbigoKSA9PiBuZXcgUHJvbWlzZShuZXh0ID0+IHtcclxuXHJcblx0XHRpbnNlcnRpb25Qb2ludC5yZW1vdmUoKTtcclxuXHRcdEJPRFkuYWRkQ2xhc3MoVi5jc3NDbGFzcy5wb3B1cF9sb2FkZWQpO1xyXG5cdFx0bmV4dCgpO1xyXG5cclxuXHR9KSk7XHJcblxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKGRhdGE6IE1lc3NhZ2VEYXRhLCBjYWxsYmFjaz86IChyZXNwb25zZTogYW55KSA9PiB2b2lkKSB7XHJcblx0Y2hyb21lLnRhYnMucXVlcnkoUVVFUlksIHRhYnMgPT4gY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFic1swXS5pZCwgZGF0YSwgY2FsbGJhY2spKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0TWRsQ2hlY2tlZChjaGVja2JveDogSFRNTElucHV0RWxlbWVudCwgY2hlY2tlZDogYm9vbGVhbikge1xyXG5cdCQoY2hlY2tib3gpXHJcblx0XHQucHJvcChcImNoZWNrZWRcIiwgY2hlY2tlZClcclxuXHRcdC5wYXJlbnQoKVxyXG5cdFx0LnRvZ2dsZUNsYXNzKFwiaXMtY2hlY2tlZFwiLCBjaGVja2VkKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcG9wdXAudHMiXSwic291cmNlUm9vdCI6IiJ9