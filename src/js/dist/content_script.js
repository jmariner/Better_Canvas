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
                        const types = Sass.prefixTypes;
                        if (!key.startsWith("popup_") && (types.has(objName) || types.has(key))) {
                            val = this.prefix + "-" + val;
                        }
                        if (objName === "dataAttr") {
                            val = "data-" + val;
                        }
                        obj[key] = val;
                    }
                    else {
                        throw new Error(`Unknown value type for key ${key} in object ${JSON.stringify(obj)}`);
                    }
                }
            };
            processObject(this, "root");
            this.sassJson = JSON.stringify(this);
        }
    }
    Sass.prefixTypes = new Set(["cssClass", "dataAttr", "id"]);
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
})(Vars || (Vars = {}));;var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
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
            DATA = new Data();
            PAGE = new Page();
            DATA.extensionId = chrome.runtime.id;
            DATA.name = chrome.runtime.getManifest().name;
            for (const logType of "log debug info warn error dir".split(" ")) {
                const orig = console[logType];
                console[logType] = orig.bind(console, `[${DATA.name}] [${logType.toUpperCase()}]`);
            }
            const urlMatch = /courses\/(\d+)(?:\/(\w+))?.*/.exec(document.location.pathname);
            const onCoursePage = urlMatch !== null;
            DATA.coursePage = onCoursePage ? CanvasPage[(urlMatch[2] || "home").toUpperCase()] : null;
            DATA.courseID = onCoursePage ? Number(urlMatch[1]) : null;
            DATA.onMainPage = [CanvasPage.MODULES, CanvasPage.GRADES].includes(DATA.coursePage);
            if (onCoursePage)
                console.debug(`On course #${DATA.courseID} page, at ${CanvasPage[DATA.coursePage]}`);
        })();
        const initStart = performance.now();
        V = Vars.VARS;
        V.init(DATA.courseID);
        try {
            ACCESS_TOKEN = yield Utils.loadToken();
        }
        catch (e) {
            Utils.accessTokenPrompt();
            throw new Exception("Missing access token; must refresh", true);
        }
        const courseTabFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const courseColors = (yield Utils.getJSON(V.canvas.api.urls.custom_colors)).custom_colors;
                const favoriteCourses = yield Utils.getJSON(V.canvas.api.urls.favorite_courses);
                for (const courseData of favoriteCourses) {
                    const color = courseColors["course_" + courseData.id];
                    DATA.courseTabs.set(courseData.id, new CustomCourseTab(courseData, color));
                }
            });
        };
        const navTabFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const navTabUrl = Utils.perPage(V.canvas.api.urls.navigation_tabs, 25);
                const navTabs = yield Utils.getJSON(navTabUrl);
                for (const tab of navTabs)
                    DATA.navTabs.set(tab.id, new NavTab(tab));
            });
        };
        const assignmentFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const assignmentsUrl = Utils.perPage(V.canvas.api.urls.assignments, 1000);
                const assignments = yield Utils.getJSON(assignmentsUrl);
                for (const assignmentJson of assignments) {
                    let contentId;
                    if (assignmentJson.quiz_id)
                        contentId = assignmentJson.quiz_id;
                    else if (assignmentJson.discussion_topic)
                        contentId = assignmentJson.discussion_topic.id;
                    else
                        contentId = assignmentJson.id;
                    let item;
                    if (ModuleItem.byContentId.has(contentId))
                        item = ModuleItem.byContentId.get(contentId);
                    else
                        item = ModuleItem.fromContentId(contentId);
                    item.setAssignmentId(assignmentJson.id);
                }
            });
        };
        const moduleItemFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const modulesUrl = Utils.perPage(V.canvas.api.urls.modules, 25);
                const modules = yield Utils.getJSON(modulesUrl);
                for (const moduleData of modules) {
                    DATA.modules.set(moduleData.id, new Module(moduleData));
                }
                const moduleIds = Array.from(DATA.modules.keys());
                const itemSetPromises = moduleIds.map(modId => DATA.modules.get(modId))
                    .filter(mod => mod.itemCount > 0)
                    .map(module => {
                    const moduleItemsUrl = Utils.perPage(Utils.format(V.canvas.api.urls.module_items, { moduleID: module.id }), module.itemCount);
                    return Utils.getJSON(moduleItemsUrl);
                });
                const moduleItemSets = yield Promise.all(itemSetPromises);
                for (const items of moduleItemSets) {
                    const module = DATA.modules.get(items[0].module_id);
                    for (const modItemJson of items) {
                        let item;
                        const contentId = modItemJson.content_id;
                        if (ModuleItem.byContentId.has(contentId))
                            item = ModuleItem.byContentId.get(contentId);
                        else if (contentId)
                            item = ModuleItem.fromContentId(contentId);
                        else
                            item = new ModuleItem();
                        item.update(modItemJson);
                        DATA.moduleItems.set(modItemJson.id, item);
                        module.items.push(item);
                    }
                }
                const fileItems = Array.from(DATA.moduleItems.values())
                    .filter(item => item.type === ModuleItemType.FILE);
                const filePromises = fileItems.map(item => {
                    const fileDataUrl = Utils.format(V.canvas.api.urls.file_direct, { fileID: item.contentId });
                    return Utils.getJSON(fileDataUrl);
                });
                const files = yield Promise.all(filePromises);
                for (const file of files)
                    ModuleItem.byContentId.get(file.id).setFileData(file);
            });
        };
        const customDataFlow = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const customDataUrl = Utils.format(V.canvas.api.urls.custom_data, { dataPath: "" });
                const customData = (yield Utils.getJSON(customDataUrl)).data;
                if (customData === undefined)
                    return;
                const complete = Utils.getOrDefault(customData.completed_assignments, DATA.courseID, new Array());
                const hidden = Utils.getOrDefault(customData.hidden_assignments, DATA.courseID, new Array());
                for (const [modItemId, modItem] of DATA.moduleItems) {
                    modItem.checked = complete.includes(modItemId);
                    modItem.hidden = hidden.includes(modItemId);
                }
                const activeStates = customData.active_states || [];
                $.each(V.state, (name, stateData) => {
                    const stateObj = new State(name, stateData, activeStates.includes(name));
                    DATA.states.set(name, stateObj);
                });
                const tabPositions = Utils.getOrDefault(customData.tab_positions, DATA.courseID, {});
                for (const [tabId, navTab] of DATA.navTabs) {
                    if (tabPositions[tabId] !== undefined)
                        navTab.setPosition(tabPositions[tabId]);
                }
            });
        };
        const promises = [courseTabFlow()];
        if (DATA.coursePage !== null)
            promises.push(navTabFlow());
        if (DATA.onMainPage)
            promises.push(assignmentFlow(), moduleItemFlow());
        yield Promise.all(promises);
        if (DATA.onMainPage)
            yield customDataFlow();
        return performance.now() - initStart;
    });
})()
    .catch((reason) => {
    if (reason instanceof Exception) {
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
        PAGE.initialize();
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
        const $insertionPoint = PAGE.sidebar.children().eq(2);
        for (const [tabID, courseTab] of DATA.courseTabs) {
            $insertionPoint.after(Utils.format(V.element.course_link, {
                tabColor: courseTab.color,
                tabID,
                name: courseTab.name,
                code: courseTab.code
            }));
        }
        DATA.elements.jump_button =
            $(V.element.jump_button)
                .find("i")
                .click(() => {
                if (PAGE.scrollingElement.prop("scrollTop") > 0)
                    $("body").animate({ scrollTop: 0 }, V.ui.scroll_time);
            })
                .end()
                .appendTo(PAGE.main);
        if (DATA.coursePage === null)
            return;
        $("ul#menu > li").removeClass("ic-app-header__menu-list-item--active");
        for (const [, state] of DATA.states) {
            if (state.active && state.onPages.includes(DATA.coursePage))
                PAGE.body.addClass(state.bodyClass);
        }
        if (DATA.courseTabs.has(DATA.courseID)) {
            const color = DATA.courseTabs.get(DATA.courseID).color;
            document.documentElement.style.setProperty("--ic-brand-primary", color);
        }
        $(V.canvas.selector.nav_tabs).find("li:empty").remove();
        Array.from(DATA.navTabs.values()).filter(tab => tab.hasCustomPosition)
            .sort((tabA, tabB) => tabA.position - tabB.position)
            .forEach(UI.updateNavTabPosition);
        if (!DATA.onMainPage)
            return;
        for (const [itemId, item] of DATA.moduleItems) {
            const mainEl = $("#" + item.canvasElementId);
            let parentEl;
            let hasCheckbox;
            let hasHideButton;
            item.checkboxElement = null;
            item.hideElement = null;
            if (DATA.coursePage === CanvasPage.MODULES) {
                parentEl = mainEl.find("div.ig-row");
                hasHideButton = true;
                hasCheckbox = !item.isSubHeader;
            }
            else if (DATA.coursePage === CanvasPage.GRADES) {
                parentEl = $("<td>")
                    .addClass(V.cssClass.checkbox_td)
                    .prependTo(mainEl);
                hasHideButton = false;
                hasCheckbox = item.isGraded;
            }
            if (hasCheckbox) {
                item.checkboxElement =
                    $(Utils.format(V.element.checkbox, { item_id: itemId })).appendTo(parentEl);
                UI.updateCheckbox(item);
                item.checkboxElement.show();
            }
            if (hasHideButton) {
                item.hideElement =
                    $(Utils.format(V.element.hide_button, { item_id: itemId })).appendTo(parentEl);
                UI.updateItemHide(item);
                item.hideElement.show();
            }
        }
        if (DATA.coursePage === CanvasPage.GRADES) {
            PAGE.grades
                .find("td[colspan='5']")
                .attr("colspan", 6)
                .end().find("> thead > tr")
                .prepend($("<th>")
                .attr("scope", "col")
                .append("<i class='icon-check'></i>"))
                .end().find("tr.student_assignment")
                .prepend(function () {
                return $(this).has("td:first-child").length === 0 ?
                    $("<td>").addClass(V.cssClass.checkbox_td) : undefined;
            });
        }
        PAGE.main.on("change", `.${V.cssClass.checkbox_parent} > input`, function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield Main.onCheckboxChange(this);
            });
        });
        if (DATA.coursePage !== CanvasPage.MODULES)
            return;
        $(V.canvas.selector.module_items).filter((i, el) => !el.innerHTML.trim().length).html("");
        const disabledIndent = DATA.states.get("disable_indent_override").active;
        $(V.canvas.selector.module_item).each(function () {
            const defIndent = [0, 1, 2, 3, 4, 5].filter(level => $(this).hasClass("indent_" + level))[0];
            $(this).attr(V.dataAttr.def_indent, defIndent);
            if (!disabledIndent)
                $(this).removeClass("indent_" + defIndent);
        });
        if (!disabledIndent) {
            $(V.canvas.selector.subheader).addClass("indent_" + V.ui.subheader_indent);
            $(V.canvas.selector.not_subheader).addClass("indent_" + V.ui.main_indent);
        }
        const toc = $(V.element.toc);
        const ul = toc.find("ul");
        for (const [modId, mod] of DATA.modules) {
            const formatted = Utils.format(V.element.toc_item, { item_name: mod.name, item_id: modId });
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
        DATA.elements.toc = toc
            .css("top", PAGE.left.height() + V.ui.toc_top_margin)
            .appendTo(PAGE.main)
            .data("cutoff", toc.offset().top - V.ui.toc_top_margin);
        Array.from(DATA.modules.values()).forEach(UI.updateModule);
        PAGE.main.on("click", `.${V.cssClass.hide_button} > i`, function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield Main.onHideButtonClick($(this));
            });
        });
        for (const [, item] of DATA.moduleItems) {
            if (item.type === ModuleItemType.FILE) {
                const element = Utils.format(V.element.download_button, {
                    file_url: item.fileData.url,
                    filename: item.fileData.display_name
                });
                $(element).insertBefore(item.checkboxElement);
            }
            else if (item.type === ModuleItemType.EXTERNAL_URL) {
                const element = Utils.format(V.element.url_button, {
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
        $("." + V.cssClass.download).add("." + V.cssClass.external_url).show();
    }
    static getState(stateName) {
        if (DATA.states.has(stateName)) {
            const state = DATA.states.get(stateName);
            return state.active;
        }
        else {
            return null;
        }
    }
    static setState(stateName, state) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!DATA.states.has(stateName))
                return;
            const stateObj = DATA.states.get(stateName);
            if (!stateObj.onPages.includes(DATA.coursePage))
                return;
            if (stateObj.bodyClass)
                PAGE.body.toggleClass(stateObj.bodyClass, state);
            stateObj.active = state;
            stateObj.onChange(state, V, PAGE.body);
            const url = Utils.format(V.canvas.api.urls.custom_data, { dataPath: "/active_states" });
            return Utils.editDataArray(url, state, [stateName]);
        });
    }
    static setNavTabPosition(tab, position) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = Utils.format(V.canvas.api.urls.custom_data, {
                dataPath: ["", V.canvas.api.data_urls.tab_positions, DATA.courseID, tab.id].join("/")
            });
            const success = yield Utils.putData(url, position);
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
            const id = Number($(el).attr(V.dataAttr.mod_item_id));
            const item = DATA.moduleItems.get(id);
            const status = el.checked;
            const oldTitle = el.title;
            el.checked = !status;
            if (status === item.checked) {
                console.error("Checkbox desync at item", item);
                return;
            }
            el.disabled = true;
            el.title = V.tooltip.waiting;
            const url = Utils.format(V.canvas.api.urls.custom_data, {
                dataPath: `/${V.canvas.api.data_urls.completed_assignments}/${DATA.courseID}`
            });
            const success = yield Utils.editDataArray(url, status, [id]);
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
            const id = Number(el.attr(V.dataAttr.mod_item_id));
            const item = DATA.moduleItems.get(id);
            if (item.isGraded || item.hideElement.hasClass(V.cssClass.hide_disabled))
                return;
            item.hideElement
                .addClass(V.cssClass.hide_disabled)
                .find("i")
                .attr("title", V.tooltip.waiting);
            const newState = !item.hidden;
            const url = Utils.format(V.canvas.api.urls.custom_data, {
                dataPath: `/${V.canvas.api.data_urls.hidden_assignments}/${DATA.courseID}`
            });
            const success = yield Utils.editDataArray(url, newState, [id]);
            if (success) {
                item.hidden = newState;
                yield UI.animateItemHide(item);
                UI.updateModule(item.module);
                console.debug(`Item ID ${id} (${item.name.substr(0, 25)}...) has been ${item.hidden ? "" : "un"}hidden`);
            }
        });
    }
    static onMessage(data, source, respondFunc) {
        if (source.id !== DATA.extensionId)
            return;
        if (data.type === MessageType.BASIC) {
            const unchecked = Array.from(DATA.moduleItems.values())
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
        else if (data.type === MessageType.STATE) {
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
            .attr("title", item.checked ? V.tooltip.mark_incomplete : V.tooltip.mark_complete)
            .closest(V.canvas.selector.module_item)
            .toggleClass(V.cssClass.checkbox_checked, item.checked);
    }
    static animateItemHide(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (item.hideElement === null)
                throw new Error("No hide button to update");
            const modItemEl = item.hideElement.closest(V.canvas.selector.module_item);
            const iEl = item.hideElement.find("i");
            iEl.add(modItemEl).toggleClass(V.cssClass.item_hidden, item.hidden);
            yield Utils.wait(V.ui.fade_time);
            item.hideElement.toggleClass(V.cssClass.hide_disabled, item.isGraded);
            iEl.attr("title", item.isGraded ? V.tooltip.hide_disabled : item.hidden ? V.tooltip.unhide : V.tooltip.hide);
        });
    }
    static updateItemHide(item) {
        if (item.hideElement === null)
            throw new Error("No hide button to update");
        const modItemEl = item.hideElement.closest(V.canvas.selector.module_item);
        const iEl = item.hideElement.find("i");
        iEl.add(modItemEl).toggleClass(V.cssClass.item_hidden, item.hidden);
        item.hideElement.toggleClass(V.cssClass.hide_disabled, item.isGraded);
        iEl.attr("title", item.isGraded ? V.tooltip.hide_disabled : item.hidden ? V.tooltip.unhide : V.tooltip.hide);
    }
    static updateModule(module) {
        if (DATA.elements.toc !== null) {
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
            const backgroundImage = Utils.format(V.misc.toc_background, { percent });
            DATA.elements.toc
                .find(`[${V.dataAttr.toc_module_id}='${module.id}']`)
                .attr(V.dataAttr.toc_total, totalItems)
                .attr(V.dataAttr.toc_checked_count, checkedItems)
                .attr(V.dataAttr.toc_percentage, percent)
                .closest("li")
                .toggleClass(V.cssClass.item_hidden, totalItems === 0)
                .css({ backgroundImage });
        }
        const noItems = module.items.filter(i => !i.isSubHeader && !i.hidden).length === 0;
        $("#context_module_" + module.id).toggleClass(V.cssClass.item_hidden, noItems);
    }
    static updateNavTabPosition(tab) {
        if (!tab.hasCustomPosition)
            throw new Error("Tab has no custom position");
        const tabList = $(V.canvas.selector.nav_tabs);
        const tabEl = tabList.find("a." + tab.id).parent();
        if (tab.hidden)
            tabEl.hide();
        else
            tabEl.show().detach().insertBefore(tabList.children().eq(tab.position - 1));
    }
    static updateScrollPosition() {
        const scrollTop = PAGE.scrollingElement.prop("scrollTop");
        if (DATA.elements.toc !== null) {
            DATA.elements.toc
                .toggleClass(V.cssClass.fixed, scrollTop > DATA.elements.toc.data("cutoff"));
        }
        if (DATA.elements.jump_button !== null) {
            DATA.elements.jump_button
                .toggleClass(V.cssClass.active, scrollTop > V.ui.jump_top_cutoff);
        }
    }
    static scrollToElement(element) {
        const elRect = element[0].getBoundingClientRect();
        const cliHeight = document.documentElement.clientHeight;
        const topRatio = V.ui.top_inside_ratio;
        if ((elRect.height < cliHeight && elRect.top >= 0 && elRect.bottom < cliHeight) ||
            (elRect.top >= 0 && elRect.top <= cliHeight * topRatio)) {
            UI.flashElement(element);
        }
        else {
            const scrollTop = element.offset().top - V.ui.scroll_top_offset;
            PAGE.scrollingElement.animate({ scrollTop }, V.ui.scroll_time, () => UI.flashElement(element));
        }
    }
    static flashElement(element) {
        element.addClass(V.cssClass.flash);
        setTimeout(() => element.removeClass(V.cssClass.flash), 1000);
    }
}
//# sourceMappingURL=content_script.js.map