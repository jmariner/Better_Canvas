var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var V;
var ACCESS_TOKEN = null;
var DATA;
var PAGE;
var Data = (function () {
    function Data() {
        this.modules = new Map();
        this.moduleItems = new Map();
        this.states = new Map();
        this.courseTabs = [];
        this.elements = { jump_button: null, toc: null };
    }
    return Data;
}());
var Page = (function () {
    function Page() {
    }
    Page.prototype.initialize = function () {
        this.body = $("body");
        this.sidebar = $("#menu");
        this.main = $("#main");
        if (DATA.onMainPage) {
            this.content = $("#content");
            this.left = $("#left-side");
        }
        if (DATA.coursePage === CanvasPage.GRADES)
            this.grades = $("#grades_summary");
    };
    return Page;
}());
var CustomCourseTab = (function () {
    function CustomCourseTab(courseData, color) {
        this.id = courseData.id;
        this.name = courseData.name;
        this.code = courseData.course_code;
        this.color = color;
    }
    return CustomCourseTab;
}());
var State = (function () {
    function State(key, stateData, active) {
        var _this = this;
        this.name = key;
        this.bodyClass = stateData.cssClass;
        this.onEnable = stateData.onEnable;
        this.onDisable = stateData.onDisable;
        this.active = active;
        this.onPages = [];
        stateData.pages.forEach(function (page) {
            var _page = CanvasPage[page.toUpperCase()];
            if (_page !== undefined)
                _this.onPages.push(_page);
        });
    }
    State.prototype.onChange = function (newState, vars, body) {
        if (newState)
            this.onEnable(vars, body);
        else
            this.onDisable(vars, body);
    };
    return State;
}());
var Module = (function () {
    function Module(moduleJson) {
        this.name = moduleJson.name;
        this.id = moduleJson.id;
        this.itemCount = moduleJson.items_count;
        this.items = [];
    }
    return Module;
}());
var ModuleItem = (function () {
    function ModuleItem(moduleItemJson) {
        if (moduleItemJson)
            this.update(moduleItemJson);
    }
    ModuleItem.fromContentId = function (contentId) {
        var item = new ModuleItem();
        item.contentId = contentId;
        ModuleItem.byContentId.set(contentId, item);
        return item;
    };
    ModuleItem.prototype.update = function (moduleItemJson) {
        this._id = moduleItemJson.id;
        this._name = moduleItemJson.title;
        this.moduleId = moduleItemJson.module_id;
        var typeString = moduleItemJson.type
            .replace(/([A-Z])/g, function (r, s) { return "_" + s; })
            .replace(/^_/, "").toUpperCase();
        this.type = ModuleItemType[typeString];
        this.checked = false;
        this.hidden = false;
        if (this.type === ModuleItemType.ASSIGNMENT)
            this.setAssignmentId(moduleItemJson.content_id);
        else
            this.assignmentId = null;
    };
    ModuleItem.prototype.setAssignmentId = function (id) { this.assignmentId = id; };
    Object.defineProperty(ModuleItem.prototype, "canvasElementId", {
        get: function () {
            switch (DATA.coursePage) {
                case CanvasPage.MODULES:
                    return "context_module_item_" + this._id;
                case CanvasPage.GRADES:
                    return "submission_" + this.assignmentId;
                default:
                    return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "isGraded", {
        get: function () { return this.assignmentId !== null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "isSubHeader", {
        get: function () { return this.type === ModuleItemType.SUB_HEADER; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "module", {
        get: function () { return DATA.modules.get(this.moduleId); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "checkboxElement", {
        get: function () { return this._checkboxElement; },
        set: function (value) {
            if (value === null || value.length === 1)
                this._checkboxElement = value;
            else
                throw "Invalid Module Item Element: " + value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleItem.prototype, "hideElement", {
        get: function () { return this._hideElement; },
        set: function (value) {
            if (value === null || value.length === 1)
                this._hideElement = value;
            else
                throw "Invalid Module Item Element: " + value;
        },
        enumerable: true,
        configurable: true
    });
    return ModuleItem;
}());
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
var MessageData = (function () {
    function MessageData(action, type) {
        this.action = action;
        this.type = type || MessageType.BASIC;
    }
    return MessageData;
}());
var StateMessageData = (function (_super) {
    __extends(StateMessageData, _super);
    function StateMessageData(action, stateName, state) {
        var _this = _super.call(this, action, MessageType.STATE) || this;
        _this.stateName = stateName;
        _this.state = state;
        if (action === "set" && _this.state === undefined)
            throw "Invalid state message: no boolean to set state to";
        return _this;
    }
    return StateMessageData;
}(MessageData));
var Utils = (function () {
    function Utils() {
    }
    Utils.format = function (string) {
        var formatArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            formatArgs[_i - 1] = arguments[_i];
        }
        var formatParams = (formatArgs.length === 1 && typeof formatArgs[0] === "object") ? formatArgs[0] : formatArgs;
        for (var i in formatParams)
            string = string.replace(new RegExp("\\{" + i + "\\}", "gi"), formatParams[i]);
        return "" + string;
    };
    Utils.scopeFormat = function (string, scope) {
        if (!string.includes("{"))
            return string;
        return string.replace(/{([^{}]+)}/g, function (match, p1) {
            if (p1.includes(".")) {
                var val = Utils.getPathValue(scope, p1);
                if (val !== null)
                    return val;
            }
            else if (scope.hasOwnProperty(p1)) {
                return scope[p1];
            }
            return match;
        });
    };
    Utils.getPathValue = function (object, pathString) {
        var pathParts = pathString.split(".");
        var current = object;
        for (var part in pathParts) {
            part = pathParts[part];
            if (!current.hasOwnProperty(part))
                return null;
            if (typeof current === "object")
                current = current[part];
        }
        return current;
    };
    Utils.perPage = function (url, perPage) {
        return url + "?per_page=" + perPage;
    };
    Utils.getJSON = function (url, callback) {
        if (ACCESS_TOKEN === null)
            throw new Error("Access token not set");
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                switch (req.status) {
                    case 404:
                        throw "404 error when getting JSON";
                    case 400:
                        console.info("400 error when getting JSON was OKAY");
                    default:
                        Utils.safeCb(callback)(JSON.parse(req.responseText.replace("while(1);", "")));
                }
            }
        };
        req.open("GET", url);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("Authorization", "Bearer " + ACCESS_TOKEN);
        req.send();
    };
    Utils.putDataArray = function (url, array, callback) {
        var data = { ns: V.canvas.api.namespace, data: array };
        var action = array.length > 0 ? "PUT" : "DELETE";
        if (action === "DELETE")
            delete data.data;
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                Utils.safeCb(callback)(true);
            }
        };
        req.open(action, url);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("Authorization", "Bearer " + ACCESS_TOKEN);
        req.send(JSON.stringify(data));
    };
    Utils.appendDataArray = function (url, values, callback) {
        Utils.getJSON(url, function (resultData) {
            var array = resultData.data ? resultData.data.concat(values) : values;
            Utils.putDataArray(url, array, callback);
        });
    };
    Utils.subtractDataArray = function (url, values, callback) {
        Utils.getJSON(url, function (resultData) {
            var array = resultData.data || [];
            if (array.length === 0) {
                Utils.safeCb(callback)(true);
                return;
            }
            array = array.filter(function (val) { return !values.includes(val); });
            Utils.putDataArray(url, array, callback);
        });
    };
    Utils.editDataArray = function (url, append, values, callback) {
        if (append)
            Utils.appendDataArray(url, values, callback);
        else
            Utils.subtractDataArray(url, values, callback);
    };
    Utils.loadToken = function (callback) {
        chrome.storage.sync.get(V.misc.token_key, function (resultData) {
            var success = ACCESS_TOKEN !== null || resultData[V.misc.token_key];
            if (success)
                ACCESS_TOKEN = resultData[V.misc.token_key];
            Utils.safeCb(callback)(success);
        });
    };
    Utils.accessTokenPrompt = function () {
        var openOptions = confirm("Missing access token, press OK to open extension options");
        if (openOptions)
            chrome.runtime.sendMessage(new MessageData("open options"));
    };
    Utils.runCb = function (callbackFunction) {
        if (callbackFunction !== undefined)
            callbackFunction();
    };
    Utils.safeCb = function (callbackFunction) {
        if (callbackFunction !== undefined)
            return callbackFunction;
        else
            return (function () { });
    };
    return Utils;
}());
//# sourceMappingURL=objects.js.map