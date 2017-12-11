/**
 * Various classes and objects used throughout the content script. Exports all classes listed here
 * except for the Data class, which has its global singleton instance exported.
 */
import * as CanvasAPI from "./canvas_api";

/**
 * Singleton class used for the global DATA object. Everything in this class applies only to the
 * content script.
 */
class Data {
	/** The active Canvas page. */
	coursePage: CanvasPage;

	/** The ID number of the current course, if any. */
	courseID: number | null;

	/** A map between a module ID and a module object. */
	modules: Map<number, Module>;

	/** A map between a module item ID and a module item object. */
	moduleItems: Map<number, ModuleItem>;

	/** A map between a state name and a state object. */
	states: Map<string, State>;

	/** A map between a course ID and a course tab object. */
	courseTabs: Map<number, CustomCourseTab>;

	/** A map between a navigation tab name and a nav tab object. */
	navTabs: Map<string, NavTab>;

	/** Whether or not the active Canvas page is GRADES or MODULES, a main page. */
	onMainPage: boolean;

	/** A simple object with properties for each global custom element on the Canvas page. */
	elements: {
		/** A reference to the 'jump to top' button. */
		jump_button: JQuery,
		/** A reference to the table of contents element. */
		toc: JQuery
	};

	/**
	 * Create an empty instance of the Data class.
	 */
	constructor() {
		this.modules = new Map();
		this.moduleItems = new Map();
		this.states = new Map();
		this.courseTabs = new Map();
		this.navTabs = new Map();

		this.elements = {jump_button: null, toc: null};

	}
}

/**
 * A class representing a custom course tab that is inserted into the sidebar. An instance of this
 * is created for every favorited course.
 */
export class CustomCourseTab {
	/** The ID number for this course. */
	readonly id: number;

	/** The long name for this course. */
	readonly name: string;

	/** The code for this course. For example: "CIS215". */
	readonly code: string;

	/** The color for this course tab. Can be any color string. */
	readonly color: string;

	/**
	 * Create an custom course tab instance given its color and data object.
	 * @param {CanvasAPI.Course} courseData The data object from the Canvas API for this course.
	 * @param {string}           color      The color to give this tab.
	 */
	constructor(courseData: CanvasAPI.Course, color: string) {
		this.id = courseData.id;
		this.name = courseData.name;
		this.code = courseData.course_code;
		this.color = color;
	}

}

/**
 * A class representing a navigation tab on a Canvas course page. This is used to give custom
 * positions to these tabs.
 */
export class NavTab {
	/** The ID for this tab, which is its name string. */
	readonly id: string;

	/** This tab's initial position, before applying any custom position. */
	private readonly initPosition: number;

	/** This tab's custom position, if any. Defaults to 'null' and set to -1 for a hidden tab. */
	private _position: number;

	/**
	 * Create an instance of a navigation tab object given its data object.
	 * @param {CanvasAPI.Tab} tabData The data object for this tab from the Canvas API.
	 */
	constructor(tabData: CanvasAPI.Tab) {
		this.id = tabData.id;
		this._position = null;
		this.initPosition = tabData.position;
	}

	/**
	 * Set this tab's custom position
	 * @param {number} pos The new position to set.
	 */
	public setPosition(pos: number) {
		this._position = pos;
	}

	/**
	 * Check if this tab has a custom position set.
	 * @returns {boolean} Whether or not the custom position is not null.
	 */
	get hasCustomPosition(): boolean {
		return this._position != null;
	}

	/**
	 * The current position for this tab: either its default position or its custom one.
	 * @returns {number} The tab's position index, or 'null' if this tab is hidden.
	 */
	get position(): number {
		return this._position == null ? this.initPosition :
			this._position === -1 ? null : this._position;
	}

	/**
	 * Check if this tab is hidden.
	 * @returns {boolean} Whehter or not this tab's custom position is set to -1.
	 */
	get hidden(): boolean {
		return this._position === -1;
	}
}

/**
 * A class representing a boolean state on the Canvas page. Each state can include a CSS class to be
 * set on the body element, a list of Canvas pages to work for, and functions to be called when the
 * state changes.
 */
export class State {
	/** The identifying name for this state. */
	readonly name: string;

	/** The CSS class to toggle on the body element of the page, if any. */
	readonly bodyClass: string;

	/** A brief description of this state. */
	readonly desc: string;

	/** A list of possible active pages for this state to function. */
	readonly onPages: CanvasPage[];

	/** Whether or not this state is currently active. */
	public active: boolean;

	/** Function called when this state is enabled. */
	public onEnable: () => void;

	/** Function called when this state is disabled. */
	public onDisable: () => void;

	/**
	 * Create a State instance with an initial active value.
	 * @param {string}    key       The identifying name for this state.
	 * @param {StateData} stateData The data for this state.
	 * @param {boolean}   active    The default active value for this state.
	 */
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

	/**
	 * Run the onEnable or onDisable functions depending on the current active value.
	 */
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

/**
 * A class representing a module item, including its checked status, hidden status, and other custom
 * attributes.
 */
export class ModuleItem {
	// Private properties prefixed with underscore are documented at their getter functions below.
	private _id: number;
	private _name: string;
	private _type: ModuleItemType;
	private _contentId: number;
	private _fileData: CanvasAPI.File;
	private _externalUrl: string;
	private _checkboxElement: JQuery;
	private _hideElement: JQuery;

	/** The assignment ID corresponding to this module item, if any. */
	private assignmentId: number;

	/** The ID of the parent module to this module item. */
	private moduleId: number;

	/** Whether or not this item has been checked as completed. */
	public checked: boolean;

	/** Whether or not this item has been marked as hidden. */
	public hidden: boolean;

	/**
	 * A static map used to ensure no race condition issues when querying for assignments and module
	 * items concurrently. Maps an assignment's content ID to its module item instance.
	 */
	public static readonly byContentId = new Map<number, ModuleItem>();

	/**
	 * Create an instance of a module item from its data object.
	 */
	constructor() {} // tslint:disable-line: no-empty

	/**
	 * Create a ModuleItem instance and place it in the byContentId static map.
	 *
	 * @param {number} contentId The content ID for this item.
	 * @returns {ModuleItem} The created instance.
	 */
	public static fromContentId(contentId: number): ModuleItem {
		const item = new ModuleItem();
		item._contentId = contentId;
		ModuleItem.byContentId.set(contentId, item);
		return item;
	}

	/**
	 * Update this item's fields from its data.
	 * @param {CanvasAPI.ModuleItem} moduleItemJson The data object from the Canvas API.
	 */
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

	/**
	 * Set this item's assignment ID. This is used to prevent race condition issues when
	 * concurrently querying for module items and assignments.
	 *
	 * @param {number} id The ID to set.
	 */
	public setAssignmentId(id: number) { this.assignmentId = id; }

	/**
	 * The element ID for this module item, which will vary depending on the current Canvas page.
	 */
	get canvasElementId() {
		switch (DATA.coursePage) {
			case CanvasPage.MODULES:
				return "context_module_item_" + this.id; // li element
			case CanvasPage.GRADES:
				return "submission_" + this.assignmentId; // tr element
			default:
				return null;
		}
	}

	/** The module ID for this item. */
	get id() { return this._id; }

	/** The full name of this item. */
	get name() { return this._name;	}

	/** The type of this item. */
	get type(): ModuleItemType { return this._type; }

	/** Whether or not this item is graded. */
	get isGraded() { return this.assignmentId !== null; }

	/** Whether or not this item is a subheader */
	get isSubHeader() { return this._type === ModuleItemType.SUB_HEADER; }

	/** The parent module object for this item. */
	get module() { return DATA.modules.get(this.moduleId); }

	/** This item's full external URL, if any. */
	get externalUrl() { return this._externalUrl; }

	/** This item's corresponding content ID, if any. */
	get contentId() { return this._contentId; }

	/** The checkbox element that was created for this item. */
	get checkboxElement(): JQuery { return this._checkboxElement; }
	set checkboxElement(value: JQuery) {
		if (value === null || value.length === 1)
			this._checkboxElement = value;
		else
			throw new Error("Invalid Module Item Element: " + value);
	}

	/** The hide button element that was created for this item. */
	get hideElement(): JQuery { return this._hideElement; }
	set hideElement(value: JQuery) {
		if (value === null || value.length === 1)
			this._hideElement = value;
		else
			throw new Error("Invalid Module Item Element: " + value);
	}

	/** The Canvas API file object for this item, if any. */
	get fileData(): CanvasAPI.File { return this._fileData; }
	set fileData(data: CanvasAPI.File) { this._fileData = data; }

}

/**
 * A custom error type that can be marked as non-fatal.
 */
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

/**
 * The data format used for states. This mirrors the format in the Vars module.
 */
export interface StateData {
	cssClass?: string;
	pages: string[];
	desc: string;
}

/**
 * The types of module items that are available.
 */
export enum ModuleItemType {
	ASSIGNMENT, SUB_HEADER, DISCUSSION, QUIZ, PAGE, FILE, EXTERNAL_URL, EXTERNAL_TOOL
}

/**
 * The various Canvas page types, determined from the URL.
 */
export enum CanvasPage {
	MODULES, GRADES, HOME, USERS, GROUPS, COLLABORATIONS,
	DISCUSSION_TOPICS, EXTERNAL_TOOLS, ASSIGNMENTS
}

/** Create and export an empty Data object. */
export const DATA = new Data();
