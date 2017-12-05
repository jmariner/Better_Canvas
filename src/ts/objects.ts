import * as CanvasAPI from "./canvas_api";

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

export class CustomCourseTab {
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

export class NavTab {
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
		return this._position == null ? this.initPosition :
			this._position === -1 ? null : this._position;
	}

	get hidden(): boolean {
		return this._position === -1;
	}
}

export class State {
	readonly name: string;
	readonly bodyClass: string;
	readonly desc: string;
	readonly onPages: CanvasPage[];

	public active: boolean;
	public onEnable: () => void;
	public onDisable: () => void;

	constructor(key: string, stateData: StateData, active: boolean) {
		this.name = key;
		this.bodyClass = stateData.cssClass;
		this.desc = stateData.desc;
		this.active = active;
		this.onPages = [];

		stateData.pages.forEach(page => {
			const _page = CanvasPage[page.toUpperCase()];
			if (_page !== undefined)
				this.onPages.push(_page);
		});
	}

	onChange() {
		if (this.active && this.onEnable instanceof Function) this.onEnable();
		else if (!this.active && this.onDisable instanceof Function) this.onDisable();
	}

}

export class Module {
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

export class ModuleItem {
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

	constructor(moduleItemJson?: CanvasAPI.ModuleItem) {
		if (moduleItemJson) this.update(moduleItemJson);
	}

	public static fromContentId(contentId: number): ModuleItem {
		const item = new ModuleItem();
		item._contentId = contentId;
		ModuleItem.byContentId.set(contentId, item);
		return item;
	}

	public update(moduleItemJson: CanvasAPI.ModuleItem) {
		this._id = moduleItemJson.id;
		this._name = moduleItemJson.title;
		this.moduleId = moduleItemJson.module_id;
		this._externalUrl = moduleItemJson.external_url || null;

		const typeString: string = moduleItemJson.type
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
			throw new Error("Invalid Module Item Element: " + value);
	}

	get hideElement(): JQuery { return this._hideElement; }
	set hideElement(value: JQuery) {
		if (value === null || value.length === 1)
			this._hideElement = value;
		else
			throw new Error("Invalid Module Item Element: " + value);
	}

	get fileData(): CanvasAPI.File { return this._fileData; }

}

export class Exception extends Error {
	private fatal: boolean;

	constructor(message: string, fatal?: boolean) {
		super(message);
		if (fatal === undefined) fatal = false;
		this.fatal = fatal;
	}

	get isFatal() {
		return this.fatal;
	}

}

export interface StateData {
	cssClass?: string;
	pages: string[];
	desc: string;
}

export enum ModuleItemType {
	ASSIGNMENT, SUB_HEADER, DISCUSSION, QUIZ, PAGE, FILE, EXTERNAL_URL, EXTERNAL_TOOL
}

export enum CanvasPage {
	MODULES, GRADES, HOME, USERS, GROUPS, COLLABORATIONS,
	DISCUSSION_TOPICS, EXTERNAL_TOOLS, ASSIGNMENTS
}

export const DATA = new Data();
