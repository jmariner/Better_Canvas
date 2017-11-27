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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDY1MTNkOTYzZDQzOTI4YzUxZTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL3ZhcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL29iamVjdHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy90cy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7SUFtR0M7UUFqR0EsV0FBTSxHQUFHLGNBQWMsQ0FBQztRQUV4QixhQUFRLEdBQUc7WUFDVixNQUFNLEVBQUUsUUFBUTtZQUNoQixlQUFlLEVBQUUsaUJBQWlCO1lBQ2xDLGdCQUFnQixFQUFFLGtCQUFrQjtZQUNwQyxXQUFXLEVBQUUsYUFBYTtZQUMxQixLQUFLLEVBQUUsWUFBWTtZQUNuQixnQkFBZ0IsRUFBRSxrQkFBa0I7WUFDcEMsV0FBVyxFQUFFLFFBQVE7WUFDckIsV0FBVyxFQUFFLFVBQVU7WUFDdkIsYUFBYSxFQUFFLGVBQWU7WUFDOUIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsS0FBSyxFQUFFLE9BQU87WUFDZCxTQUFTLEVBQUUsY0FBYztZQUN6QixRQUFRLEVBQUUsY0FBYztZ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WUFBWSxDQUFDLE9BQWU7UUFDbEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxnREFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxVQUFVLENBQUMsTUFBTSxPQUFPLENBQUMsV0FBVyxDQUFDLGdEQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FFRCIsImZpbGUiOiJjb250ZW50X3NjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDQ2NTEzZDk2M2Q0MzkyOGM1MWUxIiwiY2xhc3MgU2Fzc1ZhcnMge1xyXG5cclxuXHRwcmVmaXggPSBcImJldHRlckNhbnZhc1wiO1xyXG5cclxuXHRjc3NDbGFzcyA9IHtcclxuXHRcdGFjdGl2ZTogXCJhY3RpdmVcIixcclxuXHRcdGNoZWNrYm94X3BhcmVudDogXCJjaGVja2JveC1wYXJlbnRcIixcclxuXHRcdGNoZWNrYm94X2NoZWNrZWQ6IFwiY2hlY2tib3gtY2hlY2tlZFwiLFxyXG5cdFx0Y2hlY2tib3hfdGQ6IFwiY2hlY2tib3gtdGRcIixcclxuXHRcdGZsYXNoOiBcImFuaW0tZmxhc2hcIixcclxuXHRcdGNvdXJzZV9saW5rX3RleHQ6IFwiY291cnNlLWxpbmstdGV4dFwiLFxyXG5cdFx0aXRlbV9oaWRkZW46IFwiaGlkZGVuXCIsXHJcblx0XHRoaWRlX2J1dHRvbjogXCJidG4taGlkZVwiLFxyXG5cdFx0aGlkZV9kaXNhYmxlZDogXCJoaWRlLWRpc2FibGVkXCIsXHJcblx0XHR0b2NfcmF0aW86IFwidG9jLXJhdGlvXCIsXHJcblx0XHR0b2NfdGl0bGU6IFwidG9jLXRpdGxlXCIsXHJcblx0XHRmaXhlZDogXCJmaXhlZFwiLFxyXG5cdFx0aXRlbV9pY29uOiBcImljb24td3JhcHBlclwiLFxyXG5cdFx0ZG93bmxvYWQ6IFwiZG93bmxvYWQtYnRuXCIsXHJcblx0XHRleHRlcm5hbF91cmw6IFwidXJsLWJ0blwiLFxyXG5cclxuXHRcdHBvcHVwX2xvYWRlZDogXCJkb25lLWxvYWRpbmdcIixcclxuXHRcdHBvcHVwX2Nvbm5lY3RlZDogXCJwYWdlLWNvbm5lY3RlZFwiLFxyXG5cdFx0cG9wdXBfcmVxdWlyZV9wYWdlOiBcInJlcXVpcmUtcGFnZVwiXHJcblx0fTtcclxuXHJcblx0ZGF0YUF0dHIgPSB7XHJcblx0XHR0b2NfbW9kdWxlX2lkOiBcInRvYy1tb2R1bGUtaWRcIixcclxuXHRcdHRvY190b3RhbDogXCJ0b2MtdG90YWxcIixcclxuXHRcdHRvY19jaGVja2VkX2NvdW50OiBcInRvYy1jaGVja2VkLWNvdW50XCIsXHJcblx0XHR0b2NfcGVyY2VudGFnZTogXCJ0b2MtcGVyY2VudGFnZVwiLFxyXG5cdFx0bW9kX2l0ZW1faWQ6IFwiaXRlbS1pZFwiLFxyXG5cdFx0Y291cnNlX25hbWU6IFwiY291cnNlLW5hbWVcIixcclxuXHRcdGNvdXJzZV9jb2RlOiBcImNvdXJzZS1jb2RlXCIsXHJcblx0XHRkZWZfaW5kZW50OiBcImRlZmF1bHQtaW5kZW50XCJcclxuXHR9O1xyXG5cclxuXHRpZCA9IHtcclxuXHRcdHRvYzogXCJ0b2NcIixcclxuXHRcdGp1bXBfYnV0dG9uOiBcImp1bXAtdG8tdG9wXCIsXHJcblxyXG5cdFx0cG9wdXBfcGFnZV9taXNzaW5nOiBcInBhZ2UtbWlzc2luZy1lcnJvclwiLFxyXG5cdFx0cG9wdXBfZXhfbmFtZTogXCJleHRlbnNpb24tbmFtZVwiLFxyXG5cdFx0cG9wdXBfaW5zZXJ0aW9uX3BvaW50OiBcImluc2VydGlvbi1wb2ludFwiLFxyXG5cdFx0cG9wdXBfanVtcF9idXR0b246IFwianVtcC10b1wiXHJcblx0fTtcclxuXHJcblx0Y29sb3IgPSB7XHJcblx0XHR0b2NfZmlsbDogXCJyZ2JhKDAsIDI1NSwgMCwgLjc1KVwiLFxyXG5cdFx0dG9jX2JvcmRlcjogXCJyZ2IoMTAyLCAxMjAsIDEzNSlcIixcclxuXHRcdHRvY190aXRsZTogXCJ2YXIoLS1pYy1icmFuZC1wcmltYXJ5KVwiLCAvLyB3YXMgXCJyZ2IoNTcsIDc1LCA4OClcIixcclxuXHRcdGNoZWNrYm94X2NoZWNrOiBcInJnYigyMiwgMTYwLCAxMzMpXCIsXHJcblx0XHRjaGVja2JveF9ib3JkZXI6IFwicmdiKDEwMiwgMTIwLCAxMzUpXCIsXHJcblx0XHRoaWdobGlnaHRfb3JhbmdlOiBcInJnYigyNTUsIDE1MiwgMClcIixcclxuXHRcdGhpZ2hsaWdodF9yZWQ6IFwicmdiKDI1NSwgMCwgMClcIixcclxuXHRcdGp1bXBfYnV0dG9uOiBcInJnYig1NywgNzUsIDg4KVwiXHJcblx0fTtcclxuXHJcblx0dWkgPSB7XHJcblx0XHR0b3BfaW5zaWRlX3JhdGlvOiAwLjA1LFxyXG5cdFx0c2Nyb2xsX3RvcF9vZmZzZXQ6IDUsXHJcblx0XHRqdW1wX3RvcF9jdXRvZmY6IDEwMCxcclxuXHRcdHRvY190b3BfbWFyZ2luOiAzMixcclxuXHRcdHNjcm9sbF90aW1lOiA1MDAsXHJcblx0XHRmYWRlX3RpbWU6IDUwMCxcclxuXHRcdHN1YmhlYWRlcl9pbmRlbnQ6IDAsXHJcblx0XHRtYWluX2luZGVudDogMVxyXG5cdH07XHJcblxyXG5cdHN0YXRlID0ge1xyXG5cdFx0c2hvd19oaWRkZW46IHtcclxuXHRcdFx0Y3NzQ2xhc3M6IFwic2hvdy1oaWRkZW5cIixcclxuXHRcdFx0cGFnZXM6IFtcIm1vZHVsZXNcIl0sXHJcblx0XHRcdGRlc2M6IFwiU2hvdyBoaWRkZW4gaXRlbXNcIlxyXG5cdFx0fSxcclxuXHRcdGhpZGVfY2hlY2tlZDoge1xyXG5cdFx0XHRjc3NDbGFzczogXCJoaWRlLWNoZWNrZWRcIixcclxuXHRcdFx0cGFnZXM6IFtcIm1vZHVsZXNcIiwgXCJncmFkZXNcIl0sXHJcblx0XHRcdGRlc2M6IFwiSGlkZSBjb21wbGV0ZWQgaXRlbXNcIlxyXG5cdFx0fSxcclxuXHRcdGhpZ2hsaWdodF91bmNoZWNrZWQ6IHtcclxuXHRcdFx0Y3NzQ2xhc3M6IFwibWFyay11bmNoZWNrZWRcIixcclxuXHRcdFx0cGFnZXM6IFtcIm1vZHVsZXNcIiwgXCJncmFkZXNcIl0sXHJcblx0XHRcdGRlc2M6IFwiTWFyayB1bmNoZWNrZWQgaXRlbXNcIlxyXG5cdFx0fSxcclxuXHRcdGRpc2FibGVfaW5kZW50X292ZXJyaWRlOiB7XHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIkRpc2FibGUgaW5kZW50IG92ZXJyaWRlc1wiXHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0c2Fzc0V4cG9ydHM6IFNhc3NWYXJzO1xyXG5cclxuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBtZXRhID0ge1xyXG5cdFx0ZGF0YVByZWZpeFR5cGU6IFwiZGF0YUF0dHJcIixcclxuXHRcdHByZWZpeFR5cGVzOiBbXCJjc3NDbGFzc1wiLCBcImRhdGFBdHRyXCIsIFwiaWRcIl0sXHJcblx0XHRwcmVmaXhFeGNsdWRlOiBbXCJwb3B1cF8uK1wiXVxyXG5cdH07XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdGNvbnN0IHR5cGVzID0gbmV3IFNldChTYXNzVmFycy5tZXRhLnByZWZpeFR5cGVzKTtcclxuXHJcblx0XHRjb25zdCBwcm9jZXNzT2JqZWN0ID0gKG9iajogb2JqZWN0LCBvYmpOYW1lOiBzdHJpbmcpID0+IHtcclxuXHJcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG5cdFx0XHRcdGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0XHRsZXQgdmFsOiBvYmplY3QgfCBzdHJpbmcgfCBudW1iZXIgPSBvYmpba2V5XTtcclxuXHJcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIpIHtcclxuXHJcblx0XHRcdFx0XHRwcm9jZXNzT2JqZWN0KHZhbCwga2V5KTtcclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcclxuXHJcblx0XHRcdFx0XHRjb25zdCBleGNsdWRlZCA9IFNhc3NWYXJzLm1ldGEucHJlZml4RXhjbHVkZVxyXG5cdFx0XHRcdFx0XHQubWFwKHN0ciA9PiBuZXcgUmVnRXhwKFwiXlwiICsgc3RyICsgXCIkXCIpKVxyXG5cdFx0XHRcdFx0XHQuc29tZShyZWdleCA9PiByZWdleC50ZXN0KGtleSkpO1xyXG5cclxuXHRcdFx0XHRcdGlmICghZXhjbHVkZWQgJiYgKHR5cGVzLmhhcyhvYmpOYW1lKSB8fCB0eXBlcy5oYXMoa2V5KSkpXHJcblx0XHRcdFx0XHRcdHZhbCA9IHRoaXMucHJlZml4ICsgXCItXCIgKyB2YWw7XHJcblxyXG5cdFx0XHRcdFx0aWYgKG9iak5hbWUgPT09IFNhc3NWYXJzLm1ldGEuZGF0YVByZWZpeFR5cGUpXHJcblx0XHRcdFx0XHRcdHZhbCA9IFwiZGF0YS1cIiArIHZhbDtcclxuXHJcblx0XHRcdFx0XHRvYmpba2V5XSA9IHZhbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdHByb2Nlc3NPYmplY3QodGhpcywgXCJyb290XCIpO1xyXG5cclxuXHRcdHRoaXMuc2Fzc0V4cG9ydHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzKTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5jbGFzcyBWYXJzIGV4dGVuZHMgU2Fzc1ZhcnMge1xyXG5cclxuXHR0b29sdGlwID0ge1xyXG5cdFx0bWFya19jb21wbGV0ZTogXCJNYXJrIGFzIGNvbXBsZXRlZFwiLFxyXG5cdFx0bWFya19pbmNvbXBsZXRlOiBcIk1hcmsgYXMgaW5jb21wbGV0ZVwiLFxyXG5cdFx0aGlkZTogXCJIaWRlIHRoaXMgaXRlbVwiLFxyXG5cdFx0dW5oaWRlOiBcIlVuaGlkZSB0aGlzIGl0ZW1cIixcclxuXHRcdGhpZGVfZGlzYWJsZWQ6IFwiQ2Fubm90IGhpZGUgZ3JhZGVkIGl0ZW1cIixcclxuXHRcdGp1bXBfYnV0dG9uOiBcIkp1bXAgdG8gdG9wXCIsXHJcblx0XHR3YWl0aW5nOiBcIldhaXRpbmcuLi5cIixcclxuXHRcdGRvd25sb2FkOiBcIkRvd25sb2FkIGZpbGU6IFxcXCJ7ZmlsZW5hbWV9XFxcIlwiLFxyXG5cdFx0ZXh0ZXJuYWxfdXJsOiBcIlZpc2l0IGV4dGVybmFsIFVSTFwiLFxyXG5cdFx0aGFzX3N1Ym1pc3Npb246IFwiQXNzaWdubWVudCBoYXMgc3VibWlzc2lvblwiLFxyXG5cdFx0cG9wdXBfbm9fdW5jaGVja2VkOiBcIk5vIHVuY2hlY2tlZCBpdGVtcyB0byBqdW1wIHRvXCJcclxuXHR9O1xyXG5cclxuXHRtaXNjID0ge1xyXG5cdFx0dG9jX2JhY2tncm91bmQ6IGAtd2Via2l0LWxpbmVhci1ncmFkaWVudChsZWZ0LCAke3RoaXMuY29sb3IudG9jX2ZpbGx9IHtwZXJjZW50fSUsIHRyYW5zcGFyZW50IHtwZXJjZW50fSUpYCxcclxuXHRcdHRva2VuX2tleTogXCJhY2Nlc3NUb2tlblwiXHJcblx0fTtcclxuXHJcblx0ZWxlbWVudCA9IHtcclxuXHJcblx0XHRjaGVja2JveDpcclxuXHRcdFx0XHRgPGRpdiBzdHlsZT0nZGlzcGxheTpub25lJyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLmNoZWNrYm94X3BhcmVudH0nPlxyXG5cdFx0XHRcdFx0PGlucHV0IHR5cGU9J2NoZWNrYm94JyAke3RoaXMuZGF0YUF0dHIubW9kX2l0ZW1faWR9PSd7aXRlbV9pZH0nPlxyXG5cdFx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0ZG93bmxvYWRfYnV0dG9uOlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuZG93bmxvYWR9JyB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuZG93bmxvYWR9Jz5cclxuXHRcdFx0XHRcdDxhIGhyZWY9XCJ7ZmlsZV91cmx9XCI+PC9hPlxyXG5cdFx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0dXJsX2J1dHRvbjpcclxuXHRcdFx0XHRgPGRpdiBzdHlsZT0nZGlzcGxheTpub25lJyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLmV4dGVybmFsX3VybH0nIHRpdGxlPScke3RoaXMudG9vbHRpcC5leHRlcm5hbF91cmx9Jz5cclxuXHRcdFx0XHRcdDxhIGhyZWY9XCJ7ZXh0ZXJuYWxfdXJsfVwiIGNsYXNzPVwibm90X2V4dGVybmFsXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PC9hPlxyXG5cdFx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0aGlkZV9idXR0b246XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5oaWRlX2J1dHRvbn0nPlxyXG5cdFx0XHRcdFx0PGkgJHt0aGlzLmRhdGFBdHRyLm1vZF9pdGVtX2lkfT0ne2l0ZW1faWR9Jz48L2k+XHJcblx0XHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRjb3Vyc2VfbGluazpcclxuXHRcdFx0YDxsaSBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjoge3RhYkNvbG9yfScgY2xhc3M9J21lbnUtaXRlbSBpYy1hcHAtaGVhZGVyX19tZW51LWxpc3QtaXRlbSc+XHJcblx0XHRcdFx0PGEgaHJlZj0nL2NvdXJzZXMve3RhYklEfS9tb2R1bGVzJyBjbGFzcz0naWMtYXBwLWhlYWRlcl9fbWVudS1saXN0LWxpbmsnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz0nbWVudS1pdGVtLWljb24tY29udGFpbmVyJyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PGk+PC9pPjwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjoge3RhYkNvbG9yfTsgYm9yZGVyLXJpZ2h0LWNvbG9yOiB7dGFiQ29sb3J9J1xyXG5cdFx0XHRcdFx0XHRcdCR7dGhpcy5kYXRhQXR0ci5jb3Vyc2VfbmFtZX09J3tuYW1lfScgJHt0aGlzLmRhdGFBdHRyLmNvdXJzZV9jb2RlfT0ne2NvZGV9J1xyXG5cdFx0XHRcdFx0XHRcdGNsYXNzPSdtZW51LWl0ZW1fX3RleHQgJHt0aGlzLmNzc0NsYXNzLmNvdXJzZV9saW5rX3RleHR9Jz48L2Rpdj5cclxuXHRcdFx0XHQ8L2E+XHJcblx0XHRcdDwvbGk+YCxcclxuXHJcblx0XHR0b2M6XHJcblx0XHRcdGA8ZGl2IGlkPScke3RoaXMuaWQudG9jfScgY2xhc3M9J2ljLWFwcC1jb3Vyc2UtbWVudSBsaXN0LXZpZXcnPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy50b2NfdGl0bGV9Jz5UYWJsZSBvZiBDb250ZW50czwvZGl2PlxyXG5cdFx0XHRcdDxuYXY+PHVsPjwvdWw+PC9uYXY+XHJcblx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0dG9jX2l0ZW06XHJcblx0XHRcdGA8bGk+XHJcblx0XHRcdFx0PGEgaHJlZj0nIycgdGl0bGU9J3tpdGVtX25hbWV9Jz5cclxuXHRcdFx0XHRcdHtpdGVtX25hbWV9XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPScke3RoaXMuY3NzQ2xhc3MudG9jX3JhdGlvfScgJHt0aGlzLmRhdGFBdHRyLnRvY19tb2R1bGVfaWR9PSd7aXRlbV9pZH0nPjwvZGl2PlxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0PC9saT5gLFxyXG5cclxuXHRcdGp1bXBfYnV0dG9uOlxyXG5cdFx0XHRgPGRpdiBpZD0nJHt0aGlzLmlkLmp1bXBfYnV0dG9ufSc+XHJcblx0XHRcdFx0PGkgdGl0bGU9JyR7dGhpcy50b29sdGlwLmp1bXBfYnV0dG9ufSc+PC9pPlxyXG5cdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHN1Ym1pc3Npb25faWNvbjpcclxuXHRcdFx0YDxkaXYgdGl0bGU9JyR7dGhpcy50b29sdGlwLmhhc19zdWJtaXNzaW9ufScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5pdGVtX2ljb259Jz5cclxuXHRcdFx0XHQ8aSBjbGFzcz0naWNvbi1wdWJsaXNoJz48L2k+XHJcblx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0cG9wdXBfc3RhdGVfc3dpdGNoOlxyXG5cdFx0XHRgPGRpdiBjbGFzcz1cInN3aXRjaCAke3RoaXMuY3NzQ2xhc3MucG9wdXBfcmVxdWlyZV9wYWdlfVwiPlxyXG5cdFx0XHRcdDxsYWJlbCBmb3I9XCJ7bmFtZX1cIiBjbGFzcz1cIm1kbC1zd2l0Y2ggbWRsLWpzLXN3aXRjaCBtZGwtanMtcmlwcGxlLWVmZmVjdFwiPlxyXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJtZGwtc3dpdGNoX19sYWJlbFwiPntkZXNjfTwvc3Bhbj5cclxuXHRcdFx0XHRcdDxpbnB1dCBpZD1cIntuYW1lfVwiIHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwibWRsLXN3aXRjaF9faW5wdXRcIj5cclxuXHRcdFx0XHQ8L2xhYmVsPlxyXG5cdFx0XHQ8L2Rpdj5gXHJcblx0fTtcclxuXHJcblx0Ly8gc2VwYXJhdGVkIGZvciB1c2UgaW4gdGVtcGxhdGUgc3RyaW5ncyBiZWxvd1xyXG5cdHByaXZhdGUgX2NhbnZhc05hbWVzcGFjZSA9IGBjb20uam1hcmluZXIuJHt0aGlzLnByZWZpeH1gO1xyXG5cclxuXHRjYW52YXMgPSB7XHJcblx0XHRzZWxlY3Rvcjoge1xyXG5cdFx0XHRtb2R1bGU6IFwiZGl2LmNvbnRleHRfbW9kdWxlXCIsXHJcblx0XHRcdG1vZHVsZV9pdGVtOiBcImxpLmNvbnRleHRfbW9kdWxlX2l0ZW1cIixcclxuXHRcdFx0bW9kdWxlX2l0ZW1zOiBcInVsLmNvbnRleHRfbW9kdWxlX2l0ZW1zXCIsXHJcblx0XHRcdHN1YmhlYWRlcjogXCJsaS5jb250ZXh0X21vZHVsZV9zdWJfaGVhZGVyXCIsXHJcblx0XHRcdG5vdF9zdWJoZWFkZXI6IFwibGkuY29udGV4dF9tb2R1bGVfaXRlbTpub3QoLmNvbnRleHRfbW9kdWxlX3N1Yl9oZWFkZXIpXCIsXHJcblx0XHRcdG5hdl90YWJzOiBcInVsI3NlY3Rpb24tdGFic1wiXHJcblx0XHR9LFxyXG5cdFx0YXBpOiB7XHJcblx0XHRcdG5hbWVzcGFjZTogdGhpcy5fY2FudmFzTmFtZXNwYWNlLFxyXG5cdFx0XHRyb290X3VybDogXCIvYXBpL3YxL1wiLFxyXG5cdFx0XHRwZXJfcGFnZTogMTAwLFxyXG5cdFx0XHR1cmxzOiB7XHJcblx0XHRcdFx0Y3VzdG9tX2RhdGE6IGB1c2Vycy9zZWxmL2N1c3RvbV9kYXRhe2RhdGFQYXRofT9ucz0ke3RoaXMuX2NhbnZhc05hbWVzcGFjZX1gLFxyXG5cdFx0XHRcdGZhdm9yaXRlX2NvdXJzZXM6IFwidXNlcnMvc2VsZi9mYXZvcml0ZXMvY291cnNlc1wiLFxyXG5cdFx0XHRcdGN1c3RvbV9jb2xvcnM6IFwidXNlcnMvc2VsZi9jb2xvcnNcIixcclxuXHRcdFx0XHRhc3NpZ25tZW50czogXCJ1c2Vycy9zZWxmL2NvdXJzZXMve2NvdXJzZUlEfS9hc3NpZ25tZW50c1wiLFxyXG5cdFx0XHRcdG1vZHVsZXM6IFwiY291cnNlcy97Y291cnNlSUR9L21vZHVsZXNcIixcclxuXHRcdFx0XHRtb2R1bGVfaXRlbXM6IFwiY291cnNlcy97Y291cnNlSUR9L21vZHVsZXMve21vZHVsZUlEfS9pdGVtc1wiLFxyXG5cdFx0XHRcdGZpbGVfZGlyZWN0OiBcImNvdXJzZXMve2NvdXJzZUlEfS9maWxlcy97ZmlsZUlEfVwiLFxyXG5cdFx0XHRcdG5hdmlnYXRpb25fdGFiczogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vdGFic1wiXHJcblx0XHRcdH0sXHJcblx0XHRcdGRhdGFfdXJsczoge1xyXG5cdFx0XHRcdGFjdGl2ZV9zdGF0ZXM6IFwiYWN0aXZlX3N0YXRlc1wiLFxyXG5cdFx0XHRcdGNvbXBsZXRlZF9hc3NpZ25tZW50czogXCJjb21wbGV0ZWRfYXNzaWdubWVudHNcIixcclxuXHRcdFx0XHRoaWRkZW5fYXNzaWdubWVudHM6IFwiaGlkZGVuX2Fzc2lnbm1lbnRzXCIsXHJcblx0XHRcdFx0dGFiX3Bvc2l0aW9uczogXCJ0YWJfcG9zaXRpb25zXCJcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmNvbnN0IFZBUlMgPSBuZXcgVmFycygpO1xyXG5leHBvcnQgY29uc3QgViA9IFZBUlM7XHJcbmV4cG9ydCBkZWZhdWx0IFZBUlMuc2Fzc0V4cG9ydHM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90cy92YXJzLnRzIiwiaW1wb3J0ICogYXMgQ2FudmFzQVBJIGZyb20gXCIuL2NhbnZhc19hcGlcIjtcclxuXHJcbmNsYXNzIERhdGEge1xyXG5cdGNvdXJzZVBhZ2U6IENhbnZhc1BhZ2U7XHJcblx0Y291cnNlSUQ6IG51bWJlcjtcclxuXHRtb2R1bGVzOiBNYXA8bnVtYmVyLCBNb2R1bGU+OyAvLyBtb2R1bGUgaWQgPT4gYXJyYXkgb2YgTW9kdWxlSXRlbVxyXG5cdG1vZHVsZUl0ZW1zOiBNYXA8bnVtYmVyLCBNb2R1bGVJdGVtPjsgLy8gbW9kdWxlIGl0ZW0gaWQgPT4gTW9kdWxlSXRlbVxyXG5cdHN0YXRlczogTWFwPHN0cmluZywgU3RhdGU+OyAvLyBzdGF0ZU5hbWUgPT4gU3RhdGVcclxuXHRjb3Vyc2VUYWJzOiBNYXA8bnVtYmVyLCBDdXN0b21Db3Vyc2VUYWI+OyAvLyBjb3Vyc2UgaWQgPT4gY291cnNlIHRhYlxyXG5cdG5hdlRhYnM6IE1hcDxzdHJpbmcsIE5hdlRhYj47IC8vIHRhYiBpZCBzdHJpbmcgPT4gdGFiXHJcblx0b25NYWluUGFnZTogYm9vbGVhbjtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0ZXh0ZW5zaW9uSWQ6IHN0cmluZztcclxuXHRlbGVtZW50czoge2p1bXBfYnV0dG9uOiBKUXVlcnksIHRvYzogSlF1ZXJ5fTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLm1vZHVsZXMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLm1vZHVsZUl0ZW1zID0gbmV3IE1hcCgpO1xyXG5cdFx0dGhpcy5zdGF0ZXMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLmNvdXJzZVRhYnMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLm5hdlRhYnMgPSBuZXcgTWFwKCk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50cyA9IHtqdW1wX2J1dHRvbjogbnVsbCwgdG9jOiBudWxsfTtcclxuXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBQYWdlIHtcclxuXHJcblx0Ym9keTogSlF1ZXJ5O1xyXG5cdHNjcm9sbGluZ0VsZW1lbnQ6IEpRdWVyeTtcclxuXHRtYWluPzogSlF1ZXJ5O1xyXG5cdGNvbnRlbnQ/OiBKUXVlcnk7XHJcblx0bGVmdD86IEpRdWVyeTtcclxuXHRzaWRlYmFyOiBKUXVlcnk7XHJcblx0Z3JhZGVzPzogSlF1ZXJ5O1xyXG5cclxuXHRpbml0aWFsaXplKCkge1xyXG5cclxuXHRcdHRoaXMuYm9keSA9ICQoXCJib2R5XCIpO1xyXG5cdFx0dGhpcy5zY3JvbGxpbmdFbGVtZW50ID0gJChkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IGRvY3VtZW50LmJvZHkpO1xyXG5cdFx0dGhpcy5zaWRlYmFyID0gJChcIiNtZW51XCIpO1xyXG5cdFx0dGhpcy5tYWluID0gJChcIiNtYWluXCIpO1xyXG5cclxuXHRcdGlmIChEQVRBLm9uTWFpblBhZ2UpIHtcclxuXHRcdFx0dGhpcy5jb250ZW50ID0gJChcIiNjb250ZW50XCIpO1xyXG5cdFx0XHR0aGlzLmxlZnQgPSAkKFwiI2xlZnQtc2lkZVwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoREFUQS5jb3Vyc2VQYWdlID09PSBDYW52YXNQYWdlLkdSQURFUylcclxuXHRcdFx0dGhpcy5ncmFkZXMgPSAkKFwiI2dyYWRlc19zdW1tYXJ5XCIpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEN1c3RvbUNvdXJzZVRhYiB7XHJcblx0cmVhZG9ubHkgaWQ6IG51bWJlcjtcclxuXHRyZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcblx0cmVhZG9ubHkgY29kZTogc3RyaW5nO1xyXG5cdHJlYWRvbmx5IGNvbG9yOiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGNvdXJzZURhdGE6IENhbnZhc0FQSS5Db3Vyc2UsIGNvbG9yOiBzdHJpbmcpIHtcclxuXHRcdHRoaXMuaWQgPSBjb3Vyc2VEYXRhLmlkO1xyXG5cdFx0dGhpcy5uYW1lID0gY291cnNlRGF0YS5uYW1lO1xyXG5cdFx0dGhpcy5jb2RlID0gY291cnNlRGF0YS5jb3Vyc2VfY29kZTtcclxuXHRcdHRoaXMuY29sb3IgPSBjb2xvcjtcclxuXHR9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2VGFiIHtcclxuXHRyZWFkb25seSBpZDogc3RyaW5nO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgaW5pdFBvc2l0aW9uOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfcG9zaXRpb246IG51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IodGFiRGF0YTogQ2FudmFzQVBJLlRhYikge1xyXG5cdFx0dGhpcy5pZCA9IHRhYkRhdGEuaWQ7XHJcblx0XHR0aGlzLl9wb3NpdGlvbiA9IG51bGw7XHJcblx0XHR0aGlzLmluaXRQb3NpdGlvbiA9IHRhYkRhdGEucG9zaXRpb247XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0UG9zaXRpb24ocG9zKSB7XHJcblx0XHR0aGlzLl9wb3NpdGlvbiA9IHBvcztcclxuXHR9XHJcblxyXG5cdGdldCBoYXNDdXN0b21Qb3NpdGlvbigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbiAhPSBudWxsO1xyXG5cdH1cclxuXHJcblx0Z2V0IHBvc2l0aW9uKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcG9zaXRpb24gPT0gbnVsbCA/IHRoaXMuaW5pdFBvc2l0aW9uIDogdGhpcy5fcG9zaXRpb24gPT09IC0xID8gbnVsbCA6IHRoaXMuX3Bvc2l0aW9uO1xyXG5cdH1cclxuXHJcblx0Z2V0IGhpZGRlbigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbiA9PT0gLTE7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdGUge1xyXG5cdHByaXZhdGUgbmFtZTogc3RyaW5nO1xyXG5cclxuXHRyZWFkb25seSBib2R5Q2xhc3M6IHN0cmluZztcclxuXHRyZWFkb25seSBvblBhZ2VzOiBDYW52YXNQYWdlW107XHJcblxyXG5cdHB1YmxpYyBhY3RpdmU6IGJvb2xlYW47XHJcblx0cHVibGljIG9uRW5hYmxlOiAoKSA9PiB2b2lkO1xyXG5cdHB1YmxpYyBvbkRpc2FibGU6ICgpID0+IHZvaWQ7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGtleSwgc3RhdGVEYXRhLCBhY3RpdmUpIHtcclxuXHRcdHRoaXMubmFtZSA9IGtleTtcclxuXHRcdHRoaXMuYm9keUNsYXNzID0gc3RhdGVEYXRhLmNzc0NsYXNzO1xyXG5cdFx0dGhpcy5hY3RpdmUgPSBhY3RpdmU7XHJcblx0XHR0aGlzLm9uUGFnZXMgPSBbXTtcclxuXHJcblx0XHRzdGF0ZURhdGEucGFnZXMuZm9yRWFjaCgocGFnZTogc3RyaW5nKSA9PiB7XHJcblx0XHRcdGNvbnN0IF9wYWdlID0gQ2FudmFzUGFnZVtwYWdlLnRvVXBwZXJDYXNlKCldO1xyXG5cdFx0XHRpZiAoX3BhZ2UgIT09IHVuZGVmaW5lZClcclxuXHRcdFx0XHR0aGlzLm9uUGFnZXMucHVzaChfcGFnZSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG9uQ2hhbmdlKG5ld1N0YXRlOiBib29sZWFuKSB7XHJcblx0XHRpZiAobmV3U3RhdGUgJiYgdGhpcy5vbkVuYWJsZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB0aGlzLm9uRW5hYmxlKCk7XHJcblx0XHRlbHNlIGlmICh0aGlzLm9uRGlzYWJsZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB0aGlzLm9uRGlzYWJsZSgpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2R1bGUge1xyXG5cdHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuXHRyZWFkb25seSBpZDogbnVtYmVyO1xyXG5cdHJlYWRvbmx5IGl0ZW1Db3VudDogbnVtYmVyO1xyXG5cdHJlYWRvbmx5IGl0ZW1zOiBNb2R1bGVJdGVtW107XHJcblxyXG5cdGNvbnN0cnVjdG9yKG1vZHVsZUpzb246IENhbnZhc0FQSS5Nb2R1bGUpIHtcclxuXHRcdHRoaXMubmFtZSA9IG1vZHVsZUpzb24ubmFtZTtcclxuXHRcdHRoaXMuaWQgPSBtb2R1bGVKc29uLmlkO1xyXG5cdFx0dGhpcy5pdGVtQ291bnQgPSBtb2R1bGVKc29uLml0ZW1zX2NvdW50O1xyXG5cdFx0dGhpcy5pdGVtcyA9IFtdO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2R1bGVJdGVtIHtcclxuXHRwcml2YXRlIF9pZDogbnVtYmVyO1xyXG5cdHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuXHRwcml2YXRlIG1vZHVsZUlkOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfdHlwZTogTW9kdWxlSXRlbVR5cGU7XHJcblx0cHJpdmF0ZSBhc3NpZ25tZW50SWQ6IG51bWJlcjtcclxuXHRwcml2YXRlIF9jb250ZW50SWQ6IG51bWJlcjtcclxuXHRwcml2YXRlIF9maWxlRGF0YTogQ2FudmFzQVBJLkZpbGU7XHJcblx0cHJpdmF0ZSBfZXh0ZXJuYWxVcmw6IHN0cmluZztcclxuXHJcblx0cHVibGljIGlzU3VibWl0dGVkOiBib29sZWFuO1xyXG5cclxuXHRwdWJsaWMgY2hlY2tlZDogYm9vbGVhbjtcclxuXHRwdWJsaWMgaGlkZGVuOiBib29sZWFuO1xyXG5cdHByaXZhdGUgX2NoZWNrYm94RWxlbWVudDogSlF1ZXJ5O1xyXG5cdHByaXZhdGUgX2hpZGVFbGVtZW50OiBKUXVlcnk7XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgYnlDb250ZW50SWQgPSBuZXcgTWFwPG51bWJlciwgTW9kdWxlSXRlbT4oKTtcclxuXHJcblx0Y29uc3RydWN0b3IobW9kdWxlSXRlbUpzb24/OiBDYW52YXNBUEkuTW9kdWxlSXRlbSkge1xyXG5cdFx0aWYgKG1vZHVsZUl0ZW1Kc29uKSB0aGlzLnVwZGF0ZShtb2R1bGVJdGVtSnNvbik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3RhdGljIGZyb21Db250ZW50SWQoY29udGVudElkOiBudW1iZXIpOiBNb2R1bGVJdGVtIHtcclxuXHRcdGNvbnN0IGl0ZW0gPSBuZXcgTW9kdWxlSXRlbSgpO1xyXG5cdFx0aXRlbS5fY29udGVudElkID0gY29udGVudElkO1xyXG5cdFx0TW9kdWxlSXRlbS5ieUNvbnRlbnRJZC5zZXQoY29udGVudElkLCBpdGVtKTtcclxuXHRcdHJldHVybiBpdGVtO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHVwZGF0ZShtb2R1bGVJdGVtSnNvbjogQ2FudmFzQVBJLk1vZHVsZUl0ZW0pIHtcclxuXHRcdHRoaXMuX2lkID0gbW9kdWxlSXRlbUpzb24uaWQ7XHJcblx0XHR0aGlzLl9uYW1lID0gbW9kdWxlSXRlbUpzb24udGl0bGU7XHJcblx0XHR0aGlzLm1vZHVsZUlkID0gbW9kdWxlSXRlbUpzb24ubW9kdWxlX2lkO1xyXG5cdFx0dGhpcy5fZXh0ZXJuYWxVcmwgPSBtb2R1bGVJdGVtSnNvbi5leHRlcm5hbF91cmwgfHwgbnVsbDtcclxuXHJcblx0XHRjb25zdCB0eXBlU3RyaW5nOiBzdHJpbmcgPSBtb2R1bGVJdGVtSnNvbi50eXBlXHJcblx0XHRcdC5yZXBsYWNlKC8oW0EtWl0pL2csIChyLCBzKSA9PiBcIl9cIiArIHMpXHJcblx0XHRcdC5yZXBsYWNlKC9eXy8sIFwiXCIpLnRvVXBwZXJDYXNlKCk7XHJcblxyXG5cdFx0dGhpcy5fdHlwZSA9IE1vZHVsZUl0ZW1UeXBlW3R5cGVTdHJpbmddO1xyXG5cclxuXHRcdGlmICh0aGlzLl90eXBlID09PSB1bmRlZmluZWQpXHJcblx0XHRcdGNvbnNvbGUud2FybihgVW5rbm93biBtb2R1bGUgaXRlbSB0eXBlOiBcIiR7dHlwZVN0cmluZ31cImApO1xyXG5cclxuXHRcdHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5oaWRkZW4gPSBmYWxzZTtcclxuXHJcblx0XHRpZiAodGhpcy5fdHlwZSA9PT0gTW9kdWxlSXRlbVR5cGUuQVNTSUdOTUVOVClcclxuXHRcdFx0dGhpcy5zZXRBc3NpZ25tZW50SWQobW9kdWxlSXRlbUpzb24uY29udGVudF9pZCk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRoaXMuYXNzaWdubWVudElkID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRBc3NpZ25tZW50SWQoaWQ6IG51bWJlcikgeyB0aGlzLmFzc2lnbm1lbnRJZCA9IGlkOyB9XHJcblx0cHVibGljIHNldEZpbGVEYXRhKGRhdGE6IENhbnZhc0FQSS5GaWxlKSB7IHRoaXMuX2ZpbGVEYXRhID0gZGF0YTsgfVxyXG5cclxuXHRnZXQgY2FudmFzRWxlbWVudElkKCkge1xyXG5cdFx0c3dpdGNoIChEQVRBLmNvdXJzZVBhZ2UpIHtcclxuXHRcdFx0Y2FzZSBDYW52YXNQYWdlLk1PRFVMRVM6XHJcblx0XHRcdFx0cmV0dXJuIFwiY29udGV4dF9tb2R1bGVfaXRlbV9cIiArIHRoaXMuX2lkOyAvLyBsaSBlbGVtZW50XHJcblx0XHRcdGNhc2UgQ2FudmFzUGFnZS5HUkFERVM6XHJcblx0XHRcdFx0cmV0dXJuIFwic3VibWlzc2lvbl9cIiArIHRoaXMuYXNzaWdubWVudElkOyAvLyB0ciBlbGVtZW50XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgaWQoKSB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG5cdGdldCBuYW1lKCkgeyByZXR1cm4gdGhpcy5fbmFtZTtcdH1cclxuXHRnZXQgdHlwZSgpOiBNb2R1bGVJdGVtVHlwZSB7IHJldHVybiB0aGlzLl90eXBlOyB9XHJcblx0Z2V0IGlzR3JhZGVkKCkgeyByZXR1cm4gdGhpcy5hc3NpZ25tZW50SWQgIT09IG51bGw7IH1cclxuXHRnZXQgaXNTdWJIZWFkZXIoKSB7IHJldHVybiB0aGlzLl90eXBlID09PSBNb2R1bGVJdGVtVHlwZS5TVUJfSEVBREVSOyB9XHJcblx0Z2V0IG1vZHVsZSgpIHsgcmV0dXJuIERBVEEubW9kdWxlcy5nZXQodGhpcy5tb2R1bGVJZCk7IH1cclxuXHRnZXQgZXh0ZXJuYWxVcmwoKSB7IHJldHVybiB0aGlzLl9leHRlcm5hbFVybDsgfVxyXG5cdGdldCBjb250ZW50SWQoKSB7IHJldHVybiB0aGlzLl9jb250ZW50SWQ7IH1cclxuXHJcblx0Z2V0IGNoZWNrYm94RWxlbWVudCgpOiBKUXVlcnkgeyByZXR1cm4gdGhpcy5fY2hlY2tib3hFbGVtZW50OyB9XHJcblx0c2V0IGNoZWNrYm94RWxlbWVudCh2YWx1ZTogSlF1ZXJ5KSB7XHJcblx0XHRpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUubGVuZ3RoID09PSAxKVxyXG5cdFx0XHR0aGlzLl9jaGVja2JveEVsZW1lbnQgPSB2YWx1ZTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBNb2R1bGUgSXRlbSBFbGVtZW50OiBcIiArIHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdGdldCBoaWRlRWxlbWVudCgpOiBKUXVlcnkgeyByZXR1cm4gdGhpcy5faGlkZUVsZW1lbnQ7IH1cclxuXHRzZXQgaGlkZUVsZW1lbnQodmFsdWU6IEpRdWVyeSkge1xyXG5cdFx0aWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlLmxlbmd0aCA9PT0gMSlcclxuXHRcdFx0dGhpcy5faGlkZUVsZW1lbnQgPSB2YWx1ZTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBNb2R1bGUgSXRlbSBFbGVtZW50OiBcIiArIHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdGdldCBmaWxlRGF0YSgpOiBDYW52YXNBUEkuRmlsZSB7IHJldHVybiB0aGlzLl9maWxlRGF0YTsgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gTW9kdWxlSXRlbVR5cGUge1xyXG5cdEFTU0lHTk1FTlQsIFNVQl9IRUFERVIsIERJU0NVU1NJT04sIFFVSVosIFBBR0UsIEZJTEUsIEVYVEVSTkFMX1VSTCwgRVhURVJOQUxfVE9PTFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBDYW52YXNQYWdlIHtcclxuXHRNT0RVTEVTLCBHUkFERVMsIEhPTUUsIFVTRVJTLCBHUk9VUFMsIENPTExBQk9SQVRJT05TLCBESVNDVVNTSU9OX1RPUElDUywgRVhURVJOQUxfVE9PTFMsIEFTU0lHTk1FTlRTXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE1lc3NhZ2VUeXBlIHtcclxuXHRCQVNJQywgU1RBVEVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VEYXRhIHtcclxuXHRhY3Rpb246IHN0cmluZztcclxuXHR0eXBlOiBNZXNzYWdlVHlwZTtcclxuXHJcblx0Y29uc3RydWN0b3IoYWN0aW9uOiBzdHJpbmcsIHR5cGU/OiBNZXNzYWdlVHlwZSkge1xyXG5cdFx0dGhpcy5hY3Rpb24gPSBhY3Rpb247XHJcblx0XHR0aGlzLnR5cGUgPSB0eXBlIHx8IE1lc3NhZ2VUeXBlLkJBU0lDO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXRlTWVzc2FnZURhdGEgZXh0ZW5kcyBNZXNzYWdlRGF0YSB7XHJcblx0c3RhdGVOYW1lOiBzdHJpbmc7XHJcblx0c3RhdGU6IGJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFjdGlvbjogXCJnZXRcIiB8IFwic2V0XCIsIHN0YXRlTmFtZTogc3RyaW5nLCBzdGF0ZT86IGJvb2xlYW4pIHtcclxuXHRcdHN1cGVyKGFjdGlvbiwgTWVzc2FnZVR5cGUuU1RBVEUpO1xyXG5cclxuXHRcdHRoaXMuc3RhdGVOYW1lID0gc3RhdGVOYW1lO1xyXG5cdFx0dGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG5cclxuXHRcdGlmIChhY3Rpb24gPT09IFwic2V0XCIgJiYgdGhpcy5zdGF0ZSA9PT0gdW5kZWZpbmVkKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHN0YXRlIG1lc3NhZ2U6IG5vIGJvb2xlYW4gdG8gc2V0IHN0YXRlIHRvXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV4Y2VwdGlvbiB7XHJcblx0cHJpdmF0ZSByZWFzb246IHN0cmluZztcclxuXHRwcml2YXRlIGZhdGFsOiBib29sZWFuO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihyZWFzb246IHN0cmluZywgZmF0YWw/OiBib29sZWFuKSB7XHJcblx0XHRpZiAoZmF0YWwgPT09IHVuZGVmaW5lZCkgZmF0YWwgPSBmYWxzZTtcclxuXHRcdHRoaXMucmVhc29uID0gcmVhc29uO1xyXG5cdFx0dGhpcy5mYXRhbCA9IGZhdGFsO1xyXG5cdH1cclxuXHJcblx0Z2V0IGlzRmF0YWwoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5mYXRhbDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB0b1N0cmluZygpIHtcclxuXHRcdHJldHVybiB0aGlzLnJlYXNvbjtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBEQVRBID0gbmV3IERhdGEoKTtcclxuZXhwb3J0IGNvbnN0IFBBR0UgPSBuZXcgUGFnZSgpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHMvb2JqZWN0cy50cyIsImltcG9ydCB7IFYgfSBmcm9tIFwiLi92YXJzXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VEYXRhIH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xyXG5cclxubGV0IEFDQ0VTU19UT0tFTjogc3RyaW5nO1xyXG5cclxuZnVuY3Rpb24gY2hlY2tUb2tlbigpOiB2b2lkIHwgbmV2ZXIge1xyXG5cdGlmIChBQ0NFU1NfVE9LRU4gPT09IG51bGwpXHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJBY2Nlc3MgdG9rZW4gbm90IHNldFwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGVyUGFnZSh1cmw6IHN0cmluZywgaXRlbXNQZXJQYWdlOiBudW1iZXIpIHtcclxuXHRyZXR1cm4gYCR7dXJsfT9wZXJfcGFnZT0ke2l0ZW1zUGVyUGFnZX1gO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0KHN0cjogc3RyaW5nLCBvYmo6IG9iamVjdCk6IHN0cmluZyB7XHJcblxyXG5cdGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG5cdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG5cdFx0XHRzdHIgPSBzdHIucmVwbGFjZShuZXcgUmVnRXhwKFwiXFxcXHtcIiArIGtleSArIFwiXFxcXH1cIiwgXCJnaVwiKSwgb2JqW2tleV0pO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHN0cjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9yRGVmYXVsdDxUPihvYmo6IG9iamVjdCwga2V5OiBQcm9wZXJ0eUtleSwgZGVmOiBUKTogVCB7XHJcblx0aWYgKG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9ialtrZXldID09PSB1bmRlZmluZWQpIHJldHVybiBkZWY7XHJcblx0ZWxzZSByZXR1cm4gb2JqW2tleV07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRVcmwodXJsOiBzdHJpbmcsIGZvcm1hdE9iaj86IHtwZXJQYWdlPzogbnVtYmVyLCBba2V5OiBzdHJpbmddOiBhbnl9KSB7XHJcblxyXG5cdGlmIChmb3JtYXRPYmogIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0aWYgKGZvcm1hdE9iai5wZXJQYWdlICE9PSB1bmRlZmluZWQpXHJcblx0XHRcdHVybCA9IHBlclBhZ2UodXJsLCBmb3JtYXRPYmoucGVyUGFnZSk7XHJcblx0XHR1cmwgPSBmb3JtYXQodXJsLCBmb3JtYXRPYmopO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIFYuY2FudmFzLmFwaS5yb290X3VybCArIHVybDtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEpTT048VD4odXJsOiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcclxuXHJcblx0Y2hlY2tUb2tlbigpO1xyXG5cclxuXHRjb25zdCByZXNwID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcblx0XHRtZXRob2Q6IFwiR0VUXCIsXHJcblx0XHRoZWFkZXJzOiBuZXcgSGVhZGVycyh7XHJcblx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdFx0XHRcIkF1dGhvcml6YXRpb25cIjogXCJCZWFyZXIgXCIgKyBBQ0NFU1NfVE9LRU5cclxuXHRcdH0pXHJcblx0fSBhcyBSZXF1ZXN0SW5pdCk7XHJcblxyXG5cdGlmIChyZXNwLnN0YXR1cyA9PT0gNDA0KSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCI0MDQgZXJyb3Igd2hlbiBnZXR0aW5nIEpTT05cIik7XHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0aWYgKHJlc3Auc3RhdHVzID09PSA0MDApXHJcblx0XHRcdGNvbnNvbGUuZGVidWcoXCI0MDAgZXJyb3Igd2hlbiBnZXR0aW5nIEpTT04gd2FzIE9LQVlcIik7XHJcblxyXG5cdFx0bGV0IGpzb24gPSBhd2FpdCByZXNwLnRleHQoKTtcclxuXHRcdGpzb24gPSBqc29uLnJlcGxhY2UoXCJ3aGlsZSgxKTtcIiwgXCJcIik7XHJcblxyXG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoanNvbik7XHJcblx0fVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHB1dERhdGEodXJsLCBkYXRhOiBhbnlbXSB8IGFueSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG5cclxuXHRjaGVja1Rva2VuKCk7XHJcblxyXG5cdGNvbnN0IGJvZHlEYXRhID0ge25zOiBWLmNhbnZhcy5hcGkubmFtZXNwYWNlLCBkYXRhfTtcclxuXHRjb25zdCBtZXRob2QgPSBkYXRhIGluc3RhbmNlb2YgQXJyYXkgJiYgZGF0YS5sZW5ndGggPiAwIHx8IGRhdGEgIT09IHVuZGVmaW5lZCA/IFwiUFVUXCIgOiBcIkRFTEVURVwiO1xyXG5cclxuXHRpZiAobWV0aG9kID09PSBcIkRFTEVURVwiKVxyXG5cdFx0ZGVsZXRlIGJvZHlEYXRhLmRhdGE7XHJcblxyXG5cdGNvbnN0IG9wcyA9IHtcclxuXHRcdG1ldGhvZCxcclxuXHRcdGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcclxuXHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcblx0XHRcdFwiQXV0aG9yaXphdGlvblwiOiBcIkJlYXJlciBcIiArIEFDQ0VTU19UT0tFTlxyXG5cdFx0fSksXHJcblx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShib2R5RGF0YSlcclxuXHR9IGFzIFJlcXVlc3RJbml0O1xyXG5cclxuXHRjb25zdCByZXNwID0gYXdhaXQgZmV0Y2godXJsLCBvcHMpO1xyXG5cclxuXHRpZiAoIXJlc3Aub2sgfHwgcmVzcC5zdGF0dXMgPT09IDQwMSkgeyAvLyA0MDEgdW5hdXRob3JpemVkXHJcblx0XHRjb25zb2xlLmVycm9yKGBVbmFibGUgdG8gJHttZXRob2R9IGRhdGEgdG8gJHt1cmx9LiByZXNwOmAsIEpTT04uc3RyaW5naWZ5KHJlc3ApKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZWRpdERhdGFBcnJheSh1cmw6IHN0cmluZywgYXBwZW5kOiBib29sZWFuLCB2YWx1ZXM6IGFueVtdKTogUHJvbWlzZTxib29sZWFuPiB7XHJcblxyXG5cdGNvbnN0IGV4aXN0aW5nRGF0YTogYW55W10gPSAoXHJcblx0XHQvLyB1cmwgaXMgc2FtZSBmb3IgZ2V0L3B1dFxyXG5cdFx0YXdhaXQgZ2V0SlNPTjx7ZGF0YTogYW55W119Pih1cmwpXHJcblx0KS5kYXRhIHx8IFtdO1xyXG5cclxuXHRsZXQgbmV3QXJyYXk7XHJcblxyXG5cdGlmIChhcHBlbmQpIHtcclxuXHRcdG5ld0FycmF5ID0gZXhpc3RpbmdEYXRhLmNvbmNhdCh2YWx1ZXMpO1xyXG5cdH1cclxuXHRlbHNlIHsgLy8gc3VidHJhY3QgZnJvbSBkYXRhIGFycmF5XHJcblx0XHRpZiAoZXhpc3RpbmdEYXRhLmxlbmd0aCA9PT0gMClcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRuZXdBcnJheSA9IGV4aXN0aW5nRGF0YS5maWx0ZXIodmFsID0+ICF2YWx1ZXMuaW5jbHVkZXModmFsKSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcHV0RGF0YSh1cmwsIG5ld0FycmF5KTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdhaXQobXM6IG51bWJlcikge1xyXG5cdGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0c2V0VGltZW91dChyZXNvbHZlLCBtcyk7XHJcblx0fSk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkVG9rZW4oKSB7XHJcblx0QUNDRVNTX1RPS0VOID0gYXdhaXQgbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG5cdFx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoVi5taXNjLnRva2VuX2tleSwgcmVzdWx0RGF0YSA9PiB7XHJcblxyXG5cdFx0XHRjb25zdCBzdWNjZXNzID0gQUNDRVNTX1RPS0VOICE9PSBudWxsIHx8IHJlc3VsdERhdGFbVi5taXNjLnRva2VuX2tleV07XHJcblx0XHRcdGlmIChzdWNjZXNzKSByZXNvbHZlKHJlc3VsdERhdGFbVi5taXNjLnRva2VuX2tleV0pO1xyXG5cdFx0XHRlbHNlIHJlamVjdCgpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFjY2Vzc1Rva2VuUHJvbXB0KCkge1xyXG5cdGNvbnN0IG9wZW5PcHRpb25zID0gY29uZmlybShcIk1pc3NpbmcgYWNjZXNzIHRva2VuLCBwcmVzcyBPSyB0byBvcGVuIGV4dGVuc2lvbiBvcHRpb25zXCIpO1xyXG5cdGlmIChvcGVuT3B0aW9ucykgLy8gVE9ETyBzZW5kIHRhYiBJRCB3aXRoIHRoaXMgbWVzc2FnZT9cclxuXHRcdGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKG5ldyBNZXNzYWdlRGF0YShcIm9wZW4gb3B0aW9uc1wiKSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzL3V0aWxzLnRzIiwiaW1wb3J0IHsgREFUQSwgUEFHRSwgRXhjZXB0aW9uLCBDdXN0b21Db3Vyc2VUYWIsIE5hdlRhYixcclxuXHRTdGF0ZSwgTW9kdWxlLCBNb2R1bGVJdGVtLCBNZXNzYWdlRGF0YSwgIFN0YXRlTWVzc2FnZURhdGEsXHJcblx0Q2FudmFzUGFnZSwgTWVzc2FnZVR5cGUsIE1vZHVsZUl0ZW1UeXBlIH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xyXG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBWIH0gZnJvbSBcIi4vdmFyc1wiO1xyXG5pbXBvcnQgKiBhcyBDYW52YXNBUEkgZnJvbSBcIi4vY2FudmFzX2FwaVwiO1xyXG5cclxuKGFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7XHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vICAgICAgICAgICBtYWluIGluaXRpYWxpemF0aW9uXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdChmdW5jdGlvbigpIHtcclxuXHJcblx0XHREQVRBLmV4dGVuc2lvbklkID0gY2hyb21lLnJ1bnRpbWUuaWQ7XHJcblx0XHREQVRBLm5hbWUgPSBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLm5hbWU7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBsb2dUeXBlIG9mIFwibG9nIGRlYnVnIGluZm8gd2FybiBlcnJvciBkaXJcIi5zcGxpdChcIiBcIikpIHtcclxuXHRcdFx0Y29uc3Qgb3JpZyA9IGNvbnNvbGVbbG9nVHlwZV07XHJcblx0XHRcdGNvbnNvbGVbbG9nVHlwZV0gPSBvcmlnLmJpbmQoY29uc29sZSwgYFske0RBVEEubmFtZX1dIFske2xvZ1R5cGUudG9VcHBlckNhc2UoKX1dYCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gbG9hZCBjb3Vyc2UgaWQgYW5kIHdoYXQgcGFnZSB1c2VyIGlzIG9uIHdpdGhpbiB0aGF0IGNvdXJzZVxyXG5cdFx0Y29uc3QgdXJsTWF0Y2ggPSAvY291cnNlc1xcLyhcXGQrKSg/OlxcLyhcXHcrKSk/LiovLmV4ZWMoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUpO1xyXG5cdFx0Y29uc3Qgb25Db3Vyc2VQYWdlID0gdXJsTWF0Y2ggIT09IG51bGw7XHJcblx0XHREQVRBLmNvdXJzZVBhZ2UgPSBvbkNvdXJzZVBhZ2UgPyBDYW52YXNQYWdlWyh1cmxNYXRjaFsyXSB8fCBcImhvbWVcIikudG9VcHBlckNhc2UoKV0gOiBudWxsO1xyXG5cdFx0REFUQS5jb3Vyc2VJRCA9IG9uQ291cnNlUGFnZSA/IE51bWJlcih1cmxNYXRjaFsxXSkgOiBudWxsO1xyXG5cdFx0REFUQS5vbk1haW5QYWdlID0gW0NhbnZhc1BhZ2UuTU9EVUxFUywgQ2FudmFzUGFnZS5HUkFERVNdLmluY2x1ZGVzKERBVEEuY291cnNlUGFnZSk7XHJcblxyXG5cdFx0aWYgKG9uQ291cnNlUGFnZSlcclxuXHRcdFx0Y29uc29sZS5kZWJ1ZyhgT24gY291cnNlICMke0RBVEEuY291cnNlSUR9IHBhZ2UsIGF0ICR7Q2FudmFzUGFnZVtEQVRBLmNvdXJzZVBhZ2VdfWApO1xyXG5cclxuXHR9KSgpO1xyXG5cclxuXHQvLyBiZWdpbiBhc3luYyBvcGVyYXRpb25zXHJcblxyXG5cdGNvbnN0IGluaXRTdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuXHQvLyBsb2FkIHZhcmlhYmxlc1xyXG5cclxuXHQvLyBUT0RPIGltcHJvdmUgdmFyaWFibGUgbG9hZGluZ1xyXG5cclxuXHQvLyB0cnkgdG8gbG9hZCBhY2Nlc3MgdG9rZW5cclxuXHR0cnkge1xyXG5cdFx0YXdhaXQgVXRpbHMubG9hZFRva2VuKCk7XHJcblx0fVxyXG5cdGNhdGNoIChlKSB7XHJcblx0XHRVdGlscy5hY2Nlc3NUb2tlblByb21wdCgpO1xyXG5cdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbihcIk1pc3NpbmcgYWNjZXNzIHRva2VuOyBtdXN0IHJlZnJlc2hcIiwgdHJ1ZSk7XHJcblx0fVxyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyAgICAgICAgICAgICAgIGNvdXJzZSB0YWJzXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdGNvbnN0IGNvdXJzZVRhYkZsb3cgPSBhc3luYyBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRjb25zdCBjb2xvcnNVcmwgPSBVdGlscy5mb3JtYXRVcmwoVi5jYW52YXMuYXBpLnVybHMuY3VzdG9tX2NvbG9ycyk7XHJcblx0XHRjb25zdCBjb3Vyc2VDb2xvcnMgPSAoXHJcblx0XHRcdGF3YWl0IFV0aWxzLmdldEpTT048e2N1c3RvbV9jb2xvcnM6IE1hcDxzdHJpbmcsIHN0cmluZz59Pihjb2xvcnNVcmwpXHJcblx0XHQpLmN1c3RvbV9jb2xvcnM7XHJcblxyXG5cdFx0Y29uc3QgZmF2b3JpdGVzVXJsID0gVXRpbHMuZm9ybWF0VXJsKFYuY2FudmFzLmFwaS51cmxzLmZhdm9yaXRlX2NvdXJzZXMpO1xyXG5cdFx0Y29uc3QgZmF2b3JpdGVDb3Vyc2VzID1cclxuXHRcdFx0YXdhaXQgVXRpbHMuZ2V0SlNPTjxDYW52YXNBUEkuQ291cnNlW10+KGZhdm9yaXRlc1VybCk7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBjb3Vyc2VEYXRhIG9mIGZhdm9yaXRlQ291cnNlcykge1xyXG5cdFx0XHRjb25zdCBjb2xvciA9IGNvdXJzZUNvbG9yc1tcImNvdXJzZV9cIiArIGNvdXJzZURhdGEuaWRdO1xyXG5cdFx0XHREQVRBLmNvdXJzZVRhYnMuc2V0KGNvdXJzZURhdGEuaWQsIG5ldyBDdXN0b21Db3Vyc2VUYWIoY291cnNlRGF0YSwgY29sb3IpKTtcclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gICAgICAgICAgICBuYXZpZ2F0aW9uIHRhYnNcclxuXHQvLyAgcmVxdWlyZXM6IGNvdXJzZSBwYWdlXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdGNvbnN0IG5hdlRhYkZsb3cgPSBhc3luYyBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRjb25zdCBuYXZUYWJVcmwgPSBVdGlscy5mb3JtYXRVcmwoVi5jYW52YXMuYXBpLnVybHMubmF2aWdhdGlvbl90YWJzLCB7XHJcblx0XHRcdHBlclBhZ2U6IDI1LFxyXG5cdFx0XHRjb3Vyc2VJRDogREFUQS5jb3Vyc2VJRFxyXG5cdFx0fSk7XHJcblx0XHRjb25zdCBuYXZUYWJzID0gYXdhaXQgVXRpbHMuZ2V0SlNPTjxDYW52YXNBUEkuVGFiW10+KG5hdlRhYlVybCk7XHJcblxyXG5cdFx0Zm9yIChjb25zdCB0YWIgb2YgbmF2VGFicylcclxuXHRcdFx0REFUQS5uYXZUYWJzLnNldCh0YWIuaWQsIG5ldyBOYXZUYWIodGFiKSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vICAgICAgICAgICAgICBhc3NpZ25tZW50c1xyXG5cdC8vICByZXF1aXJlczogbW9kdWxlcyBvciBncmFkZXMgcGFnZVxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRjb25zdCBhc3NpZ25tZW50RmxvdyA9IGFzeW5jIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdC8vIGhvcGVmdWxseSAxMDAwIGlzIGVub3VnaCB0byBnZXQgYWxsIGluIG9uZSBnb1xyXG5cdFx0Y29uc3QgYXNzaWdubWVudHNVcmwgPSBVdGlscy5mb3JtYXRVcmwoVi5jYW52YXMuYXBpLnVybHMuYXNzaWdubWVudHMsIHtcclxuXHRcdFx0cGVyUGFnZTogMTAwMCxcclxuXHRcdFx0Y291cnNlSUQ6IERBVEEuY291cnNlSURcclxuXHRcdH0pO1xyXG5cdFx0Y29uc3QgYXNzaWdubWVudHMgPSBhd2FpdCBVdGlscy5nZXRKU09OPENhbnZhc0FQSS5Bc3NpZ25tZW50W10+KGFzc2lnbm1lbnRzVXJsKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGFzc2lnbm1lbnRKc29uIG9mIGFzc2lnbm1lbnRzKSB7XHJcblxyXG5cdFx0XHRsZXQgY29udGVudElkOiBudW1iZXI7XHJcblx0XHRcdGlmIChhc3NpZ25tZW50SnNvbi5xdWl6X2lkKVxyXG5cdFx0XHRcdGNvbnRlbnRJZCA9IGFzc2lnbm1lbnRKc29uLnF1aXpfaWQ7XHJcblx0XHRcdGVsc2UgaWYgKGFzc2lnbm1lbnRKc29uLmRpc2N1c3Npb25fdG9waWMpXHJcblx0XHRcdFx0Y29udGVudElkID0gYXNzaWdubWVudEpzb24uZGlzY3Vzc2lvbl90b3BpYy5pZDtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGNvbnRlbnRJZCA9IGFzc2lnbm1lbnRKc29uLmlkO1xyXG5cclxuXHRcdFx0bGV0IGl0ZW06IE1vZHVsZUl0ZW07XHJcblx0XHRcdGlmIChNb2R1bGVJdGVtLmJ5Q29udGVudElkLmhhcyhjb250ZW50SWQpKVxyXG5cdFx0XHRcdGl0ZW0gPSBNb2R1bGVJdGVtLmJ5Q29udGVudElkLmdldChjb250ZW50SWQpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0aXRlbSA9IE1vZHVsZUl0ZW0uZnJvbUNvbnRlbnRJZChjb250ZW50SWQpO1xyXG5cclxuXHRcdFx0aXRlbS5zZXRBc3NpZ25tZW50SWQoYXNzaWdubWVudEpzb24uaWQpO1xyXG5cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyAgICAgICBtb2R1bGVzLCBpdGVtcywgYW5kIGZpbGVzXHJcblx0Ly8gIHJlcXVpcmVzOiBtb2R1bGVzIG9yIGdyYWRlcyBwYWdlXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdGNvbnN0IG1vZHVsZUl0ZW1GbG93ID0gYXN5bmMgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8gPT09PT0gbW9kdWxlcyA9PT09PVxyXG5cclxuXHRcdGNvbnN0IG1vZHVsZXNVcmwgPSBVdGlscy5mb3JtYXRVcmwoVi5jYW52YXMuYXBpLnVybHMubW9kdWxlcywge1xyXG5cdFx0XHRwZXJQYWdlOiAyNSxcclxuXHRcdFx0Y291cnNlSUQ6IERBVEEuY291cnNlSURcclxuXHRcdH0pO1xyXG5cdFx0Y29uc3QgbW9kdWxlcyA9IGF3YWl0IFV0aWxzLmdldEpTT048Q2FudmFzQVBJLk1vZHVsZVtdPihtb2R1bGVzVXJsKTtcclxuXHRcdGZvciAoY29uc3QgbW9kdWxlRGF0YSBvZiBtb2R1bGVzKSB7XHJcblx0XHRcdERBVEEubW9kdWxlcy5zZXQobW9kdWxlRGF0YS5pZCwgbmV3IE1vZHVsZShtb2R1bGVEYXRhKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09PT0gbW9kdWxlIGl0ZW1zID09PT09XHJcblxyXG5cdFx0Y29uc3QgbW9kdWxlSWRzID0gQXJyYXkuZnJvbShEQVRBLm1vZHVsZXMua2V5cygpKTtcclxuXHRcdGNvbnN0IGl0ZW1TZXRQcm9taXNlczogQXJyYXk8UHJvbWlzZTxDYW52YXNBUEkuTW9kdWxlSXRlbVtdPj4gPVxyXG5cdFx0XHRtb2R1bGVJZHMubWFwKG1vZElkID0+IERBVEEubW9kdWxlcy5nZXQobW9kSWQpKVxyXG5cdFx0XHRcdC5maWx0ZXIobW9kID0+IG1vZC5pdGVtQ291bnQgPiAwKVxyXG5cdFx0XHRcdC5tYXAobW9kdWxlID0+IHtcclxuXHJcblx0XHRcdFx0XHRjb25zdCBtb2R1bGVJdGVtc1VybCA9IFV0aWxzLmZvcm1hdFVybChWLmNhbnZhcy5hcGkudXJscy5tb2R1bGVfaXRlbXMsIHtcclxuXHRcdFx0XHRcdFx0bW9kdWxlSUQ6IG1vZHVsZS5pZCxcclxuXHRcdFx0XHRcdFx0Y291cnNlSUQ6IERBVEEuY291cnNlSUQsXHJcblx0XHRcdFx0XHRcdHBlclBhZ2U6IG1vZHVsZS5pdGVtQ291bnRcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdC8vIHJldHVybiB0aGUgcHJvbWlzZSBpbnN0ZWFkIG9mIGF3YWl0aW5nIG9uIHRoaXMgc28gaXQgY2FuIGJlIHVzZWQgaW4gUHJvbWlzZS5hbGxcclxuXHRcdFx0XHRcdHJldHVybiBVdGlscy5nZXRKU09OPENhbnZhc0FQSS5Nb2R1bGVJdGVtW10+KG1vZHVsZUl0ZW1zVXJsKTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0Y29uc3QgbW9kdWxlSXRlbVNldHM6IENhbnZhc0FQSS5Nb2R1bGVJdGVtW11bXSA9IGF3YWl0IFByb21pc2UuYWxsKGl0ZW1TZXRQcm9taXNlcyk7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBpdGVtcyBvZiBtb2R1bGVJdGVtU2V0cykge1xyXG5cclxuXHRcdFx0Y29uc3QgbW9kdWxlID0gREFUQS5tb2R1bGVzLmdldChpdGVtc1swXS5tb2R1bGVfaWQpO1xyXG5cclxuXHRcdFx0Zm9yIChjb25zdCBtb2RJdGVtSnNvbiBvZiBpdGVtcykge1xyXG5cclxuXHRcdFx0XHRsZXQgaXRlbTogTW9kdWxlSXRlbTtcclxuXHRcdFx0XHRjb25zdCBjb250ZW50SWQgPSBtb2RJdGVtSnNvbi5jb250ZW50X2lkO1xyXG5cclxuXHRcdFx0XHRpZiAoTW9kdWxlSXRlbS5ieUNvbnRlbnRJZC5oYXMoY29udGVudElkKSlcclxuXHRcdFx0XHRcdGl0ZW0gPSBNb2R1bGVJdGVtLmJ5Q29udGVudElkLmdldChjb250ZW50SWQpO1xyXG5cdFx0XHRcdGVsc2UgaWYgKGNvbnRlbnRJZClcclxuXHRcdFx0XHRcdGl0ZW0gPSBNb2R1bGVJdGVtLmZyb21Db250ZW50SWQoY29udGVudElkKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRpdGVtID0gbmV3IE1vZHVsZUl0ZW0oKTtcclxuXHJcblx0XHRcdFx0aXRlbS51cGRhdGUobW9kSXRlbUpzb24pO1xyXG5cclxuXHRcdFx0XHREQVRBLm1vZHVsZUl0ZW1zLnNldChtb2RJdGVtSnNvbi5pZCwgaXRlbSk7XHJcblx0XHRcdFx0bW9kdWxlLml0ZW1zLnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09PT0gZmlsZSBtb2R1bGUgaXRlbXMgPT09PT1cclxuXHJcblx0XHRjb25zdCBmaWxlSXRlbXMgPSBBcnJheS5mcm9tKERBVEEubW9kdWxlSXRlbXMudmFsdWVzKCkpXHJcblx0XHRcdC5maWx0ZXIoaXRlbSA9PiBpdGVtLnR5cGUgPT09IE1vZHVsZUl0ZW1UeXBlLkZJTEUpO1xyXG5cclxuXHRcdGNvbnN0IGZpbGVQcm9taXNlczogQXJyYXk8UHJvbWlzZTxDYW52YXNBUEkuRmlsZT4+ID0gZmlsZUl0ZW1zLm1hcChpdGVtID0+IHtcclxuXHRcdFx0Y29uc3QgZmlsZURhdGFVcmwgPSBVdGlscy5mb3JtYXRVcmwoVi5jYW52YXMuYXBpLnVybHMuZmlsZV9kaXJlY3QsIHtcclxuXHRcdFx0XHRmaWxlSUQ6IGl0ZW0uY29udGVudElkLFxyXG5cdFx0XHRcdGNvdXJzZUlEOiBEQVRBLmNvdXJzZUlEXHJcblx0XHRcdH0pO1xyXG5cdFx0XHQvLyByZXR1cm4gcHJvbWlzZSBmb3IgUHJvbWlzZS5hbGxcclxuXHRcdFx0cmV0dXJuIFV0aWxzLmdldEpTT048Q2FudmFzQVBJLkZpbGU+KGZpbGVEYXRhVXJsKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnN0IGZpbGVzOiBDYW52YXNBUEkuRmlsZVtdID0gYXdhaXQgUHJvbWlzZS5hbGwoZmlsZVByb21pc2VzKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpXHJcblx0XHRcdE1vZHVsZUl0ZW0uYnlDb250ZW50SWQuZ2V0KGZpbGUuaWQpLnNldEZpbGVEYXRhKGZpbGUpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyAgICAgICAgICAgICAgY3VzdG9tIGRhdGFcclxuXHQvLyAgcmVxdWlyZXM6IG1vZHVsZXMgb3IgZ3JhZGVzIHBhZ2VcclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblx0Y29uc3QgY3VzdG9tRGF0YUZsb3cgPSBhc3luYyBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRjb25zdCBjdXN0b21EYXRhVXJsID0gVXRpbHMuZm9ybWF0VXJsKFYuY2FudmFzLmFwaS51cmxzLmN1c3RvbV9kYXRhLCB7ZGF0YVBhdGg6IFwiXCJ9KTtcclxuXHRcdGNvbnN0IGN1c3RvbURhdGE6IENhbnZhc0FQSS5DdXN0b21EYXRhID0gKFxyXG5cdFx0XHRhd2FpdCBVdGlscy5nZXRKU09OPHtkYXRhOiBDYW52YXNBUEkuQ3VzdG9tRGF0YX0+KGN1c3RvbURhdGFVcmwpXHJcblx0XHQpLmRhdGE7XHJcblxyXG5cdFx0Ly8gdGhpcyBoYXBwZW5zIHdoZW4gdGhlcmUgd2FzIGFuIGlzc3VlIGdldHRpbmcgdGhlIGRhdGEgb3IgdGhlcmUgd2FzIG5vIGRhdGEgYXQgYWxsXHJcblx0XHQvLyBUT0RPIGZpZ3VyZSBvdXQgd2hhdCB0byBkbyBoZXJlXHJcblx0XHRpZiAoY3VzdG9tRGF0YSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG5cdFx0Ly8gPT09PT0gbG9hZCBjb21wbGV0ZSAvIGhpZGRlbiBhc3NpZ25tZW50cyA9PT09PVxyXG5cclxuXHRcdGNvbnN0IGNvbXBsZXRlID0gVXRpbHMuZ2V0T3JEZWZhdWx0KGN1c3RvbURhdGEuY29tcGxldGVkX2Fzc2lnbm1lbnRzLCBEQVRBLmNvdXJzZUlELCBuZXcgQXJyYXk8bnVtYmVyPigpKTtcclxuXHRcdGNvbnN0IGhpZGRlbiA9IFV0aWxzLmdldE9yRGVmYXVsdChjdXN0b21EYXRhLmhpZGRlbl9hc3NpZ25tZW50cywgREFUQS5jb3Vyc2VJRCwgbmV3IEFycmF5PG51bWJlcj4oKSk7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBbbW9kSXRlbUlkLCBtb2RJdGVtXSBvZiBEQVRBLm1vZHVsZUl0ZW1zKSB7XHJcblx0XHRcdG1vZEl0ZW0uY2hlY2tlZCA9IGNvbXBsZXRlLmluY2x1ZGVzKG1vZEl0ZW1JZCk7XHJcblx0XHRcdG1vZEl0ZW0uaGlkZGVuID0gaGlkZGVuLmluY2x1ZGVzKG1vZEl0ZW1JZCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09PT0gbG9hZCBhY3RpdmUgc3RhdGUgbGlzdCA9PT09PVxyXG5cclxuXHRcdGNvbnN0IGFjdGl2ZVN0YXRlczogc3RyaW5nW10gPSBjdXN0b21EYXRhLmFjdGl2ZV9zdGF0ZXMgfHwgW107XHJcblxyXG5cdFx0Ly8gbG9hZCBzdGF0ZXMgZnJvbSBjb25maWdcclxuXHRcdCQuZWFjaChWLnN0YXRlLCAobmFtZSwgc3RhdGVEYXRhKSA9PiB7XHJcblx0XHRcdGNvbnN0IHN0YXRlT2JqID0gbmV3IFN0YXRlKG5hbWUsIHN0YXRlRGF0YSwgYWN0aXZlU3RhdGVzLmluY2x1ZGVzKG5hbWUpKTtcclxuXHRcdFx0REFUQS5zdGF0ZXMuc2V0KG5hbWUsIHN0YXRlT2JqKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vID09PT09IGxvYWQgdGFicyBwb3NpdGlvbnMgPT09PT1cclxuXHJcblx0XHRjb25zdCB0YWJQb3NpdGlvbnM6IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9ID0gVXRpbHMuZ2V0T3JEZWZhdWx0KGN1c3RvbURhdGEudGFiX3Bvc2l0aW9ucywgREFUQS5jb3Vyc2VJRCwge30pO1xyXG5cclxuXHRcdGZvciAoY29uc3QgW3RhYklkLCBuYXZUYWJdIG9mIERBVEEubmF2VGFicykge1xyXG5cdFx0XHRpZiAodGFiUG9zaXRpb25zW3RhYklkXSAhPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdG5hdlRhYi5zZXRQb3NpdGlvbih0YWJQb3NpdGlvbnNbdGFiSWRdKTtcclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gICAgICAgICBydW4gYWxsIGFzeW5jIHRhc2tzXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cdGNvbnN0IHByb21pc2VzID0gW2NvdXJzZVRhYkZsb3coKV07XHJcblxyXG5cdGlmIChEQVRBLmNvdXJzZVBhZ2UgIT09IG51bGwpXHJcblx0XHRwcm9taXNlcy5wdXNoKG5hdlRhYkZsb3coKSk7XHJcblxyXG5cdGlmIChEQVRBLm9uTWFpblBhZ2UpXHJcblx0XHRwcm9taXNlcy5wdXNoKGFzc2lnbm1lbnRGbG93KCksIG1vZHVsZUl0ZW1GbG93KCkpO1xyXG5cclxuXHRhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XHJcblxyXG5cdC8vIHJ1biBjdXN0b20gZGF0YSBmbG93IGFmdGVyIGV2ZXJ5dGhpbmdcclxuXHRpZiAoREFUQS5vbk1haW5QYWdlKSBhd2FpdCBjdXN0b21EYXRhRmxvdygpO1xyXG5cclxuXHRyZXR1cm4gcGVyZm9ybWFuY2Uubm93KCkgLSBpbml0U3RhcnQ7XHJcblxyXG59KSgpXHJcbi5jYXRjaCgocmVhc29uOiBFeGNlcHRpb24gfCBhbnkpID0+IHtcclxuXHQvLyBFeGNlcHRpb25zIGFyZSBpbnRlbnRpb25hbGx5IHRocm93IGJ5IG15IGNvZGVcclxuXHRpZiAocmVhc29uIGluc3RhbmNlb2YgRXhjZXB0aW9uKSB7XHJcblx0XHRpZiAocmVhc29uLmlzRmF0YWwpIHRocm93IG5ldyBFcnJvcihyZWFzb24udG9TdHJpbmcoKSk7XHJcblx0XHRlbHNlIGNvbnNvbGUud2FybihcIkV4Y2VwdGlvbiBpbiBpbml0OlwiLCByZWFzb24udG9TdHJpbmcoKSk7XHJcblx0fVxyXG5cdGVsc2UgeyAvLyBhbnl0aGluZyBlbHNlIGlzIHVua25vd24gYW5kIGlzIGEgcHJvYmxlbVxyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBlcnJvciBpbiBpbml0OiBcIiArIHJlYXNvbik7XHJcblx0fVxyXG59KVxyXG4udGhlbigodG90YWxEdXJhdGlvbjogbnVtYmVyKSA9PiB7XHJcblx0Y29uc29sZS5kZWJ1ZyhgSW5pdGlhbGl6YXRpb24gY29tcGxldGVkIGluICR7TWF0aC5yb3VuZCh0b3RhbER1cmF0aW9uKX1tc2ApO1xyXG5cdE1haW4uaW5pdFBhZ2UoKTtcclxuXHRjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoTWFpbi5vbk1lc3NhZ2UpO1xyXG59KTtcclxuXHJcbmNsYXNzIE1haW4ge1xyXG5cclxuXHRzdGF0aWMgaW5pdFBhZ2UoKSB7XHJcblxyXG5cdFx0UEFHRS5pbml0aWFsaXplKCk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLnNjcm9sbChVSS51cGRhdGVTY3JvbGxQb3NpdGlvbik7XHJcblx0XHQkKGRvY3VtZW50KS5yZWFkeShVSS51cGRhdGVTY3JvbGxQb3NpdGlvbik7XHJcblxyXG5cdFx0Ly8gPT09PT09PT09PT09PT09IG1pc2MgZ2xvYmFsIGluaXQgc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHRcdC8vIHJlbW92aW5nIGFsbCByZXBlYXRlZCB3aGl0ZXNwYWNlIGluIGNsYXNzIGF0dHJpYnV0ZXNcclxuXHRcdCQoXCJbY2xhc3NdXCIpLmF0dHIoXCJjbGFzc1wiLCAoaSwgb2xkQ2xhc3MpID0+IChvbGRDbGFzcy5tYXRjaCgvXFxTKy9nKSB8fCBbXSkuam9pbihcIiBcIikpO1xyXG5cclxuXHRcdC8vIGNsZWFuIHVwIGdyYWRlIHRhYmxlXHJcblx0XHQkKFwiI2dyYWRlc19zdW1tYXJ5IHRib2R5XCIpXHJcblx0XHQuZmluZChcInRyLmdyb3VwX3RvdGFsLCB0ci5maW5hbF9ncmFkZVwiKVxyXG5cdFx0LmZpbmQoXCJ0ZC5wb2ludHNfcG9zc2libGVcIikuYXR0cihcImNvbHNwYW5cIiwgXCIzXCIpLmNzcyhcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIikuZW5kKClcclxuXHRcdC5maW5kKFwidGQuZGV0YWlscywgdGQuc3RhdHVzXCIpLnJlbW92ZSgpO1xyXG5cclxuXHRcdC8vIG1ha2UgdGhlIGNvdXJzZSBidXR0b24gdGFrZSB5b3UgdG8gXCJhbGwgY291cnNlc1wiIGFuZCBjaGFuZ2UgdGhlIHRleHQgdG8gc2F5IHNvXHJcblx0XHRjb25zdCBvcmlnQ291cnNlTmF2ID0gJChcIiNnbG9iYWxfbmF2X2NvdXJzZXNfbGlua1wiKTtcclxuXHRcdGNvbnN0IG5ld0NvdXJzZU5hdiA9ICQoXCI8YT5cIilcclxuXHRcdFx0LmF0dHIoXCJocmVmXCIsIFwiL2NvdXJzZXNcIilcclxuXHRcdFx0LmFkZENsYXNzKFwiaWMtYXBwLWhlYWRlcl9fbWVudS1saXN0LWxpbmtcIilcclxuXHRcdFx0Lmh0bWwob3JpZ0NvdXJzZU5hdi5wcm9wKFwiaW5uZXJIVE1MXCIpKTtcclxuXHJcblx0XHRjb25zdCBjb3Vyc2VOYXZMaSA9IG9yaWdDb3Vyc2VOYXYucGFyZW50KCk7XHJcblx0XHRvcmlnQ291cnNlTmF2LnJlbW92ZSgpO1xyXG5cdFx0Y291cnNlTmF2TGlcclxuXHRcdFx0LmFwcGVuZChuZXdDb3Vyc2VOYXYpXHJcblx0XHRcdC5maW5kKFwiLm1lbnUtaXRlbV9fdGV4dFwiKVxyXG5cdFx0XHQudGV4dChcIkFsbCBDb3Vyc2VzXCIpO1xyXG5cclxuXHRcdC8vID09PSBpbnNlcnQgY291cnNlIGxpbmtzID09PVxyXG5cclxuXHRcdGNvbnN0ICRpbnNlcnRpb25Qb2ludCA9IFBBR0Uuc2lkZWJhci5jaGlsZHJlbigpLmVxKDIpO1xyXG5cdFx0Zm9yIChjb25zdCBbdGFiSUQsIGNvdXJzZVRhYl0gb2YgREFUQS5jb3Vyc2VUYWJzKSB7XHJcblx0XHRcdCRpbnNlcnRpb25Qb2ludC5hZnRlcihcclxuXHRcdFx0XHRVdGlscy5mb3JtYXQoVi5lbGVtZW50LmNvdXJzZV9saW5rLCB7XHJcblx0XHRcdFx0XHR0YWJDb2xvcjogY291cnNlVGFiLmNvbG9yLFxyXG5cdFx0XHRcdFx0dGFiSUQsXHJcblx0XHRcdFx0XHRuYW1lOiBjb3Vyc2VUYWIubmFtZSxcclxuXHRcdFx0XHRcdGNvZGU6IGNvdXJzZVRhYi5jb2RlXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyA9PT0gcGxhY2UgXCJqdW1wIHRvIHRvcFwiIGJ1dHRvbiA9PT1cclxuXHJcblx0XHREQVRBLmVsZW1lbnRzLmp1bXBfYnV0dG9uID1cclxuXHRcdFx0JChWLmVsZW1lbnQuanVtcF9idXR0b24pXHJcblx0XHRcdC5maW5kKFwiaVwiKVxyXG5cdFx0XHQuY2xpY2soKCkgPT4ge1xyXG5cdFx0XHRcdGlmIChQQUdFLnNjcm9sbGluZ0VsZW1lbnQucHJvcChcInNjcm9sbFRvcFwiKSA+IDApXHJcblx0XHRcdFx0XHQkKFwiYm9keVwiKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCBWLnVpLnNjcm9sbF90aW1lKTtcclxuXHRcdFx0fSlcclxuXHRcdFx0LmVuZCgpXHJcblx0XHRcdC5hcHBlbmRUbyhQQUdFLm1haW4pO1xyXG5cclxuXHRcdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdC8vICAgICAgICAgICAgICAgICAgIGNvdXJzZSBwYWdlIGN1dG9mZlxyXG5cdFx0Ly8gICAgICBldmVyeXRoaW5nIGJlbG93IHRoaXMgcG9pbnQgaXMgZm9yIGNvdXJzZSBwYWdlc1xyXG5cdFx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0aWYgKERBVEEuY291cnNlUGFnZSA9PT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuXHRcdC8vID09PT0gY2xlYXIgdGhlIGFjdGl2ZSBtZW51IHRhYiBzaW5jZSB3ZSdyZSB1c2luZyBjdXN0b20gdGFicyA9PT09XHJcblxyXG5cdFx0JChcInVsI21lbnUgPiBsaVwiKS5yZW1vdmVDbGFzcyhcImljLWFwcC1oZWFkZXJfX21lbnUtbGlzdC1pdGVtLS1hY3RpdmVcIik7XHJcblxyXG5cdFx0Ly8gPT09IGxvYWQgaW5pdGlhbCBzdGF0ZXMgPT09XHJcblxyXG5cdFx0Zm9yIChjb25zdCBbLCBzdGF0ZV0gb2YgREFUQS5zdGF0ZXMpIHtcclxuXHRcdFx0aWYgKHN0YXRlLmFjdGl2ZSAmJiBzdGF0ZS5vblBhZ2VzLmluY2x1ZGVzKERBVEEuY291cnNlUGFnZSkpXHJcblx0XHRcdFx0UEFHRS5ib2R5LmFkZENsYXNzKHN0YXRlLmJvZHlDbGFzcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09PSBhcHBseSBjb3Vyc2UgY29sb3IgdG8gYnJhbmQgY29sb3JzID09PT1cclxuXHJcblx0XHRpZiAoREFUQS5jb3Vyc2VUYWJzLmhhcyhEQVRBLmNvdXJzZUlEKSkge1xyXG5cdFx0XHRjb25zdCBjb2xvciA9IERBVEEuY291cnNlVGFicy5nZXQoREFUQS5jb3Vyc2VJRCkuY29sb3I7XHJcblx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0taWMtYnJhbmQtcHJpbWFyeVwiLCBjb2xvcik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09PSBjbGVhciBlbXB0eSBuYXYgdGFicyA9PT1cclxuXHJcblx0XHQkKFYuY2FudmFzLnNlbGVjdG9yLm5hdl90YWJzKS5maW5kKFwibGk6ZW1wdHlcIikucmVtb3ZlKCk7XHJcblxyXG5cdFx0Ly8gPT09PSBhcHBseSB0aGUgY3VzdG9tIG5hdiB0YWIgcG9zaXRpb25zID09PVxyXG5cclxuXHRcdEFycmF5LmZyb20oREFUQS5uYXZUYWJzLnZhbHVlcygpKS5maWx0ZXIodGFiID0+IHRhYi5oYXNDdXN0b21Qb3NpdGlvbilcclxuXHRcdFx0LnNvcnQoKHRhYkEsIHRhYkIpID0+IHRhYkEucG9zaXRpb24gLSB0YWJCLnBvc2l0aW9uKVxyXG5cdFx0XHQuZm9yRWFjaChVSS51cGRhdGVOYXZUYWJQb3NpdGlvbik7XHJcblxyXG5cdFx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgIG1haW4gcGFnZSBjdXRvZmZcclxuXHRcdC8vICBldmVyeXRoaW5nIGJlbG93IHRoaXMgaXMgb25seSBmb3IgbW9kdWxlcy9ncmFkZXMgcGFnZXNcclxuXHRcdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdGlmICghREFUQS5vbk1haW5QYWdlKSByZXR1cm47XHJcblxyXG5cdFx0Ly8gPT09IHBsYWNlIGNoZWNrYm94ZXMgJiBoaWRlIGJ1dHRvbnMgPT09XHJcblxyXG5cdFx0Zm9yIChjb25zdCBbaXRlbUlkLCBpdGVtXSBvZiBEQVRBLm1vZHVsZUl0ZW1zKSB7XHJcblxyXG5cdFx0XHRjb25zdCBtYWluRWwgPSAkKFwiI1wiICsgaXRlbS5jYW52YXNFbGVtZW50SWQpO1xyXG5cdFx0XHRsZXQgcGFyZW50RWw6IEpRdWVyeTtcclxuXHRcdFx0bGV0IGhhc0NoZWNrYm94OiBib29sZWFuO1xyXG5cdFx0XHRsZXQgaGFzSGlkZUJ1dHRvbjogYm9vbGVhbjtcclxuXHJcblx0XHRcdGl0ZW0uY2hlY2tib3hFbGVtZW50ID0gbnVsbDtcclxuXHRcdFx0aXRlbS5oaWRlRWxlbWVudCA9IG51bGw7XHJcblxyXG5cdFx0XHRpZiAoREFUQS5jb3Vyc2VQYWdlID09PSBDYW52YXNQYWdlLk1PRFVMRVMpIHtcclxuXHRcdFx0XHRwYXJlbnRFbCA9IG1haW5FbC5maW5kKFwiZGl2LmlnLXJvd1wiKTtcclxuXHJcblx0XHRcdFx0aGFzSGlkZUJ1dHRvbiA9IHRydWU7XHJcblx0XHRcdFx0aGFzQ2hlY2tib3ggPSAhaXRlbS5pc1N1YkhlYWRlcjtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChEQVRBLmNvdXJzZVBhZ2UgPT09IENhbnZhc1BhZ2UuR1JBREVTKSB7XHJcblx0XHRcdFx0cGFyZW50RWwgPSAkKFwiPHRkPlwiKVxyXG5cdFx0XHRcdFx0LmFkZENsYXNzKFYuY3NzQ2xhc3MuY2hlY2tib3hfdGQpXHJcblx0XHRcdFx0XHQucHJlcGVuZFRvKG1haW5FbCk7XHJcblxyXG5cdFx0XHRcdGhhc0hpZGVCdXR0b24gPSBmYWxzZTtcclxuXHRcdFx0XHRoYXNDaGVja2JveCA9IGl0ZW0uaXNHcmFkZWQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChoYXNDaGVja2JveCkge1xyXG5cdFx0XHRcdGl0ZW0uY2hlY2tib3hFbGVtZW50ID1cclxuXHRcdFx0XHRcdCQoVXRpbHMuZm9ybWF0KFYuZWxlbWVudC5jaGVja2JveCwge2l0ZW1faWQ6IGl0ZW1JZH0pKS5hcHBlbmRUbyhwYXJlbnRFbCk7XHJcblxyXG5cdFx0XHRcdFVJLnVwZGF0ZUNoZWNrYm94KGl0ZW0pO1xyXG5cdFx0XHRcdGl0ZW0uY2hlY2tib3hFbGVtZW50LnNob3coKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoaGFzSGlkZUJ1dHRvbikge1xyXG5cdFx0XHRcdGl0ZW0uaGlkZUVsZW1lbnQgPVxyXG5cdFx0XHRcdFx0JChVdGlscy5mb3JtYXQoVi5lbGVtZW50LmhpZGVfYnV0dG9uLCB7aXRlbV9pZDogaXRlbUlkfSkpLmFwcGVuZFRvKHBhcmVudEVsKTtcclxuXHJcblx0XHRcdFx0Ly8gdGhpcyBmdW5jdGlvbiBpcyBhc3luYywgYnV0IHdpdGggc2Vjb25kIGFyZ3VtZW50ICd0cnVlJywgaXQgdXBkYXRlcyBpbnN0YW50bHlcclxuXHRcdFx0XHRVSS51cGRhdGVJdGVtSGlkZShpdGVtLCB0cnVlKTtcclxuXHRcdFx0XHRpdGVtLmhpZGVFbGVtZW50LnNob3coKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyA9PT0gZml4IGdyYWRlIGNoZWNrYm94ZXMgc2luY2UgdGhleSdyZSBpbiB0aGUgdGFibGUgPT09XHJcblx0XHRpZiAoREFUQS5jb3Vyc2VQYWdlID09PSBDYW52YXNQYWdlLkdSQURFUykge1xyXG5cdFx0XHRQQUdFLmdyYWRlc1xyXG5cdFx0XHRcdC5maW5kKFwidGRbY29sc3Bhbj0nNSddXCIpXHJcblx0XHRcdFx0LmF0dHIoXCJjb2xzcGFuXCIsIDYpXHJcblx0XHRcdFx0LmVuZCgpLmZpbmQoXCI+IHRoZWFkID4gdHJcIilcclxuXHRcdFx0XHQucHJlcGVuZCgkKFwiPHRoPlwiKVxyXG5cdFx0XHRcdFx0LmF0dHIoXCJzY29wZVwiLCBcImNvbFwiKVxyXG5cdFx0XHRcdFx0LmFwcGVuZChcIjxpIGNsYXNzPSdpY29uLWNoZWNrJz48L2k+XCIpXHJcblx0XHRcdFx0KVxyXG5cdFx0XHRcdC5lbmQoKS5maW5kKFwidHIuc3R1ZGVudF9hc3NpZ25tZW50XCIpXHJcblx0XHRcdFx0LnByZXBlbmQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gJCh0aGlzKS5oYXMoXCJ0ZDpmaXJzdC1jaGlsZFwiKS5sZW5ndGggPT09IDAgP1xyXG5cdFx0XHRcdFx0XHQkKFwiPHRkPlwiKS5hZGRDbGFzcyhWLmNzc0NsYXNzLmNoZWNrYm94X3RkKSA6IHVuZGVmaW5lZDtcclxuXHRcdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyA9PT0gYWRkIGNoYW5nZSBldmVudCBmb3IgY2hlY2tib3hlcyA9PT1cclxuXHJcblx0XHRQQUdFLm1haW4ub24oXCJjaGFuZ2VcIiwgYC4ke1YuY3NzQ2xhc3MuY2hlY2tib3hfcGFyZW50fSA+IGlucHV0YCwgYXN5bmMgZnVuY3Rpb24oKSB7XHJcblx0XHRcdGF3YWl0IE1haW4ub25DaGVja2JveENoYW5nZSh0aGlzIGFzIEhUTUxJbnB1dEVsZW1lbnQpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICBtb2R1bGVzIHBhZ2UgY3V0b2ZmXHJcblx0XHQvLyAgICAgICAgZXZlcnl0aGluZyBiZWxvdyBoZXJlIGlzIG9ubHkgb24gdGhlIG1vZHVsZXMgcGFnZVxyXG5cdFx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0aWYgKERBVEEuY291cnNlUGFnZSAhPT0gQ2FudmFzUGFnZS5NT0RVTEVTKSByZXR1cm47XHJcblxyXG5cdFx0Ly8gPT09IGNsZWFuIHVwIGVtcHR5IG1vZHVsZXMgPT09XHJcblx0XHQkKFYuY2FudmFzLnNlbGVjdG9yLm1vZHVsZV9pdGVtcykuZmlsdGVyKChpLCBlbCkgPT4gIWVsLmlubmVySFRNTC50cmltKCkubGVuZ3RoKS5odG1sKFwiXCIpO1xyXG5cclxuXHRcdC8vID09PSBzZXR1cCBhbmQgYXBwbHkgY3VzdG9tIGluZGVudHMgPT09XHJcblxyXG5cdFx0Y29uc3QgZGlzYWJsZWRJbmRlbnRTdGF0ZSA9IERBVEEuc3RhdGVzLmdldChcImRpc2FibGVfaW5kZW50X292ZXJyaWRlXCIpO1xyXG5cdFx0Y29uc3QgZGlzYWJsZWRJbmRlbnQgPSBkaXNhYmxlZEluZGVudFN0YXRlLmFjdGl2ZTtcclxuXHJcblx0XHRkaXNhYmxlZEluZGVudFN0YXRlLm9uRW5hYmxlID0gKCkgPT4ge1xyXG5cdFx0XHQkKFYuY2FudmFzLnNlbGVjdG9yLm1vZHVsZV9pdGVtKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFswLDEsMiwzLDQsNV0uZm9yRWFjaChsZXZlbCA9PiAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiaW5kZW50X1wiICsgbGV2ZWwpKTtcclxuXHRcdFx0XHRjb25zdCBkZWZMZXZlbCA9ICQodGhpcykuYXR0cihWLmRhdGFBdHRyLmRlZl9pbmRlbnQpO1xyXG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoXCJpbmRlbnRfXCIgKyBkZWZMZXZlbCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHRcdGRpc2FibGVkSW5kZW50U3RhdGUub25EaXNhYmxlID0gKCkgPT4ge1xyXG5cdFx0XHRbMCwxLDIsMyw0LDVdLmZvckVhY2gobGV2ZWwgPT4gJChWLmNhbnZhcy5zZWxlY3Rvci5tb2R1bGVfaXRlbSkucmVtb3ZlQ2xhc3MoXCJpbmRlbnRfXCIgKyBsZXZlbCkpO1xyXG5cdFx0XHQkKFYuY2FudmFzLnNlbGVjdG9yLnN1YmhlYWRlcikuYWRkQ2xhc3MoXCJpbmRlbnRfXCIgKyBWLnVpLnN1YmhlYWRlcl9pbmRlbnQpO1xyXG5cdFx0XHQkKFYuY2FudmFzLnNlbGVjdG9yLm5vdF9zdWJoZWFkZXIpLmFkZENsYXNzKFwiaW5kZW50X1wiICsgVi51aS5tYWluX2luZGVudCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdCQoVi5jYW52YXMuc2VsZWN0b3IubW9kdWxlX2l0ZW0pLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnN0IGRlZkluZGVudCA9XHJcblx0XHRcdFx0WzAsMSwyLDMsNCw1XS5maWx0ZXIobGV2ZWwgPT4gJCh0aGlzKS5oYXNDbGFzcyhcImluZGVudF9cIiArIGxldmVsKSlbMF07XHJcblx0XHRcdCQodGhpcykuYXR0cihWLmRhdGFBdHRyLmRlZl9pbmRlbnQsIGRlZkluZGVudCk7XHJcblx0XHRcdGlmICghZGlzYWJsZWRJbmRlbnQpXHJcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcImluZGVudF9cIiArIGRlZkluZGVudCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIWRpc2FibGVkSW5kZW50KSB7XHJcblx0XHRcdCQoVi5jYW52YXMuc2VsZWN0b3Iuc3ViaGVhZGVyKS5hZGRDbGFzcyhcImluZGVudF9cIiArIFYudWkuc3ViaGVhZGVyX2luZGVudCk7XHJcblx0XHRcdCQoVi5jYW52YXMuc2VsZWN0b3Iubm90X3N1YmhlYWRlcikuYWRkQ2xhc3MoXCJpbmRlbnRfXCIgKyBWLnVpLm1haW5faW5kZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyA9PT0gcGxhY2UgYW5kIHBvcHVsYXRlIHRoZSB0YWJsZSBvZiBjb250ZW50cyA9PT1cclxuXHJcblx0XHRjb25zdCB0b2MgPSAkKFYuZWxlbWVudC50b2MpO1xyXG5cdFx0Y29uc3QgdWwgPSB0b2MuZmluZChcInVsXCIpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgW21vZElkLCBtb2RdIG9mIERBVEEubW9kdWxlcykge1xyXG5cclxuXHRcdFx0Y29uc3QgZm9ybWF0dGVkID0gVXRpbHMuZm9ybWF0KFYuZWxlbWVudC50b2NfaXRlbSwge2l0ZW1fbmFtZTogbW9kLm5hbWUsIGl0ZW1faWQ6IG1vZElkfSk7XHJcblx0XHRcdCQoZm9ybWF0dGVkKVxyXG5cdFx0XHRcdC5maW5kKFwiYVwiKVxyXG5cdFx0XHRcdC5jbGljayhlID0+IHtcclxuXHRcdFx0XHRcdGNvbnN0IG1vZHVsZUVsID0gJChcIiNjb250ZXh0X21vZHVsZV9cIiArIG1vZElkKTtcclxuXHRcdFx0XHRcdFVJLnNjcm9sbFRvRWxlbWVudChtb2R1bGVFbCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKG1vZHVsZUVsLmhhc0NsYXNzKFwiY29sbGFwc2VkX21vZHVsZVwiKSlcclxuXHRcdFx0XHRcdFx0bW9kdWxlRWwuZmluZChcIi5leHBhbmRfbW9kdWxlX2xpbmtcIikuY2xpY2soKTtcclxuXHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuZW5kKClcclxuXHRcdFx0XHQuYXBwZW5kVG8odWwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdERBVEEuZWxlbWVudHMudG9jID0gdG9jXHJcblx0XHRcdC5jc3MoXCJ0b3BcIiwgUEFHRS5sZWZ0LmhlaWdodCgpICsgVi51aS50b2NfdG9wX21hcmdpbilcclxuXHRcdFx0LmFwcGVuZFRvKFBBR0UubWFpbilcclxuXHRcdFx0LmRhdGEoXCJjdXRvZmZcIiwgdG9jLm9mZnNldCgpLnRvcCAtIFYudWkudG9jX3RvcF9tYXJnaW4pO1xyXG5cclxuXHRcdEFycmF5LmZyb20oREFUQS5tb2R1bGVzLnZhbHVlcygpKS5mb3JFYWNoKFVJLnVwZGF0ZU1vZHVsZSk7XHJcblxyXG5cdFx0Ly8gPT09IGFkZCBjbGljayBldmVudCBmb3IgaGlkZSBidXR0b25zID09PVxyXG5cclxuXHRcdFBBR0UubWFpbi5vbihcImNsaWNrXCIsIGAuJHtWLmNzc0NsYXNzLmhpZGVfYnV0dG9ufSA+IGlgLCBhc3luYyBmdW5jdGlvbigpIHtcclxuXHRcdFx0YXdhaXQgTWFpbi5vbkhpZGVCdXR0b25DbGljaygkKHRoaXMpKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vID09PSBhZGQgYnV0dG9ucyB0byBGSUxFIGFuZCBFWFRFUk5BTF9VUkwgaXRlbXMgPT09XHJcblxyXG5cdFx0Zm9yIChjb25zdCBbLCBpdGVtXSBvZiBEQVRBLm1vZHVsZUl0ZW1zKSB7XHJcblxyXG5cdFx0XHRpZiAoaXRlbS50eXBlID09PSBNb2R1bGVJdGVtVHlwZS5GSUxFKSB7XHJcblx0XHRcdFx0Y29uc3QgZWxlbWVudCA9IFV0aWxzLmZvcm1hdChWLmVsZW1lbnQuZG93bmxvYWRfYnV0dG9uLCB7XHJcblx0XHRcdFx0XHRmaWxlX3VybDogaXRlbS5maWxlRGF0YS51cmwsXHJcblx0XHRcdFx0XHRmaWxlbmFtZTogaXRlbS5maWxlRGF0YS5kaXNwbGF5X25hbWVcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQkKGVsZW1lbnQpLmluc2VydEJlZm9yZShpdGVtLmNoZWNrYm94RWxlbWVudCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoaXRlbS50eXBlID09PSBNb2R1bGVJdGVtVHlwZS5FWFRFUk5BTF9VUkwpIHtcclxuXHRcdFx0XHRjb25zdCBlbGVtZW50ID0gVXRpbHMuZm9ybWF0KFYuZWxlbWVudC51cmxfYnV0dG9uLCB7XHJcblx0XHRcdFx0XHRleHRlcm5hbF91cmw6IGl0ZW0uZXh0ZXJuYWxVcmxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQkKGVsZW1lbnQpLmluc2VydEJlZm9yZShpdGVtLmNoZWNrYm94RWxlbWVudCk7XHJcblxyXG5cdFx0XHRcdCQoXCIjXCIgKyBpdGVtLmNhbnZhc0VsZW1lbnRJZCkuZmluZChcImEuZXh0ZXJuYWxfdXJsX2xpbmsudGl0bGVcIilcclxuXHRcdFx0XHRcdC5hdHRyKFwiaHJlZlwiLCBmdW5jdGlvbigpIHsgcmV0dXJuICQodGhpcykuYXR0cihcImRhdGEtaXRlbS1ocmVmXCIpOyB9KVxyXG5cdFx0XHRcdFx0LnJlbW92ZUF0dHIoXCJ0YXJnZXQgcmVsXCIpXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoXCJleHRlcm5hbFwiKVxyXG5cdFx0XHRcdFx0LmFkZENsYXNzKFwiaWctdGl0bGVcIilcclxuXHRcdFx0XHRcdC5maW5kKFwiLnVpLWljb25cIikucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQkKFwiLlwiICsgVi5jc3NDbGFzcy5kb3dubG9hZCkuYWRkKFwiLlwiICsgVi5jc3NDbGFzcy5leHRlcm5hbF91cmwpLnNob3coKTtcclxuXHJcblx0fSAvLyBlbmQgaW5pdFBhZ2VcclxuXHJcblx0c3RhdGljIGdldFN0YXRlKHN0YXRlTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRpZiAoREFUQS5zdGF0ZXMuaGFzKHN0YXRlTmFtZSkpIHtcclxuXHRcdFx0Y29uc3Qgc3RhdGUgPSBEQVRBLnN0YXRlcy5nZXQoc3RhdGVOYW1lKTtcclxuXHRcdFx0cmV0dXJuIHN0YXRlLmFjdGl2ZTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyBzZXRTdGF0ZShzdGF0ZU5hbWU6IHN0cmluZywgc3RhdGU6IGJvb2xlYW4pIHtcclxuXHRcdGlmICghREFUQS5zdGF0ZXMuaGFzKHN0YXRlTmFtZSkpIHJldHVybjtcclxuXHJcblx0XHRjb25zdCBzdGF0ZU9iaiA9IERBVEEuc3RhdGVzLmdldChzdGF0ZU5hbWUpO1xyXG5cclxuXHRcdGlmICghc3RhdGVPYmoub25QYWdlcy5pbmNsdWRlcyhEQVRBLmNvdXJzZVBhZ2UpKSByZXR1cm47XHJcblxyXG5cdFx0aWYgKHN0YXRlT2JqLmJvZHlDbGFzcylcclxuXHRcdFx0UEFHRS5ib2R5LnRvZ2dsZUNsYXNzKHN0YXRlT2JqLmJvZHlDbGFzcywgc3RhdGUpO1xyXG5cclxuXHRcdHN0YXRlT2JqLmFjdGl2ZSA9IHN0YXRlO1xyXG5cdFx0c3RhdGVPYmoub25DaGFuZ2Uoc3RhdGUpO1xyXG5cclxuXHRcdGNvbnN0IHVybCA9IFV0aWxzLmZvcm1hdFVybChWLmNhbnZhcy5hcGkudXJscy5jdXN0b21fZGF0YSwge1xyXG5cdFx0XHRkYXRhUGF0aDogXCIvXCIgKyBWLmNhbnZhcy5hcGkuZGF0YV91cmxzLmFjdGl2ZV9zdGF0ZXNcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIFV0aWxzLmVkaXREYXRhQXJyYXkodXJsLCBzdGF0ZSwgW3N0YXRlTmFtZV0pO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHNldE5hdlRhYlBvc2l0aW9uKHRhYjogTmF2VGFiLCBwb3NpdGlvbjogbnVtYmVyKSB7XHJcblxyXG5cdFx0Y29uc3QgdXJsID0gVXRpbHMuZm9ybWF0VXJsKFYuY2FudmFzLmFwaS51cmxzLmN1c3RvbV9kYXRhLCB7XHJcblx0XHRcdGRhdGFQYXRoOiBbXCJcIiwgVi5jYW52YXMuYXBpLmRhdGFfdXJscy50YWJfcG9zaXRpb25zLCBEQVRBLmNvdXJzZUlELCB0YWIuaWRdLmpvaW4oXCIvXCIpXHJcblx0XHR9KTtcclxuXHJcblx0XHRjb25zdCBzdWNjZXNzID0gYXdhaXQgVXRpbHMucHV0RGF0YSh1cmwsIHBvc2l0aW9uKTtcclxuXHJcblx0XHRpZiAoc3VjY2Vzcykge1xyXG5cdFx0XHR0YWIuc2V0UG9zaXRpb24ocG9zaXRpb24pO1xyXG5cdFx0XHRVSS51cGRhdGVOYXZUYWJQb3NpdGlvbih0YWIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRhYiBwb3NpdGlvbiB1cGRhdGUgZmFpbGVkLlwiKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIGVsZW1lbnQgaXMgdGhlIDxpbnB1dD5cclxuXHRzdGF0aWMgYXN5bmMgb25DaGVja2JveENoYW5nZShlbDogSFRNTElucHV0RWxlbWVudCkge1xyXG5cdFx0Y29uc3QgaWQgPSBOdW1iZXIoJChlbCkuYXR0cihWLmRhdGFBdHRyLm1vZF9pdGVtX2lkKSk7XHJcblx0XHRjb25zdCBpdGVtID0gREFUQS5tb2R1bGVJdGVtcy5nZXQoaWQpO1xyXG5cdFx0Y29uc3Qgc3RhdHVzID0gZWwuY2hlY2tlZDtcclxuXHRcdGNvbnN0IG9sZFRpdGxlID0gZWwudGl0bGU7XHJcblxyXG5cdFx0Ly8gcmVzZXQgYmFjayB0byBwcmV2aW91cyBzdGF0ZSB0byBhbGxvdyBmb3IgdmFsaWRhdGlvblxyXG5cdFx0ZWwuY2hlY2tlZCA9ICFzdGF0dXM7XHJcblxyXG5cdFx0Ly8gYmVmb3JlIHVwZGF0aW5nIFwiaXRlbVwiLCBjaGVjayBpZiBpdCdzIGFscmVhZHkgdGhlIHNhbWUuIGlmIHNvLCB3ZSBoYXZlIGEgZGVzeW5jXHJcblx0XHRpZiAoc3RhdHVzID09PSBpdGVtLmNoZWNrZWQpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIkNoZWNrYm94IGRlc3luYyBhdCBpdGVtXCIsIGl0ZW0pO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVE9ETyBjcmVhdGUgYSBiZXR0ZXIgbWV0aG9kIGZvciB3YWl0aW5nLWRpc2FibGUgZm9yIGNoZWNrYm94IGFuZCBoaWRlIGJ1dHRvblxyXG5cdFx0Ly8gLSBoYXZlIGEgZGlmZmVyZW50IGNsYXNzIGFwcGxpZWQgdGhhdCBzZXRzIHRoZSBjdXJzb3IgdG8gd2FpdGluZyBtb2RlIGFuZCBkaW1zIHRoZSBidXR0b25cclxuXHJcblx0XHQvLyBkaXNhYmxlIHVudGlsIHdlIGNvbmZpcm0gd2UgY2FuIHVwZGF0ZSB0aGUgZGF0YVxyXG5cdFx0ZWwuZGlzYWJsZWQgPSB0cnVlO1xyXG5cdFx0ZWwudGl0bGUgPSBWLnRvb2x0aXAud2FpdGluZztcclxuXHJcblx0XHRjb25zdCB1cmwgPSBVdGlscy5mb3JtYXRVcmwoVi5jYW52YXMuYXBpLnVybHMuY3VzdG9tX2RhdGEsIHtcclxuXHRcdFx0ZGF0YVBhdGg6IFtcIlwiLCBWLmNhbnZhcy5hcGkuZGF0YV91cmxzLmNvbXBsZXRlZF9hc3NpZ25tZW50cywgREFUQS5jb3Vyc2VJRF0uam9pbihcIi9cIilcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBVdGlscy5lZGl0RGF0YUFycmF5KHVybCwgc3RhdHVzLCBbaWRdKTtcclxuXHJcblx0XHRlbC5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdFx0ZWwudGl0bGUgPSBvbGRUaXRsZTtcclxuXHJcblx0XHRpZiAoc3VjY2Vzcykge1xyXG5cdFx0XHRpdGVtLmNoZWNrZWQgPSBzdGF0dXM7XHJcblx0XHRcdFVJLnVwZGF0ZU1vZHVsZShpdGVtLm1vZHVsZSk7XHJcblx0XHRcdFVJLnVwZGF0ZUNoZWNrYm94KGl0ZW0pO1xyXG5cdFx0XHRjb25zb2xlLmRlYnVnKGBJdGVtIElEICR7aWR9ICgke2l0ZW0ubmFtZS5zdWJzdHIoMCwgMjUpfS4uLilgICtcclxuXHRcdFx0XHRgaGFzIGJlZW4gJHtlbC5jaGVja2VkID8gXCJcIiA6IFwidW5cIn1jaGVja2VkYCk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0Ly8gZWxlbWVudCBpcyA8aT5cclxuXHRzdGF0aWMgYXN5bmMgb25IaWRlQnV0dG9uQ2xpY2soZWw6IEpRdWVyeSkge1xyXG5cdFx0Y29uc3QgaWQgPSBOdW1iZXIoZWwuYXR0cihWLmRhdGFBdHRyLm1vZF9pdGVtX2lkKSk7XHJcblx0XHRjb25zdCBpdGVtID0gREFUQS5tb2R1bGVJdGVtcy5nZXQoaWQpO1xyXG5cclxuXHRcdC8vIGNhbmNlbCBoaWRpbmcgaWYgdGhlIGl0ZW0gaXMgZ3JhZGVkIG9yIGhhcyBoaWRpbmcgbWFudWFsbHkgZGlzYWJsZWQgZm9yIGFueSBvdGhlciByZWFzb25cclxuXHRcdGlmIChpdGVtLmlzR3JhZGVkIHx8IGl0ZW0uaGlkZUVsZW1lbnQuaGFzQ2xhc3MoVi5jc3NDbGFzcy5oaWRlX2Rpc2FibGVkKSkgcmV0dXJuO1xyXG5cclxuXHRcdC8vIGRpc2FibGUgdW50aWwgdXBkYXRpbmcgY29tcGxldGUuIHRoaXMgaXMgdW5kb25lIGJ5IHVwZGF0ZUhpZGVCdXR0b24gbGF0ZXJcclxuXHRcdGl0ZW0uaGlkZUVsZW1lbnRcclxuXHRcdFx0LmFkZENsYXNzKFYuY3NzQ2xhc3MuaGlkZV9kaXNhYmxlZClcclxuXHRcdFx0LmZpbmQoXCJpXCIpXHJcblx0XHRcdC5hdHRyKFwidGl0bGVcIiwgVi50b29sdGlwLndhaXRpbmcpO1xyXG5cclxuXHRcdGNvbnN0IG5ld1N0YXRlID0gIWl0ZW0uaGlkZGVuO1xyXG5cclxuXHRcdGNvbnN0IHVybCA9IFV0aWxzLmZvcm1hdFVybChWLmNhbnZhcy5hcGkudXJscy5jdXN0b21fZGF0YSwge1xyXG5cdFx0XHRkYXRhUGF0aDogW1wiXCIsIFYuY2FudmFzLmFwaS5kYXRhX3VybHMuaGlkZGVuX2Fzc2lnbm1lbnRzLCBEQVRBLmNvdXJzZUlEXS5qb2luKFwiL1wiKVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc3Qgc3VjY2VzcyA9IGF3YWl0IFV0aWxzLmVkaXREYXRhQXJyYXkodXJsLCBuZXdTdGF0ZSwgW2lkXSk7XHJcblxyXG5cdFx0aWYgKHN1Y2Nlc3MpIHtcclxuXHRcdFx0aXRlbS5oaWRkZW4gPSBuZXdTdGF0ZTtcclxuXHRcdFx0YXdhaXQgVUkudXBkYXRlSXRlbUhpZGUoaXRlbSk7XHJcblx0XHRcdFVJLnVwZGF0ZU1vZHVsZShpdGVtLm1vZHVsZSk7XHJcblx0XHRcdGNvbnNvbGUuZGVidWcoYEl0ZW0gSUQgJHtpZH0gKCR7aXRlbS5uYW1lLnN1YnN0cigwLCAyNSl9Li4uKSBoYXMgYmVlbiAke2l0ZW0uaGlkZGVuID8gXCJcIiA6IFwidW5cIn1oaWRkZW5gKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBvbk1lc3NhZ2UoZGF0YTogTWVzc2FnZURhdGEsIHNvdXJjZTogY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlciwgcmVzcG9uZEZ1bmM6IChkYXRhPzogYW55KSA9PiB2b2lkKSB7XHJcblxyXG5cdFx0aWYgKHNvdXJjZS5pZCAhPT0gREFUQS5leHRlbnNpb25JZCkgcmV0dXJuO1xyXG5cclxuXHRcdGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkJBU0lDKSB7XHJcblxyXG5cdFx0XHRjb25zdCB1bmNoZWNrZWQgPSBBcnJheS5mcm9tKERBVEEubW9kdWxlSXRlbXMudmFsdWVzKCkpXHJcblx0XHRcdFx0LmZpbHRlcihpID0+ICFpLmNoZWNrZWQgJiYgIWkuaGlkZGVuICYmICFpLmlzU3ViSGVhZGVyKTtcclxuXHJcblx0XHRcdHN3aXRjaCAoZGF0YS5hY3Rpb24pIHtcclxuXHRcdFx0XHRjYXNlIFwicGluZ1wiOlxyXG5cdFx0XHRcdFx0cmVzcG9uZEZ1bmMoe3Bvbmc6ICQubm93KCl9KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgXCJjb3VudCB1bmNoZWNrZWRcIjpcclxuXHRcdFx0XHRcdHJlc3BvbmRGdW5jKHtjb3VudDogdW5jaGVja2VkLmxlbmd0aH0pO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdC8qXHRjYXNlIFwidXBkYXRlIHRva2VuXCI6XHJcblx0XHRcdFx0XHRVdGlscy5sb2FkVG9rZW4ocmVzcG9uZEZ1bmMpO1xyXG5cdFx0XHRcdFx0YnJlYWs7Ki9cclxuXHRcdFx0XHRjYXNlIFwianVtcCB0byBmaXJzdCB1bmNoZWNrZWRcIjpcclxuXHRcdFx0XHRcdGNvbnN0IHVuY2hlY2tlZEVscyA9IHVuY2hlY2tlZFxyXG5cdFx0XHRcdFx0XHQubWFwKGkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaS5jYW52YXNFbGVtZW50SWQpKTtcclxuXHRcdFx0XHRcdFVJLnNjcm9sbFRvRWxlbWVudCgkKHVuY2hlY2tlZEVscykuZmlyc3QoKSk7XHJcblx0XHRcdFx0XHRyZXNwb25kRnVuYygpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihcIlVua25vd24gYmFzaWMgbWVzc2FnZSBpbiBjb250ZW50IHNjcmlwdDpcIiwgZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuU1RBVEUpIHtcclxuXHRcdFx0Y29uc3Qgc3RhdGVEYXRhID0gZGF0YSBhcyBTdGF0ZU1lc3NhZ2VEYXRhO1xyXG5cdFx0XHRpZiAoZGF0YS5hY3Rpb24gPT09IFwiZ2V0XCIpIHtcclxuXHRcdFx0XHRjb25zdCBzdGF0ZSA9IE1haW4uZ2V0U3RhdGUoc3RhdGVEYXRhLnN0YXRlTmFtZSk7XHJcblx0XHRcdFx0cmVzcG9uZEZ1bmMoe3N0YXRlfSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoZGF0YS5hY3Rpb24gPT09IFwic2V0XCIpIHtcclxuXHRcdFx0XHRNYWluLnNldFN0YXRlKHN0YXRlRGF0YS5zdGF0ZU5hbWUsIHN0YXRlRGF0YS5zdGF0ZSkudGhlbihzdWNjZXNzID0+IHtcclxuXHRcdFx0XHRcdHJlc3BvbmRGdW5jKHN1Y2Nlc3MpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlOyAvLyB0aGlzIHRlbGxzIGNocm9tZSB0aGF0IHdlIHdhbnQgdGhpcyByZXNwb25zZSB0byBiZSBhc3luY1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUud2FybihcIlVua25vd24gc3RhdGUgbWVzc2FnZSBpbiBjb250ZW50IHNjcmlwdDpcIiwgZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLndhcm4oXCJVbmtub3duIG1lc3NhZ2UgaW4gY29udGVudCBzY3JpcHQ6XCIsIGRhdGEpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgVUkge1xyXG5cclxuXHRzdGF0aWMgdXBkYXRlQ2hlY2tib3goaXRlbTogTW9kdWxlSXRlbSkge1xyXG5cdFx0aWYgKGl0ZW0uY2hlY2tib3hFbGVtZW50ID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBjaGVja2JveCB0byB1cGRhdGVcIik7XHJcblx0XHRpdGVtLmNoZWNrYm94RWxlbWVudFxyXG5cdFx0XHQuZmluZChcImlucHV0XCIpXHJcblx0XHRcdC5wcm9wKFwiY2hlY2tlZFwiLCBpdGVtLmNoZWNrZWQpXHJcblx0XHRcdC5hdHRyKFwidGl0bGVcIiwgaXRlbS5jaGVja2VkID8gVi50b29sdGlwLm1hcmtfaW5jb21wbGV0ZSA6IFYudG9vbHRpcC5tYXJrX2NvbXBsZXRlKVxyXG5cdFx0XHQuY2xvc2VzdChWLmNhbnZhcy5zZWxlY3Rvci5tb2R1bGVfaXRlbSlcclxuXHRcdFx0LnRvZ2dsZUNsYXNzKFYuY3NzQ2xhc3MuY2hlY2tib3hfY2hlY2tlZCwgaXRlbS5jaGVja2VkKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyB1cGRhdGVJdGVtSGlkZShpdGVtOiBNb2R1bGVJdGVtLCBpbnN0YW50PzogYm9vbGVhbikge1xyXG5cdFx0aWYgKGl0ZW0uaGlkZUVsZW1lbnQgPT09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIk5vIGhpZGUgYnV0dG9uIHRvIHVwZGF0ZVwiKTtcclxuXHJcblx0XHRjb25zdCBtb2RJdGVtRWwgPSBpdGVtLmhpZGVFbGVtZW50LmNsb3Nlc3QoVi5jYW52YXMuc2VsZWN0b3IubW9kdWxlX2l0ZW0pO1xyXG5cdFx0Y29uc3QgaUVsID0gaXRlbS5oaWRlRWxlbWVudC5maW5kKFwiaVwiKTtcclxuXHJcblx0XHQvLyB1cGRhdGUgaGlkZGVuIGNsYXNzIG9uIHRoZSA8aT4gYW5kIDxsaT5cclxuXHRcdGlFbC5hZGQobW9kSXRlbUVsKS50b2dnbGVDbGFzcyhWLmNzc0NsYXNzLml0ZW1faGlkZGVuLCBpdGVtLmhpZGRlbik7XHJcblxyXG5cdFx0aWYgKCFpbnN0YW50KSBhd2FpdCBVdGlscy53YWl0KFYudWkuZmFkZV90aW1lKTtcclxuXHJcblx0XHQvLyB1cGRhdGUgZGlzYWJsZSBzdGF0dXMgYW5kIHRpdGxlLCB1bmRvaW5nIHdhaXRpbmctZGlzYWJsZVxyXG5cdFx0aXRlbS5oaWRlRWxlbWVudC50b2dnbGVDbGFzcyhWLmNzc0NsYXNzLmhpZGVfZGlzYWJsZWQsIGl0ZW0uaXNHcmFkZWQpO1xyXG5cdFx0aUVsLmF0dHIoXCJ0aXRsZVwiLCBpdGVtLmlzR3JhZGVkID8gVi50b29sdGlwLmhpZGVfZGlzYWJsZWQgOiBpdGVtLmhpZGRlbiA/IFYudG9vbHRpcC51bmhpZGUgOiBWLnRvb2x0aXAuaGlkZSk7XHJcblxyXG5cdH1cclxuXHJcblx0c3RhdGljIHVwZGF0ZU1vZHVsZShtb2R1bGU6IE1vZHVsZSkge1xyXG5cclxuXHRcdGlmIChEQVRBLmVsZW1lbnRzLnRvYyAhPT0gbnVsbCkge1xyXG5cdFx0XHRjb25zdCBhbGxJdGVtcyA9IG1vZHVsZS5pdGVtcy5maWx0ZXIoaSA9PiAhaS5pc1N1YkhlYWRlciAmJiAhaS5oaWRkZW4pO1xyXG5cdFx0XHRjb25zdCB0b3RhbEl0ZW1zID0gYWxsSXRlbXMubGVuZ3RoO1xyXG5cclxuXHRcdFx0bGV0IGNoZWNrZWRJdGVtczogbnVtYmVyO1xyXG5cdFx0XHRsZXQgcGVyY2VudDogbnVtYmVyO1xyXG5cclxuXHRcdFx0aWYgKHRvdGFsSXRlbXMgPiAwKSB7XHJcblx0XHRcdFx0Y2hlY2tlZEl0ZW1zID0gYWxsSXRlbXMuZmlsdGVyKGkgPT4gaS5jaGVja2VkKS5sZW5ndGg7XHJcblx0XHRcdFx0cGVyY2VudCA9IE1hdGgucm91bmQoY2hlY2tlZEl0ZW1zIC8gdG90YWxJdGVtcyAqIDEwMCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Y2hlY2tlZEl0ZW1zID0gMDtcclxuXHRcdFx0XHRwZXJjZW50ID0gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29uc3QgYmFja2dyb3VuZEltYWdlID0gVXRpbHMuZm9ybWF0KFYubWlzYy50b2NfYmFja2dyb3VuZCwge3BlcmNlbnR9KTtcclxuXHJcblx0XHRcdERBVEEuZWxlbWVudHMudG9jXHJcblx0XHRcdFx0LmZpbmQoYFske1YuZGF0YUF0dHIudG9jX21vZHVsZV9pZH09JyR7bW9kdWxlLmlkfSddYClcclxuXHRcdFx0XHQuYXR0cihWLmRhdGFBdHRyLnRvY190b3RhbCwgdG90YWxJdGVtcylcclxuXHRcdFx0XHQuYXR0cihWLmRhdGFBdHRyLnRvY19jaGVja2VkX2NvdW50LCBjaGVja2VkSXRlbXMpXHJcblx0XHRcdFx0LmF0dHIoVi5kYXRhQXR0ci50b2NfcGVyY2VudGFnZSwgcGVyY2VudClcclxuXHRcdFx0XHQuY2xvc2VzdChcImxpXCIpXHJcblx0XHRcdFx0LnRvZ2dsZUNsYXNzKFYuY3NzQ2xhc3MuaXRlbV9oaWRkZW4sIHRvdGFsSXRlbXMgPT09IDApXHJcblx0XHRcdFx0LmNzcyh7YmFja2dyb3VuZEltYWdlfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gaWYgbm8gdmlzaWJsZSBpdGVtcyBpbiB0aGlzIG1vZHVsZSwgaGlkZSB0aGUgZW50aXJlIG1vZHVsZVxyXG5cdFx0Y29uc3Qgbm9JdGVtcyA9IG1vZHVsZS5pdGVtcy5maWx0ZXIoaSA9PiAhaS5pc1N1YkhlYWRlciAmJiAhaS5oaWRkZW4pLmxlbmd0aCA9PT0gMDtcclxuXHRcdCQoXCIjY29udGV4dF9tb2R1bGVfXCIgKyBtb2R1bGUuaWQpLnRvZ2dsZUNsYXNzKFYuY3NzQ2xhc3MuaXRlbV9oaWRkZW4sIG5vSXRlbXMpO1xyXG5cclxuXHR9XHJcblxyXG5cdHN0YXRpYyB1cGRhdGVOYXZUYWJQb3NpdGlvbih0YWI6IE5hdlRhYikge1xyXG5cclxuXHRcdGlmICghdGFiLmhhc0N1c3RvbVBvc2l0aW9uKSB0aHJvdyBuZXcgRXJyb3IoXCJUYWIgaGFzIG5vIGN1c3RvbSBwb3NpdGlvblwiKTtcclxuXHJcblx0XHRjb25zdCB0YWJMaXN0ID0gJChWLmNhbnZhcy5zZWxlY3Rvci5uYXZfdGFicyk7XHJcblx0XHRjb25zdCB0YWJFbCA9IHRhYkxpc3QuZmluZChcImEuXCIgKyB0YWIuaWQpLnBhcmVudCgpO1xyXG5cclxuXHRcdGlmICh0YWIuaGlkZGVuKVxyXG5cdFx0XHR0YWJFbC5oaWRlKCk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRhYkVsLnNob3coKS5kZXRhY2goKS5pbnNlcnRCZWZvcmUodGFiTGlzdC5jaGlsZHJlbigpLmVxKHRhYi5wb3NpdGlvbiAtIDEpKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyB1cGRhdGVTY3JvbGxQb3NpdGlvbigpIHtcclxuXHRcdGNvbnN0IHNjcm9sbFRvcCA9IFBBR0Uuc2Nyb2xsaW5nRWxlbWVudC5wcm9wKFwic2Nyb2xsVG9wXCIpO1xyXG5cclxuXHRcdGlmIChEQVRBLmVsZW1lbnRzLnRvYyAhPT0gbnVsbCkge1xyXG5cdFx0XHREQVRBLmVsZW1lbnRzLnRvY1xyXG5cdFx0XHRcdC50b2dnbGVDbGFzcyhWLmNzc0NsYXNzLmZpeGVkLCBzY3JvbGxUb3AgPiBEQVRBLmVsZW1lbnRzLnRvYy5kYXRhKFwiY3V0b2ZmXCIpKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoREFUQS5lbGVtZW50cy5qdW1wX2J1dHRvbiAhPT0gbnVsbCkge1xyXG5cdFx0XHREQVRBLmVsZW1lbnRzLmp1bXBfYnV0dG9uXHJcblx0XHRcdFx0LnRvZ2dsZUNsYXNzKFYuY3NzQ2xhc3MuYWN0aXZlLCBzY3JvbGxUb3AgPiBWLnVpLmp1bXBfdG9wX2N1dG9mZik7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0c3RhdGljIHNjcm9sbFRvRWxlbWVudChlbGVtZW50OiBKUXVlcnkpIHtcclxuXHRcdGNvbnN0IGVsUmVjdCA9IGVsZW1lbnRbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHRjb25zdCBjbGlIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG5cdFx0Y29uc3QgdG9wUmF0aW8gPSBWLnVpLnRvcF9pbnNpZGVfcmF0aW87XHJcblxyXG5cdFx0Ly8gaWYgZWxlbWVudCBpcyBpbiB2aWV3cG9ydCwganVzdCBmbGFzaCBpdFxyXG5cdFx0LypcdGluIHZpZXdwb3J0IGlmLi4uXHJcblx0XHQgaGVpZ2h0IGlzIHNob3J0ZXIgdGhhbiB2aWV3cG9ydCBhbmQgYm90aCB0b3AgYW5kIGJvdHRvbSBhcmUgaW5zaWRlIE9SXHJcblx0XHQgaGVpZ2h0IGlzIHRhbGxlciB0aGFuIHZpZXdwb3J0IGFuZCB0b3AgaXMgd2l0aGluIHRvcCBwYXJ0IG9mIHBhZ2VcclxuXHRcdCAqL1xyXG5cdFx0aWYgKChlbFJlY3QuaGVpZ2h0IDwgY2xpSGVpZ2h0ICYmIGVsUmVjdC50b3AgPj0gMCAmJiBlbFJlY3QuYm90dG9tIDwgY2xpSGVpZ2h0KSB8fFxyXG5cdFx0XHQoZWxSZWN0LnRvcCA+PSAwICYmIGVsUmVjdC50b3AgPD0gY2xpSGVpZ2h0ICogdG9wUmF0aW8pKSB7XHJcblx0XHRcdFVJLmZsYXNoRWxlbWVudChlbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdGVsc2UgeyAvLyBpZiBub3QsIHNjcm9sbCB0byBpdFxyXG5cdFx0XHRjb25zdCBzY3JvbGxUb3AgPSBlbGVtZW50Lm9mZnNldCgpLnRvcCAtIFYudWkuc2Nyb2xsX3RvcF9vZmZzZXQ7XHJcblx0XHRcdFBBR0Uuc2Nyb2xsaW5nRWxlbWVudC5hbmltYXRlKHtzY3JvbGxUb3B9LFxyXG5cdFx0XHRcdFYudWkuc2Nyb2xsX3RpbWUsXHJcblx0XHRcdFx0KCkgPT4gVUkuZmxhc2hFbGVtZW50KGVsZW1lbnQpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBmbGFzaEVsZW1lbnQoZWxlbWVudDogSlF1ZXJ5KSB7XHJcblx0XHRlbGVtZW50LmFkZENsYXNzKFYuY3NzQ2xhc3MuZmxhc2gpO1xyXG5cdFx0c2V0VGltZW91dCgoKSA9PiBlbGVtZW50LnJlbW92ZUNsYXNzKFYuY3NzQ2xhc3MuZmxhc2gpLCAxMDAwKTtcclxuXHR9XHJcblxyXG59XHJcbi8vIGVuZCBNQUlOXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90cy9tYWluLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==