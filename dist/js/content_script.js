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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__objects__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vars__ = __webpack_require__(1);
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
        (function () {
            __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].extensionId = chrome.runtime.id;
            __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].name = chrome.runtime.getManifest().name;
            for (const logType of "log debug info warn error dir".split(" ")) {
                const orig = console[logType];
                console[logType] = orig.bind(console, `[${__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].name}] [${logType.toUpperCase()}]`);
            }
            const urlMatch = /courses\/(\d+)(?:\/(\w+))?.*/.exec(document.location.pathname);
            const onCoursePage = urlMatch !== null;
            __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].coursePage = onCoursePage ? __WEBPACK_IMPORTED_MODULE_0__objects__["a" /* CanvasPage */][(urlMatch[2] || "home").toUpperCase()] : null;
            __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID = onCoursePage ? Number(urlMatch[1]) : null;
            __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].onMainPage = [__WEBPACK_IMPORTED_MODULE_0__objects__["a" /* CanvasPage */].MODULES, __WEBPACK_IMPORTED_MODULE_0__objects__["a" /* CanvasPage */].GRADES].includes(__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].coursePage);
            if (onCoursePage)
                console.debug(`On course #${__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID} page, at ${__WEBPACK_IMPORTED_MODULE_0__objects__["a" /* CanvasPage */][__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].coursePage]}`);
        })();
        const initStart = performance.now();
        __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].init(__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID);
        try {
            yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].loadToken();
        }
        catch (e) {
            __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].accessTokenPrompt();
            throw new __WEBPACK_IMPORTED_MODULE_0__objects__["d" /* Exception */]("Missing access token; must refresh", true);
        }
        const courseTabFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const courseColors = (yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getJSON(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_colors)).custom_colors;
                const favoriteCourses = yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getJSON(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.favorite_courses);
                for (const courseData of favoriteCourses) {
                    const color = courseColors["course_" + courseData.id];
                    __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseTabs.set(courseData.id, new __WEBPACK_IMPORTED_MODULE_0__objects__["b" /* CustomCourseTab */](courseData, color));
                }
            });
        };
        const navTabFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const navTabUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].perPage(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.navigation_tabs, 25);
                const navTabs = yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getJSON(navTabUrl);
                for (const tab of navTabs)
                    __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].navTabs.set(tab.id, new __WEBPACK_IMPORTED_MODULE_0__objects__["j" /* NavTab */](tab));
            });
        };
        const assignmentFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const assignmentsUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].perPage(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.assignments, 1000);
                const assignments = yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getJSON(assignmentsUrl);
                for (const assignmentJson of assignments) {
                    let contentId;
                    if (assignmentJson.quiz_id)
                        contentId = assignmentJson.quiz_id;
                    else if (assignmentJson.discussion_topic)
                        contentId = assignmentJson.discussion_topic.id;
                    else
                        contentId = assignmentJson.id;
                    let item;
                    if (__WEBPACK_IMPORTED_MODULE_0__objects__["h" /* ModuleItem */].byContentId.has(contentId))
                        item = __WEBPACK_IMPORTED_MODULE_0__objects__["h" /* ModuleItem */].byContentId.get(contentId);
                    else
                        item = __WEBPACK_IMPORTED_MODULE_0__objects__["h" /* ModuleItem */].fromContentId(contentId);
                    item.setAssignmentId(assignmentJson.id);
                }
            });
        };
        const moduleItemFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const modulesUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].perPage(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.modules, 25);
                const modules = yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getJSON(modulesUrl);
                for (const moduleData of modules) {
                    __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].modules.set(moduleData.id, new __WEBPACK_IMPORTED_MODULE_0__objects__["g" /* Module */](moduleData));
                }
                const moduleIds = Array.from(__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].modules.keys());
                const itemSetPromises = moduleIds.map(modId => __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].modules.get(modId))
                    .filter(mod => mod.itemCount > 0)
                    .map(module => {
                    const moduleItemsUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].perPage(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].format(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.module_items, { moduleID: module.id }), module.itemCount);
                    return __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getJSON(moduleItemsUrl);
                });
                const moduleItemSets = yield Promise.all(itemSetPromises);
                for (const items of moduleItemSets) {
                    const module = __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].modules.get(items[0].module_id);
                    for (const modItemJson of items) {
                        let item;
                        const contentId = modItemJson.content_id;
                        if (__WEBPACK_IMPORTED_MODULE_0__objects__["h" /* ModuleItem */].byContentId.has(contentId))
                            item = __WEBPACK_IMPORTED_MODULE_0__objects__["h" /* ModuleItem */].byContentId.get(contentId);
                        else if (contentId)
                            item = __WEBPACK_IMPORTED_MODULE_0__objects__["h" /* ModuleItem */].fromContentId(contentId);
                        else
                            item = new __WEBPACK_IMPORTED_MODULE_0__objects__["h" /* ModuleItem */]();
                        item.update(modItemJson);
                        __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].moduleItems.set(modItemJson.id, item);
                        module.items.push(item);
                    }
                }
                const fileItems = Array.from(__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].moduleItems.values())
                    .filter(item => item.type === __WEBPACK_IMPORTED_MODULE_0__objects__["i" /* ModuleItemType */].FILE);
                const filePromises = fileItems.map(item => {
                    const fileDataUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].format(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.file_direct, { fileID: item.contentId });
                    return __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getJSON(fileDataUrl);
                });
                const files = yield Promise.all(filePromises);
                for (const file of files)
                    __WEBPACK_IMPORTED_MODULE_0__objects__["h" /* ModuleItem */].byContentId.get(file.id).setFileData(file);
            });
        };
        const customDataFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const customDataUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].format(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_data, { dataPath: "" });
                const customData = (yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getJSON(customDataUrl)).data;
                if (customData === undefined)
                    return;
                const complete = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getOrDefault(customData.completed_assignments, __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID, new Array());
                const hidden = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getOrDefault(customData.hidden_assignments, __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID, new Array());
                for (const [modItemId, modItem] of __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].moduleItems) {
                    modItem.checked = complete.includes(modItemId);
                    modItem.hidden = hidden.includes(modItemId);
                }
                const activeStates = customData.active_states || [];
                $.each(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].state, (name, stateData) => {
                    const stateObj = new __WEBPACK_IMPORTED_MODULE_0__objects__["l" /* State */](name, stateData, activeStates.includes(name));
                    __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].states.set(name, stateObj);
                });
                const tabPositions = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getOrDefault(customData.tab_positions, __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID, {});
                for (const [tabId, navTab] of __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].navTabs) {
                    if (tabPositions[tabId] !== undefined)
                        navTab.setPosition(tabPositions[tabId]);
                }
            });
        };
        const promises = [courseTabFlow()];
        if (__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].coursePage !== null)
            promises.push(navTabFlow());
        if (__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].onMainPage)
            promises.push(assignmentFlow(), moduleItemFlow());
        yield Promise.all(promises);
        if (__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].onMainPage)
            yield customDataFlow();
        return performance.now() - initStart;
    });
})()
    .catch((reason) => {
    if (reason instanceof __WEBPACK_IMPORTED_MODULE_0__objects__["d" /* Exception */]) {
        if (reason.isFatal)
            throw new Error(reason.toString());
        else
            console.warn("Exception in init:", reason.toString());
    }
    else {
        throw new Error("Unknown error in init: " + reason);
    }
})
    .then((totalDuration) => {
    console.debug(`Initialization completed in ${Math.round(totalDuration)}ms`);
    Main.initPage();
    chrome.runtime.onMessage.addListener(Main.onMessage);
});
class Main {
    static initPage() {
        __WEBPACK_IMPORTED_MODULE_0__objects__["k" /* PAGE */].initialize();
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
        const $insertionPoint = __WEBPACK_IMPORTED_MODULE_0__objects__["k" /* PAGE */].sidebar.children().eq(2);
        for (const [tabID, courseTab] of __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseTabs) {
            $insertionPoint.after(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].format(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].element.course_link, {
                tabColor: courseTab.color,
                tabID,
                name: courseTab.name,
                code: courseTab.code
            }));
        }
        __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].elements.jump_button =
            $(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].element.jump_button)
                .find("i")
                .click(() => {
                if (__WEBPACK_IMPORTED_MODULE_0__objects__["k" /* PAGE */].scrollingElement.prop("scrollTop") > 0)
                    $("body").animate({ scrollTop: 0 }, __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].ui.scroll_time);
            })
                .end()
                .appendTo(__WEBPACK_IMPORTED_MODULE_0__objects__["k" /* PAGE */].main);
        if (__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].coursePage === null)
            return;
        $("ul#menu > li").removeClass("ic-app-header__menu-list-item--active");
        for (const [, state] of __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].states) {
            if (state.active && state.onPages.includes(__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].coursePage))
                __WEBPACK_IMPORTED_MODULE_0__objects__["k" /* PAGE */].body.addClass(state.bodyClass);
        }
        if (__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseTabs.has(__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID)) {
            const color = __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseTabs.get(__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID).color;
            document.documentElement.style.setProperty("--ic-brand-primary", color);
        }
        $(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.selector.nav_tabs).find("li:empty").remove();
        Array.from(__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].navTabs.values()).filter(tab => tab.hasCustomPosition)
            .sort((tabA, tabB) => tabA.position - tabB.position)
            .forEach(UI.updateNavTabPosition);
        if (!__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].onMainPage)
            return;
        for (const [itemId, item] of __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].moduleItems) {
            const mainEl = $("#" + item.canvasElementId);
            let parentEl;
            let hasCheckbox;
            let hasHideButton;
            item.checkboxElement = null;
            item.hideElement = null;
            if (__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].coursePage === __WEBPACK_IMPORTED_MODULE_0__objects__["a" /* CanvasPage */].MODULES) {
                parentEl = mainEl.find("div.ig-row");
                hasHideButton = true;
                hasCheckbox = !item.isSubHeader;
            }
            else if (__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].coursePage === __WEBPACK_IMPORTED_MODULE_0__objects__["a" /* CanvasPage */].GRADES) {
                parentEl = $("<td>")
                    .addClass(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.checkbox_td)
                    .prependTo(mainEl);
                hasHideButton = false;
                hasCheckbox = item.isGraded;
            }
            if (hasCheckbox) {
                item.checkboxElement =
                    $(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].format(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].element.checkbox, { item_id: itemId })).appendTo(parentEl);
                UI.updateCheckbox(item);
                item.checkboxElement.show();
            }
            if (hasHideButton) {
                item.hideElement =
                    $(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].format(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].element.hide_button, { item_id: itemId })).appendTo(parentEl);
                UI.updateItemHide(item, true);
                item.hideElement.show();
            }
        }
        if (__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].coursePage === __WEBPACK_IMPORTED_MODULE_0__objects__["a" /* CanvasPage */].GRADES) {
            __WEBPACK_IMPORTED_MODULE_0__objects__["k" /* PAGE */].grades
                .find("td[colspan='5']")
                .attr("colspan", 6)
                .end().find("> thead > tr")
                .prepend($("<th>")
                .attr("scope", "col")
                .append("<i class='icon-check'></i>"))
                .end().find("tr.student_assignment")
                .prepend(function () {
                return $(this).has("td:first-child").length === 0 ?
                    $("<td>").addClass(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.checkbox_td) : undefined;
            });
        }
        __WEBPACK_IMPORTED_MODULE_0__objects__["k" /* PAGE */].main.on("change", `.${__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.checkbox_parent} > input`, function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield Main.onCheckboxChange(this);
            });
        });
        if (__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].coursePage !== __WEBPACK_IMPORTED_MODULE_0__objects__["a" /* CanvasPage */].MODULES)
            return;
        $(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.selector.module_items).filter((i, el) => !el.innerHTML.trim().length).html("");
        const disabledIndent = __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].states.get("disable_indent_override").active;
        $(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.selector.module_item).each(function () {
            const defIndent = [0, 1, 2, 3, 4, 5].filter(level => $(this).hasClass("indent_" + level))[0];
            $(this).attr(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].dataAttr.def_indent, defIndent);
            if (!disabledIndent)
                $(this).removeClass("indent_" + defIndent);
        });
        if (!disabledIndent) {
            $(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.selector.subheader).addClass("indent_" + __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].ui.subheader_indent);
            $(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.selector.not_subheader).addClass("indent_" + __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].ui.main_indent);
        }
        const toc = $(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].element.toc);
        const ul = toc.find("ul");
        for (const [modId, mod] of __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].modules) {
            const formatted = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].format(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].element.toc_item, { item_name: mod.name, item_id: modId });
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
        __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].elements.toc = toc
            .css("top", __WEBPACK_IMPORTED_MODULE_0__objects__["k" /* PAGE */].left.height() + __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].ui.toc_top_margin)
            .appendTo(__WEBPACK_IMPORTED_MODULE_0__objects__["k" /* PAGE */].main)
            .data("cutoff", toc.offset().top - __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].ui.toc_top_margin);
        Array.from(__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].modules.values()).forEach(UI.updateModule);
        __WEBPACK_IMPORTED_MODULE_0__objects__["k" /* PAGE */].main.on("click", `.${__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.hide_button} > i`, function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield Main.onHideButtonClick($(this));
            });
        });
        for (const [, item] of __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].moduleItems) {
            if (item.type === __WEBPACK_IMPORTED_MODULE_0__objects__["i" /* ModuleItemType */].FILE) {
                const element = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].format(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].element.download_button, {
                    file_url: item.fileData.url,
                    filename: item.fileData.display_name
                });
                $(element).insertBefore(item.checkboxElement);
            }
            else if (item.type === __WEBPACK_IMPORTED_MODULE_0__objects__["i" /* ModuleItemType */].EXTERNAL_URL) {
                const element = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].format(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].element.url_button, {
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
        $("." + __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.download).add("." + __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.external_url).show();
    }
    static getState(stateName) {
        if (__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].states.has(stateName)) {
            const state = __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].states.get(stateName);
            return state.active;
        }
        else {
            return null;
        }
    }
    static setState(stateName, state) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].states.has(stateName))
                return;
            const stateObj = __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].states.get(stateName);
            if (!stateObj.onPages.includes(__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].coursePage))
                return;
            if (stateObj.bodyClass)
                __WEBPACK_IMPORTED_MODULE_0__objects__["k" /* PAGE */].body.toggleClass(stateObj.bodyClass, state);
            stateObj.active = state;
            stateObj.onChange(state, __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */], __WEBPACK_IMPORTED_MODULE_0__objects__["k" /* PAGE */].body);
            const url = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].format(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_data, { dataPath: "/active_states" });
            return __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].editDataArray(url, state, [stateName]);
        });
    }
    static setNavTabPosition(tab, position) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].format(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_data, {
                dataPath: ["", __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.data_urls.tab_positions, __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID, tab.id].join("/")
            });
            const success = yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].putData(url, position);
            if (success) {
                tab.setPosition(position);
                UI.updateNavTabPosition(tab);
            }
            else {
                throw new Error("Tab position update failed.");
            }
        });
    }
    static onCheckboxChange(el) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number($(el).attr(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].dataAttr.mod_item_id));
            const item = __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].moduleItems.get(id);
            const status = el.checked;
            const oldTitle = el.title;
            el.checked = !status;
            if (status === item.checked) {
                console.error("Checkbox desync at item", item);
                return;
            }
            el.disabled = true;
            el.title = __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].tooltip.waiting;
            const url = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].format(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_data, {
                dataPath: `/${__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.data_urls.completed_assignments}/${__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID}`
            });
            const success = yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].editDataArray(url, status, [id]);
            el.disabled = false;
            el.title = oldTitle;
            if (success) {
                item.checked = status;
                UI.updateModule(item.module);
                UI.updateCheckbox(item);
                console.debug(`Item ID ${id} (${item.name.substr(0, 25)}...)` +
                    `has been ${el.checked ? "" : "un"}checked`);
            }
        });
    }
    static onHideButtonClick(el) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(el.attr(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].dataAttr.mod_item_id));
            const item = __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].moduleItems.get(id);
            if (item.isGraded || item.hideElement.hasClass(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.hide_disabled))
                return;
            item.hideElement
                .addClass(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.hide_disabled)
                .find("i")
                .attr("title", __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].tooltip.waiting);
            const newState = !item.hidden;
            const url = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].format(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_data, {
                dataPath: `/${__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.data_urls.hidden_assignments}/${__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID}`
            });
            const success = yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].editDataArray(url, newState, [id]);
            if (success) {
                item.hidden = newState;
                yield UI.updateItemHide(item);
                UI.updateModule(item.module);
                console.debug(`Item ID ${id} (${item.name.substr(0, 25)}...) has been ${item.hidden ? "" : "un"}hidden`);
            }
        });
    }
    static onMessage(data, source, respondFunc) {
        if (source.id !== __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].extensionId)
            return;
        if (data.type === __WEBPACK_IMPORTED_MODULE_0__objects__["f" /* MessageType */].BASIC) {
            const unchecked = Array.from(__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].moduleItems.values())
                .filter(i => !i.checked && !i.hidden && !i.isSubHeader);
            switch (data.action) {
                case "ping":
                    respondFunc({ pong: $.now() });
                    break;
                case "count unchecked":
                    respondFunc({ count: unchecked.length });
                    break;
                case "jump to first unchecked":
                    const uncheckedEls = unchecked
                        .map(i => document.getElementById(i.canvasElementId));
                    UI.scrollToElement($(uncheckedEls).first());
                    respondFunc();
                    break;
                default:
                    console.warn("Unknown basic message in content script:", data);
            }
        }
        else if (data.type === __WEBPACK_IMPORTED_MODULE_0__objects__["f" /* MessageType */].STATE) {
            const stateData = data;
            if (data.action === "get") {
                const state = Main.getState(stateData.stateName);
                respondFunc({ state });
            }
            else if (data.action === "set") {
                Main.setState(stateData.stateName, stateData.state).then(success => {
                    respondFunc(success);
                });
                return true;
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
            throw new Error("No checkbox to update");
        item.checkboxElement
            .find("input")
            .prop("checked", item.checked)
            .attr("title", item.checked ? __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].tooltip.mark_incomplete : __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].tooltip.mark_complete)
            .closest(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.selector.module_item)
            .toggleClass(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.checkbox_checked, item.checked);
    }
    static updateItemHide(item, instant) {
        return __awaiter(this, void 0, void 0, function* () {
            if (item.hideElement === null)
                throw new Error("No hide button to update");
            const modItemEl = item.hideElement.closest(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.selector.module_item);
            const iEl = item.hideElement.find("i");
            iEl.add(modItemEl).toggleClass(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.item_hidden, item.hidden);
            if (!instant)
                yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].wait(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].ui.fade_time);
            item.hideElement.toggleClass(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.hide_disabled, item.isGraded);
            iEl.attr("title", item.isGraded ? __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].tooltip.hide_disabled : item.hidden ? __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].tooltip.unhide : __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].tooltip.hide);
        });
    }
    static updateModule(module) {
        if (__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].elements.toc !== null) {
            const allItems = module.items.filter(i => !i.isSubHeader && !i.hidden);
            const totalItems = allItems.length;
            let checkedItems;
            let percent;
            if (totalItems > 0) {
                checkedItems = allItems.filter(i => i.checked).length;
                percent = Math.round(checkedItems / totalItems * 100);
            }
            else {
                checkedItems = 0;
                percent = 0;
            }
            const backgroundImage = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].format(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].misc.toc_background, { percent });
            __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].elements.toc
                .find(`[${__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].dataAttr.toc_module_id}='${module.id}']`)
                .attr(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].dataAttr.toc_total, totalItems)
                .attr(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].dataAttr.toc_checked_count, checkedItems)
                .attr(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].dataAttr.toc_percentage, percent)
                .closest("li")
                .toggleClass(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.item_hidden, totalItems === 0)
                .css({ backgroundImage });
        }
        const noItems = module.items.filter(i => !i.isSubHeader && !i.hidden).length === 0;
        $("#context_module_" + module.id).toggleClass(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.item_hidden, noItems);
    }
    static updateNavTabPosition(tab) {
        if (!tab.hasCustomPosition)
            throw new Error("Tab has no custom position");
        const tabList = $(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.selector.nav_tabs);
        const tabEl = tabList.find("a." + tab.id).parent();
        if (tab.hidden)
            tabEl.hide();
        else
            tabEl.show().detach().insertBefore(tabList.children().eq(tab.position - 1));
    }
    static updateScrollPosition() {
        const scrollTop = __WEBPACK_IMPORTED_MODULE_0__objects__["k" /* PAGE */].scrollingElement.prop("scrollTop");
        if (__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].elements.toc !== null) {
            __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].elements.toc
                .toggleClass(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.fixed, scrollTop > __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].elements.toc.data("cutoff"));
        }
        if (__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].elements.jump_button !== null) {
            __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].elements.jump_button
                .toggleClass(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.active, scrollTop > __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].ui.jump_top_cutoff);
        }
    }
    static scrollToElement(element) {
        const elRect = element[0].getBoundingClientRect();
        const cliHeight = document.documentElement.clientHeight;
        const topRatio = __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].ui.top_inside_ratio;
        if ((elRect.height < cliHeight && elRect.top >= 0 && elRect.bottom < cliHeight) ||
            (elRect.top >= 0 && elRect.top <= cliHeight * topRatio)) {
            UI.flashElement(element);
        }
        else {
            const scrollTop = element.offset().top - __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].ui.scroll_top_offset;
            __WEBPACK_IMPORTED_MODULE_0__objects__["k" /* PAGE */].scrollingElement.animate({ scrollTop }, __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].ui.scroll_time, () => UI.flashElement(element));
        }
    }
    static flashElement(element) {
        element.addClass(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.flash);
        setTimeout(() => element.removeClass(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].cssClass.flash), 1000);
    }
}


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjkzZmNiYWYzODMxNjA4NzE1YjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy92YXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9vYmplY3RzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0QyQjtBQUNhO0FBRTFCO0lBSWIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFXLEVBQUUsR0FBVztRQUVyQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ1osQ0FBQztJQUVE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QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQzlFLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFELEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0wsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxnREFBQyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztZQUNoRSxzREFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFDLFNBQVMsRUFBQyxFQUN4QyxnREFBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQ2hCLE1BQU0sRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7SUFDRixDQUFDO0lBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFlO1FBQ2xDLE9BQU8sQ0FBQyxRQUFRLENBQUMsZ0RBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsVUFBVSxDQUFDLE1BQU0sT0FBTyxDQUFDLFdBQVcsQ0FBQyxnREFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBRUQiLCJmaWxlIjoiY29udGVudF9zY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmOTNmY2JhZjM4MzE2MDg3MTViNCIsImltcG9ydCB7IFYgfSBmcm9tIFwiLi92YXJzXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VEYXRhIH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xyXG5cclxuXHRwcml2YXRlIHN0YXRpYyBBQ0NFU1NfVE9LRU46IHN0cmluZztcclxuXHJcblx0c3RhdGljIGZvcm1hdChzdHI6IHN0cmluZywgb2JqOiBvYmplY3QpOiBzdHJpbmcge1xyXG5cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG5cdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpXHJcblx0XHRcdFx0c3RyID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcXFx7XCIgKyBrZXkgKyBcIlxcXFx9XCIsIFwiZ2lcIiksIG9ialtrZXldKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3RyO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldE9yRGVmYXVsdDxUPihvYmo6IG9iamVjdCwga2V5OiBQcm9wZXJ0eUtleSwgZGVmOiBUKTogVCB7XHJcblx0XHRpZiAob2JqID09PSB1bmRlZmluZWQgfHwgb2JqW2tleV0gPT09IHVuZGVmaW5lZCkgcmV0dXJuIGRlZjtcclxuXHRcdGVsc2UgcmV0dXJuIG9ialtrZXldO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHBlclBhZ2UodXJsOiBzdHJpbmcsIHBlclBhZ2U6IG51bWJlcikge1xyXG5cdFx0cmV0dXJuIGAke3VybH0/cGVyX3BhZ2U9JHtwZXJQYWdlfWA7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgZ2V0SlNPTjxUPih1cmw6IHN0cmluZyk6IFByb21pc2U8VD4ge1xyXG5cclxuXHRcdFV0aWxzLmNoZWNrVG9rZW4oKTtcclxuXHJcblx0XHRjb25zdCByZXNwID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcblx0XHRcdG1ldGhvZDogXCJHRVRcIixcclxuXHRcdFx0aGVhZGVyczogbmV3IEhlYWRlcnMoe1xyXG5cdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdFx0XHRcdFwiQXV0aG9yaXphdGlvblwiOiBcIkJlYXJlciBcIiArIFV0aWxzLkFDQ0VTU19UT0tFTlxyXG5cdFx0XHR9KVxyXG5cdFx0fSBhcyBSZXF1ZXN0SW5pdCk7XHJcblxyXG5cdFx0aWYgKHJlc3Auc3RhdHVzID09PSA0MDQpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiNDA0IGVycm9yIHdoZW4gZ2V0dGluZyBKU09OXCIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGlmIChyZXNwLnN0YXR1cyA9PT0gNDAwKVxyXG5cdFx0XHRcdGNvbnNvbGUuZGVidWcoXCI0MDAgZXJyb3Igd2hlbiBnZXR0aW5nIEpTT04gd2FzIE9LQVlcIik7XHJcblxyXG5cdFx0XHRsZXQganNvbiA9IGF3YWl0IHJlc3AudGV4dCgpO1xyXG5cdFx0XHRqc29uID0ganNvbi5yZXBsYWNlKFwid2hpbGUoMSk7XCIsIFwiXCIpO1xyXG5cclxuXHRcdFx0cmV0dXJuIEpTT04ucGFyc2UoanNvbik7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHB1dERhdGEodXJsLCBkYXRhOiBhbnlbXSB8IGFueSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG5cclxuXHRcdFV0aWxzLmNoZWNrVG9rZW4oKTtcclxuXHJcblx0XHRjb25zdCBib2R5RGF0YSA9IHtuczogVi5jYW52YXMuYXBpLm5hbWVzcGFjZSwgZGF0YX07XHJcblx0XHRjb25zdCBtZXRob2QgPSBkYXRhIGluc3RhbmNlb2YgQXJyYXkgJiYgZGF0YS5sZW5ndGggPiAwIHx8IGRhdGEgIT09IHVuZGVmaW5lZCA/IFwiUFVUXCIgOiBcIkRFTEVURVwiO1xyXG5cclxuXHRcdGlmIChtZXRob2QgPT09IFwiREVMRVRFXCIpXHJcblx0XHRcdGRlbGV0ZSBib2R5RGF0YS5kYXRhO1xyXG5cclxuXHRcdGNvbnN0IG9wcyA9IHtcclxuXHRcdFx0bWV0aG9kLFxyXG5cdFx0XHRoZWFkZXJzOiBuZXcgSGVhZGVycyh7XHJcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcblx0XHRcdFx0XCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIFwiICsgVXRpbHMuQUNDRVNTX1RPS0VOXHJcblx0XHRcdH0pLFxyXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShib2R5RGF0YSlcclxuXHRcdH0gYXMgUmVxdWVzdEluaXQ7XHJcblxyXG5cdFx0Y29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHVybCwgb3BzKTtcclxuXHJcblx0XHRpZiAoIXJlc3Aub2sgfHwgcmVzcC5zdGF0dXMgPT09IDQwMSkgeyAvLyA0MDEgdW5hdXRob3JpemVkXHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoYFVuYWJsZSB0byAke21ldGhvZH0gZGF0YSB0byAke3VybH0uIHJlc3A6YCwgSlNPTi5zdHJpbmdpZnkocmVzcCkpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIGVkaXREYXRhQXJyYXkodXJsOiBzdHJpbmcsIGFwcGVuZDogYm9vbGVhbiwgdmFsdWVzOiBhbnlbXSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG5cclxuXHRcdGNvbnN0IGV4aXN0aW5nRGF0YTogYW55W10gPSAoXHJcblx0XHRcdC8vIHVybCBpcyBzYW1lIGZvciBnZXQvcHV0XHJcblx0XHRcdGF3YWl0IFV0aWxzLmdldEpTT048e2RhdGE6IGFueVtdfT4odXJsKVxyXG5cdFx0KS5kYXRhIHx8IFtdO1xyXG5cclxuXHRcdGxldCBuZXdBcnJheTtcclxuXHJcblx0XHRpZiAoYXBwZW5kKSB7XHJcblx0XHRcdG5ld0FycmF5ID0gZXhpc3RpbmdEYXRhLmNvbmNhdCh2YWx1ZXMpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7IC8vIHN1YnRyYWN0IGZyb20gZGF0YSBhcnJheVxyXG5cdFx0XHRpZiAoZXhpc3RpbmdEYXRhLmxlbmd0aCA9PT0gMClcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0bmV3QXJyYXkgPSBleGlzdGluZ0RhdGEuZmlsdGVyKHZhbCA9PiAhdmFsdWVzLmluY2x1ZGVzKHZhbCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBVdGlscy5wdXREYXRhKHVybCwgbmV3QXJyYXkpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHdhaXQobXM6IG51bWJlcikge1xyXG5cdFx0YXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY2hlY2tUb2tlbigpOiB2b2lkIHwgbmV2ZXIge1xyXG5cdFx0aWYgKFV0aWxzLkFDQ0VTU19UT0tFTiA9PT0gbnVsbClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQWNjZXNzIHRva2VuIG5vdCBzZXRcIik7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgbG9hZFRva2VuKCkge1xyXG5cdFx0VXRpbHMuQUNDRVNTX1RPS0VOID0gYXdhaXQgbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG5cdFx0XHRjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChWLm1pc2MudG9rZW5fa2V5LCByZXN1bHREYXRhID0+IHtcclxuXHJcblx0XHRcdFx0Y29uc3Qgc3VjY2VzcyA9IFV0aWxzLkFDQ0VTU19UT0tFTiAhPT0gbnVsbCB8fCByZXN1bHREYXRhW1YubWlzYy50b2tlbl9rZXldO1xyXG5cdFx0XHRcdGlmIChzdWNjZXNzKSByZXNvbHZlKHJlc3VsdERhdGFbVi5taXNjLnRva2VuX2tleV0pO1xyXG5cdFx0XHRcdGVsc2UgcmVqZWN0KCk7XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhY2Nlc3NUb2tlblByb21wdCgpIHtcclxuXHRcdGNvbnN0IG9wZW5PcHRpb25zID0gY29uZmlybShcIk1pc3NpbmcgYWNjZXNzIHRva2VuLCBwcmVzcyBPSyB0byBvcGVuIGV4dGVuc2lvbiBvcHRpb25zXCIpO1xyXG5cdFx0aWYgKG9wZW5PcHRpb25zKSAvLyBUT0RPIHNlbmQgdGFiIElEIHdpdGggdGhpcyBtZXNzYWdlP1xyXG5cdFx0XHRjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShuZXcgTWVzc2FnZURhdGEoXCJvcGVuIG9wdGlvbnNcIikpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHJ1bkNiKGNhbGxiYWNrRnVuY3Rpb246ICgpID0+IHZvaWQpIHtcclxuXHRcdGlmIChjYWxsYmFja0Z1bmN0aW9uICE9PSB1bmRlZmluZWQpXHJcblx0XHRcdGNhbGxiYWNrRnVuY3Rpb24oKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBzYWZlQ2I8RiBleHRlbmRzICgoLi4uYXJncykgPT4gdm9pZCk+KGNhbGxiYWNrRnVuY3Rpb246IEYgfCB1bmRlZmluZWQpOiBGIHtcclxuXHRcdGlmIChjYWxsYmFja0Z1bmN0aW9uICE9PSB1bmRlZmluZWQpXHJcblx0XHRcdHJldHVybiBjYWxsYmFja0Z1bmN0aW9uO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gKCgpID0+IHt9KSBhcyBGOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWVtcHR5XHJcblx0fVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbHMudHMiLCJpbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcclxuXHJcbmNsYXNzIFNhc3NWYXJzIHtcclxuXHJcblx0cHJlZml4ID0gXCJiZXR0ZXJDYW52YXNcIjtcclxuXHJcblx0Y3NzQ2xhc3MgPSB7XHJcblx0XHRhY3RpdmU6IFwiYWN0aXZlXCIsXHJcblx0XHRjaGVja2JveF9wYXJlbnQ6IFwiY2hlY2tib3gtcGFyZW50XCIsXHJcblx0XHRjaGVja2JveF9jaGVja2VkOiBcImNoZWNrYm94LWNoZWNrZWRcIixcclxuXHRcdGNoZWNrYm94X3RkOiBcImNoZWNrYm94LXRkXCIsXHJcblx0XHRmbGFzaDogXCJhbmltLWZsYXNoXCIsXHJcblx0XHRjb3Vyc2VfbGlua190ZXh0OiBcImNvdXJzZS1saW5rLXRleHRcIixcclxuXHRcdGl0ZW1faGlkZGVuOiBcImhpZGRlblwiLFxyXG5cdFx0aGlkZV9idXR0b246IFwiYnRuLWhpZGVcIixcclxuXHRcdGhpZGVfZGlzYWJsZWQ6IFwiaGlkZS1kaXNhYmxlZFwiLFxyXG5cdFx0dG9jX3JhdGlvOiBcInRvYy1yYXRpb1wiLFxyXG5cdFx0dG9jX3RpdGxlOiBcInRvYy10aXRsZVwiLFxyXG5cdFx0Zml4ZWQ6IFwiZml4ZWRcIixcclxuXHRcdGl0ZW1faWNvbjogXCJpY29uLXdyYXBwZXJcIixcclxuXHRcdGRvd25sb2FkOiBcImRvd25sb2FkLWJ0blwiLFxyXG5cdFx0ZXh0ZXJuYWxfdXJsOiBcInVybC1idG5cIixcclxuXHJcblx0XHRwb3B1cF9sb2FkZWQ6IFwiZG9uZS1sb2FkaW5nXCIsXHJcblx0XHRwb3B1cF9jb25uZWN0ZWQ6IFwicGFnZS1jb25uZWN0ZWRcIixcclxuXHRcdHBvcHVwX3JlcXVpcmVfcGFnZTogXCJyZXF1aXJlLXBhZ2VcIlxyXG5cdH07XHJcblxyXG5cdGRhdGFBdHRyID0ge1xyXG5cdFx0dG9jX21vZHVsZV9pZDogXCJ0b2MtbW9kdWxlLWlkXCIsXHJcblx0XHR0b2NfdG90YWw6IFwidG9jLXRvdGFsXCIsXHJcblx0XHR0b2NfY2hlY2tlZF9jb3VudDogXCJ0b2MtY2hlY2tlZC1jb3VudFwiLFxyXG5cdFx0dG9jX3BlcmNlbnRhZ2U6IFwidG9jLXBlcmNlbnRhZ2VcIixcclxuXHRcdG1vZF9pdGVtX2lkOiBcIml0ZW0taWRcIixcclxuXHRcdGNvdXJzZV9uYW1lOiBcImNvdXJzZS1uYW1lXCIsXHJcblx0XHRjb3Vyc2VfY29kZTogXCJjb3Vyc2UtY29kZVwiLFxyXG5cdFx0ZGVmX2luZGVudDogXCJkZWZhdWx0LWluZGVudFwiXHJcblx0fTtcclxuXHJcblx0aWQgPSB7XHJcblx0XHR0b2M6IFwidG9jXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJqdW1wLXRvLXRvcFwiLFxyXG5cclxuXHRcdHBvcHVwX3BhZ2VfbWlzc2luZzogXCJwYWdlLW1pc3NpbmctZXJyb3JcIixcclxuXHRcdHBvcHVwX2V4X25hbWU6IFwiZXh0ZW5zaW9uLW5hbWVcIixcclxuXHRcdHBvcHVwX2luc2VydGlvbl9wb2ludDogXCJpbnNlcnRpb24tcG9pbnRcIixcclxuXHRcdHBvcHVwX2p1bXBfYnV0dG9uOiBcImp1bXAtdG9cIlxyXG5cdH07XHJcblxyXG5cdGNvbG9yID0ge1xyXG5cdFx0dG9jX2ZpbGw6IFwicmdiYSgwLCAyNTUsIDAsIC43NSlcIixcclxuXHRcdHRvY19ib3JkZXI6IFwicmdiKDEwMiwgMTIwLCAxMzUpXCIsXHJcblx0XHR0b2NfdGl0bGU6IFwidmFyKC0taWMtYnJhbmQtcHJpbWFyeSlcIiwgLy8gd2FzIFwicmdiKDU3LCA3NSwgODgpXCIsXHJcblx0XHRjaGVja2JveF9jaGVjazogXCJyZ2IoMjIsIDE2MCwgMTMzKVwiLFxyXG5cdFx0Y2hlY2tib3hfYm9yZGVyOiBcInJnYigxMDIsIDEyMCwgMTM1KVwiLFxyXG5cdFx0aGlnaGxpZ2h0X29yYW5nZTogXCJyZ2IoMjU1LCAxNTIsIDApXCIsXHJcblx0XHRoaWdobGlnaHRfcmVkOiBcInJnYigyNTUsIDAsIDApXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJyZ2IoNTcsIDc1LCA4OClcIlxyXG5cdH07XHJcblxyXG5cdHVpID0ge1xyXG5cdFx0dG9wX2luc2lkZV9yYXRpbzogMC4wNSxcclxuXHRcdHNjcm9sbF90b3Bfb2Zmc2V0OiA1LFxyXG5cdFx0anVtcF90b3BfY3V0b2ZmOiAxMDAsXHJcblx0XHR0b2NfdG9wX21hcmdpbjogMzIsXHJcblx0XHRzY3JvbGxfdGltZTogNTAwLFxyXG5cdFx0ZmFkZV90aW1lOiA1MDAsXHJcblx0XHRzdWJoZWFkZXJfaW5kZW50OiAwLFxyXG5cdFx0bWFpbl9pbmRlbnQ6IDFcclxuXHR9O1xyXG5cclxuXHRzdGF0ZSA9IHtcclxuXHRcdHNob3dfaGlkZGVuOiB7XHJcblx0XHRcdGNzc0NsYXNzOiBcInNob3ctaGlkZGVuXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIlNob3cgaGlkZGVuIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRoaWRlX2NoZWNrZWQ6IHtcclxuXHRcdFx0Y3NzQ2xhc3M6IFwiaGlkZS1jaGVja2VkXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCIsIFwiZ3JhZGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIkhpZGUgY29tcGxldGVkIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRoaWdobGlnaHRfdW5jaGVja2VkOiB7XHJcblx0XHRcdGNzc0NsYXNzOiBcIm1hcmstdW5jaGVja2VkXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCIsIFwiZ3JhZGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIk1hcmsgdW5jaGVja2VkIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRkaXNhYmxlX2luZGVudF9vdmVycmlkZToge1xyXG5cdFx0XHRwYWdlczogW1wibW9kdWxlc1wiXSxcclxuXHRcdFx0ZGVzYzogXCJEaXNhYmxlIGluZGVudCBvdmVycmlkZXNcIixcclxuXHRcdFx0b25EaXNhYmxlOiAodmFycywgYm9keSkgPT4ge1xyXG5cdFx0XHRcdFswLDEsMiwzLDQsNV0uZm9yRWFjaChsZXZlbCA9PlxyXG5cdFx0XHRcdFx0JCh2YXJzLmNhbnZhcy5zZWxlY3Rvci5tb2R1bGVfaXRlbSwgYm9keSkucmVtb3ZlQ2xhc3MoXCJpbmRlbnRfXCIgKyBsZXZlbCkpO1xyXG5cdFx0XHRcdCQodmFycy5jYW52YXMuc2VsZWN0b3Iuc3ViaGVhZGVyLCBib2R5KS5hZGRDbGFzcyhcImluZGVudF9cIiArIHZhcnMudWkuc3ViaGVhZGVyX2luZGVudCk7XHJcblx0XHRcdFx0JCh2YXJzLmNhbnZhcy5zZWxlY3Rvci5ub3Rfc3ViaGVhZGVyLCBib2R5KS5hZGRDbGFzcyhcImluZGVudF9cIiArIHZhcnMudWkubWFpbl9pbmRlbnQpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRvbkVuYWJsZTogKHZhcnMsIGJvZHkpID0+IHtcclxuXHRcdFx0XHQkKHZhcnMuY2FudmFzLnNlbGVjdG9yLm1vZHVsZV9pdGVtLCBib2R5KS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0WzAsMSwyLDMsNCw1XS5mb3JFYWNoKGxldmVsID0+ICQodGhpcykucmVtb3ZlQ2xhc3MoXCJpbmRlbnRfXCIgKyBsZXZlbCkpO1xyXG5cdFx0XHRcdFx0Y29uc3QgZGVmTGV2ZWwgPSAkKHRoaXMpLmF0dHIodmFycy5kYXRhX2F0dHIuZGVmX2luZGVudCk7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwiaW5kZW50X1wiICsgZGVmTGV2ZWwpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0c2Fzc0pzb246IHN0cmluZztcclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgcHJlZml4VHlwZXMgPSBbXCJjc3NDbGFzc1wiLCBcImRhdGFBdHRyXCIsIFwiaWRcIl07XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdGNvbnN0IHR5cGVzID0gbmV3IFNldChTYXNzVmFycy5wcmVmaXhUeXBlcyk7XHJcblxyXG5cdFx0Y29uc3QgcHJvY2Vzc09iamVjdCA9IChvYmosIG9iak5hbWUpID0+IHtcclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XHJcblx0XHRcdFx0aWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkgY29udGludWU7XHJcblxyXG5cdFx0XHRcdGxldCB2YWw6IG9iamVjdCB8IHN0cmluZyA9IG9ialtrZXldO1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKSB7XHJcblx0XHRcdFx0XHRwcm9jZXNzT2JqZWN0KHZhbCwga2V5KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xyXG5cclxuXHRcdFx0XHRcdGlmICgha2V5LnN0YXJ0c1dpdGgoXCJwb3B1cF9cIikgJiYgKHR5cGVzLmhhcyhvYmpOYW1lKSB8fCB0eXBlcy5oYXMoa2V5KSkpIHtcclxuXHRcdFx0XHRcdFx0dmFsID0gdGhpcy5wcmVmaXggKyBcIi1cIiArIHZhbDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAob2JqTmFtZSA9PT0gXCJkYXRhQXR0clwiKSB7XHJcblx0XHRcdFx0XHRcdHZhbCA9IFwiZGF0YS1cIiArIHZhbDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRvYmpba2V5XSA9IHZhbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRwcm9jZXNzT2JqZWN0KHRoaXMsIFwicm9vdFwiKTtcclxuXHJcblx0XHR0aGlzLnNhc3NKc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcyk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuY2xhc3MgVmFycyBleHRlbmRzIFNhc3NWYXJzIHtcclxuXHJcblx0dG9vbHRpcCA9IHtcclxuXHRcdG1hcmtfY29tcGxldGU6IFwiTWFyayBhcyBjb21wbGV0ZWRcIixcclxuXHRcdG1hcmtfaW5jb21wbGV0ZTogXCJNYXJrIGFzIGluY29tcGxldGVcIixcclxuXHRcdGhpZGU6IFwiSGlkZSB0aGlzIGl0ZW1cIixcclxuXHRcdHVuaGlkZTogXCJVbmhpZGUgdGhpcyBpdGVtXCIsXHJcblx0XHRoaWRlX2Rpc2FibGVkOiBcIkNhbm5vdCBoaWRlIGdyYWRlZCBpdGVtXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJKdW1wIHRvIHRvcFwiLFxyXG5cdFx0d2FpdGluZzogXCJXYWl0aW5nLi4uXCIsXHJcblx0XHRkb3dubG9hZDogXCJEb3dubG9hZCBmaWxlOiBcXFwie2ZpbGVuYW1lfVxcXCJcIixcclxuXHRcdGV4dGVybmFsX3VybDogXCJWaXNpdCBleHRlcm5hbCBVUkxcIixcclxuXHRcdGhhc19zdWJtaXNzaW9uOiBcIkFzc2lnbm1lbnQgaGFzIHN1Ym1pc3Npb25cIixcclxuXHRcdHBvcHVwX25vX3VuY2hlY2tlZDogXCJObyB1bmNoZWNrZWQgaXRlbXMgdG8ganVtcCB0b1wiXHJcblx0fTtcclxuXHJcblx0bWlzYyA9IHtcclxuXHRcdHRvY19iYWNrZ3JvdW5kOiBgLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCwgJHt0aGlzLmNvbG9yLnRvY19maWxsfSB7cGVyY2VudH0lLCB0cmFuc3BhcmVudCB7cGVyY2VudH0lKWAsXHJcblx0XHR0b2tlbl9rZXk6IFwiYWNjZXNzVG9rZW5cIlxyXG5cdH07XHJcblxyXG5cdGVsZW1lbnQgPSB7XHJcblxyXG5cdFx0Y2hlY2tib3g6XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5jaGVja2JveF9wYXJlbnR9Jz5cclxuXHRcdFx0XHRcdDxpbnB1dCB0eXBlPSdjaGVja2JveCcgJHt0aGlzLmRhdGFBdHRyLm1vZF9pdGVtX2lkfT0ne2l0ZW1faWR9Jz5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGRvd25sb2FkX2J1dHRvbjpcclxuXHRcdFx0XHRgPGRpdiBzdHlsZT0nZGlzcGxheTpub25lJyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLmRvd25sb2FkfScgdGl0bGU9JyR7dGhpcy50b29sdGlwLmRvd25sb2FkfSc+XHJcblx0XHRcdFx0XHQ8YSBocmVmPVwie2ZpbGVfdXJsfVwiPjwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHVybF9idXR0b246XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5leHRlcm5hbF91cmx9JyB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuZXh0ZXJuYWxfdXJsfSc+XHJcblx0XHRcdFx0XHQ8YSBocmVmPVwie2V4dGVybmFsX3VybH1cIiBjbGFzcz1cIm5vdF9leHRlcm5hbFwiIHRhcmdldD1cIl9ibGFua1wiPjwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGhpZGVfYnV0dG9uOlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuaGlkZV9idXR0b259Jz5cclxuXHRcdFx0XHRcdDxpICR7dGhpcy5kYXRhQXR0ci5tb2RfaXRlbV9pZH09J3tpdGVtX2lkfSc+PC9pPlxyXG5cdFx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0Y291cnNlX2xpbms6XHJcblx0XHRcdGA8bGkgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHt0YWJDb2xvcn0nIGNsYXNzPSdtZW51LWl0ZW0gaWMtYXBwLWhlYWRlcl9fbWVudS1saXN0LWl0ZW0nPlxyXG5cdFx0XHRcdDxhIGhyZWY9Jy9jb3Vyc2VzL3t0YWJJRH0vbW9kdWxlcycgY2xhc3M9J2ljLWFwcC1oZWFkZXJfX21lbnUtbGlzdC1saW5rJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9J21lbnUtaXRlbS1pY29uLWNvbnRhaW5lcicgYXJpYS1oaWRkZW49J3RydWUnPjxpPjwvaT48L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHt0YWJDb2xvcn07IGJvcmRlci1yaWdodC1jb2xvcjoge3RhYkNvbG9yfSdcclxuXHRcdFx0XHRcdFx0XHQke3RoaXMuZGF0YUF0dHIuY291cnNlX25hbWV9PSd7bmFtZX0nICR7dGhpcy5kYXRhQXR0ci5jb3Vyc2VfY29kZX09J3tjb2RlfSdcclxuXHRcdFx0XHRcdFx0XHRjbGFzcz0nbWVudS1pdGVtX190ZXh0ICR7dGhpcy5jc3NDbGFzcy5jb3Vyc2VfbGlua190ZXh0fSc+PC9kaXY+XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHQ8L2xpPmAsXHJcblxyXG5cdFx0dG9jOlxyXG5cdFx0XHRgPGRpdiBpZD0nJHt0aGlzLmlkLnRvY30nIGNsYXNzPSdpYy1hcHAtY291cnNlLW1lbnUgbGlzdC12aWV3Jz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPScke3RoaXMuY3NzQ2xhc3MudG9jX3RpdGxlfSc+VGFibGUgb2YgQ29udGVudHM8L2Rpdj5cclxuXHRcdFx0XHQ8bmF2Pjx1bD48L3VsPjwvbmF2PlxyXG5cdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHRvY19pdGVtOlxyXG5cdFx0XHRgPGxpPlxyXG5cdFx0XHRcdDxhIGhyZWY9JyMnIHRpdGxlPSd7aXRlbV9uYW1lfSc+XHJcblx0XHRcdFx0XHR7aXRlbV9uYW1lfVxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLnRvY19yYXRpb30nICR7dGhpcy5kYXRhQXR0ci50b2NfbW9kdWxlX2lkfT0ne2l0ZW1faWR9Jz48L2Rpdj5cclxuXHRcdFx0XHQ8L2E+XHJcblx0XHRcdDwvbGk+YCxcclxuXHJcblx0XHRqdW1wX2J1dHRvbjpcclxuXHRcdFx0YDxkaXYgaWQ9JyR7dGhpcy5pZC5qdW1wX2J1dHRvbn0nPlxyXG5cdFx0XHRcdDxpIHRpdGxlPScke3RoaXMudG9vbHRpcC5qdW1wX2J1dHRvbn0nPjwvaT5cclxuXHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRzdWJtaXNzaW9uX2ljb246XHJcblx0XHRcdGA8ZGl2IHRpdGxlPScke3RoaXMudG9vbHRpcC5oYXNfc3VibWlzc2lvbn0nIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuaXRlbV9pY29ufSc+XHJcblx0XHRcdFx0PGkgY2xhc3M9J2ljb24tcHVibGlzaCc+PC9pPlxyXG5cdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHBvcHVwX3N0YXRlX3N3aXRjaDpcclxuXHRcdFx0YDxkaXYgY2xhc3M9XCJzd2l0Y2ggJHt0aGlzLmNzc0NsYXNzLnBvcHVwX3JlcXVpcmVfcGFnZX1cIj5cclxuXHRcdFx0XHQ8bGFiZWwgZm9yPVwie25hbWV9XCIgY2xhc3M9XCJtZGwtc3dpdGNoIG1kbC1qcy1zd2l0Y2ggbWRsLWpzLXJpcHBsZS1lZmZlY3RcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwibWRsLXN3aXRjaF9fbGFiZWxcIj57ZGVzY308L3NwYW4+XHJcblx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJ7bmFtZX1cIiB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cIm1kbC1zd2l0Y2hfX2lucHV0XCI+XHJcblx0XHRcdFx0PC9sYWJlbD5cclxuXHRcdFx0PC9kaXY+YFxyXG5cdH07XHJcblxyXG5cdC8vIHNlcGFyYXRlZCBmb3IgdXNlIGluIHRlbXBsYXRlIHN0cmluZ3MgYmVsb3dcclxuXHRwcml2YXRlIF9jYW52YXMgPSB7XHJcblx0XHRuYW1lc3BhY2U6IGBjb20uam1hcmluZXIuJHt0aGlzLnByZWZpeH1gLFxyXG5cdFx0cm9vdF91cmw6IFwiL2FwaS92MS9cIlxyXG5cdH07XHJcblxyXG5cdGNhbnZhcyA9IHtcclxuXHRcdHNlbGVjdG9yOiB7XHJcblx0XHRcdG1vZHVsZTogXCJkaXYuY29udGV4dF9tb2R1bGVcIixcclxuXHRcdFx0bW9kdWxlX2l0ZW06IFwibGkuY29udGV4dF9tb2R1bGVfaXRlbVwiLFxyXG5cdFx0XHRtb2R1bGVfaXRlbXM6IFwidWwuY29udGV4dF9tb2R1bGVfaXRlbXNcIixcclxuXHRcdFx0c3ViaGVhZGVyOiBcImxpLmNvbnRleHRfbW9kdWxlX3N1Yl9oZWFkZXJcIixcclxuXHRcdFx0bm90X3N1YmhlYWRlcjogXCJsaS5jb250ZXh0X21vZHVsZV9pdGVtOm5vdCguY29udGV4dF9tb2R1bGVfc3ViX2hlYWRlcilcIixcclxuXHRcdFx0bmF2X3RhYnM6IFwidWwjc2VjdGlvbi10YWJzXCJcclxuXHRcdH0sXHJcblx0XHRhcGk6IHtcclxuXHRcdFx0bmFtZXNwYWNlOiB0aGlzLl9jYW52YXMubmFtZXNwYWNlLFxyXG5cdFx0XHRyb290X3VybDogdGhpcy5fY2FudmFzLnJvb3RfdXJsLFxyXG5cdFx0XHRwZXJfcGFnZTogMTAwLFxyXG5cdFx0XHR1cmxzOiB7XHJcblx0XHRcdFx0Y3VzdG9tX2RhdGE6IGB1c2Vycy9zZWxmL2N1c3RvbV9kYXRhe2RhdGFQYXRofT9ucz0ke3RoaXMuX2NhbnZhcy5uYW1lc3BhY2V9YCxcclxuXHRcdFx0XHRmYXZvcml0ZV9jb3Vyc2VzOiBcInVzZXJzL3NlbGYvZmF2b3JpdGVzL2NvdXJzZXNcIixcclxuXHRcdFx0XHRjdXN0b21fY29sb3JzOiBcInVzZXJzL3NlbGYvY29sb3JzXCIsXHJcblx0XHRcdFx0YXNzaWdubWVudHM6IFwidXNlcnMvc2VsZi9jb3Vyc2VzL3tjb3Vyc2VJRH0vYXNzaWdubWVudHNcIixcclxuXHRcdFx0XHRtb2R1bGVzOiBcImNvdXJzZXMve2NvdXJzZUlEfS9tb2R1bGVzXCIsXHJcblx0XHRcdFx0bW9kdWxlX2l0ZW1zOiBcImNvdXJzZXMve2NvdXJzZUlEfS9tb2R1bGVzL3ttb2R1bGVJRH0vaXRlbXNcIixcclxuXHRcdFx0XHRmaWxlX2RpcmVjdDogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vZmlsZXMve2ZpbGVJRH1cIixcclxuXHRcdFx0XHRuYXZpZ2F0aW9uX3RhYnM6IFwiY291cnNlcy97Y291cnNlSUR9L3RhYnNcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRkYXRhX3VybHM6IHtcclxuXHRcdFx0XHRhY3RpdmVfc3RhdGVzOiBcImFjdGl2ZV9zdGF0ZXNcIixcclxuXHRcdFx0XHRjb21wbGV0ZWRfYXNzaWdubWVudHM6IFwiY29tcGxldGVkX2Fzc2lnbm1lbnRzXCIsXHJcblx0XHRcdFx0aGlkZGVuX2Fzc2lnbm1lbnRzOiBcImhpZGRlbl9hc3NpZ25tZW50c1wiLFxyXG5cdFx0XHRcdHRhYl9wb3NpdGlvbnM6IFwidGFiX3Bvc2l0aW9uc1wiXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRpbml0KGNvdXJzZUlEOiBudW1iZXIpIHtcclxuXHRcdCQuZWFjaCh0aGlzLmNhbnZhcy5hcGkudXJscywgKGtleSwgdXJsKSA9PiB7XHJcblx0XHRcdHRoaXMuY2FudmFzLmFwaS51cmxzW2tleV0gPSB0aGlzLmNhbnZhcy5hcGkucm9vdF91cmwgKyBVdGlscy5mb3JtYXQodXJsLCB7Y291cnNlSUR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuY29uc3QgVkFSUyA9IG5ldyBWYXJzKCk7XHJcbmV4cG9ydCBjb25zdCBWID0gVkFSUztcclxuZXhwb3J0IGRlZmF1bHQgVkFSUy5zYXNzSnNvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3ZhcnMudHMiLCJpbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0ICogYXMgQ2FudmFzQVBJIGZyb20gXCIuL2NhbnZhc19hcGlcIjtcclxuXHJcbmNsYXNzIERhdGEge1xyXG5cdGNvdXJzZVBhZ2U6IENhbnZhc1BhZ2U7XHJcblx0Y291cnNlSUQ6IG51bWJlcjtcclxuXHRtb2R1bGVzOiBNYXA8bnVtYmVyLCBNb2R1bGU+OyAvLyBtb2R1bGUgaWQgPT4gYXJyYXkgb2YgTW9kdWxlSXRlbVxyXG5cdG1vZHVsZUl0ZW1zOiBNYXA8bnVtYmVyLCBNb2R1bGVJdGVtPjsgLy8gbW9kdWxlIGl0ZW0gaWQgPT4gTW9kdWxlSXRlbVxyXG5cdHN0YXRlczogTWFwPHN0cmluZywgU3RhdGU+OyAvLyBzdGF0ZU5hbWUgPT4gU3RhdGVcclxuXHRjb3Vyc2VUYWJzOiBNYXA8bnVtYmVyLCBDdXN0b21Db3Vyc2VUYWI+OyAvLyBjb3Vyc2UgaWQgPT4gY291cnNlIHRhYlxyXG5cdG5hdlRhYnM6IE1hcDxzdHJpbmcsIE5hdlRhYj47IC8vIHRhYiBpZCBzdHJpbmcgPT4gdGFiXHJcblx0b25NYWluUGFnZTogYm9vbGVhbjtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0ZXh0ZW5zaW9uSWQ6IHN0cmluZztcclxuXHRlbGVtZW50czoge2p1bXBfYnV0dG9uOiBKUXVlcnksIHRvYzogSlF1ZXJ5fTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLm1vZHVsZXMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLm1vZHVsZUl0ZW1zID0gbmV3IE1hcCgpO1xyXG5cdFx0dGhpcy5zdGF0ZXMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLmNvdXJzZVRhYnMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLm5hdlRhYnMgPSBuZXcgTWFwKCk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50cyA9IHtqdW1wX2J1dHRvbjogbnVsbCwgdG9jOiBudWxsfTtcclxuXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBQYWdlIHtcclxuXHJcblx0Ym9keTogSlF1ZXJ5O1xyXG5cdHNjcm9sbGluZ0VsZW1lbnQ6IEpRdWVyeTtcclxuXHRtYWluPzogSlF1ZXJ5O1xyXG5cdGNvbnRlbnQ/OiBKUXVlcnk7XHJcblx0bGVmdD86IEpRdWVyeTtcclxuXHRzaWRlYmFyOiBKUXVlcnk7XHJcblx0Z3JhZGVzPzogSlF1ZXJ5O1xyXG5cclxuXHRpbml0aWFsaXplKCkge1xyXG5cclxuXHRcdHRoaXMuYm9keSA9ICQoXCJib2R5XCIpO1xyXG5cdFx0dGhpcy5zY3JvbGxpbmdFbGVtZW50ID0gJChkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IGRvY3VtZW50LmJvZHkpO1xyXG5cdFx0dGhpcy5zaWRlYmFyID0gJChcIiNtZW51XCIpO1xyXG5cdFx0dGhpcy5tYWluID0gJChcIiNtYWluXCIpO1xyXG5cclxuXHRcdGlmIChEQVRBLm9uTWFpblBhZ2UpIHtcclxuXHRcdFx0dGhpcy5jb250ZW50ID0gJChcIiNjb250ZW50XCIpO1xyXG5cdFx0XHR0aGlzLmxlZnQgPSAkKFwiI2xlZnQtc2lkZVwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoREFUQS5jb3Vyc2VQYWdlID09PSBDYW52YXNQYWdlLkdSQURFUylcclxuXHRcdFx0dGhpcy5ncmFkZXMgPSAkKFwiI2dyYWRlc19zdW1tYXJ5XCIpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEN1c3RvbUNvdXJzZVRhYiB7XHJcblx0cmVhZG9ubHkgaWQ6IG51bWJlcjtcclxuXHRyZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcblx0cmVhZG9ubHkgY29kZTogc3RyaW5nO1xyXG5cdHJlYWRvbmx5IGNvbG9yOiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGNvdXJzZURhdGE6IENhbnZhc0FQSS5Db3Vyc2UsIGNvbG9yOiBzdHJpbmcpIHtcclxuXHRcdHRoaXMuaWQgPSBjb3Vyc2VEYXRhLmlkO1xyXG5cdFx0dGhpcy5uYW1lID0gY291cnNlRGF0YS5uYW1lO1xyXG5cdFx0dGhpcy5jb2RlID0gY291cnNlRGF0YS5jb3Vyc2VfY29kZTtcclxuXHRcdHRoaXMuY29sb3IgPSBjb2xvcjtcclxuXHR9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2VGFiIHtcclxuXHRyZWFkb25seSBpZDogc3RyaW5nO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgaW5pdFBvc2l0aW9uOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfcG9zaXRpb246IG51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IodGFiRGF0YTogQ2FudmFzQVBJLlRhYikge1xyXG5cdFx0dGhpcy5pZCA9IHRhYkRhdGEuaWQ7XHJcblx0XHR0aGlzLl9wb3NpdGlvbiA9IG51bGw7XHJcblx0XHR0aGlzLmluaXRQb3NpdGlvbiA9IHRhYkRhdGEucG9zaXRpb247XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0UG9zaXRpb24ocG9zKSB7XHJcblx0XHR0aGlzLl9wb3NpdGlvbiA9IHBvcztcclxuXHR9XHJcblxyXG5cdGdldCBoYXNDdXN0b21Qb3NpdGlvbigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbiAhPSBudWxsO1xyXG5cdH1cclxuXHJcblx0Z2V0IHBvc2l0aW9uKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcG9zaXRpb24gPT0gbnVsbCA/IHRoaXMuaW5pdFBvc2l0aW9uIDogdGhpcy5fcG9zaXRpb24gPT09IC0xID8gbnVsbCA6IHRoaXMuX3Bvc2l0aW9uO1xyXG5cdH1cclxuXHJcblx0Z2V0IGhpZGRlbigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbiA9PT0gLTE7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdGUge1xyXG5cdHByaXZhdGUgbmFtZTogc3RyaW5nO1xyXG5cdHByaXZhdGUgb25FbmFibGU6ICh2YXJzOiBhbnksIGJvZHk6IEpRdWVyeSkgPT4gdm9pZDtcclxuXHRwcml2YXRlIG9uRGlzYWJsZTogKHZhcnM6IGFueSwgYm9keTogSlF1ZXJ5KSA9PiB2b2lkO1xyXG5cclxuXHRyZWFkb25seSBib2R5Q2xhc3M6IHN0cmluZztcclxuXHRyZWFkb25seSBvblBhZ2VzOiBDYW52YXNQYWdlW107XHJcblxyXG5cdHB1YmxpYyBhY3RpdmU6IGJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKGtleSwgc3RhdGVEYXRhLCBhY3RpdmUpIHtcclxuXHRcdHRoaXMubmFtZSA9IGtleTtcclxuXHRcdHRoaXMuYm9keUNsYXNzID0gc3RhdGVEYXRhLmNzc0NsYXNzO1xyXG5cdFx0dGhpcy5vbkVuYWJsZSA9IHN0YXRlRGF0YS5vbkVuYWJsZTtcclxuXHRcdHRoaXMub25EaXNhYmxlID0gc3RhdGVEYXRhLm9uRGlzYWJsZTtcclxuXHRcdHRoaXMuYWN0aXZlID0gYWN0aXZlO1xyXG5cdFx0dGhpcy5vblBhZ2VzID0gW107XHJcblxyXG5cdFx0c3RhdGVEYXRhLnBhZ2VzLmZvckVhY2goKHBhZ2U6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRjb25zdCBfcGFnZSA9IENhbnZhc1BhZ2VbcGFnZS50b1VwcGVyQ2FzZSgpXTtcclxuXHRcdFx0aWYgKF9wYWdlICE9PSB1bmRlZmluZWQpXHJcblx0XHRcdFx0dGhpcy5vblBhZ2VzLnB1c2goX3BhZ2UpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRvbkNoYW5nZShuZXdTdGF0ZTogYm9vbGVhbiwgdmFycywgYm9keTogSlF1ZXJ5KSB7XHJcblx0XHRpZiAobmV3U3RhdGUpIFV0aWxzLnNhZmVDYih0aGlzLm9uRW5hYmxlKSh2YXJzLCBib2R5KTtcclxuXHRcdGVsc2UgVXRpbHMuc2FmZUNiKHRoaXMub25EaXNhYmxlKSh2YXJzLCBib2R5KTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9kdWxlIHtcclxuXHRyZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcblx0cmVhZG9ubHkgaWQ6IG51bWJlcjtcclxuXHRyZWFkb25seSBpdGVtQ291bnQ6IG51bWJlcjtcclxuXHRyZWFkb25seSBpdGVtczogTW9kdWxlSXRlbVtdO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihtb2R1bGVKc29uOiBDYW52YXNBUEkuTW9kdWxlKSB7XHJcblx0XHR0aGlzLm5hbWUgPSBtb2R1bGVKc29uLm5hbWU7XHJcblx0XHR0aGlzLmlkID0gbW9kdWxlSnNvbi5pZDtcclxuXHRcdHRoaXMuaXRlbUNvdW50ID0gbW9kdWxlSnNvbi5pdGVtc19jb3VudDtcclxuXHRcdHRoaXMuaXRlbXMgPSBbXTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9kdWxlSXRlbSB7XHJcblx0cHJpdmF0ZSBfaWQ6IG51bWJlcjtcclxuXHRwcml2YXRlIF9uYW1lOiBzdHJpbmc7XHJcblx0cHJpdmF0ZSBtb2R1bGVJZDogbnVtYmVyO1xyXG5cdHByaXZhdGUgX3R5cGU6IE1vZHVsZUl0ZW1UeXBlO1xyXG5cdHByaXZhdGUgYXNzaWdubWVudElkOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfY29udGVudElkOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfZmlsZURhdGE6IENhbnZhc0FQSS5GaWxlO1xyXG5cdHByaXZhdGUgX2V4dGVybmFsVXJsOiBzdHJpbmc7XHJcblxyXG5cdHB1YmxpYyBpc1N1Ym1pdHRlZDogYm9vbGVhbjtcclxuXHJcblx0cHVibGljIGNoZWNrZWQ6IGJvb2xlYW47XHJcblx0cHVibGljIGhpZGRlbjogYm9vbGVhbjtcclxuXHRwcml2YXRlIF9jaGVja2JveEVsZW1lbnQ6IEpRdWVyeTtcclxuXHRwcml2YXRlIF9oaWRlRWxlbWVudDogSlF1ZXJ5O1xyXG5cclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGJ5Q29udGVudElkID0gbmV3IE1hcDxudW1iZXIsIE1vZHVsZUl0ZW0+KCk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG1vZHVsZUl0ZW1Kc29uPzogQ2FudmFzQVBJLk1vZHVsZUl0ZW0pIHtcclxuXHRcdGlmIChtb2R1bGVJdGVtSnNvbikgdGhpcy51cGRhdGUobW9kdWxlSXRlbUpzb24pO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBmcm9tQ29udGVudElkKGNvbnRlbnRJZDogbnVtYmVyKTogTW9kdWxlSXRlbSB7XHJcblx0XHRjb25zdCBpdGVtID0gbmV3IE1vZHVsZUl0ZW0oKTtcclxuXHRcdGl0ZW0uX2NvbnRlbnRJZCA9IGNvbnRlbnRJZDtcclxuXHRcdE1vZHVsZUl0ZW0uYnlDb250ZW50SWQuc2V0KGNvbnRlbnRJZCwgaXRlbSk7XHJcblx0XHRyZXR1cm4gaXRlbTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGUobW9kdWxlSXRlbUpzb246IENhbnZhc0FQSS5Nb2R1bGVJdGVtKSB7XHJcblx0XHR0aGlzLl9pZCA9IG1vZHVsZUl0ZW1Kc29uLmlkO1xyXG5cdFx0dGhpcy5fbmFtZSA9IG1vZHVsZUl0ZW1Kc29uLnRpdGxlO1xyXG5cdFx0dGhpcy5tb2R1bGVJZCA9IG1vZHVsZUl0ZW1Kc29uLm1vZHVsZV9pZDtcclxuXHRcdHRoaXMuX2V4dGVybmFsVXJsID0gbW9kdWxlSXRlbUpzb24uZXh0ZXJuYWxfdXJsIHx8IG51bGw7XHJcblxyXG5cdFx0Y29uc3QgdHlwZVN0cmluZzogc3RyaW5nID0gbW9kdWxlSXRlbUpzb24udHlwZVxyXG5cdFx0XHQucmVwbGFjZSgvKFtBLVpdKS9nLCAociwgcykgPT4gXCJfXCIgKyBzKVxyXG5cdFx0XHQucmVwbGFjZSgvXl8vLCBcIlwiKS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuXHRcdHRoaXMuX3R5cGUgPSBNb2R1bGVJdGVtVHlwZVt0eXBlU3RyaW5nXTtcclxuXHJcblx0XHRpZiAodGhpcy5fdHlwZSA9PT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRjb25zb2xlLndhcm4oYFVua25vd24gbW9kdWxlIGl0ZW0gdHlwZTogXCIke3R5cGVTdHJpbmd9XCJgKTtcclxuXHJcblx0XHR0aGlzLmNoZWNrZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuaGlkZGVuID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3R5cGUgPT09IE1vZHVsZUl0ZW1UeXBlLkFTU0lHTk1FTlQpXHJcblx0XHRcdHRoaXMuc2V0QXNzaWdubWVudElkKG1vZHVsZUl0ZW1Kc29uLmNvbnRlbnRfaWQpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLmFzc2lnbm1lbnRJZCA9IG51bGw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0QXNzaWdubWVudElkKGlkOiBudW1iZXIpIHsgdGhpcy5hc3NpZ25tZW50SWQgPSBpZDsgfVxyXG5cdHB1YmxpYyBzZXRGaWxlRGF0YShkYXRhOiBDYW52YXNBUEkuRmlsZSkgeyB0aGlzLl9maWxlRGF0YSA9IGRhdGE7IH1cclxuXHJcblx0Z2V0IGNhbnZhc0VsZW1lbnRJZCgpIHtcclxuXHRcdHN3aXRjaCAoREFUQS5jb3Vyc2VQYWdlKSB7XHJcblx0XHRcdGNhc2UgQ2FudmFzUGFnZS5NT0RVTEVTOlxyXG5cdFx0XHRcdHJldHVybiBcImNvbnRleHRfbW9kdWxlX2l0ZW1fXCIgKyB0aGlzLl9pZDsgLy8gbGkgZWxlbWVudFxyXG5cdFx0XHRjYXNlIENhbnZhc1BhZ2UuR1JBREVTOlxyXG5cdFx0XHRcdHJldHVybiBcInN1Ym1pc3Npb25fXCIgKyB0aGlzLmFzc2lnbm1lbnRJZDsgLy8gdHIgZWxlbWVudFxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IGlkKCkgeyByZXR1cm4gdGhpcy5faWQ7IH1cclxuXHRnZXQgbmFtZSgpIHsgcmV0dXJuIHRoaXMuX25hbWU7XHR9XHJcblx0Z2V0IHR5cGUoKTogTW9kdWxlSXRlbVR5cGUgeyByZXR1cm4gdGhpcy5fdHlwZTsgfVxyXG5cdGdldCBpc0dyYWRlZCgpIHsgcmV0dXJuIHRoaXMuYXNzaWdubWVudElkICE9PSBudWxsOyB9XHJcblx0Z2V0IGlzU3ViSGVhZGVyKCkgeyByZXR1cm4gdGhpcy5fdHlwZSA9PT0gTW9kdWxlSXRlbVR5cGUuU1VCX0hFQURFUjsgfVxyXG5cdGdldCBtb2R1bGUoKSB7IHJldHVybiBEQVRBLm1vZHVsZXMuZ2V0KHRoaXMubW9kdWxlSWQpOyB9XHJcblx0Z2V0IGV4dGVybmFsVXJsKCkgeyByZXR1cm4gdGhpcy5fZXh0ZXJuYWxVcmw7IH1cclxuXHRnZXQgY29udGVudElkKCkgeyByZXR1cm4gdGhpcy5fY29udGVudElkOyB9XHJcblxyXG5cdGdldCBjaGVja2JveEVsZW1lbnQoKTogSlF1ZXJ5IHsgcmV0dXJuIHRoaXMuX2NoZWNrYm94RWxlbWVudDsgfVxyXG5cdHNldCBjaGVja2JveEVsZW1lbnQodmFsdWU6IEpRdWVyeSkge1xyXG5cdFx0aWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlLmxlbmd0aCA9PT0gMSlcclxuXHRcdFx0dGhpcy5fY2hlY2tib3hFbGVtZW50ID0gdmFsdWU7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgTW9kdWxlIEl0ZW0gRWxlbWVudDogXCIgKyB2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRnZXQgaGlkZUVsZW1lbnQoKTogSlF1ZXJ5IHsgcmV0dXJuIHRoaXMuX2hpZGVFbGVtZW50OyB9XHJcblx0c2V0IGhpZGVFbGVtZW50KHZhbHVlOiBKUXVlcnkpIHtcclxuXHRcdGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPT09IDEpXHJcblx0XHRcdHRoaXMuX2hpZGVFbGVtZW50ID0gdmFsdWU7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgTW9kdWxlIEl0ZW0gRWxlbWVudDogXCIgKyB2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRnZXQgZmlsZURhdGEoKTogQ2FudmFzQVBJLkZpbGUgeyByZXR1cm4gdGhpcy5fZmlsZURhdGE7IH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE1vZHVsZUl0ZW1UeXBlIHtcclxuXHRBU1NJR05NRU5ULCBTVUJfSEVBREVSLCBESVNDVVNTSU9OLCBRVUlaLCBQQUdFLCBGSUxFLCBFWFRFUk5BTF9VUkwsIEVYVEVSTkFMX1RPT0xcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQ2FudmFzUGFnZSB7XHJcblx0TU9EVUxFUywgR1JBREVTLCBIT01FLCBVU0VSUywgR1JPVVBTLCBDT0xMQUJPUkFUSU9OUywgRElTQ1VTU0lPTl9UT1BJQ1MsIEVYVEVSTkFMX1RPT0xTLCBBU1NJR05NRU5UU1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBNZXNzYWdlVHlwZSB7XHJcblx0QkFTSUMsIFNUQVRFXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlRGF0YSB7XHJcblx0YWN0aW9uOiBzdHJpbmc7XHJcblx0dHlwZTogTWVzc2FnZVR5cGU7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFjdGlvbjogc3RyaW5nLCB0eXBlPzogTWVzc2FnZVR5cGUpIHtcclxuXHRcdHRoaXMuYWN0aW9uID0gYWN0aW9uO1xyXG5cdFx0dGhpcy50eXBlID0gdHlwZSB8fCBNZXNzYWdlVHlwZS5CQVNJQztcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZU1lc3NhZ2VEYXRhIGV4dGVuZHMgTWVzc2FnZURhdGEge1xyXG5cdHN0YXRlTmFtZTogc3RyaW5nO1xyXG5cdHN0YXRlOiBib29sZWFuO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihhY3Rpb246IFwiZ2V0XCIgfCBcInNldFwiLCBzdGF0ZU5hbWU6IHN0cmluZywgc3RhdGU/OiBib29sZWFuKSB7XHJcblx0XHRzdXBlcihhY3Rpb24sIE1lc3NhZ2VUeXBlLlNUQVRFKTtcclxuXHJcblx0XHR0aGlzLnN0YXRlTmFtZSA9IHN0YXRlTmFtZTtcclxuXHRcdHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuXHJcblx0XHRpZiAoYWN0aW9uID09PSBcInNldFwiICYmIHRoaXMuc3RhdGUgPT09IHVuZGVmaW5lZClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzdGF0ZSBtZXNzYWdlOiBubyBib29sZWFuIHRvIHNldCBzdGF0ZSB0b1wiKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFeGNlcHRpb24ge1xyXG5cdHByaXZhdGUgcmVhc29uOiBzdHJpbmc7XHJcblx0cHJpdmF0ZSBmYXRhbDogYm9vbGVhbjtcclxuXHJcblx0Y29uc3RydWN0b3IocmVhc29uOiBzdHJpbmcsIGZhdGFsPzogYm9vbGVhbikge1xyXG5cdFx0aWYgKGZhdGFsID09PSB1bmRlZmluZWQpIGZhdGFsID0gZmFsc2U7XHJcblx0XHR0aGlzLnJlYXNvbiA9IHJlYXNvbjtcclxuXHRcdHRoaXMuZmF0YWwgPSBmYXRhbDtcclxuXHR9XHJcblxyXG5cdGdldCBpc0ZhdGFsKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZmF0YWw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdG9TdHJpbmcoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWFzb247XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgREFUQSA9IG5ldyBEYXRhKCk7XHJcbmV4cG9ydCBjb25zdCBQQUdFID0gbmV3IFBhZ2UoKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL29iamVjdHMudHMiLCJpbXBvcnQgeyBEQVRBLCBQQUdFLCBFeGNlcHRpb24sIEN1c3RvbUNvdXJzZVRhYiwgTmF2VGFiLFxyXG5cdFN0YXRlLCBNb2R1bGUsIE1vZHVsZUl0ZW0sIE1lc3NhZ2VEYXRhLCAgU3RhdGVNZXNzYWdlRGF0YSxcclxuXHRDYW52YXNQYWdlLCBNZXNzYWdlVHlwZSwgTW9kdWxlSXRlbVR5cGUgfSBmcm9tIFwiLi9vYmplY3RzXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBWIH0gZnJvbSBcIi4vdmFyc1wiO1xyXG5pbXBvcnQgKiBhcyBDYW52YXNBUEkgZnJvbSBcIi4vY2FudmFzX2FwaVwiO1xyXG5cclxuKGFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7XHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vICAgICAgICAgICBtYWluIGluaXRpYWxpemF0aW9uXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdChmdW5jdGlvbigpIHtcclxuXHJcblx0XHREQVRBLmV4dGVuc2lvbklkID0gY2hyb21lLnJ1bnRpbWUuaWQ7XHJcblx0XHREQVRBLm5hbWUgPSBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLm5hbWU7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBsb2dUeXBlIG9mIFwibG9nIGRlYnVnIGluZm8gd2FybiBlcnJvciBkaXJcIi5zcGxpdChcIiBcIikpIHtcclxuXHRcdFx0Y29uc3Qgb3JpZyA9IGNvbnNvbGVbbG9nVHlwZV07XHJcblx0XHRcdGNvbnNvbGVbbG9nVHlwZV0gPSBvcmlnLmJpbmQoY29uc29sZSwgYFske0RBVEEubmFtZX1dIFske2xvZ1R5cGUudG9VcHBlckNhc2UoKX1dYCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gbG9hZCBjb3Vyc2UgaWQgYW5kIHdoYXQgcGFnZSB1c2VyIGlzIG9uIHdpdGhpbiB0aGF0IGNvdXJzZVxyXG5cdFx0Y29uc3QgdXJsTWF0Y2ggPSAvY291cnNlc1xcLyhcXGQrKSg/OlxcLyhcXHcrKSk/LiovLmV4ZWMoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUpO1xyXG5cdFx0Y29uc3Qgb25Db3Vyc2VQYWdlID0gdXJsTWF0Y2ggIT09IG51bGw7XHJcblx0XHREQVRBLmNvdXJzZVBhZ2UgPSBvbkNvdXJzZVBhZ2UgPyBDYW52YXNQYWdlWyh1cmxNYXRjaFsyXSB8fCBcImhvbWVcIikudG9VcHBlckNhc2UoKV0gOiBudWxsO1xyXG5cdFx0REFUQS5jb3Vyc2VJRCA9IG9uQ291cnNlUGFnZSA/IE51bWJlcih1cmxNYXRjaFsxXSkgOiBudWxsO1xyXG5cdFx0REFUQS5vbk1haW5QYWdlID0gW0NhbnZhc1BhZ2UuTU9EVUxFUywgQ2FudmFzUGFnZS5HUkFERVNdLmluY2x1ZGVzKERBVEEuY291cnNlUGFnZSk7XHJcblxyXG5cdFx0aWYgKG9uQ291cnNlUGFnZSlcclxuXHRcdFx0Y29uc29sZS5kZWJ1ZyhgT24gY291cnNlICMke0RBVEEuY291cnNlSUR9IHBhZ2UsIGF0ICR7Q2FudmFzUGFnZVtEQVRBLmNvdXJzZVBhZ2VdfWApO1xyXG5cclxuXHR9KSgpO1xyXG5cclxuXHQvLyBiZWdpbiBhc3luYyBvcGVyYXRpb25zXHJcblxyXG5cdGNvbnN0IGluaXRTdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuXHQvLyBsb2FkIHZhcmlhYmxlc1xyXG5cclxuXHRWLmluaXQoREFUQS5jb3Vyc2VJRCk7XHJcblxyXG5cdC8vIHRyeSB0byBsb2FkIGFjY2VzcyB0b2tlblxyXG5cdHRyeSB7XHJcblx0XHRhd2FpdCBVdGlscy5sb2FkVG9rZW4oKTtcclxuXHR9XHJcblx0Y2F0Y2ggKGUpIHtcclxuXHRcdFV0aWxzLmFjY2Vzc1Rva2VuUHJvbXB0KCk7XHJcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKFwiTWlzc2luZyBhY2Nlc3MgdG9rZW47IG11c3QgcmVmcmVzaFwiLCB0cnVlKTtcclxuXHR9XHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vICAgICAgICAgICAgICAgY291cnNlIHRhYnNcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0Y29uc3QgY291cnNlVGFiRmxvdyA9IGFzeW5jIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdGNvbnN0IGNvdXJzZUNvbG9ycyA9IChcclxuXHRcdFx0YXdhaXQgVXRpbHMuZ2V0SlNPTjx7Y3VzdG9tX2NvbG9yczogTWFwPHN0cmluZywgc3RyaW5nPn0+KFYuY2FudmFzLmFwaS51cmxzLmN1c3RvbV9jb2xvcnMpXHJcblx0XHQpLmN1c3RvbV9jb2xvcnM7XHJcblxyXG5cdFx0Y29uc3QgZmF2b3JpdGVDb3Vyc2VzID1cclxuXHRcdFx0YXdhaXQgVXRpbHMuZ2V0SlNPTjxDYW52YXNBUEkuQ291cnNlW10+KFYuY2FudmFzLmFwaS51cmxzLmZhdm9yaXRlX2NvdXJzZXMpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgY291cnNlRGF0YSBvZiBmYXZvcml0ZUNvdXJzZXMpIHtcclxuXHRcdFx0Y29uc3QgY29sb3IgPSBjb3Vyc2VDb2xvcnNbXCJjb3Vyc2VfXCIgKyBjb3Vyc2VEYXRhLmlkXTtcclxuXHRcdFx0REFUQS5jb3Vyc2VUYWJzLnNldChjb3Vyc2VEYXRhLmlkLCBuZXcgQ3VzdG9tQ291cnNlVGFiKGNvdXJzZURhdGEsIGNvbG9yKSk7XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vICAgICAgICAgICAgbmF2aWdhdGlvbiB0YWJzXHJcblx0Ly8gIHJlcXVpcmVzOiBjb3Vyc2UgcGFnZVxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRjb25zdCBuYXZUYWJGbG93ID0gYXN5bmMgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Y29uc3QgbmF2VGFiVXJsID0gVXRpbHMucGVyUGFnZShWLmNhbnZhcy5hcGkudXJscy5uYXZpZ2F0aW9uX3RhYnMsIDI1KTtcclxuXHRcdGNvbnN0IG5hdlRhYnMgPSBhd2FpdCBVdGlscy5nZXRKU09OPENhbnZhc0FQSS5UYWJbXT4obmF2VGFiVXJsKTtcclxuXHRcdGZvciAoY29uc3QgdGFiIG9mIG5hdlRhYnMpXHJcblx0XHRcdERBVEEubmF2VGFicy5zZXQodGFiLmlkLCBuZXcgTmF2VGFiKHRhYikpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyAgICAgICAgICAgICAgYXNzaWdubWVudHNcclxuXHQvLyAgcmVxdWlyZXM6IG1vZHVsZXMgb3IgZ3JhZGVzIHBhZ2VcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0Y29uc3QgYXNzaWdubWVudEZsb3cgPSBhc3luYyBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyBob3BlZnVsbHkgMTAwMCBpcyBlbm91Z2ggdG8gZ2V0IGFsbCBpbiBvbmUgZ29cclxuXHRcdGNvbnN0IGFzc2lnbm1lbnRzVXJsID0gVXRpbHMucGVyUGFnZShWLmNhbnZhcy5hcGkudXJscy5hc3NpZ25tZW50cywgMTAwMCk7XHJcblx0XHRjb25zdCBhc3NpZ25tZW50cyA9IGF3YWl0IFV0aWxzLmdldEpTT048Q2FudmFzQVBJLkFzc2lnbm1lbnRbXT4oYXNzaWdubWVudHNVcmwpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgYXNzaWdubWVudEpzb24gb2YgYXNzaWdubWVudHMpIHtcclxuXHJcblx0XHRcdGxldCBjb250ZW50SWQ6IG51bWJlcjtcclxuXHRcdFx0aWYgKGFzc2lnbm1lbnRKc29uLnF1aXpfaWQpXHJcblx0XHRcdFx0Y29udGVudElkID0gYXNzaWdubWVudEpzb24ucXVpel9pZDtcclxuXHRcdFx0ZWxzZSBpZiAoYXNzaWdubWVudEpzb24uZGlzY3Vzc2lvbl90b3BpYylcclxuXHRcdFx0XHRjb250ZW50SWQgPSBhc3NpZ25tZW50SnNvbi5kaXNjdXNzaW9uX3RvcGljLmlkO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0Y29udGVudElkID0gYXNzaWdubWVudEpzb24uaWQ7XHJcblxyXG5cdFx0XHRsZXQgaXRlbTogTW9kdWxlSXRlbTtcclxuXHRcdFx0aWYgKE1vZHVsZUl0ZW0uYnlDb250ZW50SWQuaGFzKGNvbnRlbnRJZCkpXHJcblx0XHRcdFx0aXRlbSA9IE1vZHVsZUl0ZW0uYnlDb250ZW50SWQuZ2V0KGNvbnRlbnRJZCk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRpdGVtID0gTW9kdWxlSXRlbS5mcm9tQ29udGVudElkKGNvbnRlbnRJZCk7XHJcblxyXG5cdFx0XHRpdGVtLnNldEFzc2lnbm1lbnRJZChhc3NpZ25tZW50SnNvbi5pZCk7XHJcblxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vICAgICAgIG1vZHVsZXMsIGl0ZW1zLCBhbmQgZmlsZXNcclxuXHQvLyAgcmVxdWlyZXM6IG1vZHVsZXMgb3IgZ3JhZGVzIHBhZ2VcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0Y29uc3QgbW9kdWxlSXRlbUZsb3cgPSBhc3luYyBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyA9PT09PSBtb2R1bGVzID09PT09XHJcblxyXG5cdFx0Y29uc3QgbW9kdWxlc1VybCA9IFV0aWxzLnBlclBhZ2UoVi5jYW52YXMuYXBpLnVybHMubW9kdWxlcywgMjUpO1xyXG5cdFx0Y29uc3QgbW9kdWxlcyA9IGF3YWl0IFV0aWxzLmdldEpTT048Q2FudmFzQVBJLk1vZHVsZVtdPihtb2R1bGVzVXJsKTtcclxuXHRcdGZvciAoY29uc3QgbW9kdWxlRGF0YSBvZiBtb2R1bGVzKSB7XHJcblx0XHRcdERBVEEubW9kdWxlcy5zZXQobW9kdWxlRGF0YS5pZCwgbmV3IE1vZHVsZShtb2R1bGVEYXRhKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09PT0gbW9kdWxlIGl0ZW1zID09PT09XHJcblxyXG5cdFx0Y29uc3QgbW9kdWxlSWRzID0gQXJyYXkuZnJvbShEQVRBLm1vZHVsZXMua2V5cygpKTtcclxuXHRcdGNvbnN0IGl0ZW1TZXRQcm9taXNlczogQXJyYXk8UHJvbWlzZTxDYW52YXNBUEkuTW9kdWxlSXRlbVtdPj4gPVxyXG5cdFx0XHRtb2R1bGVJZHMubWFwKG1vZElkID0+IERBVEEubW9kdWxlcy5nZXQobW9kSWQpKVxyXG5cdFx0XHRcdC5maWx0ZXIobW9kID0+IG1vZC5pdGVtQ291bnQgPiAwKVxyXG5cdFx0XHRcdC5tYXAobW9kdWxlID0+IHtcclxuXHJcblx0XHRcdFx0XHRjb25zdCBtb2R1bGVJdGVtc1VybCA9IFV0aWxzLnBlclBhZ2UoXHJcblx0XHRcdFx0XHRcdFV0aWxzLmZvcm1hdChWLmNhbnZhcy5hcGkudXJscy5tb2R1bGVfaXRlbXMsIHttb2R1bGVJRDogbW9kdWxlLmlkfSksXHJcblx0XHRcdFx0XHRcdG1vZHVsZS5pdGVtQ291bnQpO1xyXG5cclxuXHRcdFx0XHRcdC8vIHJldHVybiB0aGUgcHJvbWlzZSBpbnN0ZWFkIG9mIGF3YWl0aW5nIG9uIHRoaXMgc28gaXQgY2FuIGJlIHVzZWQgaW4gUHJvbWlzZS5hbGxcclxuXHRcdFx0XHRcdHJldHVybiBVdGlscy5nZXRKU09OPENhbnZhc0FQSS5Nb2R1bGVJdGVtW10+KG1vZHVsZUl0ZW1zVXJsKTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0Y29uc3QgbW9kdWxlSXRlbVNldHM6IENhbnZhc0FQSS5Nb2R1bGVJdGVtW11bXSA9IGF3YWl0IFByb21pc2UuYWxsKGl0ZW1TZXRQcm9taXNlcyk7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBpdGVtcyBvZiBtb2R1bGVJdGVtU2V0cykge1xyXG5cclxuXHRcdFx0Y29uc3QgbW9kdWxlID0gREFUQS5tb2R1bGVzLmdldChpdGVtc1swXS5tb2R1bGVfaWQpO1xyXG5cclxuXHRcdFx0Zm9yIChjb25zdCBtb2RJdGVtSnNvbiBvZiBpdGVtcykge1xyXG5cclxuXHRcdFx0XHRsZXQgaXRlbTogTW9kdWxlSXRlbTtcclxuXHRcdFx0XHRjb25zdCBjb250ZW50SWQgPSBtb2RJdGVtSnNvbi5jb250ZW50X2lkO1xyXG5cclxuXHRcdFx0XHRpZiAoTW9kdWxlSXRlbS5ieUNvbnRlbnRJZC5oYXMoY29udGVudElkKSlcclxuXHRcdFx0XHRcdGl0ZW0gPSBNb2R1bGVJdGVtLmJ5Q29udGVudElkLmdldChjb250ZW50SWQpO1xyXG5cdFx0XHRcdGVsc2UgaWYgKGNvbnRlbnRJZClcclxuXHRcdFx0XHRcdGl0ZW0gPSBNb2R1bGVJdGVtLmZyb21Db250ZW50SWQoY29udGVudElkKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRpdGVtID0gbmV3IE1vZHVsZUl0ZW0oKTtcclxuXHJcblx0XHRcdFx0aXRlbS51cGRhdGUobW9kSXRlbUpzb24pO1xyXG5cclxuXHRcdFx0XHREQVRBLm1vZHVsZUl0ZW1zLnNldChtb2RJdGVtSnNvbi5pZCwgaXRlbSk7XHJcblx0XHRcdFx0bW9kdWxlLml0ZW1zLnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09PT0gZmlsZSBtb2R1bGUgaXRlbXMgPT09PT1cclxuXHJcblx0XHRjb25zdCBmaWxlSXRlbXMgPSBBcnJheS5mcm9tKERBVEEubW9kdWxlSXRlbXMudmFsdWVzKCkpXHJcblx0XHRcdC5maWx0ZXIoaXRlbSA9PiBpdGVtLnR5cGUgPT09IE1vZHVsZUl0ZW1UeXBlLkZJTEUpO1xyXG5cclxuXHRcdGNvbnN0IGZpbGVQcm9taXNlczogQXJyYXk8UHJvbWlzZTxDYW52YXNBUEkuRmlsZT4+ID0gZmlsZUl0ZW1zLm1hcChpdGVtID0+IHtcclxuXHRcdFx0Y29uc3QgZmlsZURhdGFVcmwgPSBVdGlscy5mb3JtYXQoVi5jYW52YXMuYXBpLnVybHMuZmlsZV9kaXJlY3QsIHtmaWxlSUQ6IGl0ZW0uY29udGVudElkfSk7XHJcblx0XHRcdC8vIHJldHVybiBwcm9taXNlIGZvciBQcm9taXNlLmFsbFxyXG5cdFx0XHRyZXR1cm4gVXRpbHMuZ2V0SlNPTjxDYW52YXNBUEkuRmlsZT4oZmlsZURhdGFVcmwpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc3QgZmlsZXM6IENhbnZhc0FQSS5GaWxlW10gPSBhd2FpdCBQcm9taXNlLmFsbChmaWxlUHJvbWlzZXMpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcylcclxuXHRcdFx0TW9kdWxlSXRlbS5ieUNvbnRlbnRJZC5nZXQoZmlsZS5pZCkuc2V0RmlsZURhdGEoZmlsZSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vICAgICAgICAgICAgICBjdXN0b20gZGF0YVxyXG5cdC8vICByZXF1aXJlczogbW9kdWxlcyBvciBncmFkZXMgcGFnZVxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRjb25zdCBjdXN0b21EYXRhRmxvdyA9IGFzeW5jIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdGNvbnN0IGN1c3RvbURhdGFVcmwgPSBVdGlscy5mb3JtYXQoVi5jYW52YXMuYXBpLnVybHMuY3VzdG9tX2RhdGEsIHtkYXRhUGF0aDogXCJcIn0pO1xyXG5cdFx0Y29uc3QgY3VzdG9tRGF0YTogQ2FudmFzQVBJLkN1c3RvbURhdGEgPSAoXHJcblx0XHRcdGF3YWl0IFV0aWxzLmdldEpTT048e2RhdGE6IENhbnZhc0FQSS5DdXN0b21EYXRhfT4oY3VzdG9tRGF0YVVybClcclxuXHRcdCkuZGF0YTtcclxuXHJcblx0XHQvLyB0aGlzIGhhcHBlbnMgd2hlbiB0aGVyZSB3YXMgYW4gaXNzdWUgZ2V0dGluZyB0aGUgZGF0YSBvciB0aGVyZSB3YXMgbm8gZGF0YSBhdCBhbGxcclxuXHRcdC8vIFRPRE8gZmlndXJlIG91dCB3aGF0IHRvIGRvIGhlcmVcclxuXHRcdGlmIChjdXN0b21EYXRhID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcblx0XHQvLyA9PT09PSBsb2FkIGNvbXBsZXRlIC8gaGlkZGVuIGFzc2lnbm1lbnRzID09PT09XHJcblxyXG5cdFx0Y29uc3QgY29tcGxldGUgPSBVdGlscy5nZXRPckRlZmF1bHQoY3VzdG9tRGF0YS5jb21wbGV0ZWRfYXNzaWdubWVudHMsIERBVEEuY291cnNlSUQsIG5ldyBBcnJheTxudW1iZXI+KCkpO1xyXG5cdFx0Y29uc3QgaGlkZGVuID0gVXRpbHMuZ2V0T3JEZWZhdWx0KGN1c3RvbURhdGEuaGlkZGVuX2Fzc2lnbm1lbnRzLCBEQVRBLmNvdXJzZUlELCBuZXcgQXJyYXk8bnVtYmVyPigpKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IFttb2RJdGVtSWQsIG1vZEl0ZW1dIG9mIERBVEEubW9kdWxlSXRlbXMpIHtcclxuXHRcdFx0bW9kSXRlbS5jaGVja2VkID0gY29tcGxldGUuaW5jbHVkZXMobW9kSXRlbUlkKTtcclxuXHRcdFx0bW9kSXRlbS5oaWRkZW4gPSBoaWRkZW4uaW5jbHVkZXMobW9kSXRlbUlkKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyA9PT09PSBsb2FkIGFjdGl2ZSBzdGF0ZSBsaXN0ID09PT09XHJcblxyXG5cdFx0Y29uc3QgYWN0aXZlU3RhdGVzOiBzdHJpbmdbXSA9IGN1c3RvbURhdGEuYWN0aXZlX3N0YXRlcyB8fCBbXTtcclxuXHJcblx0XHQvLyBsb2FkIHN0YXRlcyBmcm9tIGNvbmZpZ1xyXG5cdFx0JC5lYWNoKFYuc3RhdGUsIChuYW1lLCBzdGF0ZURhdGEpID0+IHtcclxuXHRcdFx0Y29uc3Qgc3RhdGVPYmogPSBuZXcgU3RhdGUobmFtZSwgc3RhdGVEYXRhLCBhY3RpdmVTdGF0ZXMuaW5jbHVkZXMobmFtZSkpO1xyXG5cdFx0XHREQVRBLnN0YXRlcy5zZXQobmFtZSwgc3RhdGVPYmopO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gPT09PT0gbG9hZCB0YWJzIHBvc2l0aW9ucyA9PT09PVxyXG5cclxuXHRcdGNvbnN0IHRhYlBvc2l0aW9uczoge1trZXk6IHN0cmluZ106IG51bWJlcn0gPSBVdGlscy5nZXRPckRlZmF1bHQoY3VzdG9tRGF0YS50YWJfcG9zaXRpb25zLCBEQVRBLmNvdXJzZUlELCB7fSk7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBbdGFiSWQsIG5hdlRhYl0gb2YgREFUQS5uYXZUYWJzKSB7XHJcblx0XHRcdGlmICh0YWJQb3NpdGlvbnNbdGFiSWRdICE9PSB1bmRlZmluZWQpXHJcblx0XHRcdFx0bmF2VGFiLnNldFBvc2l0aW9uKHRhYlBvc2l0aW9uc1t0YWJJZF0pO1xyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyAgICAgICAgIHJ1biBhbGwgYXN5bmMgdGFza3NcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0Y29uc3QgcHJvbWlzZXMgPSBbY291cnNlVGFiRmxvdygpXTtcclxuXHJcblx0aWYgKERBVEEuY291cnNlUGFnZSAhPT0gbnVsbClcclxuXHRcdHByb21pc2VzLnB1c2gobmF2VGFiRmxvdygpKTtcclxuXHJcblx0aWYgKERBVEEub25NYWluUGFnZSlcclxuXHRcdHByb21pc2VzLnB1c2goYXNzaWdubWVudEZsb3coKSwgbW9kdWxlSXRlbUZsb3coKSk7XHJcblxyXG5cdGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcclxuXHJcblx0Ly8gcnVuIGN1c3RvbSBkYXRhIGZsb3cgYWZ0ZXIgZXZlcnl0aGluZ1xyXG5cdGlmIChEQVRBLm9uTWFpblBhZ2UpIGF3YWl0IGN1c3RvbURhdGFGbG93KCk7XHJcblxyXG5cdHJldHVybiBwZXJmb3JtYW5jZS5ub3coKSAtIGluaXRTdGFydDtcclxuXHJcbn0pKClcclxuLmNhdGNoKChyZWFzb246IEV4Y2VwdGlvbiB8IGFueSkgPT4ge1xyXG5cdC8vIEV4Y2VwdGlvbnMgYXJlIGludGVudGlvbmFsbHkgdGhyb3cgYnkgbXkgY29kZVxyXG5cdGlmIChyZWFzb24gaW5zdGFuY2VvZiBFeGNlcHRpb24pIHtcclxuXHRcdGlmIChyZWFzb24uaXNGYXRhbCkgdGhyb3cgbmV3IEVycm9yKHJlYXNvbi50b1N0cmluZygpKTtcclxuXHRcdGVsc2UgY29uc29sZS53YXJuKFwiRXhjZXB0aW9uIGluIGluaXQ6XCIsIHJlYXNvbi50b1N0cmluZygpKTtcclxuXHR9XHJcblx0ZWxzZSB7IC8vIGFueXRoaW5nIGVsc2UgaXMgdW5rbm93biBhbmQgaXMgYSBwcm9ibGVtXHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGVycm9yIGluIGluaXQ6IFwiICsgcmVhc29uKTtcclxuXHR9XHJcbn0pXHJcbi50aGVuKCh0b3RhbER1cmF0aW9uOiBudW1iZXIpID0+IHtcclxuXHRjb25zb2xlLmRlYnVnKGBJbml0aWFsaXphdGlvbiBjb21wbGV0ZWQgaW4gJHtNYXRoLnJvdW5kKHRvdGFsRHVyYXRpb24pfW1zYCk7XHJcblx0TWFpbi5pbml0UGFnZSgpO1xyXG5cdGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihNYWluLm9uTWVzc2FnZSk7XHJcbn0pO1xyXG5cclxuY2xhc3MgTWFpbiB7XHJcblxyXG5cdHN0YXRpYyBpbml0UGFnZSgpIHtcclxuXHJcblx0XHRQQUdFLmluaXRpYWxpemUoKTtcclxuXHJcblx0XHQkKHdpbmRvdykuc2Nyb2xsKFVJLnVwZGF0ZVNjcm9sbFBvc2l0aW9uKTtcclxuXHRcdCQoZG9jdW1lbnQpLnJlYWR5KFVJLnVwZGF0ZVNjcm9sbFBvc2l0aW9uKTtcclxuXHJcblx0XHQvLyA9PT09PT09PT09PT09PT0gbWlzYyBnbG9iYWwgaW5pdCBzdHVmZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdFx0Ly8gcmVtb3ZpbmcgYWxsIHJlcGVhdGVkIHdoaXRlc3BhY2UgaW4gY2xhc3MgYXR0cmlidXRlc1xyXG5cdFx0JChcIltjbGFzc11cIikuYXR0cihcImNsYXNzXCIsIChpLCBvbGRDbGFzcykgPT4gKG9sZENsYXNzLm1hdGNoKC9cXFMrL2cpIHx8IFtdKS5qb2luKFwiIFwiKSk7XHJcblxyXG5cdFx0Ly8gY2xlYW4gdXAgZ3JhZGUgdGFibGVcclxuXHRcdCQoXCIjZ3JhZGVzX3N1bW1hcnkgdGJvZHlcIilcclxuXHRcdC5maW5kKFwidHIuZ3JvdXBfdG90YWwsIHRyLmZpbmFsX2dyYWRlXCIpXHJcblx0XHQuZmluZChcInRkLnBvaW50c19wb3NzaWJsZVwiKS5hdHRyKFwiY29sc3BhblwiLCBcIjNcIikuY3NzKFwidGV4dC1hbGlnblwiLCBcImNlbnRlclwiKS5lbmQoKVxyXG5cdFx0LmZpbmQoXCJ0ZC5kZXRhaWxzLCB0ZC5zdGF0dXNcIikucmVtb3ZlKCk7XHJcblxyXG5cdFx0Ly8gbWFrZSB0aGUgY291cnNlIGJ1dHRvbiB0YWtlIHlvdSB0byBcImFsbCBjb3Vyc2VzXCIgYW5kIGNoYW5nZSB0aGUgdGV4dCB0byBzYXkgc29cclxuXHRcdGNvbnN0IG9yaWdDb3Vyc2VOYXYgPSAkKFwiI2dsb2JhbF9uYXZfY291cnNlc19saW5rXCIpO1xyXG5cdFx0Y29uc3QgbmV3Q291cnNlTmF2ID0gJChcIjxhPlwiKVxyXG5cdFx0XHQuYXR0cihcImhyZWZcIiwgXCIvY291cnNlc1wiKVxyXG5cdFx0XHQuYWRkQ2xhc3MoXCJpYy1hcHAtaGVhZGVyX19tZW51LWxpc3QtbGlua1wiKVxyXG5cdFx0XHQuaHRtbChvcmlnQ291cnNlTmF2LnByb3AoXCJpbm5lckhUTUxcIikpO1xyXG5cclxuXHRcdGNvbnN0IGNvdXJzZU5hdkxpID0gb3JpZ0NvdXJzZU5hdi5wYXJlbnQoKTtcclxuXHRcdG9yaWdDb3Vyc2VOYXYucmVtb3ZlKCk7XHJcblx0XHRjb3Vyc2VOYXZMaVxyXG5cdFx0XHQuYXBwZW5kKG5ld0NvdXJzZU5hdilcclxuXHRcdFx0LmZpbmQoXCIubWVudS1pdGVtX190ZXh0XCIpXHJcblx0XHRcdC50ZXh0KFwiQWxsIENvdXJzZXNcIik7XHJcblxyXG5cdFx0Ly8gPT09IGluc2VydCBjb3Vyc2UgbGlua3MgPT09XHJcblxyXG5cdFx0Y29uc3QgJGluc2VydGlvblBvaW50ID0gUEFHRS5zaWRlYmFyLmNoaWxkcmVuKCkuZXEoMik7XHJcblx0XHRmb3IgKGNvbnN0IFt0YWJJRCwgY291cnNlVGFiXSBvZiBEQVRBLmNvdXJzZVRhYnMpIHtcclxuXHRcdFx0JGluc2VydGlvblBvaW50LmFmdGVyKFxyXG5cdFx0XHRcdFV0aWxzLmZvcm1hdChWLmVsZW1lbnQuY291cnNlX2xpbmssIHtcclxuXHRcdFx0XHRcdHRhYkNvbG9yOiBjb3Vyc2VUYWIuY29sb3IsXHJcblx0XHRcdFx0XHR0YWJJRCxcclxuXHRcdFx0XHRcdG5hbWU6IGNvdXJzZVRhYi5uYW1lLFxyXG5cdFx0XHRcdFx0Y29kZTogY291cnNlVGFiLmNvZGVcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vID09PSBwbGFjZSBcImp1bXAgdG8gdG9wXCIgYnV0dG9uID09PVxyXG5cclxuXHRcdERBVEEuZWxlbWVudHMuanVtcF9idXR0b24gPVxyXG5cdFx0XHQkKFYuZWxlbWVudC5qdW1wX2J1dHRvbilcclxuXHRcdFx0LmZpbmQoXCJpXCIpXHJcblx0XHRcdC5jbGljaygoKSA9PiB7XHJcblx0XHRcdFx0aWYgKFBBR0Uuc2Nyb2xsaW5nRWxlbWVudC5wcm9wKFwic2Nyb2xsVG9wXCIpID4gMClcclxuXHRcdFx0XHRcdCQoXCJib2R5XCIpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIFYudWkuc2Nyb2xsX3RpbWUpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQuZW5kKClcclxuXHRcdFx0LmFwcGVuZFRvKFBBR0UubWFpbik7XHJcblxyXG5cdFx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgY291cnNlIHBhZ2UgY3V0b2ZmXHJcblx0XHQvLyAgICAgIGV2ZXJ5dGhpbmcgYmVsb3cgdGhpcyBwb2ludCBpcyBmb3IgY291cnNlIHBhZ2VzXHJcblx0XHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHRpZiAoREFUQS5jb3Vyc2VQYWdlID09PSBudWxsKSByZXR1cm47XHJcblxyXG5cdFx0Ly8gPT09PSBjbGVhciB0aGUgYWN0aXZlIG1lbnUgdGFiIHNpbmNlIHdlJ3JlIHVzaW5nIGN1c3RvbSB0YWJzID09PT1cclxuXHJcblx0XHQkKFwidWwjbWVudSA+IGxpXCIpLnJlbW92ZUNsYXNzKFwiaWMtYXBwLWhlYWRlcl9fbWVudS1saXN0LWl0ZW0tLWFjdGl2ZVwiKTtcclxuXHJcblx0XHQvLyA9PT0gbG9hZCBpbml0aWFsIHN0YXRlcyA9PT1cclxuXHJcblx0XHRmb3IgKGNvbnN0IFssIHN0YXRlXSBvZiBEQVRBLnN0YXRlcykge1xyXG5cdFx0XHRpZiAoc3RhdGUuYWN0aXZlICYmIHN0YXRlLm9uUGFnZXMuaW5jbHVkZXMoREFUQS5jb3Vyc2VQYWdlKSlcclxuXHRcdFx0XHRQQUdFLmJvZHkuYWRkQ2xhc3Moc3RhdGUuYm9keUNsYXNzKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyA9PT09IGFwcGx5IGNvdXJzZSBjb2xvciB0byBicmFuZCBjb2xvcnMgPT09PVxyXG5cclxuXHRcdGlmIChEQVRBLmNvdXJzZVRhYnMuaGFzKERBVEEuY291cnNlSUQpKSB7XHJcblx0XHRcdGNvbnN0IGNvbG9yID0gREFUQS5jb3Vyc2VUYWJzLmdldChEQVRBLmNvdXJzZUlEKS5jb2xvcjtcclxuXHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwiLS1pYy1icmFuZC1wcmltYXJ5XCIsIGNvbG9yKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyA9PT09IGNsZWFyIGVtcHR5IG5hdiB0YWJzID09PVxyXG5cclxuXHRcdCQoVi5jYW52YXMuc2VsZWN0b3IubmF2X3RhYnMpLmZpbmQoXCJsaTplbXB0eVwiKS5yZW1vdmUoKTtcclxuXHJcblx0XHQvLyA9PT09IGFwcGx5IHRoZSBjdXN0b20gbmF2IHRhYiBwb3NpdGlvbnMgPT09XHJcblxyXG5cdFx0QXJyYXkuZnJvbShEQVRBLm5hdlRhYnMudmFsdWVzKCkpLmZpbHRlcih0YWIgPT4gdGFiLmhhc0N1c3RvbVBvc2l0aW9uKVxyXG5cdFx0XHQuc29ydCgodGFiQSwgdGFiQikgPT4gdGFiQS5wb3NpdGlvbiAtIHRhYkIucG9zaXRpb24pXHJcblx0XHRcdC5mb3JFYWNoKFVJLnVwZGF0ZU5hdlRhYlBvc2l0aW9uKTtcclxuXHJcblx0XHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgbWFpbiBwYWdlIGN1dG9mZlxyXG5cdFx0Ly8gIGV2ZXJ5dGhpbmcgYmVsb3cgdGhpcyBpcyBvbmx5IGZvciBtb2R1bGVzL2dyYWRlcyBwYWdlc1xyXG5cdFx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0aWYgKCFEQVRBLm9uTWFpblBhZ2UpIHJldHVybjtcclxuXHJcblx0XHQvLyA9PT0gcGxhY2UgY2hlY2tib3hlcyAmIGhpZGUgYnV0dG9ucyA9PT1cclxuXHJcblx0XHRmb3IgKGNvbnN0IFtpdGVtSWQsIGl0ZW1dIG9mIERBVEEubW9kdWxlSXRlbXMpIHtcclxuXHJcblx0XHRcdGNvbnN0IG1haW5FbCA9ICQoXCIjXCIgKyBpdGVtLmNhbnZhc0VsZW1lbnRJZCk7XHJcblx0XHRcdGxldCBwYXJlbnRFbDogSlF1ZXJ5O1xyXG5cdFx0XHRsZXQgaGFzQ2hlY2tib3g6IGJvb2xlYW47XHJcblx0XHRcdGxldCBoYXNIaWRlQnV0dG9uOiBib29sZWFuO1xyXG5cclxuXHRcdFx0aXRlbS5jaGVja2JveEVsZW1lbnQgPSBudWxsO1xyXG5cdFx0XHRpdGVtLmhpZGVFbGVtZW50ID0gbnVsbDtcclxuXHJcblx0XHRcdGlmIChEQVRBLmNvdXJzZVBhZ2UgPT09IENhbnZhc1BhZ2UuTU9EVUxFUykge1xyXG5cdFx0XHRcdHBhcmVudEVsID0gbWFpbkVsLmZpbmQoXCJkaXYuaWctcm93XCIpO1xyXG5cclxuXHRcdFx0XHRoYXNIaWRlQnV0dG9uID0gdHJ1ZTtcclxuXHRcdFx0XHRoYXNDaGVja2JveCA9ICFpdGVtLmlzU3ViSGVhZGVyO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKERBVEEuY291cnNlUGFnZSA9PT0gQ2FudmFzUGFnZS5HUkFERVMpIHtcclxuXHRcdFx0XHRwYXJlbnRFbCA9ICQoXCI8dGQ+XCIpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoVi5jc3NDbGFzcy5jaGVja2JveF90ZClcclxuXHRcdFx0XHRcdC5wcmVwZW5kVG8obWFpbkVsKTtcclxuXHJcblx0XHRcdFx0aGFzSGlkZUJ1dHRvbiA9IGZhbHNlO1xyXG5cdFx0XHRcdGhhc0NoZWNrYm94ID0gaXRlbS5pc0dyYWRlZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGhhc0NoZWNrYm94KSB7XHJcblx0XHRcdFx0aXRlbS5jaGVja2JveEVsZW1lbnQgPVxyXG5cdFx0XHRcdFx0JChVdGlscy5mb3JtYXQoVi5lbGVtZW50LmNoZWNrYm94LCB7aXRlbV9pZDogaXRlbUlkfSkpLmFwcGVuZFRvKHBhcmVudEVsKTtcclxuXHJcblx0XHRcdFx0VUkudXBkYXRlQ2hlY2tib3goaXRlbSk7XHJcblx0XHRcdFx0aXRlbS5jaGVja2JveEVsZW1lbnQuc2hvdygpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChoYXNIaWRlQnV0dG9uKSB7XHJcblx0XHRcdFx0aXRlbS5oaWRlRWxlbWVudCA9XHJcblx0XHRcdFx0XHQkKFV0aWxzLmZvcm1hdChWLmVsZW1lbnQuaGlkZV9idXR0b24sIHtpdGVtX2lkOiBpdGVtSWR9KSkuYXBwZW5kVG8ocGFyZW50RWwpO1xyXG5cclxuXHRcdFx0XHQvLyB0aGlzIGZ1bmN0aW9uIGlzIGFzeW5jLCBidXQgd2l0aCBzZWNvbmQgYXJndW1lbnQgJ3RydWUnLCBpdCB1cGRhdGVzIGluc3RhbnRseVxyXG5cdFx0XHRcdFVJLnVwZGF0ZUl0ZW1IaWRlKGl0ZW0sIHRydWUpO1xyXG5cdFx0XHRcdGl0ZW0uaGlkZUVsZW1lbnQuc2hvdygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vID09PSBmaXggZ3JhZGUgY2hlY2tib3hlcyBzaW5jZSB0aGV5J3JlIGluIHRoZSB0YWJsZSA9PT1cclxuXHRcdGlmIChEQVRBLmNvdXJzZVBhZ2UgPT09IENhbnZhc1BhZ2UuR1JBREVTKSB7XHJcblx0XHRcdFBBR0UuZ3JhZGVzXHJcblx0XHRcdFx0LmZpbmQoXCJ0ZFtjb2xzcGFuPSc1J11cIilcclxuXHRcdFx0XHQuYXR0cihcImNvbHNwYW5cIiwgNilcclxuXHRcdFx0XHQuZW5kKCkuZmluZChcIj4gdGhlYWQgPiB0clwiKVxyXG5cdFx0XHRcdC5wcmVwZW5kKCQoXCI8dGg+XCIpXHJcblx0XHRcdFx0XHQuYXR0cihcInNjb3BlXCIsIFwiY29sXCIpXHJcblx0XHRcdFx0XHQuYXBwZW5kKFwiPGkgY2xhc3M9J2ljb24tY2hlY2snPjwvaT5cIilcclxuXHRcdFx0XHQpXHJcblx0XHRcdFx0LmVuZCgpLmZpbmQoXCJ0ci5zdHVkZW50X2Fzc2lnbm1lbnRcIilcclxuXHRcdFx0XHQucHJlcGVuZChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHJldHVybiAkKHRoaXMpLmhhcyhcInRkOmZpcnN0LWNoaWxkXCIpLmxlbmd0aCA9PT0gMCA/XHJcblx0XHRcdFx0XHRcdCQoXCI8dGQ+XCIpLmFkZENsYXNzKFYuY3NzQ2xhc3MuY2hlY2tib3hfdGQpIDogdW5kZWZpbmVkO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vID09PSBhZGQgY2hhbmdlIGV2ZW50IGZvciBjaGVja2JveGVzID09PVxyXG5cclxuXHRcdFBBR0UubWFpbi5vbihcImNoYW5nZVwiLCBgLiR7Vi5jc3NDbGFzcy5jaGVja2JveF9wYXJlbnR9ID4gaW5wdXRgLCBhc3luYyBmdW5jdGlvbigpIHtcclxuXHRcdFx0YXdhaXQgTWFpbi5vbkNoZWNrYm94Q2hhbmdlKHRoaXMgYXMgSFRNTElucHV0RWxlbWVudCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXMgcGFnZSBjdXRvZmZcclxuXHRcdC8vICAgICAgICBldmVyeXRoaW5nIGJlbG93IGhlcmUgaXMgb25seSBvbiB0aGUgbW9kdWxlcyBwYWdlXHJcblx0XHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHRpZiAoREFUQS5jb3Vyc2VQYWdlICE9PSBDYW52YXNQYWdlLk1PRFVMRVMpIHJldHVybjtcclxuXHJcblx0XHQvLyA9PT0gY2xlYW4gdXAgZW1wdHkgbW9kdWxlcyA9PT1cclxuXHRcdCQoVi5jYW52YXMuc2VsZWN0b3IubW9kdWxlX2l0ZW1zKS5maWx0ZXIoKGksIGVsKSA9PiAhZWwuaW5uZXJIVE1MLnRyaW0oKS5sZW5ndGgpLmh0bWwoXCJcIik7XHJcblxyXG5cdFx0Ly8gPT09IHNldCBjdXN0b20gaW5kZW50IGxldmVsID09PVxyXG5cdFx0Y29uc3QgZGlzYWJsZWRJbmRlbnQgPSBEQVRBLnN0YXRlcy5nZXQoXCJkaXNhYmxlX2luZGVudF9vdmVycmlkZVwiKS5hY3RpdmU7XHJcblxyXG5cdFx0JChWLmNhbnZhcy5zZWxlY3Rvci5tb2R1bGVfaXRlbSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29uc3QgZGVmSW5kZW50ID1cclxuXHRcdFx0XHRbMCwxLDIsMyw0LDVdLmZpbHRlcihsZXZlbCA9PiAkKHRoaXMpLmhhc0NsYXNzKFwiaW5kZW50X1wiICsgbGV2ZWwpKVswXTtcclxuXHRcdFx0JCh0aGlzKS5hdHRyKFYuZGF0YUF0dHIuZGVmX2luZGVudCwgZGVmSW5kZW50KTtcclxuXHRcdFx0aWYgKCFkaXNhYmxlZEluZGVudClcclxuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiaW5kZW50X1wiICsgZGVmSW5kZW50KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICghZGlzYWJsZWRJbmRlbnQpIHtcclxuXHRcdFx0JChWLmNhbnZhcy5zZWxlY3Rvci5zdWJoZWFkZXIpLmFkZENsYXNzKFwiaW5kZW50X1wiICsgVi51aS5zdWJoZWFkZXJfaW5kZW50KTtcclxuXHRcdFx0JChWLmNhbnZhcy5zZWxlY3Rvci5ub3Rfc3ViaGVhZGVyKS5hZGRDbGFzcyhcImluZGVudF9cIiArIFYudWkubWFpbl9pbmRlbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vID09PSBwbGFjZSBhbmQgcG9wdWxhdGUgdGhlIHRhYmxlIG9mIGNvbnRlbnRzID09PVxyXG5cclxuXHRcdGNvbnN0IHRvYyA9ICQoVi5lbGVtZW50LnRvYyk7XHJcblx0XHRjb25zdCB1bCA9IHRvYy5maW5kKFwidWxcIik7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBbbW9kSWQsIG1vZF0gb2YgREFUQS5tb2R1bGVzKSB7XHJcblxyXG5cdFx0XHRjb25zdCBmb3JtYXR0ZWQgPSBVdGlscy5mb3JtYXQoVi5lbGVtZW50LnRvY19pdGVtLCB7aXRlbV9uYW1lOiBtb2QubmFtZSwgaXRlbV9pZDogbW9kSWR9KTtcclxuXHRcdFx0JChmb3JtYXR0ZWQpXHJcblx0XHRcdFx0LmZpbmQoXCJhXCIpXHJcblx0XHRcdFx0LmNsaWNrKGUgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc3QgbW9kdWxlRWwgPSAkKFwiI2NvbnRleHRfbW9kdWxlX1wiICsgbW9kSWQpO1xyXG5cdFx0XHRcdFx0VUkuc2Nyb2xsVG9FbGVtZW50KG1vZHVsZUVsKTtcclxuXHJcblx0XHRcdFx0XHRpZiAobW9kdWxlRWwuaGFzQ2xhc3MoXCJjb2xsYXBzZWRfbW9kdWxlXCIpKVxyXG5cdFx0XHRcdFx0XHRtb2R1bGVFbC5maW5kKFwiLmV4cGFuZF9tb2R1bGVfbGlua1wiKS5jbGljaygpO1xyXG5cclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5lbmQoKVxyXG5cdFx0XHRcdC5hcHBlbmRUbyh1bCk7XHJcblx0XHR9XHJcblxyXG5cdFx0REFUQS5lbGVtZW50cy50b2MgPSB0b2NcclxuXHRcdFx0LmNzcyhcInRvcFwiLCBQQUdFLmxlZnQuaGVpZ2h0KCkgKyBWLnVpLnRvY190b3BfbWFyZ2luKVxyXG5cdFx0XHQuYXBwZW5kVG8oUEFHRS5tYWluKVxyXG5cdFx0XHQuZGF0YShcImN1dG9mZlwiLCB0b2Mub2Zmc2V0KCkudG9wIC0gVi51aS50b2NfdG9wX21hcmdpbik7XHJcblxyXG5cdFx0QXJyYXkuZnJvbShEQVRBLm1vZHVsZXMudmFsdWVzKCkpLmZvckVhY2goVUkudXBkYXRlTW9kdWxlKTtcclxuXHJcblx0XHQvLyA9PT0gYWRkIGNsaWNrIGV2ZW50IGZvciBoaWRlIGJ1dHRvbnMgPT09XHJcblxyXG5cdFx0UEFHRS5tYWluLm9uKFwiY2xpY2tcIiwgYC4ke1YuY3NzQ2xhc3MuaGlkZV9idXR0b259ID4gaWAsIGFzeW5jIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRhd2FpdCBNYWluLm9uSGlkZUJ1dHRvbkNsaWNrKCQodGhpcykpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gPT09IGFkZCBidXR0b25zIHRvIEZJTEUgYW5kIEVYVEVSTkFMX1VSTCBpdGVtcyA9PT1cclxuXHJcblx0XHRmb3IgKGNvbnN0IFssIGl0ZW1dIG9mIERBVEEubW9kdWxlSXRlbXMpIHtcclxuXHJcblx0XHRcdGlmIChpdGVtLnR5cGUgPT09IE1vZHVsZUl0ZW1UeXBlLkZJTEUpIHtcclxuXHRcdFx0XHRjb25zdCBlbGVtZW50ID0gVXRpbHMuZm9ybWF0KFYuZWxlbWVudC5kb3dubG9hZF9idXR0b24sIHtcclxuXHRcdFx0XHRcdGZpbGVfdXJsOiBpdGVtLmZpbGVEYXRhLnVybCxcclxuXHRcdFx0XHRcdGZpbGVuYW1lOiBpdGVtLmZpbGVEYXRhLmRpc3BsYXlfbmFtZVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdCQoZWxlbWVudCkuaW5zZXJ0QmVmb3JlKGl0ZW0uY2hlY2tib3hFbGVtZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChpdGVtLnR5cGUgPT09IE1vZHVsZUl0ZW1UeXBlLkVYVEVSTkFMX1VSTCkge1xyXG5cdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBVdGlscy5mb3JtYXQoVi5lbGVtZW50LnVybF9idXR0b24sIHtcclxuXHRcdFx0XHRcdGV4dGVybmFsX3VybDogaXRlbS5leHRlcm5hbFVybFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdCQoZWxlbWVudCkuaW5zZXJ0QmVmb3JlKGl0ZW0uY2hlY2tib3hFbGVtZW50KTtcclxuXHJcblx0XHRcdFx0JChcIiNcIiArIGl0ZW0uY2FudmFzRWxlbWVudElkKS5maW5kKFwiYS5leHRlcm5hbF91cmxfbGluay50aXRsZVwiKVxyXG5cdFx0XHRcdFx0LmF0dHIoXCJocmVmXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gJCh0aGlzKS5hdHRyKFwiZGF0YS1pdGVtLWhyZWZcIik7IH0pXHJcblx0XHRcdFx0XHQucmVtb3ZlQXR0cihcInRhcmdldCByZWxcIilcclxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcyhcImV4dGVybmFsXCIpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoXCJpZy10aXRsZVwiKVxyXG5cdFx0XHRcdFx0LmZpbmQoXCIudWktaWNvblwiKS5yZW1vdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdCQoXCIuXCIgKyBWLmNzc0NsYXNzLmRvd25sb2FkKS5hZGQoXCIuXCIgKyBWLmNzc0NsYXNzLmV4dGVybmFsX3VybCkuc2hvdygpO1xyXG5cclxuXHR9IC8vIGVuZCBpbml0UGFnZVxyXG5cclxuXHRzdGF0aWMgZ2V0U3RhdGUoc3RhdGVOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdGlmIChEQVRBLnN0YXRlcy5oYXMoc3RhdGVOYW1lKSkge1xyXG5cdFx0XHRjb25zdCBzdGF0ZSA9IERBVEEuc3RhdGVzLmdldChzdGF0ZU5hbWUpO1xyXG5cdFx0XHRyZXR1cm4gc3RhdGUuYWN0aXZlO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHNldFN0YXRlKHN0YXRlTmFtZTogc3RyaW5nLCBzdGF0ZTogYm9vbGVhbikge1xyXG5cdFx0aWYgKCFEQVRBLnN0YXRlcy5oYXMoc3RhdGVOYW1lKSkgcmV0dXJuO1xyXG5cclxuXHRcdGNvbnN0IHN0YXRlT2JqID0gREFUQS5zdGF0ZXMuZ2V0KHN0YXRlTmFtZSk7XHJcblxyXG5cdFx0aWYgKCFzdGF0ZU9iai5vblBhZ2VzLmluY2x1ZGVzKERBVEEuY291cnNlUGFnZSkpIHJldHVybjtcclxuXHJcblx0XHRpZiAoc3RhdGVPYmouYm9keUNsYXNzKVxyXG5cdFx0XHRQQUdFLmJvZHkudG9nZ2xlQ2xhc3Moc3RhdGVPYmouYm9keUNsYXNzLCBzdGF0ZSk7XHJcblxyXG5cdFx0c3RhdGVPYmouYWN0aXZlID0gc3RhdGU7XHJcblx0XHRzdGF0ZU9iai5vbkNoYW5nZShzdGF0ZSwgViwgUEFHRS5ib2R5KTtcclxuXHJcblx0XHRjb25zdCB1cmwgPSBVdGlscy5mb3JtYXQoVi5jYW52YXMuYXBpLnVybHMuY3VzdG9tX2RhdGEsIHtkYXRhUGF0aDogXCIvYWN0aXZlX3N0YXRlc1wifSk7XHJcblx0XHRyZXR1cm4gVXRpbHMuZWRpdERhdGFBcnJheSh1cmwsIHN0YXRlLCBbc3RhdGVOYW1lXSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgc2V0TmF2VGFiUG9zaXRpb24odGFiOiBOYXZUYWIsIHBvc2l0aW9uOiBudW1iZXIpIHtcclxuXHJcblx0XHRjb25zdCB1cmwgPSBVdGlscy5mb3JtYXQoVi5jYW52YXMuYXBpLnVybHMuY3VzdG9tX2RhdGEsIHtcclxuXHRcdFx0ZGF0YVBhdGg6IFtcIlwiLCBWLmNhbnZhcy5hcGkuZGF0YV91cmxzLnRhYl9wb3NpdGlvbnMsIERBVEEuY291cnNlSUQsIHRhYi5pZF0uam9pbihcIi9cIilcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBVdGlscy5wdXREYXRhKHVybCwgcG9zaXRpb24pO1xyXG5cclxuXHRcdGlmIChzdWNjZXNzKSB7XHJcblx0XHRcdHRhYi5zZXRQb3NpdGlvbihwb3NpdGlvbik7XHJcblx0XHRcdFVJLnVwZGF0ZU5hdlRhYlBvc2l0aW9uKHRhYik7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVGFiIHBvc2l0aW9uIHVwZGF0ZSBmYWlsZWQuXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gZWxlbWVudCBpcyB0aGUgPGlucHV0PlxyXG5cdHN0YXRpYyBhc3luYyBvbkNoZWNrYm94Q2hhbmdlKGVsOiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcblx0XHRjb25zdCBpZCA9IE51bWJlcigkKGVsKS5hdHRyKFYuZGF0YUF0dHIubW9kX2l0ZW1faWQpKTtcclxuXHRcdGNvbnN0IGl0ZW0gPSBEQVRBLm1vZHVsZUl0ZW1zLmdldChpZCk7XHJcblx0XHRjb25zdCBzdGF0dXMgPSBlbC5jaGVja2VkO1xyXG5cdFx0Y29uc3Qgb2xkVGl0bGUgPSBlbC50aXRsZTtcclxuXHJcblx0XHQvLyByZXNldCBiYWNrIHRvIHByZXZpb3VzIHN0YXRlIHRvIGFsbG93IGZvciB2YWxpZGF0aW9uXHJcblx0XHRlbC5jaGVja2VkID0gIXN0YXR1cztcclxuXHJcblx0XHQvLyBiZWZvcmUgdXBkYXRpbmcgXCJpdGVtXCIsIGNoZWNrIGlmIGl0J3MgYWxyZWFkeSB0aGUgc2FtZS4gaWYgc28sIHdlIGhhdmUgYSBkZXN5bmNcclxuXHRcdGlmIChzdGF0dXMgPT09IGl0ZW0uY2hlY2tlZCkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiQ2hlY2tib3ggZGVzeW5jIGF0IGl0ZW1cIiwgaXRlbSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBUT0RPIGNyZWF0ZSBhIGJldHRlciBtZXRob2QgZm9yIHdhaXRpbmctZGlzYWJsZSBmb3IgY2hlY2tib3ggYW5kIGhpZGUgYnV0dG9uXHJcblx0XHQvLyAtIGhhdmUgYSBkaWZmZXJlbnQgY2xhc3MgYXBwbGllZCB0aGF0IHNldHMgdGhlIGN1cnNvciB0byB3YWl0aW5nIG1vZGUgYW5kIGRpbXMgdGhlIGJ1dHRvblxyXG5cclxuXHRcdC8vIGRpc2FibGUgdW50aWwgd2UgY29uZmlybSB3ZSBjYW4gdXBkYXRlIHRoZSBkYXRhXHJcblx0XHRlbC5kaXNhYmxlZCA9IHRydWU7XHJcblx0XHRlbC50aXRsZSA9IFYudG9vbHRpcC53YWl0aW5nO1xyXG5cclxuXHRcdGNvbnN0IHVybCA9IFV0aWxzLmZvcm1hdChWLmNhbnZhcy5hcGkudXJscy5jdXN0b21fZGF0YSwge1xyXG5cdFx0XHRkYXRhUGF0aDogYC8ke1YuY2FudmFzLmFwaS5kYXRhX3VybHMuY29tcGxldGVkX2Fzc2lnbm1lbnRzfS8ke0RBVEEuY291cnNlSUR9YFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc3Qgc3VjY2VzcyA9IGF3YWl0IFV0aWxzLmVkaXREYXRhQXJyYXkodXJsLCBzdGF0dXMsIFtpZF0pO1xyXG5cclxuXHRcdGVsLmRpc2FibGVkID0gZmFsc2U7XHJcblx0XHRlbC50aXRsZSA9IG9sZFRpdGxlO1xyXG5cclxuXHRcdGlmIChzdWNjZXNzKSB7XHJcblx0XHRcdGl0ZW0uY2hlY2tlZCA9IHN0YXR1cztcclxuXHRcdFx0VUkudXBkYXRlTW9kdWxlKGl0ZW0ubW9kdWxlKTtcclxuXHRcdFx0VUkudXBkYXRlQ2hlY2tib3goaXRlbSk7XHJcblx0XHRcdGNvbnNvbGUuZGVidWcoYEl0ZW0gSUQgJHtpZH0gKCR7aXRlbS5uYW1lLnN1YnN0cigwLCAyNSl9Li4uKWAgK1xyXG5cdFx0XHRcdGBoYXMgYmVlbiAke2VsLmNoZWNrZWQgPyBcIlwiIDogXCJ1blwifWNoZWNrZWRgKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvLyBlbGVtZW50IGlzIDxpPlxyXG5cdHN0YXRpYyBhc3luYyBvbkhpZGVCdXR0b25DbGljayhlbDogSlF1ZXJ5KSB7XHJcblx0XHRjb25zdCBpZCA9IE51bWJlcihlbC5hdHRyKFYuZGF0YUF0dHIubW9kX2l0ZW1faWQpKTtcclxuXHRcdGNvbnN0IGl0ZW0gPSBEQVRBLm1vZHVsZUl0ZW1zLmdldChpZCk7XHJcblxyXG5cdFx0Ly8gY2FuY2VsIGhpZGluZyBpZiB0aGUgaXRlbSBpcyBncmFkZWQgb3IgaGFzIGhpZGluZyBtYW51YWxseSBkaXNhYmxlZCBmb3IgYW55IG90aGVyIHJlYXNvblxyXG5cdFx0aWYgKGl0ZW0uaXNHcmFkZWQgfHwgaXRlbS5oaWRlRWxlbWVudC5oYXNDbGFzcyhWLmNzc0NsYXNzLmhpZGVfZGlzYWJsZWQpKSByZXR1cm47XHJcblxyXG5cdFx0Ly8gZGlzYWJsZSB1bnRpbCB1cGRhdGluZyBjb21wbGV0ZS4gdGhpcyBpcyB1bmRvbmUgYnkgdXBkYXRlSGlkZUJ1dHRvbiBsYXRlclxyXG5cdFx0aXRlbS5oaWRlRWxlbWVudFxyXG5cdFx0XHQuYWRkQ2xhc3MoVi5jc3NDbGFzcy5oaWRlX2Rpc2FibGVkKVxyXG5cdFx0XHQuZmluZChcImlcIilcclxuXHRcdFx0LmF0dHIoXCJ0aXRsZVwiLCBWLnRvb2x0aXAud2FpdGluZyk7XHJcblxyXG5cdFx0Y29uc3QgbmV3U3RhdGUgPSAhaXRlbS5oaWRkZW47XHJcblxyXG5cdFx0Y29uc3QgdXJsID0gVXRpbHMuZm9ybWF0KFYuY2FudmFzLmFwaS51cmxzLmN1c3RvbV9kYXRhLCB7XHJcblx0XHRcdGRhdGFQYXRoOiBgLyR7Vi5jYW52YXMuYXBpLmRhdGFfdXJscy5oaWRkZW5fYXNzaWdubWVudHN9LyR7REFUQS5jb3Vyc2VJRH1gXHJcblx0XHR9KTtcclxuXHJcblx0XHRjb25zdCBzdWNjZXNzID0gYXdhaXQgVXRpbHMuZWRpdERhdGFBcnJheSh1cmwsIG5ld1N0YXRlLCBbaWRdKTtcclxuXHJcblx0XHRpZiAoc3VjY2Vzcykge1xyXG5cdFx0XHRpdGVtLmhpZGRlbiA9IG5ld1N0YXRlO1xyXG5cdFx0XHRhd2FpdCBVSS51cGRhdGVJdGVtSGlkZShpdGVtKTtcclxuXHRcdFx0VUkudXBkYXRlTW9kdWxlKGl0ZW0ubW9kdWxlKTtcclxuXHRcdFx0Y29uc29sZS5kZWJ1ZyhgSXRlbSBJRCAke2lkfSAoJHtpdGVtLm5hbWUuc3Vic3RyKDAsIDI1KX0uLi4pIGhhcyBiZWVuICR7aXRlbS5oaWRkZW4gPyBcIlwiIDogXCJ1blwifWhpZGRlbmApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIG9uTWVzc2FnZShkYXRhOiBNZXNzYWdlRGF0YSwgc291cmNlOiBjaHJvbWUucnVudGltZS5NZXNzYWdlU2VuZGVyLCByZXNwb25kRnVuYzogKGRhdGE/OiBhbnkpID0+IHZvaWQpIHtcclxuXHJcblx0XHRpZiAoc291cmNlLmlkICE9PSBEQVRBLmV4dGVuc2lvbklkKSByZXR1cm47XHJcblxyXG5cdFx0aWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuQkFTSUMpIHtcclxuXHJcblx0XHRcdGNvbnN0IHVuY2hlY2tlZCA9IEFycmF5LmZyb20oREFUQS5tb2R1bGVJdGVtcy52YWx1ZXMoKSlcclxuXHRcdFx0XHQuZmlsdGVyKGkgPT4gIWkuY2hlY2tlZCAmJiAhaS5oaWRkZW4gJiYgIWkuaXNTdWJIZWFkZXIpO1xyXG5cclxuXHRcdFx0c3dpdGNoIChkYXRhLmFjdGlvbikge1xyXG5cdFx0XHRcdGNhc2UgXCJwaW5nXCI6XHJcblx0XHRcdFx0XHRyZXNwb25kRnVuYyh7cG9uZzogJC5ub3coKX0pO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBcImNvdW50IHVuY2hlY2tlZFwiOlxyXG5cdFx0XHRcdFx0cmVzcG9uZEZ1bmMoe2NvdW50OiB1bmNoZWNrZWQubGVuZ3RofSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0LypcdGNhc2UgXCJ1cGRhdGUgdG9rZW5cIjpcclxuXHRcdFx0XHRcdFV0aWxzLmxvYWRUb2tlbihyZXNwb25kRnVuYyk7XHJcblx0XHRcdFx0XHRicmVhazsqL1xyXG5cdFx0XHRcdGNhc2UgXCJqdW1wIHRvIGZpcnN0IHVuY2hlY2tlZFwiOlxyXG5cdFx0XHRcdFx0Y29uc3QgdW5jaGVja2VkRWxzID0gdW5jaGVja2VkXHJcblx0XHRcdFx0XHRcdC5tYXAoaSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpLmNhbnZhc0VsZW1lbnRJZCkpO1xyXG5cdFx0XHRcdFx0VUkuc2Nyb2xsVG9FbGVtZW50KCQodW5jaGVja2VkRWxzKS5maXJzdCgpKTtcclxuXHRcdFx0XHRcdHJlc3BvbmRGdW5jKCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFwiVW5rbm93biBiYXNpYyBtZXNzYWdlIGluIGNvbnRlbnQgc2NyaXB0OlwiLCBkYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5TVEFURSkge1xyXG5cdFx0XHRjb25zdCBzdGF0ZURhdGEgPSBkYXRhIGFzIFN0YXRlTWVzc2FnZURhdGE7XHJcblx0XHRcdGlmIChkYXRhLmFjdGlvbiA9PT0gXCJnZXRcIikge1xyXG5cdFx0XHRcdGNvbnN0IHN0YXRlID0gTWFpbi5nZXRTdGF0ZShzdGF0ZURhdGEuc3RhdGVOYW1lKTtcclxuXHRcdFx0XHRyZXNwb25kRnVuYyh7c3RhdGV9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChkYXRhLmFjdGlvbiA9PT0gXCJzZXRcIikge1xyXG5cdFx0XHRcdE1haW4uc2V0U3RhdGUoc3RhdGVEYXRhLnN0YXRlTmFtZSwgc3RhdGVEYXRhLnN0YXRlKS50aGVuKHN1Y2Nlc3MgPT4ge1xyXG5cdFx0XHRcdFx0cmVzcG9uZEZ1bmMoc3VjY2Vzcyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7IC8vIHRoaXMgdGVsbHMgY2hyb21lIHRoYXQgd2Ugd2FudCB0aGlzIHJlc3BvbnNlIHRvIGJlIGFzeW5jXHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiVW5rbm93biBzdGF0ZSBtZXNzYWdlIGluIGNvbnRlbnQgc2NyaXB0OlwiLCBkYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUud2FybihcIlVua25vd24gbWVzc2FnZSBpbiBjb250ZW50IHNjcmlwdDpcIiwgZGF0YSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBVSSB7XHJcblxyXG5cdHN0YXRpYyB1cGRhdGVDaGVja2JveChpdGVtOiBNb2R1bGVJdGVtKSB7XHJcblx0XHRpZiAoaXRlbS5jaGVja2JveEVsZW1lbnQgPT09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIk5vIGNoZWNrYm94IHRvIHVwZGF0ZVwiKTtcclxuXHRcdGl0ZW0uY2hlY2tib3hFbGVtZW50XHJcblx0XHRcdC5maW5kKFwiaW5wdXRcIilcclxuXHRcdFx0LnByb3AoXCJjaGVja2VkXCIsIGl0ZW0uY2hlY2tlZClcclxuXHRcdFx0LmF0dHIoXCJ0aXRsZVwiLCBpdGVtLmNoZWNrZWQgPyBWLnRvb2x0aXAubWFya19pbmNvbXBsZXRlIDogVi50b29sdGlwLm1hcmtfY29tcGxldGUpXHJcblx0XHRcdC5jbG9zZXN0KFYuY2FudmFzLnNlbGVjdG9yLm1vZHVsZV9pdGVtKVxyXG5cdFx0XHQudG9nZ2xlQ2xhc3MoVi5jc3NDbGFzcy5jaGVja2JveF9jaGVja2VkLCBpdGVtLmNoZWNrZWQpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHVwZGF0ZUl0ZW1IaWRlKGl0ZW06IE1vZHVsZUl0ZW0sIGluc3RhbnQ/OiBib29sZWFuKSB7XHJcblx0XHRpZiAoaXRlbS5oaWRlRWxlbWVudCA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKFwiTm8gaGlkZSBidXR0b24gdG8gdXBkYXRlXCIpO1xyXG5cclxuXHRcdGNvbnN0IG1vZEl0ZW1FbCA9IGl0ZW0uaGlkZUVsZW1lbnQuY2xvc2VzdChWLmNhbnZhcy5zZWxlY3Rvci5tb2R1bGVfaXRlbSk7XHJcblx0XHRjb25zdCBpRWwgPSBpdGVtLmhpZGVFbGVtZW50LmZpbmQoXCJpXCIpO1xyXG5cclxuXHRcdC8vIHVwZGF0ZSBoaWRkZW4gY2xhc3Mgb24gdGhlIDxpPiBhbmQgPGxpPlxyXG5cdFx0aUVsLmFkZChtb2RJdGVtRWwpLnRvZ2dsZUNsYXNzKFYuY3NzQ2xhc3MuaXRlbV9oaWRkZW4sIGl0ZW0uaGlkZGVuKTtcclxuXHJcblx0XHRpZiAoIWluc3RhbnQpIGF3YWl0IFV0aWxzLndhaXQoVi51aS5mYWRlX3RpbWUpO1xyXG5cclxuXHRcdC8vIHVwZGF0ZSBkaXNhYmxlIHN0YXR1cyBhbmQgdGl0bGUsIHVuZG9pbmcgd2FpdGluZy1kaXNhYmxlXHJcblx0XHRpdGVtLmhpZGVFbGVtZW50LnRvZ2dsZUNsYXNzKFYuY3NzQ2xhc3MuaGlkZV9kaXNhYmxlZCwgaXRlbS5pc0dyYWRlZCk7XHJcblx0XHRpRWwuYXR0cihcInRpdGxlXCIsIGl0ZW0uaXNHcmFkZWQgPyBWLnRvb2x0aXAuaGlkZV9kaXNhYmxlZCA6IGl0ZW0uaGlkZGVuID8gVi50b29sdGlwLnVuaGlkZSA6IFYudG9vbHRpcC5oaWRlKTtcclxuXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgdXBkYXRlTW9kdWxlKG1vZHVsZTogTW9kdWxlKSB7XHJcblxyXG5cdFx0aWYgKERBVEEuZWxlbWVudHMudG9jICE9PSBudWxsKSB7XHJcblx0XHRcdGNvbnN0IGFsbEl0ZW1zID0gbW9kdWxlLml0ZW1zLmZpbHRlcihpID0+ICFpLmlzU3ViSGVhZGVyICYmICFpLmhpZGRlbik7XHJcblx0XHRcdGNvbnN0IHRvdGFsSXRlbXMgPSBhbGxJdGVtcy5sZW5ndGg7XHJcblxyXG5cdFx0XHRsZXQgY2hlY2tlZEl0ZW1zOiBudW1iZXI7XHJcblx0XHRcdGxldCBwZXJjZW50OiBudW1iZXI7XHJcblxyXG5cdFx0XHRpZiAodG90YWxJdGVtcyA+IDApIHtcclxuXHRcdFx0XHRjaGVja2VkSXRlbXMgPSBhbGxJdGVtcy5maWx0ZXIoaSA9PiBpLmNoZWNrZWQpLmxlbmd0aDtcclxuXHRcdFx0XHRwZXJjZW50ID0gTWF0aC5yb3VuZChjaGVja2VkSXRlbXMgLyB0b3RhbEl0ZW1zICogMTAwKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRjaGVja2VkSXRlbXMgPSAwO1xyXG5cdFx0XHRcdHBlcmNlbnQgPSAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zdCBiYWNrZ3JvdW5kSW1hZ2UgPSBVdGlscy5mb3JtYXQoVi5taXNjLnRvY19iYWNrZ3JvdW5kLCB7cGVyY2VudH0pO1xyXG5cclxuXHRcdFx0REFUQS5lbGVtZW50cy50b2NcclxuXHRcdFx0XHQuZmluZChgWyR7Vi5kYXRhQXR0ci50b2NfbW9kdWxlX2lkfT0nJHttb2R1bGUuaWR9J11gKVxyXG5cdFx0XHRcdC5hdHRyKFYuZGF0YUF0dHIudG9jX3RvdGFsLCB0b3RhbEl0ZW1zKVxyXG5cdFx0XHRcdC5hdHRyKFYuZGF0YUF0dHIudG9jX2NoZWNrZWRfY291bnQsIGNoZWNrZWRJdGVtcylcclxuXHRcdFx0XHQuYXR0cihWLmRhdGFBdHRyLnRvY19wZXJjZW50YWdlLCBwZXJjZW50KVxyXG5cdFx0XHRcdC5jbG9zZXN0KFwibGlcIilcclxuXHRcdFx0XHQudG9nZ2xlQ2xhc3MoVi5jc3NDbGFzcy5pdGVtX2hpZGRlbiwgdG90YWxJdGVtcyA9PT0gMClcclxuXHRcdFx0XHQuY3NzKHtiYWNrZ3JvdW5kSW1hZ2V9KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBpZiBubyB2aXNpYmxlIGl0ZW1zIGluIHRoaXMgbW9kdWxlLCBoaWRlIHRoZSBlbnRpcmUgbW9kdWxlXHJcblx0XHRjb25zdCBub0l0ZW1zID0gbW9kdWxlLml0ZW1zLmZpbHRlcihpID0+ICFpLmlzU3ViSGVhZGVyICYmICFpLmhpZGRlbikubGVuZ3RoID09PSAwO1xyXG5cdFx0JChcIiNjb250ZXh0X21vZHVsZV9cIiArIG1vZHVsZS5pZCkudG9nZ2xlQ2xhc3MoVi5jc3NDbGFzcy5pdGVtX2hpZGRlbiwgbm9JdGVtcyk7XHJcblxyXG5cdH1cclxuXHJcblx0c3RhdGljIHVwZGF0ZU5hdlRhYlBvc2l0aW9uKHRhYjogTmF2VGFiKSB7XHJcblxyXG5cdFx0aWYgKCF0YWIuaGFzQ3VzdG9tUG9zaXRpb24pIHRocm93IG5ldyBFcnJvcihcIlRhYiBoYXMgbm8gY3VzdG9tIHBvc2l0aW9uXCIpO1xyXG5cclxuXHRcdGNvbnN0IHRhYkxpc3QgPSAkKFYuY2FudmFzLnNlbGVjdG9yLm5hdl90YWJzKTtcclxuXHRcdGNvbnN0IHRhYkVsID0gdGFiTGlzdC5maW5kKFwiYS5cIiArIHRhYi5pZCkucGFyZW50KCk7XHJcblxyXG5cdFx0aWYgKHRhYi5oaWRkZW4pXHJcblx0XHRcdHRhYkVsLmhpZGUoKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGFiRWwuc2hvdygpLmRldGFjaCgpLmluc2VydEJlZm9yZSh0YWJMaXN0LmNoaWxkcmVuKCkuZXEodGFiLnBvc2l0aW9uIC0gMSkpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHVwZGF0ZVNjcm9sbFBvc2l0aW9uKCkge1xyXG5cdFx0Y29uc3Qgc2Nyb2xsVG9wID0gUEFHRS5zY3JvbGxpbmdFbGVtZW50LnByb3AoXCJzY3JvbGxUb3BcIik7XHJcblxyXG5cdFx0aWYgKERBVEEuZWxlbWVudHMudG9jICE9PSBudWxsKSB7XHJcblx0XHRcdERBVEEuZWxlbWVudHMudG9jXHJcblx0XHRcdFx0LnRvZ2dsZUNsYXNzKFYuY3NzQ2xhc3MuZml4ZWQsIHNjcm9sbFRvcCA+IERBVEEuZWxlbWVudHMudG9jLmRhdGEoXCJjdXRvZmZcIikpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChEQVRBLmVsZW1lbnRzLmp1bXBfYnV0dG9uICE9PSBudWxsKSB7XHJcblx0XHRcdERBVEEuZWxlbWVudHMuanVtcF9idXR0b25cclxuXHRcdFx0XHQudG9nZ2xlQ2xhc3MoVi5jc3NDbGFzcy5hY3RpdmUsIHNjcm9sbFRvcCA+IFYudWkuanVtcF90b3BfY3V0b2ZmKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgc2Nyb2xsVG9FbGVtZW50KGVsZW1lbnQ6IEpRdWVyeSkge1xyXG5cdFx0Y29uc3QgZWxSZWN0ID0gZWxlbWVudFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdGNvbnN0IGNsaUhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblx0XHRjb25zdCB0b3BSYXRpbyA9IFYudWkudG9wX2luc2lkZV9yYXRpbztcclxuXHJcblx0XHQvLyBpZiBlbGVtZW50IGlzIGluIHZpZXdwb3J0LCBqdXN0IGZsYXNoIGl0XHJcblx0XHQvKlx0aW4gdmlld3BvcnQgaWYuLi5cclxuXHRcdCBoZWlnaHQgaXMgc2hvcnRlciB0aGFuIHZpZXdwb3J0IGFuZCBib3RoIHRvcCBhbmQgYm90dG9tIGFyZSBpbnNpZGUgT1JcclxuXHRcdCBoZWlnaHQgaXMgdGFsbGVyIHRoYW4gdmlld3BvcnQgYW5kIHRvcCBpcyB3aXRoaW4gdG9wIHBhcnQgb2YgcGFnZVxyXG5cdFx0ICovXHJcblx0XHRpZiAoKGVsUmVjdC5oZWlnaHQgPCBjbGlIZWlnaHQgJiYgZWxSZWN0LnRvcCA+PSAwICYmIGVsUmVjdC5ib3R0b20gPCBjbGlIZWlnaHQpIHx8XHJcblx0XHRcdChlbFJlY3QudG9wID49IDAgJiYgZWxSZWN0LnRvcCA8PSBjbGlIZWlnaHQgKiB0b3BSYXRpbykpIHtcclxuXHRcdFx0VUkuZmxhc2hFbGVtZW50KGVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7IC8vIGlmIG5vdCwgc2Nyb2xsIHRvIGl0XHJcblx0XHRcdGNvbnN0IHNjcm9sbFRvcCA9IGVsZW1lbnQub2Zmc2V0KCkudG9wIC0gVi51aS5zY3JvbGxfdG9wX29mZnNldDtcclxuXHRcdFx0UEFHRS5zY3JvbGxpbmdFbGVtZW50LmFuaW1hdGUoe3Njcm9sbFRvcH0sXHJcblx0XHRcdFx0Vi51aS5zY3JvbGxfdGltZSxcclxuXHRcdFx0XHQoKSA9PiBVSS5mbGFzaEVsZW1lbnQoZWxlbWVudCkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGZsYXNoRWxlbWVudChlbGVtZW50OiBKUXVlcnkpIHtcclxuXHRcdGVsZW1lbnQuYWRkQ2xhc3MoVi5jc3NDbGFzcy5mbGFzaCk7XHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IGVsZW1lbnQucmVtb3ZlQ2xhc3MoVi5jc3NDbGFzcy5mbGFzaCksIDEwMDApO1xyXG5cdH1cclxuXHJcbn1cclxuLy8gZW5kIE1BSU5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21haW4udHMiXSwic291cmNlUm9vdCI6IiJ9