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
        this.sassExports = Object.assign({}, this);
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

/* unused harmony default export */ var _unused_webpack_default_export = (VARS.sassExports);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWFmMTU4MmRjMTljOGQ0OWMwNWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL3ZhcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL29iamVjdHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy90cy9wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBO0lBbUdDO1FBakdBLFdBQU0sR0FBRyxjQUFjLENBQUM7UUFFeEIsYUFBUSxHQUFHO1lBQ1YsTUFBTSxFQUFFLFFBQVE7WUFDaEIsZUFBZSxFQUFFLGlCQUFpQjtZQUNsQyxnQkFBZ0IsRUFBRSxrQkFBa0I7WUFDcEMsV0FBVyxFQUFFLGFBQWE7WUFDMUIsS0FBSyxFQUFFLFlBQVk7WUFDbkIsZ0JBQWdCLEVBQUUsa0JBQWtCO1lBQ3BDLFdBQVcsRUFBRSxRQUFRO1lBQ3JCLFdBQVcsRUFBRSxVQUFVO1lBQ3ZCLGFBQWEsRUFBRSxlQUFlO1lBQzlCLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLEtBQUssRUFBRSxPQUFPO1lBQ2QsU0FBUyxFQUFFLGNBQWM7WUFDekIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsWUFBWSxFQUFFLFNBQVM7WUFFdkIsWUFBWSxFQUFFLGNBQWM7WUFDNUIsZUFBZSxFQUFFLGdCQUFnQjtZQUNqQyxrQkFBa0IsRUFBRSxjQUFjO1NBQ2xDLENBQUM7UUFFRixhQUFRLEdBQUc7WUFDVixhQUFhLEVBQUUsZUFBZTtZQUM5QixTQUFTLEVBQUUsV0FBVztZQUN0QixpQkFBaUIsRUFBRSxtQkFBbUI7WUFDdEMsY0FBYyxFQUFFLGdCQUFnQjtZQUNoQyxXQUFXLEVBQUUsU0FBUztZQUN0QixXQUFXLEVBQUUsYUFBYTtZQUMxQixXQUFXLEVBQUUsYUFBYTtZQUMxQixVQUFVLEVBQUUsZ0JBQWdCO1NBQzVCLENBQUM7UUFFRixPQUFFLEdBQUc7WUFDSixHQUFHLEVBQUUsS0FBSztZQUNWLFdBQVcsRUFBRSxhQUFhO1lBRTFCLGtCQUFrQixFQUFFLG9CQUFvQjtZQUN4QyxhQUFhLEVBQUUsZ0JBQWdCO1lBQy9CLHFCQUFxQixFQUFFLGlCQUFpQjtZQUN4QyxpQkFBaUIsRUFBRSxTQUFTO1NBQzVCLENBQUM7UUFFRixVQUFLLEdBQUc7WUFDUCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFVBQVUsRUFBRSxvQkFBb0I7WUFDaEMsU0FBUyxFQUFFLHlCQUF5QjtZQUNwQyxjQUFjLEVBQUUsbUJBQW1CO1lBQ25DLGVBQWUsRUFBRSxvQkFBb0I7WUFDckMsZ0JBQWdCLEVBQUUsa0JBQWtCO1lBQ3BDLGFBQWEsRUFBRSxnQkFBZ0I7WUFDL0IsV0FBVyxFQUFFLGlCQUFpQjtTQUM5QixDQUFDO1FBRUYsT0FBRSxHQUFHO1lBQ0osZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLGVBQWUsRUFBRSxHQUFHO1lBQ3BCLGNBQWMsRUFBRSxFQUFFO1lBQ2xCLFdBQVcsRUFBRSxHQUFHO1lBQ2hCLFNBQVMsRUFBRSxHQUFHO1lBQ2QsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQixXQUFXLEVBQUUsQ0FBQztTQUNkLENBQUM7UUFFRixVQUFLLEdBQUc7WUFDUCxXQUFXLEVBQUU7Z0JBQ1osUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDbEIsSUFBSSxFQUFFLG1CQUFtQjthQUN6QjtZQUNELFlBQVksRUFBRTtnQkFDYixRQUFRLEVBQUUsY0FBYztnQkFDeEIsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQztnQkFDNUIsSUFBSSxFQUFFLHNCQUFzQjthQUM1QjtZQUNELG1CQUFtQixFQUFFO2dCQUNwQixRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDO2dCQUM1QixJQUFJLEVBQUUsc0JBQXNCO2FBQzVCO1lBQ0QsdUJBQXVCLEVBQUU7Z0JBQ3hCLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDbEIsSUFBSSxFQUFFLDBCQUEwQjthQUNoQztTQUNELENBQUM7UUFZRCxNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRWpELE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBVyxFQUFFLE9BQWU7WUFFbEQsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUFDLFFBQVEsQ0FBQztnQkFFdkMsSUFBSSxHQUFHLEdBQTZCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFN0MsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFFN0IsYUFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFFekIsQ0FBQztnQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFFbEMsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhO3lCQUMxQyxHQUFHLENBQUMsR0FBRyxJQUFJLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7eUJBQ3ZDLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUVqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUN2RCxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO29CQUUvQixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7d0JBQzVDLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFDO29CQUVyQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUNoQixDQUFDO1lBQ0YsQ0FBQztRQUVGLENBQUMsQ0FBQztRQUVGLGFBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDOztBQTNDdUIsYUFBSSxHQUFHO0lBQzlCLGNBQWMsRUFBRSxVQUFVO0lBQzFCLFdBQVcsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDO0lBQzNDLGFBQWEsRUFBRSxDQUFDLFVBQVUsQ0FBQztDQUMzQixDQUFDO0FBMkNILFVBQVcsU0FBUSxRQUFRO0lBQTNCOztRQUVDLFlBQU8sR0FBRztZQUNULGFBQWEsRUFBRSxtQkFBbUI7WUFDbEMsZUFBZSxFQUFFLG9CQUFvQjtZQUNyQyxJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLE1BQU0sRUFBRSxrQkFBa0I7WUFDMUIsYUFBYSxFQUFFLHlCQUF5QjtZQUN4QyxXQUFXLEVBQUUsYUFBYTtZQUMxQixPQUFPLEVBQUUsWUFBWTtZQUNyQixRQUFRLEVBQUUsK0JBQStCO1lBQ3pDLFlBQVksRUFBRSxvQkFBb0I7WUFDbEMsY0FBYyxFQUFFLDJCQUEyQjtZQUMzQyxrQkFBa0IsRUFBRSwrQkFBK0I7U0FDbkQsQ0FBQztRQUVGLFNBQUksR0FBRztZQUNOLGNBQWMsRUFBRSxpQ0FBaUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLHNDQUFzQztZQUMxRyxTQUFTLEVBQUUsYUFBYTtTQUN4QixDQUFDO1FBRUYsWUFBTyxHQUFHO1lBRVQsUUFBUSxFQUNOLG9DQUFvQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWU7OEJBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVztXQUM1QztZQUVULGVBQWUsRUFDYixvQ0FBb0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLFlBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFROztXQUVwRjtZQUVULFVBQVUsRUFDUixvQ0FBb0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLFlBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZOztXQUU1RjtZQUVULFdBQVcsRUFDVCxvQ0FBb0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXO1VBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVztXQUN4QjtZQUVULFdBQVcsRUFDVjs7OztTQUlNLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxhQUFhLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVztnQ0FDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0I7O1NBRXJEO1lBRVAsR0FBRyxFQUNGLFlBQVksSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHO2tCQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzs7VUFFL0I7WUFFUixRQUFRLEVBQ1A7OzttQkFHZ0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhOztTQUVqRTtZQUVQLFdBQVcsRUFDVixZQUFZLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVztnQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1VBQzlCO1lBRVIsZUFBZSxFQUNkLGVBQWUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLFlBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTOztVQUV0RTtZQUVSLGtCQUFrQixFQUNqQixzQkFBc0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0I7Ozs7O1VBSy9DO1NBQ1IsQ0FBQztRQUdNLHFCQUFnQixHQUFHLGdCQUFnQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFekQsV0FBTSxHQUFHO1lBQ1IsUUFBUSxFQUFFO2dCQUNULE1BQU0sRUFBRSxvQkFBb0I7Z0JBQzVCLFdBQVcsRUFBRSx3QkFBd0I7Z0JBQ3JDLFlBQVksRUFBRSx5QkFBeUI7Z0JBQ3ZDLFNBQVMsRUFBRSw4QkFBOEI7Z0JBQ3pDLGFBQWEsRUFBRSx3REFBd0Q7Z0JBQ3ZFLFFBQVEsRUFBRSxpQkFBaUI7YUFDM0I7WUFDRCxHQUFHLEVBQUU7Z0JBQ0osU0FBUyxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7Z0JBQ2hDLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUUsR0FBRztnQkFDYixJQUFJLEVBQUU7b0JBQ0wsV0FBVyxFQUFFLHVDQUF1QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7b0JBQzNFLGdCQUFnQixFQUFFLDhCQUE4QjtvQkFDaEQsYUFBYSxFQUFFLG1CQUFtQjtvQkFDbEMsV0FBVyxFQUFFLDJDQUEyQztvQkFDeEQsT0FBTyxFQUFFLDRCQUE0QjtvQkFDckMsWUFBWSxFQUFFLDZDQUE2QztvQkFDM0QsV0FBVyxFQUFFLG1DQUFtQztvQkFDaEQsZUFBZSxFQUFFLHlCQUF5QjtpQkFDMUM7Z0JBQ0QsU0FBUyxFQUFFO29CQUNWLGFBQWEsRUFBRSxlQUFlO29CQUM5QixxQkFBcUIsRUFBRSx1QkFBdUI7b0JBQzlDLGtCQUFrQixFQUFFLG9CQUFvQjtvQkFDeEMsYUFBYSxFQUFFLGVBQWU7aUJBQzlCO2FBQ0Q7U0FDRCxDQUFDO0lBQ0gsQ0FBQztDQUFBO0FBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUNqQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7QUFBQTtBQUFBO0FBQ3RCLDBFQUFlLElBQUksQ0FBQyxXQUFXLEVBQUM7Ozs7Ozs7Ozs7QUNyUWhDO0FBQUE7SUFhQztRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFFekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxDQUFDO0lBRWhELENBQUM7Q0FDRDtBQUVEO0lBVUMsVUFBVTtRQUVULElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFnQixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNEO0FBRUs7SUFNTCxZQUFZLFVBQTRCLEVBQUUsS0FBYTtRQUN0RCxJQUFJLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDO0NBRUQ7QUFBQTtBQUFBO0FBRUs7SUFLTCxZQUFZLE9BQXNCO1FBQ2pDLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQUVNLFdBQVcsQ0FBQyxHQUFHO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLGlCQUFpQjtRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksUUFBUTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDbkcsQ0FBQztJQUVELElBQUksTUFBTTtRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDRDtBQUFBO0FBQUE7QUFFSztJQVVMLFlBQVksR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUVsQixTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQVk7WUFDcEMsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELFFBQVEsQ0FBQyxRQUFpQjtRQUN6QixFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsWUFBWSxRQUFRLENBQUM7WUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLFlBQVksUUFBUSxDQUFDO1lBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQy9ELENBQUM7Q0FFRDtBQUFBO0FBQUE7QUFFSztJQU1MLFlBQVksVUFBNEI7UUFDdkMsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztDQUVEO0FBQUE7QUFBQTtBQUVLO0lBbUJMLFlBQVksY0FBcUM7UUFDaEQsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDO1lBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFpQjtRQUM1QyxNQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVNLE1BQU0sQ0FBQyxjQUFvQztRQUNqRCxJQUFJLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQztRQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDO1FBRXhELE1BQU0sVUFBVSxHQUFXLGNBQWMsQ0FBQyxJQUFJO2FBQzVDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDdEMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVsQyxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV4QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztZQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLDhCQUE4QixVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXBCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssY0FBYyxDQUFDLFVBQVUsQ0FBQztZQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxJQUFJO1lBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVNLGVBQWUsQ0FBQyxFQUFVLElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELFdBQVcsQ0FBQyxJQUFvQixJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUVuRSxJQUFJLGVBQWU7UUFDbEIsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDekIsS0FBSyxVQUFVLENBQUMsT0FBTztnQkFDdEIsTUFBTSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDMUMsS0FBSyxVQUFVLENBQUMsTUFBTTtnQkFDckIsTUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQzFDO2dCQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0YsQ0FBQztJQUVELElBQUksRUFBRSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3QixJQUFJLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakMsSUFBSSxJQUFJLEtBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqRCxJQUFJLFFBQVEsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JELElBQUksV0FBVyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLElBQUksTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELElBQUksV0FBVyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUMvQyxJQUFJLFNBQVMsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFFM0MsSUFBSSxlQUFlLEtBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDL0QsSUFBSSxlQUFlLENBQUMsS0FBYTtRQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSTtZQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELElBQUksV0FBVyxLQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUN2RCxJQUFJLFdBQVcsQ0FBQyxLQUFhO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSTtZQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELElBQUksUUFBUSxLQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7QUE1RWxDLHNCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQXNCLENBQUM7QUFnRnBFLElBQVksY0FFWDtBQUZELFdBQVksY0FBYztJQUN6QiwrREFBVTtJQUFFLCtEQUFVO0lBQUUsK0RBQVU7SUFBRSxtREFBSTtJQUFFLG1EQUFJO0lBQUUsbURBQUk7SUFBRSxtRUFBWTtJQUFFLHFFQUFhO0FBQ2xGLENBQUMsRUFGVyxjQUFjLEtBQWQsY0FBYyxRQUV6QjtBQUVELElBQVksVUFFWDtBQUZELFdBQVksVUFBVTtJQUNyQixpREFBTztJQUFFLCtDQUFNO0lBQUUsMkNBQUk7SUFBRSw2Q0FBSztJQUFFLCtDQUFNO0lBQUUsK0RBQWM7SUFBRSxxRUFBaUI7SUFBRSwrREFBYztJQUFFLHlEQUFXO0FBQ3JHLENBQUMsRUFGVyxVQUFVLEtBQVYsVUFBVSxRQUVyQjtBQUVELElBQVksV0FFWDtBQUZELFdBQVksV0FBVztJQUN0QiwrQ0FBSztJQUFFLCtDQUFLO0FBQ2IsQ0FBQyxFQUZXLFdBQVcsS0FBWCxXQUFXLFFBRXRCO0FBRUs7SUFJTCxZQUFZLE1BQWMsRUFBRSxJQUFrQjtRQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDO0lBQ3ZDLENBQUM7Q0FDRDtBQUFBO0FBQUE7QUFFSyxzQkFBd0IsU0FBUSxXQUFXO0lBSWhELFlBQVksTUFBcUIsRUFBRSxTQUFpQixFQUFFLEtBQWU7UUFDcEUsS0FBSyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztZQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7SUFDdkUsQ0FBQztDQUNEO0FBQUE7QUFBQTtBQUVLO0lBSUwsWUFBWSxNQUFjLEVBQUUsS0FBZTtRQUMxQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO1lBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDbkIsQ0FBQztJQUVNLFFBQVE7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNwQixDQUFDO0NBQ0Q7QUFBQTtBQUFBO0FBRU0sTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUFBO0FBQUE7QUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pTSjtBQUNhO0FBRTFCO0lBSWIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFXLEVBQUUsR0FBVztRQUVyQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ1osQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUFZLENBQUksR0FBVyxFQUFFLEdBQWdCLEVBQUUsR0FBTTtRQUMzRCxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUM7WUFBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQzVELElBQUk7WUFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQVcsRUFBRSxPQUFlO1FBQzFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsYUFBYSxPQUFPLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFXLEVBQUUsU0FBa0Q7UUFFL0UsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUM7Z0JBQ25DLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0MsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFFRCxNQUFNLENBQUMsZ0RBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDcEMsQ0FBQztJQUVELE1BQU0sQ0FBTyxPQUFPLENBQUksR0FBVzs7WUFFbEMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRW5CLE1BQU0sSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFDN0IsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsT0FBTyxFQUFFLElBQUksT0FBTyxDQUFDO29CQUNwQixjQUFjLEVBQUUsa0JBQWtCO29CQUNsQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQyxZQUFZO2lCQUMvQyxDQUFDO2FBQ2EsQ0FBQyxDQUFDO1lBRWxCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDTCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQztvQkFDdkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO2dCQUV2RCxJQUFJLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUVyQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixDQUFDO1FBRUYsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBaUI7O1lBRTFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVuQixNQUFNLFFBQVEsR0FBRyxFQUFDLEVBQUUsRUFBRSxnREFBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDO1lBQ3BELE1BQU0sTUFBTSxHQUFHLElBQUksWUFBWSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxLQUFLLFNBQVMsR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDO1lBRWpHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUM7Z0JBQ3ZCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztZQUV0QixNQUFNLEdBQUcsR0FBRztnQkFDWCxNQUFNO2dCQUNOLE9BQU8sRUFBRSxJQUFJLE9BQU8sQ0FBQztvQkFDcEIsY0FBYyxFQUFFLGtCQUFrQjtvQkFDbEMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUMsWUFBWTtpQkFDL0MsQ0FBQztnQkFDRixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7YUFDZixDQUFDO1lBRWpCLE1BQU0sSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsTUFBTSxZQUFZLEdBQUcsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakYsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNkLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDTCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2IsQ0FBQztRQUVGLENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBTyxhQUFhLENBQUMsR0FBVyxFQUFFLE1BQWUsRUFBRSxNQUFhOztZQUVyRSxNQUFNLFlBQVksR0FBVSxDQUUzQixNQUFNLEtBQUssQ0FBQyxPQUFPLENBQWdCLEdBQUcsQ0FBQyxDQUN2QyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7WUFFYixJQUFJLFFBQVEsQ0FBQztZQUViLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1osUUFBUSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEMsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNMLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO29CQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNiLFFBQVEsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM5RCxDQUFDO1lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBTyxJQUFJLENBQUMsRUFBVTs7WUFDM0IsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPO2dCQUN4QixVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFDLFVBQVU7UUFDaEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUM7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxNQUFNLENBQU8sU0FBUzs7WUFDckIsS0FBSyxDQUFDLFlBQVksR0FBRyxNQUFNLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU07Z0JBRTlELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnREFBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVTtvQkFFbkQsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLFlBQVksS0FBSyxJQUFJLElBQUksVUFBVSxDQUFDLGdEQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM1RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxnREFBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNuRCxJQUFJO3dCQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUVmLENBQUMsQ0FBQyxDQUFDO1lBRUosQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO0tBQUE7SUFFRCxNQUFNLENBQUMsaUJBQWlCO1FBQ3ZCLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1FBQ3hGLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUNmLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksNkRBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUE0QjtRQUN4QyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLENBQUM7WUFDbEMsZ0JBQWdCLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBZ0MsZ0JBQStCO1FBQzNFLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixLQUFLLFNBQVMsQ0FBQztZQUNsQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDekIsSUFBSTtZQUNILE1BQU0sQ0FBQyxDQUFDLFFBQU8sQ0FBQyxDQUFNLENBQUM7SUFDekIsQ0FBQztDQUVEO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7O0FDL0owQjtBQUNDO0FBQzhCO0FBRzFELE1BQU0sS0FBSyxHQUFHLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFDLENBQUM7QUFFbEQsQ0FBQyxDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZCLE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsZ0RBQUMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNuRCxNQUFNLGNBQWMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLGdEQUFDLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFFM0QsQ0FBQyxDQUFDLEdBQUcsR0FBRyxnREFBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVwRSxPQUFPLENBQUMsT0FBTyxFQUFFO1NBRWYsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSTtRQUUzQixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFMUIsV0FBVyxDQUFDLElBQUksNkRBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJO1lBQ3hDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDO2dCQUVoRCxJQUFJLENBQUMsUUFBUSxDQUFDLGdEQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLEVBQUUsQ0FBQztZQUNSLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLGdEQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hDLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUVKLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSTtRQUU5QixXQUFXLENBQUMsSUFBSSw2REFBVyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSTtZQUNuRCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUM7b0JBQ3BCLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZ0RBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDL0UsSUFBSSxFQUFFLENBQUM7WUFDUixDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFFSixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLElBQUk7UUFFOUIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxnREFBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUU1QyxDQUFDLENBQUMsSUFBSSxDQUFDLGdEQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVM7WUFDcEMsV0FBVyxDQUFDLElBQUksa0VBQWdCLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxFQUFFLElBQUk7Z0JBRXZELE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyx1REFBSyxDQUFDLE1BQU0sQ0FBQyxnREFBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRWxHLEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQy9CLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV6RCxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQXFCLENBQUM7Z0JBRTVELEVBQUUsQ0FBQyxNQUFNLENBQUM7b0JBQ1QsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztvQkFFakMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNsQyxPQUFPLENBQUMsS0FBSyxHQUFHLGdEQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztvQkFDbEMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBRXhCLFdBQVcsQ0FBQyxJQUFJLGtFQUFnQixDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLEVBQUUsT0FBTzt3QkFDcEUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs0QkFDYixhQUFhLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDOzRCQUNqQyxPQUFPLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQzs0QkFDbkIsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7d0JBQzFCLENBQUM7b0JBQ0YsQ0FBQyxDQUFDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7Z0JBRUgsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRW5DLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxLQUFLLENBQUMsQ0FBQztvQkFBQyxJQUFJLEVBQUUsQ0FBQztZQUUvQixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUNoQixXQUFXLENBQUMsSUFBSSw2REFBVyxDQUFDLHlCQUF5QixDQUFDLEVBQUUsSUFBSSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2pGLENBQUMsQ0FBQyxDQUFDO0lBRUosQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJO1FBRTlCLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLGdEQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksRUFBRSxDQUFDO0lBRVIsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDO0FBRUgscUJBQXFCLElBQWlCLEVBQUUsUUFBa0M7SUFDekUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3ZGLENBQUM7QUFFRCx1QkFBdUIsUUFBMEIsRUFBRSxPQUFnQjtJQUNsRSxDQUFDLENBQUMsUUFBUSxDQUFDO1NBQ1QsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7U0FDeEIsTUFBTSxFQUFFO1NBQ1IsV0FBVyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN0QyxDQUFDIiwiZmlsZSI6InBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWFmMTU4MmRjMTljOGQ0OWMwNWIiLCJjbGFzcyBTYXNzVmFycyB7XHJcblxyXG5cdHByZWZpeCA9IFwiYmV0dGVyQ2FudmFzXCI7XHJcblxyXG5cdGNzc0NsYXNzID0ge1xyXG5cdFx0YWN0aXZlOiBcImFjdGl2ZVwiLFxyXG5cdFx0Y2hlY2tib3hfcGFyZW50OiBcImNoZWNrYm94LXBhcmVudFwiLFxyXG5cdFx0Y2hlY2tib3hfY2hlY2tlZDogXCJjaGVja2JveC1jaGVja2VkXCIsXHJcblx0XHRjaGVja2JveF90ZDogXCJjaGVja2JveC10ZFwiLFxyXG5cdFx0Zmxhc2g6IFwiYW5pbS1mbGFzaFwiLFxyXG5cdFx0Y291cnNlX2xpbmtfdGV4dDogXCJjb3Vyc2UtbGluay10ZXh0XCIsXHJcblx0XHRpdGVtX2hpZGRlbjogXCJoaWRkZW5cIixcclxuXHRcdGhpZGVfYnV0dG9uOiBcImJ0bi1oaWRlXCIsXHJcblx0XHRoaWRlX2Rpc2FibGVkOiBcImhpZGUtZGlzYWJsZWRcIixcclxuXHRcdHRvY19yYXRpbzogXCJ0b2MtcmF0aW9cIixcclxuXHRcdHRvY190aXRsZTogXCJ0b2MtdGl0bGVcIixcclxuXHRcdGZpeGVkOiBcImZpeGVkXCIsXHJcblx0XHRpdGVtX2ljb246IFwiaWNvbi13cmFwcGVyXCIsXHJcblx0XHRkb3dubG9hZDogXCJkb3dubG9hZC1idG5cIixcclxuXHRcdGV4dGVybmFsX3VybDogXCJ1cmwtYnRuXCIsXHJcblxyXG5cdFx0cG9wdXBfbG9hZGVkOiBcImRvbmUtbG9hZGluZ1wiLFxyXG5cdFx0cG9wdXBfY29ubmVjdGVkOiBcInBhZ2UtY29ubmVjdGVkXCIsXHJcblx0XHRwb3B1cF9yZXF1aXJlX3BhZ2U6IFwicmVxdWlyZS1wYWdlXCJcclxuXHR9O1xyXG5cclxuXHRkYXRhQXR0ciA9IHtcclxuXHRcdHRvY19tb2R1bGVfaWQ6IFwidG9jLW1vZHVsZS1pZFwiLFxyXG5cdFx0dG9jX3RvdGFsOiBcInRvYy10b3RhbFwiLFxyXG5cdFx0dG9jX2NoZWNrZWRfY291bnQ6IFwidG9jLWNoZWNrZWQtY291bnRcIixcclxuXHRcdHRvY19wZXJjZW50YWdlOiBcInRvYy1wZXJjZW50YWdlXCIsXHJcblx0XHRtb2RfaXRlbV9pZDogXCJpdGVtLWlkXCIsXHJcblx0XHRjb3Vyc2VfbmFtZTogXCJjb3Vyc2UtbmFtZVwiLFxyXG5cdFx0Y291cnNlX2NvZGU6IFwiY291cnNlLWNvZGVcIixcclxuXHRcdGRlZl9pbmRlbnQ6IFwiZGVmYXVsdC1pbmRlbnRcIlxyXG5cdH07XHJcblxyXG5cdGlkID0ge1xyXG5cdFx0dG9jOiBcInRvY1wiLFxyXG5cdFx0anVtcF9idXR0b246IFwianVtcC10by10b3BcIixcclxuXHJcblx0XHRwb3B1cF9wYWdlX21pc3Npbmc6IFwicGFnZS1taXNzaW5nLWVycm9yXCIsXHJcblx0XHRwb3B1cF9leF9uYW1lOiBcImV4dGVuc2lvbi1uYW1lXCIsXHJcblx0XHRwb3B1cF9pbnNlcnRpb25fcG9pbnQ6IFwiaW5zZXJ0aW9uLXBvaW50XCIsXHJcblx0XHRwb3B1cF9qdW1wX2J1dHRvbjogXCJqdW1wLXRvXCJcclxuXHR9O1xyXG5cclxuXHRjb2xvciA9IHtcclxuXHRcdHRvY19maWxsOiBcInJnYmEoMCwgMjU1LCAwLCAuNzUpXCIsXHJcblx0XHR0b2NfYm9yZGVyOiBcInJnYigxMDIsIDEyMCwgMTM1KVwiLFxyXG5cdFx0dG9jX3RpdGxlOiBcInZhcigtLWljLWJyYW5kLXByaW1hcnkpXCIsIC8vIHdhcyBcInJnYig1NywgNzUsIDg4KVwiLFxyXG5cdFx0Y2hlY2tib3hfY2hlY2s6IFwicmdiKDIyLCAxNjAsIDEzMylcIixcclxuXHRcdGNoZWNrYm94X2JvcmRlcjogXCJyZ2IoMTAyLCAxMjAsIDEzNSlcIixcclxuXHRcdGhpZ2hsaWdodF9vcmFuZ2U6IFwicmdiKDI1NSwgMTUyLCAwKVwiLFxyXG5cdFx0aGlnaGxpZ2h0X3JlZDogXCJyZ2IoMjU1LCAwLCAwKVwiLFxyXG5cdFx0anVtcF9idXR0b246IFwicmdiKDU3LCA3NSwgODgpXCJcclxuXHR9O1xyXG5cclxuXHR1aSA9IHtcclxuXHRcdHRvcF9pbnNpZGVfcmF0aW86IDAuMDUsXHJcblx0XHRzY3JvbGxfdG9wX29mZnNldDogNSxcclxuXHRcdGp1bXBfdG9wX2N1dG9mZjogMTAwLFxyXG5cdFx0dG9jX3RvcF9tYXJnaW46IDMyLFxyXG5cdFx0c2Nyb2xsX3RpbWU6IDUwMCxcclxuXHRcdGZhZGVfdGltZTogNTAwLFxyXG5cdFx0c3ViaGVhZGVyX2luZGVudDogMCxcclxuXHRcdG1haW5faW5kZW50OiAxXHJcblx0fTtcclxuXHJcblx0c3RhdGUgPSB7XHJcblx0XHRzaG93X2hpZGRlbjoge1xyXG5cdFx0XHRjc3NDbGFzczogXCJzaG93LWhpZGRlblwiLFxyXG5cdFx0XHRwYWdlczogW1wibW9kdWxlc1wiXSxcclxuXHRcdFx0ZGVzYzogXCJTaG93IGhpZGRlbiBpdGVtc1wiXHJcblx0XHR9LFxyXG5cdFx0aGlkZV9jaGVja2VkOiB7XHJcblx0XHRcdGNzc0NsYXNzOiBcImhpZGUtY2hlY2tlZFwiLFxyXG5cdFx0XHRwYWdlczogW1wibW9kdWxlc1wiLCBcImdyYWRlc1wiXSxcclxuXHRcdFx0ZGVzYzogXCJIaWRlIGNvbXBsZXRlZCBpdGVtc1wiXHJcblx0XHR9LFxyXG5cdFx0aGlnaGxpZ2h0X3VuY2hlY2tlZDoge1xyXG5cdFx0XHRjc3NDbGFzczogXCJtYXJrLXVuY2hlY2tlZFwiLFxyXG5cdFx0XHRwYWdlczogW1wibW9kdWxlc1wiLCBcImdyYWRlc1wiXSxcclxuXHRcdFx0ZGVzYzogXCJNYXJrIHVuY2hlY2tlZCBpdGVtc1wiXHJcblx0XHR9LFxyXG5cdFx0ZGlzYWJsZV9pbmRlbnRfb3ZlcnJpZGU6IHtcclxuXHRcdFx0cGFnZXM6IFtcIm1vZHVsZXNcIl0sXHJcblx0XHRcdGRlc2M6IFwiRGlzYWJsZSBpbmRlbnQgb3ZlcnJpZGVzXCJcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRzYXNzRXhwb3J0czogU2Fzc1ZhcnM7XHJcblxyXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IG1ldGEgPSB7XHJcblx0XHRkYXRhUHJlZml4VHlwZTogXCJkYXRhQXR0clwiLFxyXG5cdFx0cHJlZml4VHlwZXM6IFtcImNzc0NsYXNzXCIsIFwiZGF0YUF0dHJcIiwgXCJpZFwiXSxcclxuXHRcdHByZWZpeEV4Y2x1ZGU6IFtcInBvcHVwXy4rXCJdXHJcblx0fTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdFx0Y29uc3QgdHlwZXMgPSBuZXcgU2V0KFNhc3NWYXJzLm1ldGEucHJlZml4VHlwZXMpO1xyXG5cclxuXHRcdGNvbnN0IHByb2Nlc3NPYmplY3QgPSAob2JqOiBvYmplY3QsIG9iak5hbWU6IHN0cmluZykgPT4ge1xyXG5cclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XHJcblx0XHRcdFx0aWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkgY29udGludWU7XHJcblxyXG5cdFx0XHRcdGxldCB2YWw6IG9iamVjdCB8IHN0cmluZyB8IG51bWJlciA9IG9ialtrZXldO1xyXG5cclxuXHRcdFx0XHRpZiAodHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIikge1xyXG5cclxuXHRcdFx0XHRcdHByb2Nlc3NPYmplY3QodmFsLCBrZXkpO1xyXG5cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xyXG5cclxuXHRcdFx0XHRcdGNvbnN0IGV4Y2x1ZGVkID0gU2Fzc1ZhcnMubWV0YS5wcmVmaXhFeGNsdWRlXHJcblx0XHRcdFx0XHRcdC5tYXAoc3RyID0+IG5ldyBSZWdFeHAoXCJeXCIgKyBzdHIgKyBcIiRcIikpXHJcblx0XHRcdFx0XHRcdC5zb21lKHJlZ2V4ID0+IHJlZ2V4LnRlc3Qoa2V5KSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFleGNsdWRlZCAmJiAodHlwZXMuaGFzKG9iak5hbWUpIHx8IHR5cGVzLmhhcyhrZXkpKSlcclxuXHRcdFx0XHRcdFx0dmFsID0gdGhpcy5wcmVmaXggKyBcIi1cIiArIHZhbDtcclxuXHJcblx0XHRcdFx0XHRpZiAob2JqTmFtZSA9PT0gU2Fzc1ZhcnMubWV0YS5kYXRhUHJlZml4VHlwZSlcclxuXHRcdFx0XHRcdFx0dmFsID0gXCJkYXRhLVwiICsgdmFsO1xyXG5cclxuXHRcdFx0XHRcdG9ialtrZXldID0gdmFsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0cHJvY2Vzc09iamVjdCh0aGlzLCBcInJvb3RcIik7XHJcblxyXG5cdFx0dGhpcy5zYXNzRXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIFZhcnMgZXh0ZW5kcyBTYXNzVmFycyB7XHJcblxyXG5cdHRvb2x0aXAgPSB7XHJcblx0XHRtYXJrX2NvbXBsZXRlOiBcIk1hcmsgYXMgY29tcGxldGVkXCIsXHJcblx0XHRtYXJrX2luY29tcGxldGU6IFwiTWFyayBhcyBpbmNvbXBsZXRlXCIsXHJcblx0XHRoaWRlOiBcIkhpZGUgdGhpcyBpdGVtXCIsXHJcblx0XHR1bmhpZGU6IFwiVW5oaWRlIHRoaXMgaXRlbVwiLFxyXG5cdFx0aGlkZV9kaXNhYmxlZDogXCJDYW5ub3QgaGlkZSBncmFkZWQgaXRlbVwiLFxyXG5cdFx0anVtcF9idXR0b246IFwiSnVtcCB0byB0b3BcIixcclxuXHRcdHdhaXRpbmc6IFwiV2FpdGluZy4uLlwiLFxyXG5cdFx0ZG93bmxvYWQ6IFwiRG93bmxvYWQgZmlsZTogXFxcIntmaWxlbmFtZX1cXFwiXCIsXHJcblx0XHRleHRlcm5hbF91cmw6IFwiVmlzaXQgZXh0ZXJuYWwgVVJMXCIsXHJcblx0XHRoYXNfc3VibWlzc2lvbjogXCJBc3NpZ25tZW50IGhhcyBzdWJtaXNzaW9uXCIsXHJcblx0XHRwb3B1cF9ub191bmNoZWNrZWQ6IFwiTm8gdW5jaGVja2VkIGl0ZW1zIHRvIGp1bXAgdG9cIlxyXG5cdH07XHJcblxyXG5cdG1pc2MgPSB7XHJcblx0XHR0b2NfYmFja2dyb3VuZDogYC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQsICR7dGhpcy5jb2xvci50b2NfZmlsbH0ge3BlcmNlbnR9JSwgdHJhbnNwYXJlbnQge3BlcmNlbnR9JSlgLFxyXG5cdFx0dG9rZW5fa2V5OiBcImFjY2Vzc1Rva2VuXCJcclxuXHR9O1xyXG5cclxuXHRlbGVtZW50ID0ge1xyXG5cclxuXHRcdGNoZWNrYm94OlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuY2hlY2tib3hfcGFyZW50fSc+XHJcblx0XHRcdFx0XHQ8aW5wdXQgdHlwZT0nY2hlY2tib3gnICR7dGhpcy5kYXRhQXR0ci5tb2RfaXRlbV9pZH09J3tpdGVtX2lkfSc+XHJcblx0XHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRkb3dubG9hZF9idXR0b246XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5kb3dubG9hZH0nIHRpdGxlPScke3RoaXMudG9vbHRpcC5kb3dubG9hZH0nPlxyXG5cdFx0XHRcdFx0PGEgaHJlZj1cIntmaWxlX3VybH1cIj48L2E+XHJcblx0XHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHR1cmxfYnV0dG9uOlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuZXh0ZXJuYWxfdXJsfScgdGl0bGU9JyR7dGhpcy50b29sdGlwLmV4dGVybmFsX3VybH0nPlxyXG5cdFx0XHRcdFx0PGEgaHJlZj1cIntleHRlcm5hbF91cmx9XCIgY2xhc3M9XCJub3RfZXh0ZXJuYWxcIiB0YXJnZXQ9XCJfYmxhbmtcIj48L2E+XHJcblx0XHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRoaWRlX2J1dHRvbjpcclxuXHRcdFx0XHRgPGRpdiBzdHlsZT0nZGlzcGxheTpub25lJyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLmhpZGVfYnV0dG9ufSc+XHJcblx0XHRcdFx0XHQ8aSAke3RoaXMuZGF0YUF0dHIubW9kX2l0ZW1faWR9PSd7aXRlbV9pZH0nPjwvaT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGNvdXJzZV9saW5rOlxyXG5cdFx0XHRgPGxpIHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiB7dGFiQ29sb3J9JyBjbGFzcz0nbWVudS1pdGVtIGljLWFwcC1oZWFkZXJfX21lbnUtbGlzdC1pdGVtJz5cclxuXHRcdFx0XHQ8YSBocmVmPScvY291cnNlcy97dGFiSUR9L21vZHVsZXMnIGNsYXNzPSdpYy1hcHAtaGVhZGVyX19tZW51LWxpc3QtbGluayc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdtZW51LWl0ZW0taWNvbi1jb250YWluZXInIGFyaWEtaGlkZGVuPSd0cnVlJz48aT48L2k+PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiB7dGFiQ29sb3J9OyBib3JkZXItcmlnaHQtY29sb3I6IHt0YWJDb2xvcn0nXHJcblx0XHRcdFx0XHRcdFx0JHt0aGlzLmRhdGFBdHRyLmNvdXJzZV9uYW1lfT0ne25hbWV9JyAke3RoaXMuZGF0YUF0dHIuY291cnNlX2NvZGV9PSd7Y29kZX0nXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3M9J21lbnUtaXRlbV9fdGV4dCAke3RoaXMuY3NzQ2xhc3MuY291cnNlX2xpbmtfdGV4dH0nPjwvZGl2PlxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0PC9saT5gLFxyXG5cclxuXHRcdHRvYzpcclxuXHRcdFx0YDxkaXYgaWQ9JyR7dGhpcy5pZC50b2N9JyBjbGFzcz0naWMtYXBwLWNvdXJzZS1tZW51IGxpc3Qtdmlldyc+XHJcblx0XHRcdFx0PGRpdiBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLnRvY190aXRsZX0nPlRhYmxlIG9mIENvbnRlbnRzPC9kaXY+XHJcblx0XHRcdFx0PG5hdj48dWw+PC91bD48L25hdj5cclxuXHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHR0b2NfaXRlbTpcclxuXHRcdFx0YDxsaT5cclxuXHRcdFx0XHQ8YSBocmVmPScjJyB0aXRsZT0ne2l0ZW1fbmFtZX0nPlxyXG5cdFx0XHRcdFx0e2l0ZW1fbmFtZX1cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy50b2NfcmF0aW99JyAke3RoaXMuZGF0YUF0dHIudG9jX21vZHVsZV9pZH09J3tpdGVtX2lkfSc+PC9kaXY+XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHQ8L2xpPmAsXHJcblxyXG5cdFx0anVtcF9idXR0b246XHJcblx0XHRcdGA8ZGl2IGlkPScke3RoaXMuaWQuanVtcF9idXR0b259Jz5cclxuXHRcdFx0XHQ8aSB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuanVtcF9idXR0b259Jz48L2k+XHJcblx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0c3VibWlzc2lvbl9pY29uOlxyXG5cdFx0XHRgPGRpdiB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuaGFzX3N1Ym1pc3Npb259JyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLml0ZW1faWNvbn0nPlxyXG5cdFx0XHRcdDxpIGNsYXNzPSdpY29uLXB1Ymxpc2gnPjwvaT5cclxuXHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRwb3B1cF9zdGF0ZV9zd2l0Y2g6XHJcblx0XHRcdGA8ZGl2IGNsYXNzPVwic3dpdGNoICR7dGhpcy5jc3NDbGFzcy5wb3B1cF9yZXF1aXJlX3BhZ2V9XCI+XHJcblx0XHRcdFx0PGxhYmVsIGZvcj1cIntuYW1lfVwiIGNsYXNzPVwibWRsLXN3aXRjaCBtZGwtanMtc3dpdGNoIG1kbC1qcy1yaXBwbGUtZWZmZWN0XCI+XHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cIm1kbC1zd2l0Y2hfX2xhYmVsXCI+e2Rlc2N9PC9zcGFuPlxyXG5cdFx0XHRcdFx0PGlucHV0IGlkPVwie25hbWV9XCIgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJtZGwtc3dpdGNoX19pbnB1dFwiPlxyXG5cdFx0XHRcdDwvbGFiZWw+XHJcblx0XHRcdDwvZGl2PmBcclxuXHR9O1xyXG5cclxuXHQvLyBzZXBhcmF0ZWQgZm9yIHVzZSBpbiB0ZW1wbGF0ZSBzdHJpbmdzIGJlbG93XHJcblx0cHJpdmF0ZSBfY2FudmFzTmFtZXNwYWNlID0gYGNvbS5qbWFyaW5lci4ke3RoaXMucHJlZml4fWA7XHJcblxyXG5cdGNhbnZhcyA9IHtcclxuXHRcdHNlbGVjdG9yOiB7XHJcblx0XHRcdG1vZHVsZTogXCJkaXYuY29udGV4dF9tb2R1bGVcIixcclxuXHRcdFx0bW9kdWxlX2l0ZW06IFwibGkuY29udGV4dF9tb2R1bGVfaXRlbVwiLFxyXG5cdFx0XHRtb2R1bGVfaXRlbXM6IFwidWwuY29udGV4dF9tb2R1bGVfaXRlbXNcIixcclxuXHRcdFx0c3ViaGVhZGVyOiBcImxpLmNvbnRleHRfbW9kdWxlX3N1Yl9oZWFkZXJcIixcclxuXHRcdFx0bm90X3N1YmhlYWRlcjogXCJsaS5jb250ZXh0X21vZHVsZV9pdGVtOm5vdCguY29udGV4dF9tb2R1bGVfc3ViX2hlYWRlcilcIixcclxuXHRcdFx0bmF2X3RhYnM6IFwidWwjc2VjdGlvbi10YWJzXCJcclxuXHRcdH0sXHJcblx0XHRhcGk6IHtcclxuXHRcdFx0bmFtZXNwYWNlOiB0aGlzLl9jYW52YXNOYW1lc3BhY2UsXHJcblx0XHRcdHJvb3RfdXJsOiBcIi9hcGkvdjEvXCIsXHJcblx0XHRcdHBlcl9wYWdlOiAxMDAsXHJcblx0XHRcdHVybHM6IHtcclxuXHRcdFx0XHRjdXN0b21fZGF0YTogYHVzZXJzL3NlbGYvY3VzdG9tX2RhdGF7ZGF0YVBhdGh9P25zPSR7dGhpcy5fY2FudmFzTmFtZXNwYWNlfWAsXHJcblx0XHRcdFx0ZmF2b3JpdGVfY291cnNlczogXCJ1c2Vycy9zZWxmL2Zhdm9yaXRlcy9jb3Vyc2VzXCIsXHJcblx0XHRcdFx0Y3VzdG9tX2NvbG9yczogXCJ1c2Vycy9zZWxmL2NvbG9yc1wiLFxyXG5cdFx0XHRcdGFzc2lnbm1lbnRzOiBcInVzZXJzL3NlbGYvY291cnNlcy97Y291cnNlSUR9L2Fzc2lnbm1lbnRzXCIsXHJcblx0XHRcdFx0bW9kdWxlczogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vbW9kdWxlc1wiLFxyXG5cdFx0XHRcdG1vZHVsZV9pdGVtczogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vbW9kdWxlcy97bW9kdWxlSUR9L2l0ZW1zXCIsXHJcblx0XHRcdFx0ZmlsZV9kaXJlY3Q6IFwiY291cnNlcy97Y291cnNlSUR9L2ZpbGVzL3tmaWxlSUR9XCIsXHJcblx0XHRcdFx0bmF2aWdhdGlvbl90YWJzOiBcImNvdXJzZXMve2NvdXJzZUlEfS90YWJzXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0ZGF0YV91cmxzOiB7XHJcblx0XHRcdFx0YWN0aXZlX3N0YXRlczogXCJhY3RpdmVfc3RhdGVzXCIsXHJcblx0XHRcdFx0Y29tcGxldGVkX2Fzc2lnbm1lbnRzOiBcImNvbXBsZXRlZF9hc3NpZ25tZW50c1wiLFxyXG5cdFx0XHRcdGhpZGRlbl9hc3NpZ25tZW50czogXCJoaWRkZW5fYXNzaWdubWVudHNcIixcclxuXHRcdFx0XHR0YWJfcG9zaXRpb25zOiBcInRhYl9wb3NpdGlvbnNcIlxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuY29uc3QgVkFSUyA9IG5ldyBWYXJzKCk7XHJcbmV4cG9ydCBjb25zdCBWID0gVkFSUztcclxuZXhwb3J0IGRlZmF1bHQgVkFSUy5zYXNzRXhwb3J0cztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzL3ZhcnMudHMiLCJpbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0ICogYXMgQ2FudmFzQVBJIGZyb20gXCIuL2NhbnZhc19hcGlcIjtcclxuXHJcbmNsYXNzIERhdGEge1xyXG5cdGNvdXJzZVBhZ2U6IENhbnZhc1BhZ2U7XHJcblx0Y291cnNlSUQ6IG51bWJlcjtcclxuXHRtb2R1bGVzOiBNYXA8bnVtYmVyLCBNb2R1bGU+OyAvLyBtb2R1bGUgaWQgPT4gYXJyYXkgb2YgTW9kdWxlSXRlbVxyXG5cdG1vZHVsZUl0ZW1zOiBNYXA8bnVtYmVyLCBNb2R1bGVJdGVtPjsgLy8gbW9kdWxlIGl0ZW0gaWQgPT4gTW9kdWxlSXRlbVxyXG5cdHN0YXRlczogTWFwPHN0cmluZywgU3RhdGU+OyAvLyBzdGF0ZU5hbWUgPT4gU3RhdGVcclxuXHRjb3Vyc2VUYWJzOiBNYXA8bnVtYmVyLCBDdXN0b21Db3Vyc2VUYWI+OyAvLyBjb3Vyc2UgaWQgPT4gY291cnNlIHRhYlxyXG5cdG5hdlRhYnM6IE1hcDxzdHJpbmcsIE5hdlRhYj47IC8vIHRhYiBpZCBzdHJpbmcgPT4gdGFiXHJcblx0b25NYWluUGFnZTogYm9vbGVhbjtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0ZXh0ZW5zaW9uSWQ6IHN0cmluZztcclxuXHRlbGVtZW50czoge2p1bXBfYnV0dG9uOiBKUXVlcnksIHRvYzogSlF1ZXJ5fTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLm1vZHVsZXMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLm1vZHVsZUl0ZW1zID0gbmV3IE1hcCgpO1xyXG5cdFx0dGhpcy5zdGF0ZXMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLmNvdXJzZVRhYnMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLm5hdlRhYnMgPSBuZXcgTWFwKCk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50cyA9IHtqdW1wX2J1dHRvbjogbnVsbCwgdG9jOiBudWxsfTtcclxuXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBQYWdlIHtcclxuXHJcblx0Ym9keTogSlF1ZXJ5O1xyXG5cdHNjcm9sbGluZ0VsZW1lbnQ6IEpRdWVyeTtcclxuXHRtYWluPzogSlF1ZXJ5O1xyXG5cdGNvbnRlbnQ/OiBKUXVlcnk7XHJcblx0bGVmdD86IEpRdWVyeTtcclxuXHRzaWRlYmFyOiBKUXVlcnk7XHJcblx0Z3JhZGVzPzogSlF1ZXJ5O1xyXG5cclxuXHRpbml0aWFsaXplKCkge1xyXG5cclxuXHRcdHRoaXMuYm9keSA9ICQoXCJib2R5XCIpO1xyXG5cdFx0dGhpcy5zY3JvbGxpbmdFbGVtZW50ID0gJChkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IGRvY3VtZW50LmJvZHkpO1xyXG5cdFx0dGhpcy5zaWRlYmFyID0gJChcIiNtZW51XCIpO1xyXG5cdFx0dGhpcy5tYWluID0gJChcIiNtYWluXCIpO1xyXG5cclxuXHRcdGlmIChEQVRBLm9uTWFpblBhZ2UpIHtcclxuXHRcdFx0dGhpcy5jb250ZW50ID0gJChcIiNjb250ZW50XCIpO1xyXG5cdFx0XHR0aGlzLmxlZnQgPSAkKFwiI2xlZnQtc2lkZVwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoREFUQS5jb3Vyc2VQYWdlID09PSBDYW52YXNQYWdlLkdSQURFUylcclxuXHRcdFx0dGhpcy5ncmFkZXMgPSAkKFwiI2dyYWRlc19zdW1tYXJ5XCIpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEN1c3RvbUNvdXJzZVRhYiB7XHJcblx0cmVhZG9ubHkgaWQ6IG51bWJlcjtcclxuXHRyZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcblx0cmVhZG9ubHkgY29kZTogc3RyaW5nO1xyXG5cdHJlYWRvbmx5IGNvbG9yOiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGNvdXJzZURhdGE6IENhbnZhc0FQSS5Db3Vyc2UsIGNvbG9yOiBzdHJpbmcpIHtcclxuXHRcdHRoaXMuaWQgPSBjb3Vyc2VEYXRhLmlkO1xyXG5cdFx0dGhpcy5uYW1lID0gY291cnNlRGF0YS5uYW1lO1xyXG5cdFx0dGhpcy5jb2RlID0gY291cnNlRGF0YS5jb3Vyc2VfY29kZTtcclxuXHRcdHRoaXMuY29sb3IgPSBjb2xvcjtcclxuXHR9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2VGFiIHtcclxuXHRyZWFkb25seSBpZDogc3RyaW5nO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgaW5pdFBvc2l0aW9uOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfcG9zaXRpb246IG51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IodGFiRGF0YTogQ2FudmFzQVBJLlRhYikge1xyXG5cdFx0dGhpcy5pZCA9IHRhYkRhdGEuaWQ7XHJcblx0XHR0aGlzLl9wb3NpdGlvbiA9IG51bGw7XHJcblx0XHR0aGlzLmluaXRQb3NpdGlvbiA9IHRhYkRhdGEucG9zaXRpb247XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0UG9zaXRpb24ocG9zKSB7XHJcblx0XHR0aGlzLl9wb3NpdGlvbiA9IHBvcztcclxuXHR9XHJcblxyXG5cdGdldCBoYXNDdXN0b21Qb3NpdGlvbigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbiAhPSBudWxsO1xyXG5cdH1cclxuXHJcblx0Z2V0IHBvc2l0aW9uKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcG9zaXRpb24gPT0gbnVsbCA/IHRoaXMuaW5pdFBvc2l0aW9uIDogdGhpcy5fcG9zaXRpb24gPT09IC0xID8gbnVsbCA6IHRoaXMuX3Bvc2l0aW9uO1xyXG5cdH1cclxuXHJcblx0Z2V0IGhpZGRlbigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbiA9PT0gLTE7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdGUge1xyXG5cdHByaXZhdGUgbmFtZTogc3RyaW5nO1xyXG5cclxuXHRyZWFkb25seSBib2R5Q2xhc3M6IHN0cmluZztcclxuXHRyZWFkb25seSBvblBhZ2VzOiBDYW52YXNQYWdlW107XHJcblxyXG5cdHB1YmxpYyBhY3RpdmU6IGJvb2xlYW47XHJcblx0cHVibGljIG9uRW5hYmxlOiAoKSA9PiB2b2lkO1xyXG5cdHB1YmxpYyBvbkRpc2FibGU6ICgpID0+IHZvaWQ7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGtleSwgc3RhdGVEYXRhLCBhY3RpdmUpIHtcclxuXHRcdHRoaXMubmFtZSA9IGtleTtcclxuXHRcdHRoaXMuYm9keUNsYXNzID0gc3RhdGVEYXRhLmNzc0NsYXNzO1xyXG5cdFx0dGhpcy5hY3RpdmUgPSBhY3RpdmU7XHJcblx0XHR0aGlzLm9uUGFnZXMgPSBbXTtcclxuXHJcblx0XHRzdGF0ZURhdGEucGFnZXMuZm9yRWFjaCgocGFnZTogc3RyaW5nKSA9PiB7XHJcblx0XHRcdGNvbnN0IF9wYWdlID0gQ2FudmFzUGFnZVtwYWdlLnRvVXBwZXJDYXNlKCldO1xyXG5cdFx0XHRpZiAoX3BhZ2UgIT09IHVuZGVmaW5lZClcclxuXHRcdFx0XHR0aGlzLm9uUGFnZXMucHVzaChfcGFnZSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG9uQ2hhbmdlKG5ld1N0YXRlOiBib29sZWFuKSB7XHJcblx0XHRpZiAobmV3U3RhdGUgJiYgdGhpcy5vbkVuYWJsZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB0aGlzLm9uRW5hYmxlKCk7XHJcblx0XHRlbHNlIGlmICh0aGlzLm9uRGlzYWJsZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB0aGlzLm9uRGlzYWJsZSgpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2R1bGUge1xyXG5cdHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuXHRyZWFkb25seSBpZDogbnVtYmVyO1xyXG5cdHJlYWRvbmx5IGl0ZW1Db3VudDogbnVtYmVyO1xyXG5cdHJlYWRvbmx5IGl0ZW1zOiBNb2R1bGVJdGVtW107XHJcblxyXG5cdGNvbnN0cnVjdG9yKG1vZHVsZUpzb246IENhbnZhc0FQSS5Nb2R1bGUpIHtcclxuXHRcdHRoaXMubmFtZSA9IG1vZHVsZUpzb24ubmFtZTtcclxuXHRcdHRoaXMuaWQgPSBtb2R1bGVKc29uLmlkO1xyXG5cdFx0dGhpcy5pdGVtQ291bnQgPSBtb2R1bGVKc29uLml0ZW1zX2NvdW50O1xyXG5cdFx0dGhpcy5pdGVtcyA9IFtdO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2R1bGVJdGVtIHtcclxuXHRwcml2YXRlIF9pZDogbnVtYmVyO1xyXG5cdHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuXHRwcml2YXRlIG1vZHVsZUlkOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfdHlwZTogTW9kdWxlSXRlbVR5cGU7XHJcblx0cHJpdmF0ZSBhc3NpZ25tZW50SWQ6IG51bWJlcjtcclxuXHRwcml2YXRlIF9jb250ZW50SWQ6IG51bWJlcjtcclxuXHRwcml2YXRlIF9maWxlRGF0YTogQ2FudmFzQVBJLkZpbGU7XHJcblx0cHJpdmF0ZSBfZXh0ZXJuYWxVcmw6IHN0cmluZztcclxuXHJcblx0cHVibGljIGlzU3VibWl0dGVkOiBib29sZWFuO1xyXG5cclxuXHRwdWJsaWMgY2hlY2tlZDogYm9vbGVhbjtcclxuXHRwdWJsaWMgaGlkZGVuOiBib29sZWFuO1xyXG5cdHByaXZhdGUgX2NoZWNrYm94RWxlbWVudDogSlF1ZXJ5O1xyXG5cdHByaXZhdGUgX2hpZGVFbGVtZW50OiBKUXVlcnk7XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgYnlDb250ZW50SWQgPSBuZXcgTWFwPG51bWJlciwgTW9kdWxlSXRlbT4oKTtcclxuXHJcblx0Y29uc3RydWN0b3IobW9kdWxlSXRlbUpzb24/OiBDYW52YXNBUEkuTW9kdWxlSXRlbSkge1xyXG5cdFx0aWYgKG1vZHVsZUl0ZW1Kc29uKSB0aGlzLnVwZGF0ZShtb2R1bGVJdGVtSnNvbik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3RhdGljIGZyb21Db250ZW50SWQoY29udGVudElkOiBudW1iZXIpOiBNb2R1bGVJdGVtIHtcclxuXHRcdGNvbnN0IGl0ZW0gPSBuZXcgTW9kdWxlSXRlbSgpO1xyXG5cdFx0aXRlbS5fY29udGVudElkID0gY29udGVudElkO1xyXG5cdFx0TW9kdWxlSXRlbS5ieUNvbnRlbnRJZC5zZXQoY29udGVudElkLCBpdGVtKTtcclxuXHRcdHJldHVybiBpdGVtO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHVwZGF0ZShtb2R1bGVJdGVtSnNvbjogQ2FudmFzQVBJLk1vZHVsZUl0ZW0pIHtcclxuXHRcdHRoaXMuX2lkID0gbW9kdWxlSXRlbUpzb24uaWQ7XHJcblx0XHR0aGlzLl9uYW1lID0gbW9kdWxlSXRlbUpzb24udGl0bGU7XHJcblx0XHR0aGlzLm1vZHVsZUlkID0gbW9kdWxlSXRlbUpzb24ubW9kdWxlX2lkO1xyXG5cdFx0dGhpcy5fZXh0ZXJuYWxVcmwgPSBtb2R1bGVJdGVtSnNvbi5leHRlcm5hbF91cmwgfHwgbnVsbDtcclxuXHJcblx0XHRjb25zdCB0eXBlU3RyaW5nOiBzdHJpbmcgPSBtb2R1bGVJdGVtSnNvbi50eXBlXHJcblx0XHRcdC5yZXBsYWNlKC8oW0EtWl0pL2csIChyLCBzKSA9PiBcIl9cIiArIHMpXHJcblx0XHRcdC5yZXBsYWNlKC9eXy8sIFwiXCIpLnRvVXBwZXJDYXNlKCk7XHJcblxyXG5cdFx0dGhpcy5fdHlwZSA9IE1vZHVsZUl0ZW1UeXBlW3R5cGVTdHJpbmddO1xyXG5cclxuXHRcdGlmICh0aGlzLl90eXBlID09PSB1bmRlZmluZWQpXHJcblx0XHRcdGNvbnNvbGUud2FybihgVW5rbm93biBtb2R1bGUgaXRlbSB0eXBlOiBcIiR7dHlwZVN0cmluZ31cImApO1xyXG5cclxuXHRcdHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5oaWRkZW4gPSBmYWxzZTtcclxuXHJcblx0XHRpZiAodGhpcy5fdHlwZSA9PT0gTW9kdWxlSXRlbVR5cGUuQVNTSUdOTUVOVClcclxuXHRcdFx0dGhpcy5zZXRBc3NpZ25tZW50SWQobW9kdWxlSXRlbUpzb24uY29udGVudF9pZCk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRoaXMuYXNzaWdubWVudElkID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRBc3NpZ25tZW50SWQoaWQ6IG51bWJlcikgeyB0aGlzLmFzc2lnbm1lbnRJZCA9IGlkOyB9XHJcblx0cHVibGljIHNldEZpbGVEYXRhKGRhdGE6IENhbnZhc0FQSS5GaWxlKSB7IHRoaXMuX2ZpbGVEYXRhID0gZGF0YTsgfVxyXG5cclxuXHRnZXQgY2FudmFzRWxlbWVudElkKCkge1xyXG5cdFx0c3dpdGNoIChEQVRBLmNvdXJzZVBhZ2UpIHtcclxuXHRcdFx0Y2FzZSBDYW52YXNQYWdlLk1PRFVMRVM6XHJcblx0XHRcdFx0cmV0dXJuIFwiY29udGV4dF9tb2R1bGVfaXRlbV9cIiArIHRoaXMuX2lkOyAvLyBsaSBlbGVtZW50XHJcblx0XHRcdGNhc2UgQ2FudmFzUGFnZS5HUkFERVM6XHJcblx0XHRcdFx0cmV0dXJuIFwic3VibWlzc2lvbl9cIiArIHRoaXMuYXNzaWdubWVudElkOyAvLyB0ciBlbGVtZW50XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgaWQoKSB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG5cdGdldCBuYW1lKCkgeyByZXR1cm4gdGhpcy5fbmFtZTtcdH1cclxuXHRnZXQgdHlwZSgpOiBNb2R1bGVJdGVtVHlwZSB7IHJldHVybiB0aGlzLl90eXBlOyB9XHJcblx0Z2V0IGlzR3JhZGVkKCkgeyByZXR1cm4gdGhpcy5hc3NpZ25tZW50SWQgIT09IG51bGw7IH1cclxuXHRnZXQgaXNTdWJIZWFkZXIoKSB7IHJldHVybiB0aGlzLl90eXBlID09PSBNb2R1bGVJdGVtVHlwZS5TVUJfSEVBREVSOyB9XHJcblx0Z2V0IG1vZHVsZSgpIHsgcmV0dXJuIERBVEEubW9kdWxlcy5nZXQodGhpcy5tb2R1bGVJZCk7IH1cclxuXHRnZXQgZXh0ZXJuYWxVcmwoKSB7IHJldHVybiB0aGlzLl9leHRlcm5hbFVybDsgfVxyXG5cdGdldCBjb250ZW50SWQoKSB7IHJldHVybiB0aGlzLl9jb250ZW50SWQ7IH1cclxuXHJcblx0Z2V0IGNoZWNrYm94RWxlbWVudCgpOiBKUXVlcnkgeyByZXR1cm4gdGhpcy5fY2hlY2tib3hFbGVtZW50OyB9XHJcblx0c2V0IGNoZWNrYm94RWxlbWVudCh2YWx1ZTogSlF1ZXJ5KSB7XHJcblx0XHRpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUubGVuZ3RoID09PSAxKVxyXG5cdFx0XHR0aGlzLl9jaGVja2JveEVsZW1lbnQgPSB2YWx1ZTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBNb2R1bGUgSXRlbSBFbGVtZW50OiBcIiArIHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdGdldCBoaWRlRWxlbWVudCgpOiBKUXVlcnkgeyByZXR1cm4gdGhpcy5faGlkZUVsZW1lbnQ7IH1cclxuXHRzZXQgaGlkZUVsZW1lbnQodmFsdWU6IEpRdWVyeSkge1xyXG5cdFx0aWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlLmxlbmd0aCA9PT0gMSlcclxuXHRcdFx0dGhpcy5faGlkZUVsZW1lbnQgPSB2YWx1ZTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBNb2R1bGUgSXRlbSBFbGVtZW50OiBcIiArIHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdGdldCBmaWxlRGF0YSgpOiBDYW52YXNBUEkuRmlsZSB7IHJldHVybiB0aGlzLl9maWxlRGF0YTsgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gTW9kdWxlSXRlbVR5cGUge1xyXG5cdEFTU0lHTk1FTlQsIFNVQl9IRUFERVIsIERJU0NVU1NJT04sIFFVSVosIFBBR0UsIEZJTEUsIEVYVEVSTkFMX1VSTCwgRVhURVJOQUxfVE9PTFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBDYW52YXNQYWdlIHtcclxuXHRNT0RVTEVTLCBHUkFERVMsIEhPTUUsIFVTRVJTLCBHUk9VUFMsIENPTExBQk9SQVRJT05TLCBESVNDVVNTSU9OX1RPUElDUywgRVhURVJOQUxfVE9PTFMsIEFTU0lHTk1FTlRTXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE1lc3NhZ2VUeXBlIHtcclxuXHRCQVNJQywgU1RBVEVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VEYXRhIHtcclxuXHRhY3Rpb246IHN0cmluZztcclxuXHR0eXBlOiBNZXNzYWdlVHlwZTtcclxuXHJcblx0Y29uc3RydWN0b3IoYWN0aW9uOiBzdHJpbmcsIHR5cGU/OiBNZXNzYWdlVHlwZSkge1xyXG5cdFx0dGhpcy5hY3Rpb24gPSBhY3Rpb247XHJcblx0XHR0aGlzLnR5cGUgPSB0eXBlIHx8IE1lc3NhZ2VUeXBlLkJBU0lDO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXRlTWVzc2FnZURhdGEgZXh0ZW5kcyBNZXNzYWdlRGF0YSB7XHJcblx0c3RhdGVOYW1lOiBzdHJpbmc7XHJcblx0c3RhdGU6IGJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFjdGlvbjogXCJnZXRcIiB8IFwic2V0XCIsIHN0YXRlTmFtZTogc3RyaW5nLCBzdGF0ZT86IGJvb2xlYW4pIHtcclxuXHRcdHN1cGVyKGFjdGlvbiwgTWVzc2FnZVR5cGUuU1RBVEUpO1xyXG5cclxuXHRcdHRoaXMuc3RhdGVOYW1lID0gc3RhdGVOYW1lO1xyXG5cdFx0dGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG5cclxuXHRcdGlmIChhY3Rpb24gPT09IFwic2V0XCIgJiYgdGhpcy5zdGF0ZSA9PT0gdW5kZWZpbmVkKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHN0YXRlIG1lc3NhZ2U6IG5vIGJvb2xlYW4gdG8gc2V0IHN0YXRlIHRvXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV4Y2VwdGlvbiB7XHJcblx0cHJpdmF0ZSByZWFzb246IHN0cmluZztcclxuXHRwcml2YXRlIGZhdGFsOiBib29sZWFuO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihyZWFzb246IHN0cmluZywgZmF0YWw/OiBib29sZWFuKSB7XHJcblx0XHRpZiAoZmF0YWwgPT09IHVuZGVmaW5lZCkgZmF0YWwgPSBmYWxzZTtcclxuXHRcdHRoaXMucmVhc29uID0gcmVhc29uO1xyXG5cdFx0dGhpcy5mYXRhbCA9IGZhdGFsO1xyXG5cdH1cclxuXHJcblx0Z2V0IGlzRmF0YWwoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5mYXRhbDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB0b1N0cmluZygpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlYXNvbjtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBEQVRBID0gbmV3IERhdGEoKTtcclxuZXhwb3J0IGNvbnN0IFBBR0UgPSBuZXcgUGFnZSgpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHMvb2JqZWN0cy50cyIsImltcG9ydCB7IFYgfSBmcm9tIFwiLi92YXJzXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VEYXRhIH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xyXG5cclxuXHRwcml2YXRlIHN0YXRpYyBBQ0NFU1NfVE9LRU46IHN0cmluZztcclxuXHJcblx0c3RhdGljIGZvcm1hdChzdHI6IHN0cmluZywgb2JqOiBvYmplY3QpOiBzdHJpbmcge1xyXG5cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG5cdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpXHJcblx0XHRcdFx0c3RyID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcXFx7XCIgKyBrZXkgKyBcIlxcXFx9XCIsIFwiZ2lcIiksIG9ialtrZXldKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3RyO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldE9yRGVmYXVsdDxUPihvYmo6IG9iamVjdCwga2V5OiBQcm9wZXJ0eUtleSwgZGVmOiBUKTogVCB7XHJcblx0XHRpZiAob2JqID09PSB1bmRlZmluZWQgfHwgb2JqW2tleV0gPT09IHVuZGVmaW5lZCkgcmV0dXJuIGRlZjtcclxuXHRcdGVsc2UgcmV0dXJuIG9ialtrZXldO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHBlclBhZ2UodXJsOiBzdHJpbmcsIHBlclBhZ2U6IG51bWJlcikge1xyXG5cdFx0cmV0dXJuIGAke3VybH0/cGVyX3BhZ2U9JHtwZXJQYWdlfWA7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZm9ybWF0VXJsKHVybDogc3RyaW5nLCBmb3JtYXRPYmo/OiB7cGVyUGFnZT86IG51bWJlciwgW2tleTogc3RyaW5nXTogYW55fSkge1xyXG5cclxuXHRcdGlmIChmb3JtYXRPYmogIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRpZiAoZm9ybWF0T2JqLnBlclBhZ2UgIT09IHVuZGVmaW5lZClcclxuXHRcdFx0XHR1cmwgPSBVdGlscy5wZXJQYWdlKHVybCwgZm9ybWF0T2JqLnBlclBhZ2UpO1xyXG5cdFx0XHR1cmwgPSBVdGlscy5mb3JtYXQodXJsLCBmb3JtYXRPYmopO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBWLmNhbnZhcy5hcGkucm9vdF91cmwgKyB1cmw7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgZ2V0SlNPTjxUPih1cmw6IHN0cmluZyk6IFByb21pc2U8VD4ge1xyXG5cclxuXHRcdFV0aWxzLmNoZWNrVG9rZW4oKTtcclxuXHJcblx0XHRjb25zdCByZXNwID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcblx0XHRcdG1ldGhvZDogXCJHRVRcIixcclxuXHRcdFx0aGVhZGVyczogbmV3IEhlYWRlcnMoe1xyXG5cdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdFx0XHRcdFwiQXV0aG9yaXphdGlvblwiOiBcIkJlYXJlciBcIiArIFV0aWxzLkFDQ0VTU19UT0tFTlxyXG5cdFx0XHR9KVxyXG5cdFx0fSBhcyBSZXF1ZXN0SW5pdCk7XHJcblxyXG5cdFx0aWYgKHJlc3Auc3RhdHVzID09PSA0MDQpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiNDA0IGVycm9yIHdoZW4gZ2V0dGluZyBKU09OXCIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGlmIChyZXNwLnN0YXR1cyA9PT0gNDAwKVxyXG5cdFx0XHRcdGNvbnNvbGUuZGVidWcoXCI0MDAgZXJyb3Igd2hlbiBnZXR0aW5nIEpTT04gd2FzIE9LQVlcIik7XHJcblxyXG5cdFx0XHRsZXQganNvbiA9IGF3YWl0IHJlc3AudGV4dCgpO1xyXG5cdFx0XHRqc29uID0ganNvbi5yZXBsYWNlKFwid2hpbGUoMSk7XCIsIFwiXCIpO1xyXG5cclxuXHRcdFx0cmV0dXJuIEpTT04ucGFyc2UoanNvbik7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHB1dERhdGEodXJsLCBkYXRhOiBhbnlbXSB8IGFueSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG5cclxuXHRcdFV0aWxzLmNoZWNrVG9rZW4oKTtcclxuXHJcblx0XHRjb25zdCBib2R5RGF0YSA9IHtuczogVi5jYW52YXMuYXBpLm5hbWVzcGFjZSwgZGF0YX07XHJcblx0XHRjb25zdCBtZXRob2QgPSBkYXRhIGluc3RhbmNlb2YgQXJyYXkgJiYgZGF0YS5sZW5ndGggPiAwIHx8IGRhdGEgIT09IHVuZGVmaW5lZCA/IFwiUFVUXCIgOiBcIkRFTEVURVwiO1xyXG5cclxuXHRcdGlmIChtZXRob2QgPT09IFwiREVMRVRFXCIpXHJcblx0XHRcdGRlbGV0ZSBib2R5RGF0YS5kYXRhO1xyXG5cclxuXHRcdGNvbnN0IG9wcyA9IHtcclxuXHRcdFx0bWV0aG9kLFxyXG5cdFx0XHRoZWFkZXJzOiBuZXcgSGVhZGVycyh7XHJcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcblx0XHRcdFx0XCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIFwiICsgVXRpbHMuQUNDRVNTX1RPS0VOXHJcblx0XHRcdH0pLFxyXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShib2R5RGF0YSlcclxuXHRcdH0gYXMgUmVxdWVzdEluaXQ7XHJcblxyXG5cdFx0Y29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHVybCwgb3BzKTtcclxuXHJcblx0XHRpZiAoIXJlc3Aub2sgfHwgcmVzcC5zdGF0dXMgPT09IDQwMSkgeyAvLyA0MDEgdW5hdXRob3JpemVkXHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoYFVuYWJsZSB0byAke21ldGhvZH0gZGF0YSB0byAke3VybH0uIHJlc3A6YCwgSlNPTi5zdHJpbmdpZnkocmVzcCkpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIGVkaXREYXRhQXJyYXkodXJsOiBzdHJpbmcsIGFwcGVuZDogYm9vbGVhbiwgdmFsdWVzOiBhbnlbXSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG5cclxuXHRcdGNvbnN0IGV4aXN0aW5nRGF0YTogYW55W10gPSAoXHJcblx0XHRcdC8vIHVybCBpcyBzYW1lIGZvciBnZXQvcHV0XHJcblx0XHRcdGF3YWl0IFV0aWxzLmdldEpTT048e2RhdGE6IGFueVtdfT4odXJsKVxyXG5cdFx0KS5kYXRhIHx8IFtdO1xyXG5cclxuXHRcdGxldCBuZXdBcnJheTtcclxuXHJcblx0XHRpZiAoYXBwZW5kKSB7XHJcblx0XHRcdG5ld0FycmF5ID0gZXhpc3RpbmdEYXRhLmNvbmNhdCh2YWx1ZXMpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7IC8vIHN1YnRyYWN0IGZyb20gZGF0YSBhcnJheVxyXG5cdFx0XHRpZiAoZXhpc3RpbmdEYXRhLmxlbmd0aCA9PT0gMClcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0bmV3QXJyYXkgPSBleGlzdGluZ0RhdGEuZmlsdGVyKHZhbCA9PiAhdmFsdWVzLmluY2x1ZGVzKHZhbCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBVdGlscy5wdXREYXRhKHVybCwgbmV3QXJyYXkpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHdhaXQobXM6IG51bWJlcikge1xyXG5cdFx0YXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY2hlY2tUb2tlbigpOiB2b2lkIHwgbmV2ZXIge1xyXG5cdFx0aWYgKFV0aWxzLkFDQ0VTU19UT0tFTiA9PT0gbnVsbClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQWNjZXNzIHRva2VuIG5vdCBzZXRcIik7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgbG9hZFRva2VuKCkge1xyXG5cdFx0VXRpbHMuQUNDRVNTX1RPS0VOID0gYXdhaXQgbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG5cdFx0XHRjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChWLm1pc2MudG9rZW5fa2V5LCByZXN1bHREYXRhID0+IHtcclxuXHJcblx0XHRcdFx0Y29uc3Qgc3VjY2VzcyA9IFV0aWxzLkFDQ0VTU19UT0tFTiAhPT0gbnVsbCB8fCByZXN1bHREYXRhW1YubWlzYy50b2tlbl9rZXldO1xyXG5cdFx0XHRcdGlmIChzdWNjZXNzKSByZXNvbHZlKHJlc3VsdERhdGFbVi5taXNjLnRva2VuX2tleV0pO1xyXG5cdFx0XHRcdGVsc2UgcmVqZWN0KCk7XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhY2Nlc3NUb2tlblByb21wdCgpIHtcclxuXHRcdGNvbnN0IG9wZW5PcHRpb25zID0gY29uZmlybShcIk1pc3NpbmcgYWNjZXNzIHRva2VuLCBwcmVzcyBPSyB0byBvcGVuIGV4dGVuc2lvbiBvcHRpb25zXCIpO1xyXG5cdFx0aWYgKG9wZW5PcHRpb25zKSAvLyBUT0RPIHNlbmQgdGFiIElEIHdpdGggdGhpcyBtZXNzYWdlP1xyXG5cdFx0XHRjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShuZXcgTWVzc2FnZURhdGEoXCJvcGVuIG9wdGlvbnNcIikpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHJ1bkNiKGNhbGxiYWNrRnVuY3Rpb246ICgpID0+IHZvaWQpIHtcclxuXHRcdGlmIChjYWxsYmFja0Z1bmN0aW9uICE9PSB1bmRlZmluZWQpXHJcblx0XHRcdGNhbGxiYWNrRnVuY3Rpb24oKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBzYWZlQ2I8RiBleHRlbmRzICgoLi4uYXJncykgPT4gdm9pZCk+KGNhbGxiYWNrRnVuY3Rpb246IEYgfCB1bmRlZmluZWQpOiBGIHtcclxuXHRcdGlmIChjYWxsYmFja0Z1bmN0aW9uICE9PSB1bmRlZmluZWQpXHJcblx0XHRcdHJldHVybiBjYWxsYmFja0Z1bmN0aW9uO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gKCgpID0+IHt9KSBhcyBGOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWVtcHR5XHJcblx0fVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHMvdXRpbHMudHMiLCJpbXBvcnQgeyBWIH0gZnJvbSBcIi4vdmFyc1wiO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgTWVzc2FnZURhdGEsIFN0YXRlTWVzc2FnZURhdGEgfSBmcm9tIFwiLi9vYmplY3RzXCI7XHJcblxyXG5kZWNsYXJlIGNvbnN0IGNvbXBvbmVudEhhbmRsZXI7XHJcbmNvbnN0IFFVRVJZID0ge2FjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZX07XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG5cclxuY29uc3QgQk9EWSA9ICQoXCJib2R5XCIpO1xyXG5jb25zdCBqdW1wQnV0dG9uID0gJChcIiNcIiArIFYuaWQucG9wdXBfanVtcF9idXR0b24pO1xyXG5jb25zdCBpbnNlcnRpb25Qb2ludCA9ICQoXCIjXCIgKyBWLmlkLnBvcHVwX2luc2VydGlvbl9wb2ludCk7XHJcblxyXG4kKFwiI1wiICsgVi5pZC5wb3B1cF9leF9uYW1lKS50ZXh0KGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkubmFtZSk7XHJcblxyXG5Qcm9taXNlLnJlc29sdmUoKVxyXG5cclxuXHQudGhlbigoKSA9PiBuZXcgUHJvbWlzZShuZXh0ID0+IHtcclxuXHJcblx0XHRjb25zdCBzdGFydFBpbmcgPSAkLm5vdygpO1xyXG5cclxuXHRcdHNlbmRNZXNzYWdlKG5ldyBNZXNzYWdlRGF0YShcInBpbmdcIiksIHJlc3AgPT4ge1xyXG5cdFx0XHRpZiAocmVzcCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJwYWdlIHBpbmdcIiwgcmVzcC5wb25nIC0gc3RhcnRQaW5nKTtcclxuXHJcblx0XHRcdFx0Qk9EWS5hZGRDbGFzcyhWLmNzc0NsYXNzLnBvcHVwX2Nvbm5lY3RlZCk7XHJcblx0XHRcdFx0bmV4dCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdEJPRFkuYWRkQ2xhc3MoVi5jc3NDbGFzcy5wb3B1cF9sb2FkZWQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0fSkpLnRoZW4oKCkgPT4gbmV3IFByb21pc2UobmV4dCA9PiB7XHJcblxyXG5cdFx0c2VuZE1lc3NhZ2UobmV3IE1lc3NhZ2VEYXRhKFwiY291bnQgdW5jaGVja2VkXCIpLCByZXNwID0+IHtcclxuXHRcdFx0aWYgKHJlc3AgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGlmIChyZXNwLmNvdW50ID09PSAwKVxyXG5cdFx0XHRcdFx0anVtcEJ1dHRvbi5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSkuYXR0cihcInRpdGxlXCIsIFYudG9vbHRpcC5wb3B1cF9ub191bmNoZWNrZWQpO1xyXG5cdFx0XHRcdG5leHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdH0pKS50aGVuKCgpID0+IG5ldyBQcm9taXNlKG5leHQgPT4ge1xyXG5cclxuXHRcdGxldCByZW1haW5pbmcgPSBPYmplY3Qua2V5cyhWLnN0YXRlKS5sZW5ndGg7XHJcblxyXG5cdFx0JC5lYWNoKFYuc3RhdGUsIChzdGF0ZU5hbWUsIHN0YXRlRGF0YSkgPT4ge1xyXG5cdFx0XHRzZW5kTWVzc2FnZShuZXcgU3RhdGVNZXNzYWdlRGF0YShcImdldFwiLCBzdGF0ZU5hbWUpLCByZXNwID0+IHtcclxuXHJcblx0XHRcdFx0Y29uc3QgZWwgPSAkKFV0aWxzLmZvcm1hdChWLmVsZW1lbnQucG9wdXBfc3RhdGVfc3dpdGNoLCB7bmFtZTogc3RhdGVOYW1lLCBkZXNjOiBzdGF0ZURhdGEuZGVzY30pKTtcclxuXHJcblx0XHRcdFx0ZWwuaW5zZXJ0QWZ0ZXIoaW5zZXJ0aW9uUG9pbnQpO1xyXG5cdFx0XHRcdGNvbXBvbmVudEhhbmRsZXIudXBncmFkZUVsZW1lbnQoZWwuZmluZChcImxhYmVsXCIpLmdldCgwKSk7XHJcblxyXG5cdFx0XHRcdGNvbnN0IGlucHV0RWwgPSBlbC5maW5kKFwiaW5wdXRcIikuZ2V0KDApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG5cdFx0XHRcdGVsLmNoYW5nZSgoKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCBuZXdTdGF0ZSA9IGlucHV0RWwuY2hlY2tlZDtcclxuXHJcblx0XHRcdFx0XHRzZXRNZGxDaGVja2VkKGlucHV0RWwsICFuZXdTdGF0ZSk7XHJcblx0XHRcdFx0XHRpbnB1dEVsLnRpdGxlID0gVi50b29sdGlwLndhaXRpbmc7XHJcblx0XHRcdFx0XHRpbnB1dEVsLmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0XHRzZW5kTWVzc2FnZShuZXcgU3RhdGVNZXNzYWdlRGF0YShcInNldFwiLCBzdGF0ZU5hbWUsIG5ld1N0YXRlKSwgc3VjY2VzcyA9PiB7XHJcblx0XHRcdFx0XHRcdGlmIChzdWNjZXNzKSB7XHJcblx0XHRcdFx0XHRcdFx0c2V0TWRsQ2hlY2tlZChpbnB1dEVsLCBuZXdTdGF0ZSk7XHJcblx0XHRcdFx0XHRcdFx0aW5wdXRFbC50aXRsZSA9IFwiXCI7IC8vIFRPRE8gc3RhdGUubG9uZ19kZXNjID9cclxuXHRcdFx0XHRcdFx0XHRpbnB1dEVsLmRpc2FibGVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRzZXRNZGxDaGVja2VkKGlucHV0RWwsIHJlc3Auc3RhdGUpO1xyXG5cclxuXHRcdFx0XHRpZiAoLS1yZW1haW5pbmcgPT09IDApIG5leHQoKTtcclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0anVtcEJ1dHRvbi5jbGljaygoKSA9PiB7XHJcblx0XHRcdHNlbmRNZXNzYWdlKG5ldyBNZXNzYWdlRGF0YShcImp1bXAgdG8gZmlyc3QgdW5jaGVja2VkXCIpLCByZXNwID0+IHdpbmRvdy5jbG9zZSgpKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9KSkudGhlbigoKSA9PiBuZXcgUHJvbWlzZShuZXh0ID0+IHtcclxuXHJcblx0XHRpbnNlcnRpb25Qb2ludC5yZW1vdmUoKTtcclxuXHRcdEJPRFkuYWRkQ2xhc3MoVi5jc3NDbGFzcy5wb3B1cF9sb2FkZWQpO1xyXG5cdFx0bmV4dCgpO1xyXG5cclxuXHR9KSk7XHJcblxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKGRhdGE6IE1lc3NhZ2VEYXRhLCBjYWxsYmFjaz86IChyZXNwb25zZTogYW55KSA9PiB2b2lkKSB7XHJcblx0Y2hyb21lLnRhYnMucXVlcnkoUVVFUlksIHRhYnMgPT4gY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFic1swXS5pZCwgZGF0YSwgY2FsbGJhY2spKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0TWRsQ2hlY2tlZChjaGVja2JveDogSFRNTElucHV0RWxlbWVudCwgY2hlY2tlZDogYm9vbGVhbikge1xyXG5cdCQoY2hlY2tib3gpXHJcblx0XHQucHJvcChcImNoZWNrZWRcIiwgY2hlY2tlZClcclxuXHRcdC5wYXJlbnQoKVxyXG5cdFx0LnRvZ2dsZUNsYXNzKFwiaXMtY2hlY2tlZFwiLCBjaGVja2VkKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHMvcG9wdXAudHMiXSwic291cmNlUm9vdCI6IiJ9