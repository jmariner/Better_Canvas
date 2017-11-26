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
                desc: "Disable indent overrides"
            }
        };
        const types = new Set(SassVars.meta.prefixTypes);
        const processObject = (obj, objName) => {
            for (const key in obj) {
                if (!obj.hasOwnProperty(key))
                    continue;
                let val = obj[key];
                if (typeof val === "object") {
                    processObject(val, key);
                }
                else if (typeof val === "string") {
                    const excluded = SassVars.meta.prefixExclude
                        .map(str => new RegExp("^" + str + "$"))
                        .some(regex => regex.test(key));
                    if (!excluded && (types.has(objName) || types.has(key)))
                        val = this.prefix + "-" + val;
                    if (objName === SassVars.meta.dataPrefixType)
                        val = "data-" + val;
                    obj[key] = val;
                }
            }
        };
        processObject(this, "root");
        this.sassJson = JSON.stringify(this);
    }
}
SassVars.meta = {
    dataPrefixType: "dataAttr",
    prefixTypes: ["cssClass", "dataAttr", "id"],
    prefixExclude: ["popup_.+"]
};
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
        this._canvasNamespace = `com.jmariner.${this.prefix}`;
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
                namespace: this._canvasNamespace,
                root_url: "/api/v1/",
                per_page: 100,
                urls: {
                    custom_data: `users/self/custom_data{dataPath}?ns=${this._canvasNamespace}`,
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
}
const VARS = new Vars();
const V = VARS;
/* harmony export (immutable) */ __webpack_exports__["a"] = V;

/* unused harmony default export */ var _unused_webpack_default_export = (VARS.sassJson);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return ModuleItemType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CanvasPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return MessageType; });
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
        this.active = active;
        this.onPages = [];
        stateData.pages.forEach((page) => {
            const _page = CanvasPage[page.toUpperCase()];
            if (_page !== undefined)
                this.onPages.push(_page);
        });
    }
    onChange(newState) {
        if (newState && this.onEnable instanceof Function)
            this.onEnable();
        else if (this.onDisable instanceof Function)
            this.onDisable();
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vars__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects__ = __webpack_require__(1);
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
    static formatUrl(url, formatObj) {
        if (formatObj !== undefined) {
            if (formatObj.perPage !== undefined)
                url = Utils.perPage(url, formatObj.perPage);
            url = Utils.format(url, formatObj);
        }
        return __WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].canvas.api.root_url + url;
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
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__objects__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vars__ = __webpack_require__(0);
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
        try {
            yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].loadToken();
        }
        catch (e) {
            __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].accessTokenPrompt();
            throw new __WEBPACK_IMPORTED_MODULE_0__objects__["d" /* Exception */]("Missing access token; must refresh", true);
        }
        const courseTabFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const colorsUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].formatUrl(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_colors);
                const courseColors = (yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getJSON(colorsUrl)).custom_colors;
                const favoritesUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].formatUrl(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.favorite_courses);
                const favoriteCourses = yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getJSON(favoritesUrl);
                for (const courseData of favoriteCourses) {
                    const color = courseColors["course_" + courseData.id];
                    __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseTabs.set(courseData.id, new __WEBPACK_IMPORTED_MODULE_0__objects__["b" /* CustomCourseTab */](courseData, color));
                }
            });
        };
        const navTabFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const navTabUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].formatUrl(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.navigation_tabs, {
                    perPage: 25,
                    courseID: __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID
                });
                const navTabs = yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getJSON(navTabUrl);
                for (const tab of navTabs)
                    __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].navTabs.set(tab.id, new __WEBPACK_IMPORTED_MODULE_0__objects__["j" /* NavTab */](tab));
            });
        };
        const assignmentFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const assignmentsUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].formatUrl(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.assignments, {
                    perPage: 1000,
                    courseID: __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID
                });
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
                const modulesUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].formatUrl(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.modules, {
                    perPage: 25,
                    courseID: __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID
                });
                const modules = yield __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getJSON(modulesUrl);
                for (const moduleData of modules) {
                    __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].modules.set(moduleData.id, new __WEBPACK_IMPORTED_MODULE_0__objects__["g" /* Module */](moduleData));
                }
                const moduleIds = Array.from(__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].modules.keys());
                const itemSetPromises = moduleIds.map(modId => __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].modules.get(modId))
                    .filter(mod => mod.itemCount > 0)
                    .map(module => {
                    const moduleItemsUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].perPage(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].formatUrl(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.module_items, {
                        moduleID: module.id,
                        courseID: __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID
                    }), module.itemCount);
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
                    const fileDataUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].formatUrl(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.file_direct, {
                        fileID: item.contentId,
                        courseID: __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID
                    });
                    return __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getJSON(fileDataUrl);
                });
                const files = yield Promise.all(filePromises);
                for (const file of files)
                    __WEBPACK_IMPORTED_MODULE_0__objects__["h" /* ModuleItem */].byContentId.get(file.id).setFileData(file);
            });
        };
        const customDataFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const customDataUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].formatUrl(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_data, { dataPath: "" });
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
        const disabledIndentState = __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].states.get("disable_indent_override");
        const disabledIndent = disabledIndentState.active;
        disabledIndentState.onEnable = () => {
            $(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.selector.module_item).each(function () {
                [0, 1, 2, 3, 4, 5].forEach(level => $(this).removeClass("indent_" + level));
                const defLevel = $(this).attr(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].dataAttr.def_indent);
                $(this).addClass("indent_" + defLevel);
            });
        };
        disabledIndentState.onDisable = () => {
            [0, 1, 2, 3, 4, 5].forEach(level => $(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.selector.module_item).removeClass("indent_" + level));
            $(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.selector.subheader).addClass("indent_" + __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].ui.subheader_indent);
            $(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.selector.not_subheader).addClass("indent_" + __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].ui.main_indent);
        };
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
            stateObj.onChange(state);
            const url = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].formatUrl(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_data, {
                dataPath: "/" + __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.data_urls.active_states
            });
            return __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].editDataArray(url, state, [stateName]);
        });
    }
    static setNavTabPosition(tab, position) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].formatUrl(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_data, {
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
            const url = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].formatUrl(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_data, {
                dataPath: ["", __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.data_urls.completed_assignments, __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID].join("/")
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
            const url = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].formatUrl(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_data, {
                dataPath: ["", __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.data_urls.hidden_assignments, __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID].join("/")
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTM4MDY0NzU2MmY1MDU3NTM4ZjAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZhcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL29iamVjdHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUMzREE7SUFtR0M7UUFqR0EsV0FBTSxHQUFHLGNBQWMsQ0FBQztRQUV4QixhQUFRLEdBQUc7WUFDVixNQUFNLEVBQUUsUUFBUTtZQUNoQixlQUFlLEVBQUUsaUJBQWlCO1lBQ2xDLGdCQUFnQixFQUFFLGtCQUFrQjtZQUNwQyxXQUFXLEVBQUUsYUFBYTtZQUMxQixLQUFLLEVBQUUsWUFBWTtZQUNuQixnQkFBZ0IsRUFBRSxrQkFBa0I7WUFDcEMsV0FBVyxFQUFFLFFBQVE7WUFDckIsV0FBVyxFQUFFLFVBQVU7WUFDdkIsYUFBYSxFQUFFLGVBQWU7WUFDOUIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsS0FBSyxFQUFFLE9BQU87WUFDZCxTQUFTLEVBQUUsY0FBYztZQUN6QixRQUFRLEVBQUUsY0FBYztZ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SUFDRixDQUFDO0lBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFlO1FBQ2xDLE9BQU8sQ0FBQyxRQUFRLENBQUMsZ0RBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsVUFBVSxDQUFDLE1BQU0sT0FBTyxDQUFDLFdBQVcsQ0FBQyxnREFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBRUQiLCJmaWxlIjoiY29udGVudF9zY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5MzgwNjQ3NTYyZjUwNTc1MzhmMCIsImltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5cclxuY2xhc3MgU2Fzc1ZhcnMge1xyXG5cclxuXHRwcmVmaXggPSBcImJldHRlckNhbnZhc1wiO1xyXG5cclxuXHRjc3NDbGFzcyA9IHtcclxuXHRcdGFjdGl2ZTogXCJhY3RpdmVcIixcclxuXHRcdGNoZWNrYm94X3BhcmVudDogXCJjaGVja2JveC1wYXJlbnRcIixcclxuXHRcdGNoZWNrYm94X2NoZWNrZWQ6IFwiY2hlY2tib3gtY2hlY2tlZFwiLFxyXG5cdFx0Y2hlY2tib3hfdGQ6IFwiY2hlY2tib3gtdGRcIixcclxuXHRcdGZsYXNoOiBcImFuaW0tZmxhc2hcIixcclxuXHRcdGNvdXJzZV9saW5rX3RleHQ6IFwiY291cnNlLWxpbmstdGV4dFwiLFxyXG5cdFx0aXRlbV9oaWRkZW46IFwiaGlkZGVuXCIsXHJcblx0XHRoaWRlX2J1dHRvbjogXCJidG4taGlkZVwiLFxyXG5cdFx0aGlkZV9kaXNhYmxlZDogXCJoaWRlLWRpc2FibGVkXCIsXHJcblx0XHR0b2NfcmF0aW86IFwidG9jLXJhdGlvXCIsXHJcblx0XHR0b2NfdGl0bGU6IFwidG9jLXRpdGxlXCIsXHJcblx0XHRmaXhlZDogXCJmaXhlZFwiLFxyXG5cdFx0aXRlbV9pY29uOiBcImljb24td3JhcHBlclwiLFxyXG5cdFx0ZG93bmxvYWQ6IFwiZG93bmxvYWQtYnRuXCIsXHJcblx0XHRleHRlcm5hbF91cmw6IFwidXJsLWJ0blwiLFxyXG5cclxuXHRcdHBvcHVwX2xvYWRlZDogXCJkb25lLWxvYWRpbmdcIixcclxuXHRcdHBvcHVwX2Nvbm5lY3RlZDogXCJwYWdlLWNvbm5lY3RlZFwiLFxyXG5cdFx0cG9wdXBfcmVxdWlyZV9wYWdlOiBcInJlcXVpcmUtcGFnZVwiXHJcblx0fTtcclxuXHJcblx0ZGF0YUF0dHIgPSB7XHJcblx0XHR0b2NfbW9kdWxlX2lkOiBcInRvYy1tb2R1bGUtaWRcIixcclxuXHRcdHRvY190b3RhbDogXCJ0b2MtdG90YWxcIixcclxuXHRcdHRvY19jaGVja2VkX2NvdW50OiBcInRvYy1jaGVja2VkLWNvdW50XCIsXHJcblx0XHR0b2NfcGVyY2VudGFnZTogXCJ0b2MtcGVyY2VudGFnZVwiLFxyXG5cdFx0bW9kX2l0ZW1faWQ6IFwiaXRlbS1pZFwiLFxyXG5cdFx0Y291cnNlX25hbWU6IFwiY291cnNlLW5hbWVcIixcclxuXHRcdGNvdXJzZV9jb2RlOiBcImNvdXJzZS1jb2RlXCIsXHJcblx0XHRkZWZfaW5kZW50OiBcImRlZmF1bHQtaW5kZW50XCJcclxuXHR9O1xyXG5cclxuXHRpZCA9IHtcclxuXHRcdHRvYzogXCJ0b2NcIixcclxuXHRcdGp1bXBfYnV0dG9uOiBcImp1bXAtdG8tdG9wXCIsXHJcblxyXG5cdFx0cG9wdXBfcGFnZV9taXNzaW5nOiBcInBhZ2UtbWlzc2luZy1lcnJvclwiLFxyXG5cdFx0cG9wdXBfZXhfbmFtZTogXCJleHRlbnNpb24tbmFtZVwiLFxyXG5cdFx0cG9wdXBfaW5zZXJ0aW9uX3BvaW50OiBcImluc2VydGlvbi1wb2ludFwiLFxyXG5cdFx0cG9wdXBfanVtcF9idXR0b246IFwianVtcC10b1wiXHJcblx0fTtcclxuXHJcblx0Y29sb3IgPSB7XHJcblx0XHR0b2NfZmlsbDogXCJyZ2JhKDAsIDI1NSwgMCwgLjc1KVwiLFxyXG5cdFx0dG9jX2JvcmRlcjogXCJyZ2IoMTAyLCAxMjAsIDEzNSlcIixcclxuXHRcdHRvY190aXRsZTogXCJ2YXIoLS1pYy1icmFuZC1wcmltYXJ5KVwiLCAvLyB3YXMgXCJyZ2IoNTcsIDc1LCA4OClcIixcclxuXHRcdGNoZWNrYm94X2NoZWNrOiBcInJnYigyMiwgMTYwLCAxMzMpXCIsXHJcblx0XHRjaGVja2JveF9ib3JkZXI6IFwicmdiKDEwMiwgMTIwLCAxMzUpXCIsXHJcblx0XHRoaWdobGlnaHRfb3JhbmdlOiBcInJnYigyNTUsIDE1MiwgMClcIixcclxuXHRcdGhpZ2hsaWdodF9yZWQ6IFwicmdiKDI1NSwgMCwgMClcIixcclxuXHRcdGp1bXBfYnV0dG9uOiBcInJnYig1NywgNzUsIDg4KVwiXHJcblx0fTtcclxuXHJcblx0dWkgPSB7XHJcblx0XHR0b3BfaW5zaWRlX3JhdGlvOiAwLjA1LFxyXG5cdFx0c2Nyb2xsX3RvcF9vZmZzZXQ6IDUsXHJcblx0XHRqdW1wX3RvcF9jdXRvZmY6IDEwMCxcclxuXHRcdHRvY190b3BfbWFyZ2luOiAzMixcclxuXHRcdHNjcm9sbF90aW1lOiA1MDAsXHJcblx0XHRmYWRlX3RpbWU6IDUwMCxcclxuXHRcdHN1YmhlYWRlcl9pbmRlbnQ6IDAsXHJcblx0XHRtYWluX2luZGVudDogMVxyXG5cdH07XHJcblxyXG5cdHN0YXRlID0ge1xyXG5cdFx0c2hvd19oaWRkZW46IHtcclxuXHRcdFx0Y3NzQ2xhc3M6IFwic2hvdy1oaWRkZW5cIixcclxuXHRcdFx0cGFnZXM6IFtcIm1vZHVsZXNcIl0sXHJcblx0XHRcdGRlc2M6IFwiU2hvdyBoaWRkZW4gaXRlbXNcIlxyXG5cdFx0fSxcclxuXHRcdGhpZGVfY2hlY2tlZDoge1xyXG5cdFx0XHRjc3NDbGFzczogXCJoaWRlLWNoZWNrZWRcIixcclxuXHRcdFx0cGFnZXM6IFtcIm1vZHVsZXNcIiwgXCJncmFkZXNcIl0sXHJcblx0XHRcdGRlc2M6IFwiSGlkZSBjb21wbGV0ZWQgaXRlbXNcIlxyXG5cdFx0fSxcclxuXHRcdGhpZ2hsaWdodF91bmNoZWNrZWQ6IHtcclxuXHRcdFx0Y3NzQ2xhc3M6IFwibWFyay11bmNoZWNrZWRcIixcclxuXHRcdFx0cGFnZXM6IFtcIm1vZHVsZXNcIiwgXCJncmFkZXNcIl0sXHJcblx0XHRcdGRlc2M6IFwiTWFyayB1bmNoZWNrZWQgaXRlbXNcIlxyXG5cdFx0fSxcclxuXHRcdGRpc2FibGVfaW5kZW50X292ZXJyaWRlOiB7XHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIkRpc2FibGUgaW5kZW50IG92ZXJyaWRlc1wiXHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0c2Fzc0pzb246IHN0cmluZztcclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgbWV0YSA9IHtcclxuXHRcdGRhdGFQcmVmaXhUeXBlOiBcImRhdGFBdHRyXCIsXHJcblx0XHRwcmVmaXhUeXBlczogW1wiY3NzQ2xhc3NcIiwgXCJkYXRhQXR0clwiLCBcImlkXCJdLFxyXG5cdFx0cHJlZml4RXhjbHVkZTogW1wicG9wdXBfLitcIl1cclxuXHR9O1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHRjb25zdCB0eXBlcyA9IG5ldyBTZXQoU2Fzc1ZhcnMubWV0YS5wcmVmaXhUeXBlcyk7XHJcblxyXG5cdFx0Y29uc3QgcHJvY2Vzc09iamVjdCA9IChvYmo6IG9iamVjdCwgb2JqTmFtZTogc3RyaW5nKSA9PiB7XHJcblxyXG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuXHRcdFx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0bGV0IHZhbDogb2JqZWN0IHwgc3RyaW5nIHwgbnVtYmVyID0gb2JqW2tleV07XHJcblxyXG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKSB7XHJcblxyXG5cdFx0XHRcdFx0cHJvY2Vzc09iamVjdCh2YWwsIGtleSk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XHJcblxyXG5cdFx0XHRcdFx0Y29uc3QgZXhjbHVkZWQgPSBTYXNzVmFycy5tZXRhLnByZWZpeEV4Y2x1ZGVcclxuXHRcdFx0XHRcdFx0Lm1hcChzdHIgPT4gbmV3IFJlZ0V4cChcIl5cIiArIHN0ciArIFwiJFwiKSlcclxuXHRcdFx0XHRcdFx0LnNvbWUocmVnZXggPT4gcmVnZXgudGVzdChrZXkpKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIWV4Y2x1ZGVkICYmICh0eXBlcy5oYXMob2JqTmFtZSkgfHwgdHlwZXMuaGFzKGtleSkpKVxyXG5cdFx0XHRcdFx0XHR2YWwgPSB0aGlzLnByZWZpeCArIFwiLVwiICsgdmFsO1xyXG5cclxuXHRcdFx0XHRcdGlmIChvYmpOYW1lID09PSBTYXNzVmFycy5tZXRhLmRhdGFQcmVmaXhUeXBlKVxyXG5cdFx0XHRcdFx0XHR2YWwgPSBcImRhdGEtXCIgKyB2YWw7XHJcblxyXG5cdFx0XHRcdFx0b2JqW2tleV0gPSB2YWw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHRwcm9jZXNzT2JqZWN0KHRoaXMsIFwicm9vdFwiKTtcclxuXHJcblx0XHR0aGlzLnNhc3NKc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcyk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuY2xhc3MgVmFycyBleHRlbmRzIFNhc3NWYXJzIHtcclxuXHJcblx0dG9vbHRpcCA9IHtcclxuXHRcdG1hcmtfY29tcGxldGU6IFwiTWFyayBhcyBjb21wbGV0ZWRcIixcclxuXHRcdG1hcmtfaW5jb21wbGV0ZTogXCJNYXJrIGFzIGluY29tcGxldGVcIixcclxuXHRcdGhpZGU6IFwiSGlkZSB0aGlzIGl0ZW1cIixcclxuXHRcdHVuaGlkZTogXCJVbmhpZGUgdGhpcyBpdGVtXCIsXHJcblx0XHRoaWRlX2Rpc2FibGVkOiBcIkNhbm5vdCBoaWRlIGdyYWRlZCBpdGVtXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJKdW1wIHRvIHRvcFwiLFxyXG5cdFx0d2FpdGluZzogXCJXYWl0aW5nLi4uXCIsXHJcblx0XHRkb3dubG9hZDogXCJEb3dubG9hZCBmaWxlOiBcXFwie2ZpbGVuYW1lfVxcXCJcIixcclxuXHRcdGV4dGVybmFsX3VybDogXCJWaXNpdCBleHRlcm5hbCBVUkxcIixcclxuXHRcdGhhc19zdWJtaXNzaW9uOiBcIkFzc2lnbm1lbnQgaGFzIHN1Ym1pc3Npb25cIixcclxuXHRcdHBvcHVwX25vX3VuY2hlY2tlZDogXCJObyB1bmNoZWNrZWQgaXRlbXMgdG8ganVtcCB0b1wiXHJcblx0fTtcclxuXHJcblx0bWlzYyA9IHtcclxuXHRcdHRvY19iYWNrZ3JvdW5kOiBgLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCwgJHt0aGlzLmNvbG9yLnRvY19maWxsfSB7cGVyY2VudH0lLCB0cmFuc3BhcmVudCB7cGVyY2VudH0lKWAsXHJcblx0XHR0b2tlbl9rZXk6IFwiYWNjZXNzVG9rZW5cIlxyXG5cdH07XHJcblxyXG5cdGVsZW1lbnQgPSB7XHJcblxyXG5cdFx0Y2hlY2tib3g6XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5jaGVja2JveF9wYXJlbnR9Jz5cclxuXHRcdFx0XHRcdDxpbnB1dCB0eXBlPSdjaGVja2JveCcgJHt0aGlzLmRhdGFBdHRyLm1vZF9pdGVtX2lkfT0ne2l0ZW1faWR9Jz5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGRvd25sb2FkX2J1dHRvbjpcclxuXHRcdFx0XHRgPGRpdiBzdHlsZT0nZGlzcGxheTpub25lJyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLmRvd25sb2FkfScgdGl0bGU9JyR7dGhpcy50b29sdGlwLmRvd25sb2FkfSc+XHJcblx0XHRcdFx0XHQ8YSBocmVmPVwie2ZpbGVfdXJsfVwiPjwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHVybF9idXR0b246XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5leHRlcm5hbF91cmx9JyB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuZXh0ZXJuYWxfdXJsfSc+XHJcblx0XHRcdFx0XHQ8YSBocmVmPVwie2V4dGVybmFsX3VybH1cIiBjbGFzcz1cIm5vdF9leHRlcm5hbFwiIHRhcmdldD1cIl9ibGFua1wiPjwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGhpZGVfYnV0dG9uOlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuaGlkZV9idXR0b259Jz5cclxuXHRcdFx0XHRcdDxpICR7dGhpcy5kYXRhQXR0ci5tb2RfaXRlbV9pZH09J3tpdGVtX2lkfSc+PC9pPlxyXG5cdFx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0Y291cnNlX2xpbms6XHJcblx0XHRcdGA8bGkgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHt0YWJDb2xvcn0nIGNsYXNzPSdtZW51LWl0ZW0gaWMtYXBwLWhlYWRlcl9fbWVudS1saXN0LWl0ZW0nPlxyXG5cdFx0XHRcdDxhIGhyZWY9Jy9jb3Vyc2VzL3t0YWJJRH0vbW9kdWxlcycgY2xhc3M9J2ljLWFwcC1oZWFkZXJfX21lbnUtbGlzdC1saW5rJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9J21lbnUtaXRlbS1pY29uLWNvbnRhaW5lcicgYXJpYS1oaWRkZW49J3RydWUnPjxpPjwvaT48L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHt0YWJDb2xvcn07IGJvcmRlci1yaWdodC1jb2xvcjoge3RhYkNvbG9yfSdcclxuXHRcdFx0XHRcdFx0XHQke3RoaXMuZGF0YUF0dHIuY291cnNlX25hbWV9PSd7bmFtZX0nICR7dGhpcy5kYXRhQXR0ci5jb3Vyc2VfY29kZX09J3tjb2RlfSdcclxuXHRcdFx0XHRcdFx0XHRjbGFzcz0nbWVudS1pdGVtX190ZXh0ICR7dGhpcy5jc3NDbGFzcy5jb3Vyc2VfbGlua190ZXh0fSc+PC9kaXY+XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHQ8L2xpPmAsXHJcblxyXG5cdFx0dG9jOlxyXG5cdFx0XHRgPGRpdiBpZD0nJHt0aGlzLmlkLnRvY30nIGNsYXNzPSdpYy1hcHAtY291cnNlLW1lbnUgbGlzdC12aWV3Jz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPScke3RoaXMuY3NzQ2xhc3MudG9jX3RpdGxlfSc+VGFibGUgb2YgQ29udGVudHM8L2Rpdj5cclxuXHRcdFx0XHQ8bmF2Pjx1bD48L3VsPjwvbmF2PlxyXG5cdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHRvY19pdGVtOlxyXG5cdFx0XHRgPGxpPlxyXG5cdFx0XHRcdDxhIGhyZWY9JyMnIHRpdGxlPSd7aXRlbV9uYW1lfSc+XHJcblx0XHRcdFx0XHR7aXRlbV9uYW1lfVxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLnRvY19yYXRpb30nICR7dGhpcy5kYXRhQXR0ci50b2NfbW9kdWxlX2lkfT0ne2l0ZW1faWR9Jz48L2Rpdj5cclxuXHRcdFx0XHQ8L2E+XHJcblx0XHRcdDwvbGk+YCxcclxuXHJcblx0XHRqdW1wX2J1dHRvbjpcclxuXHRcdFx0YDxkaXYgaWQ9JyR7dGhpcy5pZC5qdW1wX2J1dHRvbn0nPlxyXG5cdFx0XHRcdDxpIHRpdGxlPScke3RoaXMudG9vbHRpcC5qdW1wX2J1dHRvbn0nPjwvaT5cclxuXHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRzdWJtaXNzaW9uX2ljb246XHJcblx0XHRcdGA8ZGl2IHRpdGxlPScke3RoaXMudG9vbHRpcC5oYXNfc3VibWlzc2lvbn0nIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuaXRlbV9pY29ufSc+XHJcblx0XHRcdFx0PGkgY2xhc3M9J2ljb24tcHVibGlzaCc+PC9pPlxyXG5cdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHBvcHVwX3N0YXRlX3N3aXRjaDpcclxuXHRcdFx0YDxkaXYgY2xhc3M9XCJzd2l0Y2ggJHt0aGlzLmNzc0NsYXNzLnBvcHVwX3JlcXVpcmVfcGFnZX1cIj5cclxuXHRcdFx0XHQ8bGFiZWwgZm9yPVwie25hbWV9XCIgY2xhc3M9XCJtZGwtc3dpdGNoIG1kbC1qcy1zd2l0Y2ggbWRsLWpzLXJpcHBsZS1lZmZlY3RcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwibWRsLXN3aXRjaF9fbGFiZWxcIj57ZGVzY308L3NwYW4+XHJcblx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJ7bmFtZX1cIiB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cIm1kbC1zd2l0Y2hfX2lucHV0XCI+XHJcblx0XHRcdFx0PC9sYWJlbD5cclxuXHRcdFx0PC9kaXY+YFxyXG5cdH07XHJcblxyXG5cdC8vIHNlcGFyYXRlZCBmb3IgdXNlIGluIHRlbXBsYXRlIHN0cmluZ3MgYmVsb3dcclxuXHRwcml2YXRlIF9jYW52YXNOYW1lc3BhY2UgPSBgY29tLmptYXJpbmVyLiR7dGhpcy5wcmVmaXh9YDtcclxuXHJcblx0Y2FudmFzID0ge1xyXG5cdFx0c2VsZWN0b3I6IHtcclxuXHRcdFx0bW9kdWxlOiBcImRpdi5jb250ZXh0X21vZHVsZVwiLFxyXG5cdFx0XHRtb2R1bGVfaXRlbTogXCJsaS5jb250ZXh0X21vZHVsZV9pdGVtXCIsXHJcblx0XHRcdG1vZHVsZV9pdGVtczogXCJ1bC5jb250ZXh0X21vZHVsZV9pdGVtc1wiLFxyXG5cdFx0XHRzdWJoZWFkZXI6IFwibGkuY29udGV4dF9tb2R1bGVfc3ViX2hlYWRlclwiLFxyXG5cdFx0XHRub3Rfc3ViaGVhZGVyOiBcImxpLmNvbnRleHRfbW9kdWxlX2l0ZW06bm90KC5jb250ZXh0X21vZHVsZV9zdWJfaGVhZGVyKVwiLFxyXG5cdFx0XHRuYXZfdGFiczogXCJ1bCNzZWN0aW9uLXRhYnNcIlxyXG5cdFx0fSxcclxuXHRcdGFwaToge1xyXG5cdFx0XHRuYW1lc3BhY2U6IHRoaXMuX2NhbnZhc05hbWVzcGFjZSxcclxuXHRcdFx0cm9vdF91cmw6IFwiL2FwaS92MS9cIixcclxuXHRcdFx0cGVyX3BhZ2U6IDEwMCxcclxuXHRcdFx0dXJsczoge1xyXG5cdFx0XHRcdGN1c3RvbV9kYXRhOiBgdXNlcnMvc2VsZi9jdXN0b21fZGF0YXtkYXRhUGF0aH0/bnM9JHt0aGlzLl9jYW52YXNOYW1lc3BhY2V9YCxcclxuXHRcdFx0XHRmYXZvcml0ZV9jb3Vyc2VzOiBcInVzZXJzL3NlbGYvZmF2b3JpdGVzL2NvdXJzZXNcIixcclxuXHRcdFx0XHRjdXN0b21fY29sb3JzOiBcInVzZXJzL3NlbGYvY29sb3JzXCIsXHJcblx0XHRcdFx0YXNzaWdubWVudHM6IFwidXNlcnMvc2VsZi9jb3Vyc2VzL3tjb3Vyc2VJRH0vYXNzaWdubWVudHNcIixcclxuXHRcdFx0XHRtb2R1bGVzOiBcImNvdXJzZXMve2NvdXJzZUlEfS9tb2R1bGVzXCIsXHJcblx0XHRcdFx0bW9kdWxlX2l0ZW1zOiBcImNvdXJzZXMve2NvdXJzZUlEfS9tb2R1bGVzL3ttb2R1bGVJRH0vaXRlbXNcIixcclxuXHRcdFx0XHRmaWxlX2RpcmVjdDogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vZmlsZXMve2ZpbGVJRH1cIixcclxuXHRcdFx0XHRuYXZpZ2F0aW9uX3RhYnM6IFwiY291cnNlcy97Y291cnNlSUR9L3RhYnNcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRkYXRhX3VybHM6IHtcclxuXHRcdFx0XHRhY3RpdmVfc3RhdGVzOiBcImFjdGl2ZV9zdGF0ZXNcIixcclxuXHRcdFx0XHRjb21wbGV0ZWRfYXNzaWdubWVudHM6IFwiY29tcGxldGVkX2Fzc2lnbm1lbnRzXCIsXHJcblx0XHRcdFx0aGlkZGVuX2Fzc2lnbm1lbnRzOiBcImhpZGRlbl9hc3NpZ25tZW50c1wiLFxyXG5cdFx0XHRcdHRhYl9wb3NpdGlvbnM6IFwidGFiX3Bvc2l0aW9uc1wiXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5jb25zdCBWQVJTID0gbmV3IFZhcnMoKTtcclxuZXhwb3J0IGNvbnN0IFYgPSBWQVJTO1xyXG5leHBvcnQgZGVmYXVsdCBWQVJTLnNhc3NKc29uO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdmFycy50cyIsImltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgKiBhcyBDYW52YXNBUEkgZnJvbSBcIi4vY2FudmFzX2FwaVwiO1xyXG5cclxuY2xhc3MgRGF0YSB7XHJcblx0Y291cnNlUGFnZTogQ2FudmFzUGFnZTtcclxuXHRjb3Vyc2VJRDogbnVtYmVyO1xyXG5cdG1vZHVsZXM6IE1hcDxudW1iZXIsIE1vZHVsZT47IC8vIG1vZHVsZSBpZCA9PiBhcnJheSBvZiBNb2R1bGVJdGVtXHJcblx0bW9kdWxlSXRlbXM6IE1hcDxudW1iZXIsIE1vZHVsZUl0ZW0+OyAvLyBtb2R1bGUgaXRlbSBpZCA9PiBNb2R1bGVJdGVtXHJcblx0c3RhdGVzOiBNYXA8c3RyaW5nLCBTdGF0ZT47IC8vIHN0YXRlTmFtZSA9PiBTdGF0ZVxyXG5cdGNvdXJzZVRhYnM6IE1hcDxudW1iZXIsIEN1c3RvbUNvdXJzZVRhYj47IC8vIGNvdXJzZSBpZCA9PiBjb3Vyc2UgdGFiXHJcblx0bmF2VGFiczogTWFwPHN0cmluZywgTmF2VGFiPjsgLy8gdGFiIGlkIHN0cmluZyA9PiB0YWJcclxuXHRvbk1haW5QYWdlOiBib29sZWFuO1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRleHRlbnNpb25JZDogc3RyaW5nO1xyXG5cdGVsZW1lbnRzOiB7anVtcF9idXR0b246IEpRdWVyeSwgdG9jOiBKUXVlcnl9O1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMubW9kdWxlcyA9IG5ldyBNYXAoKTtcclxuXHRcdHRoaXMubW9kdWxlSXRlbXMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLnN0YXRlcyA9IG5ldyBNYXAoKTtcclxuXHRcdHRoaXMuY291cnNlVGFicyA9IG5ldyBNYXAoKTtcclxuXHRcdHRoaXMubmF2VGFicyA9IG5ldyBNYXAoKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnRzID0ge2p1bXBfYnV0dG9uOiBudWxsLCB0b2M6IG51bGx9O1xyXG5cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFBhZ2Uge1xyXG5cclxuXHRib2R5OiBKUXVlcnk7XHJcblx0c2Nyb2xsaW5nRWxlbWVudDogSlF1ZXJ5O1xyXG5cdG1haW4/OiBKUXVlcnk7XHJcblx0Y29udGVudD86IEpRdWVyeTtcclxuXHRsZWZ0PzogSlF1ZXJ5O1xyXG5cdHNpZGViYXI6IEpRdWVyeTtcclxuXHRncmFkZXM/OiBKUXVlcnk7XHJcblxyXG5cdGluaXRpYWxpemUoKSB7XHJcblxyXG5cdFx0dGhpcy5ib2R5ID0gJChcImJvZHlcIik7XHJcblx0XHR0aGlzLnNjcm9sbGluZ0VsZW1lbnQgPSAkKGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQgfHwgZG9jdW1lbnQuYm9keSk7XHJcblx0XHR0aGlzLnNpZGViYXIgPSAkKFwiI21lbnVcIik7XHJcblx0XHR0aGlzLm1haW4gPSAkKFwiI21haW5cIik7XHJcblxyXG5cdFx0aWYgKERBVEEub25NYWluUGFnZSkge1xyXG5cdFx0XHR0aGlzLmNvbnRlbnQgPSAkKFwiI2NvbnRlbnRcIik7XHJcblx0XHRcdHRoaXMubGVmdCA9ICQoXCIjbGVmdC1zaWRlXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChEQVRBLmNvdXJzZVBhZ2UgPT09IENhbnZhc1BhZ2UuR1JBREVTKVxyXG5cdFx0XHR0aGlzLmdyYWRlcyA9ICQoXCIjZ3JhZGVzX3N1bW1hcnlcIik7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tQ291cnNlVGFiIHtcclxuXHRyZWFkb25seSBpZDogbnVtYmVyO1xyXG5cdHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuXHRyZWFkb25seSBjb2RlOiBzdHJpbmc7XHJcblx0cmVhZG9ubHkgY29sb3I6IHN0cmluZztcclxuXHJcblx0Y29uc3RydWN0b3IoY291cnNlRGF0YTogQ2FudmFzQVBJLkNvdXJzZSwgY29sb3I6IHN0cmluZykge1xyXG5cdFx0dGhpcy5pZCA9IGNvdXJzZURhdGEuaWQ7XHJcblx0XHR0aGlzLm5hbWUgPSBjb3Vyc2VEYXRhLm5hbWU7XHJcblx0XHR0aGlzLmNvZGUgPSBjb3Vyc2VEYXRhLmNvdXJzZV9jb2RlO1xyXG5cdFx0dGhpcy5jb2xvciA9IGNvbG9yO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOYXZUYWIge1xyXG5cdHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcblx0cHJpdmF0ZSByZWFkb25seSBpbml0UG9zaXRpb246IG51bWJlcjtcclxuXHRwcml2YXRlIF9wb3NpdGlvbjogbnVtYmVyO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0YWJEYXRhOiBDYW52YXNBUEkuVGFiKSB7XHJcblx0XHR0aGlzLmlkID0gdGFiRGF0YS5pZDtcclxuXHRcdHRoaXMuX3Bvc2l0aW9uID0gbnVsbDtcclxuXHRcdHRoaXMuaW5pdFBvc2l0aW9uID0gdGFiRGF0YS5wb3NpdGlvbjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRQb3NpdGlvbihwb3MpIHtcclxuXHRcdHRoaXMuX3Bvc2l0aW9uID0gcG9zO1xyXG5cdH1cclxuXHJcblx0Z2V0IGhhc0N1c3RvbVBvc2l0aW9uKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9uICE9IG51bGw7XHJcblx0fVxyXG5cclxuXHRnZXQgcG9zaXRpb24oKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbiA9PSBudWxsID8gdGhpcy5pbml0UG9zaXRpb24gOiB0aGlzLl9wb3NpdGlvbiA9PT0gLTEgPyBudWxsIDogdGhpcy5fcG9zaXRpb247XHJcblx0fVxyXG5cclxuXHRnZXQgaGlkZGVuKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9uID09PSAtMTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZSB7XHJcblx0cHJpdmF0ZSBuYW1lOiBzdHJpbmc7XHJcblxyXG5cdHJlYWRvbmx5IGJvZHlDbGFzczogc3RyaW5nO1xyXG5cdHJlYWRvbmx5IG9uUGFnZXM6IENhbnZhc1BhZ2VbXTtcclxuXHJcblx0cHVibGljIGFjdGl2ZTogYm9vbGVhbjtcclxuXHRwdWJsaWMgb25FbmFibGU6ICgpID0+IHZvaWQ7XHJcblx0cHVibGljIG9uRGlzYWJsZTogKCkgPT4gdm9pZDtcclxuXHJcblx0Y29uc3RydWN0b3Ioa2V5LCBzdGF0ZURhdGEsIGFjdGl2ZSkge1xyXG5cdFx0dGhpcy5uYW1lID0ga2V5O1xyXG5cdFx0dGhpcy5ib2R5Q2xhc3MgPSBzdGF0ZURhdGEuY3NzQ2xhc3M7XHJcblx0XHR0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcclxuXHRcdHRoaXMub25QYWdlcyA9IFtdO1xyXG5cclxuXHRcdHN0YXRlRGF0YS5wYWdlcy5mb3JFYWNoKChwYWdlOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0Y29uc3QgX3BhZ2UgPSBDYW52YXNQYWdlW3BhZ2UudG9VcHBlckNhc2UoKV07XHJcblx0XHRcdGlmIChfcGFnZSAhPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdHRoaXMub25QYWdlcy5wdXNoKF9wYWdlKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0b25DaGFuZ2UobmV3U3RhdGU6IGJvb2xlYW4pIHtcclxuXHRcdGlmIChuZXdTdGF0ZSAmJiB0aGlzLm9uRW5hYmxlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHRoaXMub25FbmFibGUoKTtcclxuXHRcdGVsc2UgaWYgKHRoaXMub25EaXNhYmxlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHRoaXMub25EaXNhYmxlKCk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vZHVsZSB7XHJcblx0cmVhZG9ubHkgbmFtZTogc3RyaW5nO1xyXG5cdHJlYWRvbmx5IGlkOiBudW1iZXI7XHJcblx0cmVhZG9ubHkgaXRlbUNvdW50OiBudW1iZXI7XHJcblx0cmVhZG9ubHkgaXRlbXM6IE1vZHVsZUl0ZW1bXTtcclxuXHJcblx0Y29uc3RydWN0b3IobW9kdWxlSnNvbjogQ2FudmFzQVBJLk1vZHVsZSkge1xyXG5cdFx0dGhpcy5uYW1lID0gbW9kdWxlSnNvbi5uYW1lO1xyXG5cdFx0dGhpcy5pZCA9IG1vZHVsZUpzb24uaWQ7XHJcblx0XHR0aGlzLml0ZW1Db3VudCA9IG1vZHVsZUpzb24uaXRlbXNfY291bnQ7XHJcblx0XHR0aGlzLml0ZW1zID0gW107XHJcblx0fVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vZHVsZUl0ZW0ge1xyXG5cdHByaXZhdGUgX2lkOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xyXG5cdHByaXZhdGUgbW9kdWxlSWQ6IG51bWJlcjtcclxuXHRwcml2YXRlIF90eXBlOiBNb2R1bGVJdGVtVHlwZTtcclxuXHRwcml2YXRlIGFzc2lnbm1lbnRJZDogbnVtYmVyO1xyXG5cdHByaXZhdGUgX2NvbnRlbnRJZDogbnVtYmVyO1xyXG5cdHByaXZhdGUgX2ZpbGVEYXRhOiBDYW52YXNBUEkuRmlsZTtcclxuXHRwcml2YXRlIF9leHRlcm5hbFVybDogc3RyaW5nO1xyXG5cclxuXHRwdWJsaWMgaXNTdWJtaXR0ZWQ6IGJvb2xlYW47XHJcblxyXG5cdHB1YmxpYyBjaGVja2VkOiBib29sZWFuO1xyXG5cdHB1YmxpYyBoaWRkZW46IGJvb2xlYW47XHJcblx0cHJpdmF0ZSBfY2hlY2tib3hFbGVtZW50OiBKUXVlcnk7XHJcblx0cHJpdmF0ZSBfaGlkZUVsZW1lbnQ6IEpRdWVyeTtcclxuXHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBieUNvbnRlbnRJZCA9IG5ldyBNYXA8bnVtYmVyLCBNb2R1bGVJdGVtPigpO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihtb2R1bGVJdGVtSnNvbj86IENhbnZhc0FQSS5Nb2R1bGVJdGVtKSB7XHJcblx0XHRpZiAobW9kdWxlSXRlbUpzb24pIHRoaXMudXBkYXRlKG1vZHVsZUl0ZW1Kc29uKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgZnJvbUNvbnRlbnRJZChjb250ZW50SWQ6IG51bWJlcik6IE1vZHVsZUl0ZW0ge1xyXG5cdFx0Y29uc3QgaXRlbSA9IG5ldyBNb2R1bGVJdGVtKCk7XHJcblx0XHRpdGVtLl9jb250ZW50SWQgPSBjb250ZW50SWQ7XHJcblx0XHRNb2R1bGVJdGVtLmJ5Q29udGVudElkLnNldChjb250ZW50SWQsIGl0ZW0pO1xyXG5cdFx0cmV0dXJuIGl0ZW07XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdXBkYXRlKG1vZHVsZUl0ZW1Kc29uOiBDYW52YXNBUEkuTW9kdWxlSXRlbSkge1xyXG5cdFx0dGhpcy5faWQgPSBtb2R1bGVJdGVtSnNvbi5pZDtcclxuXHRcdHRoaXMuX25hbWUgPSBtb2R1bGVJdGVtSnNvbi50aXRsZTtcclxuXHRcdHRoaXMubW9kdWxlSWQgPSBtb2R1bGVJdGVtSnNvbi5tb2R1bGVfaWQ7XHJcblx0XHR0aGlzLl9leHRlcm5hbFVybCA9IG1vZHVsZUl0ZW1Kc29uLmV4dGVybmFsX3VybCB8fCBudWxsO1xyXG5cclxuXHRcdGNvbnN0IHR5cGVTdHJpbmc6IHN0cmluZyA9IG1vZHVsZUl0ZW1Kc29uLnR5cGVcclxuXHRcdFx0LnJlcGxhY2UoLyhbQS1aXSkvZywgKHIsIHMpID0+IFwiX1wiICsgcylcclxuXHRcdFx0LnJlcGxhY2UoL15fLywgXCJcIikudG9VcHBlckNhc2UoKTtcclxuXHJcblx0XHR0aGlzLl90eXBlID0gTW9kdWxlSXRlbVR5cGVbdHlwZVN0cmluZ107XHJcblxyXG5cdFx0aWYgKHRoaXMuX3R5cGUgPT09IHVuZGVmaW5lZClcclxuXHRcdFx0Y29uc29sZS53YXJuKGBVbmtub3duIG1vZHVsZSBpdGVtIHR5cGU6IFwiJHt0eXBlU3RyaW5nfVwiYCk7XHJcblxyXG5cdFx0dGhpcy5jaGVja2VkID0gZmFsc2U7XHJcblx0XHR0aGlzLmhpZGRlbiA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICh0aGlzLl90eXBlID09PSBNb2R1bGVJdGVtVHlwZS5BU1NJR05NRU5UKVxyXG5cdFx0XHR0aGlzLnNldEFzc2lnbm1lbnRJZChtb2R1bGVJdGVtSnNvbi5jb250ZW50X2lkKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy5hc3NpZ25tZW50SWQgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldEFzc2lnbm1lbnRJZChpZDogbnVtYmVyKSB7IHRoaXMuYXNzaWdubWVudElkID0gaWQ7IH1cclxuXHRwdWJsaWMgc2V0RmlsZURhdGEoZGF0YTogQ2FudmFzQVBJLkZpbGUpIHsgdGhpcy5fZmlsZURhdGEgPSBkYXRhOyB9XHJcblxyXG5cdGdldCBjYW52YXNFbGVtZW50SWQoKSB7XHJcblx0XHRzd2l0Y2ggKERBVEEuY291cnNlUGFnZSkge1xyXG5cdFx0XHRjYXNlIENhbnZhc1BhZ2UuTU9EVUxFUzpcclxuXHRcdFx0XHRyZXR1cm4gXCJjb250ZXh0X21vZHVsZV9pdGVtX1wiICsgdGhpcy5faWQ7IC8vIGxpIGVsZW1lbnRcclxuXHRcdFx0Y2FzZSBDYW52YXNQYWdlLkdSQURFUzpcclxuXHRcdFx0XHRyZXR1cm4gXCJzdWJtaXNzaW9uX1wiICsgdGhpcy5hc3NpZ25tZW50SWQ7IC8vIHRyIGVsZW1lbnRcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBpZCgpIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcblx0Z2V0IG5hbWUoKSB7IHJldHVybiB0aGlzLl9uYW1lO1x0fVxyXG5cdGdldCB0eXBlKCk6IE1vZHVsZUl0ZW1UeXBlIHsgcmV0dXJuIHRoaXMuX3R5cGU7IH1cclxuXHRnZXQgaXNHcmFkZWQoKSB7IHJldHVybiB0aGlzLmFzc2lnbm1lbnRJZCAhPT0gbnVsbDsgfVxyXG5cdGdldCBpc1N1YkhlYWRlcigpIHsgcmV0dXJuIHRoaXMuX3R5cGUgPT09IE1vZHVsZUl0ZW1UeXBlLlNVQl9IRUFERVI7IH1cclxuXHRnZXQgbW9kdWxlKCkgeyByZXR1cm4gREFUQS5tb2R1bGVzLmdldCh0aGlzLm1vZHVsZUlkKTsgfVxyXG5cdGdldCBleHRlcm5hbFVybCgpIHsgcmV0dXJuIHRoaXMuX2V4dGVybmFsVXJsOyB9XHJcblx0Z2V0IGNvbnRlbnRJZCgpIHsgcmV0dXJuIHRoaXMuX2NvbnRlbnRJZDsgfVxyXG5cclxuXHRnZXQgY2hlY2tib3hFbGVtZW50KCk6IEpRdWVyeSB7IHJldHVybiB0aGlzLl9jaGVja2JveEVsZW1lbnQ7IH1cclxuXHRzZXQgY2hlY2tib3hFbGVtZW50KHZhbHVlOiBKUXVlcnkpIHtcclxuXHRcdGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPT09IDEpXHJcblx0XHRcdHRoaXMuX2NoZWNrYm94RWxlbWVudCA9IHZhbHVlO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE1vZHVsZSBJdGVtIEVsZW1lbnQ6IFwiICsgdmFsdWUpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGhpZGVFbGVtZW50KCk6IEpRdWVyeSB7IHJldHVybiB0aGlzLl9oaWRlRWxlbWVudDsgfVxyXG5cdHNldCBoaWRlRWxlbWVudCh2YWx1ZTogSlF1ZXJ5KSB7XHJcblx0XHRpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUubGVuZ3RoID09PSAxKVxyXG5cdFx0XHR0aGlzLl9oaWRlRWxlbWVudCA9IHZhbHVlO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE1vZHVsZSBJdGVtIEVsZW1lbnQ6IFwiICsgdmFsdWUpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGZpbGVEYXRhKCk6IENhbnZhc0FQSS5GaWxlIHsgcmV0dXJuIHRoaXMuX2ZpbGVEYXRhOyB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZW51bSBNb2R1bGVJdGVtVHlwZSB7XHJcblx0QVNTSUdOTUVOVCwgU1VCX0hFQURFUiwgRElTQ1VTU0lPTiwgUVVJWiwgUEFHRSwgRklMRSwgRVhURVJOQUxfVVJMLCBFWFRFUk5BTF9UT09MXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENhbnZhc1BhZ2Uge1xyXG5cdE1PRFVMRVMsIEdSQURFUywgSE9NRSwgVVNFUlMsIEdST1VQUywgQ09MTEFCT1JBVElPTlMsIERJU0NVU1NJT05fVE9QSUNTLCBFWFRFUk5BTF9UT09MUywgQVNTSUdOTUVOVFNcclxufVxyXG5cclxuZXhwb3J0IGVudW0gTWVzc2FnZVR5cGUge1xyXG5cdEJBU0lDLCBTVEFURVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZURhdGEge1xyXG5cdGFjdGlvbjogc3RyaW5nO1xyXG5cdHR5cGU6IE1lc3NhZ2VUeXBlO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihhY3Rpb246IHN0cmluZywgdHlwZT86IE1lc3NhZ2VUeXBlKSB7XHJcblx0XHR0aGlzLmFjdGlvbiA9IGFjdGlvbjtcclxuXHRcdHRoaXMudHlwZSA9IHR5cGUgfHwgTWVzc2FnZVR5cGUuQkFTSUM7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdGVNZXNzYWdlRGF0YSBleHRlbmRzIE1lc3NhZ2VEYXRhIHtcclxuXHRzdGF0ZU5hbWU6IHN0cmluZztcclxuXHRzdGF0ZTogYm9vbGVhbjtcclxuXHJcblx0Y29uc3RydWN0b3IoYWN0aW9uOiBcImdldFwiIHwgXCJzZXRcIiwgc3RhdGVOYW1lOiBzdHJpbmcsIHN0YXRlPzogYm9vbGVhbikge1xyXG5cdFx0c3VwZXIoYWN0aW9uLCBNZXNzYWdlVHlwZS5TVEFURSk7XHJcblxyXG5cdFx0dGhpcy5zdGF0ZU5hbWUgPSBzdGF0ZU5hbWU7XHJcblx0XHR0aGlzLnN0YXRlID0gc3RhdGU7XHJcblxyXG5cdFx0aWYgKGFjdGlvbiA9PT0gXCJzZXRcIiAmJiB0aGlzLnN0YXRlID09PSB1bmRlZmluZWQpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc3RhdGUgbWVzc2FnZTogbm8gYm9vbGVhbiB0byBzZXQgc3RhdGUgdG9cIik7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXhjZXB0aW9uIHtcclxuXHRwcml2YXRlIHJlYXNvbjogc3RyaW5nO1xyXG5cdHByaXZhdGUgZmF0YWw6IGJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKHJlYXNvbjogc3RyaW5nLCBmYXRhbD86IGJvb2xlYW4pIHtcclxuXHRcdGlmIChmYXRhbCA9PT0gdW5kZWZpbmVkKSBmYXRhbCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5yZWFzb24gPSByZWFzb247XHJcblx0XHR0aGlzLmZhdGFsID0gZmF0YWw7XHJcblx0fVxyXG5cclxuXHRnZXQgaXNGYXRhbCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmZhdGFsO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHRvU3RyaW5nKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVhc29uO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IERBVEEgPSBuZXcgRGF0YSgpO1xyXG5leHBvcnQgY29uc3QgUEFHRSA9IG5ldyBQYWdlKCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9vYmplY3RzLnRzIiwiaW1wb3J0IHsgViB9IGZyb20gXCIuL3ZhcnNcIjtcclxuaW1wb3J0IHsgTWVzc2FnZURhdGEgfSBmcm9tIFwiLi9vYmplY3RzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlscyB7XHJcblxyXG5cdHByaXZhdGUgc3RhdGljIEFDQ0VTU19UT0tFTjogc3RyaW5nO1xyXG5cclxuXHRzdGF0aWMgZm9ybWF0KHN0cjogc3RyaW5nLCBvYmo6IG9iamVjdCk6IHN0cmluZyB7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XHJcblx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSlcclxuXHRcdFx0XHRzdHIgPSBzdHIucmVwbGFjZShuZXcgUmVnRXhwKFwiXFxcXHtcIiArIGtleSArIFwiXFxcXH1cIiwgXCJnaVwiKSwgb2JqW2tleV0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdHI7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0T3JEZWZhdWx0PFQ+KG9iajogb2JqZWN0LCBrZXk6IFByb3BlcnR5S2V5LCBkZWY6IFQpOiBUIHtcclxuXHRcdGlmIChvYmogPT09IHVuZGVmaW5lZCB8fCBvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZGVmO1xyXG5cdFx0ZWxzZSByZXR1cm4gb2JqW2tleV07XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcGVyUGFnZSh1cmw6IHN0cmluZywgcGVyUGFnZTogbnVtYmVyKSB7XHJcblx0XHRyZXR1cm4gYCR7dXJsfT9wZXJfcGFnZT0ke3BlclBhZ2V9YDtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBmb3JtYXRVcmwodXJsOiBzdHJpbmcsIGZvcm1hdE9iaj86IHtwZXJQYWdlPzogbnVtYmVyLCBba2V5OiBzdHJpbmddOiBhbnl9KSB7XHJcblxyXG5cdFx0aWYgKGZvcm1hdE9iaiAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGlmIChmb3JtYXRPYmoucGVyUGFnZSAhPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdHVybCA9IFV0aWxzLnBlclBhZ2UodXJsLCBmb3JtYXRPYmoucGVyUGFnZSk7XHJcblx0XHRcdHVybCA9IFV0aWxzLmZvcm1hdCh1cmwsIGZvcm1hdE9iaik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIFYuY2FudmFzLmFwaS5yb290X3VybCArIHVybDtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyBnZXRKU09OPFQ+KHVybDogc3RyaW5nKTogUHJvbWlzZTxUPiB7XHJcblxyXG5cdFx0VXRpbHMuY2hlY2tUb2tlbigpO1xyXG5cclxuXHRcdGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuXHRcdFx0bWV0aG9kOiBcIkdFVFwiLFxyXG5cdFx0XHRoZWFkZXJzOiBuZXcgSGVhZGVycyh7XHJcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcblx0XHRcdFx0XCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIFwiICsgVXRpbHMuQUNDRVNTX1RPS0VOXHJcblx0XHRcdH0pXHJcblx0XHR9IGFzIFJlcXVlc3RJbml0KTtcclxuXHJcblx0XHRpZiAocmVzcC5zdGF0dXMgPT09IDQwNCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCI0MDQgZXJyb3Igd2hlbiBnZXR0aW5nIEpTT05cIik7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0aWYgKHJlc3Auc3RhdHVzID09PSA0MDApXHJcblx0XHRcdFx0Y29uc29sZS5kZWJ1ZyhcIjQwMCBlcnJvciB3aGVuIGdldHRpbmcgSlNPTiB3YXMgT0tBWVwiKTtcclxuXHJcblx0XHRcdGxldCBqc29uID0gYXdhaXQgcmVzcC50ZXh0KCk7XHJcblx0XHRcdGpzb24gPSBqc29uLnJlcGxhY2UoXCJ3aGlsZSgxKTtcIiwgXCJcIik7XHJcblxyXG5cdFx0XHRyZXR1cm4gSlNPTi5wYXJzZShqc29uKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgcHV0RGF0YSh1cmwsIGRhdGE6IGFueVtdIHwgYW55KTogUHJvbWlzZTxib29sZWFuPiB7XHJcblxyXG5cdFx0VXRpbHMuY2hlY2tUb2tlbigpO1xyXG5cclxuXHRcdGNvbnN0IGJvZHlEYXRhID0ge25zOiBWLmNhbnZhcy5hcGkubmFtZXNwYWNlLCBkYXRhfTtcclxuXHRcdGNvbnN0IG1ldGhvZCA9IGRhdGEgaW5zdGFuY2VvZiBBcnJheSAmJiBkYXRhLmxlbmd0aCA+IDAgfHwgZGF0YSAhPT0gdW5kZWZpbmVkID8gXCJQVVRcIiA6IFwiREVMRVRFXCI7XHJcblxyXG5cdFx0aWYgKG1ldGhvZCA9PT0gXCJERUxFVEVcIilcclxuXHRcdFx0ZGVsZXRlIGJvZHlEYXRhLmRhdGE7XHJcblxyXG5cdFx0Y29uc3Qgb3BzID0ge1xyXG5cdFx0XHRtZXRob2QsXHJcblx0XHRcdGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcclxuXHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuXHRcdFx0XHRcIkF1dGhvcml6YXRpb25cIjogXCJCZWFyZXIgXCIgKyBVdGlscy5BQ0NFU1NfVE9LRU5cclxuXHRcdFx0fSksXHJcblx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHlEYXRhKVxyXG5cdFx0fSBhcyBSZXF1ZXN0SW5pdDtcclxuXHJcblx0XHRjb25zdCByZXNwID0gYXdhaXQgZmV0Y2godXJsLCBvcHMpO1xyXG5cclxuXHRcdGlmICghcmVzcC5vayB8fCByZXNwLnN0YXR1cyA9PT0gNDAxKSB7IC8vIDQwMSB1bmF1dGhvcml6ZWRcclxuXHRcdFx0Y29uc29sZS5lcnJvcihgVW5hYmxlIHRvICR7bWV0aG9kfSBkYXRhIHRvICR7dXJsfS4gcmVzcDpgLCBKU09OLnN0cmluZ2lmeShyZXNwKSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgZWRpdERhdGFBcnJheSh1cmw6IHN0cmluZywgYXBwZW5kOiBib29sZWFuLCB2YWx1ZXM6IGFueVtdKTogUHJvbWlzZTxib29sZWFuPiB7XHJcblxyXG5cdFx0Y29uc3QgZXhpc3RpbmdEYXRhOiBhbnlbXSA9IChcclxuXHRcdFx0Ly8gdXJsIGlzIHNhbWUgZm9yIGdldC9wdXRcclxuXHRcdFx0YXdhaXQgVXRpbHMuZ2V0SlNPTjx7ZGF0YTogYW55W119Pih1cmwpXHJcblx0XHQpLmRhdGEgfHwgW107XHJcblxyXG5cdFx0bGV0IG5ld0FycmF5O1xyXG5cclxuXHRcdGlmIChhcHBlbmQpIHtcclxuXHRcdFx0bmV3QXJyYXkgPSBleGlzdGluZ0RhdGEuY29uY2F0KHZhbHVlcyk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHsgLy8gc3VidHJhY3QgZnJvbSBkYXRhIGFycmF5XHJcblx0XHRcdGlmIChleGlzdGluZ0RhdGEubGVuZ3RoID09PSAwKVxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRuZXdBcnJheSA9IGV4aXN0aW5nRGF0YS5maWx0ZXIodmFsID0+ICF2YWx1ZXMuaW5jbHVkZXModmFsKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIFV0aWxzLnB1dERhdGEodXJsLCBuZXdBcnJheSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgd2FpdChtczogbnVtYmVyKSB7XHJcblx0XHRhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdFx0c2V0VGltZW91dChyZXNvbHZlLCBtcyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjaGVja1Rva2VuKCk6IHZvaWQgfCBuZXZlciB7XHJcblx0XHRpZiAoVXRpbHMuQUNDRVNTX1RPS0VOID09PSBudWxsKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJBY2Nlc3MgdG9rZW4gbm90IHNldFwiKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyBsb2FkVG9rZW4oKSB7XHJcblx0XHRVdGlscy5BQ0NFU1NfVE9LRU4gPSBhd2FpdCBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcblx0XHRcdGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFYubWlzYy50b2tlbl9rZXksIHJlc3VsdERhdGEgPT4ge1xyXG5cclxuXHRcdFx0XHRjb25zdCBzdWNjZXNzID0gVXRpbHMuQUNDRVNTX1RPS0VOICE9PSBudWxsIHx8IHJlc3VsdERhdGFbVi5taXNjLnRva2VuX2tleV07XHJcblx0XHRcdFx0aWYgKHN1Y2Nlc3MpIHJlc29sdmUocmVzdWx0RGF0YVtWLm1pc2MudG9rZW5fa2V5XSk7XHJcblx0XHRcdFx0ZWxzZSByZWplY3QoKTtcclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFjY2Vzc1Rva2VuUHJvbXB0KCkge1xyXG5cdFx0Y29uc3Qgb3Blbk9wdGlvbnMgPSBjb25maXJtKFwiTWlzc2luZyBhY2Nlc3MgdG9rZW4sIHByZXNzIE9LIHRvIG9wZW4gZXh0ZW5zaW9uIG9wdGlvbnNcIik7XHJcblx0XHRpZiAob3Blbk9wdGlvbnMpIC8vIFRPRE8gc2VuZCB0YWIgSUQgd2l0aCB0aGlzIG1lc3NhZ2U/XHJcblx0XHRcdGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKG5ldyBNZXNzYWdlRGF0YShcIm9wZW4gb3B0aW9uc1wiKSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcnVuQ2IoY2FsbGJhY2tGdW5jdGlvbjogKCkgPT4gdm9pZCkge1xyXG5cdFx0aWYgKGNhbGxiYWNrRnVuY3Rpb24gIT09IHVuZGVmaW5lZClcclxuXHRcdFx0Y2FsbGJhY2tGdW5jdGlvbigpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHNhZmVDYjxGIGV4dGVuZHMgKCguLi5hcmdzKSA9PiB2b2lkKT4oY2FsbGJhY2tGdW5jdGlvbjogRiB8IHVuZGVmaW5lZCk6IEYge1xyXG5cdFx0aWYgKGNhbGxiYWNrRnVuY3Rpb24gIT09IHVuZGVmaW5lZClcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrRnVuY3Rpb247XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiAoKCkgPT4ge30pIGFzIEY7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tZW1wdHlcclxuXHR9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlscy50cyIsImltcG9ydCB7IERBVEEsIFBBR0UsIEV4Y2VwdGlvbiwgQ3VzdG9tQ291cnNlVGFiLCBOYXZUYWIsXHJcblx0U3RhdGUsIE1vZHVsZSwgTW9kdWxlSXRlbSwgTWVzc2FnZURhdGEsICBTdGF0ZU1lc3NhZ2VEYXRhLFxyXG5cdENhbnZhc1BhZ2UsIE1lc3NhZ2VUeXBlLCBNb2R1bGVJdGVtVHlwZSB9IGZyb20gXCIuL29iamVjdHNcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XHJcbmltcG9ydCB7IFYgfSBmcm9tIFwiLi92YXJzXCI7XHJcbmltcG9ydCAqIGFzIENhbnZhc0FQSSBmcm9tIFwiLi9jYW52YXNfYXBpXCI7XHJcblxyXG4oYXN5bmMgZnVuY3Rpb24gaW5pdCgpIHtcclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gICAgICAgICAgIG1haW4gaW5pdGlhbGl6YXRpb25cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0KGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdERBVEEuZXh0ZW5zaW9uSWQgPSBjaHJvbWUucnVudGltZS5pZDtcclxuXHRcdERBVEEubmFtZSA9IGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkubmFtZTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGxvZ1R5cGUgb2YgXCJsb2cgZGVidWcgaW5mbyB3YXJuIGVycm9yIGRpclwiLnNwbGl0KFwiIFwiKSkge1xyXG5cdFx0XHRjb25zdCBvcmlnID0gY29uc29sZVtsb2dUeXBlXTtcclxuXHRcdFx0Y29uc29sZVtsb2dUeXBlXSA9IG9yaWcuYmluZChjb25zb2xlLCBgWyR7REFUQS5uYW1lfV0gWyR7bG9nVHlwZS50b1VwcGVyQ2FzZSgpfV1gKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBsb2FkIGNvdXJzZSBpZCBhbmQgd2hhdCBwYWdlIHVzZXIgaXMgb24gd2l0aGluIHRoYXQgY291cnNlXHJcblx0XHRjb25zdCB1cmxNYXRjaCA9IC9jb3Vyc2VzXFwvKFxcZCspKD86XFwvKFxcdyspKT8uKi8uZXhlYyhkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSk7XHJcblx0XHRjb25zdCBvbkNvdXJzZVBhZ2UgPSB1cmxNYXRjaCAhPT0gbnVsbDtcclxuXHRcdERBVEEuY291cnNlUGFnZSA9IG9uQ291cnNlUGFnZSA/IENhbnZhc1BhZ2VbKHVybE1hdGNoWzJdIHx8IFwiaG9tZVwiKS50b1VwcGVyQ2FzZSgpXSA6IG51bGw7XHJcblx0XHREQVRBLmNvdXJzZUlEID0gb25Db3Vyc2VQYWdlID8gTnVtYmVyKHVybE1hdGNoWzFdKSA6IG51bGw7XHJcblx0XHREQVRBLm9uTWFpblBhZ2UgPSBbQ2FudmFzUGFnZS5NT0RVTEVTLCBDYW52YXNQYWdlLkdSQURFU10uaW5jbHVkZXMoREFUQS5jb3Vyc2VQYWdlKTtcclxuXHJcblx0XHRpZiAob25Db3Vyc2VQYWdlKVxyXG5cdFx0XHRjb25zb2xlLmRlYnVnKGBPbiBjb3Vyc2UgIyR7REFUQS5jb3Vyc2VJRH0gcGFnZSwgYXQgJHtDYW52YXNQYWdlW0RBVEEuY291cnNlUGFnZV19YCk7XHJcblxyXG5cdH0pKCk7XHJcblxyXG5cdC8vIGJlZ2luIGFzeW5jIG9wZXJhdGlvbnNcclxuXHJcblx0Y29uc3QgaW5pdFN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcblxyXG5cdC8vIGxvYWQgdmFyaWFibGVzXHJcblxyXG5cdC8vIFRPRE8gaW1wcm92ZSB2YXJpYWJsZSBsb2FkaW5nXHJcblxyXG5cdC8vIHRyeSB0byBsb2FkIGFjY2VzcyB0b2tlblxyXG5cdHRyeSB7XHJcblx0XHRhd2FpdCBVdGlscy5sb2FkVG9rZW4oKTtcclxuXHR9XHJcblx0Y2F0Y2ggKGUpIHtcclxuXHRcdFV0aWxzLmFjY2Vzc1Rva2VuUHJvbXB0KCk7XHJcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKFwiTWlzc2luZyBhY2Nlc3MgdG9rZW47IG11c3QgcmVmcmVzaFwiLCB0cnVlKTtcclxuXHR9XHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vICAgICAgICAgICAgICAgY291cnNlIHRhYnNcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0Y29uc3QgY291cnNlVGFiRmxvdyA9IGFzeW5jIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdGNvbnN0IGNvbG9yc1VybCA9IFV0aWxzLmZvcm1hdFVybChWLmNhbnZhcy5hcGkudXJscy5jdXN0b21fY29sb3JzKTtcclxuXHRcdGNvbnN0IGNvdXJzZUNvbG9ycyA9IChcclxuXHRcdFx0YXdhaXQgVXRpbHMuZ2V0SlNPTjx7Y3VzdG9tX2NvbG9yczogTWFwPHN0cmluZywgc3RyaW5nPn0+KGNvbG9yc1VybClcclxuXHRcdCkuY3VzdG9tX2NvbG9ycztcclxuXHJcblx0XHRjb25zdCBmYXZvcml0ZXNVcmwgPSBVdGlscy5mb3JtYXRVcmwoVi5jYW52YXMuYXBpLnVybHMuZmF2b3JpdGVfY291cnNlcyk7XHJcblx0XHRjb25zdCBmYXZvcml0ZUNvdXJzZXMgPVxyXG5cdFx0XHRhd2FpdCBVdGlscy5nZXRKU09OPENhbnZhc0FQSS5Db3Vyc2VbXT4oZmF2b3JpdGVzVXJsKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGNvdXJzZURhdGEgb2YgZmF2b3JpdGVDb3Vyc2VzKSB7XHJcblx0XHRcdGNvbnN0IGNvbG9yID0gY291cnNlQ29sb3JzW1wiY291cnNlX1wiICsgY291cnNlRGF0YS5pZF07XHJcblx0XHRcdERBVEEuY291cnNlVGFicy5zZXQoY291cnNlRGF0YS5pZCwgbmV3IEN1c3RvbUNvdXJzZVRhYihjb3Vyc2VEYXRhLCBjb2xvcikpO1xyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyAgICAgICAgICAgIG5hdmlnYXRpb24gdGFic1xyXG5cdC8vICByZXF1aXJlczogY291cnNlIHBhZ2VcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0Y29uc3QgbmF2VGFiRmxvdyA9IGFzeW5jIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdGNvbnN0IG5hdlRhYlVybCA9IFV0aWxzLmZvcm1hdFVybChWLmNhbnZhcy5hcGkudXJscy5uYXZpZ2F0aW9uX3RhYnMsIHtcclxuXHRcdFx0cGVyUGFnZTogMjUsXHJcblx0XHRcdGNvdXJzZUlEOiBEQVRBLmNvdXJzZUlEXHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IG5hdlRhYnMgPSBhd2FpdCBVdGlscy5nZXRKU09OPENhbnZhc0FQSS5UYWJbXT4obmF2VGFiVXJsKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IHRhYiBvZiBuYXZUYWJzKVxyXG5cdFx0XHREQVRBLm5hdlRhYnMuc2V0KHRhYi5pZCwgbmV3IE5hdlRhYih0YWIpKTtcclxuXHJcblx0fTtcclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gICAgICAgICAgICAgIGFzc2lnbm1lbnRzXHJcblx0Ly8gIHJlcXVpcmVzOiBtb2R1bGVzIG9yIGdyYWRlcyBwYWdlXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdGNvbnN0IGFzc2lnbm1lbnRGbG93ID0gYXN5bmMgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8gaG9wZWZ1bGx5IDEwMDAgaXMgZW5vdWdoIHRvIGdldCBhbGwgaW4gb25lIGdvXHJcblx0XHRjb25zdCBhc3NpZ25tZW50c1VybCA9IFV0aWxzLmZvcm1hdFVybChWLmNhbnZhcy5hcGkudXJscy5hc3NpZ25tZW50cywge1xyXG5cdFx0XHRwZXJQYWdlOiAxMDAwLFxyXG5cdFx0XHRjb3Vyc2VJRDogREFUQS5jb3Vyc2VJRFxyXG5cdFx0fSk7XHJcblx0XHRjb25zdCBhc3NpZ25tZW50cyA9IGF3YWl0IFV0aWxzLmdldEpTT048Q2FudmFzQVBJLkFzc2lnbm1lbnRbXT4oYXNzaWdubWVudHNVcmwpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgYXNzaWdubWVudEpzb24gb2YgYXNzaWdubWVudHMpIHtcclxuXHJcblx0XHRcdGxldCBjb250ZW50SWQ6IG51bWJlcjtcclxuXHRcdFx0aWYgKGFzc2lnbm1lbnRKc29uLnF1aXpfaWQpXHJcblx0XHRcdFx0Y29udGVudElkID0gYXNzaWdubWVudEpzb24ucXVpel9pZDtcclxuXHRcdFx0ZWxzZSBpZiAoYXNzaWdubWVudEpzb24uZGlzY3Vzc2lvbl90b3BpYylcclxuXHRcdFx0XHRjb250ZW50SWQgPSBhc3NpZ25tZW50SnNvbi5kaXNjdXNzaW9uX3RvcGljLmlkO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0Y29udGVudElkID0gYXNzaWdubWVudEpzb24uaWQ7XHJcblxyXG5cdFx0XHRsZXQgaXRlbTogTW9kdWxlSXRlbTtcclxuXHRcdFx0aWYgKE1vZHVsZUl0ZW0uYnlDb250ZW50SWQuaGFzKGNvbnRlbnRJZCkpXHJcblx0XHRcdFx0aXRlbSA9IE1vZHVsZUl0ZW0uYnlDb250ZW50SWQuZ2V0KGNvbnRlbnRJZCk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRpdGVtID0gTW9kdWxlSXRlbS5mcm9tQ29udGVudElkKGNvbnRlbnRJZCk7XHJcblxyXG5cdFx0XHRpdGVtLnNldEFzc2lnbm1lbnRJZChhc3NpZ25tZW50SnNvbi5pZCk7XHJcblxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vICAgICAgIG1vZHVsZXMsIGl0ZW1zLCBhbmQgZmlsZXNcclxuXHQvLyAgcmVxdWlyZXM6IG1vZHVsZXMgb3IgZ3JhZGVzIHBhZ2VcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0Y29uc3QgbW9kdWxlSXRlbUZsb3cgPSBhc3luYyBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyA9PT09PSBtb2R1bGVzID09PT09XHJcblxyXG5cdFx0Y29uc3QgbW9kdWxlc1VybCA9IFV0aWxzLmZvcm1hdFVybChWLmNhbnZhcy5hcGkudXJscy5tb2R1bGVzLCB7XHJcblx0XHRcdHBlclBhZ2U6IDI1LFxyXG5cdFx0XHRjb3Vyc2VJRDogREFUQS5jb3Vyc2VJRFxyXG5cdFx0fSk7XHJcblx0XHRjb25zdCBtb2R1bGVzID0gYXdhaXQgVXRpbHMuZ2V0SlNPTjxDYW52YXNBUEkuTW9kdWxlW10+KG1vZHVsZXNVcmwpO1xyXG5cdFx0Zm9yIChjb25zdCBtb2R1bGVEYXRhIG9mIG1vZHVsZXMpIHtcclxuXHRcdFx0REFUQS5tb2R1bGVzLnNldChtb2R1bGVEYXRhLmlkLCBuZXcgTW9kdWxlKG1vZHVsZURhdGEpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyA9PT09PSBtb2R1bGUgaXRlbXMgPT09PT1cclxuXHJcblx0XHRjb25zdCBtb2R1bGVJZHMgPSBBcnJheS5mcm9tKERBVEEubW9kdWxlcy5rZXlzKCkpO1xyXG5cdFx0Y29uc3QgaXRlbVNldFByb21pc2VzOiBBcnJheTxQcm9taXNlPENhbnZhc0FQSS5Nb2R1bGVJdGVtW10+PiA9XHJcblx0XHRcdG1vZHVsZUlkcy5tYXAobW9kSWQgPT4gREFUQS5tb2R1bGVzLmdldChtb2RJZCkpXHJcblx0XHRcdFx0LmZpbHRlcihtb2QgPT4gbW9kLml0ZW1Db3VudCA+IDApXHJcblx0XHRcdFx0Lm1hcChtb2R1bGUgPT4ge1xyXG5cclxuXHRcdFx0XHRcdGNvbnN0IG1vZHVsZUl0ZW1zVXJsID0gVXRpbHMucGVyUGFnZShcclxuXHRcdFx0XHRcdFx0VXRpbHMuZm9ybWF0VXJsKFYuY2FudmFzLmFwaS51cmxzLm1vZHVsZV9pdGVtcywge1xyXG5cdFx0XHRcdFx0XHRcdG1vZHVsZUlEOiBtb2R1bGUuaWQsXHJcblx0XHRcdFx0XHRcdFx0Y291cnNlSUQ6IERBVEEuY291cnNlSURcclxuXHRcdFx0XHRcdFx0fSksXHJcblx0XHRcdFx0XHRcdG1vZHVsZS5pdGVtQ291bnQpO1xyXG5cclxuXHRcdFx0XHRcdC8vIHJldHVybiB0aGUgcHJvbWlzZSBpbnN0ZWFkIG9mIGF3YWl0aW5nIG9uIHRoaXMgc28gaXQgY2FuIGJlIHVzZWQgaW4gUHJvbWlzZS5hbGxcclxuXHRcdFx0XHRcdHJldHVybiBVdGlscy5nZXRKU09OPENhbnZhc0FQSS5Nb2R1bGVJdGVtW10+KG1vZHVsZUl0ZW1zVXJsKTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0Y29uc3QgbW9kdWxlSXRlbVNldHM6IENhbnZhc0FQSS5Nb2R1bGVJdGVtW11bXSA9IGF3YWl0IFByb21pc2UuYWxsKGl0ZW1TZXRQcm9taXNlcyk7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBpdGVtcyBvZiBtb2R1bGVJdGVtU2V0cykge1xyXG5cclxuXHRcdFx0Y29uc3QgbW9kdWxlID0gREFUQS5tb2R1bGVzLmdldChpdGVtc1swXS5tb2R1bGVfaWQpO1xyXG5cclxuXHRcdFx0Zm9yIChjb25zdCBtb2RJdGVtSnNvbiBvZiBpdGVtcykge1xyXG5cclxuXHRcdFx0XHRsZXQgaXRlbTogTW9kdWxlSXRlbTtcclxuXHRcdFx0XHRjb25zdCBjb250ZW50SWQgPSBtb2RJdGVtSnNvbi5jb250ZW50X2lkO1xyXG5cclxuXHRcdFx0XHRpZiAoTW9kdWxlSXRlbS5ieUNvbnRlbnRJZC5oYXMoY29udGVudElkKSlcclxuXHRcdFx0XHRcdGl0ZW0gPSBNb2R1bGVJdGVtLmJ5Q29udGVudElkLmdldChjb250ZW50SWQpO1xyXG5cdFx0XHRcdGVsc2UgaWYgKGNvbnRlbnRJZClcclxuXHRcdFx0XHRcdGl0ZW0gPSBNb2R1bGVJdGVtLmZyb21Db250ZW50SWQoY29udGVudElkKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRpdGVtID0gbmV3IE1vZHVsZUl0ZW0oKTtcclxuXHJcblx0XHRcdFx0aXRlbS51cGRhdGUobW9kSXRlbUpzb24pO1xyXG5cclxuXHRcdFx0XHREQVRBLm1vZHVsZUl0ZW1zLnNldChtb2RJdGVtSnNvbi5pZCwgaXRlbSk7XHJcblx0XHRcdFx0bW9kdWxlLml0ZW1zLnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09PT0gZmlsZSBtb2R1bGUgaXRlbXMgPT09PT1cclxuXHJcblx0XHRjb25zdCBmaWxlSXRlbXMgPSBBcnJheS5mcm9tKERBVEEubW9kdWxlSXRlbXMudmFsdWVzKCkpXHJcblx0XHRcdC5maWx0ZXIoaXRlbSA9PiBpdGVtLnR5cGUgPT09IE1vZHVsZUl0ZW1UeXBlLkZJTEUpO1xyXG5cclxuXHRcdGNvbnN0IGZpbGVQcm9taXNlczogQXJyYXk8UHJvbWlzZTxDYW52YXNBUEkuRmlsZT4+ID0gZmlsZUl0ZW1zLm1hcChpdGVtID0+IHtcclxuXHRcdFx0Y29uc3QgZmlsZURhdGFVcmwgPSBVdGlscy5mb3JtYXRVcmwoVi5jYW52YXMuYXBpLnVybHMuZmlsZV9kaXJlY3QsIHtcclxuXHRcdFx0XHRmaWxlSUQ6IGl0ZW0uY29udGVudElkLFxyXG5cdFx0XHRcdGNvdXJzZUlEOiBEQVRBLmNvdXJzZUlEXHJcblx0XHRcdH0pO1xyXG5cdFx0XHQvLyByZXR1cm4gcHJvbWlzZSBmb3IgUHJvbWlzZS5hbGxcclxuXHRcdFx0cmV0dXJuIFV0aWxzLmdldEpTT048Q2FudmFzQVBJLkZpbGU+KGZpbGVEYXRhVXJsKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnN0IGZpbGVzOiBDYW52YXNBUEkuRmlsZVtdID0gYXdhaXQgUHJvbWlzZS5hbGwoZmlsZVByb21pc2VzKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpXHJcblx0XHRcdE1vZHVsZUl0ZW0uYnlDb250ZW50SWQuZ2V0KGZpbGUuaWQpLnNldEZpbGVEYXRhKGZpbGUpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyAgICAgICAgICAgICAgY3VzdG9tIGRhdGFcclxuXHQvLyAgcmVxdWlyZXM6IG1vZHVsZXMgb3IgZ3JhZGVzIHBhZ2VcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0Y29uc3QgY3VzdG9tRGF0YUZsb3cgPSBhc3luYyBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRjb25zdCBjdXN0b21EYXRhVXJsID0gVXRpbHMuZm9ybWF0VXJsKFYuY2FudmFzLmFwaS51cmxzLmN1c3RvbV9kYXRhLCB7ZGF0YVBhdGg6IFwiXCJ9KTtcclxuXHRcdGNvbnN0IGN1c3RvbURhdGE6IENhbnZhc0FQSS5DdXN0b21EYXRhID0gKFxyXG5cdFx0XHRhd2FpdCBVdGlscy5nZXRKU09OPHtkYXRhOiBDYW52YXNBUEkuQ3VzdG9tRGF0YX0+KGN1c3RvbURhdGFVcmwpXHJcblx0XHQpLmRhdGE7XHJcblxyXG5cdFx0Ly8gdGhpcyBoYXBwZW5zIHdoZW4gdGhlcmUgd2FzIGFuIGlzc3VlIGdldHRpbmcgdGhlIGRhdGEgb3IgdGhlcmUgd2FzIG5vIGRhdGEgYXQgYWxsXHJcblx0XHQvLyBUT0RPIGZpZ3VyZSBvdXQgd2hhdCB0byBkbyBoZXJlXHJcblx0XHRpZiAoY3VzdG9tRGF0YSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG5cdFx0Ly8gPT09PT0gbG9hZCBjb21wbGV0ZSAvIGhpZGRlbiBhc3NpZ25tZW50cyA9PT09PVxyXG5cclxuXHRcdGNvbnN0IGNvbXBsZXRlID0gVXRpbHMuZ2V0T3JEZWZhdWx0KGN1c3RvbURhdGEuY29tcGxldGVkX2Fzc2lnbm1lbnRzLCBEQVRBLmNvdXJzZUlELCBuZXcgQXJyYXk8bnVtYmVyPigpKTtcclxuXHRcdGNvbnN0IGhpZGRlbiA9IFV0aWxzLmdldE9yRGVmYXVsdChjdXN0b21EYXRhLmhpZGRlbl9hc3NpZ25tZW50cywgREFUQS5jb3Vyc2VJRCwgbmV3IEFycmF5PG51bWJlcj4oKSk7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBbbW9kSXRlbUlkLCBtb2RJdGVtXSBvZiBEQVRBLm1vZHVsZUl0ZW1zKSB7XHJcblx0XHRcdG1vZEl0ZW0uY2hlY2tlZCA9IGNvbXBsZXRlLmluY2x1ZGVzKG1vZEl0ZW1JZCk7XHJcblx0XHRcdG1vZEl0ZW0uaGlkZGVuID0gaGlkZGVuLmluY2x1ZGVzKG1vZEl0ZW1JZCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09PT0gbG9hZCBhY3RpdmUgc3RhdGUgbGlzdCA9PT09PVxyXG5cclxuXHRcdGNvbnN0IGFjdGl2ZVN0YXRlczogc3RyaW5nW10gPSBjdXN0b21EYXRhLmFjdGl2ZV9zdGF0ZXMgfHwgW107XHJcblxyXG5cdFx0Ly8gbG9hZCBzdGF0ZXMgZnJvbSBjb25maWdcclxuXHRcdCQuZWFjaChWLnN0YXRlLCAobmFtZSwgc3RhdGVEYXRhKSA9PiB7XHJcblx0XHRcdGNvbnN0IHN0YXRlT2JqID0gbmV3IFN0YXRlKG5hbWUsIHN0YXRlRGF0YSwgYWN0aXZlU3RhdGVzLmluY2x1ZGVzKG5hbWUpKTtcclxuXHRcdFx0REFUQS5zdGF0ZXMuc2V0KG5hbWUsIHN0YXRlT2JqKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vID09PT09IGxvYWQgdGFicyBwb3NpdGlvbnMgPT09PT1cclxuXHJcblx0XHRjb25zdCB0YWJQb3NpdGlvbnM6IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9ID0gVXRpbHMuZ2V0T3JEZWZhdWx0KGN1c3RvbURhdGEudGFiX3Bvc2l0aW9ucywgREFUQS5jb3Vyc2VJRCwge30pO1xyXG5cclxuXHRcdGZvciAoY29uc3QgW3RhYklkLCBuYXZUYWJdIG9mIERBVEEubmF2VGFicykge1xyXG5cdFx0XHRpZiAodGFiUG9zaXRpb25zW3RhYklkXSAhPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdG5hdlRhYi5zZXRQb3NpdGlvbih0YWJQb3NpdGlvbnNbdGFiSWRdKTtcclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gICAgICAgICBydW4gYWxsIGFzeW5jIHRhc2tzXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdGNvbnN0IHByb21pc2VzID0gW2NvdXJzZVRhYkZsb3coKV07XHJcblxyXG5cdGlmIChEQVRBLmNvdXJzZVBhZ2UgIT09IG51bGwpXHJcblx0XHRwcm9taXNlcy5wdXNoKG5hdlRhYkZsb3coKSk7XHJcblxyXG5cdGlmIChEQVRBLm9uTWFpblBhZ2UpXHJcblx0XHRwcm9taXNlcy5wdXNoKGFzc2lnbm1lbnRGbG93KCksIG1vZHVsZUl0ZW1GbG93KCkpO1xyXG5cclxuXHRhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XHJcblxyXG5cdC8vIHJ1biBjdXN0b20gZGF0YSBmbG93IGFmdGVyIGV2ZXJ5dGhpbmdcclxuXHRpZiAoREFUQS5vbk1haW5QYWdlKSBhd2FpdCBjdXN0b21EYXRhRmxvdygpO1xyXG5cclxuXHRyZXR1cm4gcGVyZm9ybWFuY2Uubm93KCkgLSBpbml0U3RhcnQ7XHJcblxyXG59KSgpXHJcbi5jYXRjaCgocmVhc29uOiBFeGNlcHRpb24gfCBhbnkpID0+IHtcclxuXHQvLyBFeGNlcHRpb25zIGFyZSBpbnRlbnRpb25hbGx5IHRocm93IGJ5IG15IGNvZGVcclxuXHRpZiAocmVhc29uIGluc3RhbmNlb2YgRXhjZXB0aW9uKSB7XHJcblx0XHRpZiAocmVhc29uLmlzRmF0YWwpIHRocm93IG5ldyBFcnJvcihyZWFzb24udG9TdHJpbmcoKSk7XHJcblx0XHRlbHNlIGNvbnNvbGUud2FybihcIkV4Y2VwdGlvbiBpbiBpbml0OlwiLCByZWFzb24udG9TdHJpbmcoKSk7XHJcblx0fVxyXG5cdGVsc2UgeyAvLyBhbnl0aGluZyBlbHNlIGlzIHVua25vd24gYW5kIGlzIGEgcHJvYmxlbVxyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBlcnJvciBpbiBpbml0OiBcIiArIHJlYXNvbik7XHJcblx0fVxyXG59KVxyXG4udGhlbigodG90YWxEdXJhdGlvbjogbnVtYmVyKSA9PiB7XHJcblx0Y29uc29sZS5kZWJ1ZyhgSW5pdGlhbGl6YXRpb24gY29tcGxldGVkIGluICR7TWF0aC5yb3VuZCh0b3RhbER1cmF0aW9uKX1tc2ApO1xyXG5cdE1haW4uaW5pdFBhZ2UoKTtcclxuXHRjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoTWFpbi5vbk1lc3NhZ2UpO1xyXG59KTtcclxuXHJcbmNsYXNzIE1haW4ge1xyXG5cclxuXHRzdGF0aWMgaW5pdFBhZ2UoKSB7XHJcblxyXG5cdFx0UEFHRS5pbml0aWFsaXplKCk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLnNjcm9sbChVSS51cGRhdGVTY3JvbGxQb3NpdGlvbik7XHJcblx0XHQkKGRvY3VtZW50KS5yZWFkeShVSS51cGRhdGVTY3JvbGxQb3NpdGlvbik7XHJcblxyXG5cdFx0Ly8gPT09PT09PT09PT09PT09IG1pc2MgZ2xvYmFsIGluaXQgc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRcdC8vIHJlbW92aW5nIGFsbCByZXBlYXRlZCB3aGl0ZXNwYWNlIGluIGNsYXNzIGF0dHJpYnV0ZXNcclxuXHRcdCQoXCJbY2xhc3NdXCIpLmF0dHIoXCJjbGFzc1wiLCAoaSwgb2xkQ2xhc3MpID0+IChvbGRDbGFzcy5tYXRjaCgvXFxTKy9nKSB8fCBbXSkuam9pbihcIiBcIikpO1xyXG5cclxuXHRcdC8vIGNsZWFuIHVwIGdyYWRlIHRhYmxlXHJcblx0XHQkKFwiI2dyYWRlc19zdW1tYXJ5IHRib2R5XCIpXHJcblx0XHQuZmluZChcInRyLmdyb3VwX3RvdGFsLCB0ci5maW5hbF9ncmFkZVwiKVxyXG5cdFx0LmZpbmQoXCJ0ZC5wb2ludHNfcG9zc2libGVcIikuYXR0cihcImNvbHNwYW5cIiwgXCIzXCIpLmNzcyhcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIikuZW5kKClcclxuXHRcdC5maW5kKFwidGQuZGV0YWlscywgdGQuc3RhdHVzXCIpLnJlbW92ZSgpO1xyXG5cclxuXHRcdC8vIG1ha2UgdGhlIGNvdXJzZSBidXR0b24gdGFrZSB5b3UgdG8gXCJhbGwgY291cnNlc1wiIGFuZCBjaGFuZ2UgdGhlIHRleHQgdG8gc2F5IHNvXHJcblx0XHRjb25zdCBvcmlnQ291cnNlTmF2ID0gJChcIiNnbG9iYWxfbmF2X2NvdXJzZXNfbGlua1wiKTtcclxuXHRcdGNvbnN0IG5ld0NvdXJzZU5hdiA9ICQoXCI8YT5cIilcclxuXHRcdFx0LmF0dHIoXCJocmVmXCIsIFwiL2NvdXJzZXNcIilcclxuXHRcdFx0LmFkZENsYXNzKFwiaWMtYXBwLWhlYWRlcl9fbWVudS1saXN0LWxpbmtcIilcclxuXHRcdFx0Lmh0bWwob3JpZ0NvdXJzZU5hdi5wcm9wKFwiaW5uZXJIVE1MXCIpKTtcclxuXHJcblx0XHRjb25zdCBjb3Vyc2VOYXZMaSA9IG9yaWdDb3Vyc2VOYXYucGFyZW50KCk7XHJcblx0XHRvcmlnQ291cnNlTmF2LnJlbW92ZSgpO1xyXG5cdFx0Y291cnNlTmF2TGlcclxuXHRcdFx0LmFwcGVuZChuZXdDb3Vyc2VOYXYpXHJcblx0XHRcdC5maW5kKFwiLm1lbnUtaXRlbV9fdGV4dFwiKVxyXG5cdFx0XHQudGV4dChcIkFsbCBDb3Vyc2VzXCIpO1xyXG5cclxuXHRcdC8vID09PSBpbnNlcnQgY291cnNlIGxpbmtzID09PVxyXG5cclxuXHRcdGNvbnN0ICRpbnNlcnRpb25Qb2ludCA9IFBBR0Uuc2lkZWJhci5jaGlsZHJlbigpLmVxKDIpO1xyXG5cdFx0Zm9yIChjb25zdCBbdGFiSUQsIGNvdXJzZVRhYl0gb2YgREFUQS5jb3Vyc2VUYWJzKSB7XHJcblx0XHRcdCRpbnNlcnRpb25Qb2ludC5hZnRlcihcclxuXHRcdFx0XHRVdGlscy5mb3JtYXQoVi5lbGVtZW50LmNvdXJzZV9saW5rLCB7XHJcblx0XHRcdFx0XHR0YWJDb2xvcjogY291cnNlVGFiLmNvbG9yLFxyXG5cdFx0XHRcdFx0dGFiSUQsXHJcblx0XHRcdFx0XHRuYW1lOiBjb3Vyc2VUYWIubmFtZSxcclxuXHRcdFx0XHRcdGNvZGU6IGNvdXJzZVRhYi5jb2RlXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyA9PT0gcGxhY2UgXCJqdW1wIHRvIHRvcFwiIGJ1dHRvbiA9PT1cclxuXHJcblx0XHREQVRBLmVsZW1lbnRzLmp1bXBfYnV0dG9uID1cclxuXHRcdFx0JChWLmVsZW1lbnQuanVtcF9idXR0b24pXHJcblx0XHRcdC5maW5kKFwiaVwiKVxyXG5cdFx0XHQuY2xpY2soKCkgPT4ge1xyXG5cdFx0XHRcdGlmIChQQUdFLnNjcm9sbGluZ0VsZW1lbnQucHJvcChcInNjcm9sbFRvcFwiKSA+IDApXHJcblx0XHRcdFx0XHQkKFwiYm9keVwiKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCBWLnVpLnNjcm9sbF90aW1lKTtcclxuXHRcdFx0fSlcclxuXHRcdFx0LmVuZCgpXHJcblx0XHRcdC5hcHBlbmRUbyhQQUdFLm1haW4pO1xyXG5cclxuXHRcdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdC8vICAgICAgICAgICAgICAgICAgIGNvdXJzZSBwYWdlIGN1dG9mZlxyXG5cdFx0Ly8gICAgICBldmVyeXRoaW5nIGJlbG93IHRoaXMgcG9pbnQgaXMgZm9yIGNvdXJzZSBwYWdlc1xyXG5cdFx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0aWYgKERBVEEuY291cnNlUGFnZSA9PT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuXHRcdC8vID09PT0gY2xlYXIgdGhlIGFjdGl2ZSBtZW51IHRhYiBzaW5jZSB3ZSdyZSB1c2luZyBjdXN0b20gdGFicyA9PT09XHJcblxyXG5cdFx0JChcInVsI21lbnUgPiBsaVwiKS5yZW1vdmVDbGFzcyhcImljLWFwcC1oZWFkZXJfX21lbnUtbGlzdC1pdGVtLS1hY3RpdmVcIik7XHJcblxyXG5cdFx0Ly8gPT09IGxvYWQgaW5pdGlhbCBzdGF0ZXMgPT09XHJcblxyXG5cdFx0Zm9yIChjb25zdCBbLCBzdGF0ZV0gb2YgREFUQS5zdGF0ZXMpIHtcclxuXHRcdFx0aWYgKHN0YXRlLmFjdGl2ZSAmJiBzdGF0ZS5vblBhZ2VzLmluY2x1ZGVzKERBVEEuY291cnNlUGFnZSkpXHJcblx0XHRcdFx0UEFHRS5ib2R5LmFkZENsYXNzKHN0YXRlLmJvZHlDbGFzcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09PSBhcHBseSBjb3Vyc2UgY29sb3IgdG8gYnJhbmQgY29sb3JzID09PT1cclxuXHJcblx0XHRpZiAoREFUQS5jb3Vyc2VUYWJzLmhhcyhEQVRBLmNvdXJzZUlEKSkge1xyXG5cdFx0XHRjb25zdCBjb2xvciA9IERBVEEuY291cnNlVGFicy5nZXQoREFUQS5jb3Vyc2VJRCkuY29sb3I7XHJcblx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0taWMtYnJhbmQtcHJpbWFyeVwiLCBjb2xvcik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09PSBjbGVhciBlbXB0eSBuYXYgdGFicyA9PT1cclxuXHJcblx0XHQkKFYuY2FudmFzLnNlbGVjdG9yLm5hdl90YWJzKS5maW5kKFwibGk6ZW1wdHlcIikucmVtb3ZlKCk7XHJcblxyXG5cdFx0Ly8gPT09PSBhcHBseSB0aGUgY3VzdG9tIG5hdiB0YWIgcG9zaXRpb25zID09PVxyXG5cclxuXHRcdEFycmF5LmZyb20oREFUQS5uYXZUYWJzLnZhbHVlcygpKS5maWx0ZXIodGFiID0+IHRhYi5oYXNDdXN0b21Qb3NpdGlvbilcclxuXHRcdFx0LnNvcnQoKHRhYkEsIHRhYkIpID0+IHRhYkEucG9zaXRpb24gLSB0YWJCLnBvc2l0aW9uKVxyXG5cdFx0XHQuZm9yRWFjaChVSS51cGRhdGVOYXZUYWJQb3NpdGlvbik7XHJcblxyXG5cdFx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgIG1haW4gcGFnZSBjdXRvZmZcclxuXHRcdC8vICBldmVyeXRoaW5nIGJlbG93IHRoaXMgaXMgb25seSBmb3IgbW9kdWxlcy9ncmFkZXMgcGFnZXNcclxuXHRcdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdGlmICghREFUQS5vbk1haW5QYWdlKSByZXR1cm47XHJcblxyXG5cdFx0Ly8gPT09IHBsYWNlIGNoZWNrYm94ZXMgJiBoaWRlIGJ1dHRvbnMgPT09XHJcblxyXG5cdFx0Zm9yIChjb25zdCBbaXRlbUlkLCBpdGVtXSBvZiBEQVRBLm1vZHVsZUl0ZW1zKSB7XHJcblxyXG5cdFx0XHRjb25zdCBtYWluRWwgPSAkKFwiI1wiICsgaXRlbS5jYW52YXNFbGVtZW50SWQpO1xyXG5cdFx0XHRsZXQgcGFyZW50RWw6IEpRdWVyeTtcclxuXHRcdFx0bGV0IGhhc0NoZWNrYm94OiBib29sZWFuO1xyXG5cdFx0XHRsZXQgaGFzSGlkZUJ1dHRvbjogYm9vbGVhbjtcclxuXHJcblx0XHRcdGl0ZW0uY2hlY2tib3hFbGVtZW50ID0gbnVsbDtcclxuXHRcdFx0aXRlbS5oaWRlRWxlbWVudCA9IG51bGw7XHJcblxyXG5cdFx0XHRpZiAoREFUQS5jb3Vyc2VQYWdlID09PSBDYW52YXNQYWdlLk1PRFVMRVMpIHtcclxuXHRcdFx0XHRwYXJlbnRFbCA9IG1haW5FbC5maW5kKFwiZGl2LmlnLXJvd1wiKTtcclxuXHJcblx0XHRcdFx0aGFzSGlkZUJ1dHRvbiA9IHRydWU7XHJcblx0XHRcdFx0aGFzQ2hlY2tib3ggPSAhaXRlbS5pc1N1YkhlYWRlcjtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChEQVRBLmNvdXJzZVBhZ2UgPT09IENhbnZhc1BhZ2UuR1JBREVTKSB7XHJcblx0XHRcdFx0cGFyZW50RWwgPSAkKFwiPHRkPlwiKVxyXG5cdFx0XHRcdFx0LmFkZENsYXNzKFYuY3NzQ2xhc3MuY2hlY2tib3hfdGQpXHJcblx0XHRcdFx0XHQucHJlcGVuZFRvKG1haW5FbCk7XHJcblxyXG5cdFx0XHRcdGhhc0hpZGVCdXR0b24gPSBmYWxzZTtcclxuXHRcdFx0XHRoYXNDaGVja2JveCA9IGl0ZW0uaXNHcmFkZWQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChoYXNDaGVja2JveCkge1xyXG5cdFx0XHRcdGl0ZW0uY2hlY2tib3hFbGVtZW50ID1cclxuXHRcdFx0XHRcdCQoVXRpbHMuZm9ybWF0KFYuZWxlbWVudC5jaGVja2JveCwge2l0ZW1faWQ6IGl0ZW1JZH0pKS5hcHBlbmRUbyhwYXJlbnRFbCk7XHJcblxyXG5cdFx0XHRcdFVJLnVwZGF0ZUNoZWNrYm94KGl0ZW0pO1xyXG5cdFx0XHRcdGl0ZW0uY2hlY2tib3hFbGVtZW50LnNob3coKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoaGFzSGlkZUJ1dHRvbikge1xyXG5cdFx0XHRcdGl0ZW0uaGlkZUVsZW1lbnQgPVxyXG5cdFx0XHRcdFx0JChVdGlscy5mb3JtYXQoVi5lbGVtZW50LmhpZGVfYnV0dG9uLCB7aXRlbV9pZDogaXRlbUlkfSkpLmFwcGVuZFRvKHBhcmVudEVsKTtcclxuXHJcblx0XHRcdFx0Ly8gdGhpcyBmdW5jdGlvbiBpcyBhc3luYywgYnV0IHdpdGggc2Vjb25kIGFyZ3VtZW50ICd0cnVlJywgaXQgdXBkYXRlcyBpbnN0YW50bHlcclxuXHRcdFx0XHRVSS51cGRhdGVJdGVtSGlkZShpdGVtLCB0cnVlKTtcclxuXHRcdFx0XHRpdGVtLmhpZGVFbGVtZW50LnNob3coKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyA9PT0gZml4IGdyYWRlIGNoZWNrYm94ZXMgc2luY2UgdGhleSdyZSBpbiB0aGUgdGFibGUgPT09XHJcblx0XHRpZiAoREFUQS5jb3Vyc2VQYWdlID09PSBDYW52YXNQYWdlLkdSQURFUykge1xyXG5cdFx0XHRQQUdFLmdyYWRlc1xyXG5cdFx0XHRcdC5maW5kKFwidGRbY29sc3Bhbj0nNSddXCIpXHJcblx0XHRcdFx0LmF0dHIoXCJjb2xzcGFuXCIsIDYpXHJcblx0XHRcdFx0LmVuZCgpLmZpbmQoXCI+IHRoZWFkID4gdHJcIilcclxuXHRcdFx0XHQucHJlcGVuZCgkKFwiPHRoPlwiKVxyXG5cdFx0XHRcdFx0LmF0dHIoXCJzY29wZVwiLCBcImNvbFwiKVxyXG5cdFx0XHRcdFx0LmFwcGVuZChcIjxpIGNsYXNzPSdpY29uLWNoZWNrJz48L2k+XCIpXHJcblx0XHRcdFx0KVxyXG5cdFx0XHRcdC5lbmQoKS5maW5kKFwidHIuc3R1ZGVudF9hc3NpZ25tZW50XCIpXHJcblx0XHRcdFx0LnByZXBlbmQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gJCh0aGlzKS5oYXMoXCJ0ZDpmaXJzdC1jaGlsZFwiKS5sZW5ndGggPT09IDAgP1xyXG5cdFx0XHRcdFx0XHQkKFwiPHRkPlwiKS5hZGRDbGFzcyhWLmNzc0NsYXNzLmNoZWNrYm94X3RkKSA6IHVuZGVmaW5lZDtcclxuXHRcdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyA9PT0gYWRkIGNoYW5nZSBldmVudCBmb3IgY2hlY2tib3hlcyA9PT1cclxuXHJcblx0XHRQQUdFLm1haW4ub24oXCJjaGFuZ2VcIiwgYC4ke1YuY3NzQ2xhc3MuY2hlY2tib3hfcGFyZW50fSA+IGlucHV0YCwgYXN5bmMgZnVuY3Rpb24oKSB7XHJcblx0XHRcdGF3YWl0IE1haW4ub25DaGVja2JveENoYW5nZSh0aGlzIGFzIEhUTUxJbnB1dEVsZW1lbnQpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICBtb2R1bGVzIHBhZ2UgY3V0b2ZmXHJcblx0XHQvLyAgICAgICAgZXZlcnl0aGluZyBiZWxvdyBoZXJlIGlzIG9ubHkgb24gdGhlIG1vZHVsZXMgcGFnZVxyXG5cdFx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0aWYgKERBVEEuY291cnNlUGFnZSAhPT0gQ2FudmFzUGFnZS5NT0RVTEVTKSByZXR1cm47XHJcblxyXG5cdFx0Ly8gPT09IGNsZWFuIHVwIGVtcHR5IG1vZHVsZXMgPT09XHJcblx0XHQkKFYuY2FudmFzLnNlbGVjdG9yLm1vZHVsZV9pdGVtcykuZmlsdGVyKChpLCBlbCkgPT4gIWVsLmlubmVySFRNTC50cmltKCkubGVuZ3RoKS5odG1sKFwiXCIpO1xyXG5cclxuXHRcdC8vID09PSBzZXR1cCBhbmQgYXBwbHkgY3VzdG9tIGluZGVudHMgPT09XHJcblxyXG5cdFx0Y29uc3QgZGlzYWJsZWRJbmRlbnRTdGF0ZSA9IERBVEEuc3RhdGVzLmdldChcImRpc2FibGVfaW5kZW50X292ZXJyaWRlXCIpO1xyXG5cdFx0Y29uc3QgZGlzYWJsZWRJbmRlbnQgPSBkaXNhYmxlZEluZGVudFN0YXRlLmFjdGl2ZTtcclxuXHJcblx0XHRkaXNhYmxlZEluZGVudFN0YXRlLm9uRW5hYmxlID0gKCkgPT4ge1xyXG5cdFx0XHQkKFYuY2FudmFzLnNlbGVjdG9yLm1vZHVsZV9pdGVtKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFswLDEsMiwzLDQsNV0uZm9yRWFjaChsZXZlbCA9PiAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiaW5kZW50X1wiICsgbGV2ZWwpKTtcclxuXHRcdFx0XHRjb25zdCBkZWZMZXZlbCA9ICQodGhpcykuYXR0cihWLmRhdGFBdHRyLmRlZl9pbmRlbnQpO1xyXG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoXCJpbmRlbnRfXCIgKyBkZWZMZXZlbCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHRcdGRpc2FibGVkSW5kZW50U3RhdGUub25EaXNhYmxlID0gKCkgPT4ge1xyXG5cdFx0XHRbMCwxLDIsMyw0LDVdLmZvckVhY2gobGV2ZWwgPT4gJChWLmNhbnZhcy5zZWxlY3Rvci5tb2R1bGVfaXRlbSkucmVtb3ZlQ2xhc3MoXCJpbmRlbnRfXCIgKyBsZXZlbCkpO1xyXG5cdFx0XHQkKFYuY2FudmFzLnNlbGVjdG9yLnN1YmhlYWRlcikuYWRkQ2xhc3MoXCJpbmRlbnRfXCIgKyBWLnVpLnN1YmhlYWRlcl9pbmRlbnQpO1xyXG5cdFx0XHQkKFYuY2FudmFzLnNlbGVjdG9yLm5vdF9zdWJoZWFkZXIpLmFkZENsYXNzKFwiaW5kZW50X1wiICsgVi51aS5tYWluX2luZGVudCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdCQoVi5jYW52YXMuc2VsZWN0b3IubW9kdWxlX2l0ZW0pLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnN0IGRlZkluZGVudCA9XHJcblx0XHRcdFx0WzAsMSwyLDMsNCw1XS5maWx0ZXIobGV2ZWwgPT4gJCh0aGlzKS5oYXNDbGFzcyhcImluZGVudF9cIiArIGxldmVsKSlbMF07XHJcblx0XHRcdCQodGhpcykuYXR0cihWLmRhdGFBdHRyLmRlZl9pbmRlbnQsIGRlZkluZGVudCk7XHJcblx0XHRcdGlmICghZGlzYWJsZWRJbmRlbnQpXHJcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcImluZGVudF9cIiArIGRlZkluZGVudCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIWRpc2FibGVkSW5kZW50KSB7XHJcblx0XHRcdCQoVi5jYW52YXMuc2VsZWN0b3Iuc3ViaGVhZGVyKS5hZGRDbGFzcyhcImluZGVudF9cIiArIFYudWkuc3ViaGVhZGVyX2luZGVudCk7XHJcblx0XHRcdCQoVi5jYW52YXMuc2VsZWN0b3Iubm90X3N1YmhlYWRlcikuYWRkQ2xhc3MoXCJpbmRlbnRfXCIgKyBWLnVpLm1haW5faW5kZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyA9PT0gcGxhY2UgYW5kIHBvcHVsYXRlIHRoZSB0YWJsZSBvZiBjb250ZW50cyA9PT1cclxuXHJcblx0XHRjb25zdCB0b2MgPSAkKFYuZWxlbWVudC50b2MpO1xyXG5cdFx0Y29uc3QgdWwgPSB0b2MuZmluZChcInVsXCIpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgW21vZElkLCBtb2RdIG9mIERBVEEubW9kdWxlcykge1xyXG5cclxuXHRcdFx0Y29uc3QgZm9ybWF0dGVkID0gVXRpbHMuZm9ybWF0KFYuZWxlbWVudC50b2NfaXRlbSwge2l0ZW1fbmFtZTogbW9kLm5hbWUsIGl0ZW1faWQ6IG1vZElkfSk7XHJcblx0XHRcdCQoZm9ybWF0dGVkKVxyXG5cdFx0XHRcdC5maW5kKFwiYVwiKVxyXG5cdFx0XHRcdC5jbGljayhlID0+IHtcclxuXHRcdFx0XHRcdGNvbnN0IG1vZHVsZUVsID0gJChcIiNjb250ZXh0X21vZHVsZV9cIiArIG1vZElkKTtcclxuXHRcdFx0XHRcdFVJLnNjcm9sbFRvRWxlbWVudChtb2R1bGVFbCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKG1vZHVsZUVsLmhhc0NsYXNzKFwiY29sbGFwc2VkX21vZHVsZVwiKSlcclxuXHRcdFx0XHRcdFx0bW9kdWxlRWwuZmluZChcIi5leHBhbmRfbW9kdWxlX2xpbmtcIikuY2xpY2soKTtcclxuXHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuZW5kKClcclxuXHRcdFx0XHQuYXBwZW5kVG8odWwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdERBVEEuZWxlbWVudHMudG9jID0gdG9jXHJcblx0XHRcdC5jc3MoXCJ0b3BcIiwgUEFHRS5sZWZ0LmhlaWdodCgpICsgVi51aS50b2NfdG9wX21hcmdpbilcclxuXHRcdFx0LmFwcGVuZFRvKFBBR0UubWFpbilcclxuXHRcdFx0LmRhdGEoXCJjdXRvZmZcIiwgdG9jLm9mZnNldCgpLnRvcCAtIFYudWkudG9jX3RvcF9tYXJnaW4pO1xyXG5cclxuXHRcdEFycmF5LmZyb20oREFUQS5tb2R1bGVzLnZhbHVlcygpKS5mb3JFYWNoKFVJLnVwZGF0ZU1vZHVsZSk7XHJcblxyXG5cdFx0Ly8gPT09IGFkZCBjbGljayBldmVudCBmb3IgaGlkZSBidXR0b25zID09PVxyXG5cclxuXHRcdFBBR0UubWFpbi5vbihcImNsaWNrXCIsIGAuJHtWLmNzc0NsYXNzLmhpZGVfYnV0dG9ufSA+IGlgLCBhc3luYyBmdW5jdGlvbigpIHtcclxuXHRcdFx0YXdhaXQgTWFpbi5vbkhpZGVCdXR0b25DbGljaygkKHRoaXMpKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vID09PSBhZGQgYnV0dG9ucyB0byBGSUxFIGFuZCBFWFRFUk5BTF9VUkwgaXRlbXMgPT09XHJcblxyXG5cdFx0Zm9yIChjb25zdCBbLCBpdGVtXSBvZiBEQVRBLm1vZHVsZUl0ZW1zKSB7XHJcblxyXG5cdFx0XHRpZiAoaXRlbS50eXBlID09PSBNb2R1bGVJdGVtVHlwZS5GSUxFKSB7XHJcblx0XHRcdFx0Y29uc3QgZWxlbWVudCA9IFV0aWxzLmZvcm1hdChWLmVsZW1lbnQuZG93bmxvYWRfYnV0dG9uLCB7XHJcblx0XHRcdFx0XHRmaWxlX3VybDogaXRlbS5maWxlRGF0YS51cmwsXHJcblx0XHRcdFx0XHRmaWxlbmFtZTogaXRlbS5maWxlRGF0YS5kaXNwbGF5X25hbWVcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQkKGVsZW1lbnQpLmluc2VydEJlZm9yZShpdGVtLmNoZWNrYm94RWxlbWVudCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoaXRlbS50eXBlID09PSBNb2R1bGVJdGVtVHlwZS5FWFRFUk5BTF9VUkwpIHtcclxuXHRcdFx0XHRjb25zdCBlbGVtZW50ID0gVXRpbHMuZm9ybWF0KFYuZWxlbWVudC51cmxfYnV0dG9uLCB7XHJcblx0XHRcdFx0XHRleHRlcm5hbF91cmw6IGl0ZW0uZXh0ZXJuYWxVcmxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQkKGVsZW1lbnQpLmluc2VydEJlZm9yZShpdGVtLmNoZWNrYm94RWxlbWVudCk7XHJcblxyXG5cdFx0XHRcdCQoXCIjXCIgKyBpdGVtLmNhbnZhc0VsZW1lbnRJZCkuZmluZChcImEuZXh0ZXJuYWxfdXJsX2xpbmsudGl0bGVcIilcclxuXHRcdFx0XHRcdC5hdHRyKFwiaHJlZlwiLCBmdW5jdGlvbigpIHsgcmV0dXJuICQodGhpcykuYXR0cihcImRhdGEtaXRlbS1ocmVmXCIpOyB9KVxyXG5cdFx0XHRcdFx0LnJlbW92ZUF0dHIoXCJ0YXJnZXQgcmVsXCIpXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoXCJleHRlcm5hbFwiKVxyXG5cdFx0XHRcdFx0LmFkZENsYXNzKFwiaWctdGl0bGVcIilcclxuXHRcdFx0XHRcdC5maW5kKFwiLnVpLWljb25cIikucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQkKFwiLlwiICsgVi5jc3NDbGFzcy5kb3dubG9hZCkuYWRkKFwiLlwiICsgVi5jc3NDbGFzcy5leHRlcm5hbF91cmwpLnNob3coKTtcclxuXHJcblx0fSAvLyBlbmQgaW5pdFBhZ2VcclxuXHJcblx0c3RhdGljIGdldFN0YXRlKHN0YXRlTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRpZiAoREFUQS5zdGF0ZXMuaGFzKHN0YXRlTmFtZSkpIHtcclxuXHRcdFx0Y29uc3Qgc3RhdGUgPSBEQVRBLnN0YXRlcy5nZXQoc3RhdGVOYW1lKTtcclxuXHRcdFx0cmV0dXJuIHN0YXRlLmFjdGl2ZTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyBzZXRTdGF0ZShzdGF0ZU5hbWU6IHN0cmluZywgc3RhdGU6IGJvb2xlYW4pIHtcclxuXHRcdGlmICghREFUQS5zdGF0ZXMuaGFzKHN0YXRlTmFtZSkpIHJldHVybjtcclxuXHJcblx0XHRjb25zdCBzdGF0ZU9iaiA9IERBVEEuc3RhdGVzLmdldChzdGF0ZU5hbWUpO1xyXG5cclxuXHRcdGlmICghc3RhdGVPYmoub25QYWdlcy5pbmNsdWRlcyhEQVRBLmNvdXJzZVBhZ2UpKSByZXR1cm47XHJcblxyXG5cdFx0aWYgKHN0YXRlT2JqLmJvZHlDbGFzcylcclxuXHRcdFx0UEFHRS5ib2R5LnRvZ2dsZUNsYXNzKHN0YXRlT2JqLmJvZHlDbGFzcywgc3RhdGUpO1xyXG5cclxuXHRcdHN0YXRlT2JqLmFjdGl2ZSA9IHN0YXRlO1xyXG5cdFx0c3RhdGVPYmoub25DaGFuZ2Uoc3RhdGUpO1xyXG5cclxuXHRcdGNvbnN0IHVybCA9IFV0aWxzLmZvcm1hdFVybChWLmNhbnZhcy5hcGkudXJscy5jdXN0b21fZGF0YSwge1xyXG5cdFx0XHRkYXRhUGF0aDogXCIvXCIgKyBWLmNhbnZhcy5hcGkuZGF0YV91cmxzLmFjdGl2ZV9zdGF0ZXNcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIFV0aWxzLmVkaXREYXRhQXJyYXkodXJsLCBzdGF0ZSwgW3N0YXRlTmFtZV0pO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHNldE5hdlRhYlBvc2l0aW9uKHRhYjogTmF2VGFiLCBwb3NpdGlvbjogbnVtYmVyKSB7XHJcblxyXG5cdFx0Y29uc3QgdXJsID0gVXRpbHMuZm9ybWF0VXJsKFYuY2FudmFzLmFwaS51cmxzLmN1c3RvbV9kYXRhLCB7XHJcblx0XHRcdGRhdGFQYXRoOiBbXCJcIiwgVi5jYW52YXMuYXBpLmRhdGFfdXJscy50YWJfcG9zaXRpb25zLCBEQVRBLmNvdXJzZUlELCB0YWIuaWRdLmpvaW4oXCIvXCIpXHJcblx0XHR9KTtcclxuXHJcblx0XHRjb25zdCBzdWNjZXNzID0gYXdhaXQgVXRpbHMucHV0RGF0YSh1cmwsIHBvc2l0aW9uKTtcclxuXHJcblx0XHRpZiAoc3VjY2Vzcykge1xyXG5cdFx0XHR0YWIuc2V0UG9zaXRpb24ocG9zaXRpb24pO1xyXG5cdFx0XHRVSS51cGRhdGVOYXZUYWJQb3NpdGlvbih0YWIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRhYiBwb3NpdGlvbiB1cGRhdGUgZmFpbGVkLlwiKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIGVsZW1lbnQgaXMgdGhlIDxpbnB1dD5cclxuXHRzdGF0aWMgYXN5bmMgb25DaGVja2JveENoYW5nZShlbDogSFRNTElucHV0RWxlbWVudCkge1xyXG5cdFx0Y29uc3QgaWQgPSBOdW1iZXIoJChlbCkuYXR0cihWLmRhdGFBdHRyLm1vZF9pdGVtX2lkKSk7XHJcblx0XHRjb25zdCBpdGVtID0gREFUQS5tb2R1bGVJdGVtcy5nZXQoaWQpO1xyXG5cdFx0Y29uc3Qgc3RhdHVzID0gZWwuY2hlY2tlZDtcclxuXHRcdGNvbnN0IG9sZFRpdGxlID0gZWwudGl0bGU7XHJcblxyXG5cdFx0Ly8gcmVzZXQgYmFjayB0byBwcmV2aW91cyBzdGF0ZSB0byBhbGxvdyBmb3IgdmFsaWRhdGlvblxyXG5cdFx0ZWwuY2hlY2tlZCA9ICFzdGF0dXM7XHJcblxyXG5cdFx0Ly8gYmVmb3JlIHVwZGF0aW5nIFwiaXRlbVwiLCBjaGVjayBpZiBpdCdzIGFscmVhZHkgdGhlIHNhbWUuIGlmIHNvLCB3ZSBoYXZlIGEgZGVzeW5jXHJcblx0XHRpZiAoc3RhdHVzID09PSBpdGVtLmNoZWNrZWQpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIkNoZWNrYm94IGRlc3luYyBhdCBpdGVtXCIsIGl0ZW0pO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVE9ETyBjcmVhdGUgYSBiZXR0ZXIgbWV0aG9kIGZvciB3YWl0aW5nLWRpc2FibGUgZm9yIGNoZWNrYm94IGFuZCBoaWRlIGJ1dHRvblxyXG5cdFx0Ly8gLSBoYXZlIGEgZGlmZmVyZW50IGNsYXNzIGFwcGxpZWQgdGhhdCBzZXRzIHRoZSBjdXJzb3IgdG8gd2FpdGluZyBtb2RlIGFuZCBkaW1zIHRoZSBidXR0b25cclxuXHJcblx0XHQvLyBkaXNhYmxlIHVudGlsIHdlIGNvbmZpcm0gd2UgY2FuIHVwZGF0ZSB0aGUgZGF0YVxyXG5cdFx0ZWwuZGlzYWJsZWQgPSB0cnVlO1xyXG5cdFx0ZWwudGl0bGUgPSBWLnRvb2x0aXAud2FpdGluZztcclxuXHJcblx0XHRjb25zdCB1cmwgPSBVdGlscy5mb3JtYXRVcmwoVi5jYW52YXMuYXBpLnVybHMuY3VzdG9tX2RhdGEsIHtcclxuXHRcdFx0ZGF0YVBhdGg6IFtcIlwiLCBWLmNhbnZhcy5hcGkuZGF0YV91cmxzLmNvbXBsZXRlZF9hc3NpZ25tZW50cywgREFUQS5jb3Vyc2VJRF0uam9pbihcIi9cIilcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBVdGlscy5lZGl0RGF0YUFycmF5KHVybCwgc3RhdHVzLCBbaWRdKTtcclxuXHJcblx0XHRlbC5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdFx0ZWwudGl0bGUgPSBvbGRUaXRsZTtcclxuXHJcblx0XHRpZiAoc3VjY2Vzcykge1xyXG5cdFx0XHRpdGVtLmNoZWNrZWQgPSBzdGF0dXM7XHJcblx0XHRcdFVJLnVwZGF0ZU1vZHVsZShpdGVtLm1vZHVsZSk7XHJcblx0XHRcdFVJLnVwZGF0ZUNoZWNrYm94KGl0ZW0pO1xyXG5cdFx0XHRjb25zb2xlLmRlYnVnKGBJdGVtIElEICR7aWR9ICgke2l0ZW0ubmFtZS5zdWJzdHIoMCwgMjUpfS4uLilgICtcclxuXHRcdFx0XHRgaGFzIGJlZW4gJHtlbC5jaGVja2VkID8gXCJcIiA6IFwidW5cIn1jaGVja2VkYCk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0Ly8gZWxlbWVudCBpcyA8aT5cclxuXHRzdGF0aWMgYXN5bmMgb25IaWRlQnV0dG9uQ2xpY2soZWw6IEpRdWVyeSkge1xyXG5cdFx0Y29uc3QgaWQgPSBOdW1iZXIoZWwuYXR0cihWLmRhdGFBdHRyLm1vZF9pdGVtX2lkKSk7XHJcblx0XHRjb25zdCBpdGVtID0gREFUQS5tb2R1bGVJdGVtcy5nZXQoaWQpO1xyXG5cclxuXHRcdC8vIGNhbmNlbCBoaWRpbmcgaWYgdGhlIGl0ZW0gaXMgZ3JhZGVkIG9yIGhhcyBoaWRpbmcgbWFudWFsbHkgZGlzYWJsZWQgZm9yIGFueSBvdGhlciByZWFzb25cclxuXHRcdGlmIChpdGVtLmlzR3JhZGVkIHx8IGl0ZW0uaGlkZUVsZW1lbnQuaGFzQ2xhc3MoVi5jc3NDbGFzcy5oaWRlX2Rpc2FibGVkKSkgcmV0dXJuO1xyXG5cclxuXHRcdC8vIGRpc2FibGUgdW50aWwgdXBkYXRpbmcgY29tcGxldGUuIHRoaXMgaXMgdW5kb25lIGJ5IHVwZGF0ZUhpZGVCdXR0b24gbGF0ZXJcclxuXHRcdGl0ZW0uaGlkZUVsZW1lbnRcclxuXHRcdFx0LmFkZENsYXNzKFYuY3NzQ2xhc3MuaGlkZV9kaXNhYmxlZClcclxuXHRcdFx0LmZpbmQoXCJpXCIpXHJcblx0XHRcdC5hdHRyKFwidGl0bGVcIiwgVi50b29sdGlwLndhaXRpbmcpO1xyXG5cclxuXHRcdGNvbnN0IG5ld1N0YXRlID0gIWl0ZW0uaGlkZGVuO1xyXG5cclxuXHRcdGNvbnN0IHVybCA9IFV0aWxzLmZvcm1hdFVybChWLmNhbnZhcy5hcGkudXJscy5jdXN0b21fZGF0YSwge1xyXG5cdFx0XHRkYXRhUGF0aDogW1wiXCIsIFYuY2FudmFzLmFwaS5kYXRhX3VybHMuaGlkZGVuX2Fzc2lnbm1lbnRzLCBEQVRBLmNvdXJzZUlEXS5qb2luKFwiL1wiKVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc3Qgc3VjY2VzcyA9IGF3YWl0IFV0aWxzLmVkaXREYXRhQXJyYXkodXJsLCBuZXdTdGF0ZSwgW2lkXSk7XHJcblxyXG5cdFx0aWYgKHN1Y2Nlc3MpIHtcclxuXHRcdFx0aXRlbS5oaWRkZW4gPSBuZXdTdGF0ZTtcclxuXHRcdFx0YXdhaXQgVUkudXBkYXRlSXRlbUhpZGUoaXRlbSk7XHJcblx0XHRcdFVJLnVwZGF0ZU1vZHVsZShpdGVtLm1vZHVsZSk7XHJcblx0XHRcdGNvbnNvbGUuZGVidWcoYEl0ZW0gSUQgJHtpZH0gKCR7aXRlbS5uYW1lLnN1YnN0cigwLCAyNSl9Li4uKSBoYXMgYmVlbiAke2l0ZW0uaGlkZGVuID8gXCJcIiA6IFwidW5cIn1oaWRkZW5gKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBvbk1lc3NhZ2UoZGF0YTogTWVzc2FnZURhdGEsIHNvdXJjZTogY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlciwgcmVzcG9uZEZ1bmM6IChkYXRhPzogYW55KSA9PiB2b2lkKSB7XHJcblxyXG5cdFx0aWYgKHNvdXJjZS5pZCAhPT0gREFUQS5leHRlbnNpb25JZCkgcmV0dXJuO1xyXG5cclxuXHRcdGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkJBU0lDKSB7XHJcblxyXG5cdFx0XHRjb25zdCB1bmNoZWNrZWQgPSBBcnJheS5mcm9tKERBVEEubW9kdWxlSXRlbXMudmFsdWVzKCkpXHJcblx0XHRcdFx0LmZpbHRlcihpID0+ICFpLmNoZWNrZWQgJiYgIWkuaGlkZGVuICYmICFpLmlzU3ViSGVhZGVyKTtcclxuXHJcblx0XHRcdHN3aXRjaCAoZGF0YS5hY3Rpb24pIHtcclxuXHRcdFx0XHRjYXNlIFwicGluZ1wiOlxyXG5cdFx0XHRcdFx0cmVzcG9uZEZ1bmMoe3Bvbmc6ICQubm93KCl9KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgXCJjb3VudCB1bmNoZWNrZWRcIjpcclxuXHRcdFx0XHRcdHJlc3BvbmRGdW5jKHtjb3VudDogdW5jaGVja2VkLmxlbmd0aH0pO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdC8qXHRjYXNlIFwidXBkYXRlIHRva2VuXCI6XHJcblx0XHRcdFx0XHRVdGlscy5sb2FkVG9rZW4ocmVzcG9uZEZ1bmMpO1xyXG5cdFx0XHRcdFx0YnJlYWs7Ki9cclxuXHRcdFx0XHRjYXNlIFwianVtcCB0byBmaXJzdCB1bmNoZWNrZWRcIjpcclxuXHRcdFx0XHRcdGNvbnN0IHVuY2hlY2tlZEVscyA9IHVuY2hlY2tlZFxyXG5cdFx0XHRcdFx0XHQubWFwKGkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaS5jYW52YXNFbGVtZW50SWQpKTtcclxuXHRcdFx0XHRcdFVJLnNjcm9sbFRvRWxlbWVudCgkKHVuY2hlY2tlZEVscykuZmlyc3QoKSk7XHJcblx0XHRcdFx0XHRyZXNwb25kRnVuYygpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihcIlVua25vd24gYmFzaWMgbWVzc2FnZSBpbiBjb250ZW50IHNjcmlwdDpcIiwgZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuU1RBVEUpIHtcclxuXHRcdFx0Y29uc3Qgc3RhdGVEYXRhID0gZGF0YSBhcyBTdGF0ZU1lc3NhZ2VEYXRhO1xyXG5cdFx0XHRpZiAoZGF0YS5hY3Rpb24gPT09IFwiZ2V0XCIpIHtcclxuXHRcdFx0XHRjb25zdCBzdGF0ZSA9IE1haW4uZ2V0U3RhdGUoc3RhdGVEYXRhLnN0YXRlTmFtZSk7XHJcblx0XHRcdFx0cmVzcG9uZEZ1bmMoe3N0YXRlfSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoZGF0YS5hY3Rpb24gPT09IFwic2V0XCIpIHtcclxuXHRcdFx0XHRNYWluLnNldFN0YXRlKHN0YXRlRGF0YS5zdGF0ZU5hbWUsIHN0YXRlRGF0YS5zdGF0ZSkudGhlbihzdWNjZXNzID0+IHtcclxuXHRcdFx0XHRcdHJlc3BvbmRGdW5jKHN1Y2Nlc3MpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlOyAvLyB0aGlzIHRlbGxzIGNocm9tZSB0aGF0IHdlIHdhbnQgdGhpcyByZXNwb25zZSB0byBiZSBhc3luY1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUud2FybihcIlVua25vd24gc3RhdGUgbWVzc2FnZSBpbiBjb250ZW50IHNjcmlwdDpcIiwgZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLndhcm4oXCJVbmtub3duIG1lc3NhZ2UgaW4gY29udGVudCBzY3JpcHQ6XCIsIGRhdGEpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgVUkge1xyXG5cclxuXHRzdGF0aWMgdXBkYXRlQ2hlY2tib3goaXRlbTogTW9kdWxlSXRlbSkge1xyXG5cdFx0aWYgKGl0ZW0uY2hlY2tib3hFbGVtZW50ID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBjaGVja2JveCB0byB1cGRhdGVcIik7XHJcblx0XHRpdGVtLmNoZWNrYm94RWxlbWVudFxyXG5cdFx0XHQuZmluZChcImlucHV0XCIpXHJcblx0XHRcdC5wcm9wKFwiY2hlY2tlZFwiLCBpdGVtLmNoZWNrZWQpXHJcblx0XHRcdC5hdHRyKFwidGl0bGVcIiwgaXRlbS5jaGVja2VkID8gVi50b29sdGlwLm1hcmtfaW5jb21wbGV0ZSA6IFYudG9vbHRpcC5tYXJrX2NvbXBsZXRlKVxyXG5cdFx0XHQuY2xvc2VzdChWLmNhbnZhcy5zZWxlY3Rvci5tb2R1bGVfaXRlbSlcclxuXHRcdFx0LnRvZ2dsZUNsYXNzKFYuY3NzQ2xhc3MuY2hlY2tib3hfY2hlY2tlZCwgaXRlbS5jaGVja2VkKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyB1cGRhdGVJdGVtSGlkZShpdGVtOiBNb2R1bGVJdGVtLCBpbnN0YW50PzogYm9vbGVhbikge1xyXG5cdFx0aWYgKGl0ZW0uaGlkZUVsZW1lbnQgPT09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIk5vIGhpZGUgYnV0dG9uIHRvIHVwZGF0ZVwiKTtcclxuXHJcblx0XHRjb25zdCBtb2RJdGVtRWwgPSBpdGVtLmhpZGVFbGVtZW50LmNsb3Nlc3QoVi5jYW52YXMuc2VsZWN0b3IubW9kdWxlX2l0ZW0pO1xyXG5cdFx0Y29uc3QgaUVsID0gaXRlbS5oaWRlRWxlbWVudC5maW5kKFwiaVwiKTtcclxuXHJcblx0XHQvLyB1cGRhdGUgaGlkZGVuIGNsYXNzIG9uIHRoZSA8aT4gYW5kIDxsaT5cclxuXHRcdGlFbC5hZGQobW9kSXRlbUVsKS50b2dnbGVDbGFzcyhWLmNzc0NsYXNzLml0ZW1faGlkZGVuLCBpdGVtLmhpZGRlbik7XHJcblxyXG5cdFx0aWYgKCFpbnN0YW50KSBhd2FpdCBVdGlscy53YWl0KFYudWkuZmFkZV90aW1lKTtcclxuXHJcblx0XHQvLyB1cGRhdGUgZGlzYWJsZSBzdGF0dXMgYW5kIHRpdGxlLCB1bmRvaW5nIHdhaXRpbmctZGlzYWJsZVxyXG5cdFx0aXRlbS5oaWRlRWxlbWVudC50b2dnbGVDbGFzcyhWLmNzc0NsYXNzLmhpZGVfZGlzYWJsZWQsIGl0ZW0uaXNHcmFkZWQpO1xyXG5cdFx0aUVsLmF0dHIoXCJ0aXRsZVwiLCBpdGVtLmlzR3JhZGVkID8gVi50b29sdGlwLmhpZGVfZGlzYWJsZWQgOiBpdGVtLmhpZGRlbiA/IFYudG9vbHRpcC51bmhpZGUgOiBWLnRvb2x0aXAuaGlkZSk7XHJcblxyXG5cdH1cclxuXHJcblx0c3RhdGljIHVwZGF0ZU1vZHVsZShtb2R1bGU6IE1vZHVsZSkge1xyXG5cclxuXHRcdGlmIChEQVRBLmVsZW1lbnRzLnRvYyAhPT0gbnVsbCkge1xyXG5cdFx0XHRjb25zdCBhbGxJdGVtcyA9IG1vZHVsZS5pdGVtcy5maWx0ZXIoaSA9PiAhaS5pc1N1YkhlYWRlciAmJiAhaS5oaWRkZW4pO1xyXG5cdFx0XHRjb25zdCB0b3RhbEl0ZW1zID0gYWxsSXRlbXMubGVuZ3RoO1xyXG5cclxuXHRcdFx0bGV0IGNoZWNrZWRJdGVtczogbnVtYmVyO1xyXG5cdFx0XHRsZXQgcGVyY2VudDogbnVtYmVyO1xyXG5cclxuXHRcdFx0aWYgKHRvdGFsSXRlbXMgPiAwKSB7XHJcblx0XHRcdFx0Y2hlY2tlZEl0ZW1zID0gYWxsSXRlbXMuZmlsdGVyKGkgPT4gaS5jaGVja2VkKS5sZW5ndGg7XHJcblx0XHRcdFx0cGVyY2VudCA9IE1hdGgucm91bmQoY2hlY2tlZEl0ZW1zIC8gdG90YWxJdGVtcyAqIDEwMCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Y2hlY2tlZEl0ZW1zID0gMDtcclxuXHRcdFx0XHRwZXJjZW50ID0gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29uc3QgYmFja2dyb3VuZEltYWdlID0gVXRpbHMuZm9ybWF0KFYubWlzYy50b2NfYmFja2dyb3VuZCwge3BlcmNlbnR9KTtcclxuXHJcblx0XHRcdERBVEEuZWxlbWVudHMudG9jXHJcblx0XHRcdFx0LmZpbmQoYFske1YuZGF0YUF0dHIudG9jX21vZHVsZV9pZH09JyR7bW9kdWxlLmlkfSddYClcclxuXHRcdFx0XHQuYXR0cihWLmRhdGFBdHRyLnRvY190b3RhbCwgdG90YWxJdGVtcylcclxuXHRcdFx0XHQuYXR0cihWLmRhdGFBdHRyLnRvY19jaGVja2VkX2NvdW50LCBjaGVja2VkSXRlbXMpXHJcblx0XHRcdFx0LmF0dHIoVi5kYXRhQXR0ci50b2NfcGVyY2VudGFnZSwgcGVyY2VudClcclxuXHRcdFx0XHQuY2xvc2VzdChcImxpXCIpXHJcblx0XHRcdFx0LnRvZ2dsZUNsYXNzKFYuY3NzQ2xhc3MuaXRlbV9oaWRkZW4sIHRvdGFsSXRlbXMgPT09IDApXHJcblx0XHRcdFx0LmNzcyh7YmFja2dyb3VuZEltYWdlfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gaWYgbm8gdmlzaWJsZSBpdGVtcyBpbiB0aGlzIG1vZHVsZSwgaGlkZSB0aGUgZW50aXJlIG1vZHVsZVxyXG5cdFx0Y29uc3Qgbm9JdGVtcyA9IG1vZHVsZS5pdGVtcy5maWx0ZXIoaSA9PiAhaS5pc1N1YkhlYWRlciAmJiAhaS5oaWRkZW4pLmxlbmd0aCA9PT0gMDtcclxuXHRcdCQoXCIjY29udGV4dF9tb2R1bGVfXCIgKyBtb2R1bGUuaWQpLnRvZ2dsZUNsYXNzKFYuY3NzQ2xhc3MuaXRlbV9oaWRkZW4sIG5vSXRlbXMpO1xyXG5cclxuXHR9XHJcblxyXG5cdHN0YXRpYyB1cGRhdGVOYXZUYWJQb3NpdGlvbih0YWI6IE5hdlRhYikge1xyXG5cclxuXHRcdGlmICghdGFiLmhhc0N1c3RvbVBvc2l0aW9uKSB0aHJvdyBuZXcgRXJyb3IoXCJUYWIgaGFzIG5vIGN1c3RvbSBwb3NpdGlvblwiKTtcclxuXHJcblx0XHRjb25zdCB0YWJMaXN0ID0gJChWLmNhbnZhcy5zZWxlY3Rvci5uYXZfdGFicyk7XHJcblx0XHRjb25zdCB0YWJFbCA9IHRhYkxpc3QuZmluZChcImEuXCIgKyB0YWIuaWQpLnBhcmVudCgpO1xyXG5cclxuXHRcdGlmICh0YWIuaGlkZGVuKVxyXG5cdFx0XHR0YWJFbC5oaWRlKCk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRhYkVsLnNob3coKS5kZXRhY2goKS5pbnNlcnRCZWZvcmUodGFiTGlzdC5jaGlsZHJlbigpLmVxKHRhYi5wb3NpdGlvbiAtIDEpKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyB1cGRhdGVTY3JvbGxQb3NpdGlvbigpIHtcclxuXHRcdGNvbnN0IHNjcm9sbFRvcCA9IFBBR0Uuc2Nyb2xsaW5nRWxlbWVudC5wcm9wKFwic2Nyb2xsVG9wXCIpO1xyXG5cclxuXHRcdGlmIChEQVRBLmVsZW1lbnRzLnRvYyAhPT0gbnVsbCkge1xyXG5cdFx0XHREQVRBLmVsZW1lbnRzLnRvY1xyXG5cdFx0XHRcdC50b2dnbGVDbGFzcyhWLmNzc0NsYXNzLmZpeGVkLCBzY3JvbGxUb3AgPiBEQVRBLmVsZW1lbnRzLnRvYy5kYXRhKFwiY3V0b2ZmXCIpKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoREFUQS5lbGVtZW50cy5qdW1wX2J1dHRvbiAhPT0gbnVsbCkge1xyXG5cdFx0XHREQVRBLmVsZW1lbnRzLmp1bXBfYnV0dG9uXHJcblx0XHRcdFx0LnRvZ2dsZUNsYXNzKFYuY3NzQ2xhc3MuYWN0aXZlLCBzY3JvbGxUb3AgPiBWLnVpLmp1bXBfdG9wX2N1dG9mZik7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0c3RhdGljIHNjcm9sbFRvRWxlbWVudChlbGVtZW50OiBKUXVlcnkpIHtcclxuXHRcdGNvbnN0IGVsUmVjdCA9IGVsZW1lbnRbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHRjb25zdCBjbGlIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG5cdFx0Y29uc3QgdG9wUmF0aW8gPSBWLnVpLnRvcF9pbnNpZGVfcmF0aW87XHJcblxyXG5cdFx0Ly8gaWYgZWxlbWVudCBpcyBpbiB2aWV3cG9ydCwganVzdCBmbGFzaCBpdFxyXG5cdFx0LypcdGluIHZpZXdwb3J0IGlmLi4uXHJcblx0XHQgaGVpZ2h0IGlzIHNob3J0ZXIgdGhhbiB2aWV3cG9ydCBhbmQgYm90aCB0b3AgYW5kIGJvdHRvbSBhcmUgaW5zaWRlIE9SXHJcblx0XHQgaGVpZ2h0IGlzIHRhbGxlciB0aGFuIHZpZXdwb3J0IGFuZCB0b3AgaXMgd2l0aGluIHRvcCBwYXJ0IG9mIHBhZ2VcclxuXHRcdCAqL1xyXG5cdFx0aWYgKChlbFJlY3QuaGVpZ2h0IDwgY2xpSGVpZ2h0ICYmIGVsUmVjdC50b3AgPj0gMCAmJiBlbFJlY3QuYm90dG9tIDwgY2xpSGVpZ2h0KSB8fFxyXG5cdFx0XHQoZWxSZWN0LnRvcCA+PSAwICYmIGVsUmVjdC50b3AgPD0gY2xpSGVpZ2h0ICogdG9wUmF0aW8pKSB7XHJcblx0XHRcdFVJLmZsYXNoRWxlbWVudChlbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdGVsc2UgeyAvLyBpZiBub3QsIHNjcm9sbCB0byBpdFxyXG5cdFx0XHRjb25zdCBzY3JvbGxUb3AgPSBlbGVtZW50Lm9mZnNldCgpLnRvcCAtIFYudWkuc2Nyb2xsX3RvcF9vZmZzZXQ7XHJcblx0XHRcdFBBR0Uuc2Nyb2xsaW5nRWxlbWVudC5hbmltYXRlKHtzY3JvbGxUb3B9LFxyXG5cdFx0XHRcdFYudWkuc2Nyb2xsX3RpbWUsXHJcblx0XHRcdFx0KCkgPT4gVUkuZmxhc2hFbGVtZW50KGVsZW1lbnQpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBmbGFzaEVsZW1lbnQoZWxlbWVudDogSlF1ZXJ5KSB7XHJcblx0XHRlbGVtZW50LmFkZENsYXNzKFYuY3NzQ2xhc3MuZmxhc2gpO1xyXG5cdFx0c2V0VGltZW91dCgoKSA9PiBlbGVtZW50LnJlbW92ZUNsYXNzKFYuY3NzQ2xhc3MuZmxhc2gpLCAxMDAwKTtcclxuXHR9XHJcblxyXG59XHJcbi8vIGVuZCBNQUlOXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tYWluLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==