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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
/* harmony export (immutable) */ __webpack_exports__["c"] = format;
/* harmony export (immutable) */ __webpack_exports__["f"] = getOrDefault;
/* harmony export (immutable) */ __webpack_exports__["d"] = formatUrl;
/* harmony export (immutable) */ __webpack_exports__["e"] = getJSON;
/* harmony export (immutable) */ __webpack_exports__["h"] = putData;
/* harmony export (immutable) */ __webpack_exports__["b"] = editDataArray;
/* harmony export (immutable) */ __webpack_exports__["i"] = wait;
/* harmony export (immutable) */ __webpack_exports__["g"] = loadToken;
/* harmony export (immutable) */ __webpack_exports__["a"] = accessTokenPrompt;
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


let ACCESS_TOKEN;
function checkToken() {
    if (ACCESS_TOKEN === null)
        throw new Error("Access token not set");
}
function perPage(url, itemsPerPage) {
    return `${url}?per_page=${itemsPerPage}`;
}
function format(str, obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key))
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), obj[key]);
    }
    return str;
}
function getOrDefault(obj, key, def) {
    if (obj === undefined || obj[key] === undefined)
        return def;
    else
        return obj[key];
}
function formatUrl(url, formatObj) {
    if (formatObj !== undefined) {
        if (formatObj.perPage !== undefined)
            url = perPage(url, formatObj.perPage);
        url = format(url, formatObj);
    }
    return __WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].canvas.api.root_url + url;
}
function getJSON(url) {
    return __awaiter(this, void 0, void 0, function* () {
        checkToken();
        const resp = yield fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + ACCESS_TOKEN
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
function putData(url, data) {
    return __awaiter(this, void 0, void 0, function* () {
        checkToken();
        const bodyData = { ns: __WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].canvas.api.namespace, data };
        const method = data instanceof Array && data.length > 0 || data !== undefined ? "PUT" : "DELETE";
        if (method === "DELETE")
            delete bodyData.data;
        const ops = {
            method,
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + ACCESS_TOKEN
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
function editDataArray(url, append, values) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingData = (yield getJSON(url)).data || [];
        let newArray;
        if (append) {
            newArray = existingData.concat(values);
        }
        else {
            if (existingData.length === 0)
                return true;
            newArray = existingData.filter(val => !values.includes(val));
        }
        return putData(url, newArray);
    });
}
function wait(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    });
}
function loadToken() {
    return __awaiter(this, void 0, void 0, function* () {
        ACCESS_TOKEN = yield new Promise((resolve, reject) => {
            chrome.storage.sync.get(__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].misc.token_key, resultData => {
                const success = ACCESS_TOKEN !== null || resultData[__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].misc.token_key];
                if (success)
                    resolve(resultData[__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].misc.token_key]);
                else
                    reject();
            });
        });
    });
}
function accessTokenPrompt() {
    const openOptions = confirm("Missing access token, press OK to open extension options");
    if (openOptions)
        chrome.runtime.sendMessage(new __WEBPACK_IMPORTED_MODULE_1__objects__["e" /* MessageData */]("open options"));
}


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__objects__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vars__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scss_style_scss__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scss_style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__scss_style_scss__);
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
            yield __WEBPACK_IMPORTED_MODULE_1__utils__["g" /* loadToken */]();
        }
        catch (e) {
            __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* accessTokenPrompt */]();
            throw new __WEBPACK_IMPORTED_MODULE_0__objects__["d" /* Exception */]("Missing access token; must refresh", true);
        }
        const courseTabFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const colorsUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* formatUrl */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_colors);
                const courseColors = (yield __WEBPACK_IMPORTED_MODULE_1__utils__["e" /* getJSON */](colorsUrl)).custom_colors;
                const favoritesUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* formatUrl */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.favorite_courses);
                const favoriteCourses = yield __WEBPACK_IMPORTED_MODULE_1__utils__["e" /* getJSON */](favoritesUrl);
                for (const courseData of favoriteCourses) {
                    const color = courseColors["course_" + courseData.id];
                    __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseTabs.set(courseData.id, new __WEBPACK_IMPORTED_MODULE_0__objects__["b" /* CustomCourseTab */](courseData, color));
                }
            });
        };
        const navTabFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const navTabUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* formatUrl */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.navigation_tabs, {
                    perPage: 25,
                    courseID: __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID
                });
                const navTabs = yield __WEBPACK_IMPORTED_MODULE_1__utils__["e" /* getJSON */](navTabUrl);
                for (const tab of navTabs)
                    __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].navTabs.set(tab.id, new __WEBPACK_IMPORTED_MODULE_0__objects__["j" /* NavTab */](tab));
            });
        };
        const assignmentFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const assignmentsUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* formatUrl */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.assignments, {
                    perPage: 1000,
                    courseID: __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID
                });
                const assignments = yield __WEBPACK_IMPORTED_MODULE_1__utils__["e" /* getJSON */](assignmentsUrl);
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
                const modulesUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* formatUrl */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.modules, {
                    perPage: 25,
                    courseID: __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID
                });
                const modules = yield __WEBPACK_IMPORTED_MODULE_1__utils__["e" /* getJSON */](modulesUrl);
                for (const moduleData of modules) {
                    __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].modules.set(moduleData.id, new __WEBPACK_IMPORTED_MODULE_0__objects__["g" /* Module */](moduleData));
                }
                const moduleIds = Array.from(__WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].modules.keys());
                const itemSetPromises = moduleIds.map(modId => __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].modules.get(modId))
                    .filter(mod => mod.itemCount > 0)
                    .map(module => {
                    const moduleItemsUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* formatUrl */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.module_items, {
                        moduleID: module.id,
                        courseID: __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID,
                        perPage: module.itemCount
                    });
                    return __WEBPACK_IMPORTED_MODULE_1__utils__["e" /* getJSON */](moduleItemsUrl);
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
                    const fileDataUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* formatUrl */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.file_direct, {
                        fileID: item.contentId,
                        courseID: __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID
                    });
                    return __WEBPACK_IMPORTED_MODULE_1__utils__["e" /* getJSON */](fileDataUrl);
                });
                const files = yield Promise.all(filePromises);
                for (const file of files)
                    __WEBPACK_IMPORTED_MODULE_0__objects__["h" /* ModuleItem */].byContentId.get(file.id).setFileData(file);
            });
        };
        const customDataFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const customDataUrl = __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* formatUrl */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_data, { dataPath: "" });
                const customData = (yield __WEBPACK_IMPORTED_MODULE_1__utils__["e" /* getJSON */](customDataUrl)).data;
                if (customData === undefined)
                    return;
                const complete = __WEBPACK_IMPORTED_MODULE_1__utils__["f" /* getOrDefault */](customData.completed_assignments, __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID, new Array());
                const hidden = __WEBPACK_IMPORTED_MODULE_1__utils__["f" /* getOrDefault */](customData.hidden_assignments, __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID, new Array());
                for (const [modItemId, modItem] of __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].moduleItems) {
                    modItem.checked = complete.includes(modItemId);
                    modItem.hidden = hidden.includes(modItemId);
                }
                const activeStates = customData.active_states || [];
                $.each(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].state, (name, stateData) => {
                    const stateObj = new __WEBPACK_IMPORTED_MODULE_0__objects__["l" /* State */](name, stateData, activeStates.includes(name));
                    __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].states.set(name, stateObj);
                });
                const tabPositions = __WEBPACK_IMPORTED_MODULE_1__utils__["f" /* getOrDefault */](customData.tab_positions, __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID, {});
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
            $insertionPoint.after(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* format */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].element.course_link, {
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
                    $(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* format */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].element.checkbox, { item_id: itemId })).appendTo(parentEl);
                UI.updateCheckbox(item);
                item.checkboxElement.show();
            }
            if (hasHideButton) {
                item.hideElement =
                    $(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* format */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].element.hide_button, { item_id: itemId })).appendTo(parentEl);
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
            const formatted = __WEBPACK_IMPORTED_MODULE_1__utils__["c" /* format */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].element.toc_item, { item_name: mod.name, item_id: modId });
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
                const element = __WEBPACK_IMPORTED_MODULE_1__utils__["c" /* format */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].element.download_button, {
                    file_url: item.fileData.url,
                    filename: item.fileData.display_name
                });
                $(element).insertBefore(item.checkboxElement);
            }
            else if (item.type === __WEBPACK_IMPORTED_MODULE_0__objects__["i" /* ModuleItemType */].EXTERNAL_URL) {
                const element = __WEBPACK_IMPORTED_MODULE_1__utils__["c" /* format */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].element.url_button, {
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
            const url = __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* formatUrl */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_data, {
                dataPath: "/" + __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.data_urls.active_states
            });
            return __WEBPACK_IMPORTED_MODULE_1__utils__["b" /* editDataArray */](url, state, [stateName]);
        });
    }
    static setNavTabPosition(tab, position) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* formatUrl */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_data, {
                dataPath: ["", __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.data_urls.tab_positions, __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID, tab.id].join("/")
            });
            const success = yield __WEBPACK_IMPORTED_MODULE_1__utils__["h" /* putData */](url, position);
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
            const url = __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* formatUrl */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_data, {
                dataPath: ["", __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.data_urls.completed_assignments, __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID].join("/")
            });
            const success = yield __WEBPACK_IMPORTED_MODULE_1__utils__["b" /* editDataArray */](url, status, [id]);
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
            const url = __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* formatUrl */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.urls.custom_data, {
                dataPath: ["", __WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].canvas.api.data_urls.hidden_assignments, __WEBPACK_IMPORTED_MODULE_0__objects__["c" /* DATA */].courseID].join("/")
            });
            const success = yield __WEBPACK_IMPORTED_MODULE_1__utils__["b" /* editDataArray */](url, newState, [id]);
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
                yield __WEBPACK_IMPORTED_MODULE_1__utils__["i" /* wait */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].ui.fade_time);
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
            const backgroundImage = __WEBPACK_IMPORTED_MODULE_1__utils__["c" /* format */](__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* V */].misc.toc_background, { percent });
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


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);