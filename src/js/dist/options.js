var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let V;
let ACCESS_TOKEN = null;
let DATA;
let PAGE;
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
            Utils.safeCb(this.onEnable)(vars, body);
        else
            Utils.safeCb(this.onDisable)(vars, body);
    }
}
class Module {
    constructor(moduleJson) {
        this.name = moduleJson.name;
        this.id = moduleJson.id;
        this.itemCount = moduleJson.items_count;
        this.items = [];
    }
}
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
class StateMessageData extends MessageData {
    constructor(action, stateName, state) {
        super(action, MessageType.STATE);
        this.stateName = stateName;
        this.state = state;
        if (action === "set" && this.state === undefined)
            throw new Error("Invalid state message: no boolean to set state to");
    }
}
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
    static putData(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            Utils.checkToken();
            const bodyData = { ns: V.canvas.api.namespace, data };
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
        if (ACCESS_TOKEN === null)
            throw new Error("Access token not set");
    }
    static loadToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                chrome.storage.sync.get(V.misc.token_key, resultData => {
                    const success = ACCESS_TOKEN !== null || resultData[V.misc.token_key];
                    if (success)
                        resolve(resultData[V.misc.token_key]);
                    else
                        reject();
                });
            });
        });
    }
    static accessTokenPrompt() {
        const openOptions = confirm("Missing access token, press OK to open extension options");
        if (openOptions)
            chrome.runtime.sendMessage(new MessageData("open options"));
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
};var Vars;
(function (Vars_1) {
    class Sass {
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
            const processObject = (obj, objName) => {
                for (const key in obj) {
                    if (!obj.hasOwnProperty(key))
                        continue;
                    let val = obj[key];
                    if (typeof val === "object") {
                        processObject(val, key);
                    }
                    else if (typeof val === "string") {
                        if ((Sass.prefixTypes.indexOf(objName) > -1 || Sass.prefixTypes.indexOf(key) > -1)
                            && !key.startsWith("popup_")) {
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
    Sass.prefixTypes = ["cssClass", "dataAttr", "id"];
    class Vars extends Sass {
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
                this.canvas.api.urls[key] = this.canvas.api.root_url + Utils.format(url, { courseID });
            });
        }
    }
    Vars_1.Vars = Vars;
    Vars_1.VARS = new Vars();
    if (typeof module !== "undefined")
        module.exports = Vars_1.VARS.sassJson;
})(Vars || (Vars = {}));;V = Vars.VARS;
$(function () {
    const tokenEl = $("#token");
    const statusEl = $("#status");
    const saveEl = $("#save");
    chrome.storage.sync.get(V.misc.token_key, data => {
        if (data[V.misc.token_key])
            tokenEl.val(data[V.misc.token_key]);
    });
    saveEl.click(() => {
        const token = tokenEl.val();
        chrome.storage.sync.set({
            [V.misc.token_key]: token
        }, () => {
            if (chrome.runtime.lastError === undefined) {
                statusEl.text("Access token saved");
                setTimeout(window.close, 500);
            }
        });
    });
});
//# sourceMappingURL=options.js.map