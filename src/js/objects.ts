// ===== objects.ts =====
let V: Vars.Vars; //Config;
let ACCESS_TOKEN: string = null;
let DATA: Data;
let PAGE: Page;

type Callback = () => void;

class Data {
	coursePage: CanvasPage;
	courseID: number;
//	contentToAssignment: Map<number, number>; // content id => assignment id
//	moduleItemCounts: Map<number, number>; // module id => module item count
	modules: Map<number, Module>; // module id => array of ModuleItem
	moduleItems: Map<number, ModuleItem>; // module item id => ModuleItem
	states: Map<string, State>; // stateName => State
	courseTabs: CustomCourseTab[];
	onMainPage: boolean;
	name: string;
	extensionId: string;
	elements: {jump_button: JQuery, toc: JQuery};

	constructor() {
	//	this.contentToAssignment = new Map();
	//	this.moduleItemCounts = new Map();
		this.modules = new Map();
		this.moduleItems = new Map();
		this.states = new Map();
		this.courseTabs = [];

		this.elements = {jump_button: null, toc: null};

	}
}

class Page {

	body: JQuery;
	main?: JQuery;
	content?: JQuery;
	left?: JQuery;
	sidebar: JQuery;
	grades?: JQuery;

	initialize() {

		this.body = $("body");
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

/*
// layout of config file (vars.json + sass.json)
class Config {

	prefix;

	"class": {active, checkbox_parent, checkbox_checked, checkbox_td, flash, course_link_text,
		item_hidden, hide_button, hide_disabled, toc_ratio, toc_title, fixed};

	data_attr: {toc_module_id, toc_total, toc_checked_count, toc_percentage, mod_item_id, course_name, course_code};

	id: {toc, jump_button};

	misc: {toc_background};

	// all items in this map are only used in the scss file, so omitting them here
	//color: {...};

	tooltip: {mark_complete, mark_incomplete, hide, unhide, hide_disabled, jump_button};
	element: {checkbox, hide_button, course_link, toc, toc_item, jump_button, submission_icon};
	state: Object; // don't care here, only used during init to set DATA.states

	ui: {top_inside_ratio: number, scroll_top_offset: number, jump_top_cutoff: number,
		toc_top_margin: number, scroll_time: number, fade_time: number};

	canvas: {
		selector: {
			module, module_item, subheader
		}
		api: {
			namespace, rootUrl, per_page: number,
			urls: {custom_data, favorite_courses, custom_colors, assignments, modules, module_items}
		}
	};
}*/

class CustomCourseTab {
    readonly id: number;
    readonly name: string;
    readonly code: string;
    readonly color: string;

    constructor(courseData: CanvasAPI.Course, color: string) {
        this.id = courseData.id;
        this.name = courseData.name;
        this.code = courseData.course_code;
        this.color = color;
    }

}

class State {
    private name: string;
    readonly bodyClass: string;
    readonly onPages: CanvasPage[];

    public active: boolean;

    constructor(key, stateData, active) {
        this.name = key;
        this.bodyClass = stateData.cssClass;
        this.active = active;
        this.onPages = [];

		stateData.pages.forEach((page: string) => {
			const _page = CanvasPage[page.toUpperCase()];
			if (_page !== undefined)
				this.onPages.push(_page);
		});
    }

}

class Module {
	readonly name: string;
	readonly id: number;
	readonly itemCount: number;
	readonly items: ModuleItem[];

	constructor(moduleJson) {
		this.name = moduleJson.name;
		this.id = moduleJson.id;
		this.itemCount = moduleJson.items_count;
		this.items = [];
	}

}

class ModuleItem {
	private _id: number;
	private _name: string;
	private moduleId: number;
	private type: ModuleItemType;
	private assignmentId: number;
	private contentId: number;

	public isSubmitted: boolean;

	public checked: boolean;
	public hidden: boolean;
	private _checkboxElement: JQuery;
	private _hideElement: JQuery;

	public static readonly byContentId = new Map<number, ModuleItem>();

	public static fromContentId(contentId: number): ModuleItem {
		const item = new ModuleItem();
		item.contentId = contentId;
		ModuleItem.byContentId.set(contentId, item);
		return item;
	}

	constructor(moduleItemJson?: CanvasAPI.ModuleItem) {
		if (moduleItemJson) this.update(moduleItemJson);
	}

	public update(moduleItemJson: CanvasAPI.ModuleItem) {
		this._id = moduleItemJson.id;
		this._name = moduleItemJson.title;
		this.moduleId = moduleItemJson.module_id;

		let typeString: string = moduleItemJson.type
			.replace(/([A-Z])/g, (r, s) => "_"+s)
			.replace(/^_/, "").toUpperCase();

		this.type = ModuleItemType[typeString];

		this.checked = false;
		this.hidden = false;

		if (this.type === ModuleItemType.ASSIGNMENT)
			this.setAssignmentId(moduleItemJson.content_id);
		else
			this.assignmentId = null;
	}

	public setAssignmentId(id: number) { this.assignmentId = id; }

	get canvasElementId() {
		switch (DATA.coursePage) {
			case CanvasPage.MODULES:
				return "context_module_item_" + this._id; // li element
			case CanvasPage.GRADES:
				return "submission_" + this.assignmentId; // tr element
			default:
				return null;
		}
	}

	get id() { return this._id; }
	get name() { return this._name;	}
	get isGraded() { return this.assignmentId !== null; }
	get isSubHeader() { return this.type === ModuleItemType.SUB_HEADER; }
	get module() { return DATA.modules.get(this.moduleId); }

	get checkboxElement(): JQuery { return this._checkboxElement; }
	set checkboxElement(value: JQuery) {
		if (value === null || value.length === 1)
			this._checkboxElement = value;
		else
			throw "Invalid Module Item Element: " + value;
	}

	get hideElement(): JQuery { return this._hideElement; }
	set hideElement(value: JQuery) {
		if (value === null || value.length === 1)
			this._hideElement = value;
		else
			throw "Invalid Module Item Element: " + value;
	}

}

/*
class ModuleItem0 {
    private name: string;
    private type: ModuleItemType;
    private gradebookId: number;

    readonly contentId: number;
    readonly moduleItemId: number;
    readonly isSubHeader: boolean;
    readonly canvasElementId: string;

    checked: boolean;
    hidden: boolean;
    checkboxElement: JQuery;
    hideElement: JQuery;

    constructor(moduleItemJson) {

        this.moduleItemId = moduleItemJson.id;
        this.name = moduleItemJson.title;

        let typeString: string = moduleItemJson.type
            .replace(/([A-Z])/g, (r, string) => "_"+string)
            .replace(/^_/, "").toUpperCase();

        this.type = ModuleItemType[typeString];
        this.isSubHeader = this.type === ModuleItemType.SUB_HEADER;

        this.contentId = moduleItemJson.content_id;
        if (this.type === ModuleItemType.ASSIGNMENT) {
            this.gradebookId = this.contentId;
        }
        else {
            this.gradebookId = null;
        }

        this.checked = false;
        this.hidden = false;

        switch (DATA.coursePage) {
            case CanvasPage.MODULES:
                this.canvasElementId = "context_module_item_" + this.moduleItemId; // li element
                break;
            case CanvasPage.GRADES:
                this.canvasElementId = "submission_" + this.gradebookId; // tr element
                break;
            default:
                this.canvasElementId = null;
        }

    }

    setAssignmentId(id: number) {
    	this.gradebookId = id;
	}

	get isGraded() {
    	return this.gradebookId !== null;
	}

}*/

enum ModuleItemType {
    //noinspection JSUnusedGlobalSymbols
	ASSIGNMENT, SUB_HEADER, DISCUSSION, QUIZ, PAGE, FILE, EXTERNAL_URL
}

enum CanvasPage {
	//noinspection JSUnusedGlobalSymbols
    MODULES, GRADES, HOME, USERS, GROUPS, COLLABORATIONS, DISCUSSION_TOPICS, EXTERNAL_TOOLS, ASSIGNMENTS
}

enum MessageType {
	//noinspection JSUnusedGlobalSymbols
	BASIC, STATE
}

class MessageData {
	action: string;
	type: MessageType;

	constructor(action: string, type?: MessageType) {
		this.action = action;
		this.type = type || MessageType.BASIC;
	}
}

class StateMessageData extends MessageData {
	stateName: string;
	state: boolean;

	constructor(action: "get" | "set", stateName: string, state?: boolean) {
		super(action, MessageType.STATE);

		this.stateName = stateName;
		this.state = state;

		if (action === "set" && this.state === undefined)
			throw "Invalid state message: no boolean to set state to";
	}
}

class Utils {

	static format(string, ...formatArgs) {

		const formatParams: string[] | Object =
			(formatArgs.length === 1 && typeof formatArgs[0] === "object") ? formatArgs[0] : formatArgs;

		for (const i in formatParams)
			string = string.replace(new RegExp("\\{" + i + "\\}", "gi"), formatParams[i]);

		return ""+string;
	}

	static scopeFormat(string: string, scope: Object) {

		if (!string.includes("{")) return string;

		return string.replace(/{([^{}]+)}/g,
			(match, p1) => {
				if (p1.includes(".")) {
					let val = Utils.getPathValue(scope, p1);
					if (val !== null)
						return val;
				}
				else if (scope.hasOwnProperty(p1)) {
					return scope[p1];
				}

				return match;
			});

	}

	static getPathValue(object: Object, pathString: string) {
		const pathParts = pathString.split(".");
		let current = object;
		for (let part in pathParts) {
			part = pathParts[part];
			if (!current.hasOwnProperty(part)) return null;
			if (typeof current === "object")
				current = current[part];
		}
		return current;
	}

	/** @deprecated */
	/*
	static getPaginatedJSONArray(url: string, callback: (data: any[]) => void) {

		let allData: any[] = [];

		let getPage = function(page) {

			Utils.getJSON(`${url}?page=${page}&per_page=${V.canvas.api.per_page}`, result => {

				if (result.length > 0) {
					allData = allData.concat(result);

					if (result.length === V.canvas.api.per_page)
						getPage(page + 1);
					else
						Utils.safeCb(callback)(allData);
				}
				else {
					Utils.safeCb(callback)(allData);
				}

			});
		};

		getPage(1);

	}*/

	static perPage(url: string, perPage: number) {
		return `${url}?per_page=${perPage}`;
	}

	static getJSON(url: string, callback: (data: any) => void) {

		if (ACCESS_TOKEN === null)
			throw new Error("Access token not set");

		let req = new XMLHttpRequest();

		req.onreadystatechange = () => {
			if (req.readyState === 4) {
				switch (req.status) {
					case 404:
						throw "404 error when getting JSON";
					case 400:
						console.info("400 error when getting JSON was OKAY");
					// fallthrough
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

	static putDataArray(url: string, array: any[], callback: (success: boolean) => any) {
		let data = {ns: V.canvas.api.namespace, data: array};
		let action = array.length > 0 ? "PUT" : "DELETE";

		if (action === "DELETE")
			delete data.data;

		const req = new XMLHttpRequest();

		req.onreadystatechange = () => {
			if (req.readyState === 4) {

				// TODO determine what's not a success
				Utils.safeCb(callback)(true);

			}
		};

		req.open(action, url);
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("Authorization", "Bearer " + ACCESS_TOKEN);
		req.send(JSON.stringify(data));
	}

	static appendDataArray(url: string, values: any[], callback: (success: boolean) => any) {

		// url is same for get/put
		Utils.getJSON(url, resultData => {
			let array = resultData.data ? resultData.data.concat(values) : values;
			Utils.putDataArray(url, array, callback);
		});
	}

	static subtractDataArray(url: string, values: any[], callback: (success: boolean) => any) {

		// url is same for get/put
		Utils.getJSON(url, resultData => {
			let array = resultData.data || [];
			if (array.length === 0) {
				Utils.safeCb(callback)(true);
				return;
			}
			array = array.filter(val => !values.includes(val));
			Utils.putDataArray(url, array, callback);
		});
	}

	static editDataArray(url: string, append: boolean, values: any[], callback?: (success: boolean) => any) {
		if (append) Utils.appendDataArray(url, values, callback);
		else Utils.subtractDataArray(url, values, callback);
	}

	static loadToken(callback?: (success: boolean) => void) {
		chrome.storage.sync.get(V.misc.token_key, resultData => {
			const success = ACCESS_TOKEN !== null || resultData[V.misc.token_key];
			if (success)
				ACCESS_TOKEN = resultData[V.misc.token_key];

			Utils.safeCb(callback)(success);
		});
	}

	static accessTokenPrompt() {
		const openOptions = confirm("Missing access token, press OK to open extension options");
		if (openOptions) // TODO send tab ID with this message?
			chrome.runtime.sendMessage(new MessageData("open options"));
	}

	static runCb(callbackFunction: Callback) {
		if (callbackFunction !== undefined)
			callbackFunction();
	}

	static safeCb<F extends ((...args) => void)>(callbackFunction: F | undefined): F {
		if (callbackFunction !== undefined)
			return callbackFunction;
		else
			return (() => {}) as F;
	}

}