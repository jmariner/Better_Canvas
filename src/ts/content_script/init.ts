/**
 * Set of functions called in a particular order and under certain conditions when the extension
 * first loads. All of these functions send requests to the Canvas API for particular sets of data.
 *
 * Exports all functions for use in the Entry module.
 */
import * as CanvasAPI from "../canvas_api";
import * as Utils from "../utils";
import { V } from "../vars";
import { DATA, Module, ModuleItem, ModuleItemType, NavTab,
	CustomCourseTab, State, StateData } from "../objects";

/**
 * Gather and set data required to set up the custom course tab system. This includes both the
 * user's custom colors and their favorited courses.
 *
 * All data gathered here is placed in the DATA.courseTabs map.
 * This has no page requirement and should run globally on Canvas.
 */
export async function courseTabFlow() {

	const colorsUrl = Utils.formatUrl(V.canvas.api.urls.custom_colors);
	const courseColors = (
		await Utils.getJSON<{custom_colors: {[course: string]: string}}>(colorsUrl)
	).custom_colors;

	for (const [key, color] of Object.entries(courseColors))
		DATA.courseColors.set(Number(key.replace("course_", "")), color);

	const favoritesUrl = Utils.formatUrl(V.canvas.api.urls.favorite_courses);
	const favoriteCourses =
		await Utils.getJSON<CanvasAPI.Course[]>(favoritesUrl);

	for (const courseData of favoriteCourses) {
		const color = DATA.courseColors.get(courseData.id);
		DATA.courseTabs.set(courseData.id, new CustomCourseTab(courseData, color));
	}

}

/**
 * Gather and set the data regarding the current course's navigation tabs.
 *
 * The data gathered here is placed in the DATA.navTabs map.
 * Requires that the user be on any Canvas course page.
 */
export async function navTabFlow() {

	const navTabUrl = Utils.formatUrl(V.canvas.api.urls.navigation_tabs, {
		perPage: 25,
		courseID: DATA.courseID
	});
	const navTabs = await Utils.getJSON<CanvasAPI.Tab[]>(navTabUrl);

	for (const tab of navTabs)
		DATA.navTabs.set(tab.id, new NavTab(tab));

}

/**
 * Gather and set information about this course's assignments. Note that assignments are a subset of
 * all module items. This runs at the same time as the module item flow, so it takes care to
 * determine if the assignment's corresponding module item has already been set.
 *
 * Sets the data in the ModuleItem class so that the module item flow can look up which items have
 * been set already.
 *
 * Requires that the user be on either the GRADES or MODULES page of Canvas since those are the
 * ones where assingments are listed.
 */
export async function assignmentFlow() {

	// hopefully 1000 is enough to get all in one go
	const assignmentsUrl = Utils.formatUrl(V.canvas.api.urls.assignments, {
		perPage: 1000,
		courseID: DATA.courseID,
		include: ["submission"]
	});

	const assignments = await Utils.getJSON<CanvasAPI.Assignment[]>(assignmentsUrl);

	for (const assignmentData of assignments) {

		let contentId: number;
		if (assignmentData.quiz_id)
			contentId = assignmentData.quiz_id;
		else if (assignmentData.discussion_topic)
			contentId = assignmentData.discussion_topic.id;
		else
			contentId = assignmentData.id;

		let item: ModuleItem;
		if (ModuleItem.byContentId.has(contentId))
			item = ModuleItem.byContentId.get(contentId);
		else
			item = ModuleItem.fromContentId(contentId);

		item.setAssignmentData(assignmentData);

	}
}

/**
 * Gather and set information about this course's module items. This includes requesting the
 * course's modules and then requesting the items from each module separately. Additionally, module
 * items that are of the FILE type require further requests to get that file's data.
 *
 * Sets data in both DATA.modules and DATA.moduleItems maps.
 * Requires either the GRADES or MODULES page.
 */
export async function moduleItemFlow() {

	// ===== modules =====

	const modulesUrl = Utils.formatUrl(V.canvas.api.urls.modules, {
		perPage: 25,
		courseID: DATA.courseID
	});
	const modules = await Utils.getJSON<CanvasAPI.Module[]>(modulesUrl);
	for (const moduleData of modules) {
		DATA.modules.set(moduleData.id, new Module(moduleData));
	}

	// ===== module items =====

	const moduleIds = Array.from(DATA.modules.keys());
	const itemSetPromises: Array<Promise<CanvasAPI.ModuleItem[]>> =
		moduleIds.map(modId => DATA.modules.get(modId))
			.filter(mod => mod.itemCount > 0)
			.map(moduleObj => {

				const moduleItemsUrl = Utils.formatUrl(V.canvas.api.urls.module_items, {
					moduleID: moduleObj.id,
					courseID: DATA.courseID,
					perPage: moduleObj.itemCount
				});

				// return Promise instead of awaiting on this so it can be used in Promise.all
				return Utils.getJSON<CanvasAPI.ModuleItem[]>(moduleItemsUrl);

			});

	const moduleItemSets: CanvasAPI.ModuleItem[][] = await Promise.all(itemSetPromises);

	/*
	Canvas can sometimes include duplicate content IDs for non-assignment items. Unsure if this is
	intentional on Canvas's side, but precautions are taken to allow for this: we avoid getting
	existing items via fromContentId() if we've seen it before in the module item flow. This way,
	repeated content IDs do not affect items that were not added from the assignment flow.

	This issue was shown to exist on a set of ExternalTool-type items in the same module and all
	pointing to a page on the same domain.
	TODO: examine Canvas source to see if this is intended; if not, consider filing an issue.
	*/

	const visitedContentIds = new Array<number>();

	for (const items of moduleItemSets) {

		const moduleObj = DATA.modules.get(items[0].module_id);

		for (const modItemData of items) {

			let item: ModuleItem;
			const contentId = modItemData.content_id;

			if (ModuleItem.byContentId.has(contentId)) {
				if (visitedContentIds.includes(contentId))
					item = new ModuleItem();
				else
					item = ModuleItem.byContentId.get(contentId);
			}
			else if (contentId !== undefined) {
				item = ModuleItem.fromContentId(contentId);
				visitedContentIds.push(contentId);
			}
			else {
				item = new ModuleItem();
			}

			item.update(modItemData);

			DATA.moduleItems.set(modItemData.id, item);
			moduleObj.items.push(item);
		}

	}

	// ===== file module items =====

	const fileItems = Array.from(DATA.moduleItems.values())
		.filter(item => item.type === ModuleItemType.FILE);

	const filePromises: Array<Promise<CanvasAPI.File>> = fileItems.map(item => {
		const fileDataUrl = Utils.formatUrl(V.canvas.api.urls.file_direct, {
			fileID: item.contentId,
			courseID: DATA.courseID
		});
		// return promise for Promise.all
		return Utils.getJSON<CanvasAPI.File>(fileDataUrl);
	});

	const files: CanvasAPI.File[] = await Promise.all(filePromises);

	for (const file of files)
		ModuleItem.byContentId.get(file.id).fileData = file;

}

/**
 * Gather the lists of completed assignments and hidden assignments from the Canvas API custom data
 * storage system.
 *
 * Edits the values in the DATA.moduleItems map.
 * Requires the GRADES or MODULES page.
 */
export async function customItemDataFlow() {

	const [completedItems, hiddenItems] = await Promise.all([
		Utils.getCustomData<number[]>(V.canvas.api.data_urls.completed_assignments, DATA.courseID),
		Utils.getCustomData<number[]>(V.canvas.api.data_urls.hidden_assignments, DATA.courseID)
	]);

	for (const [modItemId, modItem] of DATA.moduleItems) {
		modItem.checked = completedItems !== null && completedItems.includes(modItemId);
		modItem.hidden = hiddenItems !== null && hiddenItems.includes(modItemId);
	}

}

/**
 * Gather the list of active states from the Canvas API custom data storage system.
 *
 * Stores state data in the DATA.states map.
 * Requires the MODULES page.
 */
export async function customStatesFlow() {

	let activeStates = await Utils.getCustomData<string[]>(V.canvas.api.data_urls.active_states);
	if (activeStates === null)
		activeStates = [];

	// load states from config

	for (const [stateName, stateData] of Object.entries(V.state)) {
		const stateObj = new State(
			stateName,
			stateData as StateData,
			activeStates.includes(stateName)
		);
		DATA.states.set(stateName, stateObj);
	}

}

/**
 * Gather data regarding the custom position of the page's navigation tabs from the Canvas API
 * custom data storage system.
 *
 * Edits the positions of the values in the DATA.navTabs map.
 * Requires any course page.
 */
export async function customTabPositionsFlow() {

	const tabPositions =
		await Utils.getCustomData<{[tabId: string]: number}>(
			V.canvas.api.data_urls.tab_positions,
			DATA.courseID
		);

	if (tabPositions === null) return;

	for (const [tabId, navTab] of DATA.navTabs) {
		if (tabPositions[tabId] !== undefined)
			navTab.setPosition(tabPositions[tabId]);
	}
}
