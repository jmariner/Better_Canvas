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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzU3YzExZTBhMjAzY2NlYmZiMDciLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZhcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL29iamVjdHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7SUFtR0M7UUFqR0EsV0FBTSxHQUFHLGNBQWMsQ0FBQztRQUV4QixhQUFRLEdBQUc7WUFDVixNQUFNLEVBQUUsUUFBUTtZQUNoQixlQUFlLEVBQUUsaUJBQWlCO1lBQ2xDLGdCQUFnQixFQUFFLGtCQUFrQjtZQUNwQyxXQUFXLEVBQUUsYUFBYTtZQUMxQixLQUFLLEVBQUUsWUFBWTtZQUNuQixnQkFBZ0IsRUFBRSxrQkFBa0I7WUFDcEMsV0FBVyxFQUFFLFFBQVE7WUFDckIsV0FBVyxFQUFFLFVBQVU7WUFDdkIsYUFBYSxFQUFFLGVBQWU7WUFDOUIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsS0FBSyxFQUFFLE9BQU87WUFDZCxTQUFTLEVBQUUsY0FBYztZQUN6QixRQUFRLEVBQUUsY0FBYztZ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SUFDRixDQUFDO0lBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFlO1FBQ2xDLE9BQU8sQ0FBQyxRQUFRLENBQUMsZ0RBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsVUFBVSxDQUFDLE1BQU0sT0FBTyxDQUFDLFdBQVcsQ0FBQyxnREFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBRUQiLCJmaWxlIjoiY29udGVudF9zY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3NTdjMTFlMGEyMDNjY2ViZmIwNyIsImNsYXNzIFNhc3NWYXJzIHtcclxuXHJcblx0cHJlZml4ID0gXCJiZXR0ZXJDYW52YXNcIjtcclxuXHJcblx0Y3NzQ2xhc3MgPSB7XHJcblx0XHRhY3RpdmU6IFwiYWN0aXZlXCIsXHJcblx0XHRjaGVja2JveF9wYXJlbnQ6IFwiY2hlY2tib3gtcGFyZW50XCIsXHJcblx0XHRjaGVja2JveF9jaGVja2VkOiBcImNoZWNrYm94LWNoZWNrZWRcIixcclxuXHRcdGNoZWNrYm94X3RkOiBcImNoZWNrYm94LXRkXCIsXHJcblx0XHRmbGFzaDogXCJhbmltLWZsYXNoXCIsXHJcblx0XHRjb3Vyc2VfbGlua190ZXh0OiBcImNvdXJzZS1saW5rLXRleHRcIixcclxuXHRcdGl0ZW1faGlkZGVuOiBcImhpZGRlblwiLFxyXG5cdFx0aGlkZV9idXR0b246IFwiYnRuLWhpZGVcIixcclxuXHRcdGhpZGVfZGlzYWJsZWQ6IFwiaGlkZS1kaXNhYmxlZFwiLFxyXG5cdFx0dG9jX3JhdGlvOiBcInRvYy1yYXRpb1wiLFxyXG5cdFx0dG9jX3RpdGxlOiBcInRvYy10aXRsZVwiLFxyXG5cdFx0Zml4ZWQ6IFwiZml4ZWRcIixcclxuXHRcdGl0ZW1faWNvbjogXCJpY29uLXdyYXBwZXJcIixcclxuXHRcdGRvd25sb2FkOiBcImRvd25sb2FkLWJ0blwiLFxyXG5cdFx0ZXh0ZXJuYWxfdXJsOiBcInVybC1idG5cIixcclxuXHJcblx0XHRwb3B1cF9sb2FkZWQ6IFwiZG9uZS1sb2FkaW5nXCIsXHJcblx0XHRwb3B1cF9jb25uZWN0ZWQ6IFwicGFnZS1jb25uZWN0ZWRcIixcclxuXHRcdHBvcHVwX3JlcXVpcmVfcGFnZTogXCJyZXF1aXJlLXBhZ2VcIlxyXG5cdH07XHJcblxyXG5cdGRhdGFBdHRyID0ge1xyXG5cdFx0dG9jX21vZHVsZV9pZDogXCJ0b2MtbW9kdWxlLWlkXCIsXHJcblx0XHR0b2NfdG90YWw6IFwidG9jLXRvdGFsXCIsXHJcblx0XHR0b2NfY2hlY2tlZF9jb3VudDogXCJ0b2MtY2hlY2tlZC1jb3VudFwiLFxyXG5cdFx0dG9jX3BlcmNlbnRhZ2U6IFwidG9jLXBlcmNlbnRhZ2VcIixcclxuXHRcdG1vZF9pdGVtX2lkOiBcIml0ZW0taWRcIixcclxuXHRcdGNvdXJzZV9uYW1lOiBcImNvdXJzZS1uYW1lXCIsXHJcblx0XHRjb3Vyc2VfY29kZTogXCJjb3Vyc2UtY29kZVwiLFxyXG5cdFx0ZGVmX2luZGVudDogXCJkZWZhdWx0LWluZGVudFwiXHJcblx0fTtcclxuXHJcblx0aWQgPSB7XHJcblx0XHR0b2M6IFwidG9jXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJqdW1wLXRvLXRvcFwiLFxyXG5cclxuXHRcdHBvcHVwX3BhZ2VfbWlzc2luZzogXCJwYWdlLW1pc3NpbmctZXJyb3JcIixcclxuXHRcdHBvcHVwX2V4X25hbWU6IFwiZXh0ZW5zaW9uLW5hbWVcIixcclxuXHRcdHBvcHVwX2luc2VydGlvbl9wb2ludDogXCJpbnNlcnRpb24tcG9pbnRcIixcclxuXHRcdHBvcHVwX2p1bXBfYnV0dG9uOiBcImp1bXAtdG9cIlxyXG5cdH07XHJcblxyXG5cdGNvbG9yID0ge1xyXG5cdFx0dG9jX2ZpbGw6IFwicmdiYSgwLCAyNTUsIDAsIC43NSlcIixcclxuXHRcdHRvY19ib3JkZXI6IFwicmdiKDEwMiwgMTIwLCAxMzUpXCIsXHJcblx0XHR0b2NfdGl0bGU6IFwidmFyKC0taWMtYnJhbmQtcHJpbWFyeSlcIiwgLy8gd2FzIFwicmdiKDU3LCA3NSwgODgpXCIsXHJcblx0XHRjaGVja2JveF9jaGVjazogXCJyZ2IoMjIsIDE2MCwgMTMzKVwiLFxyXG5cdFx0Y2hlY2tib3hfYm9yZGVyOiBcInJnYigxMDIsIDEyMCwgMTM1KVwiLFxyXG5cdFx0aGlnaGxpZ2h0X29yYW5nZTogXCJyZ2IoMjU1LCAxNTIsIDApXCIsXHJcblx0XHRoaWdobGlnaHRfcmVkOiBcInJnYigyNTUsIDAsIDApXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJyZ2IoNTcsIDc1LCA4OClcIlxyXG5cdH07XHJcblxyXG5cdHVpID0ge1xyXG5cdFx0dG9wX2luc2lkZV9yYXRpbzogMC4wNSxcclxuXHRcdHNjcm9sbF90b3Bfb2Zmc2V0OiA1LFxyXG5cdFx0anVtcF90b3BfY3V0b2ZmOiAxMDAsXHJcblx0XHR0b2NfdG9wX21hcmdpbjogMzIsXHJcblx0XHRzY3JvbGxfdGltZTogNTAwLFxyXG5cdFx0ZmFkZV90aW1lOiA1MDAsXHJcblx0XHRzdWJoZWFkZXJfaW5kZW50OiAwLFxyXG5cdFx0bWFpbl9pbmRlbnQ6IDFcclxuXHR9O1xyXG5cclxuXHRzdGF0ZSA9IHtcclxuXHRcdHNob3dfaGlkZGVuOiB7XHJcblx0XHRcdGNzc0NsYXNzOiBcInNob3ctaGlkZGVuXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIlNob3cgaGlkZGVuIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRoaWRlX2NoZWNrZWQ6IHtcclxuXHRcdFx0Y3NzQ2xhc3M6IFwiaGlkZS1jaGVja2VkXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCIsIFwiZ3JhZGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIkhpZGUgY29tcGxldGVkIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRoaWdobGlnaHRfdW5jaGVja2VkOiB7XHJcblx0XHRcdGNzc0NsYXNzOiBcIm1hcmstdW5jaGVja2VkXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCIsIFwiZ3JhZGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIk1hcmsgdW5jaGVja2VkIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRkaXNhYmxlX2luZGVudF9vdmVycmlkZToge1xyXG5cdFx0XHRwYWdlczogW1wibW9kdWxlc1wiXSxcclxuXHRcdFx0ZGVzYzogXCJEaXNhYmxlIGluZGVudCBvdmVycmlkZXNcIlxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHNhc3NKc29uOiBzdHJpbmc7XHJcblxyXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IG1ldGEgPSB7XHJcblx0XHRkYXRhUHJlZml4VHlwZTogXCJkYXRhQXR0clwiLFxyXG5cdFx0cHJlZml4VHlwZXM6IFtcImNzc0NsYXNzXCIsIFwiZGF0YUF0dHJcIiwgXCJpZFwiXSxcclxuXHRcdHByZWZpeEV4Y2x1ZGU6IFtcInBvcHVwXy4rXCJdXHJcblx0fTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdFx0Y29uc3QgdHlwZXMgPSBuZXcgU2V0KFNhc3NWYXJzLm1ldGEucHJlZml4VHlwZXMpO1xyXG5cclxuXHRcdGNvbnN0IHByb2Nlc3NPYmplY3QgPSAob2JqOiBvYmplY3QsIG9iak5hbWU6IHN0cmluZykgPT4ge1xyXG5cclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XHJcblx0XHRcdFx0aWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkgY29udGludWU7XHJcblxyXG5cdFx0XHRcdGxldCB2YWw6IG9iamVjdCB8IHN0cmluZyB8IG51bWJlciA9IG9ialtrZXldO1xyXG5cclxuXHRcdFx0XHRpZiAodHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIikge1xyXG5cclxuXHRcdFx0XHRcdHByb2Nlc3NPYmplY3QodmFsLCBrZXkpO1xyXG5cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xyXG5cclxuXHRcdFx0XHRcdGNvbnN0IGV4Y2x1ZGVkID0gU2Fzc1ZhcnMubWV0YS5wcmVmaXhFeGNsdWRlXHJcblx0XHRcdFx0XHRcdC5tYXAoc3RyID0+IG5ldyBSZWdFeHAoXCJeXCIgKyBzdHIgKyBcIiRcIikpXHJcblx0XHRcdFx0XHRcdC5zb21lKHJlZ2V4ID0+IHJlZ2V4LnRlc3Qoa2V5KSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFleGNsdWRlZCAmJiAodHlwZXMuaGFzKG9iak5hbWUpIHx8IHR5cGVzLmhhcyhrZXkpKSlcclxuXHRcdFx0XHRcdFx0dmFsID0gdGhpcy5wcmVmaXggKyBcIi1cIiArIHZhbDtcclxuXHJcblx0XHRcdFx0XHRpZiAob2JqTmFtZSA9PT0gU2Fzc1ZhcnMubWV0YS5kYXRhUHJlZml4VHlwZSlcclxuXHRcdFx0XHRcdFx0dmFsID0gXCJkYXRhLVwiICsgdmFsO1xyXG5cclxuXHRcdFx0XHRcdG9ialtrZXldID0gdmFsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0cHJvY2Vzc09iamVjdCh0aGlzLCBcInJvb3RcIik7XHJcblxyXG5cdFx0dGhpcy5zYXNzSnNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXMpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIFZhcnMgZXh0ZW5kcyBTYXNzVmFycyB7XHJcblxyXG5cdHRvb2x0aXAgPSB7XHJcblx0XHRtYXJrX2NvbXBsZXRlOiBcIk1hcmsgYXMgY29tcGxldGVkXCIsXHJcblx0XHRtYXJrX2luY29tcGxldGU6IFwiTWFyayBhcyBpbmNvbXBsZXRlXCIsXHJcblx0XHRoaWRlOiBcIkhpZGUgdGhpcyBpdGVtXCIsXHJcblx0XHR1bmhpZGU6IFwiVW5oaWRlIHRoaXMgaXRlbVwiLFxyXG5cdFx0aGlkZV9kaXNhYmxlZDogXCJDYW5ub3QgaGlkZSBncmFkZWQgaXRlbVwiLFxyXG5cdFx0anVtcF9idXR0b246IFwiSnVtcCB0byB0b3BcIixcclxuXHRcdHdhaXRpbmc6IFwiV2FpdGluZy4uLlwiLFxyXG5cdFx0ZG93bmxvYWQ6IFwiRG93bmxvYWQgZmlsZTogXFxcIntmaWxlbmFtZX1cXFwiXCIsXHJcblx0XHRleHRlcm5hbF91cmw6IFwiVmlzaXQgZXh0ZXJuYWwgVVJMXCIsXHJcblx0XHRoYXNfc3VibWlzc2lvbjogXCJBc3NpZ25tZW50IGhhcyBzdWJtaXNzaW9uXCIsXHJcblx0XHRwb3B1cF9ub191bmNoZWNrZWQ6IFwiTm8gdW5jaGVja2VkIGl0ZW1zIHRvIGp1bXAgdG9cIlxyXG5cdH07XHJcblxyXG5cdG1pc2MgPSB7XHJcblx0XHR0b2NfYmFja2dyb3VuZDogYC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQsICR7dGhpcy5jb2xvci50b2NfZmlsbH0ge3BlcmNlbnR9JSwgdHJhbnNwYXJlbnQge3BlcmNlbnR9JSlgLFxyXG5cdFx0dG9rZW5fa2V5OiBcImFjY2Vzc1Rva2VuXCJcclxuXHR9O1xyXG5cclxuXHRlbGVtZW50ID0ge1xyXG5cclxuXHRcdGNoZWNrYm94OlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuY2hlY2tib3hfcGFyZW50fSc+XHJcblx0XHRcdFx0XHQ8aW5wdXQgdHlwZT0nY2hlY2tib3gnICR7dGhpcy5kYXRhQXR0ci5tb2RfaXRlbV9pZH09J3tpdGVtX2lkfSc+XHJcblx0XHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRkb3dubG9hZF9idXR0b246XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5kb3dubG9hZH0nIHRpdGxlPScke3RoaXMudG9vbHRpcC5kb3dubG9hZH0nPlxyXG5cdFx0XHRcdFx0PGEgaHJlZj1cIntmaWxlX3VybH1cIj48L2E+XHJcblx0XHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHR1cmxfYnV0dG9uOlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuZXh0ZXJuYWxfdXJsfScgdGl0bGU9JyR7dGhpcy50b29sdGlwLmV4dGVybmFsX3VybH0nPlxyXG5cdFx0XHRcdFx0PGEgaHJlZj1cIntleHRlcm5hbF91cmx9XCIgY2xhc3M9XCJub3RfZXh0ZXJuYWxcIiB0YXJnZXQ9XCJfYmxhbmtcIj48L2E+XHJcblx0XHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRoaWRlX2J1dHRvbjpcclxuXHRcdFx0XHRgPGRpdiBzdHlsZT0nZGlzcGxheTpub25lJyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLmhpZGVfYnV0dG9ufSc+XHJcblx0XHRcdFx0XHQ8aSAke3RoaXMuZGF0YUF0dHIubW9kX2l0ZW1faWR9PSd7aXRlbV9pZH0nPjwvaT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGNvdXJzZV9saW5rOlxyXG5cdFx0XHRgPGxpIHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiB7dGFiQ29sb3J9JyBjbGFzcz0nbWVudS1pdGVtIGljLWFwcC1oZWFkZXJfX21lbnUtbGlzdC1pdGVtJz5cclxuXHRcdFx0XHQ8YSBocmVmPScvY291cnNlcy97dGFiSUR9L21vZHVsZXMnIGNsYXNzPSdpYy1hcHAtaGVhZGVyX19tZW51LWxpc3QtbGluayc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdtZW51LWl0ZW0taWNvbi1jb250YWluZXInIGFyaWEtaGlkZGVuPSd0cnVlJz48aT48L2k+PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiB7dGFiQ29sb3J9OyBib3JkZXItcmlnaHQtY29sb3I6IHt0YWJDb2xvcn0nXHJcblx0XHRcdFx0XHRcdFx0JHt0aGlzLmRhdGFBdHRyLmNvdXJzZV9uYW1lfT0ne25hbWV9JyAke3RoaXMuZGF0YUF0dHIuY291cnNlX2NvZGV9PSd7Y29kZX0nXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3M9J21lbnUtaXRlbV9fdGV4dCAke3RoaXMuY3NzQ2xhc3MuY291cnNlX2xpbmtfdGV4dH0nPjwvZGl2PlxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0PC9saT5gLFxyXG5cclxuXHRcdHRvYzpcclxuXHRcdFx0YDxkaXYgaWQ9JyR7dGhpcy5pZC50b2N9JyBjbGFzcz0naWMtYXBwLWNvdXJzZS1tZW51IGxpc3Qtdmlldyc+XHJcblx0XHRcdFx0PGRpdiBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLnRvY190aXRsZX0nPlRhYmxlIG9mIENvbnRlbnRzPC9kaXY+XHJcblx0XHRcdFx0PG5hdj48dWw+PC91bD48L25hdj5cclxuXHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHR0b2NfaXRlbTpcclxuXHRcdFx0YDxsaT5cclxuXHRcdFx0XHQ8YSBocmVmPScjJyB0aXRsZT0ne2l0ZW1fbmFtZX0nPlxyXG5cdFx0XHRcdFx0e2l0ZW1fbmFtZX1cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy50b2NfcmF0aW99JyAke3RoaXMuZGF0YUF0dHIudG9jX21vZHVsZV9pZH09J3tpdGVtX2lkfSc+PC9kaXY+XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHQ8L2xpPmAsXHJcblxyXG5cdFx0anVtcF9idXR0b246XHJcblx0XHRcdGA8ZGl2IGlkPScke3RoaXMuaWQuanVtcF9idXR0b259Jz5cclxuXHRcdFx0XHQ8aSB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuanVtcF9idXR0b259Jz48L2k+XHJcblx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0c3VibWlzc2lvbl9pY29uOlxyXG5cdFx0XHRgPGRpdiB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuaGFzX3N1Ym1pc3Npb259JyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLml0ZW1faWNvbn0nPlxyXG5cdFx0XHRcdDxpIGNsYXNzPSdpY29uLXB1Ymxpc2gnPjwvaT5cclxuXHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRwb3B1cF9zdGF0ZV9zd2l0Y2g6XHJcblx0XHRcdGA8ZGl2IGNsYXNzPVwic3dpdGNoICR7dGhpcy5jc3NDbGFzcy5wb3B1cF9yZXF1aXJlX3BhZ2V9XCI+XHJcblx0XHRcdFx0PGxhYmVsIGZvcj1cIntuYW1lfVwiIGNsYXNzPVwibWRsLXN3aXRjaCBtZGwtanMtc3dpdGNoIG1kbC1qcy1yaXBwbGUtZWZmZWN0XCI+XHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cIm1kbC1zd2l0Y2hfX2xhYmVsXCI+e2Rlc2N9PC9zcGFuPlxyXG5cdFx0XHRcdFx0PGlucHV0IGlkPVwie25hbWV9XCIgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJtZGwtc3dpdGNoX19pbnB1dFwiPlxyXG5cdFx0XHRcdDwvbGFiZWw+XHJcblx0XHRcdDwvZGl2PmBcclxuXHR9O1xyXG5cclxuXHQvLyBzZXBhcmF0ZWQgZm9yIHVzZSBpbiB0ZW1wbGF0ZSBzdHJpbmdzIGJlbG93XHJcblx0cHJpdmF0ZSBfY2FudmFzTmFtZXNwYWNlID0gYGNvbS5qbWFyaW5lci4ke3RoaXMucHJlZml4fWA7XHJcblxyXG5cdGNhbnZhcyA9IHtcclxuXHRcdHNlbGVjdG9yOiB7XHJcblx0XHRcdG1vZHVsZTogXCJkaXYuY29udGV4dF9tb2R1bGVcIixcclxuXHRcdFx0bW9kdWxlX2l0ZW06IFwibGkuY29udGV4dF9tb2R1bGVfaXRlbVwiLFxyXG5cdFx0XHRtb2R1bGVfaXRlbXM6IFwidWwuY29udGV4dF9tb2R1bGVfaXRlbXNcIixcclxuXHRcdFx0c3ViaGVhZGVyOiBcImxpLmNvbnRleHRfbW9kdWxlX3N1Yl9oZWFkZXJcIixcclxuXHRcdFx0bm90X3N1YmhlYWRlcjogXCJsaS5jb250ZXh0X21vZHVsZV9pdGVtOm5vdCguY29udGV4dF9tb2R1bGVfc3ViX2hlYWRlcilcIixcclxuXHRcdFx0bmF2X3RhYnM6IFwidWwjc2VjdGlvbi10YWJzXCJcclxuXHRcdH0sXHJcblx0XHRhcGk6IHtcclxuXHRcdFx0bmFtZXNwYWNlOiB0aGlzLl9jYW52YXNOYW1lc3BhY2UsXHJcblx0XHRcdHJvb3RfdXJsOiBcIi9hcGkvdjEvXCIsXHJcblx0XHRcdHBlcl9wYWdlOiAxMDAsXHJcblx0XHRcdHVybHM6IHtcclxuXHRcdFx0XHRjdXN0b21fZGF0YTogYHVzZXJzL3NlbGYvY3VzdG9tX2RhdGF7ZGF0YVBhdGh9P25zPSR7dGhpcy5fY2FudmFzTmFtZXNwYWNlfWAsXHJcblx0XHRcdFx0ZmF2b3JpdGVfY291cnNlczogXCJ1c2Vycy9zZWxmL2Zhdm9yaXRlcy9jb3Vyc2VzXCIsXHJcblx0XHRcdFx0Y3VzdG9tX2NvbG9yczogXCJ1c2Vycy9zZWxmL2NvbG9yc1wiLFxyXG5cdFx0XHRcdGFzc2lnbm1lbnRzOiBcInVzZXJzL3NlbGYvY291cnNlcy97Y291cnNlSUR9L2Fzc2lnbm1lbnRzXCIsXHJcblx0XHRcdFx0bW9kdWxlczogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vbW9kdWxlc1wiLFxyXG5cdFx0XHRcdG1vZHVsZV9pdGVtczogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vbW9kdWxlcy97bW9kdWxlSUR9L2l0ZW1zXCIsXHJcblx0XHRcdFx0ZmlsZV9kaXJlY3Q6IFwiY291cnNlcy97Y291cnNlSUR9L2ZpbGVzL3tmaWxlSUR9XCIsXHJcblx0XHRcdFx0bmF2aWdhdGlvbl90YWJzOiBcImNvdXJzZXMve2NvdXJzZUlEfS90YWJzXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0ZGF0YV91cmxzOiB7XHJcblx0XHRcdFx0YWN0aXZlX3N0YXRlczogXCJhY3RpdmVfc3RhdGVzXCIsXHJcblx0XHRcdFx0Y29tcGxldGVkX2Fzc2lnbm1lbnRzOiBcImNvbXBsZXRlZF9hc3NpZ25tZW50c1wiLFxyXG5cdFx0XHRcdGhpZGRlbl9hc3NpZ25tZW50czogXCJoaWRkZW5fYXNzaWdubWVudHNcIixcclxuXHRcdFx0XHR0YWJfcG9zaXRpb25zOiBcInRhYl9wb3NpdGlvbnNcIlxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuY29uc3QgVkFSUyA9IG5ldyBWYXJzKCk7XHJcbmV4cG9ydCBjb25zdCBWID0gVkFSUztcclxuZXhwb3J0IGRlZmF1bHQgVkFSUy5zYXNzSnNvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3ZhcnMudHMiLCJpbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0ICogYXMgQ2FudmFzQVBJIGZyb20gXCIuL2NhbnZhc19hcGlcIjtcclxuXHJcbmNsYXNzIERhdGEge1xyXG5cdGNvdXJzZVBhZ2U6IENhbnZhc1BhZ2U7XHJcblx0Y291cnNlSUQ6IG51bWJlcjtcclxuXHRtb2R1bGVzOiBNYXA8bnVtYmVyLCBNb2R1bGU+OyAvLyBtb2R1bGUgaWQgPT4gYXJyYXkgb2YgTW9kdWxlSXRlbVxyXG5cdG1vZHVsZUl0ZW1zOiBNYXA8bnVtYmVyLCBNb2R1bGVJdGVtPjsgLy8gbW9kdWxlIGl0ZW0gaWQgPT4gTW9kdWxlSXRlbVxyXG5cdHN0YXRlczogTWFwPHN0cmluZywgU3RhdGU+OyAvLyBzdGF0ZU5hbWUgPT4gU3RhdGVcclxuXHRjb3Vyc2VUYWJzOiBNYXA8bnVtYmVyLCBDdXN0b21Db3Vyc2VUYWI+OyAvLyBjb3Vyc2UgaWQgPT4gY291cnNlIHRhYlxyXG5cdG5hdlRhYnM6IE1hcDxzdHJpbmcsIE5hdlRhYj47IC8vIHRhYiBpZCBzdHJpbmcgPT4gdGFiXHJcblx0b25NYWluUGFnZTogYm9vbGVhbjtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0ZXh0ZW5zaW9uSWQ6IHN0cmluZztcclxuXHRlbGVtZW50czoge2p1bXBfYnV0dG9uOiBKUXVlcnksIHRvYzogSlF1ZXJ5fTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLm1vZHVsZXMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLm1vZHVsZUl0ZW1zID0gbmV3IE1hcCgpO1xyXG5cdFx0dGhpcy5zdGF0ZXMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLmNvdXJzZVRhYnMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLm5hdlRhYnMgPSBuZXcgTWFwKCk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50cyA9IHtqdW1wX2J1dHRvbjogbnVsbCwgdG9jOiBudWxsfTtcclxuXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBQYWdlIHtcclxuXHJcblx0Ym9keTogSlF1ZXJ5O1xyXG5cdHNjcm9sbGluZ0VsZW1lbnQ6IEpRdWVyeTtcclxuXHRtYWluPzogSlF1ZXJ5O1xyXG5cdGNvbnRlbnQ/OiBKUXVlcnk7XHJcblx0bGVmdD86IEpRdWVyeTtcclxuXHRzaWRlYmFyOiBKUXVlcnk7XHJcblx0Z3JhZGVzPzogSlF1ZXJ5O1xyXG5cclxuXHRpbml0aWFsaXplKCkge1xyXG5cclxuXHRcdHRoaXMuYm9keSA9ICQoXCJib2R5XCIpO1xyXG5cdFx0dGhpcy5zY3JvbGxpbmdFbGVtZW50ID0gJChkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IGRvY3VtZW50LmJvZHkpO1xyXG5cdFx0dGhpcy5zaWRlYmFyID0gJChcIiNtZW51XCIpO1xyXG5cdFx0dGhpcy5tYWluID0gJChcIiNtYWluXCIpO1xyXG5cclxuXHRcdGlmIChEQVRBLm9uTWFpblBhZ2UpIHtcclxuXHRcdFx0dGhpcy5jb250ZW50ID0gJChcIiNjb250ZW50XCIpO1xyXG5cdFx0XHR0aGlzLmxlZnQgPSAkKFwiI2xlZnQtc2lkZVwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoREFUQS5jb3Vyc2VQYWdlID09PSBDYW52YXNQYWdlLkdSQURFUylcclxuXHRcdFx0dGhpcy5ncmFkZXMgPSAkKFwiI2dyYWRlc19zdW1tYXJ5XCIpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEN1c3RvbUNvdXJzZVRhYiB7XHJcblx0cmVhZG9ubHkgaWQ6IG51bWJlcjtcclxuXHRyZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcblx0cmVhZG9ubHkgY29kZTogc3RyaW5nO1xyXG5cdHJlYWRvbmx5IGNvbG9yOiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGNvdXJzZURhdGE6IENhbnZhc0FQSS5Db3Vyc2UsIGNvbG9yOiBzdHJpbmcpIHtcclxuXHRcdHRoaXMuaWQgPSBjb3Vyc2VEYXRhLmlkO1xyXG5cdFx0dGhpcy5uYW1lID0gY291cnNlRGF0YS5uYW1lO1xyXG5cdFx0dGhpcy5jb2RlID0gY291cnNlRGF0YS5jb3Vyc2VfY29kZTtcclxuXHRcdHRoaXMuY29sb3IgPSBjb2xvcjtcclxuXHR9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2VGFiIHtcclxuXHRyZWFkb25seSBpZDogc3RyaW5nO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgaW5pdFBvc2l0aW9uOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfcG9zaXRpb246IG51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IodGFiRGF0YTogQ2FudmFzQVBJLlRhYikge1xyXG5cdFx0dGhpcy5pZCA9IHRhYkRhdGEuaWQ7XHJcblx0XHR0aGlzLl9wb3NpdGlvbiA9IG51bGw7XHJcblx0XHR0aGlzLmluaXRQb3NpdGlvbiA9IHRhYkRhdGEucG9zaXRpb247XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0UG9zaXRpb24ocG9zKSB7XHJcblx0XHR0aGlzLl9wb3NpdGlvbiA9IHBvcztcclxuXHR9XHJcblxyXG5cdGdldCBoYXNDdXN0b21Qb3NpdGlvbigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbiAhPSBudWxsO1xyXG5cdH1cclxuXHJcblx0Z2V0IHBvc2l0aW9uKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcG9zaXRpb24gPT0gbnVsbCA/IHRoaXMuaW5pdFBvc2l0aW9uIDogdGhpcy5fcG9zaXRpb24gPT09IC0xID8gbnVsbCA6IHRoaXMuX3Bvc2l0aW9uO1xyXG5cdH1cclxuXHJcblx0Z2V0IGhpZGRlbigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbiA9PT0gLTE7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdGUge1xyXG5cdHByaXZhdGUgbmFtZTogc3RyaW5nO1xyXG5cclxuXHRyZWFkb25seSBib2R5Q2xhc3M6IHN0cmluZztcclxuXHRyZWFkb25seSBvblBhZ2VzOiBDYW52YXNQYWdlW107XHJcblxyXG5cdHB1YmxpYyBhY3RpdmU6IGJvb2xlYW47XHJcblx0cHVibGljIG9uRW5hYmxlOiAoKSA9PiB2b2lkO1xyXG5cdHB1YmxpYyBvbkRpc2FibGU6ICgpID0+IHZvaWQ7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGtleSwgc3RhdGVEYXRhLCBhY3RpdmUpIHtcclxuXHRcdHRoaXMubmFtZSA9IGtleTtcclxuXHRcdHRoaXMuYm9keUNsYXNzID0gc3RhdGVEYXRhLmNzc0NsYXNzO1xyXG5cdFx0dGhpcy5hY3RpdmUgPSBhY3RpdmU7XHJcblx0XHR0aGlzLm9uUGFnZXMgPSBbXTtcclxuXHJcblx0XHRzdGF0ZURhdGEucGFnZXMuZm9yRWFjaCgocGFnZTogc3RyaW5nKSA9PiB7XHJcblx0XHRcdGNvbnN0IF9wYWdlID0gQ2FudmFzUGFnZVtwYWdlLnRvVXBwZXJDYXNlKCldO1xyXG5cdFx0XHRpZiAoX3BhZ2UgIT09IHVuZGVmaW5lZClcclxuXHRcdFx0XHR0aGlzLm9uUGFnZXMucHVzaChfcGFnZSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG9uQ2hhbmdlKG5ld1N0YXRlOiBib29sZWFuKSB7XHJcblx0XHRpZiAobmV3U3RhdGUgJiYgdGhpcy5vbkVuYWJsZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB0aGlzLm9uRW5hYmxlKCk7XHJcblx0XHRlbHNlIGlmICh0aGlzLm9uRGlzYWJsZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB0aGlzLm9uRGlzYWJsZSgpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2R1bGUge1xyXG5cdHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuXHRyZWFkb25seSBpZDogbnVtYmVyO1xyXG5cdHJlYWRvbmx5IGl0ZW1Db3VudDogbnVtYmVyO1xyXG5cdHJlYWRvbmx5IGl0ZW1zOiBNb2R1bGVJdGVtW107XHJcblxyXG5cdGNvbnN0cnVjdG9yKG1vZHVsZUpzb246IENhbnZhc0FQSS5Nb2R1bGUpIHtcclxuXHRcdHRoaXMubmFtZSA9IG1vZHVsZUpzb24ubmFtZTtcclxuXHRcdHRoaXMuaWQgPSBtb2R1bGVKc29uLmlkO1xyXG5cdFx0dGhpcy5pdGVtQ291bnQgPSBtb2R1bGVKc29uLml0ZW1zX2NvdW50O1xyXG5cdFx0dGhpcy5pdGVtcyA9IFtdO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2R1bGVJdGVtIHtcclxuXHRwcml2YXRlIF9pZDogbnVtYmVyO1xyXG5cdHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuXHRwcml2YXRlIG1vZHVsZUlkOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfdHlwZTogTW9kdWxlSXRlbVR5cGU7XHJcblx0cHJpdmF0ZSBhc3NpZ25tZW50SWQ6IG51bWJlcjtcclxuXHRwcml2YXRlIF9jb250ZW50SWQ6IG51bWJlcjtcclxuXHRwcml2YXRlIF9maWxlRGF0YTogQ2FudmFzQVBJLkZpbGU7XHJcblx0cHJpdmF0ZSBfZXh0ZXJuYWxVcmw6IHN0cmluZztcclxuXHJcblx0cHVibGljIGlzU3VibWl0dGVkOiBib29sZWFuO1xyXG5cclxuXHRwdWJsaWMgY2hlY2tlZDogYm9vbGVhbjtcclxuXHRwdWJsaWMgaGlkZGVuOiBib29sZWFuO1xyXG5cdHByaXZhdGUgX2NoZWNrYm94RWxlbWVudDogSlF1ZXJ5O1xyXG5cdHByaXZhdGUgX2hpZGVFbGVtZW50OiBKUXVlcnk7XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgYnlDb250ZW50SWQgPSBuZXcgTWFwPG51bWJlciwgTW9kdWxlSXRlbT4oKTtcclxuXHJcblx0Y29uc3RydWN0b3IobW9kdWxlSXRlbUpzb24/OiBDYW52YXNBUEkuTW9kdWxlSXRlbSkge1xyXG5cdFx0aWYgKG1vZHVsZUl0ZW1Kc29uKSB0aGlzLnVwZGF0ZShtb2R1bGVJdGVtSnNvbik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3RhdGljIGZyb21Db250ZW50SWQoY29udGVudElkOiBudW1iZXIpOiBNb2R1bGVJdGVtIHtcclxuXHRcdGNvbnN0IGl0ZW0gPSBuZXcgTW9kdWxlSXRlbSgpO1xyXG5cdFx0aXRlbS5fY29udGVudElkID0gY29udGVudElkO1xyXG5cdFx0TW9kdWxlSXRlbS5ieUNvbnRlbnRJZC5zZXQoY29udGVudElkLCBpdGVtKTtcclxuXHRcdHJldHVybiBpdGVtO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHVwZGF0ZShtb2R1bGVJdGVtSnNvbjogQ2FudmFzQVBJLk1vZHVsZUl0ZW0pIHtcclxuXHRcdHRoaXMuX2lkID0gbW9kdWxlSXRlbUpzb24uaWQ7XHJcblx0XHR0aGlzLl9uYW1lID0gbW9kdWxlSXRlbUpzb24udGl0bGU7XHJcblx0XHR0aGlzLm1vZHVsZUlkID0gbW9kdWxlSXRlbUpzb24ubW9kdWxlX2lkO1xyXG5cdFx0dGhpcy5fZXh0ZXJuYWxVcmwgPSBtb2R1bGVJdGVtSnNvbi5leHRlcm5hbF91cmwgfHwgbnVsbDtcclxuXHJcblx0XHRjb25zdCB0eXBlU3RyaW5nOiBzdHJpbmcgPSBtb2R1bGVJdGVtSnNvbi50eXBlXHJcblx0XHRcdC5yZXBsYWNlKC8oW0EtWl0pL2csIChyLCBzKSA9PiBcIl9cIiArIHMpXHJcblx0XHRcdC5yZXBsYWNlKC9eXy8sIFwiXCIpLnRvVXBwZXJDYXNlKCk7XHJcblxyXG5cdFx0dGhpcy5fdHlwZSA9IE1vZHVsZUl0ZW1UeXBlW3R5cGVTdHJpbmddO1xyXG5cclxuXHRcdGlmICh0aGlzLl90eXBlID09PSB1bmRlZmluZWQpXHJcblx0XHRcdGNvbnNvbGUud2FybihgVW5rbm93biBtb2R1bGUgaXRlbSB0eXBlOiBcIiR7dHlwZVN0cmluZ31cImApO1xyXG5cclxuXHRcdHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5oaWRkZW4gPSBmYWxzZTtcclxuXHJcblx0XHRpZiAodGhpcy5fdHlwZSA9PT0gTW9kdWxlSXRlbVR5cGUuQVNTSUdOTUVOVClcclxuXHRcdFx0dGhpcy5zZXRBc3NpZ25tZW50SWQobW9kdWxlSXRlbUpzb24uY29udGVudF9pZCk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRoaXMuYXNzaWdubWVudElkID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRBc3NpZ25tZW50SWQoaWQ6IG51bWJlcikgeyB0aGlzLmFzc2lnbm1lbnRJZCA9IGlkOyB9XHJcblx0cHVibGljIHNldEZpbGVEYXRhKGRhdGE6IENhbnZhc0FQSS5GaWxlKSB7IHRoaXMuX2ZpbGVEYXRhID0gZGF0YTsgfVxyXG5cclxuXHRnZXQgY2FudmFzRWxlbWVudElkKCkge1xyXG5cdFx0c3dpdGNoIChEQVRBLmNvdXJzZVBhZ2UpIHtcclxuXHRcdFx0Y2FzZSBDYW52YXNQYWdlLk1PRFVMRVM6XHJcblx0XHRcdFx0cmV0dXJuIFwiY29udGV4dF9tb2R1bGVfaXRlbV9cIiArIHRoaXMuX2lkOyAvLyBsaSBlbGVtZW50XHJcblx0XHRcdGNhc2UgQ2FudmFzUGFnZS5HUkFERVM6XHJcblx0XHRcdFx0cmV0dXJuIFwic3VibWlzc2lvbl9cIiArIHRoaXMuYXNzaWdubWVudElkOyAvLyB0ciBlbGVtZW50XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgaWQoKSB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG5cdGdldCBuYW1lKCkgeyByZXR1cm4gdGhpcy5fbmFtZTtcdH1cclxuXHRnZXQgdHlwZSgpOiBNb2R1bGVJdGVtVHlwZSB7IHJldHVybiB0aGlzLl90eXBlOyB9XHJcblx0Z2V0IGlzR3JhZGVkKCkgeyByZXR1cm4gdGhpcy5hc3NpZ25tZW50SWQgIT09IG51bGw7IH1cclxuXHRnZXQgaXNTdWJIZWFkZXIoKSB7IHJldHVybiB0aGlzLl90eXBlID09PSBNb2R1bGVJdGVtVHlwZS5TVUJfSEVBREVSOyB9XHJcblx0Z2V0IG1vZHVsZSgpIHsgcmV0dXJuIERBVEEubW9kdWxlcy5nZXQodGhpcy5tb2R1bGVJZCk7IH1cclxuXHRnZXQgZXh0ZXJuYWxVcmwoKSB7IHJldHVybiB0aGlzLl9leHRlcm5hbFVybDsgfVxyXG5cdGdldCBjb250ZW50SWQoKSB7IHJldHVybiB0aGlzLl9jb250ZW50SWQ7IH1cclxuXHJcblx0Z2V0IGNoZWNrYm94RWxlbWVudCgpOiBKUXVlcnkgeyByZXR1cm4gdGhpcy5fY2hlY2tib3hFbGVtZW50OyB9XHJcblx0c2V0IGNoZWNrYm94RWxlbWVudCh2YWx1ZTogSlF1ZXJ5KSB7XHJcblx0XHRpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUubGVuZ3RoID09PSAxKVxyXG5cdFx0XHR0aGlzLl9jaGVja2JveEVsZW1lbnQgPSB2YWx1ZTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBNb2R1bGUgSXRlbSBFbGVtZW50OiBcIiArIHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdGdldCBoaWRlRWxlbWVudCgpOiBKUXVlcnkgeyByZXR1cm4gdGhpcy5faGlkZUVsZW1lbnQ7IH1cclxuXHRzZXQgaGlkZUVsZW1lbnQodmFsdWU6IEpRdWVyeSkge1xyXG5cdFx0aWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlLmxlbmd0aCA9PT0gMSlcclxuXHRcdFx0dGhpcy5faGlkZUVsZW1lbnQgPSB2YWx1ZTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBNb2R1bGUgSXRlbSBFbGVtZW50OiBcIiArIHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdGdldCBmaWxlRGF0YSgpOiBDYW52YXNBUEkuRmlsZSB7IHJldHVybiB0aGlzLl9maWxlRGF0YTsgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gTW9kdWxlSXRlbVR5cGUge1xyXG5cdEFTU0lHTk1FTlQsIFNVQl9IRUFERVIsIERJU0NVU1NJT04sIFFVSVosIFBBR0UsIEZJTEUsIEVYVEVSTkFMX1VSTCwgRVhURVJOQUxfVE9PTFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBDYW52YXNQYWdlIHtcclxuXHRNT0RVTEVTLCBHUkFERVMsIEhPTUUsIFVTRVJTLCBHUk9VUFMsIENPTExBQk9SQVRJT05TLCBESVNDVVNTSU9OX1RPUElDUywgRVhURVJOQUxfVE9PTFMsIEFTU0lHTk1FTlRTXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE1lc3NhZ2VUeXBlIHtcclxuXHRCQVNJQywgU1RBVEVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VEYXRhIHtcclxuXHRhY3Rpb246IHN0cmluZztcclxuXHR0eXBlOiBNZXNzYWdlVHlwZTtcclxuXHJcblx0Y29uc3RydWN0b3IoYWN0aW9uOiBzdHJpbmcsIHR5cGU/OiBNZXNzYWdlVHlwZSkge1xyXG5cdFx0dGhpcy5hY3Rpb24gPSBhY3Rpb247XHJcblx0XHR0aGlzLnR5cGUgPSB0eXBlIHx8IE1lc3NhZ2VUeXBlLkJBU0lDO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXRlTWVzc2FnZURhdGEgZXh0ZW5kcyBNZXNzYWdlRGF0YSB7XHJcblx0c3RhdGVOYW1lOiBzdHJpbmc7XHJcblx0c3RhdGU6IGJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFjdGlvbjogXCJnZXRcIiB8IFwic2V0XCIsIHN0YXRlTmFtZTogc3RyaW5nLCBzdGF0ZT86IGJvb2xlYW4pIHtcclxuXHRcdHN1cGVyKGFjdGlvbiwgTWVzc2FnZVR5cGUuU1RBVEUpO1xyXG5cclxuXHRcdHRoaXMuc3RhdGVOYW1lID0gc3RhdGVOYW1lO1xyXG5cdFx0dGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG5cclxuXHRcdGlmIChhY3Rpb24gPT09IFwic2V0XCIgJiYgdGhpcy5zdGF0ZSA9PT0gdW5kZWZpbmVkKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHN0YXRlIG1lc3NhZ2U6IG5vIGJvb2xlYW4gdG8gc2V0IHN0YXRlIHRvXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV4Y2VwdGlvbiB7XHJcblx0cHJpdmF0ZSByZWFzb246IHN0cmluZztcclxuXHRwcml2YXRlIGZhdGFsOiBib29sZWFuO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihyZWFzb246IHN0cmluZywgZmF0YWw/OiBib29sZWFuKSB7XHJcblx0XHRpZiAoZmF0YWwgPT09IHVuZGVmaW5lZCkgZmF0YWwgPSBmYWxzZTtcclxuXHRcdHRoaXMucmVhc29uID0gcmVhc29uO1xyXG5cdFx0dGhpcy5mYXRhbCA9IGZhdGFsO1xyXG5cdH1cclxuXHJcblx0Z2V0IGlzRmF0YWwoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5mYXRhbDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB0b1N0cmluZygpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlYXNvbjtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBEQVRBID0gbmV3IERhdGEoKTtcclxuZXhwb3J0IGNvbnN0IFBBR0UgPSBuZXcgUGFnZSgpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvb2JqZWN0cy50cyIsImltcG9ydCB7IFYgfSBmcm9tIFwiLi92YXJzXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VEYXRhIH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xyXG5cclxuXHRwcml2YXRlIHN0YXRpYyBBQ0NFU1NfVE9LRU46IHN0cmluZztcclxuXHJcblx0c3RhdGljIGZvcm1hdChzdHI6IHN0cmluZywgb2JqOiBvYmplY3QpOiBzdHJpbmcge1xyXG5cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG5cdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpXHJcblx0XHRcdFx0c3RyID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcXFx7XCIgKyBrZXkgKyBcIlxcXFx9XCIsIFwiZ2lcIiksIG9ialtrZXldKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3RyO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldE9yRGVmYXVsdDxUPihvYmo6IG9iamVjdCwga2V5OiBQcm9wZXJ0eUtleSwgZGVmOiBUKTogVCB7XHJcblx0XHRpZiAob2JqID09PSB1bmRlZmluZWQgfHwgb2JqW2tleV0gPT09IHVuZGVmaW5lZCkgcmV0dXJuIGRlZjtcclxuXHRcdGVsc2UgcmV0dXJuIG9ialtrZXldO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHBlclBhZ2UodXJsOiBzdHJpbmcsIHBlclBhZ2U6IG51bWJlcikge1xyXG5cdFx0cmV0dXJuIGAke3VybH0/cGVyX3BhZ2U9JHtwZXJQYWdlfWA7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZm9ybWF0VXJsKHVybDogc3RyaW5nLCBmb3JtYXRPYmo/OiB7cGVyUGFnZT86IG51bWJlciwgW2tleTogc3RyaW5nXTogYW55fSkge1xyXG5cclxuXHRcdGlmIChmb3JtYXRPYmogIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRpZiAoZm9ybWF0T2JqLnBlclBhZ2UgIT09IHVuZGVmaW5lZClcclxuXHRcdFx0XHR1cmwgPSBVdGlscy5wZXJQYWdlKHVybCwgZm9ybWF0T2JqLnBlclBhZ2UpO1xyXG5cdFx0XHR1cmwgPSBVdGlscy5mb3JtYXQodXJsLCBmb3JtYXRPYmopO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBWLmNhbnZhcy5hcGkucm9vdF91cmwgKyB1cmw7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgZ2V0SlNPTjxUPih1cmw6IHN0cmluZyk6IFByb21pc2U8VD4ge1xyXG5cclxuXHRcdFV0aWxzLmNoZWNrVG9rZW4oKTtcclxuXHJcblx0XHRjb25zdCByZXNwID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcblx0XHRcdG1ldGhvZDogXCJHRVRcIixcclxuXHRcdFx0aGVhZGVyczogbmV3IEhlYWRlcnMoe1xyXG5cdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdFx0XHRcdFwiQXV0aG9yaXphdGlvblwiOiBcIkJlYXJlciBcIiArIFV0aWxzLkFDQ0VTU19UT0tFTlxyXG5cdFx0XHR9KVxyXG5cdFx0fSBhcyBSZXF1ZXN0SW5pdCk7XHJcblxyXG5cdFx0aWYgKHJlc3Auc3RhdHVzID09PSA0MDQpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiNDA0IGVycm9yIHdoZW4gZ2V0dGluZyBKU09OXCIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGlmIChyZXNwLnN0YXR1cyA9PT0gNDAwKVxyXG5cdFx0XHRcdGNvbnNvbGUuZGVidWcoXCI0MDAgZXJyb3Igd2hlbiBnZXR0aW5nIEpTT04gd2FzIE9LQVlcIik7XHJcblxyXG5cdFx0XHRsZXQganNvbiA9IGF3YWl0IHJlc3AudGV4dCgpO1xyXG5cdFx0XHRqc29uID0ganNvbi5yZXBsYWNlKFwid2hpbGUoMSk7XCIsIFwiXCIpO1xyXG5cclxuXHRcdFx0cmV0dXJuIEpTT04ucGFyc2UoanNvbik7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHB1dERhdGEodXJsLCBkYXRhOiBhbnlbXSB8IGFueSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG5cclxuXHRcdFV0aWxzLmNoZWNrVG9rZW4oKTtcclxuXHJcblx0XHRjb25zdCBib2R5RGF0YSA9IHtuczogVi5jYW52YXMuYXBpLm5hbWVzcGFjZSwgZGF0YX07XHJcblx0XHRjb25zdCBtZXRob2QgPSBkYXRhIGluc3RhbmNlb2YgQXJyYXkgJiYgZGF0YS5sZW5ndGggPiAwIHx8IGRhdGEgIT09IHVuZGVmaW5lZCA/IFwiUFVUXCIgOiBcIkRFTEVURVwiO1xyXG5cclxuXHRcdGlmIChtZXRob2QgPT09IFwiREVMRVRFXCIpXHJcblx0XHRcdGRlbGV0ZSBib2R5RGF0YS5kYXRhO1xyXG5cclxuXHRcdGNvbnN0IG9wcyA9IHtcclxuXHRcdFx0bWV0aG9kLFxyXG5cdFx0XHRoZWFkZXJzOiBuZXcgSGVhZGVycyh7XHJcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcblx0XHRcdFx0XCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIFwiICsgVXRpbHMuQUNDRVNTX1RPS0VOXHJcblx0XHRcdH0pLFxyXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShib2R5RGF0YSlcclxuXHRcdH0gYXMgUmVxdWVzdEluaXQ7XHJcblxyXG5cdFx0Y29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHVybCwgb3BzKTtcclxuXHJcblx0XHRpZiAoIXJlc3Aub2sgfHwgcmVzcC5zdGF0dXMgPT09IDQwMSkgeyAvLyA0MDEgdW5hdXRob3JpemVkXHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoYFVuYWJsZSB0byAke21ldGhvZH0gZGF0YSB0byAke3VybH0uIHJlc3A6YCwgSlNPTi5zdHJpbmdpZnkocmVzcCkpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIGVkaXREYXRhQXJyYXkodXJsOiBzdHJpbmcsIGFwcGVuZDogYm9vbGVhbiwgdmFsdWVzOiBhbnlbXSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG5cclxuXHRcdGNvbnN0IGV4aXN0aW5nRGF0YTogYW55W10gPSAoXHJcblx0XHRcdC8vIHVybCBpcyBzYW1lIGZvciBnZXQvcHV0XHJcblx0XHRcdGF3YWl0IFV0aWxzLmdldEpTT048e2RhdGE6IGFueVtdfT4odXJsKVxyXG5cdFx0KS5kYXRhIHx8IFtdO1xyXG5cclxuXHRcdGxldCBuZXdBcnJheTtcclxuXHJcblx0XHRpZiAoYXBwZW5kKSB7XHJcblx0XHRcdG5ld0FycmF5ID0gZXhpc3RpbmdEYXRhLmNvbmNhdCh2YWx1ZXMpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7IC8vIHN1YnRyYWN0IGZyb20gZGF0YSBhcnJheVxyXG5cdFx0XHRpZiAoZXhpc3RpbmdEYXRhLmxlbmd0aCA9PT0gMClcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0bmV3QXJyYXkgPSBleGlzdGluZ0RhdGEuZmlsdGVyKHZhbCA9PiAhdmFsdWVzLmluY2x1ZGVzKHZhbCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBVdGlscy5wdXREYXRhKHVybCwgbmV3QXJyYXkpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHdhaXQobXM6IG51bWJlcikge1xyXG5cdFx0YXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY2hlY2tUb2tlbigpOiB2b2lkIHwgbmV2ZXIge1xyXG5cdFx0aWYgKFV0aWxzLkFDQ0VTU19UT0tFTiA9PT0gbnVsbClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQWNjZXNzIHRva2VuIG5vdCBzZXRcIik7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgbG9hZFRva2VuKCkge1xyXG5cdFx0VXRpbHMuQUNDRVNTX1RPS0VOID0gYXdhaXQgbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG5cdFx0XHRjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChWLm1pc2MudG9rZW5fa2V5LCByZXN1bHREYXRhID0+IHtcclxuXHJcblx0XHRcdFx0Y29uc3Qgc3VjY2VzcyA9IFV0aWxzLkFDQ0VTU19UT0tFTiAhPT0gbnVsbCB8fCByZXN1bHREYXRhW1YubWlzYy50b2tlbl9rZXldO1xyXG5cdFx0XHRcdGlmIChzdWNjZXNzKSByZXNvbHZlKHJlc3VsdERhdGFbVi5taXNjLnRva2VuX2tleV0pO1xyXG5cdFx0XHRcdGVsc2UgcmVqZWN0KCk7XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhY2Nlc3NUb2tlblByb21wdCgpIHtcclxuXHRcdGNvbnN0IG9wZW5PcHRpb25zID0gY29uZmlybShcIk1pc3NpbmcgYWNjZXNzIHRva2VuLCBwcmVzcyBPSyB0byBvcGVuIGV4dGVuc2lvbiBvcHRpb25zXCIpO1xyXG5cdFx0aWYgKG9wZW5PcHRpb25zKSAvLyBUT0RPIHNlbmQgdGFiIElEIHdpdGggdGhpcyBtZXNzYWdlP1xyXG5cdFx0XHRjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShuZXcgTWVzc2FnZURhdGEoXCJvcGVuIG9wdGlvbnNcIikpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHJ1bkNiKGNhbGxiYWNrRnVuY3Rpb246ICgpID0+IHZvaWQpIHtcclxuXHRcdGlmIChjYWxsYmFja0Z1bmN0aW9uICE9PSB1bmRlZmluZWQpXHJcblx0XHRcdGNhbGxiYWNrRnVuY3Rpb24oKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBzYWZlQ2I8RiBleHRlbmRzICgoLi4uYXJncykgPT4gdm9pZCk+KGNhbGxiYWNrRnVuY3Rpb246IEYgfCB1bmRlZmluZWQpOiBGIHtcclxuXHRcdGlmIChjYWxsYmFja0Z1bmN0aW9uICE9PSB1bmRlZmluZWQpXHJcblx0XHRcdHJldHVybiBjYWxsYmFja0Z1bmN0aW9uO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gKCgpID0+IHt9KSBhcyBGOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWVtcHR5XHJcblx0fVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbHMudHMiLCJpbXBvcnQgeyBEQVRBLCBQQUdFLCBFeGNlcHRpb24sIEN1c3RvbUNvdXJzZVRhYiwgTmF2VGFiLFxyXG5cdFN0YXRlLCBNb2R1bGUsIE1vZHVsZUl0ZW0sIE1lc3NhZ2VEYXRhLCAgU3RhdGVNZXNzYWdlRGF0YSxcclxuXHRDYW52YXNQYWdlLCBNZXNzYWdlVHlwZSwgTW9kdWxlSXRlbVR5cGUgfSBmcm9tIFwiLi9vYmplY3RzXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBWIH0gZnJvbSBcIi4vdmFyc1wiO1xyXG5pbXBvcnQgKiBhcyBDYW52YXNBUEkgZnJvbSBcIi4vY2FudmFzX2FwaVwiO1xyXG5cclxuKGFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7XHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vICAgICAgICAgICBtYWluIGluaXRpYWxpemF0aW9uXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdChmdW5jdGlvbigpIHtcclxuXHJcblx0XHREQVRBLmV4dGVuc2lvbklkID0gY2hyb21lLnJ1bnRpbWUuaWQ7XHJcblx0XHREQVRBLm5hbWUgPSBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLm5hbWU7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBsb2dUeXBlIG9mIFwibG9nIGRlYnVnIGluZm8gd2FybiBlcnJvciBkaXJcIi5zcGxpdChcIiBcIikpIHtcclxuXHRcdFx0Y29uc3Qgb3JpZyA9IGNvbnNvbGVbbG9nVHlwZV07XHJcblx0XHRcdGNvbnNvbGVbbG9nVHlwZV0gPSBvcmlnLmJpbmQoY29uc29sZSwgYFske0RBVEEubmFtZX1dIFske2xvZ1R5cGUudG9VcHBlckNhc2UoKX1dYCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gbG9hZCBjb3Vyc2UgaWQgYW5kIHdoYXQgcGFnZSB1c2VyIGlzIG9uIHdpdGhpbiB0aGF0IGNvdXJzZVxyXG5cdFx0Y29uc3QgdXJsTWF0Y2ggPSAvY291cnNlc1xcLyhcXGQrKSg/OlxcLyhcXHcrKSk/LiovLmV4ZWMoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUpO1xyXG5cdFx0Y29uc3Qgb25Db3Vyc2VQYWdlID0gdXJsTWF0Y2ggIT09IG51bGw7XHJcblx0XHREQVRBLmNvdXJzZVBhZ2UgPSBvbkNvdXJzZVBhZ2UgPyBDYW52YXNQYWdlWyh1cmxNYXRjaFsyXSB8fCBcImhvbWVcIikudG9VcHBlckNhc2UoKV0gOiBudWxsO1xyXG5cdFx0REFUQS5jb3Vyc2VJRCA9IG9uQ291cnNlUGFnZSA/IE51bWJlcih1cmxNYXRjaFsxXSkgOiBudWxsO1xyXG5cdFx0REFUQS5vbk1haW5QYWdlID0gW0NhbnZhc1BhZ2UuTU9EVUxFUywgQ2FudmFzUGFnZS5HUkFERVNdLmluY2x1ZGVzKERBVEEuY291cnNlUGFnZSk7XHJcblxyXG5cdFx0aWYgKG9uQ291cnNlUGFnZSlcclxuXHRcdFx0Y29uc29sZS5kZWJ1ZyhgT24gY291cnNlICMke0RBVEEuY291cnNlSUR9IHBhZ2UsIGF0ICR7Q2FudmFzUGFnZVtEQVRBLmNvdXJzZVBhZ2VdfWApO1xyXG5cclxuXHR9KSgpO1xyXG5cclxuXHQvLyBiZWdpbiBhc3luYyBvcGVyYXRpb25zXHJcblxyXG5cdGNvbnN0IGluaXRTdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuXHQvLyBsb2FkIHZhcmlhYmxlc1xyXG5cclxuXHQvLyBUT0RPIGltcHJvdmUgdmFyaWFibGUgbG9hZGluZ1xyXG5cclxuXHQvLyB0cnkgdG8gbG9hZCBhY2Nlc3MgdG9rZW5cclxuXHR0cnkge1xyXG5cdFx0YXdhaXQgVXRpbHMubG9hZFRva2VuKCk7XHJcblx0fVxyXG5cdGNhdGNoIChlKSB7XHJcblx0XHRVdGlscy5hY2Nlc3NUb2tlblByb21wdCgpO1xyXG5cdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbihcIk1pc3NpbmcgYWNjZXNzIHRva2VuOyBtdXN0IHJlZnJlc2hcIiwgdHJ1ZSk7XHJcblx0fVxyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyAgICAgICAgICAgICAgIGNvdXJzZSB0YWJzXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdGNvbnN0IGNvdXJzZVRhYkZsb3cgPSBhc3luYyBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRjb25zdCBjb2xvcnNVcmwgPSBVdGlscy5mb3JtYXRVcmwoVi5jYW52YXMuYXBpLnVybHMuY3VzdG9tX2NvbG9ycyk7XHJcblx0XHRjb25zdCBjb3Vyc2VDb2xvcnMgPSAoXHJcblx0XHRcdGF3YWl0IFV0aWxzLmdldEpTT048e2N1c3RvbV9jb2xvcnM6IE1hcDxzdHJpbmcsIHN0cmluZz59Pihjb2xvcnNVcmwpXHJcblx0XHQpLmN1c3RvbV9jb2xvcnM7XHJcblxyXG5cdFx0Y29uc3QgZmF2b3JpdGVzVXJsID0gVXRpbHMuZm9ybWF0VXJsKFYuY2FudmFzLmFwaS51cmxzLmZhdm9yaXRlX2NvdXJzZXMpO1xyXG5cdFx0Y29uc3QgZmF2b3JpdGVDb3Vyc2VzID1cclxuXHRcdFx0YXdhaXQgVXRpbHMuZ2V0SlNPTjxDYW52YXNBUEkuQ291cnNlW10+KGZhdm9yaXRlc1VybCk7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBjb3Vyc2VEYXRhIG9mIGZhdm9yaXRlQ291cnNlcykge1xyXG5cdFx0XHRjb25zdCBjb2xvciA9IGNvdXJzZUNvbG9yc1tcImNvdXJzZV9cIiArIGNvdXJzZURhdGEuaWRdO1xyXG5cdFx0XHREQVRBLmNvdXJzZVRhYnMuc2V0KGNvdXJzZURhdGEuaWQsIG5ldyBDdXN0b21Db3Vyc2VUYWIoY291cnNlRGF0YSwgY29sb3IpKTtcclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gICAgICAgICAgICBuYXZpZ2F0aW9uIHRhYnNcclxuXHQvLyAgcmVxdWlyZXM6IGNvdXJzZSBwYWdlXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdGNvbnN0IG5hdlRhYkZsb3cgPSBhc3luYyBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRjb25zdCBuYXZUYWJVcmwgPSBVdGlscy5mb3JtYXRVcmwoVi5jYW52YXMuYXBpLnVybHMubmF2aWdhdGlvbl90YWJzLCB7XHJcblx0XHRcdHBlclBhZ2U6IDI1LFxyXG5cdFx0XHRjb3Vyc2VJRDogREFUQS5jb3Vyc2VJRFxyXG5cdFx0fSk7XHJcblx0XHRjb25zdCBuYXZUYWJzID0gYXdhaXQgVXRpbHMuZ2V0SlNPTjxDYW52YXNBUEkuVGFiW10+KG5hdlRhYlVybCk7XHJcblxyXG5cdFx0Zm9yIChjb25zdCB0YWIgb2YgbmF2VGFicylcclxuXHRcdFx0REFUQS5uYXZUYWJzLnNldCh0YWIuaWQsIG5ldyBOYXZUYWIodGFiKSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vICAgICAgICAgICAgICBhc3NpZ25tZW50c1xyXG5cdC8vICByZXF1aXJlczogbW9kdWxlcyBvciBncmFkZXMgcGFnZVxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRjb25zdCBhc3NpZ25tZW50RmxvdyA9IGFzeW5jIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdC8vIGhvcGVmdWxseSAxMDAwIGlzIGVub3VnaCB0byBnZXQgYWxsIGluIG9uZSBnb1xyXG5cdFx0Y29uc3QgYXNzaWdubWVudHNVcmwgPSBVdGlscy5mb3JtYXRVcmwoVi5jYW52YXMuYXBpLnVybHMuYXNzaWdubWVudHMsIHtcclxuXHRcdFx0cGVyUGFnZTogMTAwMCxcclxuXHRcdFx0Y291cnNlSUQ6IERBVEEuY291cnNlSURcclxuXHRcdH0pO1xyXG5cdFx0Y29uc3QgYXNzaWdubWVudHMgPSBhd2FpdCBVdGlscy5nZXRKU09OPENhbnZhc0FQSS5Bc3NpZ25tZW50W10+KGFzc2lnbm1lbnRzVXJsKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGFzc2lnbm1lbnRKc29uIG9mIGFzc2lnbm1lbnRzKSB7XHJcblxyXG5cdFx0XHRsZXQgY29udGVudElkOiBudW1iZXI7XHJcblx0XHRcdGlmIChhc3NpZ25tZW50SnNvbi5xdWl6X2lkKVxyXG5cdFx0XHRcdGNvbnRlbnRJZCA9IGFzc2lnbm1lbnRKc29uLnF1aXpfaWQ7XHJcblx0XHRcdGVsc2UgaWYgKGFzc2lnbm1lbnRKc29uLmRpc2N1c3Npb25fdG9waWMpXHJcblx0XHRcdFx0Y29udGVudElkID0gYXNzaWdubWVudEpzb24uZGlzY3Vzc2lvbl90b3BpYy5pZDtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGNvbnRlbnRJZCA9IGFzc2lnbm1lbnRKc29uLmlkO1xyXG5cclxuXHRcdFx0bGV0IGl0ZW06IE1vZHVsZUl0ZW07XHJcblx0XHRcdGlmIChNb2R1bGVJdGVtLmJ5Q29udGVudElkLmhhcyhjb250ZW50SWQpKVxyXG5cdFx0XHRcdGl0ZW0gPSBNb2R1bGVJdGVtLmJ5Q29udGVudElkLmdldChjb250ZW50SWQpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0aXRlbSA9IE1vZHVsZUl0ZW0uZnJvbUNvbnRlbnRJZChjb250ZW50SWQpO1xyXG5cclxuXHRcdFx0aXRlbS5zZXRBc3NpZ25tZW50SWQoYXNzaWdubWVudEpzb24uaWQpO1xyXG5cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyAgICAgICBtb2R1bGVzLCBpdGVtcywgYW5kIGZpbGVzXHJcblx0Ly8gIHJlcXVpcmVzOiBtb2R1bGVzIG9yIGdyYWRlcyBwYWdlXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdGNvbnN0IG1vZHVsZUl0ZW1GbG93ID0gYXN5bmMgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8gPT09PT0gbW9kdWxlcyA9PT09PVxyXG5cclxuXHRcdGNvbnN0IG1vZHVsZXNVcmwgPSBVdGlscy5mb3JtYXRVcmwoVi5jYW52YXMuYXBpLnVybHMubW9kdWxlcywge1xyXG5cdFx0XHRwZXJQYWdlOiAyNSxcclxuXHRcdFx0Y291cnNlSUQ6IERBVEEuY291cnNlSURcclxuXHRcdH0pO1xyXG5cdFx0Y29uc3QgbW9kdWxlcyA9IGF3YWl0IFV0aWxzLmdldEpTT048Q2FudmFzQVBJLk1vZHVsZVtdPihtb2R1bGVzVXJsKTtcclxuXHRcdGZvciAoY29uc3QgbW9kdWxlRGF0YSBvZiBtb2R1bGVzKSB7XHJcblx0XHRcdERBVEEubW9kdWxlcy5zZXQobW9kdWxlRGF0YS5pZCwgbmV3IE1vZHVsZShtb2R1bGVEYXRhKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09PT0gbW9kdWxlIGl0ZW1zID09PT09XHJcblxyXG5cdFx0Y29uc3QgbW9kdWxlSWRzID0gQXJyYXkuZnJvbShEQVRBLm1vZHVsZXMua2V5cygpKTtcclxuXHRcdGNvbnN0IGl0ZW1TZXRQcm9taXNlczogQXJyYXk8UHJvbWlzZTxDYW52YXNBUEkuTW9kdWxlSXRlbVtdPj4gPVxyXG5cdFx0XHRtb2R1bGVJZHMubWFwKG1vZElkID0+IERBVEEubW9kdWxlcy5nZXQobW9kSWQpKVxyXG5cdFx0XHRcdC5maWx0ZXIobW9kID0+IG1vZC5pdGVtQ291bnQgPiAwKVxyXG5cdFx0XHRcdC5tYXAobW9kdWxlID0+IHtcclxuXHJcblx0XHRcdFx0XHRjb25zdCBtb2R1bGVJdGVtc1VybCA9IFV0aWxzLnBlclBhZ2UoXHJcblx0XHRcdFx0XHRcdFV0aWxzLmZvcm1hdFVybChWLmNhbnZhcy5hcGkudXJscy5tb2R1bGVfaXRlbXMsIHtcclxuXHRcdFx0XHRcdFx0XHRtb2R1bGVJRDogbW9kdWxlLmlkLFxyXG5cdFx0XHRcdFx0XHRcdGNvdXJzZUlEOiBEQVRBLmNvdXJzZUlEXHJcblx0XHRcdFx0XHRcdH0pLFxyXG5cdFx0XHRcdFx0XHRtb2R1bGUuaXRlbUNvdW50KTtcclxuXHJcblx0XHRcdFx0XHQvLyByZXR1cm4gdGhlIHByb21pc2UgaW5zdGVhZCBvZiBhd2FpdGluZyBvbiB0aGlzIHNvIGl0IGNhbiBiZSB1c2VkIGluIFByb21pc2UuYWxsXHJcblx0XHRcdFx0XHRyZXR1cm4gVXRpbHMuZ2V0SlNPTjxDYW52YXNBUEkuTW9kdWxlSXRlbVtdPihtb2R1bGVJdGVtc1VybCk7XHJcblxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdGNvbnN0IG1vZHVsZUl0ZW1TZXRzOiBDYW52YXNBUEkuTW9kdWxlSXRlbVtdW10gPSBhd2FpdCBQcm9taXNlLmFsbChpdGVtU2V0UHJvbWlzZXMpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgaXRlbXMgb2YgbW9kdWxlSXRlbVNldHMpIHtcclxuXHJcblx0XHRcdGNvbnN0IG1vZHVsZSA9IERBVEEubW9kdWxlcy5nZXQoaXRlbXNbMF0ubW9kdWxlX2lkKTtcclxuXHJcblx0XHRcdGZvciAoY29uc3QgbW9kSXRlbUpzb24gb2YgaXRlbXMpIHtcclxuXHJcblx0XHRcdFx0bGV0IGl0ZW06IE1vZHVsZUl0ZW07XHJcblx0XHRcdFx0Y29uc3QgY29udGVudElkID0gbW9kSXRlbUpzb24uY29udGVudF9pZDtcclxuXHJcblx0XHRcdFx0aWYgKE1vZHVsZUl0ZW0uYnlDb250ZW50SWQuaGFzKGNvbnRlbnRJZCkpXHJcblx0XHRcdFx0XHRpdGVtID0gTW9kdWxlSXRlbS5ieUNvbnRlbnRJZC5nZXQoY29udGVudElkKTtcclxuXHRcdFx0XHRlbHNlIGlmIChjb250ZW50SWQpXHJcblx0XHRcdFx0XHRpdGVtID0gTW9kdWxlSXRlbS5mcm9tQ29udGVudElkKGNvbnRlbnRJZCk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0aXRlbSA9IG5ldyBNb2R1bGVJdGVtKCk7XHJcblxyXG5cdFx0XHRcdGl0ZW0udXBkYXRlKG1vZEl0ZW1Kc29uKTtcclxuXHJcblx0XHRcdFx0REFUQS5tb2R1bGVJdGVtcy5zZXQobW9kSXRlbUpzb24uaWQsIGl0ZW0pO1xyXG5cdFx0XHRcdG1vZHVsZS5pdGVtcy5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vID09PT09IGZpbGUgbW9kdWxlIGl0ZW1zID09PT09XHJcblxyXG5cdFx0Y29uc3QgZmlsZUl0ZW1zID0gQXJyYXkuZnJvbShEQVRBLm1vZHVsZUl0ZW1zLnZhbHVlcygpKVxyXG5cdFx0XHQuZmlsdGVyKGl0ZW0gPT4gaXRlbS50eXBlID09PSBNb2R1bGVJdGVtVHlwZS5GSUxFKTtcclxuXHJcblx0XHRjb25zdCBmaWxlUHJvbWlzZXM6IEFycmF5PFByb21pc2U8Q2FudmFzQVBJLkZpbGU+PiA9IGZpbGVJdGVtcy5tYXAoaXRlbSA9PiB7XHJcblx0XHRcdGNvbnN0IGZpbGVEYXRhVXJsID0gVXRpbHMuZm9ybWF0VXJsKFYuY2FudmFzLmFwaS51cmxzLmZpbGVfZGlyZWN0LCB7XHJcblx0XHRcdFx0ZmlsZUlEOiBpdGVtLmNvbnRlbnRJZCxcclxuXHRcdFx0XHRjb3Vyc2VJRDogREFUQS5jb3Vyc2VJRFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0Ly8gcmV0dXJuIHByb21pc2UgZm9yIFByb21pc2UuYWxsXHJcblx0XHRcdHJldHVybiBVdGlscy5nZXRKU09OPENhbnZhc0FQSS5GaWxlPihmaWxlRGF0YVVybCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRjb25zdCBmaWxlczogQ2FudmFzQVBJLkZpbGVbXSA9IGF3YWl0IFByb21pc2UuYWxsKGZpbGVQcm9taXNlcyk7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKVxyXG5cdFx0XHRNb2R1bGVJdGVtLmJ5Q29udGVudElkLmdldChmaWxlLmlkKS5zZXRGaWxlRGF0YShmaWxlKTtcclxuXHJcblx0fTtcclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gICAgICAgICAgICAgIGN1c3RvbSBkYXRhXHJcblx0Ly8gIHJlcXVpcmVzOiBtb2R1bGVzIG9yIGdyYWRlcyBwYWdlXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdGNvbnN0IGN1c3RvbURhdGFGbG93ID0gYXN5bmMgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Y29uc3QgY3VzdG9tRGF0YVVybCA9IFV0aWxzLmZvcm1hdFVybChWLmNhbnZhcy5hcGkudXJscy5jdXN0b21fZGF0YSwge2RhdGFQYXRoOiBcIlwifSk7XHJcblx0XHRjb25zdCBjdXN0b21EYXRhOiBDYW52YXNBUEkuQ3VzdG9tRGF0YSA9IChcclxuXHRcdFx0YXdhaXQgVXRpbHMuZ2V0SlNPTjx7ZGF0YTogQ2FudmFzQVBJLkN1c3RvbURhdGF9PihjdXN0b21EYXRhVXJsKVxyXG5cdFx0KS5kYXRhO1xyXG5cclxuXHRcdC8vIHRoaXMgaGFwcGVucyB3aGVuIHRoZXJlIHdhcyBhbiBpc3N1ZSBnZXR0aW5nIHRoZSBkYXRhIG9yIHRoZXJlIHdhcyBubyBkYXRhIGF0IGFsbFxyXG5cdFx0Ly8gVE9ETyBmaWd1cmUgb3V0IHdoYXQgdG8gZG8gaGVyZVxyXG5cdFx0aWYgKGN1c3RvbURhdGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG5cclxuXHRcdC8vID09PT09IGxvYWQgY29tcGxldGUgLyBoaWRkZW4gYXNzaWdubWVudHMgPT09PT1cclxuXHJcblx0XHRjb25zdCBjb21wbGV0ZSA9IFV0aWxzLmdldE9yRGVmYXVsdChjdXN0b21EYXRhLmNvbXBsZXRlZF9hc3NpZ25tZW50cywgREFUQS5jb3Vyc2VJRCwgbmV3IEFycmF5PG51bWJlcj4oKSk7XHJcblx0XHRjb25zdCBoaWRkZW4gPSBVdGlscy5nZXRPckRlZmF1bHQoY3VzdG9tRGF0YS5oaWRkZW5fYXNzaWdubWVudHMsIERBVEEuY291cnNlSUQsIG5ldyBBcnJheTxudW1iZXI+KCkpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgW21vZEl0ZW1JZCwgbW9kSXRlbV0gb2YgREFUQS5tb2R1bGVJdGVtcykge1xyXG5cdFx0XHRtb2RJdGVtLmNoZWNrZWQgPSBjb21wbGV0ZS5pbmNsdWRlcyhtb2RJdGVtSWQpO1xyXG5cdFx0XHRtb2RJdGVtLmhpZGRlbiA9IGhpZGRlbi5pbmNsdWRlcyhtb2RJdGVtSWQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vID09PT09IGxvYWQgYWN0aXZlIHN0YXRlIGxpc3QgPT09PT1cclxuXHJcblx0XHRjb25zdCBhY3RpdmVTdGF0ZXM6IHN0cmluZ1tdID0gY3VzdG9tRGF0YS5hY3RpdmVfc3RhdGVzIHx8IFtdO1xyXG5cclxuXHRcdC8vIGxvYWQgc3RhdGVzIGZyb20gY29uZmlnXHJcblx0XHQkLmVhY2goVi5zdGF0ZSwgKG5hbWUsIHN0YXRlRGF0YSkgPT4ge1xyXG5cdFx0XHRjb25zdCBzdGF0ZU9iaiA9IG5ldyBTdGF0ZShuYW1lLCBzdGF0ZURhdGEsIGFjdGl2ZVN0YXRlcy5pbmNsdWRlcyhuYW1lKSk7XHJcblx0XHRcdERBVEEuc3RhdGVzLnNldChuYW1lLCBzdGF0ZU9iaik7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyA9PT09PSBsb2FkIHRhYnMgcG9zaXRpb25zID09PT09XHJcblxyXG5cdFx0Y29uc3QgdGFiUG9zaXRpb25zOiB7W2tleTogc3RyaW5nXTogbnVtYmVyfSA9IFV0aWxzLmdldE9yRGVmYXVsdChjdXN0b21EYXRhLnRhYl9wb3NpdGlvbnMsIERBVEEuY291cnNlSUQsIHt9KTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IFt0YWJJZCwgbmF2VGFiXSBvZiBEQVRBLm5hdlRhYnMpIHtcclxuXHRcdFx0aWYgKHRhYlBvc2l0aW9uc1t0YWJJZF0gIT09IHVuZGVmaW5lZClcclxuXHRcdFx0XHRuYXZUYWIuc2V0UG9zaXRpb24odGFiUG9zaXRpb25zW3RhYklkXSk7XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vICAgICAgICAgcnVuIGFsbCBhc3luYyB0YXNrc1xyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRjb25zdCBwcm9taXNlcyA9IFtjb3Vyc2VUYWJGbG93KCldO1xyXG5cclxuXHRpZiAoREFUQS5jb3Vyc2VQYWdlICE9PSBudWxsKVxyXG5cdFx0cHJvbWlzZXMucHVzaChuYXZUYWJGbG93KCkpO1xyXG5cclxuXHRpZiAoREFUQS5vbk1haW5QYWdlKVxyXG5cdFx0cHJvbWlzZXMucHVzaChhc3NpZ25tZW50RmxvdygpLCBtb2R1bGVJdGVtRmxvdygpKTtcclxuXHJcblx0YXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xyXG5cclxuXHQvLyBydW4gY3VzdG9tIGRhdGEgZmxvdyBhZnRlciBldmVyeXRoaW5nXHJcblx0aWYgKERBVEEub25NYWluUGFnZSkgYXdhaXQgY3VzdG9tRGF0YUZsb3coKTtcclxuXHJcblx0cmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpIC0gaW5pdFN0YXJ0O1xyXG5cclxufSkoKVxyXG4uY2F0Y2goKHJlYXNvbjogRXhjZXB0aW9uIHwgYW55KSA9PiB7XHJcblx0Ly8gRXhjZXB0aW9ucyBhcmUgaW50ZW50aW9uYWxseSB0aHJvdyBieSBteSBjb2RlXHJcblx0aWYgKHJlYXNvbiBpbnN0YW5jZW9mIEV4Y2VwdGlvbikge1xyXG5cdFx0aWYgKHJlYXNvbi5pc0ZhdGFsKSB0aHJvdyBuZXcgRXJyb3IocmVhc29uLnRvU3RyaW5nKCkpO1xyXG5cdFx0ZWxzZSBjb25zb2xlLndhcm4oXCJFeGNlcHRpb24gaW4gaW5pdDpcIiwgcmVhc29uLnRvU3RyaW5nKCkpO1xyXG5cdH1cclxuXHRlbHNlIHsgLy8gYW55dGhpbmcgZWxzZSBpcyB1bmtub3duIGFuZCBpcyBhIHByb2JsZW1cclxuXHRcdHRocm93IG5ldyBFcnJvcihcIlVua25vd24gZXJyb3IgaW4gaW5pdDogXCIgKyByZWFzb24pO1xyXG5cdH1cclxufSlcclxuLnRoZW4oKHRvdGFsRHVyYXRpb246IG51bWJlcikgPT4ge1xyXG5cdGNvbnNvbGUuZGVidWcoYEluaXRpYWxpemF0aW9uIGNvbXBsZXRlZCBpbiAke01hdGgucm91bmQodG90YWxEdXJhdGlvbil9bXNgKTtcclxuXHRNYWluLmluaXRQYWdlKCk7XHJcblx0Y2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKE1haW4ub25NZXNzYWdlKTtcclxufSk7XHJcblxyXG5jbGFzcyBNYWluIHtcclxuXHJcblx0c3RhdGljIGluaXRQYWdlKCkge1xyXG5cclxuXHRcdFBBR0UuaW5pdGlhbGl6ZSgpO1xyXG5cclxuXHRcdCQod2luZG93KS5zY3JvbGwoVUkudXBkYXRlU2Nyb2xsUG9zaXRpb24pO1xyXG5cdFx0JChkb2N1bWVudCkucmVhZHkoVUkudXBkYXRlU2Nyb2xsUG9zaXRpb24pO1xyXG5cclxuXHRcdC8vID09PT09PT09PT09PT09PSBtaXNjIGdsb2JhbCBpbml0IHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0XHQvLyByZW1vdmluZyBhbGwgcmVwZWF0ZWQgd2hpdGVzcGFjZSBpbiBjbGFzcyBhdHRyaWJ1dGVzXHJcblx0XHQkKFwiW2NsYXNzXVwiKS5hdHRyKFwiY2xhc3NcIiwgKGksIG9sZENsYXNzKSA9PiAob2xkQ2xhc3MubWF0Y2goL1xcUysvZykgfHwgW10pLmpvaW4oXCIgXCIpKTtcclxuXHJcblx0XHQvLyBjbGVhbiB1cCBncmFkZSB0YWJsZVxyXG5cdFx0JChcIiNncmFkZXNfc3VtbWFyeSB0Ym9keVwiKVxyXG5cdFx0LmZpbmQoXCJ0ci5ncm91cF90b3RhbCwgdHIuZmluYWxfZ3JhZGVcIilcclxuXHRcdC5maW5kKFwidGQucG9pbnRzX3Bvc3NpYmxlXCIpLmF0dHIoXCJjb2xzcGFuXCIsIFwiM1wiKS5jc3MoXCJ0ZXh0LWFsaWduXCIsIFwiY2VudGVyXCIpLmVuZCgpXHJcblx0XHQuZmluZChcInRkLmRldGFpbHMsIHRkLnN0YXR1c1wiKS5yZW1vdmUoKTtcclxuXHJcblx0XHQvLyBtYWtlIHRoZSBjb3Vyc2UgYnV0dG9uIHRha2UgeW91IHRvIFwiYWxsIGNvdXJzZXNcIiBhbmQgY2hhbmdlIHRoZSB0ZXh0IHRvIHNheSBzb1xyXG5cdFx0Y29uc3Qgb3JpZ0NvdXJzZU5hdiA9ICQoXCIjZ2xvYmFsX25hdl9jb3Vyc2VzX2xpbmtcIik7XHJcblx0XHRjb25zdCBuZXdDb3Vyc2VOYXYgPSAkKFwiPGE+XCIpXHJcblx0XHRcdC5hdHRyKFwiaHJlZlwiLCBcIi9jb3Vyc2VzXCIpXHJcblx0XHRcdC5hZGRDbGFzcyhcImljLWFwcC1oZWFkZXJfX21lbnUtbGlzdC1saW5rXCIpXHJcblx0XHRcdC5odG1sKG9yaWdDb3Vyc2VOYXYucHJvcChcImlubmVySFRNTFwiKSk7XHJcblxyXG5cdFx0Y29uc3QgY291cnNlTmF2TGkgPSBvcmlnQ291cnNlTmF2LnBhcmVudCgpO1xyXG5cdFx0b3JpZ0NvdXJzZU5hdi5yZW1vdmUoKTtcclxuXHRcdGNvdXJzZU5hdkxpXHJcblx0XHRcdC5hcHBlbmQobmV3Q291cnNlTmF2KVxyXG5cdFx0XHQuZmluZChcIi5tZW51LWl0ZW1fX3RleHRcIilcclxuXHRcdFx0LnRleHQoXCJBbGwgQ291cnNlc1wiKTtcclxuXHJcblx0XHQvLyA9PT0gaW5zZXJ0IGNvdXJzZSBsaW5rcyA9PT1cclxuXHJcblx0XHRjb25zdCAkaW5zZXJ0aW9uUG9pbnQgPSBQQUdFLnNpZGViYXIuY2hpbGRyZW4oKS5lcSgyKTtcclxuXHRcdGZvciAoY29uc3QgW3RhYklELCBjb3Vyc2VUYWJdIG9mIERBVEEuY291cnNlVGFicykge1xyXG5cdFx0XHQkaW5zZXJ0aW9uUG9pbnQuYWZ0ZXIoXHJcblx0XHRcdFx0VXRpbHMuZm9ybWF0KFYuZWxlbWVudC5jb3Vyc2VfbGluaywge1xyXG5cdFx0XHRcdFx0dGFiQ29sb3I6IGNvdXJzZVRhYi5jb2xvcixcclxuXHRcdFx0XHRcdHRhYklELFxyXG5cdFx0XHRcdFx0bmFtZTogY291cnNlVGFiLm5hbWUsXHJcblx0XHRcdFx0XHRjb2RlOiBjb3Vyc2VUYWIuY29kZVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09IHBsYWNlIFwianVtcCB0byB0b3BcIiBidXR0b24gPT09XHJcblxyXG5cdFx0REFUQS5lbGVtZW50cy5qdW1wX2J1dHRvbiA9XHJcblx0XHRcdCQoVi5lbGVtZW50Lmp1bXBfYnV0dG9uKVxyXG5cdFx0XHQuZmluZChcImlcIilcclxuXHRcdFx0LmNsaWNrKCgpID0+IHtcclxuXHRcdFx0XHRpZiAoUEFHRS5zY3JvbGxpbmdFbGVtZW50LnByb3AoXCJzY3JvbGxUb3BcIikgPiAwKVxyXG5cdFx0XHRcdFx0JChcImJvZHlcIikuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgVi51aS5zY3JvbGxfdGltZSk7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5lbmQoKVxyXG5cdFx0XHQuYXBwZW5kVG8oUEFHRS5tYWluKTtcclxuXHJcblx0XHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQvLyAgICAgICAgICAgICAgICAgICBjb3Vyc2UgcGFnZSBjdXRvZmZcclxuXHRcdC8vICAgICAgZXZlcnl0aGluZyBiZWxvdyB0aGlzIHBvaW50IGlzIGZvciBjb3Vyc2UgcGFnZXNcclxuXHRcdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdGlmIChEQVRBLmNvdXJzZVBhZ2UgPT09IG51bGwpIHJldHVybjtcclxuXHJcblx0XHQvLyA9PT09IGNsZWFyIHRoZSBhY3RpdmUgbWVudSB0YWIgc2luY2Ugd2UncmUgdXNpbmcgY3VzdG9tIHRhYnMgPT09PVxyXG5cclxuXHRcdCQoXCJ1bCNtZW51ID4gbGlcIikucmVtb3ZlQ2xhc3MoXCJpYy1hcHAtaGVhZGVyX19tZW51LWxpc3QtaXRlbS0tYWN0aXZlXCIpO1xyXG5cclxuXHRcdC8vID09PSBsb2FkIGluaXRpYWwgc3RhdGVzID09PVxyXG5cclxuXHRcdGZvciAoY29uc3QgWywgc3RhdGVdIG9mIERBVEEuc3RhdGVzKSB7XHJcblx0XHRcdGlmIChzdGF0ZS5hY3RpdmUgJiYgc3RhdGUub25QYWdlcy5pbmNsdWRlcyhEQVRBLmNvdXJzZVBhZ2UpKVxyXG5cdFx0XHRcdFBBR0UuYm9keS5hZGRDbGFzcyhzdGF0ZS5ib2R5Q2xhc3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vID09PT0gYXBwbHkgY291cnNlIGNvbG9yIHRvIGJyYW5kIGNvbG9ycyA9PT09XHJcblxyXG5cdFx0aWYgKERBVEEuY291cnNlVGFicy5oYXMoREFUQS5jb3Vyc2VJRCkpIHtcclxuXHRcdFx0Y29uc3QgY29sb3IgPSBEQVRBLmNvdXJzZVRhYnMuZ2V0KERBVEEuY291cnNlSUQpLmNvbG9yO1xyXG5cdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCItLWljLWJyYW5kLXByaW1hcnlcIiwgY29sb3IpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vID09PT0gY2xlYXIgZW1wdHkgbmF2IHRhYnMgPT09XHJcblxyXG5cdFx0JChWLmNhbnZhcy5zZWxlY3Rvci5uYXZfdGFicykuZmluZChcImxpOmVtcHR5XCIpLnJlbW92ZSgpO1xyXG5cclxuXHRcdC8vID09PT0gYXBwbHkgdGhlIGN1c3RvbSBuYXYgdGFiIHBvc2l0aW9ucyA9PT1cclxuXHJcblx0XHRBcnJheS5mcm9tKERBVEEubmF2VGFicy52YWx1ZXMoKSkuZmlsdGVyKHRhYiA9PiB0YWIuaGFzQ3VzdG9tUG9zaXRpb24pXHJcblx0XHRcdC5zb3J0KCh0YWJBLCB0YWJCKSA9PiB0YWJBLnBvc2l0aW9uIC0gdGFiQi5wb3NpdGlvbilcclxuXHRcdFx0LmZvckVhY2goVUkudXBkYXRlTmF2VGFiUG9zaXRpb24pO1xyXG5cclxuXHRcdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdC8vICAgICAgICAgICAgICAgICAgICBtYWluIHBhZ2UgY3V0b2ZmXHJcblx0XHQvLyAgZXZlcnl0aGluZyBiZWxvdyB0aGlzIGlzIG9ubHkgZm9yIG1vZHVsZXMvZ3JhZGVzIHBhZ2VzXHJcblx0XHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHRpZiAoIURBVEEub25NYWluUGFnZSkgcmV0dXJuO1xyXG5cclxuXHRcdC8vID09PSBwbGFjZSBjaGVja2JveGVzICYgaGlkZSBidXR0b25zID09PVxyXG5cclxuXHRcdGZvciAoY29uc3QgW2l0ZW1JZCwgaXRlbV0gb2YgREFUQS5tb2R1bGVJdGVtcykge1xyXG5cclxuXHRcdFx0Y29uc3QgbWFpbkVsID0gJChcIiNcIiArIGl0ZW0uY2FudmFzRWxlbWVudElkKTtcclxuXHRcdFx0bGV0IHBhcmVudEVsOiBKUXVlcnk7XHJcblx0XHRcdGxldCBoYXNDaGVja2JveDogYm9vbGVhbjtcclxuXHRcdFx0bGV0IGhhc0hpZGVCdXR0b246IGJvb2xlYW47XHJcblxyXG5cdFx0XHRpdGVtLmNoZWNrYm94RWxlbWVudCA9IG51bGw7XHJcblx0XHRcdGl0ZW0uaGlkZUVsZW1lbnQgPSBudWxsO1xyXG5cclxuXHRcdFx0aWYgKERBVEEuY291cnNlUGFnZSA9PT0gQ2FudmFzUGFnZS5NT0RVTEVTKSB7XHJcblx0XHRcdFx0cGFyZW50RWwgPSBtYWluRWwuZmluZChcImRpdi5pZy1yb3dcIik7XHJcblxyXG5cdFx0XHRcdGhhc0hpZGVCdXR0b24gPSB0cnVlO1xyXG5cdFx0XHRcdGhhc0NoZWNrYm94ID0gIWl0ZW0uaXNTdWJIZWFkZXI7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoREFUQS5jb3Vyc2VQYWdlID09PSBDYW52YXNQYWdlLkdSQURFUykge1xyXG5cdFx0XHRcdHBhcmVudEVsID0gJChcIjx0ZD5cIilcclxuXHRcdFx0XHRcdC5hZGRDbGFzcyhWLmNzc0NsYXNzLmNoZWNrYm94X3RkKVxyXG5cdFx0XHRcdFx0LnByZXBlbmRUbyhtYWluRWwpO1xyXG5cclxuXHRcdFx0XHRoYXNIaWRlQnV0dG9uID0gZmFsc2U7XHJcblx0XHRcdFx0aGFzQ2hlY2tib3ggPSBpdGVtLmlzR3JhZGVkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoaGFzQ2hlY2tib3gpIHtcclxuXHRcdFx0XHRpdGVtLmNoZWNrYm94RWxlbWVudCA9XHJcblx0XHRcdFx0XHQkKFV0aWxzLmZvcm1hdChWLmVsZW1lbnQuY2hlY2tib3gsIHtpdGVtX2lkOiBpdGVtSWR9KSkuYXBwZW5kVG8ocGFyZW50RWwpO1xyXG5cclxuXHRcdFx0XHRVSS51cGRhdGVDaGVja2JveChpdGVtKTtcclxuXHRcdFx0XHRpdGVtLmNoZWNrYm94RWxlbWVudC5zaG93KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGhhc0hpZGVCdXR0b24pIHtcclxuXHRcdFx0XHRpdGVtLmhpZGVFbGVtZW50ID1cclxuXHRcdFx0XHRcdCQoVXRpbHMuZm9ybWF0KFYuZWxlbWVudC5oaWRlX2J1dHRvbiwge2l0ZW1faWQ6IGl0ZW1JZH0pKS5hcHBlbmRUbyhwYXJlbnRFbCk7XHJcblxyXG5cdFx0XHRcdC8vIHRoaXMgZnVuY3Rpb24gaXMgYXN5bmMsIGJ1dCB3aXRoIHNlY29uZCBhcmd1bWVudCAndHJ1ZScsIGl0IHVwZGF0ZXMgaW5zdGFudGx5XHJcblx0XHRcdFx0VUkudXBkYXRlSXRlbUhpZGUoaXRlbSwgdHJ1ZSk7XHJcblx0XHRcdFx0aXRlbS5oaWRlRWxlbWVudC5zaG93KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09IGZpeCBncmFkZSBjaGVja2JveGVzIHNpbmNlIHRoZXkncmUgaW4gdGhlIHRhYmxlID09PVxyXG5cdFx0aWYgKERBVEEuY291cnNlUGFnZSA9PT0gQ2FudmFzUGFnZS5HUkFERVMpIHtcclxuXHRcdFx0UEFHRS5ncmFkZXNcclxuXHRcdFx0XHQuZmluZChcInRkW2NvbHNwYW49JzUnXVwiKVxyXG5cdFx0XHRcdC5hdHRyKFwiY29sc3BhblwiLCA2KVxyXG5cdFx0XHRcdC5lbmQoKS5maW5kKFwiPiB0aGVhZCA+IHRyXCIpXHJcblx0XHRcdFx0LnByZXBlbmQoJChcIjx0aD5cIilcclxuXHRcdFx0XHRcdC5hdHRyKFwic2NvcGVcIiwgXCJjb2xcIilcclxuXHRcdFx0XHRcdC5hcHBlbmQoXCI8aSBjbGFzcz0naWNvbi1jaGVjayc+PC9pPlwiKVxyXG5cdFx0XHRcdClcclxuXHRcdFx0XHQuZW5kKCkuZmluZChcInRyLnN0dWRlbnRfYXNzaWdubWVudFwiKVxyXG5cdFx0XHRcdC5wcmVwZW5kKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuICQodGhpcykuaGFzKFwidGQ6Zmlyc3QtY2hpbGRcIikubGVuZ3RoID09PSAwID9cclxuXHRcdFx0XHRcdFx0JChcIjx0ZD5cIikuYWRkQ2xhc3MoVi5jc3NDbGFzcy5jaGVja2JveF90ZCkgOiB1bmRlZmluZWQ7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09IGFkZCBjaGFuZ2UgZXZlbnQgZm9yIGNoZWNrYm94ZXMgPT09XHJcblxyXG5cdFx0UEFHRS5tYWluLm9uKFwiY2hhbmdlXCIsIGAuJHtWLmNzc0NsYXNzLmNoZWNrYm94X3BhcmVudH0gPiBpbnB1dGAsIGFzeW5jIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRhd2FpdCBNYWluLm9uQ2hlY2tib3hDaGFuZ2UodGhpcyBhcyBIVE1MSW5wdXRFbGVtZW50KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgbW9kdWxlcyBwYWdlIGN1dG9mZlxyXG5cdFx0Ly8gICAgICAgIGV2ZXJ5dGhpbmcgYmVsb3cgaGVyZSBpcyBvbmx5IG9uIHRoZSBtb2R1bGVzIHBhZ2VcclxuXHRcdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdGlmIChEQVRBLmNvdXJzZVBhZ2UgIT09IENhbnZhc1BhZ2UuTU9EVUxFUykgcmV0dXJuO1xyXG5cclxuXHRcdC8vID09PSBjbGVhbiB1cCBlbXB0eSBtb2R1bGVzID09PVxyXG5cdFx0JChWLmNhbnZhcy5zZWxlY3Rvci5tb2R1bGVfaXRlbXMpLmZpbHRlcigoaSwgZWwpID0+ICFlbC5pbm5lckhUTUwudHJpbSgpLmxlbmd0aCkuaHRtbChcIlwiKTtcclxuXHJcblx0XHQvLyA9PT0gc2V0dXAgYW5kIGFwcGx5IGN1c3RvbSBpbmRlbnRzID09PVxyXG5cclxuXHRcdGNvbnN0IGRpc2FibGVkSW5kZW50U3RhdGUgPSBEQVRBLnN0YXRlcy5nZXQoXCJkaXNhYmxlX2luZGVudF9vdmVycmlkZVwiKTtcclxuXHRcdGNvbnN0IGRpc2FibGVkSW5kZW50ID0gZGlzYWJsZWRJbmRlbnRTdGF0ZS5hY3RpdmU7XHJcblxyXG5cdFx0ZGlzYWJsZWRJbmRlbnRTdGF0ZS5vbkVuYWJsZSA9ICgpID0+IHtcclxuXHRcdFx0JChWLmNhbnZhcy5zZWxlY3Rvci5tb2R1bGVfaXRlbSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRbMCwxLDIsMyw0LDVdLmZvckVhY2gobGV2ZWwgPT4gJCh0aGlzKS5yZW1vdmVDbGFzcyhcImluZGVudF9cIiArIGxldmVsKSk7XHJcblx0XHRcdFx0Y29uc3QgZGVmTGV2ZWwgPSAkKHRoaXMpLmF0dHIoVi5kYXRhQXR0ci5kZWZfaW5kZW50KTtcclxuXHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwiaW5kZW50X1wiICsgZGVmTGV2ZWwpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblx0XHRkaXNhYmxlZEluZGVudFN0YXRlLm9uRGlzYWJsZSA9ICgpID0+IHtcclxuXHRcdFx0WzAsMSwyLDMsNCw1XS5mb3JFYWNoKGxldmVsID0+ICQoVi5jYW52YXMuc2VsZWN0b3IubW9kdWxlX2l0ZW0pLnJlbW92ZUNsYXNzKFwiaW5kZW50X1wiICsgbGV2ZWwpKTtcclxuXHRcdFx0JChWLmNhbnZhcy5zZWxlY3Rvci5zdWJoZWFkZXIpLmFkZENsYXNzKFwiaW5kZW50X1wiICsgVi51aS5zdWJoZWFkZXJfaW5kZW50KTtcclxuXHRcdFx0JChWLmNhbnZhcy5zZWxlY3Rvci5ub3Rfc3ViaGVhZGVyKS5hZGRDbGFzcyhcImluZGVudF9cIiArIFYudWkubWFpbl9pbmRlbnQpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkKFYuY2FudmFzLnNlbGVjdG9yLm1vZHVsZV9pdGVtKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zdCBkZWZJbmRlbnQgPVxyXG5cdFx0XHRcdFswLDEsMiwzLDQsNV0uZmlsdGVyKGxldmVsID0+ICQodGhpcykuaGFzQ2xhc3MoXCJpbmRlbnRfXCIgKyBsZXZlbCkpWzBdO1xyXG5cdFx0XHQkKHRoaXMpLmF0dHIoVi5kYXRhQXR0ci5kZWZfaW5kZW50LCBkZWZJbmRlbnQpO1xyXG5cdFx0XHRpZiAoIWRpc2FibGVkSW5kZW50KVxyXG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJpbmRlbnRfXCIgKyBkZWZJbmRlbnQpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKCFkaXNhYmxlZEluZGVudCkge1xyXG5cdFx0XHQkKFYuY2FudmFzLnNlbGVjdG9yLnN1YmhlYWRlcikuYWRkQ2xhc3MoXCJpbmRlbnRfXCIgKyBWLnVpLnN1YmhlYWRlcl9pbmRlbnQpO1xyXG5cdFx0XHQkKFYuY2FudmFzLnNlbGVjdG9yLm5vdF9zdWJoZWFkZXIpLmFkZENsYXNzKFwiaW5kZW50X1wiICsgVi51aS5tYWluX2luZGVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09IHBsYWNlIGFuZCBwb3B1bGF0ZSB0aGUgdGFibGUgb2YgY29udGVudHMgPT09XHJcblxyXG5cdFx0Y29uc3QgdG9jID0gJChWLmVsZW1lbnQudG9jKTtcclxuXHRcdGNvbnN0IHVsID0gdG9jLmZpbmQoXCJ1bFwiKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IFttb2RJZCwgbW9kXSBvZiBEQVRBLm1vZHVsZXMpIHtcclxuXHJcblx0XHRcdGNvbnN0IGZvcm1hdHRlZCA9IFV0aWxzLmZvcm1hdChWLmVsZW1lbnQudG9jX2l0ZW0sIHtpdGVtX25hbWU6IG1vZC5uYW1lLCBpdGVtX2lkOiBtb2RJZH0pO1xyXG5cdFx0XHQkKGZvcm1hdHRlZClcclxuXHRcdFx0XHQuZmluZChcImFcIilcclxuXHRcdFx0XHQuY2xpY2soZSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCBtb2R1bGVFbCA9ICQoXCIjY29udGV4dF9tb2R1bGVfXCIgKyBtb2RJZCk7XHJcblx0XHRcdFx0XHRVSS5zY3JvbGxUb0VsZW1lbnQobW9kdWxlRWwpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChtb2R1bGVFbC5oYXNDbGFzcyhcImNvbGxhcHNlZF9tb2R1bGVcIikpXHJcblx0XHRcdFx0XHRcdG1vZHVsZUVsLmZpbmQoXCIuZXhwYW5kX21vZHVsZV9saW5rXCIpLmNsaWNrKCk7XHJcblxyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmVuZCgpXHJcblx0XHRcdFx0LmFwcGVuZFRvKHVsKTtcclxuXHRcdH1cclxuXHJcblx0XHREQVRBLmVsZW1lbnRzLnRvYyA9IHRvY1xyXG5cdFx0XHQuY3NzKFwidG9wXCIsIFBBR0UubGVmdC5oZWlnaHQoKSArIFYudWkudG9jX3RvcF9tYXJnaW4pXHJcblx0XHRcdC5hcHBlbmRUbyhQQUdFLm1haW4pXHJcblx0XHRcdC5kYXRhKFwiY3V0b2ZmXCIsIHRvYy5vZmZzZXQoKS50b3AgLSBWLnVpLnRvY190b3BfbWFyZ2luKTtcclxuXHJcblx0XHRBcnJheS5mcm9tKERBVEEubW9kdWxlcy52YWx1ZXMoKSkuZm9yRWFjaChVSS51cGRhdGVNb2R1bGUpO1xyXG5cclxuXHRcdC8vID09PSBhZGQgY2xpY2sgZXZlbnQgZm9yIGhpZGUgYnV0dG9ucyA9PT1cclxuXHJcblx0XHRQQUdFLm1haW4ub24oXCJjbGlja1wiLCBgLiR7Vi5jc3NDbGFzcy5oaWRlX2J1dHRvbn0gPiBpYCwgYXN5bmMgZnVuY3Rpb24oKSB7XHJcblx0XHRcdGF3YWl0IE1haW4ub25IaWRlQnV0dG9uQ2xpY2soJCh0aGlzKSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyA9PT0gYWRkIGJ1dHRvbnMgdG8gRklMRSBhbmQgRVhURVJOQUxfVVJMIGl0ZW1zID09PVxyXG5cclxuXHRcdGZvciAoY29uc3QgWywgaXRlbV0gb2YgREFUQS5tb2R1bGVJdGVtcykge1xyXG5cclxuXHRcdFx0aWYgKGl0ZW0udHlwZSA9PT0gTW9kdWxlSXRlbVR5cGUuRklMRSkge1xyXG5cdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBVdGlscy5mb3JtYXQoVi5lbGVtZW50LmRvd25sb2FkX2J1dHRvbiwge1xyXG5cdFx0XHRcdFx0ZmlsZV91cmw6IGl0ZW0uZmlsZURhdGEudXJsLFxyXG5cdFx0XHRcdFx0ZmlsZW5hbWU6IGl0ZW0uZmlsZURhdGEuZGlzcGxheV9uYW1lXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0JChlbGVtZW50KS5pbnNlcnRCZWZvcmUoaXRlbS5jaGVja2JveEVsZW1lbnQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gTW9kdWxlSXRlbVR5cGUuRVhURVJOQUxfVVJMKSB7XHJcblx0XHRcdFx0Y29uc3QgZWxlbWVudCA9IFV0aWxzLmZvcm1hdChWLmVsZW1lbnQudXJsX2J1dHRvbiwge1xyXG5cdFx0XHRcdFx0ZXh0ZXJuYWxfdXJsOiBpdGVtLmV4dGVybmFsVXJsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0JChlbGVtZW50KS5pbnNlcnRCZWZvcmUoaXRlbS5jaGVja2JveEVsZW1lbnQpO1xyXG5cclxuXHRcdFx0XHQkKFwiI1wiICsgaXRlbS5jYW52YXNFbGVtZW50SWQpLmZpbmQoXCJhLmV4dGVybmFsX3VybF9saW5rLnRpdGxlXCIpXHJcblx0XHRcdFx0XHQuYXR0cihcImhyZWZcIiwgZnVuY3Rpb24oKSB7IHJldHVybiAkKHRoaXMpLmF0dHIoXCJkYXRhLWl0ZW0taHJlZlwiKTsgfSlcclxuXHRcdFx0XHRcdC5yZW1vdmVBdHRyKFwidGFyZ2V0IHJlbFwiKVxyXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKFwiZXh0ZXJuYWxcIilcclxuXHRcdFx0XHRcdC5hZGRDbGFzcyhcImlnLXRpdGxlXCIpXHJcblx0XHRcdFx0XHQuZmluZChcIi51aS1pY29uXCIpLnJlbW92ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0JChcIi5cIiArIFYuY3NzQ2xhc3MuZG93bmxvYWQpLmFkZChcIi5cIiArIFYuY3NzQ2xhc3MuZXh0ZXJuYWxfdXJsKS5zaG93KCk7XHJcblxyXG5cdH0gLy8gZW5kIGluaXRQYWdlXHJcblxyXG5cdHN0YXRpYyBnZXRTdGF0ZShzdGF0ZU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKERBVEEuc3RhdGVzLmhhcyhzdGF0ZU5hbWUpKSB7XHJcblx0XHRcdGNvbnN0IHN0YXRlID0gREFUQS5zdGF0ZXMuZ2V0KHN0YXRlTmFtZSk7XHJcblx0XHRcdHJldHVybiBzdGF0ZS5hY3RpdmU7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgc2V0U3RhdGUoc3RhdGVOYW1lOiBzdHJpbmcsIHN0YXRlOiBib29sZWFuKSB7XHJcblx0XHRpZiAoIURBVEEuc3RhdGVzLmhhcyhzdGF0ZU5hbWUpKSByZXR1cm47XHJcblxyXG5cdFx0Y29uc3Qgc3RhdGVPYmogPSBEQVRBLnN0YXRlcy5nZXQoc3RhdGVOYW1lKTtcclxuXHJcblx0XHRpZiAoIXN0YXRlT2JqLm9uUGFnZXMuaW5jbHVkZXMoREFUQS5jb3Vyc2VQYWdlKSkgcmV0dXJuO1xyXG5cclxuXHRcdGlmIChzdGF0ZU9iai5ib2R5Q2xhc3MpXHJcblx0XHRcdFBBR0UuYm9keS50b2dnbGVDbGFzcyhzdGF0ZU9iai5ib2R5Q2xhc3MsIHN0YXRlKTtcclxuXHJcblx0XHRzdGF0ZU9iai5hY3RpdmUgPSBzdGF0ZTtcclxuXHRcdHN0YXRlT2JqLm9uQ2hhbmdlKHN0YXRlKTtcclxuXHJcblx0XHRjb25zdCB1cmwgPSBVdGlscy5mb3JtYXRVcmwoVi5jYW52YXMuYXBpLnVybHMuY3VzdG9tX2RhdGEsIHtcclxuXHRcdFx0ZGF0YVBhdGg6IFwiL1wiICsgVi5jYW52YXMuYXBpLmRhdGFfdXJscy5hY3RpdmVfc3RhdGVzXHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBVdGlscy5lZGl0RGF0YUFycmF5KHVybCwgc3RhdGUsIFtzdGF0ZU5hbWVdKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyBzZXROYXZUYWJQb3NpdGlvbih0YWI6IE5hdlRhYiwgcG9zaXRpb246IG51bWJlcikge1xyXG5cclxuXHRcdGNvbnN0IHVybCA9IFV0aWxzLmZvcm1hdFVybChWLmNhbnZhcy5hcGkudXJscy5jdXN0b21fZGF0YSwge1xyXG5cdFx0XHRkYXRhUGF0aDogW1wiXCIsIFYuY2FudmFzLmFwaS5kYXRhX3VybHMudGFiX3Bvc2l0aW9ucywgREFUQS5jb3Vyc2VJRCwgdGFiLmlkXS5qb2luKFwiL1wiKVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc3Qgc3VjY2VzcyA9IGF3YWl0IFV0aWxzLnB1dERhdGEodXJsLCBwb3NpdGlvbik7XHJcblxyXG5cdFx0aWYgKHN1Y2Nlc3MpIHtcclxuXHRcdFx0dGFiLnNldFBvc2l0aW9uKHBvc2l0aW9uKTtcclxuXHRcdFx0VUkudXBkYXRlTmF2VGFiUG9zaXRpb24odGFiKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUYWIgcG9zaXRpb24gdXBkYXRlIGZhaWxlZC5cIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBlbGVtZW50IGlzIHRoZSA8aW5wdXQ+XHJcblx0c3RhdGljIGFzeW5jIG9uQ2hlY2tib3hDaGFuZ2UoZWw6IEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuXHRcdGNvbnN0IGlkID0gTnVtYmVyKCQoZWwpLmF0dHIoVi5kYXRhQXR0ci5tb2RfaXRlbV9pZCkpO1xyXG5cdFx0Y29uc3QgaXRlbSA9IERBVEEubW9kdWxlSXRlbXMuZ2V0KGlkKTtcclxuXHRcdGNvbnN0IHN0YXR1cyA9IGVsLmNoZWNrZWQ7XHJcblx0XHRjb25zdCBvbGRUaXRsZSA9IGVsLnRpdGxlO1xyXG5cclxuXHRcdC8vIHJlc2V0IGJhY2sgdG8gcHJldmlvdXMgc3RhdGUgdG8gYWxsb3cgZm9yIHZhbGlkYXRpb25cclxuXHRcdGVsLmNoZWNrZWQgPSAhc3RhdHVzO1xyXG5cclxuXHRcdC8vIGJlZm9yZSB1cGRhdGluZyBcIml0ZW1cIiwgY2hlY2sgaWYgaXQncyBhbHJlYWR5IHRoZSBzYW1lLiBpZiBzbywgd2UgaGF2ZSBhIGRlc3luY1xyXG5cdFx0aWYgKHN0YXR1cyA9PT0gaXRlbS5jaGVja2VkKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJDaGVja2JveCBkZXN5bmMgYXQgaXRlbVwiLCBpdGVtKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRPRE8gY3JlYXRlIGEgYmV0dGVyIG1ldGhvZCBmb3Igd2FpdGluZy1kaXNhYmxlIGZvciBjaGVja2JveCBhbmQgaGlkZSBidXR0b25cclxuXHRcdC8vIC0gaGF2ZSBhIGRpZmZlcmVudCBjbGFzcyBhcHBsaWVkIHRoYXQgc2V0cyB0aGUgY3Vyc29yIHRvIHdhaXRpbmcgbW9kZSBhbmQgZGltcyB0aGUgYnV0dG9uXHJcblxyXG5cdFx0Ly8gZGlzYWJsZSB1bnRpbCB3ZSBjb25maXJtIHdlIGNhbiB1cGRhdGUgdGhlIGRhdGFcclxuXHRcdGVsLmRpc2FibGVkID0gdHJ1ZTtcclxuXHRcdGVsLnRpdGxlID0gVi50b29sdGlwLndhaXRpbmc7XHJcblxyXG5cdFx0Y29uc3QgdXJsID0gVXRpbHMuZm9ybWF0VXJsKFYuY2FudmFzLmFwaS51cmxzLmN1c3RvbV9kYXRhLCB7XHJcblx0XHRcdGRhdGFQYXRoOiBbXCJcIiwgVi5jYW52YXMuYXBpLmRhdGFfdXJscy5jb21wbGV0ZWRfYXNzaWdubWVudHMsIERBVEEuY291cnNlSURdLmpvaW4oXCIvXCIpXHJcblx0XHR9KTtcclxuXHJcblx0XHRjb25zdCBzdWNjZXNzID0gYXdhaXQgVXRpbHMuZWRpdERhdGFBcnJheSh1cmwsIHN0YXR1cywgW2lkXSk7XHJcblxyXG5cdFx0ZWwuZGlzYWJsZWQgPSBmYWxzZTtcclxuXHRcdGVsLnRpdGxlID0gb2xkVGl0bGU7XHJcblxyXG5cdFx0aWYgKHN1Y2Nlc3MpIHtcclxuXHRcdFx0aXRlbS5jaGVja2VkID0gc3RhdHVzO1xyXG5cdFx0XHRVSS51cGRhdGVNb2R1bGUoaXRlbS5tb2R1bGUpO1xyXG5cdFx0XHRVSS51cGRhdGVDaGVja2JveChpdGVtKTtcclxuXHRcdFx0Y29uc29sZS5kZWJ1ZyhgSXRlbSBJRCAke2lkfSAoJHtpdGVtLm5hbWUuc3Vic3RyKDAsIDI1KX0uLi4pYCArXHJcblx0XHRcdFx0YGhhcyBiZWVuICR7ZWwuY2hlY2tlZCA/IFwiXCIgOiBcInVuXCJ9Y2hlY2tlZGApO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8vIGVsZW1lbnQgaXMgPGk+XHJcblx0c3RhdGljIGFzeW5jIG9uSGlkZUJ1dHRvbkNsaWNrKGVsOiBKUXVlcnkpIHtcclxuXHRcdGNvbnN0IGlkID0gTnVtYmVyKGVsLmF0dHIoVi5kYXRhQXR0ci5tb2RfaXRlbV9pZCkpO1xyXG5cdFx0Y29uc3QgaXRlbSA9IERBVEEubW9kdWxlSXRlbXMuZ2V0KGlkKTtcclxuXHJcblx0XHQvLyBjYW5jZWwgaGlkaW5nIGlmIHRoZSBpdGVtIGlzIGdyYWRlZCBvciBoYXMgaGlkaW5nIG1hbnVhbGx5IGRpc2FibGVkIGZvciBhbnkgb3RoZXIgcmVhc29uXHJcblx0XHRpZiAoaXRlbS5pc0dyYWRlZCB8fCBpdGVtLmhpZGVFbGVtZW50Lmhhc0NsYXNzKFYuY3NzQ2xhc3MuaGlkZV9kaXNhYmxlZCkpIHJldHVybjtcclxuXHJcblx0XHQvLyBkaXNhYmxlIHVudGlsIHVwZGF0aW5nIGNvbXBsZXRlLiB0aGlzIGlzIHVuZG9uZSBieSB1cGRhdGVIaWRlQnV0dG9uIGxhdGVyXHJcblx0XHRpdGVtLmhpZGVFbGVtZW50XHJcblx0XHRcdC5hZGRDbGFzcyhWLmNzc0NsYXNzLmhpZGVfZGlzYWJsZWQpXHJcblx0XHRcdC5maW5kKFwiaVwiKVxyXG5cdFx0XHQuYXR0cihcInRpdGxlXCIsIFYudG9vbHRpcC53YWl0aW5nKTtcclxuXHJcblx0XHRjb25zdCBuZXdTdGF0ZSA9ICFpdGVtLmhpZGRlbjtcclxuXHJcblx0XHRjb25zdCB1cmwgPSBVdGlscy5mb3JtYXRVcmwoVi5jYW52YXMuYXBpLnVybHMuY3VzdG9tX2RhdGEsIHtcclxuXHRcdFx0ZGF0YVBhdGg6IFtcIlwiLCBWLmNhbnZhcy5hcGkuZGF0YV91cmxzLmhpZGRlbl9hc3NpZ25tZW50cywgREFUQS5jb3Vyc2VJRF0uam9pbihcIi9cIilcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBVdGlscy5lZGl0RGF0YUFycmF5KHVybCwgbmV3U3RhdGUsIFtpZF0pO1xyXG5cclxuXHRcdGlmIChzdWNjZXNzKSB7XHJcblx0XHRcdGl0ZW0uaGlkZGVuID0gbmV3U3RhdGU7XHJcblx0XHRcdGF3YWl0IFVJLnVwZGF0ZUl0ZW1IaWRlKGl0ZW0pO1xyXG5cdFx0XHRVSS51cGRhdGVNb2R1bGUoaXRlbS5tb2R1bGUpO1xyXG5cdFx0XHRjb25zb2xlLmRlYnVnKGBJdGVtIElEICR7aWR9ICgke2l0ZW0ubmFtZS5zdWJzdHIoMCwgMjUpfS4uLikgaGFzIGJlZW4gJHtpdGVtLmhpZGRlbiA/IFwiXCIgOiBcInVuXCJ9aGlkZGVuYCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgb25NZXNzYWdlKGRhdGE6IE1lc3NhZ2VEYXRhLCBzb3VyY2U6IGNocm9tZS5ydW50aW1lLk1lc3NhZ2VTZW5kZXIsIHJlc3BvbmRGdW5jOiAoZGF0YT86IGFueSkgPT4gdm9pZCkge1xyXG5cclxuXHRcdGlmIChzb3VyY2UuaWQgIT09IERBVEEuZXh0ZW5zaW9uSWQpIHJldHVybjtcclxuXHJcblx0XHRpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5CQVNJQykge1xyXG5cclxuXHRcdFx0Y29uc3QgdW5jaGVja2VkID0gQXJyYXkuZnJvbShEQVRBLm1vZHVsZUl0ZW1zLnZhbHVlcygpKVxyXG5cdFx0XHRcdC5maWx0ZXIoaSA9PiAhaS5jaGVja2VkICYmICFpLmhpZGRlbiAmJiAhaS5pc1N1YkhlYWRlcik7XHJcblxyXG5cdFx0XHRzd2l0Y2ggKGRhdGEuYWN0aW9uKSB7XHJcblx0XHRcdFx0Y2FzZSBcInBpbmdcIjpcclxuXHRcdFx0XHRcdHJlc3BvbmRGdW5jKHtwb25nOiAkLm5vdygpfSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIFwiY291bnQgdW5jaGVja2VkXCI6XHJcblx0XHRcdFx0XHRyZXNwb25kRnVuYyh7Y291bnQ6IHVuY2hlY2tlZC5sZW5ndGh9KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHQvKlx0Y2FzZSBcInVwZGF0ZSB0b2tlblwiOlxyXG5cdFx0XHRcdFx0VXRpbHMubG9hZFRva2VuKHJlc3BvbmRGdW5jKTtcclxuXHRcdFx0XHRcdGJyZWFrOyovXHJcblx0XHRcdFx0Y2FzZSBcImp1bXAgdG8gZmlyc3QgdW5jaGVja2VkXCI6XHJcblx0XHRcdFx0XHRjb25zdCB1bmNoZWNrZWRFbHMgPSB1bmNoZWNrZWRcclxuXHRcdFx0XHRcdFx0Lm1hcChpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGkuY2FudmFzRWxlbWVudElkKSk7XHJcblx0XHRcdFx0XHRVSS5zY3JvbGxUb0VsZW1lbnQoJCh1bmNoZWNrZWRFbHMpLmZpcnN0KCkpO1xyXG5cdFx0XHRcdFx0cmVzcG9uZEZ1bmMoKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXCJVbmtub3duIGJhc2ljIG1lc3NhZ2UgaW4gY29udGVudCBzY3JpcHQ6XCIsIGRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLlNUQVRFKSB7XHJcblx0XHRcdGNvbnN0IHN0YXRlRGF0YSA9IGRhdGEgYXMgU3RhdGVNZXNzYWdlRGF0YTtcclxuXHRcdFx0aWYgKGRhdGEuYWN0aW9uID09PSBcImdldFwiKSB7XHJcblx0XHRcdFx0Y29uc3Qgc3RhdGUgPSBNYWluLmdldFN0YXRlKHN0YXRlRGF0YS5zdGF0ZU5hbWUpO1xyXG5cdFx0XHRcdHJlc3BvbmRGdW5jKHtzdGF0ZX0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKGRhdGEuYWN0aW9uID09PSBcInNldFwiKSB7XHJcblx0XHRcdFx0TWFpbi5zZXRTdGF0ZShzdGF0ZURhdGEuc3RhdGVOYW1lLCBzdGF0ZURhdGEuc3RhdGUpLnRoZW4oc3VjY2VzcyA9PiB7XHJcblx0XHRcdFx0XHRyZXNwb25kRnVuYyhzdWNjZXNzKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTsgLy8gdGhpcyB0ZWxscyBjaHJvbWUgdGhhdCB3ZSB3YW50IHRoaXMgcmVzcG9uc2UgdG8gYmUgYXN5bmNcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJVbmtub3duIHN0YXRlIG1lc3NhZ2UgaW4gY29udGVudCBzY3JpcHQ6XCIsIGRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y29uc29sZS53YXJuKFwiVW5rbm93biBtZXNzYWdlIGluIGNvbnRlbnQgc2NyaXB0OlwiLCBkYXRhKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFVJIHtcclxuXHJcblx0c3RhdGljIHVwZGF0ZUNoZWNrYm94KGl0ZW06IE1vZHVsZUl0ZW0pIHtcclxuXHRcdGlmIChpdGVtLmNoZWNrYm94RWxlbWVudCA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKFwiTm8gY2hlY2tib3ggdG8gdXBkYXRlXCIpO1xyXG5cdFx0aXRlbS5jaGVja2JveEVsZW1lbnRcclxuXHRcdFx0LmZpbmQoXCJpbnB1dFwiKVxyXG5cdFx0XHQucHJvcChcImNoZWNrZWRcIiwgaXRlbS5jaGVja2VkKVxyXG5cdFx0XHQuYXR0cihcInRpdGxlXCIsIGl0ZW0uY2hlY2tlZCA/IFYudG9vbHRpcC5tYXJrX2luY29tcGxldGUgOiBWLnRvb2x0aXAubWFya19jb21wbGV0ZSlcclxuXHRcdFx0LmNsb3Nlc3QoVi5jYW52YXMuc2VsZWN0b3IubW9kdWxlX2l0ZW0pXHJcblx0XHRcdC50b2dnbGVDbGFzcyhWLmNzc0NsYXNzLmNoZWNrYm94X2NoZWNrZWQsIGl0ZW0uY2hlY2tlZCk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgdXBkYXRlSXRlbUhpZGUoaXRlbTogTW9kdWxlSXRlbSwgaW5zdGFudD86IGJvb2xlYW4pIHtcclxuXHRcdGlmIChpdGVtLmhpZGVFbGVtZW50ID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBoaWRlIGJ1dHRvbiB0byB1cGRhdGVcIik7XHJcblxyXG5cdFx0Y29uc3QgbW9kSXRlbUVsID0gaXRlbS5oaWRlRWxlbWVudC5jbG9zZXN0KFYuY2FudmFzLnNlbGVjdG9yLm1vZHVsZV9pdGVtKTtcclxuXHRcdGNvbnN0IGlFbCA9IGl0ZW0uaGlkZUVsZW1lbnQuZmluZChcImlcIik7XHJcblxyXG5cdFx0Ly8gdXBkYXRlIGhpZGRlbiBjbGFzcyBvbiB0aGUgPGk+IGFuZCA8bGk+XHJcblx0XHRpRWwuYWRkKG1vZEl0ZW1FbCkudG9nZ2xlQ2xhc3MoVi5jc3NDbGFzcy5pdGVtX2hpZGRlbiwgaXRlbS5oaWRkZW4pO1xyXG5cclxuXHRcdGlmICghaW5zdGFudCkgYXdhaXQgVXRpbHMud2FpdChWLnVpLmZhZGVfdGltZSk7XHJcblxyXG5cdFx0Ly8gdXBkYXRlIGRpc2FibGUgc3RhdHVzIGFuZCB0aXRsZSwgdW5kb2luZyB3YWl0aW5nLWRpc2FibGVcclxuXHRcdGl0ZW0uaGlkZUVsZW1lbnQudG9nZ2xlQ2xhc3MoVi5jc3NDbGFzcy5oaWRlX2Rpc2FibGVkLCBpdGVtLmlzR3JhZGVkKTtcclxuXHRcdGlFbC5hdHRyKFwidGl0bGVcIiwgaXRlbS5pc0dyYWRlZCA/IFYudG9vbHRpcC5oaWRlX2Rpc2FibGVkIDogaXRlbS5oaWRkZW4gPyBWLnRvb2x0aXAudW5oaWRlIDogVi50b29sdGlwLmhpZGUpO1xyXG5cclxuXHR9XHJcblxyXG5cdHN0YXRpYyB1cGRhdGVNb2R1bGUobW9kdWxlOiBNb2R1bGUpIHtcclxuXHJcblx0XHRpZiAoREFUQS5lbGVtZW50cy50b2MgIT09IG51bGwpIHtcclxuXHRcdFx0Y29uc3QgYWxsSXRlbXMgPSBtb2R1bGUuaXRlbXMuZmlsdGVyKGkgPT4gIWkuaXNTdWJIZWFkZXIgJiYgIWkuaGlkZGVuKTtcclxuXHRcdFx0Y29uc3QgdG90YWxJdGVtcyA9IGFsbEl0ZW1zLmxlbmd0aDtcclxuXHJcblx0XHRcdGxldCBjaGVja2VkSXRlbXM6IG51bWJlcjtcclxuXHRcdFx0bGV0IHBlcmNlbnQ6IG51bWJlcjtcclxuXHJcblx0XHRcdGlmICh0b3RhbEl0ZW1zID4gMCkge1xyXG5cdFx0XHRcdGNoZWNrZWRJdGVtcyA9IGFsbEl0ZW1zLmZpbHRlcihpID0+IGkuY2hlY2tlZCkubGVuZ3RoO1xyXG5cdFx0XHRcdHBlcmNlbnQgPSBNYXRoLnJvdW5kKGNoZWNrZWRJdGVtcyAvIHRvdGFsSXRlbXMgKiAxMDApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGNoZWNrZWRJdGVtcyA9IDA7XHJcblx0XHRcdFx0cGVyY2VudCA9IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbnN0IGJhY2tncm91bmRJbWFnZSA9IFV0aWxzLmZvcm1hdChWLm1pc2MudG9jX2JhY2tncm91bmQsIHtwZXJjZW50fSk7XHJcblxyXG5cdFx0XHREQVRBLmVsZW1lbnRzLnRvY1xyXG5cdFx0XHRcdC5maW5kKGBbJHtWLmRhdGFBdHRyLnRvY19tb2R1bGVfaWR9PScke21vZHVsZS5pZH0nXWApXHJcblx0XHRcdFx0LmF0dHIoVi5kYXRhQXR0ci50b2NfdG90YWwsIHRvdGFsSXRlbXMpXHJcblx0XHRcdFx0LmF0dHIoVi5kYXRhQXR0ci50b2NfY2hlY2tlZF9jb3VudCwgY2hlY2tlZEl0ZW1zKVxyXG5cdFx0XHRcdC5hdHRyKFYuZGF0YUF0dHIudG9jX3BlcmNlbnRhZ2UsIHBlcmNlbnQpXHJcblx0XHRcdFx0LmNsb3Nlc3QoXCJsaVwiKVxyXG5cdFx0XHRcdC50b2dnbGVDbGFzcyhWLmNzc0NsYXNzLml0ZW1faGlkZGVuLCB0b3RhbEl0ZW1zID09PSAwKVxyXG5cdFx0XHRcdC5jc3Moe2JhY2tncm91bmRJbWFnZX0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGlmIG5vIHZpc2libGUgaXRlbXMgaW4gdGhpcyBtb2R1bGUsIGhpZGUgdGhlIGVudGlyZSBtb2R1bGVcclxuXHRcdGNvbnN0IG5vSXRlbXMgPSBtb2R1bGUuaXRlbXMuZmlsdGVyKGkgPT4gIWkuaXNTdWJIZWFkZXIgJiYgIWkuaGlkZGVuKS5sZW5ndGggPT09IDA7XHJcblx0XHQkKFwiI2NvbnRleHRfbW9kdWxlX1wiICsgbW9kdWxlLmlkKS50b2dnbGVDbGFzcyhWLmNzc0NsYXNzLml0ZW1faGlkZGVuLCBub0l0ZW1zKTtcclxuXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgdXBkYXRlTmF2VGFiUG9zaXRpb24odGFiOiBOYXZUYWIpIHtcclxuXHJcblx0XHRpZiAoIXRhYi5oYXNDdXN0b21Qb3NpdGlvbikgdGhyb3cgbmV3IEVycm9yKFwiVGFiIGhhcyBubyBjdXN0b20gcG9zaXRpb25cIik7XHJcblxyXG5cdFx0Y29uc3QgdGFiTGlzdCA9ICQoVi5jYW52YXMuc2VsZWN0b3IubmF2X3RhYnMpO1xyXG5cdFx0Y29uc3QgdGFiRWwgPSB0YWJMaXN0LmZpbmQoXCJhLlwiICsgdGFiLmlkKS5wYXJlbnQoKTtcclxuXHJcblx0XHRpZiAodGFiLmhpZGRlbilcclxuXHRcdFx0dGFiRWwuaGlkZSgpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0YWJFbC5zaG93KCkuZGV0YWNoKCkuaW5zZXJ0QmVmb3JlKHRhYkxpc3QuY2hpbGRyZW4oKS5lcSh0YWIucG9zaXRpb24gLSAxKSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgdXBkYXRlU2Nyb2xsUG9zaXRpb24oKSB7XHJcblx0XHRjb25zdCBzY3JvbGxUb3AgPSBQQUdFLnNjcm9sbGluZ0VsZW1lbnQucHJvcChcInNjcm9sbFRvcFwiKTtcclxuXHJcblx0XHRpZiAoREFUQS5lbGVtZW50cy50b2MgIT09IG51bGwpIHtcclxuXHRcdFx0REFUQS5lbGVtZW50cy50b2NcclxuXHRcdFx0XHQudG9nZ2xlQ2xhc3MoVi5jc3NDbGFzcy5maXhlZCwgc2Nyb2xsVG9wID4gREFUQS5lbGVtZW50cy50b2MuZGF0YShcImN1dG9mZlwiKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKERBVEEuZWxlbWVudHMuanVtcF9idXR0b24gIT09IG51bGwpIHtcclxuXHRcdFx0REFUQS5lbGVtZW50cy5qdW1wX2J1dHRvblxyXG5cdFx0XHRcdC50b2dnbGVDbGFzcyhWLmNzc0NsYXNzLmFjdGl2ZSwgc2Nyb2xsVG9wID4gVi51aS5qdW1wX3RvcF9jdXRvZmYpO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBzY3JvbGxUb0VsZW1lbnQoZWxlbWVudDogSlF1ZXJ5KSB7XHJcblx0XHRjb25zdCBlbFJlY3QgPSBlbGVtZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0Y29uc3QgY2xpSGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcclxuXHRcdGNvbnN0IHRvcFJhdGlvID0gVi51aS50b3BfaW5zaWRlX3JhdGlvO1xyXG5cclxuXHRcdC8vIGlmIGVsZW1lbnQgaXMgaW4gdmlld3BvcnQsIGp1c3QgZmxhc2ggaXRcclxuXHRcdC8qXHRpbiB2aWV3cG9ydCBpZi4uLlxyXG5cdFx0IGhlaWdodCBpcyBzaG9ydGVyIHRoYW4gdmlld3BvcnQgYW5kIGJvdGggdG9wIGFuZCBib3R0b20gYXJlIGluc2lkZSBPUlxyXG5cdFx0IGhlaWdodCBpcyB0YWxsZXIgdGhhbiB2aWV3cG9ydCBhbmQgdG9wIGlzIHdpdGhpbiB0b3AgcGFydCBvZiBwYWdlXHJcblx0XHQgKi9cclxuXHRcdGlmICgoZWxSZWN0LmhlaWdodCA8IGNsaUhlaWdodCAmJiBlbFJlY3QudG9wID49IDAgJiYgZWxSZWN0LmJvdHRvbSA8IGNsaUhlaWdodCkgfHxcclxuXHRcdFx0KGVsUmVjdC50b3AgPj0gMCAmJiBlbFJlY3QudG9wIDw9IGNsaUhlaWdodCAqIHRvcFJhdGlvKSkge1xyXG5cdFx0XHRVSS5mbGFzaEVsZW1lbnQoZWxlbWVudCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHsgLy8gaWYgbm90LCBzY3JvbGwgdG8gaXRcclxuXHRcdFx0Y29uc3Qgc2Nyb2xsVG9wID0gZWxlbWVudC5vZmZzZXQoKS50b3AgLSBWLnVpLnNjcm9sbF90b3Bfb2Zmc2V0O1xyXG5cdFx0XHRQQUdFLnNjcm9sbGluZ0VsZW1lbnQuYW5pbWF0ZSh7c2Nyb2xsVG9wfSxcclxuXHRcdFx0XHRWLnVpLnNjcm9sbF90aW1lLFxyXG5cdFx0XHRcdCgpID0+IFVJLmZsYXNoRWxlbWVudChlbGVtZW50KSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZmxhc2hFbGVtZW50KGVsZW1lbnQ6IEpRdWVyeSkge1xyXG5cdFx0ZWxlbWVudC5hZGRDbGFzcyhWLmNzc0NsYXNzLmZsYXNoKTtcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4gZWxlbWVudC5yZW1vdmVDbGFzcyhWLmNzc0NsYXNzLmZsYXNoKSwgMTAwMCk7XHJcblx0fVxyXG5cclxufVxyXG4vLyBlbmQgTUFJTlxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbWFpbi50cyJdLCJzb3VyY2VSb290IjoiIn0=