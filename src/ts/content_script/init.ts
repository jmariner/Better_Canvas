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
		await Utils.getJSON<{custom_colors: Map<string, string>}>(colorsUrl)
	).custom_colors;

	const favoritesUrl = Utils.formatUrl(V.canvas.api.urls.favorite_courses);
	const favoriteCourses =
		await Utils.getJSON<CanvasAPI.Course[]>(favoritesUrl);

	for (const courseData of favoriteCourses) {
		const color = courseColors["course_" + courseData.id];
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
		courseID: DATA.courseID
	});
	const assignments = await Utils.getJSON<CanvasAPI.Assignment[]>(assignmentsUrl);

	for (const assignmentJson of assignments) {

		let contentId: number;
		if (assignmentJson.quiz_id)
			contentId = assignmentJson.quiz_id;
		else if (assignmentJson.discussion_topic)
			contentId = assignmentJson.discussion_topic.id;
		else
			contentId = assignmentJson.id;

		let item: ModuleItem;
		if (ModuleItem.byContentId.has(contentId))
			item = ModuleItem.byContentId.get(contentId);
		else
			item = ModuleItem.fromContentId(contentId);

		item.setAssignmentId(assignmentJson.id);

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
			.map(module => {

				const moduleItemsUrl = Utils.formatUrl(V.canvas.api.urls.module_items, {
					moduleID: module.id,
					courseID: DATA.courseID,
					perPage: module.itemCount
				});

				// return Promise instead of awaiting on this so it can be used in Promise.all
				return Utils.getJSON<CanvasAPI.ModuleItem[]>(moduleItemsUrl);

			});

	const moduleItemSets: CanvasAPI.ModuleItem[][] = await Promise.all(itemSetPromises);

	for (const items of moduleItemSets) {

		const module = DATA.modules.get(items[0].module_id);

		for (const modItemJson of items) {

			let item: ModuleItem;
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
		ModuleItem.byContentId.get(file.id).setFileData(file);

}

/**
 * Gather and set all of the custom data that this extension stores in the Canvas API's custom data
 * system. This consists of, so far, a list of completed items, a list of hidden items, a list of
 * active states, and a custom order to the course's navigation tabs.
 *
 * Completed and hidden items modify the DATA.moduleItems map, active states are stored in
 * DATA.states, and custom tab positions are stores in DATA.navTabs.
 *
 * Requires either the GRADES or MODULES page.
 */
export async function customDataFlow() {

	const customDataUrl = Utils.formatUrl(V.canvas.api.urls.custom_data, {dataPath: ""});
	const customData: CanvasAPI.CustomData = (
		await Utils.getJSON<{data: CanvasAPI.CustomData}>(customDataUrl)
	).data;

	// TODO figure out what to do when custom data request returns no data at all
	if (customData === undefined) return;

	// ===== load complete / hidden assignments =====

	const complete = Utils.getOrDefault(
		customData.completed_assignments,
		DATA.courseID,
		new Array<number>()
	);
	const hidden = Utils.getOrDefault(
		customData.hidden_assignments,
		DATA.courseID,
		new Array<number>()
	);

	for (const [modItemId, modItem] of DATA.moduleItems) {
		modItem.checked = complete.includes(modItemId);
		modItem.hidden = hidden.includes(modItemId);
	}

	// ===== load active state list =====

	const activeStates: string[] = customData.active_states || [];

	// load states from config

	for (const [stateName, stateData] of Object.entries(V.state)) {
		const stateObj = new State(
			stateName,
			stateData as StateData,
			activeStates.includes(stateName)
		);
		DATA.states.set(stateName, stateObj);
	}

	// ===== load tabs positions =====

	const tabPositions: {[key: string]: number} = Utils.getOrDefault(
		customData.tab_positions,
		DATA.courseID,
		{}
	);

	for (const [tabId, navTab] of DATA.navTabs) {
		if (tabPositions[tabId] !== undefined)
			navTab.setPosition(tabPositions[tabId]);
	}

}
