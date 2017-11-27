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
                jumpButton.parent().show();
                next();
            }
        });
    })).then(() => new Promise(next => {
        let remaining = Object.keys(__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].state).length;
        $.each(__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].state, (stateName, stateData) => {
            sendMessage(new __WEBPACK_IMPORTED_MODULE_2__objects__["m" /* StateMessageData */]("get", stateName), resp => {
                const el = $(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* format */])(__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].element.popup_state_switch, { name: stateName, desc: stateData.desc }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDY1MTNkOTYzZDQzOTI4YzUxZTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL3ZhcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL29iamVjdHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy90cy9wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBO0lBbUdDO1FBakdBLFdBQU0sR0FBRyxjQUFjLENBQUM7UUFFeEIsYUFBUSxHQUFHO1lBQ1YsTUFBTSxFQUFFLFFBQVE7WUFDaEIsZUFBZSxFQUFFLGlCQUFpQjtZQUNsQyxnQkFBZ0IsRUFBRSxrQkFBa0I7WUFDcEMsV0FBVyxFQUFFLGFBQWE7WUFDMUIsS0FBSyxFQUFFLFlBQVk7WUFDbkIsZ0JBQWdCLEVBQUUsa0JBQWtCO1lBQ3BDLFdBQVcsRUFBRSxRQUFRO1lBQ3JCLFdBQVcsRUFBRSxVQUFVO1lBQ3ZCLGFBQWEsRUFBRSxlQUFlO1lBQzlCLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLEtBQUssRUFBRSxPQUFPO1lBQ2QsU0FBUyxFQUFFLGNBQWM7WUFDekIsUUFBUSxFQUFFLGNBQWM7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RSxRQUFrQztJQUN6RSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDdkYsQ0FBQztBQUVELHVCQUF1QixRQUEwQixFQUFFLE9BQWdCO0lBQ2xFLENBQUMsQ0FBQyxRQUFRLENBQUM7U0FDVCxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztTQUN4QixNQUFNLEVBQUU7U0FDUixXQUFXLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3RDLENBQUMiLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0NjUxM2Q5NjNkNDM5MjhjNTFlMSIsImNsYXNzIFNhc3NWYXJzIHtcclxuXHJcblx0cHJlZml4ID0gXCJiZXR0ZXJDYW52YXNcIjtcclxuXHJcblx0Y3NzQ2xhc3MgPSB7XHJcblx0XHRhY3RpdmU6IFwiYWN0aXZlXCIsXHJcblx0XHRjaGVja2JveF9wYXJlbnQ6IFwiY2hlY2tib3gtcGFyZW50XCIsXHJcblx0XHRjaGVja2JveF9jaGVja2VkOiBcImNoZWNrYm94LWNoZWNrZWRcIixcclxuXHRcdGNoZWNrYm94X3RkOiBcImNoZWNrYm94LXRkXCIsXHJcblx0XHRmbGFzaDogXCJhbmltLWZsYXNoXCIsXHJcblx0XHRjb3Vyc2VfbGlua190ZXh0OiBcImNvdXJzZS1saW5rLXRleHRcIixcclxuXHRcdGl0ZW1faGlkZGVuOiBcImhpZGRlblwiLFxyXG5cdFx0aGlkZV9idXR0b246IFwiYnRuLWhpZGVcIixcclxuXHRcdGhpZGVfZGlzYWJsZWQ6IFwiaGlkZS1kaXNhYmxlZFwiLFxyXG5cdFx0dG9jX3JhdGlvOiBcInRvYy1yYXRpb1wiLFxyXG5cdFx0dG9jX3RpdGxlOiBcInRvYy10aXRsZVwiLFxyXG5cdFx0Zml4ZWQ6IFwiZml4ZWRcIixcclxuXHRcdGl0ZW1faWNvbjogXCJpY29uLXdyYXBwZXJcIixcclxuXHRcdGRvd25sb2FkOiBcImRvd25sb2FkLWJ0blwiLFxyXG5cdFx0ZXh0ZXJuYWxfdXJsOiBcInVybC1idG5cIixcclxuXHJcblx0XHRwb3B1cF9sb2FkZWQ6IFwiZG9uZS1sb2FkaW5nXCIsXHJcblx0XHRwb3B1cF9jb25uZWN0ZWQ6IFwicGFnZS1jb25uZWN0ZWRcIixcclxuXHRcdHBvcHVwX3JlcXVpcmVfcGFnZTogXCJyZXF1aXJlLXBhZ2VcIlxyXG5cdH07XHJcblxyXG5cdGRhdGFBdHRyID0ge1xyXG5cdFx0dG9jX21vZHVsZV9pZDogXCJ0b2MtbW9kdWxlLWlkXCIsXHJcblx0XHR0b2NfdG90YWw6IFwidG9jLXRvdGFsXCIsXHJcblx0XHR0b2NfY2hlY2tlZF9jb3VudDogXCJ0b2MtY2hlY2tlZC1jb3VudFwiLFxyXG5cdFx0dG9jX3BlcmNlbnRhZ2U6IFwidG9jLXBlcmNlbnRhZ2VcIixcclxuXHRcdG1vZF9pdGVtX2lkOiBcIml0ZW0taWRcIixcclxuXHRcdGNvdXJzZV9uYW1lOiBcImNvdXJzZS1uYW1lXCIsXHJcblx0XHRjb3Vyc2VfY29kZTogXCJjb3Vyc2UtY29kZVwiLFxyXG5cdFx0ZGVmX2luZGVudDogXCJkZWZhdWx0LWluZGVudFwiXHJcblx0fTtcclxuXHJcblx0aWQgPSB7XHJcblx0XHR0b2M6IFwidG9jXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJqdW1wLXRvLXRvcFwiLFxyXG5cclxuXHRcdHBvcHVwX3BhZ2VfbWlzc2luZzogXCJwYWdlLW1pc3NpbmctZXJyb3JcIixcclxuXHRcdHBvcHVwX2V4X25hbWU6IFwiZXh0ZW5zaW9uLW5hbWVcIixcclxuXHRcdHBvcHVwX2luc2VydGlvbl9wb2ludDogXCJpbnNlcnRpb24tcG9pbnRcIixcclxuXHRcdHBvcHVwX2p1bXBfYnV0dG9uOiBcImp1bXAtdG9cIlxyXG5cdH07XHJcblxyXG5cdGNvbG9yID0ge1xyXG5cdFx0dG9jX2ZpbGw6IFwicmdiYSgwLCAyNTUsIDAsIC43NSlcIixcclxuXHRcdHRvY19ib3JkZXI6IFwicmdiKDEwMiwgMTIwLCAxMzUpXCIsXHJcblx0XHR0b2NfdGl0bGU6IFwidmFyKC0taWMtYnJhbmQtcHJpbWFyeSlcIiwgLy8gd2FzIFwicmdiKDU3LCA3NSwgODgpXCIsXHJcblx0XHRjaGVja2JveF9jaGVjazogXCJyZ2IoMjIsIDE2MCwgMTMzKVwiLFxyXG5cdFx0Y2hlY2tib3hfYm9yZGVyOiBcInJnYigxMDIsIDEyMCwgMTM1KVwiLFxyXG5cdFx0aGlnaGxpZ2h0X29yYW5nZTogXCJyZ2IoMjU1LCAxNTIsIDApXCIsXHJcblx0XHRoaWdobGlnaHRfcmVkOiBcInJnYigyNTUsIDAsIDApXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJyZ2IoNTcsIDc1LCA4OClcIlxyXG5cdH07XHJcblxyXG5cdHVpID0ge1xyXG5cdFx0dG9wX2luc2lkZV9yYXRpbzogMC4wNSxcclxuXHRcdHNjcm9sbF90b3Bfb2Zmc2V0OiA1LFxyXG5cdFx0anVtcF90b3BfY3V0b2ZmOiAxMDAsXHJcblx0XHR0b2NfdG9wX21hcmdpbjogMzIsXHJcblx0XHRzY3JvbGxfdGltZTogNTAwLFxyXG5cdFx0ZmFkZV90aW1lOiA1MDAsXHJcblx0XHRzdWJoZWFkZXJfaW5kZW50OiAwLFxyXG5cdFx0bWFpbl9pbmRlbnQ6IDFcclxuXHR9O1xyXG5cclxuXHRzdGF0ZSA9IHtcclxuXHRcdHNob3dfaGlkZGVuOiB7XHJcblx0XHRcdGNzc0NsYXNzOiBcInNob3ctaGlkZGVuXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIlNob3cgaGlkZGVuIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRoaWRlX2NoZWNrZWQ6IHtcclxuXHRcdFx0Y3NzQ2xhc3M6IFwiaGlkZS1jaGVja2VkXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCIsIFwiZ3JhZGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIkhpZGUgY29tcGxldGVkIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRoaWdobGlnaHRfdW5jaGVja2VkOiB7XHJcblx0XHRcdGNzc0NsYXNzOiBcIm1hcmstdW5jaGVja2VkXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCIsIFwiZ3JhZGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIk1hcmsgdW5jaGVja2VkIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRkaXNhYmxlX2luZGVudF9vdmVycmlkZToge1xyXG5cdFx0XHRwYWdlczogW1wibW9kdWxlc1wiXSxcclxuXHRcdFx0ZGVzYzogXCJEaXNhYmxlIGluZGVudCBvdmVycmlkZXNcIlxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHNhc3NFeHBvcnRzOiBTYXNzVmFycztcclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgbWV0YSA9IHtcclxuXHRcdGRhdGFQcmVmaXhUeXBlOiBcImRhdGFBdHRyXCIsXHJcblx0XHRwcmVmaXhUeXBlczogW1wiY3NzQ2xhc3NcIiwgXCJkYXRhQXR0clwiLCBcImlkXCJdLFxyXG5cdFx0cHJlZml4RXhjbHVkZTogW1wicG9wdXBfLitcIl1cclxuXHR9O1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHRjb25zdCB0eXBlcyA9IG5ldyBTZXQoU2Fzc1ZhcnMubWV0YS5wcmVmaXhUeXBlcyk7XHJcblxyXG5cdFx0Y29uc3QgcHJvY2Vzc09iamVjdCA9IChvYmo6IG9iamVjdCwgb2JqTmFtZTogc3RyaW5nKSA9PiB7XHJcblxyXG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuXHRcdFx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0bGV0IHZhbDogb2JqZWN0IHwgc3RyaW5nIHwgbnVtYmVyID0gb2JqW2tleV07XHJcblxyXG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKSB7XHJcblxyXG5cdFx0XHRcdFx0cHJvY2Vzc09iamVjdCh2YWwsIGtleSk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XHJcblxyXG5cdFx0XHRcdFx0Y29uc3QgZXhjbHVkZWQgPSBTYXNzVmFycy5tZXRhLnByZWZpeEV4Y2x1ZGVcclxuXHRcdFx0XHRcdFx0Lm1hcChzdHIgPT4gbmV3IFJlZ0V4cChcIl5cIiArIHN0ciArIFwiJFwiKSlcclxuXHRcdFx0XHRcdFx0LnNvbWUocmVnZXggPT4gcmVnZXgudGVzdChrZXkpKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIWV4Y2x1ZGVkICYmICh0eXBlcy5oYXMob2JqTmFtZSkgfHwgdHlwZXMuaGFzKGtleSkpKVxyXG5cdFx0XHRcdFx0XHR2YWwgPSB0aGlzLnByZWZpeCArIFwiLVwiICsgdmFsO1xyXG5cclxuXHRcdFx0XHRcdGlmIChvYmpOYW1lID09PSBTYXNzVmFycy5tZXRhLmRhdGFQcmVmaXhUeXBlKVxyXG5cdFx0XHRcdFx0XHR2YWwgPSBcImRhdGEtXCIgKyB2YWw7XHJcblxyXG5cdFx0XHRcdFx0b2JqW2tleV0gPSB2YWw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHRwcm9jZXNzT2JqZWN0KHRoaXMsIFwicm9vdFwiKTtcclxuXHJcblx0XHR0aGlzLnNhc3NFeHBvcnRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcyk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuY2xhc3MgVmFycyBleHRlbmRzIFNhc3NWYXJzIHtcclxuXHJcblx0dG9vbHRpcCA9IHtcclxuXHRcdG1hcmtfY29tcGxldGU6IFwiTWFyayBhcyBjb21wbGV0ZWRcIixcclxuXHRcdG1hcmtfaW5jb21wbGV0ZTogXCJNYXJrIGFzIGluY29tcGxldGVcIixcclxuXHRcdGhpZGU6IFwiSGlkZSB0aGlzIGl0ZW1cIixcclxuXHRcdHVuaGlkZTogXCJVbmhpZGUgdGhpcyBpdGVtXCIsXHJcblx0XHRoaWRlX2Rpc2FibGVkOiBcIkNhbm5vdCBoaWRlIGdyYWRlZCBpdGVtXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJKdW1wIHRvIHRvcFwiLFxyXG5cdFx0d2FpdGluZzogXCJXYWl0aW5nLi4uXCIsXHJcblx0XHRkb3dubG9hZDogXCJEb3dubG9hZCBmaWxlOiBcXFwie2ZpbGVuYW1lfVxcXCJcIixcclxuXHRcdGV4dGVybmFsX3VybDogXCJWaXNpdCBleHRlcm5hbCBVUkxcIixcclxuXHRcdGhhc19zdWJtaXNzaW9uOiBcIkFzc2lnbm1lbnQgaGFzIHN1Ym1pc3Npb25cIixcclxuXHRcdHBvcHVwX25vX3VuY2hlY2tlZDogXCJObyB1bmNoZWNrZWQgaXRlbXMgdG8ganVtcCB0b1wiXHJcblx0fTtcclxuXHJcblx0bWlzYyA9IHtcclxuXHRcdHRvY19iYWNrZ3JvdW5kOiBgLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCwgJHt0aGlzLmNvbG9yLnRvY19maWxsfSB7cGVyY2VudH0lLCB0cmFuc3BhcmVudCB7cGVyY2VudH0lKWAsXHJcblx0XHR0b2tlbl9rZXk6IFwiYWNjZXNzVG9rZW5cIlxyXG5cdH07XHJcblxyXG5cdGVsZW1lbnQgPSB7XHJcblxyXG5cdFx0Y2hlY2tib3g6XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5jaGVja2JveF9wYXJlbnR9Jz5cclxuXHRcdFx0XHRcdDxpbnB1dCB0eXBlPSdjaGVja2JveCcgJHt0aGlzLmRhdGFBdHRyLm1vZF9pdGVtX2lkfT0ne2l0ZW1faWR9Jz5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGRvd25sb2FkX2J1dHRvbjpcclxuXHRcdFx0XHRgPGRpdiBzdHlsZT0nZGlzcGxheTpub25lJyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLmRvd25sb2FkfScgdGl0bGU9JyR7dGhpcy50b29sdGlwLmRvd25sb2FkfSc+XHJcblx0XHRcdFx0XHQ8YSBocmVmPVwie2ZpbGVfdXJsfVwiPjwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHVybF9idXR0b246XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5leHRlcm5hbF91cmx9JyB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuZXh0ZXJuYWxfdXJsfSc+XHJcblx0XHRcdFx0XHQ8YSBocmVmPVwie2V4dGVybmFsX3VybH1cIiBjbGFzcz1cIm5vdF9leHRlcm5hbFwiIHRhcmdldD1cIl9ibGFua1wiPjwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGhpZGVfYnV0dG9uOlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuaGlkZV9idXR0b259Jz5cclxuXHRcdFx0XHRcdDxpICR7dGhpcy5kYXRhQXR0ci5tb2RfaXRlbV9pZH09J3tpdGVtX2lkfSc+PC9pPlxyXG5cdFx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0Y291cnNlX2xpbms6XHJcblx0XHRcdGA8bGkgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHt0YWJDb2xvcn0nIGNsYXNzPSdtZW51LWl0ZW0gaWMtYXBwLWhlYWRlcl9fbWVudS1saXN0LWl0ZW0nPlxyXG5cdFx0XHRcdDxhIGhyZWY9Jy9jb3Vyc2VzL3t0YWJJRH0vbW9kdWxlcycgY2xhc3M9J2ljLWFwcC1oZWFkZXJfX21lbnUtbGlzdC1saW5rJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9J21lbnUtaXRlbS1pY29uLWNvbnRhaW5lcicgYXJpYS1oaWRkZW49J3RydWUnPjxpPjwvaT48L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHt0YWJDb2xvcn07IGJvcmRlci1yaWdodC1jb2xvcjoge3RhYkNvbG9yfSdcclxuXHRcdFx0XHRcdFx0XHQke3RoaXMuZGF0YUF0dHIuY291cnNlX25hbWV9PSd7bmFtZX0nICR7dGhpcy5kYXRhQXR0ci5jb3Vyc2VfY29kZX09J3tjb2RlfSdcclxuXHRcdFx0XHRcdFx0XHRjbGFzcz0nbWVudS1pdGVtX190ZXh0ICR7dGhpcy5jc3NDbGFzcy5jb3Vyc2VfbGlua190ZXh0fSc+PC9kaXY+XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHQ8L2xpPmAsXHJcblxyXG5cdFx0dG9jOlxyXG5cdFx0XHRgPGRpdiBpZD0nJHt0aGlzLmlkLnRvY30nIGNsYXNzPSdpYy1hcHAtY291cnNlLW1lbnUgbGlzdC12aWV3Jz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPScke3RoaXMuY3NzQ2xhc3MudG9jX3RpdGxlfSc+VGFibGUgb2YgQ29udGVudHM8L2Rpdj5cclxuXHRcdFx0XHQ8bmF2Pjx1bD48L3VsPjwvbmF2PlxyXG5cdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHRvY19pdGVtOlxyXG5cdFx0XHRgPGxpPlxyXG5cdFx0XHRcdDxhIGhyZWY9JyMnIHRpdGxlPSd7aXRlbV9uYW1lfSc+XHJcblx0XHRcdFx0XHR7aXRlbV9uYW1lfVxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLnRvY19yYXRpb30nICR7dGhpcy5kYXRhQXR0ci50b2NfbW9kdWxlX2lkfT0ne2l0ZW1faWR9Jz48L2Rpdj5cclxuXHRcdFx0XHQ8L2E+XHJcblx0XHRcdDwvbGk+YCxcclxuXHJcblx0XHRqdW1wX2J1dHRvbjpcclxuXHRcdFx0YDxkaXYgaWQ9JyR7dGhpcy5pZC5qdW1wX2J1dHRvbn0nPlxyXG5cdFx0XHRcdDxpIHRpdGxlPScke3RoaXMudG9vbHRpcC5qdW1wX2J1dHRvbn0nPjwvaT5cclxuXHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRzdWJtaXNzaW9uX2ljb246XHJcblx0XHRcdGA8ZGl2IHRpdGxlPScke3RoaXMudG9vbHRpcC5oYXNfc3VibWlzc2lvbn0nIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuaXRlbV9pY29ufSc+XHJcblx0XHRcdFx0PGkgY2xhc3M9J2ljb24tcHVibGlzaCc+PC9pPlxyXG5cdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHBvcHVwX3N0YXRlX3N3aXRjaDpcclxuXHRcdFx0YDxkaXYgY2xhc3M9XCJzd2l0Y2ggJHt0aGlzLmNzc0NsYXNzLnBvcHVwX3JlcXVpcmVfcGFnZX1cIj5cclxuXHRcdFx0XHQ8bGFiZWwgZm9yPVwie25hbWV9XCIgY2xhc3M9XCJtZGwtc3dpdGNoIG1kbC1qcy1zd2l0Y2ggbWRsLWpzLXJpcHBsZS1lZmZlY3RcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwibWRsLXN3aXRjaF9fbGFiZWxcIj57ZGVzY308L3NwYW4+XHJcblx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJ7bmFtZX1cIiB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cIm1kbC1zd2l0Y2hfX2lucHV0XCI+XHJcblx0XHRcdFx0PC9sYWJlbD5cclxuXHRcdFx0PC9kaXY+YFxyXG5cdH07XHJcblxyXG5cdC8vIHNlcGFyYXRlZCBmb3IgdXNlIGluIHRlbXBsYXRlIHN0cmluZ3MgYmVsb3dcclxuXHRwcml2YXRlIF9jYW52YXNOYW1lc3BhY2UgPSBgY29tLmptYXJpbmVyLiR7dGhpcy5wcmVmaXh9YDtcclxuXHJcblx0Y2FudmFzID0ge1xyXG5cdFx0c2VsZWN0b3I6IHtcclxuXHRcdFx0bW9kdWxlOiBcImRpdi5jb250ZXh0X21vZHVsZVwiLFxyXG5cdFx0XHRtb2R1bGVfaXRlbTogXCJsaS5jb250ZXh0X21vZHVsZV9pdGVtXCIsXHJcblx0XHRcdG1vZHVsZV9pdGVtczogXCJ1bC5jb250ZXh0X21vZHVsZV9pdGVtc1wiLFxyXG5cdFx0XHRzdWJoZWFkZXI6IFwibGkuY29udGV4dF9tb2R1bGVfc3ViX2hlYWRlclwiLFxyXG5cdFx0XHRub3Rfc3ViaGVhZGVyOiBcImxpLmNvbnRleHRfbW9kdWxlX2l0ZW06bm90KC5jb250ZXh0X21vZHVsZV9zdWJfaGVhZGVyKVwiLFxyXG5cdFx0XHRuYXZfdGFiczogXCJ1bCNzZWN0aW9uLXRhYnNcIlxyXG5cdFx0fSxcclxuXHRcdGFwaToge1xyXG5cdFx0XHRuYW1lc3BhY2U6IHRoaXMuX2NhbnZhc05hbWVzcGFjZSxcclxuXHRcdFx0cm9vdF91cmw6IFwiL2FwaS92MS9cIixcclxuXHRcdFx0cGVyX3BhZ2U6IDEwMCxcclxuXHRcdFx0dXJsczoge1xyXG5cdFx0XHRcdGN1c3RvbV9kYXRhOiBgdXNlcnMvc2VsZi9jdXN0b21fZGF0YXtkYXRhUGF0aH0/bnM9JHt0aGlzLl9jYW52YXNOYW1lc3BhY2V9YCxcclxuXHRcdFx0XHRmYXZvcml0ZV9jb3Vyc2VzOiBcInVzZXJzL3NlbGYvZmF2b3JpdGVzL2NvdXJzZXNcIixcclxuXHRcdFx0XHRjdXN0b21fY29sb3JzOiBcInVzZXJzL3NlbGYvY29sb3JzXCIsXHJcblx0XHRcdFx0YXNzaWdubWVudHM6IFwidXNlcnMvc2VsZi9jb3Vyc2VzL3tjb3Vyc2VJRH0vYXNzaWdubWVudHNcIixcclxuXHRcdFx0XHRtb2R1bGVzOiBcImNvdXJzZXMve2NvdXJzZUlEfS9tb2R1bGVzXCIsXHJcblx0XHRcdFx0bW9kdWxlX2l0ZW1zOiBcImNvdXJzZXMve2NvdXJzZUlEfS9tb2R1bGVzL3ttb2R1bGVJRH0vaXRlbXNcIixcclxuXHRcdFx0XHRmaWxlX2RpcmVjdDogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vZmlsZXMve2ZpbGVJRH1cIixcclxuXHRcdFx0XHRuYXZpZ2F0aW9uX3RhYnM6IFwiY291cnNlcy97Y291cnNlSUR9L3RhYnNcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRkYXRhX3VybHM6IHtcclxuXHRcdFx0XHRhY3RpdmVfc3RhdGVzOiBcImFjdGl2ZV9zdGF0ZXNcIixcclxuXHRcdFx0XHRjb21wbGV0ZWRfYXNzaWdubWVudHM6IFwiY29tcGxldGVkX2Fzc2lnbm1lbnRzXCIsXHJcblx0XHRcdFx0aGlkZGVuX2Fzc2lnbm1lbnRzOiBcImhpZGRlbl9hc3NpZ25tZW50c1wiLFxyXG5cdFx0XHRcdHRhYl9wb3NpdGlvbnM6IFwidGFiX3Bvc2l0aW9uc1wiXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5jb25zdCBWQVJTID0gbmV3IFZhcnMoKTtcclxuZXhwb3J0IGNvbnN0IFYgPSBWQVJTO1xyXG5leHBvcnQgZGVmYXVsdCBWQVJTLnNhc3NFeHBvcnRzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHMvdmFycy50cyIsImltcG9ydCAqIGFzIENhbnZhc0FQSSBmcm9tIFwiLi9jYW52YXNfYXBpXCI7XHJcblxyXG5jbGFzcyBEYXRhIHtcclxuXHRjb3Vyc2VQYWdlOiBDYW52YXNQYWdlO1xyXG5cdGNvdXJzZUlEOiBudW1iZXI7XHJcblx0bW9kdWxlczogTWFwPG51bWJlciwgTW9kdWxlPjsgLy8gbW9kdWxlIGlkID0+IGFycmF5IG9mIE1vZHVsZUl0ZW1cclxuXHRtb2R1bGVJdGVtczogTWFwPG51bWJlciwgTW9kdWxlSXRlbT47IC8vIG1vZHVsZSBpdGVtIGlkID0+IE1vZHVsZUl0ZW1cclxuXHRzdGF0ZXM6IE1hcDxzdHJpbmcsIFN0YXRlPjsgLy8gc3RhdGVOYW1lID0+IFN0YXRlXHJcblx0Y291cnNlVGFiczogTWFwPG51bWJlciwgQ3VzdG9tQ291cnNlVGFiPjsgLy8gY291cnNlIGlkID0+IGNvdXJzZSB0YWJcclxuXHRuYXZUYWJzOiBNYXA8c3RyaW5nLCBOYXZUYWI+OyAvLyB0YWIgaWQgc3RyaW5nID0+IHRhYlxyXG5cdG9uTWFpblBhZ2U6IGJvb2xlYW47XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdGV4dGVuc2lvbklkOiBzdHJpbmc7XHJcblx0ZWxlbWVudHM6IHtqdW1wX2J1dHRvbjogSlF1ZXJ5LCB0b2M6IEpRdWVyeX07XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5tb2R1bGVzID0gbmV3IE1hcCgpO1xyXG5cdFx0dGhpcy5tb2R1bGVJdGVtcyA9IG5ldyBNYXAoKTtcclxuXHRcdHRoaXMuc3RhdGVzID0gbmV3IE1hcCgpO1xyXG5cdFx0dGhpcy5jb3Vyc2VUYWJzID0gbmV3IE1hcCgpO1xyXG5cdFx0dGhpcy5uYXZUYWJzID0gbmV3IE1hcCgpO1xyXG5cclxuXHRcdHRoaXMuZWxlbWVudHMgPSB7anVtcF9idXR0b246IG51bGwsIHRvYzogbnVsbH07XHJcblxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgUGFnZSB7XHJcblxyXG5cdGJvZHk6IEpRdWVyeTtcclxuXHRzY3JvbGxpbmdFbGVtZW50OiBKUXVlcnk7XHJcblx0bWFpbj86IEpRdWVyeTtcclxuXHRjb250ZW50PzogSlF1ZXJ5O1xyXG5cdGxlZnQ/OiBKUXVlcnk7XHJcblx0c2lkZWJhcjogSlF1ZXJ5O1xyXG5cdGdyYWRlcz86IEpRdWVyeTtcclxuXHJcblx0aW5pdGlhbGl6ZSgpIHtcclxuXHJcblx0XHR0aGlzLmJvZHkgPSAkKFwiYm9keVwiKTtcclxuXHRcdHRoaXMuc2Nyb2xsaW5nRWxlbWVudCA9ICQoZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudCB8fCBkb2N1bWVudC5ib2R5KTtcclxuXHRcdHRoaXMuc2lkZWJhciA9ICQoXCIjbWVudVwiKTtcclxuXHRcdHRoaXMubWFpbiA9ICQoXCIjbWFpblwiKTtcclxuXHJcblx0XHRpZiAoREFUQS5vbk1haW5QYWdlKSB7XHJcblx0XHRcdHRoaXMuY29udGVudCA9ICQoXCIjY29udGVudFwiKTtcclxuXHRcdFx0dGhpcy5sZWZ0ID0gJChcIiNsZWZ0LXNpZGVcIik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKERBVEEuY291cnNlUGFnZSA9PT0gQ2FudmFzUGFnZS5HUkFERVMpXHJcblx0XHRcdHRoaXMuZ3JhZGVzID0gJChcIiNncmFkZXNfc3VtbWFyeVwiKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDdXN0b21Db3Vyc2VUYWIge1xyXG5cdHJlYWRvbmx5IGlkOiBudW1iZXI7XHJcblx0cmVhZG9ubHkgbmFtZTogc3RyaW5nO1xyXG5cdHJlYWRvbmx5IGNvZGU6IHN0cmluZztcclxuXHRyZWFkb25seSBjb2xvcjogc3RyaW5nO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihjb3Vyc2VEYXRhOiBDYW52YXNBUEkuQ291cnNlLCBjb2xvcjogc3RyaW5nKSB7XHJcblx0XHR0aGlzLmlkID0gY291cnNlRGF0YS5pZDtcclxuXHRcdHRoaXMubmFtZSA9IGNvdXJzZURhdGEubmFtZTtcclxuXHRcdHRoaXMuY29kZSA9IGNvdXJzZURhdGEuY291cnNlX2NvZGU7XHJcblx0XHR0aGlzLmNvbG9yID0gY29sb3I7XHJcblx0fVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5hdlRhYiB7XHJcblx0cmVhZG9ubHkgaWQ6IHN0cmluZztcclxuXHRwcml2YXRlIHJlYWRvbmx5IGluaXRQb3NpdGlvbjogbnVtYmVyO1xyXG5cdHByaXZhdGUgX3Bvc2l0aW9uOiBudW1iZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHRhYkRhdGE6IENhbnZhc0FQSS5UYWIpIHtcclxuXHRcdHRoaXMuaWQgPSB0YWJEYXRhLmlkO1xyXG5cdFx0dGhpcy5fcG9zaXRpb24gPSBudWxsO1xyXG5cdFx0dGhpcy5pbml0UG9zaXRpb24gPSB0YWJEYXRhLnBvc2l0aW9uO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldFBvc2l0aW9uKHBvcykge1xyXG5cdFx0dGhpcy5fcG9zaXRpb24gPSBwb3M7XHJcblx0fVxyXG5cclxuXHRnZXQgaGFzQ3VzdG9tUG9zaXRpb24oKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcG9zaXRpb24gIT0gbnVsbDtcclxuXHR9XHJcblxyXG5cdGdldCBwb3NpdGlvbigpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9uID09IG51bGwgPyB0aGlzLmluaXRQb3NpdGlvbiA6IHRoaXMuX3Bvc2l0aW9uID09PSAtMSA/IG51bGwgOiB0aGlzLl9wb3NpdGlvbjtcclxuXHR9XHJcblxyXG5cdGdldCBoaWRkZW4oKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcG9zaXRpb24gPT09IC0xO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXRlIHtcclxuXHRwcml2YXRlIG5hbWU6IHN0cmluZztcclxuXHJcblx0cmVhZG9ubHkgYm9keUNsYXNzOiBzdHJpbmc7XHJcblx0cmVhZG9ubHkgb25QYWdlczogQ2FudmFzUGFnZVtdO1xyXG5cclxuXHRwdWJsaWMgYWN0aXZlOiBib29sZWFuO1xyXG5cdHB1YmxpYyBvbkVuYWJsZTogKCkgPT4gdm9pZDtcclxuXHRwdWJsaWMgb25EaXNhYmxlOiAoKSA9PiB2b2lkO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihrZXksIHN0YXRlRGF0YSwgYWN0aXZlKSB7XHJcblx0XHR0aGlzLm5hbWUgPSBrZXk7XHJcblx0XHR0aGlzLmJvZHlDbGFzcyA9IHN0YXRlRGF0YS5jc3NDbGFzcztcclxuXHRcdHRoaXMuYWN0aXZlID0gYWN0aXZlO1xyXG5cdFx0dGhpcy5vblBhZ2VzID0gW107XHJcblxyXG5cdFx0c3RhdGVEYXRhLnBhZ2VzLmZvckVhY2goKHBhZ2U6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRjb25zdCBfcGFnZSA9IENhbnZhc1BhZ2VbcGFnZS50b1VwcGVyQ2FzZSgpXTtcclxuXHRcdFx0aWYgKF9wYWdlICE9PSB1bmRlZmluZWQpXHJcblx0XHRcdFx0dGhpcy5vblBhZ2VzLnB1c2goX3BhZ2UpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRvbkNoYW5nZShuZXdTdGF0ZTogYm9vbGVhbikge1xyXG5cdFx0aWYgKG5ld1N0YXRlICYmIHRoaXMub25FbmFibGUgaW5zdGFuY2VvZiBGdW5jdGlvbikgdGhpcy5vbkVuYWJsZSgpO1xyXG5cdFx0ZWxzZSBpZiAodGhpcy5vbkRpc2FibGUgaW5zdGFuY2VvZiBGdW5jdGlvbikgdGhpcy5vbkRpc2FibGUoKTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9kdWxlIHtcclxuXHRyZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcblx0cmVhZG9ubHkgaWQ6IG51bWJlcjtcclxuXHRyZWFkb25seSBpdGVtQ291bnQ6IG51bWJlcjtcclxuXHRyZWFkb25seSBpdGVtczogTW9kdWxlSXRlbVtdO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihtb2R1bGVKc29uOiBDYW52YXNBUEkuTW9kdWxlKSB7XHJcblx0XHR0aGlzLm5hbWUgPSBtb2R1bGVKc29uLm5hbWU7XHJcblx0XHR0aGlzLmlkID0gbW9kdWxlSnNvbi5pZDtcclxuXHRcdHRoaXMuaXRlbUNvdW50ID0gbW9kdWxlSnNvbi5pdGVtc19jb3VudDtcclxuXHRcdHRoaXMuaXRlbXMgPSBbXTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9kdWxlSXRlbSB7XHJcblx0cHJpdmF0ZSBfaWQ6IG51bWJlcjtcclxuXHRwcml2YXRlIF9uYW1lOiBzdHJpbmc7XHJcblx0cHJpdmF0ZSBtb2R1bGVJZDogbnVtYmVyO1xyXG5cdHByaXZhdGUgX3R5cGU6IE1vZHVsZUl0ZW1UeXBlO1xyXG5cdHByaXZhdGUgYXNzaWdubWVudElkOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfY29udGVudElkOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfZmlsZURhdGE6IENhbnZhc0FQSS5GaWxlO1xyXG5cdHByaXZhdGUgX2V4dGVybmFsVXJsOiBzdHJpbmc7XHJcblxyXG5cdHB1YmxpYyBpc1N1Ym1pdHRlZDogYm9vbGVhbjtcclxuXHJcblx0cHVibGljIGNoZWNrZWQ6IGJvb2xlYW47XHJcblx0cHVibGljIGhpZGRlbjogYm9vbGVhbjtcclxuXHRwcml2YXRlIF9jaGVja2JveEVsZW1lbnQ6IEpRdWVyeTtcclxuXHRwcml2YXRlIF9oaWRlRWxlbWVudDogSlF1ZXJ5O1xyXG5cclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGJ5Q29udGVudElkID0gbmV3IE1hcDxudW1iZXIsIE1vZHVsZUl0ZW0+KCk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG1vZHVsZUl0ZW1Kc29uPzogQ2FudmFzQVBJLk1vZHVsZUl0ZW0pIHtcclxuXHRcdGlmIChtb2R1bGVJdGVtSnNvbikgdGhpcy51cGRhdGUobW9kdWxlSXRlbUpzb24pO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBmcm9tQ29udGVudElkKGNvbnRlbnRJZDogbnVtYmVyKTogTW9kdWxlSXRlbSB7XHJcblx0XHRjb25zdCBpdGVtID0gbmV3IE1vZHVsZUl0ZW0oKTtcclxuXHRcdGl0ZW0uX2NvbnRlbnRJZCA9IGNvbnRlbnRJZDtcclxuXHRcdE1vZHVsZUl0ZW0uYnlDb250ZW50SWQuc2V0KGNvbnRlbnRJZCwgaXRlbSk7XHJcblx0XHRyZXR1cm4gaXRlbTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGUobW9kdWxlSXRlbUpzb246IENhbnZhc0FQSS5Nb2R1bGVJdGVtKSB7XHJcblx0XHR0aGlzLl9pZCA9IG1vZHVsZUl0ZW1Kc29uLmlkO1xyXG5cdFx0dGhpcy5fbmFtZSA9IG1vZHVsZUl0ZW1Kc29uLnRpdGxlO1xyXG5cdFx0dGhpcy5tb2R1bGVJZCA9IG1vZHVsZUl0ZW1Kc29uLm1vZHVsZV9pZDtcclxuXHRcdHRoaXMuX2V4dGVybmFsVXJsID0gbW9kdWxlSXRlbUpzb24uZXh0ZXJuYWxfdXJsIHx8IG51bGw7XHJcblxyXG5cdFx0Y29uc3QgdHlwZVN0cmluZzogc3RyaW5nID0gbW9kdWxlSXRlbUpzb24udHlwZVxyXG5cdFx0XHQucmVwbGFjZSgvKFtBLVpdKS9nLCAociwgcykgPT4gXCJfXCIgKyBzKVxyXG5cdFx0XHQucmVwbGFjZSgvXl8vLCBcIlwiKS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuXHRcdHRoaXMuX3R5cGUgPSBNb2R1bGVJdGVtVHlwZVt0eXBlU3RyaW5nXTtcclxuXHJcblx0XHRpZiAodGhpcy5fdHlwZSA9PT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRjb25zb2xlLndhcm4oYFVua25vd24gbW9kdWxlIGl0ZW0gdHlwZTogXCIke3R5cGVTdHJpbmd9XCJgKTtcclxuXHJcblx0XHR0aGlzLmNoZWNrZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuaGlkZGVuID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3R5cGUgPT09IE1vZHVsZUl0ZW1UeXBlLkFTU0lHTk1FTlQpXHJcblx0XHRcdHRoaXMuc2V0QXNzaWdubWVudElkKG1vZHVsZUl0ZW1Kc29uLmNvbnRlbnRfaWQpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLmFzc2lnbm1lbnRJZCA9IG51bGw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0QXNzaWdubWVudElkKGlkOiBudW1iZXIpIHsgdGhpcy5hc3NpZ25tZW50SWQgPSBpZDsgfVxyXG5cdHB1YmxpYyBzZXRGaWxlRGF0YShkYXRhOiBDYW52YXNBUEkuRmlsZSkgeyB0aGlzLl9maWxlRGF0YSA9IGRhdGE7IH1cclxuXHJcblx0Z2V0IGNhbnZhc0VsZW1lbnRJZCgpIHtcclxuXHRcdHN3aXRjaCAoREFUQS5jb3Vyc2VQYWdlKSB7XHJcblx0XHRcdGNhc2UgQ2FudmFzUGFnZS5NT0RVTEVTOlxyXG5cdFx0XHRcdHJldHVybiBcImNvbnRleHRfbW9kdWxlX2l0ZW1fXCIgKyB0aGlzLl9pZDsgLy8gbGkgZWxlbWVudFxyXG5cdFx0XHRjYXNlIENhbnZhc1BhZ2UuR1JBREVTOlxyXG5cdFx0XHRcdHJldHVybiBcInN1Ym1pc3Npb25fXCIgKyB0aGlzLmFzc2lnbm1lbnRJZDsgLy8gdHIgZWxlbWVudFxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IGlkKCkgeyByZXR1cm4gdGhpcy5faWQ7IH1cclxuXHRnZXQgbmFtZSgpIHsgcmV0dXJuIHRoaXMuX25hbWU7XHR9XHJcblx0Z2V0IHR5cGUoKTogTW9kdWxlSXRlbVR5cGUgeyByZXR1cm4gdGhpcy5fdHlwZTsgfVxyXG5cdGdldCBpc0dyYWRlZCgpIHsgcmV0dXJuIHRoaXMuYXNzaWdubWVudElkICE9PSBudWxsOyB9XHJcblx0Z2V0IGlzU3ViSGVhZGVyKCkgeyByZXR1cm4gdGhpcy5fdHlwZSA9PT0gTW9kdWxlSXRlbVR5cGUuU1VCX0hFQURFUjsgfVxyXG5cdGdldCBtb2R1bGUoKSB7IHJldHVybiBEQVRBLm1vZHVsZXMuZ2V0KHRoaXMubW9kdWxlSWQpOyB9XHJcblx0Z2V0IGV4dGVybmFsVXJsKCkgeyByZXR1cm4gdGhpcy5fZXh0ZXJuYWxVcmw7IH1cclxuXHRnZXQgY29udGVudElkKCkgeyByZXR1cm4gdGhpcy5fY29udGVudElkOyB9XHJcblxyXG5cdGdldCBjaGVja2JveEVsZW1lbnQoKTogSlF1ZXJ5IHsgcmV0dXJuIHRoaXMuX2NoZWNrYm94RWxlbWVudDsgfVxyXG5cdHNldCBjaGVja2JveEVsZW1lbnQodmFsdWU6IEpRdWVyeSkge1xyXG5cdFx0aWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlLmxlbmd0aCA9PT0gMSlcclxuXHRcdFx0dGhpcy5fY2hlY2tib3hFbGVtZW50ID0gdmFsdWU7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgTW9kdWxlIEl0ZW0gRWxlbWVudDogXCIgKyB2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRnZXQgaGlkZUVsZW1lbnQoKTogSlF1ZXJ5IHsgcmV0dXJuIHRoaXMuX2hpZGVFbGVtZW50OyB9XHJcblx0c2V0IGhpZGVFbGVtZW50KHZhbHVlOiBKUXVlcnkpIHtcclxuXHRcdGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPT09IDEpXHJcblx0XHRcdHRoaXMuX2hpZGVFbGVtZW50ID0gdmFsdWU7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgTW9kdWxlIEl0ZW0gRWxlbWVudDogXCIgKyB2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRnZXQgZmlsZURhdGEoKTogQ2FudmFzQVBJLkZpbGUgeyByZXR1cm4gdGhpcy5fZmlsZURhdGE7IH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE1vZHVsZUl0ZW1UeXBlIHtcclxuXHRBU1NJR05NRU5ULCBTVUJfSEVBREVSLCBESVNDVVNTSU9OLCBRVUlaLCBQQUdFLCBGSUxFLCBFWFRFUk5BTF9VUkwsIEVYVEVSTkFMX1RPT0xcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQ2FudmFzUGFnZSB7XHJcblx0TU9EVUxFUywgR1JBREVTLCBIT01FLCBVU0VSUywgR1JPVVBTLCBDT0xMQUJPUkFUSU9OUywgRElTQ1VTU0lPTl9UT1BJQ1MsIEVYVEVSTkFMX1RPT0xTLCBBU1NJR05NRU5UU1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBNZXNzYWdlVHlwZSB7XHJcblx0QkFTSUMsIFNUQVRFXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlRGF0YSB7XHJcblx0YWN0aW9uOiBzdHJpbmc7XHJcblx0dHlwZTogTWVzc2FnZVR5cGU7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFjdGlvbjogc3RyaW5nLCB0eXBlPzogTWVzc2FnZVR5cGUpIHtcclxuXHRcdHRoaXMuYWN0aW9uID0gYWN0aW9uO1xyXG5cdFx0dGhpcy50eXBlID0gdHlwZSB8fCBNZXNzYWdlVHlwZS5CQVNJQztcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZU1lc3NhZ2VEYXRhIGV4dGVuZHMgTWVzc2FnZURhdGEge1xyXG5cdHN0YXRlTmFtZTogc3RyaW5nO1xyXG5cdHN0YXRlOiBib29sZWFuO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihhY3Rpb246IFwiZ2V0XCIgfCBcInNldFwiLCBzdGF0ZU5hbWU6IHN0cmluZywgc3RhdGU/OiBib29sZWFuKSB7XHJcblx0XHRzdXBlcihhY3Rpb24sIE1lc3NhZ2VUeXBlLlNUQVRFKTtcclxuXHJcblx0XHR0aGlzLnN0YXRlTmFtZSA9IHN0YXRlTmFtZTtcclxuXHRcdHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuXHJcblx0XHRpZiAoYWN0aW9uID09PSBcInNldFwiICYmIHRoaXMuc3RhdGUgPT09IHVuZGVmaW5lZClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzdGF0ZSBtZXNzYWdlOiBubyBib29sZWFuIHRvIHNldCBzdGF0ZSB0b1wiKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFeGNlcHRpb24ge1xyXG5cdHByaXZhdGUgcmVhc29uOiBzdHJpbmc7XHJcblx0cHJpdmF0ZSBmYXRhbDogYm9vbGVhbjtcclxuXHJcblx0Y29uc3RydWN0b3IocmVhc29uOiBzdHJpbmcsIGZhdGFsPzogYm9vbGVhbikge1xyXG5cdFx0aWYgKGZhdGFsID09PSB1bmRlZmluZWQpIGZhdGFsID0gZmFsc2U7XHJcblx0XHR0aGlzLnJlYXNvbiA9IHJlYXNvbjtcclxuXHRcdHRoaXMuZmF0YWwgPSBmYXRhbDtcclxuXHR9XHJcblxyXG5cdGdldCBpc0ZhdGFsKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZmF0YWw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdG9TdHJpbmcoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWFzb247XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgREFUQSA9IG5ldyBEYXRhKCk7XHJcbmV4cG9ydCBjb25zdCBQQUdFID0gbmV3IFBhZ2UoKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzL29iamVjdHMudHMiLCJpbXBvcnQgeyBWIH0gZnJvbSBcIi4vdmFyc1wiO1xyXG5pbXBvcnQgeyBNZXNzYWdlRGF0YSB9IGZyb20gXCIuL29iamVjdHNcIjtcclxuXHJcbmxldCBBQ0NFU1NfVE9LRU46IHN0cmluZztcclxuXHJcbmZ1bmN0aW9uIGNoZWNrVG9rZW4oKTogdm9pZCB8IG5ldmVyIHtcclxuXHRpZiAoQUNDRVNTX1RPS0VOID09PSBudWxsKVxyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQWNjZXNzIHRva2VuIG5vdCBzZXRcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBlclBhZ2UodXJsOiBzdHJpbmcsIGl0ZW1zUGVyUGFnZTogbnVtYmVyKSB7XHJcblx0cmV0dXJuIGAke3VybH0/cGVyX3BhZ2U9JHtpdGVtc1BlclBhZ2V9YDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdChzdHI6IHN0cmluZywgb2JqOiBvYmplY3QpOiBzdHJpbmcge1xyXG5cclxuXHRmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuXHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSlcclxuXHRcdFx0c3RyID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcXFx7XCIgKyBrZXkgKyBcIlxcXFx9XCIsIFwiZ2lcIiksIG9ialtrZXldKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBzdHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRPckRlZmF1bHQ8VD4ob2JqOiBvYmplY3QsIGtleTogUHJvcGVydHlLZXksIGRlZjogVCk6IFQge1xyXG5cdGlmIChvYmogPT09IHVuZGVmaW5lZCB8fCBvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZGVmO1xyXG5cdGVsc2UgcmV0dXJuIG9ialtrZXldO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VXJsKHVybDogc3RyaW5nLCBmb3JtYXRPYmo/OiB7cGVyUGFnZT86IG51bWJlciwgW2tleTogc3RyaW5nXTogYW55fSkge1xyXG5cclxuXHRpZiAoZm9ybWF0T2JqICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdGlmIChmb3JtYXRPYmoucGVyUGFnZSAhPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHR1cmwgPSBwZXJQYWdlKHVybCwgZm9ybWF0T2JqLnBlclBhZ2UpO1xyXG5cdFx0dXJsID0gZm9ybWF0KHVybCwgZm9ybWF0T2JqKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBWLmNhbnZhcy5hcGkucm9vdF91cmwgKyB1cmw7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRKU09OPFQ+KHVybDogc3RyaW5nKTogUHJvbWlzZTxUPiB7XHJcblxyXG5cdGNoZWNrVG9rZW4oKTtcclxuXHJcblx0Y29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHVybCwge1xyXG5cdFx0bWV0aG9kOiBcIkdFVFwiLFxyXG5cdFx0aGVhZGVyczogbmV3IEhlYWRlcnMoe1xyXG5cdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuXHRcdFx0XCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIFwiICsgQUNDRVNTX1RPS0VOXHJcblx0XHR9KVxyXG5cdH0gYXMgUmVxdWVzdEluaXQpO1xyXG5cclxuXHRpZiAocmVzcC5zdGF0dXMgPT09IDQwNCkge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiNDA0IGVycm9yIHdoZW4gZ2V0dGluZyBKU09OXCIpO1xyXG5cdH1cclxuXHRlbHNlIHtcclxuXHRcdGlmIChyZXNwLnN0YXR1cyA9PT0gNDAwKVxyXG5cdFx0XHRjb25zb2xlLmRlYnVnKFwiNDAwIGVycm9yIHdoZW4gZ2V0dGluZyBKU09OIHdhcyBPS0FZXCIpO1xyXG5cclxuXHRcdGxldCBqc29uID0gYXdhaXQgcmVzcC50ZXh0KCk7XHJcblx0XHRqc29uID0ganNvbi5yZXBsYWNlKFwid2hpbGUoMSk7XCIsIFwiXCIpO1xyXG5cclxuXHRcdHJldHVybiBKU09OLnBhcnNlKGpzb24pO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwdXREYXRhKHVybCwgZGF0YTogYW55W10gfCBhbnkpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuXHJcblx0Y2hlY2tUb2tlbigpO1xyXG5cclxuXHRjb25zdCBib2R5RGF0YSA9IHtuczogVi5jYW52YXMuYXBpLm5hbWVzcGFjZSwgZGF0YX07XHJcblx0Y29uc3QgbWV0aG9kID0gZGF0YSBpbnN0YW5jZW9mIEFycmF5ICYmIGRhdGEubGVuZ3RoID4gMCB8fCBkYXRhICE9PSB1bmRlZmluZWQgPyBcIlBVVFwiIDogXCJERUxFVEVcIjtcclxuXHJcblx0aWYgKG1ldGhvZCA9PT0gXCJERUxFVEVcIilcclxuXHRcdGRlbGV0ZSBib2R5RGF0YS5kYXRhO1xyXG5cclxuXHRjb25zdCBvcHMgPSB7XHJcblx0XHRtZXRob2QsXHJcblx0XHRoZWFkZXJzOiBuZXcgSGVhZGVycyh7XHJcblx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdFx0XHRcIkF1dGhvcml6YXRpb25cIjogXCJCZWFyZXIgXCIgKyBBQ0NFU1NfVE9LRU5cclxuXHRcdH0pLFxyXG5cdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoYm9keURhdGEpXHJcblx0fSBhcyBSZXF1ZXN0SW5pdDtcclxuXHJcblx0Y29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHVybCwgb3BzKTtcclxuXHJcblx0aWYgKCFyZXNwLm9rIHx8IHJlc3Auc3RhdHVzID09PSA0MDEpIHsgLy8gNDAxIHVuYXV0aG9yaXplZFxyXG5cdFx0Y29uc29sZS5lcnJvcihgVW5hYmxlIHRvICR7bWV0aG9kfSBkYXRhIHRvICR7dXJsfS4gcmVzcDpgLCBKU09OLnN0cmluZ2lmeShyZXNwKSk7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVkaXREYXRhQXJyYXkodXJsOiBzdHJpbmcsIGFwcGVuZDogYm9vbGVhbiwgdmFsdWVzOiBhbnlbXSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG5cclxuXHRjb25zdCBleGlzdGluZ0RhdGE6IGFueVtdID0gKFxyXG5cdFx0Ly8gdXJsIGlzIHNhbWUgZm9yIGdldC9wdXRcclxuXHRcdGF3YWl0IGdldEpTT048e2RhdGE6IGFueVtdfT4odXJsKVxyXG5cdCkuZGF0YSB8fCBbXTtcclxuXHJcblx0bGV0IG5ld0FycmF5O1xyXG5cclxuXHRpZiAoYXBwZW5kKSB7XHJcblx0XHRuZXdBcnJheSA9IGV4aXN0aW5nRGF0YS5jb25jYXQodmFsdWVzKTtcclxuXHR9XHJcblx0ZWxzZSB7IC8vIHN1YnRyYWN0IGZyb20gZGF0YSBhcnJheVxyXG5cdFx0aWYgKGV4aXN0aW5nRGF0YS5sZW5ndGggPT09IDApXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0bmV3QXJyYXkgPSBleGlzdGluZ0RhdGEuZmlsdGVyKHZhbCA9PiAhdmFsdWVzLmluY2x1ZGVzKHZhbCkpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHB1dERhdGEodXJsLCBuZXdBcnJheSk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3YWl0KG1zOiBudW1iZXIpIHtcclxuXHRhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpO1xyXG5cdH0pO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFRva2VuKCkge1xyXG5cdEFDQ0VTU19UT0tFTiA9IGF3YWl0IG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuXHRcdGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFYubWlzYy50b2tlbl9rZXksIHJlc3VsdERhdGEgPT4ge1xyXG5cclxuXHRcdFx0Y29uc3Qgc3VjY2VzcyA9IEFDQ0VTU19UT0tFTiAhPT0gbnVsbCB8fCByZXN1bHREYXRhW1YubWlzYy50b2tlbl9rZXldO1xyXG5cdFx0XHRpZiAoc3VjY2VzcykgcmVzb2x2ZShyZXN1bHREYXRhW1YubWlzYy50b2tlbl9rZXldKTtcclxuXHRcdFx0ZWxzZSByZWplY3QoKTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhY2Nlc3NUb2tlblByb21wdCgpIHtcclxuXHRjb25zdCBvcGVuT3B0aW9ucyA9IGNvbmZpcm0oXCJNaXNzaW5nIGFjY2VzcyB0b2tlbiwgcHJlc3MgT0sgdG8gb3BlbiBleHRlbnNpb24gb3B0aW9uc1wiKTtcclxuXHRpZiAob3Blbk9wdGlvbnMpIC8vIFRPRE8gc2VuZCB0YWIgSUQgd2l0aCB0aGlzIG1lc3NhZ2U/XHJcblx0XHRjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShuZXcgTWVzc2FnZURhdGEoXCJvcGVuIG9wdGlvbnNcIikpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90cy91dGlscy50cyIsImltcG9ydCB7IFYgfSBmcm9tIFwiLi92YXJzXCI7XHJcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gXCIuL3V0aWxzXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VEYXRhLCBTdGF0ZU1lc3NhZ2VEYXRhIH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xyXG5cclxuZGVjbGFyZSBjb25zdCBjb21wb25lbnRIYW5kbGVyO1xyXG5jb25zdCBRVUVSWSA9IHthY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWV9O1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuXHJcbmNvbnN0IEJPRFkgPSAkKFwiYm9keVwiKTtcclxuY29uc3QganVtcEJ1dHRvbiA9ICQoXCIjXCIgKyBWLmlkLnBvcHVwX2p1bXBfYnV0dG9uKTtcclxuY29uc3QgaW5zZXJ0aW9uUG9pbnQgPSAkKFwiI1wiICsgVi5pZC5wb3B1cF9pbnNlcnRpb25fcG9pbnQpO1xyXG5cclxuJChcIiNcIiArIFYuaWQucG9wdXBfZXhfbmFtZSkudGV4dChjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLm5hbWUpO1xyXG5cclxuUHJvbWlzZS5yZXNvbHZlKClcclxuXHJcblx0LnRoZW4oKCkgPT4gbmV3IFByb21pc2UobmV4dCA9PiB7XHJcblxyXG5cdFx0Y29uc3Qgc3RhcnRQaW5nID0gJC5ub3coKTtcclxuXHJcblx0XHRzZW5kTWVzc2FnZShuZXcgTWVzc2FnZURhdGEoXCJwaW5nXCIpLCByZXNwID0+IHtcclxuXHRcdFx0aWYgKHJlc3AgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwicGFnZSBwaW5nXCIsIHJlc3AucG9uZyAtIHN0YXJ0UGluZyk7XHJcblxyXG5cdFx0XHRcdEJPRFkuYWRkQ2xhc3MoVi5jc3NDbGFzcy5wb3B1cF9jb25uZWN0ZWQpO1xyXG5cdFx0XHRcdG5leHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRCT0RZLmFkZENsYXNzKFYuY3NzQ2xhc3MucG9wdXBfbG9hZGVkKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdH0pKS50aGVuKCgpID0+IG5ldyBQcm9taXNlKG5leHQgPT4ge1xyXG5cclxuXHRcdHNlbmRNZXNzYWdlKG5ldyBNZXNzYWdlRGF0YShcImNvdW50IHVuY2hlY2tlZFwiKSwgcmVzcCA9PiB7XHJcblx0XHRcdGlmIChyZXNwICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRpZiAocmVzcC5jb3VudCA9PT0gMClcclxuXHRcdFx0XHRcdGp1bXBCdXR0b24ucHJvcChcImRpc2FibGVkXCIsIHRydWUpLmF0dHIoXCJ0aXRsZVwiLCBWLnRvb2x0aXAucG9wdXBfbm9fdW5jaGVja2VkKTtcclxuXHRcdFx0XHRqdW1wQnV0dG9uLnBhcmVudCgpLnNob3coKTtcclxuXHRcdFx0XHRuZXh0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHR9KSkudGhlbigoKSA9PiBuZXcgUHJvbWlzZShuZXh0ID0+IHtcclxuXHJcblx0XHRsZXQgcmVtYWluaW5nID0gT2JqZWN0LmtleXMoVi5zdGF0ZSkubGVuZ3RoO1xyXG5cclxuXHRcdCQuZWFjaChWLnN0YXRlLCAoc3RhdGVOYW1lLCBzdGF0ZURhdGEpID0+IHtcclxuXHRcdFx0c2VuZE1lc3NhZ2UobmV3IFN0YXRlTWVzc2FnZURhdGEoXCJnZXRcIiwgc3RhdGVOYW1lKSwgcmVzcCA9PiB7XHJcblxyXG5cdFx0XHRcdGNvbnN0IGVsID0gJChmb3JtYXQoVi5lbGVtZW50LnBvcHVwX3N0YXRlX3N3aXRjaCwge25hbWU6IHN0YXRlTmFtZSwgZGVzYzogc3RhdGVEYXRhLmRlc2N9KSk7XHJcblxyXG5cdFx0XHRcdGVsLmluc2VydEFmdGVyKGluc2VydGlvblBvaW50KTtcclxuXHRcdFx0XHRjb21wb25lbnRIYW5kbGVyLnVwZ3JhZGVFbGVtZW50KGVsLmZpbmQoXCJsYWJlbFwiKS5nZXQoMCkpO1xyXG5cclxuXHRcdFx0XHRjb25zdCBpbnB1dEVsID0gZWwuZmluZChcImlucHV0XCIpLmdldCgwKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuXHRcdFx0XHRlbC5jaGFuZ2UoKCkgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc3QgbmV3U3RhdGUgPSBpbnB1dEVsLmNoZWNrZWQ7XHJcblxyXG5cdFx0XHRcdFx0c2V0TWRsQ2hlY2tlZChpbnB1dEVsLCAhbmV3U3RhdGUpO1xyXG5cdFx0XHRcdFx0aW5wdXRFbC50aXRsZSA9IFYudG9vbHRpcC53YWl0aW5nO1xyXG5cdFx0XHRcdFx0aW5wdXRFbC5kaXNhYmxlZCA9IHRydWU7XHJcblxyXG5cdFx0XHRcdFx0c2VuZE1lc3NhZ2UobmV3IFN0YXRlTWVzc2FnZURhdGEoXCJzZXRcIiwgc3RhdGVOYW1lLCBuZXdTdGF0ZSksIHN1Y2Nlc3MgPT4ge1xyXG5cdFx0XHRcdFx0XHRpZiAoc3VjY2Vzcykge1xyXG5cdFx0XHRcdFx0XHRcdHNldE1kbENoZWNrZWQoaW5wdXRFbCwgbmV3U3RhdGUpO1xyXG5cdFx0XHRcdFx0XHRcdGlucHV0RWwudGl0bGUgPSBcIlwiOyAvLyBUT0RPIHN0YXRlLmxvbmdfZGVzYyA/XHJcblx0XHRcdFx0XHRcdFx0aW5wdXRFbC5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0c2V0TWRsQ2hlY2tlZChpbnB1dEVsLCByZXNwLnN0YXRlKTtcclxuXHJcblx0XHRcdFx0aWYgKC0tcmVtYWluaW5nID09PSAwKSBuZXh0KCk7XHJcblxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGp1bXBCdXR0b24uY2xpY2soKCkgPT4ge1xyXG5cdFx0XHRzZW5kTWVzc2FnZShuZXcgTWVzc2FnZURhdGEoXCJqdW1wIHRvIGZpcnN0IHVuY2hlY2tlZFwiKSwgcmVzcCA9PiB3aW5kb3cuY2xvc2UoKSk7XHJcblx0XHR9KTtcclxuXHJcblx0fSkpLnRoZW4oKCkgPT4gbmV3IFByb21pc2UobmV4dCA9PiB7XHJcblxyXG5cdFx0aW5zZXJ0aW9uUG9pbnQucmVtb3ZlKCk7XHJcblx0XHRCT0RZLmFkZENsYXNzKFYuY3NzQ2xhc3MucG9wdXBfbG9hZGVkKTtcclxuXHRcdG5leHQoKTtcclxuXHJcblx0fSkpO1xyXG5cclxufSk7XHJcblxyXG5mdW5jdGlvbiBzZW5kTWVzc2FnZShkYXRhOiBNZXNzYWdlRGF0YSwgY2FsbGJhY2s/OiAocmVzcG9uc2U6IGFueSkgPT4gdm9pZCkge1xyXG5cdGNocm9tZS50YWJzLnF1ZXJ5KFFVRVJZLCB0YWJzID0+IGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIGRhdGEsIGNhbGxiYWNrKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldE1kbENoZWNrZWQoY2hlY2tib3g6IEhUTUxJbnB1dEVsZW1lbnQsIGNoZWNrZWQ6IGJvb2xlYW4pIHtcclxuXHQkKGNoZWNrYm94KVxyXG5cdFx0LnByb3AoXCJjaGVja2VkXCIsIGNoZWNrZWQpXHJcblx0XHQucGFyZW50KClcclxuXHRcdC50b2dnbGVDbGFzcyhcImlzLWNoZWNrZWRcIiwgY2hlY2tlZCk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzL3BvcHVwLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==