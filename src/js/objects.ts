// ===== objects.ts =====
let V: Vars.Vars;
let ACCESS_TOKEN: string = null;
let DATA: Data;
let PAGE: Page;

type Callback = () => void;

class Data {
	coursePage: CanvasPage;
	courseID: number;
	modules: Map<number, Module>; // module id => array of ModuleItem
	moduleItems: Map<number, ModuleItem>; // module item id => ModuleItem
	states: Map<string, State>; // stateName => State
	courseTabs: Map<number, CustomCourseTab>; // course id => course tab
	navTabs: Map<string, NavTab>; // tab id string => tab
	onMainPage: boolean;
	name: string;
	extensionId: string;
	elements: {jump_button: JQuery, toc: JQuery};

	constructor() {
		this.modules = new Map();
		this.moduleItems = new Map();
		this.states = new Map();
		this.courseTabs = new Map();
		this.navTabs = new Map();

		this.elements = {jump_button: null, toc: null};

	}
}

class Page {

	body: JQuery;
	scrollingElement: JQuery;
	main?: JQuery;
	content?: JQuery;
	left?: JQuery;
	sidebar: JQuery;
	grades?: JQuery;

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

class NavTab {
	readonly id: string;
	private readonly initPosition: number;
	private _position: number;

	constructor(tabData: CanvasAPI.Tab) {
		this.id = tabData.id;
		this._position = null;
		this.initPosition = tabData.position;
	}

	public setPosition(pos) {
		this._position = pos;
	}

	get hasCustomPosition(): boolean {
		return this._position != null;
	}

	get position(): number {
		return this._position == null ? this.initPosition : this._position == -1 ? null : this._position;
	}

	get hidden(): boolean {
		return this._position == -1;
	}
}

class State {
	private name: string;
	private onEnable: (vars: any, body: JQuery) => void;
	private onDisable: (vars: any, body: JQuery) => void;

	readonly bodyClass: string;
	readonly onPages: CanvasPage[];

	public active: boolean;

	constructor(key, stateData, active) {
		this.name = key;
		this.bodyClass = stateData.cssClass;
		this.onEnable = stateData.onEnable;
		this.onDisable = stateData.onDisable;
		this.active = active;
		this.onPages = [];

		stateData.pages.forEach((page: string) => {
			const _page = CanvasPage[page.toUpperCase()];
			if (_page !== undefined)
				this.onPages.push(_page);
		});
	}

	onChange(newState: boolean, vars, body: JQuery) {
		if (newState) Utils.safeCb(this.onEnable)(vars, body);
		else Utils.safeCb(this.onDisable)(vars, body);
	}

}

class Module {
	readonly name: string;
	readonly id: number;
	readonly itemCount: number;
	readonly items: ModuleItem[];

	constructor(moduleJson: CanvasAPI.Module) {
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
	private _type: ModuleItemType;
	private assignmentId: number;
	private _contentId: number;
	private _fileData: CanvasAPI.File;
	private _externalUrl: string;

	public isSubmitted: boolean;

	public checked: boolean;
	public hidden: boolean;
	private _checkboxElement: JQuery;
	private _hideElement: JQuery;

	public static readonly byContentId = new Map<number, ModuleItem>();

	public static fromContentId(contentId: number): ModuleItem {
		const item = new ModuleItem();
		item._contentId = contentId;
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
		this._externalUrl = moduleItemJson.external_url || null;

		let typeString: string = moduleItemJson.type
			.replace(/([A-Z])/g, (r, s) => "_"+s)
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

	public setAssignmentId(id: number) { this.assignmentId = id; }
	public setFileData(data: CanvasAPI.File) { this._fileData = data; }

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
	get type(): ModuleItemType { return this._type; }
	get isGraded() { return this.assignmentId !== null; }
	get isSubHeader() { return this._type === ModuleItemType.SUB_HEADER; }
	get module() { return DATA.modules.get(this.moduleId); }
	get externalUrl() { return this._externalUrl; }
	get contentId() { return this._contentId; }

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

	get fileData(): CanvasAPI.File { return this._fileData; }

}

enum ModuleItemType {
	//noinspection JSUnusedGlobalSymbols
	ASSIGNMENT, SUB_HEADER, DISCUSSION, QUIZ, PAGE, FILE, EXTERNAL_URL, EXTERNAL_TOOL
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

class Exception {
	private reason: string;
	private fatal: boolean;

	constructor(reason: string, fatal?: boolean) {
		if (fatal === undefined) fatal = false;
		this.reason = reason;
		this.fatal = fatal;
	}

	get isFatal() {
		return this.fatal;
	}

	public toString() {
		return this.reason;
	}
}

class Utils {

	static format(str: string, obj: object): string {

		for (const key in obj) {
			if (obj.hasOwnProperty(key))
				str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), obj[key]);
		}

		return ""+str;
	}

	static getOrDefault<V>(obj: object, key: PropertyKey, def: V): V {
		if (obj === undefined || obj[key] === undefined) return def;
		else return obj[key];
	}

	static perPage(url: string, perPage: number) {
		return `${url}?per_page=${perPage}`;
	}

	static async getJSON<T>(url: string): Promise<T> {

		Utils.checkToken();

		const resp = await fetch(url, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": "Bearer " + ACCESS_TOKEN
			})
		} as RequestInit);

		if (resp.status === 404) {
			throw "404 error when getting JSON";
		}
		else {
			if (resp.status === 400)
				console.debug("400 error when getting JSON was OKAY");

			let json = await resp.text();
			json = json.replace("while(1);","");

			return JSON.parse(json);
		}

	}

	static async putData(url, data: any[] | any): Promise<boolean> {

		Utils.checkToken();

		let bodyData = {ns: V.canvas.api.namespace, data};
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
		} as RequestInit;

		const resp = await fetch(url, ops);

		if (!resp.ok || resp.status === 401) { // 401 unauthorized
			console.error(`Unable to ${method} data to ${url}. resp:`, JSON.stringify(resp));
			return false;
		}
		else {
			return true;
		}

	}

	static async editDataArray(url: string, append: boolean, values: any[]): Promise<boolean> {
		// url is same for get/put
		const existingData: any[] = (
			await Utils.getJSON<{data:any[]}>(url)
		).data || [];

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
	}

	static getJSON_Sync(url: string, callback: (data: any) => void) {

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

	static putData_Sync(url: string, data: any | any[], callback: (success: boolean) => any) {
		let bodyData = {ns: V.canvas.api.namespace, data};
		let action = data instanceof Array && data.length > 0 || data !== undefined ? "PUT" : "DELETE";

		if (action === "DELETE")
			delete bodyData.data;

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
		req.send(JSON.stringify(bodyData));
	}

	static appendDataArray_Sync(url: string, values: any[], callback: (success: boolean) => any) {

		// url is same for get/put
		Utils.getJSON_Sync(url, resultData => {
			let array = resultData.data ? resultData.data.concat(values) : values;
			Utils.putData_Sync(url, array, callback);
		});
	}

	static subtractDataArray_Sync(url: string, values: any[], callback: (success: boolean) => any) {

		// url is same for get/put
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

	static editDataArray_Sync(url: string, append: boolean, values: any[], callback?: (success: boolean) => any) {
		if (append) Utils.appendDataArray_Sync(url, values, callback);
		else Utils.subtractDataArray_Sync(url, values, callback);
	}

	static checkToken(): void | never {
		if (ACCESS_TOKEN === null)
			throw new Error("Access token not set");
	}

	static async loadToken(): Promise<string> {
		return new Promise<string>((resolve, reject) => {

			chrome.storage.sync.get(V.misc.token_key, resultData => {

				const success = ACCESS_TOKEN !== null || resultData[V.misc.token_key];
				if (success) resolve(resultData[V.misc.token_key]);
				else reject();

			});

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