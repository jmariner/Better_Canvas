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
	modules = new Map<number, Module>();

	/** A map between a module item ID and a module item object. */
	moduleItems = new Map<number, ModuleItem>();

	/** A map between a state name and a state object. */
	states = new Map<string, State>();

	/** A map between a course ID and a color string. */
	courseColors = new Map<number, string>();

	/** A map between a course ID and a course tab object. */
	courseTabs = new Map<number, CustomCourseTab>();

	/** A map between a navigation tab name and a nav tab object. */
	navTabs = new Map<string, NavTab>();

	/** Whether or not the active Canvas page is GRADES or MODULES, a main page. */
	onMainPage: boolean;

	/** A simple object with properties for each global custom element on the Canvas page. */
	elements: {
		/** A reference to the 'jump to top' button. */
		jump_button: JQuery,
		/** A reference to the table of contents element. */
		toc: JQuery
	};

	/** Create an empty instance of the Data class. */
	constructor() {
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

/**
 * A class representing a module, which contains module items. This is primarily used in the
 * creation of the table of contents.
 */
export class Module {
	/** The name of this module. */
	readonly name: string;
	/** The unique ID number for this module. */
	readonly id: number;
	/** The expected item count for this module, independent of its item list. */
	readonly itemCount: number;
	/** The child items contains within this module. */
	readonly items: ModuleItem[];

	/**
	 * Create a module object instance given its data object.
	 * @param {CanvasAPI.Module} moduleData This module's data object from the Canvas API.
	 */
	constructor(moduleData: CanvasAPI.Module) {
		this.name = moduleData.name;
		this.id = moduleData.id;
		this.itemCount = moduleData.items_count;
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
	private _indentLevel: number;

	/** The assignment ID corresponding to this module item, if any. */
	private assignmentData: CanvasAPI.Assignment;

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
	 * Create an empty instance of a module item.
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
	 * @param {CanvasAPI.ModuleItem} moduleItemData The data object from the Canvas API.
	 */
	public update(moduleItemData: CanvasAPI.ModuleItem) {
		this._id = moduleItemData.id;
		this._name = moduleItemData.title;
		this.moduleId = moduleItemData.module_id;
		this._externalUrl = moduleItemData.external_url || null;
		this._indentLevel = moduleItemData.indent;

		const typeString: string = moduleItemData.type
			.replace(/([A-Z])/g, (r, s) => "_" + s)
			.replace(/^_/, "").toUpperCase();

		this._type = ModuleItemType[typeString];

		if (this._type === undefined)
			console.warn(`Unknown module item type: "${typeString}"`);

		this.checked = false;
		this.hidden = false;

		// default assignment data to null
		this.assignmentData = null;

	}

	/**
	 * Set this item's assignment data. This data is used to check if this module item is an
	 * assignment, has submissions, and has grades.
	 *
	 * @param {CanvasAPI.Assignment} data The assignment object from the Canvas API.
	 */
	public setAssignmentData(data: CanvasAPI.Assignment) { this.assignmentData = data; }

	/**
	 * The element ID for this module item, which will vary depending on the current Canvas page.
	 * Will be 'null' if not on a valid page for this module item.
	 */
	get canvasElementId(): string | null {
		switch (DATA.coursePage) {
			case CanvasPage.MODULES:
				return "context_module_item_" + this.id;
			case CanvasPage.GRADES:
				return this.isAssignment ? "submission_" + this.assignmentData.id : null;
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

	/** Whether or not this item is an assignment. */
	get isAssignment() { return this.assignmentData !== null; }

	/** Whether or not this item is a subheader */
	get isSubHeader() { return this._type === ModuleItemType.SUB_HEADER; }

	/** The parent module object for this item. */
	get module() { return DATA.modules.get(this.moduleId); }

	/** This item's full external URL, if any. */
	get externalUrl() { return this._externalUrl; }

	/** This item's corresponding content ID, if any. */
	get contentId() { return this._contentId; }

	/** The indentation level of this module item. */
	get indentLevel() { return this._indentLevel; }

	/** The Canvas API file object for this item, if any. */
	get fileData(): CanvasAPI.File { return this._fileData; }
	set fileData(data: CanvasAPI.File) { this._fileData = data; }

	/**
	 * Whether or not this item has a submission, determined by the submission's 'missing' status.
	 * Is 'null' if this item does not accept submissions (is not an assignment).
	 */
	get isSubmitted(): boolean | null {
		if (!this.isAssignment) return null;

		const sub = this.assignmentData.submission || {} as CanvasAPI.Submission;
		return sub.missing === false;
	}

	/**
	 * Whether or not this item has been graded, determined by checking the submission score.
	 * Is 'null' if this item cannot be graded (is not an assignment).
	 */
	get isGraded(): boolean | null {
		if (!this.isAssignment) return null;

		const sub = this.assignmentData.submission || {} as CanvasAPI.Submission;
		return sub.score !== null;
	}

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
 *
 * Source:
 * https://github.com/instructure/canvas-lms/blob/stable/app/controllers/
 *         context_module_items_api_controller.rb#L123
 */
export enum ModuleItemType {
	FILE, PAGE, DISCUSSION, ASSIGNMENT,
	QUIZ, SUB_HEADER, EXTERNAL_URL, EXTERNAL_TOOL
}

/**
 * The various Canvas page types, determined from the URL.
 *
 * Source:
 * https://github.com/instructure/canvas-lms/blob/stable/lib/user_content.rb#L133
 */
export enum CanvasPage {
	HOME,
	ASSIGNMENTS, ANNOUNCEMENTS, CALENDAR_EVENTS, DISCUSSION_TOPICS,
	COLLABORATIONS, FILES, CONFERENCES, QUIZZES, GROUPS,
	WIKI, PAGES, GRADES, USERS, EXTERNAL_TOOLS,
	FILE_CONTENTS, MODULES, ITEMS
}

/** Create and export an empty Data object. */
export const DATA = new Data();
