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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vars__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objects__ = __webpack_require__(1);



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzU3YzExZTBhMjAzY2NlYmZiMDciLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZhcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL29iamVjdHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBO0lBbUdDO1FBakdBLFdBQU0sR0FBRyxjQUFjLENBQUM7UUFFeEIsYUFBUSxHQUFHO1lBQ1YsTUFBTSxFQUFFLFFBQVE7WUFDaEIsZUFBZSxFQUFFLGlCQUFpQjtZQUNsQyxnQkFBZ0IsRUFBRSxrQkFBa0I7WUFDcEMsV0FBVyxFQUFFLGFBQWE7WUFDMUIsS0FBSyxFQUFFLFlBQVk7WUFDbkIsZ0JBQWdCLEVBQUUsa0JBQWtCO1lBQ3BDLFdBQVcsRUFBRSxRQUFRO1lBQ3JCLFdBQVcsRUFBRSxVQUFVO1lBQ3ZCLGFBQWEsRUFBRSxlQUFlO1lBQzlCLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLEtBQUssRUFBRSxPQUFPO1lBQ2QsU0FBUyxFQUFFLGNBQWM7WUFDekIsUUFBUSxFQUFFLGNBQWM7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YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3NTdjMTFlMGEyMDNjY2ViZmIwNyIsImNsYXNzIFNhc3NWYXJzIHtcclxuXHJcblx0cHJlZml4ID0gXCJiZXR0ZXJDYW52YXNcIjtcclxuXHJcblx0Y3NzQ2xhc3MgPSB7XHJcblx0XHRhY3RpdmU6IFwiYWN0aXZlXCIsXHJcblx0XHRjaGVja2JveF9wYXJlbnQ6IFwiY2hlY2tib3gtcGFyZW50XCIsXHJcblx0XHRjaGVja2JveF9jaGVja2VkOiBcImNoZWNrYm94LWNoZWNrZWRcIixcclxuXHRcdGNoZWNrYm94X3RkOiBcImNoZWNrYm94LXRkXCIsXHJcblx0XHRmbGFzaDogXCJhbmltLWZsYXNoXCIsXHJcblx0XHRjb3Vyc2VfbGlua190ZXh0OiBcImNvdXJzZS1saW5rLXRleHRcIixcclxuXHRcdGl0ZW1faGlkZGVuOiBcImhpZGRlblwiLFxyXG5cdFx0aGlkZV9idXR0b246IFwiYnRuLWhpZGVcIixcclxuXHRcdGhpZGVfZGlzYWJsZWQ6IFwiaGlkZS1kaXNhYmxlZFwiLFxyXG5cdFx0dG9jX3JhdGlvOiBcInRvYy1yYXRpb1wiLFxyXG5cdFx0dG9jX3RpdGxlOiBcInRvYy10aXRsZVwiLFxyXG5cdFx0Zml4ZWQ6IFwiZml4ZWRcIixcclxuXHRcdGl0ZW1faWNvbjogXCJpY29uLXdyYXBwZXJcIixcclxuXHRcdGRvd25sb2FkOiBcImRvd25sb2FkLWJ0blwiLFxyXG5cdFx0ZXh0ZXJuYWxfdXJsOiBcInVybC1idG5cIixcclxuXHJcblx0XHRwb3B1cF9sb2FkZWQ6IFwiZG9uZS1sb2FkaW5nXCIsXHJcblx0XHRwb3B1cF9jb25uZWN0ZWQ6IFwicGFnZS1jb25uZWN0ZWRcIixcclxuXHRcdHBvcHVwX3JlcXVpcmVfcGFnZTogXCJyZXF1aXJlLXBhZ2VcIlxyXG5cdH07XHJcblxyXG5cdGRhdGFBdHRyID0ge1xyXG5cdFx0dG9jX21vZHVsZV9pZDogXCJ0b2MtbW9kdWxlLWlkXCIsXHJcblx0XHR0b2NfdG90YWw6IFwidG9jLXRvdGFsXCIsXHJcblx0XHR0b2NfY2hlY2tlZF9jb3VudDogXCJ0b2MtY2hlY2tlZC1jb3VudFwiLFxyXG5cdFx0dG9jX3BlcmNlbnRhZ2U6IFwidG9jLXBlcmNlbnRhZ2VcIixcclxuXHRcdG1vZF9pdGVtX2lkOiBcIml0ZW0taWRcIixcclxuXHRcdGNvdXJzZV9uYW1lOiBcImNvdXJzZS1uYW1lXCIsXHJcblx0XHRjb3Vyc2VfY29kZTogXCJjb3Vyc2UtY29kZVwiLFxyXG5cdFx0ZGVmX2luZGVudDogXCJkZWZhdWx0LWluZGVudFwiXHJcblx0fTtcclxuXHJcblx0aWQgPSB7XHJcblx0XHR0b2M6IFwidG9jXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJqdW1wLXRvLXRvcFwiLFxyXG5cclxuXHRcdHBvcHVwX3BhZ2VfbWlzc2luZzogXCJwYWdlLW1pc3NpbmctZXJyb3JcIixcclxuXHRcdHBvcHVwX2V4X25hbWU6IFwiZXh0ZW5zaW9uLW5hbWVcIixcclxuXHRcdHBvcHVwX2luc2VydGlvbl9wb2ludDogXCJpbnNlcnRpb24tcG9pbnRcIixcclxuXHRcdHBvcHVwX2p1bXBfYnV0dG9uOiBcImp1bXAtdG9cIlxyXG5cdH07XHJcblxyXG5cdGNvbG9yID0ge1xyXG5cdFx0dG9jX2ZpbGw6IFwicmdiYSgwLCAyNTUsIDAsIC43NSlcIixcclxuXHRcdHRvY19ib3JkZXI6IFwicmdiKDEwMiwgMTIwLCAxMzUpXCIsXHJcblx0XHR0b2NfdGl0bGU6IFwidmFyKC0taWMtYnJhbmQtcHJpbWFyeSlcIiwgLy8gd2FzIFwicmdiKDU3LCA3NSwgODgpXCIsXHJcblx0XHRjaGVja2JveF9jaGVjazogXCJyZ2IoMjIsIDE2MCwgMTMzKVwiLFxyXG5cdFx0Y2hlY2tib3hfYm9yZGVyOiBcInJnYigxMDIsIDEyMCwgMTM1KVwiLFxyXG5cdFx0aGlnaGxpZ2h0X29yYW5nZTogXCJyZ2IoMjU1LCAxNTIsIDApXCIsXHJcblx0XHRoaWdobGlnaHRfcmVkOiBcInJnYigyNTUsIDAsIDApXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJyZ2IoNTcsIDc1LCA4OClcIlxyXG5cdH07XHJcblxyXG5cdHVpID0ge1xyXG5cdFx0dG9wX2luc2lkZV9yYXRpbzogMC4wNSxcclxuXHRcdHNjcm9sbF90b3Bfb2Zmc2V0OiA1LFxyXG5cdFx0anVtcF90b3BfY3V0b2ZmOiAxMDAsXHJcblx0XHR0b2NfdG9wX21hcmdpbjogMzIsXHJcblx0XHRzY3JvbGxfdGltZTogNTAwLFxyXG5cdFx0ZmFkZV90aW1lOiA1MDAsXHJcblx0XHRzdWJoZWFkZXJfaW5kZW50OiAwLFxyXG5cdFx0bWFpbl9pbmRlbnQ6IDFcclxuXHR9O1xyXG5cclxuXHRzdGF0ZSA9IHtcclxuXHRcdHNob3dfaGlkZGVuOiB7XHJcblx0XHRcdGNzc0NsYXNzOiBcInNob3ctaGlkZGVuXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIlNob3cgaGlkZGVuIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRoaWRlX2NoZWNrZWQ6IHtcclxuXHRcdFx0Y3NzQ2xhc3M6IFwiaGlkZS1jaGVja2VkXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCIsIFwiZ3JhZGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIkhpZGUgY29tcGxldGVkIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRoaWdobGlnaHRfdW5jaGVja2VkOiB7XHJcblx0XHRcdGNzc0NsYXNzOiBcIm1hcmstdW5jaGVja2VkXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCIsIFwiZ3JhZGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIk1hcmsgdW5jaGVja2VkIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRkaXNhYmxlX2luZGVudF9vdmVycmlkZToge1xyXG5cdFx0XHRwYWdlczogW1wibW9kdWxlc1wiXSxcclxuXHRcdFx0ZGVzYzogXCJEaXNhYmxlIGluZGVudCBvdmVycmlkZXNcIlxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHNhc3NKc29uOiBzdHJpbmc7XHJcblxyXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IG1ldGEgPSB7XHJcblx0XHRkYXRhUHJlZml4VHlwZTogXCJkYXRhQXR0clwiLFxyXG5cdFx0cHJlZml4VHlwZXM6IFtcImNzc0NsYXNzXCIsIFwiZGF0YUF0dHJcIiwgXCJpZFwiXSxcclxuXHRcdHByZWZpeEV4Y2x1ZGU6IFtcInBvcHVwXy4rXCJdXHJcblx0fTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdFx0Y29uc3QgdHlwZXMgPSBuZXcgU2V0KFNhc3NWYXJzLm1ldGEucHJlZml4VHlwZXMpO1xyXG5cclxuXHRcdGNvbnN0IHByb2Nlc3NPYmplY3QgPSAob2JqOiBvYmplY3QsIG9iak5hbWU6IHN0cmluZykgPT4ge1xyXG5cclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XHJcblx0XHRcdFx0aWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkgY29udGludWU7XHJcblxyXG5cdFx0XHRcdGxldCB2YWw6IG9iamVjdCB8IHN0cmluZyB8IG51bWJlciA9IG9ialtrZXldO1xyXG5cclxuXHRcdFx0XHRpZiAodHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIikge1xyXG5cclxuXHRcdFx0XHRcdHByb2Nlc3NPYmplY3QodmFsLCBrZXkpO1xyXG5cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xyXG5cclxuXHRcdFx0XHRcdGNvbnN0IGV4Y2x1ZGVkID0gU2Fzc1ZhcnMubWV0YS5wcmVmaXhFeGNsdWRlXHJcblx0XHRcdFx0XHRcdC5tYXAoc3RyID0+IG5ldyBSZWdFeHAoXCJeXCIgKyBzdHIgKyBcIiRcIikpXHJcblx0XHRcdFx0XHRcdC5zb21lKHJlZ2V4ID0+IHJlZ2V4LnRlc3Qoa2V5KSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFleGNsdWRlZCAmJiAodHlwZXMuaGFzKG9iak5hbWUpIHx8IHR5cGVzLmhhcyhrZXkpKSlcclxuXHRcdFx0XHRcdFx0dmFsID0gdGhpcy5wcmVmaXggKyBcIi1cIiArIHZhbDtcclxuXHJcblx0XHRcdFx0XHRpZiAob2JqTmFtZSA9PT0gU2Fzc1ZhcnMubWV0YS5kYXRhUHJlZml4VHlwZSlcclxuXHRcdFx0XHRcdFx0dmFsID0gXCJkYXRhLVwiICsgdmFsO1xyXG5cclxuXHRcdFx0XHRcdG9ialtrZXldID0gdmFsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0cHJvY2Vzc09iamVjdCh0aGlzLCBcInJvb3RcIik7XHJcblxyXG5cdFx0dGhpcy5zYXNzSnNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXMpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIFZhcnMgZXh0ZW5kcyBTYXNzVmFycyB7XHJcblxyXG5cdHRvb2x0aXAgPSB7XHJcblx0XHRtYXJrX2NvbXBsZXRlOiBcIk1hcmsgYXMgY29tcGxldGVkXCIsXHJcblx0XHRtYXJrX2luY29tcGxldGU6IFwiTWFyayBhcyBpbmNvbXBsZXRlXCIsXHJcblx0XHRoaWRlOiBcIkhpZGUgdGhpcyBpdGVtXCIsXHJcblx0XHR1bmhpZGU6IFwiVW5oaWRlIHRoaXMgaXRlbVwiLFxyXG5cdFx0aGlkZV9kaXNhYmxlZDogXCJDYW5ub3QgaGlkZSBncmFkZWQgaXRlbVwiLFxyXG5cdFx0anVtcF9idXR0b246IFwiSnVtcCB0byB0b3BcIixcclxuXHRcdHdhaXRpbmc6IFwiV2FpdGluZy4uLlwiLFxyXG5cdFx0ZG93bmxvYWQ6IFwiRG93bmxvYWQgZmlsZTogXFxcIntmaWxlbmFtZX1cXFwiXCIsXHJcblx0XHRleHRlcm5hbF91cmw6IFwiVmlzaXQgZXh0ZXJuYWwgVVJMXCIsXHJcblx0XHRoYXNfc3VibWlzc2lvbjogXCJBc3NpZ25tZW50IGhhcyBzdWJtaXNzaW9uXCIsXHJcblx0XHRwb3B1cF9ub191bmNoZWNrZWQ6IFwiTm8gdW5jaGVja2VkIGl0ZW1zIHRvIGp1bXAgdG9cIlxyXG5cdH07XHJcblxyXG5cdG1pc2MgPSB7XHJcblx0XHR0b2NfYmFja2dyb3VuZDogYC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQsICR7dGhpcy5jb2xvci50b2NfZmlsbH0ge3BlcmNlbnR9JSwgdHJhbnNwYXJlbnQge3BlcmNlbnR9JSlgLFxyXG5cdFx0dG9rZW5fa2V5OiBcImFjY2Vzc1Rva2VuXCJcclxuXHR9O1xyXG5cclxuXHRlbGVtZW50ID0ge1xyXG5cclxuXHRcdGNoZWNrYm94OlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuY2hlY2tib3hfcGFyZW50fSc+XHJcblx0XHRcdFx0XHQ8aW5wdXQgdHlwZT0nY2hlY2tib3gnICR7dGhpcy5kYXRhQXR0ci5tb2RfaXRlbV9pZH09J3tpdGVtX2lkfSc+XHJcblx0XHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRkb3dubG9hZF9idXR0b246XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5kb3dubG9hZH0nIHRpdGxlPScke3RoaXMudG9vbHRpcC5kb3dubG9hZH0nPlxyXG5cdFx0XHRcdFx0PGEgaHJlZj1cIntmaWxlX3VybH1cIj48L2E+XHJcblx0XHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHR1cmxfYnV0dG9uOlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuZXh0ZXJuYWxfdXJsfScgdGl0bGU9JyR7dGhpcy50b29sdGlwLmV4dGVybmFsX3VybH0nPlxyXG5cdFx0XHRcdFx0PGEgaHJlZj1cIntleHRlcm5hbF91cmx9XCIgY2xhc3M9XCJub3RfZXh0ZXJuYWxcIiB0YXJnZXQ9XCJfYmxhbmtcIj48L2E+XHJcblx0XHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRoaWRlX2J1dHRvbjpcclxuXHRcdFx0XHRgPGRpdiBzdHlsZT0nZGlzcGxheTpub25lJyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLmhpZGVfYnV0dG9ufSc+XHJcblx0XHRcdFx0XHQ8aSAke3RoaXMuZGF0YUF0dHIubW9kX2l0ZW1faWR9PSd7aXRlbV9pZH0nPjwvaT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGNvdXJzZV9saW5rOlxyXG5cdFx0XHRgPGxpIHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiB7dGFiQ29sb3J9JyBjbGFzcz0nbWVudS1pdGVtIGljLWFwcC1oZWFkZXJfX21lbnUtbGlzdC1pdGVtJz5cclxuXHRcdFx0XHQ8YSBocmVmPScvY291cnNlcy97dGFiSUR9L21vZHVsZXMnIGNsYXNzPSdpYy1hcHAtaGVhZGVyX19tZW51LWxpc3QtbGluayc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdtZW51LWl0ZW0taWNvbi1jb250YWluZXInIGFyaWEtaGlkZGVuPSd0cnVlJz48aT48L2k+PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiB7dGFiQ29sb3J9OyBib3JkZXItcmlnaHQtY29sb3I6IHt0YWJDb2xvcn0nXHJcblx0XHRcdFx0XHRcdFx0JHt0aGlzLmRhdGFBdHRyLmNvdXJzZV9uYW1lfT0ne25hbWV9JyAke3RoaXMuZGF0YUF0dHIuY291cnNlX2NvZGV9PSd7Y29kZX0nXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3M9J21lbnUtaXRlbV9fdGV4dCAke3RoaXMuY3NzQ2xhc3MuY291cnNlX2xpbmtfdGV4dH0nPjwvZGl2PlxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0PC9saT5gLFxyXG5cclxuXHRcdHRvYzpcclxuXHRcdFx0YDxkaXYgaWQ9JyR7dGhpcy5pZC50b2N9JyBjbGFzcz0naWMtYXBwLWNvdXJzZS1tZW51IGxpc3Qtdmlldyc+XHJcblx0XHRcdFx0PGRpdiBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLnRvY190aXRsZX0nPlRhYmxlIG9mIENvbnRlbnRzPC9kaXY+XHJcblx0XHRcdFx0PG5hdj48dWw+PC91bD48L25hdj5cclxuXHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHR0b2NfaXRlbTpcclxuXHRcdFx0YDxsaT5cclxuXHRcdFx0XHQ8YSBocmVmPScjJyB0aXRsZT0ne2l0ZW1fbmFtZX0nPlxyXG5cdFx0XHRcdFx0e2l0ZW1fbmFtZX1cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy50b2NfcmF0aW99JyAke3RoaXMuZGF0YUF0dHIudG9jX21vZHVsZV9pZH09J3tpdGVtX2lkfSc+PC9kaXY+XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHQ8L2xpPmAsXHJcblxyXG5cdFx0anVtcF9idXR0b246XHJcblx0XHRcdGA8ZGl2IGlkPScke3RoaXMuaWQuanVtcF9idXR0b259Jz5cclxuXHRcdFx0XHQ8aSB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuanVtcF9idXR0b259Jz48L2k+XHJcblx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0c3VibWlzc2lvbl9pY29uOlxyXG5cdFx0XHRgPGRpdiB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuaGFzX3N1Ym1pc3Npb259JyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLml0ZW1faWNvbn0nPlxyXG5cdFx0XHRcdDxpIGNsYXNzPSdpY29uLXB1Ymxpc2gnPjwvaT5cclxuXHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRwb3B1cF9zdGF0ZV9zd2l0Y2g6XHJcblx0XHRcdGA8ZGl2IGNsYXNzPVwic3dpdGNoICR7dGhpcy5jc3NDbGFzcy5wb3B1cF9yZXF1aXJlX3BhZ2V9XCI+XHJcblx0XHRcdFx0PGxhYmVsIGZvcj1cIntuYW1lfVwiIGNsYXNzPVwibWRsLXN3aXRjaCBtZGwtanMtc3dpdGNoIG1kbC1qcy1yaXBwbGUtZWZmZWN0XCI+XHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cIm1kbC1zd2l0Y2hfX2xhYmVsXCI+e2Rlc2N9PC9zcGFuPlxyXG5cdFx0XHRcdFx0PGlucHV0IGlkPVwie25hbWV9XCIgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJtZGwtc3dpdGNoX19pbnB1dFwiPlxyXG5cdFx0XHRcdDwvbGFiZWw+XHJcblx0XHRcdDwvZGl2PmBcclxuXHR9O1xyXG5cclxuXHQvLyBzZXBhcmF0ZWQgZm9yIHVzZSBpbiB0ZW1wbGF0ZSBzdHJpbmdzIGJlbG93XHJcblx0cHJpdmF0ZSBfY2FudmFzTmFtZXNwYWNlID0gYGNvbS5qbWFyaW5lci4ke3RoaXMucHJlZml4fWA7XHJcblxyXG5cdGNhbnZhcyA9IHtcclxuXHRcdHNlbGVjdG9yOiB7XHJcblx0XHRcdG1vZHVsZTogXCJkaXYuY29udGV4dF9tb2R1bGVcIixcclxuXHRcdFx0bW9kdWxlX2l0ZW06IFwibGkuY29udGV4dF9tb2R1bGVfaXRlbVwiLFxyXG5cdFx0XHRtb2R1bGVfaXRlbXM6IFwidWwuY29udGV4dF9tb2R1bGVfaXRlbXNcIixcclxuXHRcdFx0c3ViaGVhZGVyOiBcImxpLmNvbnRleHRfbW9kdWxlX3N1Yl9oZWFkZXJcIixcclxuXHRcdFx0bm90X3N1YmhlYWRlcjogXCJsaS5jb250ZXh0X21vZHVsZV9pdGVtOm5vdCguY29udGV4dF9tb2R1bGVfc3ViX2hlYWRlcilcIixcclxuXHRcdFx0bmF2X3RhYnM6IFwidWwjc2VjdGlvbi10YWJzXCJcclxuXHRcdH0sXHJcblx0XHRhcGk6IHtcclxuXHRcdFx0bmFtZXNwYWNlOiB0aGlzLl9jYW52YXNOYW1lc3BhY2UsXHJcblx0XHRcdHJvb3RfdXJsOiBcIi9hcGkvdjEvXCIsXHJcblx0XHRcdHBlcl9wYWdlOiAxMDAsXHJcblx0XHRcdHVybHM6IHtcclxuXHRcdFx0XHRjdXN0b21fZGF0YTogYHVzZXJzL3NlbGYvY3VzdG9tX2RhdGF7ZGF0YVBhdGh9P25zPSR7dGhpcy5fY2FudmFzTmFtZXNwYWNlfWAsXHJcblx0XHRcdFx0ZmF2b3JpdGVfY291cnNlczogXCJ1c2Vycy9zZWxmL2Zhdm9yaXRlcy9jb3Vyc2VzXCIsXHJcblx0XHRcdFx0Y3VzdG9tX2NvbG9yczogXCJ1c2Vycy9zZWxmL2NvbG9yc1wiLFxyXG5cdFx0XHRcdGFzc2lnbm1lbnRzOiBcInVzZXJzL3NlbGYvY291cnNlcy97Y291cnNlSUR9L2Fzc2lnbm1lbnRzXCIsXHJcblx0XHRcdFx0bW9kdWxlczogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vbW9kdWxlc1wiLFxyXG5cdFx0XHRcdG1vZHVsZV9pdGVtczogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vbW9kdWxlcy97bW9kdWxlSUR9L2l0ZW1zXCIsXHJcblx0XHRcdFx0ZmlsZV9kaXJlY3Q6IFwiY291cnNlcy97Y291cnNlSUR9L2ZpbGVzL3tmaWxlSUR9XCIsXHJcblx0XHRcdFx0bmF2aWdhdGlvbl90YWJzOiBcImNvdXJzZXMve2NvdXJzZUlEfS90YWJzXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0ZGF0YV91cmxzOiB7XHJcblx0XHRcdFx0YWN0aXZlX3N0YXRlczogXCJhY3RpdmVfc3RhdGVzXCIsXHJcblx0XHRcdFx0Y29tcGxldGVkX2Fzc2lnbm1lbnRzOiBcImNvbXBsZXRlZF9hc3NpZ25tZW50c1wiLFxyXG5cdFx0XHRcdGhpZGRlbl9hc3NpZ25tZW50czogXCJoaWRkZW5fYXNzaWdubWVudHNcIixcclxuXHRcdFx0XHR0YWJfcG9zaXRpb25zOiBcInRhYl9wb3NpdGlvbnNcIlxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuY29uc3QgVkFSUyA9IG5ldyBWYXJzKCk7XHJcbmV4cG9ydCBjb25zdCBWID0gVkFSUztcclxuZXhwb3J0IGRlZmF1bHQgVkFSUy5zYXNzSnNvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3ZhcnMudHMiLCJpbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0ICogYXMgQ2FudmFzQVBJIGZyb20gXCIuL2NhbnZhc19hcGlcIjtcclxuXHJcbmNsYXNzIERhdGEge1xyXG5cdGNvdXJzZVBhZ2U6IENhbnZhc1BhZ2U7XHJcblx0Y291cnNlSUQ6IG51bWJlcjtcclxuXHRtb2R1bGVzOiBNYXA8bnVtYmVyLCBNb2R1bGU+OyAvLyBtb2R1bGUgaWQgPT4gYXJyYXkgb2YgTW9kdWxlSXRlbVxyXG5cdG1vZHVsZUl0ZW1zOiBNYXA8bnVtYmVyLCBNb2R1bGVJdGVtPjsgLy8gbW9kdWxlIGl0ZW0gaWQgPT4gTW9kdWxlSXRlbVxyXG5cdHN0YXRlczogTWFwPHN0cmluZywgU3RhdGU+OyAvLyBzdGF0ZU5hbWUgPT4gU3RhdGVcclxuXHRjb3Vyc2VUYWJzOiBNYXA8bnVtYmVyLCBDdXN0b21Db3Vyc2VUYWI+OyAvLyBjb3Vyc2UgaWQgPT4gY291cnNlIHRhYlxyXG5cdG5hdlRhYnM6IE1hcDxzdHJpbmcsIE5hdlRhYj47IC8vIHRhYiBpZCBzdHJpbmcgPT4gdGFiXHJcblx0b25NYWluUGFnZTogYm9vbGVhbjtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0ZXh0ZW5zaW9uSWQ6IHN0cmluZztcclxuXHRlbGVtZW50czoge2p1bXBfYnV0dG9uOiBKUXVlcnksIHRvYzogSlF1ZXJ5fTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLm1vZHVsZXMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLm1vZHVsZUl0ZW1zID0gbmV3IE1hcCgpO1xyXG5cdFx0dGhpcy5zdGF0ZXMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLmNvdXJzZVRhYnMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLm5hdlRhYnMgPSBuZXcgTWFwKCk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50cyA9IHtqdW1wX2J1dHRvbjogbnVsbCwgdG9jOiBudWxsfTtcclxuXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBQYWdlIHtcclxuXHJcblx0Ym9keTogSlF1ZXJ5O1xyXG5cdHNjcm9sbGluZ0VsZW1lbnQ6IEpRdWVyeTtcclxuXHRtYWluPzogSlF1ZXJ5O1xyXG5cdGNvbnRlbnQ/OiBKUXVlcnk7XHJcblx0bGVmdD86IEpRdWVyeTtcclxuXHRzaWRlYmFyOiBKUXVlcnk7XHJcblx0Z3JhZGVzPzogSlF1ZXJ5O1xyXG5cclxuXHRpbml0aWFsaXplKCkge1xyXG5cclxuXHRcdHRoaXMuYm9keSA9ICQoXCJib2R5XCIpO1xyXG5cdFx0dGhpcy5zY3JvbGxpbmdFbGVtZW50ID0gJChkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IGRvY3VtZW50LmJvZHkpO1xyXG5cdFx0dGhpcy5zaWRlYmFyID0gJChcIiNtZW51XCIpO1xyXG5cdFx0dGhpcy5tYWluID0gJChcIiNtYWluXCIpO1xyXG5cclxuXHRcdGlmIChEQVRBLm9uTWFpblBhZ2UpIHtcclxuXHRcdFx0dGhpcy5jb250ZW50ID0gJChcIiNjb250ZW50XCIpO1xyXG5cdFx0XHR0aGlzLmxlZnQgPSAkKFwiI2xlZnQtc2lkZVwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoREFUQS5jb3Vyc2VQYWdlID09PSBDYW52YXNQYWdlLkdSQURFUylcclxuXHRcdFx0dGhpcy5ncmFkZXMgPSAkKFwiI2dyYWRlc19zdW1tYXJ5XCIpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEN1c3RvbUNvdXJzZVRhYiB7XHJcblx0cmVhZG9ubHkgaWQ6IG51bWJlcjtcclxuXHRyZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcblx0cmVhZG9ubHkgY29kZTogc3RyaW5nO1xyXG5cdHJlYWRvbmx5IGNvbG9yOiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGNvdXJzZURhdGE6IENhbnZhc0FQSS5Db3Vyc2UsIGNvbG9yOiBzdHJpbmcpIHtcclxuXHRcdHRoaXMuaWQgPSBjb3Vyc2VEYXRhLmlkO1xyXG5cdFx0dGhpcy5uYW1lID0gY291cnNlRGF0YS5uYW1lO1xyXG5cdFx0dGhpcy5jb2RlID0gY291cnNlRGF0YS5jb3Vyc2VfY29kZTtcclxuXHRcdHRoaXMuY29sb3IgPSBjb2xvcjtcclxuXHR9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2VGFiIHtcclxuXHRyZWFkb25seSBpZDogc3RyaW5nO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgaW5pdFBvc2l0aW9uOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfcG9zaXRpb246IG51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IodGFiRGF0YTogQ2FudmFzQVBJLlRhYikge1xyXG5cdFx0dGhpcy5pZCA9IHRhYkRhdGEuaWQ7XHJcblx0XHR0aGlzLl9wb3NpdGlvbiA9IG51bGw7XHJcblx0XHR0aGlzLmluaXRQb3NpdGlvbiA9IHRhYkRhdGEucG9zaXRpb247XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0UG9zaXRpb24ocG9zKSB7XHJcblx0XHR0aGlzLl9wb3NpdGlvbiA9IHBvcztcclxuXHR9XHJcblxyXG5cdGdldCBoYXNDdXN0b21Qb3NpdGlvbigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbiAhPSBudWxsO1xyXG5cdH1cclxuXHJcblx0Z2V0IHBvc2l0aW9uKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcG9zaXRpb24gPT0gbnVsbCA/IHRoaXMuaW5pdFBvc2l0aW9uIDogdGhpcy5fcG9zaXRpb24gPT09IC0xID8gbnVsbCA6IHRoaXMuX3Bvc2l0aW9uO1xyXG5cdH1cclxuXHJcblx0Z2V0IGhpZGRlbigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbiA9PT0gLTE7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdGUge1xyXG5cdHByaXZhdGUgbmFtZTogc3RyaW5nO1xyXG5cclxuXHRyZWFkb25seSBib2R5Q2xhc3M6IHN0cmluZztcclxuXHRyZWFkb25seSBvblBhZ2VzOiBDYW52YXNQYWdlW107XHJcblxyXG5cdHB1YmxpYyBhY3RpdmU6IGJvb2xlYW47XHJcblx0cHVibGljIG9uRW5hYmxlOiAoKSA9PiB2b2lkO1xyXG5cdHB1YmxpYyBvbkRpc2FibGU6ICgpID0+IHZvaWQ7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGtleSwgc3RhdGVEYXRhLCBhY3RpdmUpIHtcclxuXHRcdHRoaXMubmFtZSA9IGtleTtcclxuXHRcdHRoaXMuYm9keUNsYXNzID0gc3RhdGVEYXRhLmNzc0NsYXNzO1xyXG5cdFx0dGhpcy5hY3RpdmUgPSBhY3RpdmU7XHJcblx0XHR0aGlzLm9uUGFnZXMgPSBbXTtcclxuXHJcblx0XHRzdGF0ZURhdGEucGFnZXMuZm9yRWFjaCgocGFnZTogc3RyaW5nKSA9PiB7XHJcblx0XHRcdGNvbnN0IF9wYWdlID0gQ2FudmFzUGFnZVtwYWdlLnRvVXBwZXJDYXNlKCldO1xyXG5cdFx0XHRpZiAoX3BhZ2UgIT09IHVuZGVmaW5lZClcclxuXHRcdFx0XHR0aGlzLm9uUGFnZXMucHVzaChfcGFnZSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG9uQ2hhbmdlKG5ld1N0YXRlOiBib29sZWFuKSB7XHJcblx0XHRpZiAobmV3U3RhdGUgJiYgdGhpcy5vbkVuYWJsZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB0aGlzLm9uRW5hYmxlKCk7XHJcblx0XHRlbHNlIGlmICh0aGlzLm9uRGlzYWJsZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB0aGlzLm9uRGlzYWJsZSgpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2R1bGUge1xyXG5cdHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuXHRyZWFkb25seSBpZDogbnVtYmVyO1xyXG5cdHJlYWRvbmx5IGl0ZW1Db3VudDogbnVtYmVyO1xyXG5cdHJlYWRvbmx5IGl0ZW1zOiBNb2R1bGVJdGVtW107XHJcblxyXG5cdGNvbnN0cnVjdG9yKG1vZHVsZUpzb246IENhbnZhc0FQSS5Nb2R1bGUpIHtcclxuXHRcdHRoaXMubmFtZSA9IG1vZHVsZUpzb24ubmFtZTtcclxuXHRcdHRoaXMuaWQgPSBtb2R1bGVKc29uLmlkO1xyXG5cdFx0dGhpcy5pdGVtQ291bnQgPSBtb2R1bGVKc29uLml0ZW1zX2NvdW50O1xyXG5cdFx0dGhpcy5pdGVtcyA9IFtdO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2R1bGVJdGVtIHtcclxuXHRwcml2YXRlIF9pZDogbnVtYmVyO1xyXG5cdHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuXHRwcml2YXRlIG1vZHVsZUlkOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfdHlwZTogTW9kdWxlSXRlbVR5cGU7XHJcblx0cHJpdmF0ZSBhc3NpZ25tZW50SWQ6IG51bWJlcjtcclxuXHRwcml2YXRlIF9jb250ZW50SWQ6IG51bWJlcjtcclxuXHRwcml2YXRlIF9maWxlRGF0YTogQ2FudmFzQVBJLkZpbGU7XHJcblx0cHJpdmF0ZSBfZXh0ZXJuYWxVcmw6IHN0cmluZztcclxuXHJcblx0cHVibGljIGlzU3VibWl0dGVkOiBib29sZWFuO1xyXG5cclxuXHRwdWJsaWMgY2hlY2tlZDogYm9vbGVhbjtcclxuXHRwdWJsaWMgaGlkZGVuOiBib29sZWFuO1xyXG5cdHByaXZhdGUgX2NoZWNrYm94RWxlbWVudDogSlF1ZXJ5O1xyXG5cdHByaXZhdGUgX2hpZGVFbGVtZW50OiBKUXVlcnk7XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgYnlDb250ZW50SWQgPSBuZXcgTWFwPG51bWJlciwgTW9kdWxlSXRlbT4oKTtcclxuXHJcblx0Y29uc3RydWN0b3IobW9kdWxlSXRlbUpzb24/OiBDYW52YXNBUEkuTW9kdWxlSXRlbSkge1xyXG5cdFx0aWYgKG1vZHVsZUl0ZW1Kc29uKSB0aGlzLnVwZGF0ZShtb2R1bGVJdGVtSnNvbik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3RhdGljIGZyb21Db250ZW50SWQoY29udGVudElkOiBudW1iZXIpOiBNb2R1bGVJdGVtIHtcclxuXHRcdGNvbnN0IGl0ZW0gPSBuZXcgTW9kdWxlSXRlbSgpO1xyXG5cdFx0aXRlbS5fY29udGVudElkID0gY29udGVudElkO1xyXG5cdFx0TW9kdWxlSXRlbS5ieUNvbnRlbnRJZC5zZXQoY29udGVudElkLCBpdGVtKTtcclxuXHRcdHJldHVybiBpdGVtO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHVwZGF0ZShtb2R1bGVJdGVtSnNvbjogQ2FudmFzQVBJLk1vZHVsZUl0ZW0pIHtcclxuXHRcdHRoaXMuX2lkID0gbW9kdWxlSXRlbUpzb24uaWQ7XHJcblx0XHR0aGlzLl9uYW1lID0gbW9kdWxlSXRlbUpzb24udGl0bGU7XHJcblx0XHR0aGlzLm1vZHVsZUlkID0gbW9kdWxlSXRlbUpzb24ubW9kdWxlX2lkO1xyXG5cdFx0dGhpcy5fZXh0ZXJuYWxVcmwgPSBtb2R1bGVJdGVtSnNvbi5leHRlcm5hbF91cmwgfHwgbnVsbDtcclxuXHJcblx0XHRjb25zdCB0eXBlU3RyaW5nOiBzdHJpbmcgPSBtb2R1bGVJdGVtSnNvbi50eXBlXHJcblx0XHRcdC5yZXBsYWNlKC8oW0EtWl0pL2csIChyLCBzKSA9PiBcIl9cIiArIHMpXHJcblx0XHRcdC5yZXBsYWNlKC9eXy8sIFwiXCIpLnRvVXBwZXJDYXNlKCk7XHJcblxyXG5cdFx0dGhpcy5fdHlwZSA9IE1vZHVsZUl0ZW1UeXBlW3R5cGVTdHJpbmddO1xyXG5cclxuXHRcdGlmICh0aGlzLl90eXBlID09PSB1bmRlZmluZWQpXHJcblx0XHRcdGNvbnNvbGUud2FybihgVW5rbm93biBtb2R1bGUgaXRlbSB0eXBlOiBcIiR7dHlwZVN0cmluZ31cImApO1xyXG5cclxuXHRcdHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5oaWRkZW4gPSBmYWxzZTtcclxuXHJcblx0XHRpZiAodGhpcy5fdHlwZSA9PT0gTW9kdWxlSXRlbVR5cGUuQVNTSUdOTUVOVClcclxuXHRcdFx0dGhpcy5zZXRBc3NpZ25tZW50SWQobW9kdWxlSXRlbUpzb24uY29udGVudF9pZCk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRoaXMuYXNzaWdubWVudElkID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRBc3NpZ25tZW50SWQoaWQ6IG51bWJlcikgeyB0aGlzLmFzc2lnbm1lbnRJZCA9IGlkOyB9XHJcblx0cHVibGljIHNldEZpbGVEYXRhKGRhdGE6IENhbnZhc0FQSS5GaWxlKSB7IHRoaXMuX2ZpbGVEYXRhID0gZGF0YTsgfVxyXG5cclxuXHRnZXQgY2FudmFzRWxlbWVudElkKCkge1xyXG5cdFx0c3dpdGNoIChEQVRBLmNvdXJzZVBhZ2UpIHtcclxuXHRcdFx0Y2FzZSBDYW52YXNQYWdlLk1PRFVMRVM6XHJcblx0XHRcdFx0cmV0dXJuIFwiY29udGV4dF9tb2R1bGVfaXRlbV9cIiArIHRoaXMuX2lkOyAvLyBsaSBlbGVtZW50XHJcblx0XHRcdGNhc2UgQ2FudmFzUGFnZS5HUkFERVM6XHJcblx0XHRcdFx0cmV0dXJuIFwic3VibWlzc2lvbl9cIiArIHRoaXMuYXNzaWdubWVudElkOyAvLyB0ciBlbGVtZW50XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgaWQoKSB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG5cdGdldCBuYW1lKCkgeyByZXR1cm4gdGhpcy5fbmFtZTtcdH1cclxuXHRnZXQgdHlwZSgpOiBNb2R1bGVJdGVtVHlwZSB7IHJldHVybiB0aGlzLl90eXBlOyB9XHJcblx0Z2V0IGlzR3JhZGVkKCkgeyByZXR1cm4gdGhpcy5hc3NpZ25tZW50SWQgIT09IG51bGw7IH1cclxuXHRnZXQgaXNTdWJIZWFkZXIoKSB7IHJldHVybiB0aGlzLl90eXBlID09PSBNb2R1bGVJdGVtVHlwZS5TVUJfSEVBREVSOyB9XHJcblx0Z2V0IG1vZHVsZSgpIHsgcmV0dXJuIERBVEEubW9kdWxlcy5nZXQodGhpcy5tb2R1bGVJZCk7IH1cclxuXHRnZXQgZXh0ZXJuYWxVcmwoKSB7IHJldHVybiB0aGlzLl9leHRlcm5hbFVybDsgfVxyXG5cdGdldCBjb250ZW50SWQoKSB7IHJldHVybiB0aGlzLl9jb250ZW50SWQ7IH1cclxuXHJcblx0Z2V0IGNoZWNrYm94RWxlbWVudCgpOiBKUXVlcnkgeyByZXR1cm4gdGhpcy5fY2hlY2tib3hFbGVtZW50OyB9XHJcblx0c2V0IGNoZWNrYm94RWxlbWVudCh2YWx1ZTogSlF1ZXJ5KSB7XHJcblx0XHRpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUubGVuZ3RoID09PSAxKVxyXG5cdFx0XHR0aGlzLl9jaGVja2JveEVsZW1lbnQgPSB2YWx1ZTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBNb2R1bGUgSXRlbSBFbGVtZW50OiBcIiArIHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdGdldCBoaWRlRWxlbWVudCgpOiBKUXVlcnkgeyByZXR1cm4gdGhpcy5faGlkZUVsZW1lbnQ7IH1cclxuXHRzZXQgaGlkZUVsZW1lbnQodmFsdWU6IEpRdWVyeSkge1xyXG5cdFx0aWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlLmxlbmd0aCA9PT0gMSlcclxuXHRcdFx0dGhpcy5faGlkZUVsZW1lbnQgPSB2YWx1ZTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBNb2R1bGUgSXRlbSBFbGVtZW50OiBcIiArIHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdGdldCBmaWxlRGF0YSgpOiBDYW52YXNBUEkuRmlsZSB7IHJldHVybiB0aGlzLl9maWxlRGF0YTsgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gTW9kdWxlSXRlbVR5cGUge1xyXG5cdEFTU0lHTk1FTlQsIFNVQl9IRUFERVIsIERJU0NVU1NJT04sIFFVSVosIFBBR0UsIEZJTEUsIEVYVEVSTkFMX1VSTCwgRVhURVJOQUxfVE9PTFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBDYW52YXNQYWdlIHtcclxuXHRNT0RVTEVTLCBHUkFERVMsIEhPTUUsIFVTRVJTLCBHUk9VUFMsIENPTExBQk9SQVRJT05TLCBESVNDVVNTSU9OX1RPUElDUywgRVhURVJOQUxfVE9PTFMsIEFTU0lHTk1FTlRTXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE1lc3NhZ2VUeXBlIHtcclxuXHRCQVNJQywgU1RBVEVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VEYXRhIHtcclxuXHRhY3Rpb246IHN0cmluZztcclxuXHR0eXBlOiBNZXNzYWdlVHlwZTtcclxuXHJcblx0Y29uc3RydWN0b3IoYWN0aW9uOiBzdHJpbmcsIHR5cGU/OiBNZXNzYWdlVHlwZSkge1xyXG5cdFx0dGhpcy5hY3Rpb24gPSBhY3Rpb247XHJcblx0XHR0aGlzLnR5cGUgPSB0eXBlIHx8IE1lc3NhZ2VUeXBlLkJBU0lDO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXRlTWVzc2FnZURhdGEgZXh0ZW5kcyBNZXNzYWdlRGF0YSB7XHJcblx0c3RhdGVOYW1lOiBzdHJpbmc7XHJcblx0c3RhdGU6IGJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFjdGlvbjogXCJnZXRcIiB8IFwic2V0XCIsIHN0YXRlTmFtZTogc3RyaW5nLCBzdGF0ZT86IGJvb2xlYW4pIHtcclxuXHRcdHN1cGVyKGFjdGlvbiwgTWVzc2FnZVR5cGUuU1RBVEUpO1xyXG5cclxuXHRcdHRoaXMuc3RhdGVOYW1lID0gc3RhdGVOYW1lO1xyXG5cdFx0dGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG5cclxuXHRcdGlmIChhY3Rpb24gPT09IFwic2V0XCIgJiYgdGhpcy5zdGF0ZSA9PT0gdW5kZWZpbmVkKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHN0YXRlIG1lc3NhZ2U6IG5vIGJvb2xlYW4gdG8gc2V0IHN0YXRlIHRvXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV4Y2VwdGlvbiB7XHJcblx0cHJpdmF0ZSByZWFzb246IHN0cmluZztcclxuXHRwcml2YXRlIGZhdGFsOiBib29sZWFuO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihyZWFzb246IHN0cmluZywgZmF0YWw/OiBib29sZWFuKSB7XHJcblx0XHRpZiAoZmF0YWwgPT09IHVuZGVmaW5lZCkgZmF0YWwgPSBmYWxzZTtcclxuXHRcdHRoaXMucmVhc29uID0gcmVhc29uO1xyXG5cdFx0dGhpcy5mYXRhbCA9IGZhdGFsO1xyXG5cdH1cclxuXHJcblx0Z2V0IGlzRmF0YWwoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5mYXRhbDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB0b1N0cmluZygpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlYXNvbjtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBEQVRBID0gbmV3IERhdGEoKTtcclxuZXhwb3J0IGNvbnN0IFBBR0UgPSBuZXcgUGFnZSgpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvb2JqZWN0cy50cyIsImltcG9ydCB7IFYgfSBmcm9tIFwiLi92YXJzXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VEYXRhIH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xyXG5cclxuXHRwcml2YXRlIHN0YXRpYyBBQ0NFU1NfVE9LRU46IHN0cmluZztcclxuXHJcblx0c3RhdGljIGZvcm1hdChzdHI6IHN0cmluZywgb2JqOiBvYmplY3QpOiBzdHJpbmcge1xyXG5cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG5cdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpXHJcblx0XHRcdFx0c3RyID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcXFx7XCIgKyBrZXkgKyBcIlxcXFx9XCIsIFwiZ2lcIiksIG9ialtrZXldKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3RyO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldE9yRGVmYXVsdDxUPihvYmo6IG9iamVjdCwga2V5OiBQcm9wZXJ0eUtleSwgZGVmOiBUKTogVCB7XHJcblx0XHRpZiAob2JqID09PSB1bmRlZmluZWQgfHwgb2JqW2tleV0gPT09IHVuZGVmaW5lZCkgcmV0dXJuIGRlZjtcclxuXHRcdGVsc2UgcmV0dXJuIG9ialtrZXldO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHBlclBhZ2UodXJsOiBzdHJpbmcsIHBlclBhZ2U6IG51bWJlcikge1xyXG5cdFx0cmV0dXJuIGAke3VybH0/cGVyX3BhZ2U9JHtwZXJQYWdlfWA7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZm9ybWF0VXJsKHVybDogc3RyaW5nLCBmb3JtYXRPYmo/OiB7cGVyUGFnZT86IG51bWJlciwgW2tleTogc3RyaW5nXTogYW55fSkge1xyXG5cclxuXHRcdGlmIChmb3JtYXRPYmogIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRpZiAoZm9ybWF0T2JqLnBlclBhZ2UgIT09IHVuZGVmaW5lZClcclxuXHRcdFx0XHR1cmwgPSBVdGlscy5wZXJQYWdlKHVybCwgZm9ybWF0T2JqLnBlclBhZ2UpO1xyXG5cdFx0XHR1cmwgPSBVdGlscy5mb3JtYXQodXJsLCBmb3JtYXRPYmopO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBWLmNhbnZhcy5hcGkucm9vdF91cmwgKyB1cmw7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgZ2V0SlNPTjxUPih1cmw6IHN0cmluZyk6IFByb21pc2U8VD4ge1xyXG5cclxuXHRcdFV0aWxzLmNoZWNrVG9rZW4oKTtcclxuXHJcblx0XHRjb25zdCByZXNwID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcblx0XHRcdG1ldGhvZDogXCJHRVRcIixcclxuXHRcdFx0aGVhZGVyczogbmV3IEhlYWRlcnMoe1xyXG5cdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdFx0XHRcdFwiQXV0aG9yaXphdGlvblwiOiBcIkJlYXJlciBcIiArIFV0aWxzLkFDQ0VTU19UT0tFTlxyXG5cdFx0XHR9KVxyXG5cdFx0fSBhcyBSZXF1ZXN0SW5pdCk7XHJcblxyXG5cdFx0aWYgKHJlc3Auc3RhdHVzID09PSA0MDQpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiNDA0IGVycm9yIHdoZW4gZ2V0dGluZyBKU09OXCIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGlmIChyZXNwLnN0YXR1cyA9PT0gNDAwKVxyXG5cdFx0XHRcdGNvbnNvbGUuZGVidWcoXCI0MDAgZXJyb3Igd2hlbiBnZXR0aW5nIEpTT04gd2FzIE9LQVlcIik7XHJcblxyXG5cdFx0XHRsZXQganNvbiA9IGF3YWl0IHJlc3AudGV4dCgpO1xyXG5cdFx0XHRqc29uID0ganNvbi5yZXBsYWNlKFwid2hpbGUoMSk7XCIsIFwiXCIpO1xyXG5cclxuXHRcdFx0cmV0dXJuIEpTT04ucGFyc2UoanNvbik7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHB1dERhdGEodXJsLCBkYXRhOiBhbnlbXSB8IGFueSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG5cclxuXHRcdFV0aWxzLmNoZWNrVG9rZW4oKTtcclxuXHJcblx0XHRjb25zdCBib2R5RGF0YSA9IHtuczogVi5jYW52YXMuYXBpLm5hbWVzcGFjZSwgZGF0YX07XHJcblx0XHRjb25zdCBtZXRob2QgPSBkYXRhIGluc3RhbmNlb2YgQXJyYXkgJiYgZGF0YS5sZW5ndGggPiAwIHx8IGRhdGEgIT09IHVuZGVmaW5lZCA/IFwiUFVUXCIgOiBcIkRFTEVURVwiO1xyXG5cclxuXHRcdGlmIChtZXRob2QgPT09IFwiREVMRVRFXCIpXHJcblx0XHRcdGRlbGV0ZSBib2R5RGF0YS5kYXRhO1xyXG5cclxuXHRcdGNvbnN0IG9wcyA9IHtcclxuXHRcdFx0bWV0aG9kLFxyXG5cdFx0XHRoZWFkZXJzOiBuZXcgSGVhZGVycyh7XHJcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcblx0XHRcdFx0XCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIFwiICsgVXRpbHMuQUNDRVNTX1RPS0VOXHJcblx0XHRcdH0pLFxyXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShib2R5RGF0YSlcclxuXHRcdH0gYXMgUmVxdWVzdEluaXQ7XHJcblxyXG5cdFx0Y29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHVybCwgb3BzKTtcclxuXHJcblx0XHRpZiAoIXJlc3Aub2sgfHwgcmVzcC5zdGF0dXMgPT09IDQwMSkgeyAvLyA0MDEgdW5hdXRob3JpemVkXHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoYFVuYWJsZSB0byAke21ldGhvZH0gZGF0YSB0byAke3VybH0uIHJlc3A6YCwgSlNPTi5zdHJpbmdpZnkocmVzcCkpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIGVkaXREYXRhQXJyYXkodXJsOiBzdHJpbmcsIGFwcGVuZDogYm9vbGVhbiwgdmFsdWVzOiBhbnlbXSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG5cclxuXHRcdGNvbnN0IGV4aXN0aW5nRGF0YTogYW55W10gPSAoXHJcblx0XHRcdC8vIHVybCBpcyBzYW1lIGZvciBnZXQvcHV0XHJcblx0XHRcdGF3YWl0IFV0aWxzLmdldEpTT048e2RhdGE6IGFueVtdfT4odXJsKVxyXG5cdFx0KS5kYXRhIHx8IFtdO1xyXG5cclxuXHRcdGxldCBuZXdBcnJheTtcclxuXHJcblx0XHRpZiAoYXBwZW5kKSB7XHJcblx0XHRcdG5ld0FycmF5ID0gZXhpc3RpbmdEYXRhLmNvbmNhdCh2YWx1ZXMpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7IC8vIHN1YnRyYWN0IGZyb20gZGF0YSBhcnJheVxyXG5cdFx0XHRpZiAoZXhpc3RpbmdEYXRhLmxlbmd0aCA9PT0gMClcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0bmV3QXJyYXkgPSBleGlzdGluZ0RhdGEuZmlsdGVyKHZhbCA9PiAhdmFsdWVzLmluY2x1ZGVzKHZhbCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBVdGlscy5wdXREYXRhKHVybCwgbmV3QXJyYXkpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHdhaXQobXM6IG51bWJlcikge1xyXG5cdFx0YXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY2hlY2tUb2tlbigpOiB2b2lkIHwgbmV2ZXIge1xyXG5cdFx0aWYgKFV0aWxzLkFDQ0VTU19UT0tFTiA9PT0gbnVsbClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQWNjZXNzIHRva2VuIG5vdCBzZXRcIik7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgbG9hZFRva2VuKCkge1xyXG5cdFx0VXRpbHMuQUNDRVNTX1RPS0VOID0gYXdhaXQgbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG5cdFx0XHRjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChWLm1pc2MudG9rZW5fa2V5LCByZXN1bHREYXRhID0+IHtcclxuXHJcblx0XHRcdFx0Y29uc3Qgc3VjY2VzcyA9IFV0aWxzLkFDQ0VTU19UT0tFTiAhPT0gbnVsbCB8fCByZXN1bHREYXRhW1YubWlzYy50b2tlbl9rZXldO1xyXG5cdFx0XHRcdGlmIChzdWNjZXNzKSByZXNvbHZlKHJlc3VsdERhdGFbVi5taXNjLnRva2VuX2tleV0pO1xyXG5cdFx0XHRcdGVsc2UgcmVqZWN0KCk7XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhY2Nlc3NUb2tlblByb21wdCgpIHtcclxuXHRcdGNvbnN0IG9wZW5PcHRpb25zID0gY29uZmlybShcIk1pc3NpbmcgYWNjZXNzIHRva2VuLCBwcmVzcyBPSyB0byBvcGVuIGV4dGVuc2lvbiBvcHRpb25zXCIpO1xyXG5cdFx0aWYgKG9wZW5PcHRpb25zKSAvLyBUT0RPIHNlbmQgdGFiIElEIHdpdGggdGhpcyBtZXNzYWdlP1xyXG5cdFx0XHRjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShuZXcgTWVzc2FnZURhdGEoXCJvcGVuIG9wdGlvbnNcIikpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHJ1bkNiKGNhbGxiYWNrRnVuY3Rpb246ICgpID0+IHZvaWQpIHtcclxuXHRcdGlmIChjYWxsYmFja0Z1bmN0aW9uICE9PSB1bmRlZmluZWQpXHJcblx0XHRcdGNhbGxiYWNrRnVuY3Rpb24oKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBzYWZlQ2I8RiBleHRlbmRzICgoLi4uYXJncykgPT4gdm9pZCk+KGNhbGxiYWNrRnVuY3Rpb246IEYgfCB1bmRlZmluZWQpOiBGIHtcclxuXHRcdGlmIChjYWxsYmFja0Z1bmN0aW9uICE9PSB1bmRlZmluZWQpXHJcblx0XHRcdHJldHVybiBjYWxsYmFja0Z1bmN0aW9uO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gKCgpID0+IHt9KSBhcyBGOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWVtcHR5XHJcblx0fVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbHMudHMiLCJpbXBvcnQgeyBWIH0gZnJvbSBcIi4vdmFyc1wiO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgTWVzc2FnZURhdGEsIFN0YXRlTWVzc2FnZURhdGEgfSBmcm9tIFwiLi9vYmplY3RzXCI7XHJcblxyXG5kZWNsYXJlIGNvbnN0IGNvbXBvbmVudEhhbmRsZXI7XHJcbmNvbnN0IFFVRVJZID0ge2FjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZX07XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG5cclxuY29uc3QgQk9EWSA9ICQoXCJib2R5XCIpO1xyXG5jb25zdCBqdW1wQnV0dG9uID0gJChcIiNcIiArIFYuaWQucG9wdXBfanVtcF9idXR0b24pO1xyXG5jb25zdCBpbnNlcnRpb25Qb2ludCA9ICQoXCIjXCIgKyBWLmlkLnBvcHVwX2luc2VydGlvbl9wb2ludCk7XHJcblxyXG4kKFwiI1wiICsgVi5pZC5wb3B1cF9leF9uYW1lKS50ZXh0KGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkubmFtZSk7XHJcblxyXG5Qcm9taXNlLnJlc29sdmUoKVxyXG5cclxuXHQudGhlbigoKSA9PiBuZXcgUHJvbWlzZShuZXh0ID0+IHtcclxuXHJcblx0XHRjb25zdCBzdGFydFBpbmcgPSAkLm5vdygpO1xyXG5cclxuXHRcdHNlbmRNZXNzYWdlKG5ldyBNZXNzYWdlRGF0YShcInBpbmdcIiksIHJlc3AgPT4ge1xyXG5cdFx0XHRpZiAocmVzcCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJwYWdlIHBpbmdcIiwgcmVzcC5wb25nIC0gc3RhcnRQaW5nKTtcclxuXHJcblx0XHRcdFx0Qk9EWS5hZGRDbGFzcyhWLmNzc0NsYXNzLnBvcHVwX2Nvbm5lY3RlZCk7XHJcblx0XHRcdFx0bmV4dCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdEJPRFkuYWRkQ2xhc3MoVi5jc3NDbGFzcy5wb3B1cF9sb2FkZWQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0fSkpLnRoZW4oKCkgPT4gbmV3IFByb21pc2UobmV4dCA9PiB7XHJcblxyXG5cdFx0c2VuZE1lc3NhZ2UobmV3IE1lc3NhZ2VEYXRhKFwiY291bnQgdW5jaGVja2VkXCIpLCByZXNwID0+IHtcclxuXHRcdFx0aWYgKHJlc3AgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGlmIChyZXNwLmNvdW50ID09PSAwKVxyXG5cdFx0XHRcdFx0anVtcEJ1dHRvbi5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSkuYXR0cihcInRpdGxlXCIsIFYudG9vbHRpcC5wb3B1cF9ub191bmNoZWNrZWQpO1xyXG5cdFx0XHRcdG5leHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdH0pKS50aGVuKCgpID0+IG5ldyBQcm9taXNlKG5leHQgPT4ge1xyXG5cclxuXHRcdGxldCByZW1haW5pbmcgPSBPYmplY3Qua2V5cyhWLnN0YXRlKS5sZW5ndGg7XHJcblxyXG5cdFx0JC5lYWNoKFYuc3RhdGUsIChzdGF0ZU5hbWUsIHN0YXRlRGF0YSkgPT4ge1xyXG5cdFx0XHRzZW5kTWVzc2FnZShuZXcgU3RhdGVNZXNzYWdlRGF0YShcImdldFwiLCBzdGF0ZU5hbWUpLCByZXNwID0+IHtcclxuXHJcblx0XHRcdFx0Y29uc3QgZWwgPSAkKFV0aWxzLmZvcm1hdChWLmVsZW1lbnQucG9wdXBfc3RhdGVfc3dpdGNoLCB7bmFtZTogc3RhdGVOYW1lLCBkZXNjOiBzdGF0ZURhdGEuZGVzY30pKTtcclxuXHJcblx0XHRcdFx0ZWwuaW5zZXJ0QWZ0ZXIoaW5zZXJ0aW9uUG9pbnQpO1xyXG5cdFx0XHRcdGNvbXBvbmVudEhhbmRsZXIudXBncmFkZUVsZW1lbnQoZWwuZmluZChcImxhYmVsXCIpLmdldCgwKSk7XHJcblxyXG5cdFx0XHRcdGNvbnN0IGlucHV0RWwgPSBlbC5maW5kKFwiaW5wdXRcIikuZ2V0KDApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG5cdFx0XHRcdGVsLmNoYW5nZSgoKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCBuZXdTdGF0ZSA9IGlucHV0RWwuY2hlY2tlZDtcclxuXHJcblx0XHRcdFx0XHRzZXRNZGxDaGVja2VkKGlucHV0RWwsICFuZXdTdGF0ZSk7XHJcblx0XHRcdFx0XHRpbnB1dEVsLnRpdGxlID0gVi50b29sdGlwLndhaXRpbmc7XHJcblx0XHRcdFx0XHRpbnB1dEVsLmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0XHRzZW5kTWVzc2FnZShuZXcgU3RhdGVNZXNzYWdlRGF0YShcInNldFwiLCBzdGF0ZU5hbWUsIG5ld1N0YXRlKSwgc3VjY2VzcyA9PiB7XHJcblx0XHRcdFx0XHRcdGlmIChzdWNjZXNzKSB7XHJcblx0XHRcdFx0XHRcdFx0c2V0TWRsQ2hlY2tlZChpbnB1dEVsLCBuZXdTdGF0ZSk7XHJcblx0XHRcdFx0XHRcdFx0aW5wdXRFbC50aXRsZSA9IFwiXCI7IC8vIFRPRE8gc3RhdGUubG9uZ19kZXNjID9cclxuXHRcdFx0XHRcdFx0XHRpbnB1dEVsLmRpc2FibGVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRzZXRNZGxDaGVja2VkKGlucHV0RWwsIHJlc3Auc3RhdGUpO1xyXG5cclxuXHRcdFx0XHRpZiAoLS1yZW1haW5pbmcgPT09IDApIG5leHQoKTtcclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0anVtcEJ1dHRvbi5jbGljaygoKSA9PiB7XHJcblx0XHRcdHNlbmRNZXNzYWdlKG5ldyBNZXNzYWdlRGF0YShcImp1bXAgdG8gZmlyc3QgdW5jaGVja2VkXCIpLCByZXNwID0+IHdpbmRvdy5jbG9zZSgpKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9KSkudGhlbigoKSA9PiBuZXcgUHJvbWlzZShuZXh0ID0+IHtcclxuXHJcblx0XHRpbnNlcnRpb25Qb2ludC5yZW1vdmUoKTtcclxuXHRcdEJPRFkuYWRkQ2xhc3MoVi5jc3NDbGFzcy5wb3B1cF9sb2FkZWQpO1xyXG5cdFx0bmV4dCgpO1xyXG5cclxuXHR9KSk7XHJcblxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKGRhdGE6IE1lc3NhZ2VEYXRhLCBjYWxsYmFjaz86IChyZXNwb25zZTogYW55KSA9PiB2b2lkKSB7XHJcblx0Y2hyb21lLnRhYnMucXVlcnkoUVVFUlksIHRhYnMgPT4gY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFic1swXS5pZCwgZGF0YSwgY2FsbGJhY2spKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0TWRsQ2hlY2tlZChjaGVja2JveDogSFRNTElucHV0RWxlbWVudCwgY2hlY2tlZDogYm9vbGVhbikge1xyXG5cdCQoY2hlY2tib3gpXHJcblx0XHQucHJvcChcImNoZWNrZWRcIiwgY2hlY2tlZClcclxuXHRcdC5wYXJlbnQoKVxyXG5cdFx0LnRvZ2dsZUNsYXNzKFwiaXMtY2hlY2tlZFwiLCBjaGVja2VkKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcG9wdXAudHMiXSwic291cmNlUm9vdCI6IiJ9