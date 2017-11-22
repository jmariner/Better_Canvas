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
        return this._position == null ? this.initPosition : this._position == -1 ? null : this._position;
    }
    get hidden() {
        return this._position == -1;
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
        let typeString = moduleItemJson.type
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
            throw "Invalid Module Item Element: " + value;
    }
    get hideElement() { return this._hideElement; }
    set hideElement(value) {
        if (value === null || value.length === 1)
            this._hideElement = value;
        else
            throw "Invalid Module Item Element: " + value;
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
            throw "Invalid state message: no boolean to set state to";
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
        return "" + str;
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
                throw "404 error when getting JSON";
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
            let bodyData = { ns: V.canvas.api.namespace, data };
            let method = data instanceof Array && data.length > 0 || data !== undefined ? "PUT" : "DELETE";
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
                newArray = existingData ? existingData.concat(values) : values;
            }
            else {
                if (existingData.length === 0)
                    return true;
                newArray = existingData.filter(val => !values.includes(val));
            }
            return Utils.putData(url, newArray);
        });
    }
    static getJSON_Sync(url, callback) {
        if (ACCESS_TOKEN === null)
            throw new Error("Access token not set");
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                switch (req.status) {
                    case 404:
                        throw "404 error when getting JSON";
                    case 400:
                        console.debug("400 error when getting JSON was OKAY");
                    default:
                        Utils.safeCb(callback)(JSON.parse(req.responseText.replace("while(1);", "")));
                }
            }
        };
        req.open("GET", url);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("Authorization", "Bearer " + ACCESS_TOKEN);
        req.send();
    }
    static putData_Sync(url, data, callback) {
        let bodyData = { ns: V.canvas.api.namespace, data };
        let action = data instanceof Array && data.length > 0 || data !== undefined ? "PUT" : "DELETE";
        if (action === "DELETE")
            delete bodyData.data;
        const req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                Utils.safeCb(callback)(true);
            }
        };
        req.open(action, url);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("Authorization", "Bearer " + ACCESS_TOKEN);
        req.send(JSON.stringify(bodyData));
    }
    static appendDataArray_Sync(url, values, callback) {
        Utils.getJSON_Sync(url, resultData => {
            let array = resultData.data ? resultData.data.concat(values) : values;
            Utils.putData_Sync(url, array, callback);
        });
    }
    static subtractDataArray_Sync(url, values, callback) {
        Utils.getJSON_Sync(url, resultData => {
            let array = resultData.data || [];
            if (array.length === 0) {
                Utils.safeCb(callback)(true);
                return;
            }
            array = array.filter(val => !values.includes(val));
            Utils.putData_Sync(url, array, callback);
        });
    }
    static editDataArray_Sync(url, append, values, callback) {
        if (append)
            Utils.appendDataArray_Sync(url, values, callback);
        else
            Utils.subtractDataArray_Sync(url, values, callback);
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
}
//# sourceMappingURL=objects.js.map