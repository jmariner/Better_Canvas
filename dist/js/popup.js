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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTM4MDY0NzU2MmY1MDU3NTM4ZjAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZhcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL29iamVjdHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDM0RBO0lBbUdDO1FBakdBLFdBQU0sR0FBRyxjQUFjLENBQUM7UUFFeEIsYUFBUSxHQUFHO1lBQ1YsTUFBTSxFQUFFLFFBQVE7WUFDaEIsZUFBZSxFQUFFLGlCQUFpQjtZQUNsQyxnQkFBZ0IsRUFBRSxrQkFBa0I7WUFDcEMsV0FBVyxFQUFFLGFBQWE7WUFDMUIsS0FBSyxFQUFFLFlBQVk7WUFDbkIsZ0JBQWdCLEVBQUUsa0JBQWtCO1lBQ3BDLFdBQVcsRUFBRSxRQUFRO1lBQ3JCLFdBQVcsRUFBRSxVQUFVO1lBQ3ZCLGFBQWEsRUFBRSxlQUFlO1lBQzlCLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLEtBQUssRUFBRSxPQUFPO1lBQ2QsU0FBUyxFQUFFLGNBQWM7WUFDekIsUUFBUSxFQUFFLGNBQWM7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YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5MzgwNjQ3NTYyZjUwNTc1MzhmMCIsImltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5cclxuY2xhc3MgU2Fzc1ZhcnMge1xyXG5cclxuXHRwcmVmaXggPSBcImJldHRlckNhbnZhc1wiO1xyXG5cclxuXHRjc3NDbGFzcyA9IHtcclxuXHRcdGFjdGl2ZTogXCJhY3RpdmVcIixcclxuXHRcdGNoZWNrYm94X3BhcmVudDogXCJjaGVja2JveC1wYXJlbnRcIixcclxuXHRcdGNoZWNrYm94X2NoZWNrZWQ6IFwiY2hlY2tib3gtY2hlY2tlZFwiLFxyXG5cdFx0Y2hlY2tib3hfdGQ6IFwiY2hlY2tib3gtdGRcIixcclxuXHRcdGZsYXNoOiBcImFuaW0tZmxhc2hcIixcclxuXHRcdGNvdXJzZV9saW5rX3RleHQ6IFwiY291cnNlLWxpbmstdGV4dFwiLFxyXG5cdFx0aXRlbV9oaWRkZW46IFwiaGlkZGVuXCIsXHJcblx0XHRoaWRlX2J1dHRvbjogXCJidG4taGlkZVwiLFxyXG5cdFx0aGlkZV9kaXNhYmxlZDogXCJoaWRlLWRpc2FibGVkXCIsXHJcblx0XHR0b2NfcmF0aW86IFwidG9jLXJhdGlvXCIsXHJcblx0XHR0b2NfdGl0bGU6IFwidG9jLXRpdGxlXCIsXHJcblx0XHRmaXhlZDogXCJmaXhlZFwiLFxyXG5cdFx0aXRlbV9pY29uOiBcImljb24td3JhcHBlclwiLFxyXG5cdFx0ZG93bmxvYWQ6IFwiZG93bmxvYWQtYnRuXCIsXHJcblx0XHRleHRlcm5hbF91cmw6IFwidXJsLWJ0blwiLFxyXG5cclxuXHRcdHBvcHVwX2xvYWRlZDogXCJkb25lLWxvYWRpbmdcIixcclxuXHRcdHBvcHVwX2Nvbm5lY3RlZDogXCJwYWdlLWNvbm5lY3RlZFwiLFxyXG5cdFx0cG9wdXBfcmVxdWlyZV9wYWdlOiBcInJlcXVpcmUtcGFnZVwiXHJcblx0fTtcclxuXHJcblx0ZGF0YUF0dHIgPSB7XHJcblx0XHR0b2NfbW9kdWxlX2lkOiBcInRvYy1tb2R1bGUtaWRcIixcclxuXHRcdHRvY190b3RhbDogXCJ0b2MtdG90YWxcIixcclxuXHRcdHRvY19jaGVja2VkX2NvdW50OiBcInRvYy1jaGVja2VkLWNvdW50XCIsXHJcblx0XHR0b2NfcGVyY2VudGFnZTogXCJ0b2MtcGVyY2VudGFnZVwiLFxyXG5cdFx0bW9kX2l0ZW1faWQ6IFwiaXRlbS1pZFwiLFxyXG5cdFx0Y291cnNlX25hbWU6IFwiY291cnNlLW5hbWVcIixcclxuXHRcdGNvdXJzZV9jb2RlOiBcImNvdXJzZS1jb2RlXCIsXHJcblx0XHRkZWZfaW5kZW50OiBcImRlZmF1bHQtaW5kZW50XCJcclxuXHR9O1xyXG5cclxuXHRpZCA9IHtcclxuXHRcdHRvYzogXCJ0b2NcIixcclxuXHRcdGp1bXBfYnV0dG9uOiBcImp1bXAtdG8tdG9wXCIsXHJcblxyXG5cdFx0cG9wdXBfcGFnZV9taXNzaW5nOiBcInBhZ2UtbWlzc2luZy1lcnJvclwiLFxyXG5cdFx0cG9wdXBfZXhfbmFtZTogXCJleHRlbnNpb24tbmFtZVwiLFxyXG5cdFx0cG9wdXBfaW5zZXJ0aW9uX3BvaW50OiBcImluc2VydGlvbi1wb2ludFwiLFxyXG5cdFx0cG9wdXBfanVtcF9idXR0b246IFwianVtcC10b1wiXHJcblx0fTtcclxuXHJcblx0Y29sb3IgPSB7XHJcblx0XHR0b2NfZmlsbDogXCJyZ2JhKDAsIDI1NSwgMCwgLjc1KVwiLFxyXG5cdFx0dG9jX2JvcmRlcjogXCJyZ2IoMTAyLCAxMjAsIDEzNSlcIixcclxuXHRcdHRvY190aXRsZTogXCJ2YXIoLS1pYy1icmFuZC1wcmltYXJ5KVwiLCAvLyB3YXMgXCJyZ2IoNTcsIDc1LCA4OClcIixcclxuXHRcdGNoZWNrYm94X2NoZWNrOiBcInJnYigyMiwgMTYwLCAxMzMpXCIsXHJcblx0XHRjaGVja2JveF9ib3JkZXI6IFwicmdiKDEwMiwgMTIwLCAxMzUpXCIsXHJcblx0XHRoaWdobGlnaHRfb3JhbmdlOiBcInJnYigyNTUsIDE1MiwgMClcIixcclxuXHRcdGhpZ2hsaWdodF9yZWQ6IFwicmdiKDI1NSwgMCwgMClcIixcclxuXHRcdGp1bXBfYnV0dG9uOiBcInJnYig1NywgNzUsIDg4KVwiXHJcblx0fTtcclxuXHJcblx0dWkgPSB7XHJcblx0XHR0b3BfaW5zaWRlX3JhdGlvOiAwLjA1LFxyXG5cdFx0c2Nyb2xsX3RvcF9vZmZzZXQ6IDUsXHJcblx0XHRqdW1wX3RvcF9jdXRvZmY6IDEwMCxcclxuXHRcdHRvY190b3BfbWFyZ2luOiAzMixcclxuXHRcdHNjcm9sbF90aW1lOiA1MDAsXHJcblx0XHRmYWRlX3RpbWU6IDUwMCxcclxuXHRcdHN1YmhlYWRlcl9pbmRlbnQ6IDAsXHJcblx0XHRtYWluX2luZGVudDogMVxyXG5cdH07XHJcblxyXG5cdHN0YXRlID0ge1xyXG5cdFx0c2hvd19oaWRkZW46IHtcclxuXHRcdFx0Y3NzQ2xhc3M6IFwic2hvdy1oaWRkZW5cIixcclxuXHRcdFx0cGFnZXM6IFtcIm1vZHVsZXNcIl0sXHJcblx0XHRcdGRlc2M6IFwiU2hvdyBoaWRkZW4gaXRlbXNcIlxyXG5cdFx0fSxcclxuXHRcdGhpZGVfY2hlY2tlZDoge1xyXG5cdFx0XHRjc3NDbGFzczogXCJoaWRlLWNoZWNrZWRcIixcclxuXHRcdFx0cGFnZXM6IFtcIm1vZHVsZXNcIiwgXCJncmFkZXNcIl0sXHJcblx0XHRcdGRlc2M6IFwiSGlkZSBjb21wbGV0ZWQgaXRlbXNcIlxyXG5cdFx0fSxcclxuXHRcdGhpZ2hsaWdodF91bmNoZWNrZWQ6IHtcclxuXHRcdFx0Y3NzQ2xhc3M6IFwibWFyay11bmNoZWNrZWRcIixcclxuXHRcdFx0cGFnZXM6IFtcIm1vZHVsZXNcIiwgXCJncmFkZXNcIl0sXHJcblx0XHRcdGRlc2M6IFwiTWFyayB1bmNoZWNrZWQgaXRlbXNcIlxyXG5cdFx0fSxcclxuXHRcdGRpc2FibGVfaW5kZW50X292ZXJyaWRlOiB7XHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIkRpc2FibGUgaW5kZW50IG92ZXJyaWRlc1wiXHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0c2Fzc0pzb246IHN0cmluZztcclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgbWV0YSA9IHtcclxuXHRcdGRhdGFQcmVmaXhUeXBlOiBcImRhdGFBdHRyXCIsXHJcblx0XHRwcmVmaXhUeXBlczogW1wiY3NzQ2xhc3NcIiwgXCJkYXRhQXR0clwiLCBcImlkXCJdLFxyXG5cdFx0cHJlZml4RXhjbHVkZTogW1wicG9wdXBfLitcIl1cclxuXHR9O1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHRjb25zdCB0eXBlcyA9IG5ldyBTZXQoU2Fzc1ZhcnMubWV0YS5wcmVmaXhUeXBlcyk7XHJcblxyXG5cdFx0Y29uc3QgcHJvY2Vzc09iamVjdCA9IChvYmo6IG9iamVjdCwgb2JqTmFtZTogc3RyaW5nKSA9PiB7XHJcblxyXG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuXHRcdFx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0bGV0IHZhbDogb2JqZWN0IHwgc3RyaW5nIHwgbnVtYmVyID0gb2JqW2tleV07XHJcblxyXG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKSB7XHJcblxyXG5cdFx0XHRcdFx0cHJvY2Vzc09iamVjdCh2YWwsIGtleSk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XHJcblxyXG5cdFx0XHRcdFx0Y29uc3QgZXhjbHVkZWQgPSBTYXNzVmFycy5tZXRhLnByZWZpeEV4Y2x1ZGVcclxuXHRcdFx0XHRcdFx0Lm1hcChzdHIgPT4gbmV3IFJlZ0V4cChcIl5cIiArIHN0ciArIFwiJFwiKSlcclxuXHRcdFx0XHRcdFx0LnNvbWUocmVnZXggPT4gcmVnZXgudGVzdChrZXkpKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIWV4Y2x1ZGVkICYmICh0eXBlcy5oYXMob2JqTmFtZSkgfHwgdHlwZXMuaGFzKGtleSkpKVxyXG5cdFx0XHRcdFx0XHR2YWwgPSB0aGlzLnByZWZpeCArIFwiLVwiICsgdmFsO1xyXG5cclxuXHRcdFx0XHRcdGlmIChvYmpOYW1lID09PSBTYXNzVmFycy5tZXRhLmRhdGFQcmVmaXhUeXBlKVxyXG5cdFx0XHRcdFx0XHR2YWwgPSBcImRhdGEtXCIgKyB2YWw7XHJcblxyXG5cdFx0XHRcdFx0b2JqW2tleV0gPSB2YWw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHRwcm9jZXNzT2JqZWN0KHRoaXMsIFwicm9vdFwiKTtcclxuXHJcblx0XHR0aGlzLnNhc3NKc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcyk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuY2xhc3MgVmFycyBleHRlbmRzIFNhc3NWYXJzIHtcclxuXHJcblx0dG9vbHRpcCA9IHtcclxuXHRcdG1hcmtfY29tcGxldGU6IFwiTWFyayBhcyBjb21wbGV0ZWRcIixcclxuXHRcdG1hcmtfaW5jb21wbGV0ZTogXCJNYXJrIGFzIGluY29tcGxldGVcIixcclxuXHRcdGhpZGU6IFwiSGlkZSB0aGlzIGl0ZW1cIixcclxuXHRcdHVuaGlkZTogXCJVbmhpZGUgdGhpcyBpdGVtXCIsXHJcblx0XHRoaWRlX2Rpc2FibGVkOiBcIkNhbm5vdCBoaWRlIGdyYWRlZCBpdGVtXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJKdW1wIHRvIHRvcFwiLFxyXG5cdFx0d2FpdGluZzogXCJXYWl0aW5nLi4uXCIsXHJcblx0XHRkb3dubG9hZDogXCJEb3dubG9hZCBmaWxlOiBcXFwie2ZpbGVuYW1lfVxcXCJcIixcclxuXHRcdGV4dGVybmFsX3VybDogXCJWaXNpdCBleHRlcm5hbCBVUkxcIixcclxuXHRcdGhhc19zdWJtaXNzaW9uOiBcIkFzc2lnbm1lbnQgaGFzIHN1Ym1pc3Npb25cIixcclxuXHRcdHBvcHVwX25vX3VuY2hlY2tlZDogXCJObyB1bmNoZWNrZWQgaXRlbXMgdG8ganVtcCB0b1wiXHJcblx0fTtcclxuXHJcblx0bWlzYyA9IHtcclxuXHRcdHRvY19iYWNrZ3JvdW5kOiBgLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCwgJHt0aGlzLmNvbG9yLnRvY19maWxsfSB7cGVyY2VudH0lLCB0cmFuc3BhcmVudCB7cGVyY2VudH0lKWAsXHJcblx0XHR0b2tlbl9rZXk6IFwiYWNjZXNzVG9rZW5cIlxyXG5cdH07XHJcblxyXG5cdGVsZW1lbnQgPSB7XHJcblxyXG5cdFx0Y2hlY2tib3g6XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5jaGVja2JveF9wYXJlbnR9Jz5cclxuXHRcdFx0XHRcdDxpbnB1dCB0eXBlPSdjaGVja2JveCcgJHt0aGlzLmRhdGFBdHRyLm1vZF9pdGVtX2lkfT0ne2l0ZW1faWR9Jz5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGRvd25sb2FkX2J1dHRvbjpcclxuXHRcdFx0XHRgPGRpdiBzdHlsZT0nZGlzcGxheTpub25lJyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLmRvd25sb2FkfScgdGl0bGU9JyR7dGhpcy50b29sdGlwLmRvd25sb2FkfSc+XHJcblx0XHRcdFx0XHQ8YSBocmVmPVwie2ZpbGVfdXJsfVwiPjwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHVybF9idXR0b246XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5leHRlcm5hbF91cmx9JyB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuZXh0ZXJuYWxfdXJsfSc+XHJcblx0XHRcdFx0XHQ8YSBocmVmPVwie2V4dGVybmFsX3VybH1cIiBjbGFzcz1cIm5vdF9leHRlcm5hbFwiIHRhcmdldD1cIl9ibGFua1wiPjwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGhpZGVfYnV0dG9uOlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuaGlkZV9idXR0b259Jz5cclxuXHRcdFx0XHRcdDxpICR7dGhpcy5kYXRhQXR0ci5tb2RfaXRlbV9pZH09J3tpdGVtX2lkfSc+PC9pPlxyXG5cdFx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0Y291cnNlX2xpbms6XHJcblx0XHRcdGA8bGkgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHt0YWJDb2xvcn0nIGNsYXNzPSdtZW51LWl0ZW0gaWMtYXBwLWhlYWRlcl9fbWVudS1saXN0LWl0ZW0nPlxyXG5cdFx0XHRcdDxhIGhyZWY9Jy9jb3Vyc2VzL3t0YWJJRH0vbW9kdWxlcycgY2xhc3M9J2ljLWFwcC1oZWFkZXJfX21lbnUtbGlzdC1saW5rJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9J21lbnUtaXRlbS1pY29uLWNvbnRhaW5lcicgYXJpYS1oaWRkZW49J3RydWUnPjxpPjwvaT48L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHt0YWJDb2xvcn07IGJvcmRlci1yaWdodC1jb2xvcjoge3RhYkNvbG9yfSdcclxuXHRcdFx0XHRcdFx0XHQke3RoaXMuZGF0YUF0dHIuY291cnNlX25hbWV9PSd7bmFtZX0nICR7dGhpcy5kYXRhQXR0ci5jb3Vyc2VfY29kZX09J3tjb2RlfSdcclxuXHRcdFx0XHRcdFx0XHRjbGFzcz0nbWVudS1pdGVtX190ZXh0ICR7dGhpcy5jc3NDbGFzcy5jb3Vyc2VfbGlua190ZXh0fSc+PC9kaXY+XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHQ8L2xpPmAsXHJcblxyXG5cdFx0dG9jOlxyXG5cdFx0XHRgPGRpdiBpZD0nJHt0aGlzLmlkLnRvY30nIGNsYXNzPSdpYy1hcHAtY291cnNlLW1lbnUgbGlzdC12aWV3Jz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPScke3RoaXMuY3NzQ2xhc3MudG9jX3RpdGxlfSc+VGFibGUgb2YgQ29udGVudHM8L2Rpdj5cclxuXHRcdFx0XHQ8bmF2Pjx1bD48L3VsPjwvbmF2PlxyXG5cdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHRvY19pdGVtOlxyXG5cdFx0XHRgPGxpPlxyXG5cdFx0XHRcdDxhIGhyZWY9JyMnIHRpdGxlPSd7aXRlbV9uYW1lfSc+XHJcblx0XHRcdFx0XHR7aXRlbV9uYW1lfVxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLnRvY19yYXRpb30nICR7dGhpcy5kYXRhQXR0ci50b2NfbW9kdWxlX2lkfT0ne2l0ZW1faWR9Jz48L2Rpdj5cclxuXHRcdFx0XHQ8L2E+XHJcblx0XHRcdDwvbGk+YCxcclxuXHJcblx0XHRqdW1wX2J1dHRvbjpcclxuXHRcdFx0YDxkaXYgaWQ9JyR7dGhpcy5pZC5qdW1wX2J1dHRvbn0nPlxyXG5cdFx0XHRcdDxpIHRpdGxlPScke3RoaXMudG9vbHRpcC5qdW1wX2J1dHRvbn0nPjwvaT5cclxuXHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRzdWJtaXNzaW9uX2ljb246XHJcblx0XHRcdGA8ZGl2IHRpdGxlPScke3RoaXMudG9vbHRpcC5oYXNfc3VibWlzc2lvbn0nIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuaXRlbV9pY29ufSc+XHJcblx0XHRcdFx0PGkgY2xhc3M9J2ljb24tcHVibGlzaCc+PC9pPlxyXG5cdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHBvcHVwX3N0YXRlX3N3aXRjaDpcclxuXHRcdFx0YDxkaXYgY2xhc3M9XCJzd2l0Y2ggJHt0aGlzLmNzc0NsYXNzLnBvcHVwX3JlcXVpcmVfcGFnZX1cIj5cclxuXHRcdFx0XHQ8bGFiZWwgZm9yPVwie25hbWV9XCIgY2xhc3M9XCJtZGwtc3dpdGNoIG1kbC1qcy1zd2l0Y2ggbWRsLWpzLXJpcHBsZS1lZmZlY3RcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwibWRsLXN3aXRjaF9fbGFiZWxcIj57ZGVzY308L3NwYW4+XHJcblx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJ7bmFtZX1cIiB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cIm1kbC1zd2l0Y2hfX2lucHV0XCI+XHJcblx0XHRcdFx0PC9sYWJlbD5cclxuXHRcdFx0PC9kaXY+YFxyXG5cdH07XHJcblxyXG5cdC8vIHNlcGFyYXRlZCBmb3IgdXNlIGluIHRlbXBsYXRlIHN0cmluZ3MgYmVsb3dcclxuXHRwcml2YXRlIF9jYW52YXNOYW1lc3BhY2UgPSBgY29tLmptYXJpbmVyLiR7dGhpcy5wcmVmaXh9YDtcclxuXHJcblx0Y2FudmFzID0ge1xyXG5cdFx0c2VsZWN0b3I6IHtcclxuXHRcdFx0bW9kdWxlOiBcImRpdi5jb250ZXh0X21vZHVsZVwiLFxyXG5cdFx0XHRtb2R1bGVfaXRlbTogXCJsaS5jb250ZXh0X21vZHVsZV9pdGVtXCIsXHJcblx0XHRcdG1vZHVsZV9pdGVtczogXCJ1bC5jb250ZXh0X21vZHVsZV9pdGVtc1wiLFxyXG5cdFx0XHRzdWJoZWFkZXI6IFwibGkuY29udGV4dF9tb2R1bGVfc3ViX2hlYWRlclwiLFxyXG5cdFx0XHRub3Rfc3ViaGVhZGVyOiBcImxpLmNvbnRleHRfbW9kdWxlX2l0ZW06bm90KC5jb250ZXh0X21vZHVsZV9zdWJfaGVhZGVyKVwiLFxyXG5cdFx0XHRuYXZfdGFiczogXCJ1bCNzZWN0aW9uLXRhYnNcIlxyXG5cdFx0fSxcclxuXHRcdGFwaToge1xyXG5cdFx0XHRuYW1lc3BhY2U6IHRoaXMuX2NhbnZhc05hbWVzcGFjZSxcclxuXHRcdFx0cm9vdF91cmw6IFwiL2FwaS92MS9cIixcclxuXHRcdFx0cGVyX3BhZ2U6IDEwMCxcclxuXHRcdFx0dXJsczoge1xyXG5cdFx0XHRcdGN1c3RvbV9kYXRhOiBgdXNlcnMvc2VsZi9jdXN0b21fZGF0YXtkYXRhUGF0aH0/bnM9JHt0aGlzLl9jYW52YXNOYW1lc3BhY2V9YCxcclxuXHRcdFx0XHRmYXZvcml0ZV9jb3Vyc2VzOiBcInVzZXJzL3NlbGYvZmF2b3JpdGVzL2NvdXJzZXNcIixcclxuXHRcdFx0XHRjdXN0b21fY29sb3JzOiBcInVzZXJzL3NlbGYvY29sb3JzXCIsXHJcblx0XHRcdFx0YXNzaWdubWVudHM6IFwidXNlcnMvc2VsZi9jb3Vyc2VzL3tjb3Vyc2VJRH0vYXNzaWdubWVudHNcIixcclxuXHRcdFx0XHRtb2R1bGVzOiBcImNvdXJzZXMve2NvdXJzZUlEfS9tb2R1bGVzXCIsXHJcblx0XHRcdFx0bW9kdWxlX2l0ZW1zOiBcImNvdXJzZXMve2NvdXJzZUlEfS9tb2R1bGVzL3ttb2R1bGVJRH0vaXRlbXNcIixcclxuXHRcdFx0XHRmaWxlX2RpcmVjdDogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vZmlsZXMve2ZpbGVJRH1cIixcclxuXHRcdFx0XHRuYXZpZ2F0aW9uX3RhYnM6IFwiY291cnNlcy97Y291cnNlSUR9L3RhYnNcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRkYXRhX3VybHM6IHtcclxuXHRcdFx0XHRhY3RpdmVfc3RhdGVzOiBcImFjdGl2ZV9zdGF0ZXNcIixcclxuXHRcdFx0XHRjb21wbGV0ZWRfYXNzaWdubWVudHM6IFwiY29tcGxldGVkX2Fzc2lnbm1lbnRzXCIsXHJcblx0XHRcdFx0aGlkZGVuX2Fzc2lnbm1lbnRzOiBcImhpZGRlbl9hc3NpZ25tZW50c1wiLFxyXG5cdFx0XHRcdHRhYl9wb3NpdGlvbnM6IFwidGFiX3Bvc2l0aW9uc1wiXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5jb25zdCBWQVJTID0gbmV3IFZhcnMoKTtcclxuZXhwb3J0IGNvbnN0IFYgPSBWQVJTO1xyXG5leHBvcnQgZGVmYXVsdCBWQVJTLnNhc3NKc29uO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdmFycy50cyIsImltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgKiBhcyBDYW52YXNBUEkgZnJvbSBcIi4vY2FudmFzX2FwaVwiO1xyXG5cclxuY2xhc3MgRGF0YSB7XHJcblx0Y291cnNlUGFnZTogQ2FudmFzUGFnZTtcclxuXHRjb3Vyc2VJRDogbnVtYmVyO1xyXG5cdG1vZHVsZXM6IE1hcDxudW1iZXIsIE1vZHVsZT47IC8vIG1vZHVsZSBpZCA9PiBhcnJheSBvZiBNb2R1bGVJdGVtXHJcblx0bW9kdWxlSXRlbXM6IE1hcDxudW1iZXIsIE1vZHVsZUl0ZW0+OyAvLyBtb2R1bGUgaXRlbSBpZCA9PiBNb2R1bGVJdGVtXHJcblx0c3RhdGVzOiBNYXA8c3RyaW5nLCBTdGF0ZT47IC8vIHN0YXRlTmFtZSA9PiBTdGF0ZVxyXG5cdGNvdXJzZVRhYnM6IE1hcDxudW1iZXIsIEN1c3RvbUNvdXJzZVRhYj47IC8vIGNvdXJzZSBpZCA9PiBjb3Vyc2UgdGFiXHJcblx0bmF2VGFiczogTWFwPHN0cmluZywgTmF2VGFiPjsgLy8gdGFiIGlkIHN0cmluZyA9PiB0YWJcclxuXHRvbk1haW5QYWdlOiBib29sZWFuO1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRleHRlbnNpb25JZDogc3RyaW5nO1xyXG5cdGVsZW1lbnRzOiB7anVtcF9idXR0b246IEpRdWVyeSwgdG9jOiBKUXVlcnl9O1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMubW9kdWxlcyA9IG5ldyBNYXAoKTtcclxuXHRcdHRoaXMubW9kdWxlSXRlbXMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLnN0YXRlcyA9IG5ldyBNYXAoKTtcclxuXHRcdHRoaXMuY291cnNlVGFicyA9IG5ldyBNYXAoKTtcclxuXHRcdHRoaXMubmF2VGFicyA9IG5ldyBNYXAoKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnRzID0ge2p1bXBfYnV0dG9uOiBudWxsLCB0b2M6IG51bGx9O1xyXG5cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFBhZ2Uge1xyXG5cclxuXHRib2R5OiBKUXVlcnk7XHJcblx0c2Nyb2xsaW5nRWxlbWVudDogSlF1ZXJ5O1xyXG5cdG1haW4/OiBKUXVlcnk7XHJcblx0Y29udGVudD86IEpRdWVyeTtcclxuXHRsZWZ0PzogSlF1ZXJ5O1xyXG5cdHNpZGViYXI6IEpRdWVyeTtcclxuXHRncmFkZXM/OiBKUXVlcnk7XHJcblxyXG5cdGluaXRpYWxpemUoKSB7XHJcblxyXG5cdFx0dGhpcy5ib2R5ID0gJChcImJvZHlcIik7XHJcblx0XHR0aGlzLnNjcm9sbGluZ0VsZW1lbnQgPSAkKGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQgfHwgZG9jdW1lbnQuYm9keSk7XHJcblx0XHR0aGlzLnNpZGViYXIgPSAkKFwiI21lbnVcIik7XHJcblx0XHR0aGlzLm1haW4gPSAkKFwiI21haW5cIik7XHJcblxyXG5cdFx0aWYgKERBVEEub25NYWluUGFnZSkge1xyXG5cdFx0XHR0aGlzLmNvbnRlbnQgPSAkKFwiI2NvbnRlbnRcIik7XHJcblx0XHRcdHRoaXMubGVmdCA9ICQoXCIjbGVmdC1zaWRlXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChEQVRBLmNvdXJzZVBhZ2UgPT09IENhbnZhc1BhZ2UuR1JBREVTKVxyXG5cdFx0XHR0aGlzLmdyYWRlcyA9ICQoXCIjZ3JhZGVzX3N1bW1hcnlcIik7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tQ291cnNlVGFiIHtcclxuXHRyZWFkb25seSBpZDogbnVtYmVyO1xyXG5cdHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuXHRyZWFkb25seSBjb2RlOiBzdHJpbmc7XHJcblx0cmVhZG9ubHkgY29sb3I6IHN0cmluZztcclxuXHJcblx0Y29uc3RydWN0b3IoY291cnNlRGF0YTogQ2FudmFzQVBJLkNvdXJzZSwgY29sb3I6IHN0cmluZykge1xyXG5cdFx0dGhpcy5pZCA9IGNvdXJzZURhdGEuaWQ7XHJcblx0XHR0aGlzLm5hbWUgPSBjb3Vyc2VEYXRhLm5hbWU7XHJcblx0XHR0aGlzLmNvZGUgPSBjb3Vyc2VEYXRhLmNvdXJzZV9jb2RlO1xyXG5cdFx0dGhpcy5jb2xvciA9IGNvbG9yO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOYXZUYWIge1xyXG5cdHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcblx0cHJpdmF0ZSByZWFkb25seSBpbml0UG9zaXRpb246IG51bWJlcjtcclxuXHRwcml2YXRlIF9wb3NpdGlvbjogbnVtYmVyO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0YWJEYXRhOiBDYW52YXNBUEkuVGFiKSB7XHJcblx0XHR0aGlzLmlkID0gdGFiRGF0YS5pZDtcclxuXHRcdHRoaXMuX3Bvc2l0aW9uID0gbnVsbDtcclxuXHRcdHRoaXMuaW5pdFBvc2l0aW9uID0gdGFiRGF0YS5wb3NpdGlvbjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRQb3NpdGlvbihwb3MpIHtcclxuXHRcdHRoaXMuX3Bvc2l0aW9uID0gcG9zO1xyXG5cdH1cclxuXHJcblx0Z2V0IGhhc0N1c3RvbVBvc2l0aW9uKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9uICE9IG51bGw7XHJcblx0fVxyXG5cclxuXHRnZXQgcG9zaXRpb24oKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbiA9PSBudWxsID8gdGhpcy5pbml0UG9zaXRpb24gOiB0aGlzLl9wb3NpdGlvbiA9PT0gLTEgPyBudWxsIDogdGhpcy5fcG9zaXRpb247XHJcblx0fVxyXG5cclxuXHRnZXQgaGlkZGVuKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9uID09PSAtMTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZSB7XHJcblx0cHJpdmF0ZSBuYW1lOiBzdHJpbmc7XHJcblxyXG5cdHJlYWRvbmx5IGJvZHlDbGFzczogc3RyaW5nO1xyXG5cdHJlYWRvbmx5IG9uUGFnZXM6IENhbnZhc1BhZ2VbXTtcclxuXHJcblx0cHVibGljIGFjdGl2ZTogYm9vbGVhbjtcclxuXHRwdWJsaWMgb25FbmFibGU6ICgpID0+IHZvaWQ7XHJcblx0cHVibGljIG9uRGlzYWJsZTogKCkgPT4gdm9pZDtcclxuXHJcblx0Y29uc3RydWN0b3Ioa2V5LCBzdGF0ZURhdGEsIGFjdGl2ZSkge1xyXG5cdFx0dGhpcy5uYW1lID0ga2V5O1xyXG5cdFx0dGhpcy5ib2R5Q2xhc3MgPSBzdGF0ZURhdGEuY3NzQ2xhc3M7XHJcblx0XHR0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcclxuXHRcdHRoaXMub25QYWdlcyA9IFtdO1xyXG5cclxuXHRcdHN0YXRlRGF0YS5wYWdlcy5mb3JFYWNoKChwYWdlOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0Y29uc3QgX3BhZ2UgPSBDYW52YXNQYWdlW3BhZ2UudG9VcHBlckNhc2UoKV07XHJcblx0XHRcdGlmIChfcGFnZSAhPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdHRoaXMub25QYWdlcy5wdXNoKF9wYWdlKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0b25DaGFuZ2UobmV3U3RhdGU6IGJvb2xlYW4pIHtcclxuXHRcdGlmIChuZXdTdGF0ZSAmJiB0aGlzLm9uRW5hYmxlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHRoaXMub25FbmFibGUoKTtcclxuXHRcdGVsc2UgaWYgKHRoaXMub25EaXNhYmxlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHRoaXMub25EaXNhYmxlKCk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vZHVsZSB7XHJcblx0cmVhZG9ubHkgbmFtZTogc3RyaW5nO1xyXG5cdHJlYWRvbmx5IGlkOiBudW1iZXI7XHJcblx0cmVhZG9ubHkgaXRlbUNvdW50OiBudW1iZXI7XHJcblx0cmVhZG9ubHkgaXRlbXM6IE1vZHVsZUl0ZW1bXTtcclxuXHJcblx0Y29uc3RydWN0b3IobW9kdWxlSnNvbjogQ2FudmFzQVBJLk1vZHVsZSkge1xyXG5cdFx0dGhpcy5uYW1lID0gbW9kdWxlSnNvbi5uYW1lO1xyXG5cdFx0dGhpcy5pZCA9IG1vZHVsZUpzb24uaWQ7XHJcblx0XHR0aGlzLml0ZW1Db3VudCA9IG1vZHVsZUpzb24uaXRlbXNfY291bnQ7XHJcblx0XHR0aGlzLml0ZW1zID0gW107XHJcblx0fVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vZHVsZUl0ZW0ge1xyXG5cdHByaXZhdGUgX2lkOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xyXG5cdHByaXZhdGUgbW9kdWxlSWQ6IG51bWJlcjtcclxuXHRwcml2YXRlIF90eXBlOiBNb2R1bGVJdGVtVHlwZTtcclxuXHRwcml2YXRlIGFzc2lnbm1lbnRJZDogbnVtYmVyO1xyXG5cdHByaXZhdGUgX2NvbnRlbnRJZDogbnVtYmVyO1xyXG5cdHByaXZhdGUgX2ZpbGVEYXRhOiBDYW52YXNBUEkuRmlsZTtcclxuXHRwcml2YXRlIF9leHRlcm5hbFVybDogc3RyaW5nO1xyXG5cclxuXHRwdWJsaWMgaXNTdWJtaXR0ZWQ6IGJvb2xlYW47XHJcblxyXG5cdHB1YmxpYyBjaGVja2VkOiBib29sZWFuO1xyXG5cdHB1YmxpYyBoaWRkZW46IGJvb2xlYW47XHJcblx0cHJpdmF0ZSBfY2hlY2tib3hFbGVtZW50OiBKUXVlcnk7XHJcblx0cHJpdmF0ZSBfaGlkZUVsZW1lbnQ6IEpRdWVyeTtcclxuXHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBieUNvbnRlbnRJZCA9IG5ldyBNYXA8bnVtYmVyLCBNb2R1bGVJdGVtPigpO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihtb2R1bGVJdGVtSnNvbj86IENhbnZhc0FQSS5Nb2R1bGVJdGVtKSB7XHJcblx0XHRpZiAobW9kdWxlSXRlbUpzb24pIHRoaXMudXBkYXRlKG1vZHVsZUl0ZW1Kc29uKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgZnJvbUNvbnRlbnRJZChjb250ZW50SWQ6IG51bWJlcik6IE1vZHVsZUl0ZW0ge1xyXG5cdFx0Y29uc3QgaXRlbSA9IG5ldyBNb2R1bGVJdGVtKCk7XHJcblx0XHRpdGVtLl9jb250ZW50SWQgPSBjb250ZW50SWQ7XHJcblx0XHRNb2R1bGVJdGVtLmJ5Q29udGVudElkLnNldChjb250ZW50SWQsIGl0ZW0pO1xyXG5cdFx0cmV0dXJuIGl0ZW07XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdXBkYXRlKG1vZHVsZUl0ZW1Kc29uOiBDYW52YXNBUEkuTW9kdWxlSXRlbSkge1xyXG5cdFx0dGhpcy5faWQgPSBtb2R1bGVJdGVtSnNvbi5pZDtcclxuXHRcdHRoaXMuX25hbWUgPSBtb2R1bGVJdGVtSnNvbi50aXRsZTtcclxuXHRcdHRoaXMubW9kdWxlSWQgPSBtb2R1bGVJdGVtSnNvbi5tb2R1bGVfaWQ7XHJcblx0XHR0aGlzLl9leHRlcm5hbFVybCA9IG1vZHVsZUl0ZW1Kc29uLmV4dGVybmFsX3VybCB8fCBudWxsO1xyXG5cclxuXHRcdGNvbnN0IHR5cGVTdHJpbmc6IHN0cmluZyA9IG1vZHVsZUl0ZW1Kc29uLnR5cGVcclxuXHRcdFx0LnJlcGxhY2UoLyhbQS1aXSkvZywgKHIsIHMpID0+IFwiX1wiICsgcylcclxuXHRcdFx0LnJlcGxhY2UoL15fLywgXCJcIikudG9VcHBlckNhc2UoKTtcclxuXHJcblx0XHR0aGlzLl90eXBlID0gTW9kdWxlSXRlbVR5cGVbdHlwZVN0cmluZ107XHJcblxyXG5cdFx0aWYgKHRoaXMuX3R5cGUgPT09IHVuZGVmaW5lZClcclxuXHRcdFx0Y29uc29sZS53YXJuKGBVbmtub3duIG1vZHVsZSBpdGVtIHR5cGU6IFwiJHt0eXBlU3RyaW5nfVwiYCk7XHJcblxyXG5cdFx0dGhpcy5jaGVja2VkID0gZmFsc2U7XHJcblx0XHR0aGlzLmhpZGRlbiA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICh0aGlzLl90eXBlID09PSBNb2R1bGVJdGVtVHlwZS5BU1NJR05NRU5UKVxyXG5cdFx0XHR0aGlzLnNldEFzc2lnbm1lbnRJZChtb2R1bGVJdGVtSnNvbi5jb250ZW50X2lkKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy5hc3NpZ25tZW50SWQgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldEFzc2lnbm1lbnRJZChpZDogbnVtYmVyKSB7IHRoaXMuYXNzaWdubWVudElkID0gaWQ7IH1cclxuXHRwdWJsaWMgc2V0RmlsZURhdGEoZGF0YTogQ2FudmFzQVBJLkZpbGUpIHsgdGhpcy5fZmlsZURhdGEgPSBkYXRhOyB9XHJcblxyXG5cdGdldCBjYW52YXNFbGVtZW50SWQoKSB7XHJcblx0XHRzd2l0Y2ggKERBVEEuY291cnNlUGFnZSkge1xyXG5cdFx0XHRjYXNlIENhbnZhc1BhZ2UuTU9EVUxFUzpcclxuXHRcdFx0XHRyZXR1cm4gXCJjb250ZXh0X21vZHVsZV9pdGVtX1wiICsgdGhpcy5faWQ7IC8vIGxpIGVsZW1lbnRcclxuXHRcdFx0Y2FzZSBDYW52YXNQYWdlLkdSQURFUzpcclxuXHRcdFx0XHRyZXR1cm4gXCJzdWJtaXNzaW9uX1wiICsgdGhpcy5hc3NpZ25tZW50SWQ7IC8vIHRyIGVsZW1lbnRcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBpZCgpIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcblx0Z2V0IG5hbWUoKSB7IHJldHVybiB0aGlzLl9uYW1lO1x0fVxyXG5cdGdldCB0eXBlKCk6IE1vZHVsZUl0ZW1UeXBlIHsgcmV0dXJuIHRoaXMuX3R5cGU7IH1cclxuXHRnZXQgaXNHcmFkZWQoKSB7IHJldHVybiB0aGlzLmFzc2lnbm1lbnRJZCAhPT0gbnVsbDsgfVxyXG5cdGdldCBpc1N1YkhlYWRlcigpIHsgcmV0dXJuIHRoaXMuX3R5cGUgPT09IE1vZHVsZUl0ZW1UeXBlLlNVQl9IRUFERVI7IH1cclxuXHRnZXQgbW9kdWxlKCkgeyByZXR1cm4gREFUQS5tb2R1bGVzLmdldCh0aGlzLm1vZHVsZUlkKTsgfVxyXG5cdGdldCBleHRlcm5hbFVybCgpIHsgcmV0dXJuIHRoaXMuX2V4dGVybmFsVXJsOyB9XHJcblx0Z2V0IGNvbnRlbnRJZCgpIHsgcmV0dXJuIHRoaXMuX2NvbnRlbnRJZDsgfVxyXG5cclxuXHRnZXQgY2hlY2tib3hFbGVtZW50KCk6IEpRdWVyeSB7IHJldHVybiB0aGlzLl9jaGVja2JveEVsZW1lbnQ7IH1cclxuXHRzZXQgY2hlY2tib3hFbGVtZW50KHZhbHVlOiBKUXVlcnkpIHtcclxuXHRcdGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPT09IDEpXHJcblx0XHRcdHRoaXMuX2NoZWNrYm94RWxlbWVudCA9IHZhbHVlO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE1vZHVsZSBJdGVtIEVsZW1lbnQ6IFwiICsgdmFsdWUpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGhpZGVFbGVtZW50KCk6IEpRdWVyeSB7IHJldHVybiB0aGlzLl9oaWRlRWxlbWVudDsgfVxyXG5cdHNldCBoaWRlRWxlbWVudCh2YWx1ZTogSlF1ZXJ5KSB7XHJcblx0XHRpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUubGVuZ3RoID09PSAxKVxyXG5cdFx0XHR0aGlzLl9oaWRlRWxlbWVudCA9IHZhbHVlO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE1vZHVsZSBJdGVtIEVsZW1lbnQ6IFwiICsgdmFsdWUpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGZpbGVEYXRhKCk6IENhbnZhc0FQSS5GaWxlIHsgcmV0dXJuIHRoaXMuX2ZpbGVEYXRhOyB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZW51bSBNb2R1bGVJdGVtVHlwZSB7XHJcblx0QVNTSUdOTUVOVCwgU1VCX0hFQURFUiwgRElTQ1VTU0lPTiwgUVVJWiwgUEFHRSwgRklMRSwgRVhURVJOQUxfVVJMLCBFWFRFUk5BTF9UT09MXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENhbnZhc1BhZ2Uge1xyXG5cdE1PRFVMRVMsIEdSQURFUywgSE9NRSwgVVNFUlMsIEdST1VQUywgQ09MTEFCT1JBVElPTlMsIERJU0NVU1NJT05fVE9QSUNTLCBFWFRFUk5BTF9UT09MUywgQVNTSUdOTUVOVFNcclxufVxyXG5cclxuZXhwb3J0IGVudW0gTWVzc2FnZVR5cGUge1xyXG5cdEJBU0lDLCBTVEFURVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZURhdGEge1xyXG5cdGFjdGlvbjogc3RyaW5nO1xyXG5cdHR5cGU6IE1lc3NhZ2VUeXBlO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihhY3Rpb246IHN0cmluZywgdHlwZT86IE1lc3NhZ2VUeXBlKSB7XHJcblx0XHR0aGlzLmFjdGlvbiA9IGFjdGlvbjtcclxuXHRcdHRoaXMudHlwZSA9IHR5cGUgfHwgTWVzc2FnZVR5cGUuQkFTSUM7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdGVNZXNzYWdlRGF0YSBleHRlbmRzIE1lc3NhZ2VEYXRhIHtcclxuXHRzdGF0ZU5hbWU6IHN0cmluZztcclxuXHRzdGF0ZTogYm9vbGVhbjtcclxuXHJcblx0Y29uc3RydWN0b3IoYWN0aW9uOiBcImdldFwiIHwgXCJzZXRcIiwgc3RhdGVOYW1lOiBzdHJpbmcsIHN0YXRlPzogYm9vbGVhbikge1xyXG5cdFx0c3VwZXIoYWN0aW9uLCBNZXNzYWdlVHlwZS5TVEFURSk7XHJcblxyXG5cdFx0dGhpcy5zdGF0ZU5hbWUgPSBzdGF0ZU5hbWU7XHJcblx0XHR0aGlzLnN0YXRlID0gc3RhdGU7XHJcblxyXG5cdFx0aWYgKGFjdGlvbiA9PT0gXCJzZXRcIiAmJiB0aGlzLnN0YXRlID09PSB1bmRlZmluZWQpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc3RhdGUgbWVzc2FnZTogbm8gYm9vbGVhbiB0byBzZXQgc3RhdGUgdG9cIik7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXhjZXB0aW9uIHtcclxuXHRwcml2YXRlIHJlYXNvbjogc3RyaW5nO1xyXG5cdHByaXZhdGUgZmF0YWw6IGJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKHJlYXNvbjogc3RyaW5nLCBmYXRhbD86IGJvb2xlYW4pIHtcclxuXHRcdGlmIChmYXRhbCA9PT0gdW5kZWZpbmVkKSBmYXRhbCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5yZWFzb24gPSByZWFzb247XHJcblx0XHR0aGlzLmZhdGFsID0gZmF0YWw7XHJcblx0fVxyXG5cclxuXHRnZXQgaXNGYXRhbCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmZhdGFsO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHRvU3RyaW5nKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVhc29uO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IERBVEEgPSBuZXcgRGF0YSgpO1xyXG5leHBvcnQgY29uc3QgUEFHRSA9IG5ldyBQYWdlKCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9vYmplY3RzLnRzIiwiaW1wb3J0IHsgViB9IGZyb20gXCIuL3ZhcnNcIjtcclxuaW1wb3J0IHsgTWVzc2FnZURhdGEgfSBmcm9tIFwiLi9vYmplY3RzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlscyB7XHJcblxyXG5cdHByaXZhdGUgc3RhdGljIEFDQ0VTU19UT0tFTjogc3RyaW5nO1xyXG5cclxuXHRzdGF0aWMgZm9ybWF0KHN0cjogc3RyaW5nLCBvYmo6IG9iamVjdCk6IHN0cmluZyB7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XHJcblx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSlcclxuXHRcdFx0XHRzdHIgPSBzdHIucmVwbGFjZShuZXcgUmVnRXhwKFwiXFxcXHtcIiArIGtleSArIFwiXFxcXH1cIiwgXCJnaVwiKSwgb2JqW2tleV0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdHI7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0T3JEZWZhdWx0PFQ+KG9iajogb2JqZWN0LCBrZXk6IFByb3BlcnR5S2V5LCBkZWY6IFQpOiBUIHtcclxuXHRcdGlmIChvYmogPT09IHVuZGVmaW5lZCB8fCBvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZGVmO1xyXG5cdFx0ZWxzZSByZXR1cm4gb2JqW2tleV07XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcGVyUGFnZSh1cmw6IHN0cmluZywgcGVyUGFnZTogbnVtYmVyKSB7XHJcblx0XHRyZXR1cm4gYCR7dXJsfT9wZXJfcGFnZT0ke3BlclBhZ2V9YDtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBmb3JtYXRVcmwodXJsOiBzdHJpbmcsIGZvcm1hdE9iaj86IHtwZXJQYWdlPzogbnVtYmVyLCBba2V5OiBzdHJpbmddOiBhbnl9KSB7XHJcblxyXG5cdFx0aWYgKGZvcm1hdE9iaiAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGlmIChmb3JtYXRPYmoucGVyUGFnZSAhPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdHVybCA9IFV0aWxzLnBlclBhZ2UodXJsLCBmb3JtYXRPYmoucGVyUGFnZSk7XHJcblx0XHRcdHVybCA9IFV0aWxzLmZvcm1hdCh1cmwsIGZvcm1hdE9iaik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIFYuY2FudmFzLmFwaS5yb290X3VybCArIHVybDtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyBnZXRKU09OPFQ+KHVybDogc3RyaW5nKTogUHJvbWlzZTxUPiB7XHJcblxyXG5cdFx0VXRpbHMuY2hlY2tUb2tlbigpO1xyXG5cclxuXHRcdGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuXHRcdFx0bWV0aG9kOiBcIkdFVFwiLFxyXG5cdFx0XHRoZWFkZXJzOiBuZXcgSGVhZGVycyh7XHJcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcblx0XHRcdFx0XCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIFwiICsgVXRpbHMuQUNDRVNTX1RPS0VOXHJcblx0XHRcdH0pXHJcblx0XHR9IGFzIFJlcXVlc3RJbml0KTtcclxuXHJcblx0XHRpZiAocmVzcC5zdGF0dXMgPT09IDQwNCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCI0MDQgZXJyb3Igd2hlbiBnZXR0aW5nIEpTT05cIik7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0aWYgKHJlc3Auc3RhdHVzID09PSA0MDApXHJcblx0XHRcdFx0Y29uc29sZS5kZWJ1ZyhcIjQwMCBlcnJvciB3aGVuIGdldHRpbmcgSlNPTiB3YXMgT0tBWVwiKTtcclxuXHJcblx0XHRcdGxldCBqc29uID0gYXdhaXQgcmVzcC50ZXh0KCk7XHJcblx0XHRcdGpzb24gPSBqc29uLnJlcGxhY2UoXCJ3aGlsZSgxKTtcIiwgXCJcIik7XHJcblxyXG5cdFx0XHRyZXR1cm4gSlNPTi5wYXJzZShqc29uKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgcHV0RGF0YSh1cmwsIGRhdGE6IGFueVtdIHwgYW55KTogUHJvbWlzZTxib29sZWFuPiB7XHJcblxyXG5cdFx0VXRpbHMuY2hlY2tUb2tlbigpO1xyXG5cclxuXHRcdGNvbnN0IGJvZHlEYXRhID0ge25zOiBWLmNhbnZhcy5hcGkubmFtZXNwYWNlLCBkYXRhfTtcclxuXHRcdGNvbnN0IG1ldGhvZCA9IGRhdGEgaW5zdGFuY2VvZiBBcnJheSAmJiBkYXRhLmxlbmd0aCA+IDAgfHwgZGF0YSAhPT0gdW5kZWZpbmVkID8gXCJQVVRcIiA6IFwiREVMRVRFXCI7XHJcblxyXG5cdFx0aWYgKG1ldGhvZCA9PT0gXCJERUxFVEVcIilcclxuXHRcdFx0ZGVsZXRlIGJvZHlEYXRhLmRhdGE7XHJcblxyXG5cdFx0Y29uc3Qgb3BzID0ge1xyXG5cdFx0XHRtZXRob2QsXHJcblx0XHRcdGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcclxuXHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuXHRcdFx0XHRcIkF1dGhvcml6YXRpb25cIjogXCJCZWFyZXIgXCIgKyBVdGlscy5BQ0NFU1NfVE9LRU5cclxuXHRcdFx0fSksXHJcblx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHlEYXRhKVxyXG5cdFx0fSBhcyBSZXF1ZXN0SW5pdDtcclxuXHJcblx0XHRjb25zdCByZXNwID0gYXdhaXQgZmV0Y2godXJsLCBvcHMpO1xyXG5cclxuXHRcdGlmICghcmVzcC5vayB8fCByZXNwLnN0YXR1cyA9PT0gNDAxKSB7IC8vIDQwMSB1bmF1dGhvcml6ZWRcclxuXHRcdFx0Y29uc29sZS5lcnJvcihgVW5hYmxlIHRvICR7bWV0aG9kfSBkYXRhIHRvICR7dXJsfS4gcmVzcDpgLCBKU09OLnN0cmluZ2lmeShyZXNwKSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgZWRpdERhdGFBcnJheSh1cmw6IHN0cmluZywgYXBwZW5kOiBib29sZWFuLCB2YWx1ZXM6IGFueVtdKTogUHJvbWlzZTxib29sZWFuPiB7XHJcblxyXG5cdFx0Y29uc3QgZXhpc3RpbmdEYXRhOiBhbnlbXSA9IChcclxuXHRcdFx0Ly8gdXJsIGlzIHNhbWUgZm9yIGdldC9wdXRcclxuXHRcdFx0YXdhaXQgVXRpbHMuZ2V0SlNPTjx7ZGF0YTogYW55W119Pih1cmwpXHJcblx0XHQpLmRhdGEgfHwgW107XHJcblxyXG5cdFx0bGV0IG5ld0FycmF5O1xyXG5cclxuXHRcdGlmIChhcHBlbmQpIHtcclxuXHRcdFx0bmV3QXJyYXkgPSBleGlzdGluZ0RhdGEuY29uY2F0KHZhbHVlcyk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHsgLy8gc3VidHJhY3QgZnJvbSBkYXRhIGFycmF5XHJcblx0XHRcdGlmIChleGlzdGluZ0RhdGEubGVuZ3RoID09PSAwKVxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRuZXdBcnJheSA9IGV4aXN0aW5nRGF0YS5maWx0ZXIodmFsID0+ICF2YWx1ZXMuaW5jbHVkZXModmFsKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIFV0aWxzLnB1dERhdGEodXJsLCBuZXdBcnJheSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgd2FpdChtczogbnVtYmVyKSB7XHJcblx0XHRhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdFx0c2V0VGltZW91dChyZXNvbHZlLCBtcyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjaGVja1Rva2VuKCk6IHZvaWQgfCBuZXZlciB7XHJcblx0XHRpZiAoVXRpbHMuQUNDRVNTX1RPS0VOID09PSBudWxsKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJBY2Nlc3MgdG9rZW4gbm90IHNldFwiKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyBsb2FkVG9rZW4oKSB7XHJcblx0XHRVdGlscy5BQ0NFU1NfVE9LRU4gPSBhd2FpdCBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcblx0XHRcdGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFYubWlzYy50b2tlbl9rZXksIHJlc3VsdERhdGEgPT4ge1xyXG5cclxuXHRcdFx0XHRjb25zdCBzdWNjZXNzID0gVXRpbHMuQUNDRVNTX1RPS0VOICE9PSBudWxsIHx8IHJlc3VsdERhdGFbVi5taXNjLnRva2VuX2tleV07XHJcblx0XHRcdFx0aWYgKHN1Y2Nlc3MpIHJlc29sdmUocmVzdWx0RGF0YVtWLm1pc2MudG9rZW5fa2V5XSk7XHJcblx0XHRcdFx0ZWxzZSByZWplY3QoKTtcclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFjY2Vzc1Rva2VuUHJvbXB0KCkge1xyXG5cdFx0Y29uc3Qgb3Blbk9wdGlvbnMgPSBjb25maXJtKFwiTWlzc2luZyBhY2Nlc3MgdG9rZW4sIHByZXNzIE9LIHRvIG9wZW4gZXh0ZW5zaW9uIG9wdGlvbnNcIik7XHJcblx0XHRpZiAob3Blbk9wdGlvbnMpIC8vIFRPRE8gc2VuZCB0YWIgSUQgd2l0aCB0aGlzIG1lc3NhZ2U/XHJcblx0XHRcdGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKG5ldyBNZXNzYWdlRGF0YShcIm9wZW4gb3B0aW9uc1wiKSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcnVuQ2IoY2FsbGJhY2tGdW5jdGlvbjogKCkgPT4gdm9pZCkge1xyXG5cdFx0aWYgKGNhbGxiYWNrRnVuY3Rpb24gIT09IHVuZGVmaW5lZClcclxuXHRcdFx0Y2FsbGJhY2tGdW5jdGlvbigpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHNhZmVDYjxGIGV4dGVuZHMgKCguLi5hcmdzKSA9PiB2b2lkKT4oY2FsbGJhY2tGdW5jdGlvbjogRiB8IHVuZGVmaW5lZCk6IEYge1xyXG5cdFx0aWYgKGNhbGxiYWNrRnVuY3Rpb24gIT09IHVuZGVmaW5lZClcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrRnVuY3Rpb247XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiAoKCkgPT4ge30pIGFzIEY7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tZW1wdHlcclxuXHR9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlscy50cyIsImltcG9ydCB7IFYgfSBmcm9tIFwiLi92YXJzXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBNZXNzYWdlRGF0YSwgU3RhdGVNZXNzYWdlRGF0YSB9IGZyb20gXCIuL29iamVjdHNcIjtcclxuXHJcbmRlY2xhcmUgY29uc3QgY29tcG9uZW50SGFuZGxlcjtcclxuY29uc3QgUVVFUlkgPSB7YWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlfTtcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblxyXG5jb25zdCBCT0RZID0gJChcImJvZHlcIik7XHJcbmNvbnN0IGp1bXBCdXR0b24gPSAkKFwiI1wiICsgVi5pZC5wb3B1cF9qdW1wX2J1dHRvbik7XHJcbmNvbnN0IGluc2VydGlvblBvaW50ID0gJChcIiNcIiArIFYuaWQucG9wdXBfaW5zZXJ0aW9uX3BvaW50KTtcclxuXHJcbiQoXCIjXCIgKyBWLmlkLnBvcHVwX2V4X25hbWUpLnRleHQoY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS5uYW1lKTtcclxuXHJcblByb21pc2UucmVzb2x2ZSgpXHJcblxyXG5cdC50aGVuKCgpID0+IG5ldyBQcm9taXNlKG5leHQgPT4ge1xyXG5cclxuXHRcdGNvbnN0IHN0YXJ0UGluZyA9ICQubm93KCk7XHJcblxyXG5cdFx0c2VuZE1lc3NhZ2UobmV3IE1lc3NhZ2VEYXRhKFwicGluZ1wiKSwgcmVzcCA9PiB7XHJcblx0XHRcdGlmIChyZXNwICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcInBhZ2UgcGluZ1wiLCByZXNwLnBvbmcgLSBzdGFydFBpbmcpO1xyXG5cclxuXHRcdFx0XHRCT0RZLmFkZENsYXNzKFYuY3NzQ2xhc3MucG9wdXBfY29ubmVjdGVkKTtcclxuXHRcdFx0XHRuZXh0KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Qk9EWS5hZGRDbGFzcyhWLmNzc0NsYXNzLnBvcHVwX2xvYWRlZCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHR9KSkudGhlbigoKSA9PiBuZXcgUHJvbWlzZShuZXh0ID0+IHtcclxuXHJcblx0XHRzZW5kTWVzc2FnZShuZXcgTWVzc2FnZURhdGEoXCJjb3VudCB1bmNoZWNrZWRcIiksIHJlc3AgPT4ge1xyXG5cdFx0XHRpZiAocmVzcCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0aWYgKHJlc3AuY291bnQgPT09IDApXHJcblx0XHRcdFx0XHRqdW1wQnV0dG9uLnByb3AoXCJkaXNhYmxlZFwiLCB0cnVlKS5hdHRyKFwidGl0bGVcIiwgVi50b29sdGlwLnBvcHVwX25vX3VuY2hlY2tlZCk7XHJcblx0XHRcdFx0bmV4dCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0fSkpLnRoZW4oKCkgPT4gbmV3IFByb21pc2UobmV4dCA9PiB7XHJcblxyXG5cdFx0bGV0IHJlbWFpbmluZyA9IE9iamVjdC5rZXlzKFYuc3RhdGUpLmxlbmd0aDtcclxuXHJcblx0XHQkLmVhY2goVi5zdGF0ZSwgKHN0YXRlTmFtZSwgc3RhdGVEYXRhKSA9PiB7XHJcblx0XHRcdHNlbmRNZXNzYWdlKG5ldyBTdGF0ZU1lc3NhZ2VEYXRhKFwiZ2V0XCIsIHN0YXRlTmFtZSksIHJlc3AgPT4ge1xyXG5cclxuXHRcdFx0XHRjb25zdCBlbCA9ICQoVXRpbHMuZm9ybWF0KFYuZWxlbWVudC5wb3B1cF9zdGF0ZV9zd2l0Y2gsIHtuYW1lOiBzdGF0ZU5hbWUsIGRlc2M6IHN0YXRlRGF0YS5kZXNjfSkpO1xyXG5cclxuXHRcdFx0XHRlbC5pbnNlcnRBZnRlcihpbnNlcnRpb25Qb2ludCk7XHJcblx0XHRcdFx0Y29tcG9uZW50SGFuZGxlci51cGdyYWRlRWxlbWVudChlbC5maW5kKFwibGFiZWxcIikuZ2V0KDApKTtcclxuXHJcblx0XHRcdFx0Y29uc3QgaW5wdXRFbCA9IGVsLmZpbmQoXCJpbnB1dFwiKS5nZXQoMCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuXHJcblx0XHRcdFx0ZWwuY2hhbmdlKCgpID0+IHtcclxuXHRcdFx0XHRcdGNvbnN0IG5ld1N0YXRlID0gaW5wdXRFbC5jaGVja2VkO1xyXG5cclxuXHRcdFx0XHRcdHNldE1kbENoZWNrZWQoaW5wdXRFbCwgIW5ld1N0YXRlKTtcclxuXHRcdFx0XHRcdGlucHV0RWwudGl0bGUgPSBWLnRvb2x0aXAud2FpdGluZztcclxuXHRcdFx0XHRcdGlucHV0RWwuZGlzYWJsZWQgPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRcdHNlbmRNZXNzYWdlKG5ldyBTdGF0ZU1lc3NhZ2VEYXRhKFwic2V0XCIsIHN0YXRlTmFtZSwgbmV3U3RhdGUpLCBzdWNjZXNzID0+IHtcclxuXHRcdFx0XHRcdFx0aWYgKHN1Y2Nlc3MpIHtcclxuXHRcdFx0XHRcdFx0XHRzZXRNZGxDaGVja2VkKGlucHV0RWwsIG5ld1N0YXRlKTtcclxuXHRcdFx0XHRcdFx0XHRpbnB1dEVsLnRpdGxlID0gXCJcIjsgLy8gVE9ETyBzdGF0ZS5sb25nX2Rlc2MgP1xyXG5cdFx0XHRcdFx0XHRcdGlucHV0RWwuZGlzYWJsZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHNldE1kbENoZWNrZWQoaW5wdXRFbCwgcmVzcC5zdGF0ZSk7XHJcblxyXG5cdFx0XHRcdGlmICgtLXJlbWFpbmluZyA9PT0gMCkgbmV4dCgpO1xyXG5cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRqdW1wQnV0dG9uLmNsaWNrKCgpID0+IHtcclxuXHRcdFx0c2VuZE1lc3NhZ2UobmV3IE1lc3NhZ2VEYXRhKFwianVtcCB0byBmaXJzdCB1bmNoZWNrZWRcIiksIHJlc3AgPT4gd2luZG93LmNsb3NlKCkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH0pKS50aGVuKCgpID0+IG5ldyBQcm9taXNlKG5leHQgPT4ge1xyXG5cclxuXHRcdGluc2VydGlvblBvaW50LnJlbW92ZSgpO1xyXG5cdFx0Qk9EWS5hZGRDbGFzcyhWLmNzc0NsYXNzLnBvcHVwX2xvYWRlZCk7XHJcblx0XHRuZXh0KCk7XHJcblxyXG5cdH0pKTtcclxuXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gc2VuZE1lc3NhZ2UoZGF0YTogTWVzc2FnZURhdGEsIGNhbGxiYWNrPzogKHJlc3BvbnNlOiBhbnkpID0+IHZvaWQpIHtcclxuXHRjaHJvbWUudGFicy5xdWVyeShRVUVSWSwgdGFicyA9PiBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJzWzBdLmlkLCBkYXRhLCBjYWxsYmFjaykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRNZGxDaGVja2VkKGNoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50LCBjaGVja2VkOiBib29sZWFuKSB7XHJcblx0JChjaGVja2JveClcclxuXHRcdC5wcm9wKFwiY2hlY2tlZFwiLCBjaGVja2VkKVxyXG5cdFx0LnBhcmVudCgpXHJcblx0XHQudG9nZ2xlQ2xhc3MoXCJpcy1jaGVja2VkXCIsIGNoZWNrZWQpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wb3B1cC50cyJdLCJzb3VyY2VSb290IjoiIn0=