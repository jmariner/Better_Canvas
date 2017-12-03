import $ from "../lib/jquery";
import "../scss/style.scss";
import MessageSender = chrome.runtime.MessageSender;

import * as CanvasAPI from "./canvas_api";
import { V } from "./vars";
import * as Utils from "./utils";
import * as Message from "./message";
import { DATA, PAGE, Exception, CustomCourseTab, NavTab,
	State, Module, ModuleItem, CanvasPage, ModuleItemType } from "./objects";

class Requests {

	// =======================================
	//           main initialization
	// =======================================
	static async start() {
		DATA.extensionId = chrome.runtime.id;
		DATA.name = chrome.runtime.getManifest().name;

		for (const logType of "log debug info warn error dir".split(" ")) {
			const orig = console[logType];
			console[logType] = orig.bind(console, `[${DATA.name}] [${logType.toUpperCase()}]`);
		}

		// load course id and what page user is on within that course
		const urlMatch = /courses\/(\d+)(?:\/(\w+))?.*/.exec(document.location.pathname);
		const onCoursePage = urlMatch !== null;
		DATA.coursePage = onCoursePage ? CanvasPage[(urlMatch[2] || "home").toUpperCase()] : null;
		DATA.courseID = onCoursePage ? Number(urlMatch[1]) : null;
		DATA.onMainPage = [CanvasPage.MODULES, CanvasPage.GRADES].includes(DATA.coursePage);

		if (onCoursePage)
			console.debug(`On course #${DATA.courseID} page, at ${CanvasPage[DATA.coursePage]}`);

		// begin async operations

		const initStart = performance.now();

		// try to load access token

		try {
			await Utils.loadToken();
		}
		catch (e) {
			Utils.accessTokenPrompt();
			throw new Exception("Missing access token; must refresh", true);
		}

		// run all async tasks

		const promises = [Requests.courseTabFlow()];

		if (DATA.coursePage !== null)
			promises.push(Requests.navTabFlow());

		if (DATA.onMainPage) {
			promises.push(Requests.assignmentFlow());
			promises.push(Requests.moduleItemFlow());
		}

		await Promise.all(promises);

		// run custom data flow after everything
		if (DATA.onMainPage) await Requests.customDataFlow();

		return performance.now() - initStart;
	}

	// =======================================
	//               course tabs
	// =======================================
	private static async courseTabFlow() {

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

	// =======================================
	//            navigation tabs
	//  requires: course page
	// =======================================
	private static async navTabFlow() {

		const navTabUrl = Utils.formatUrl(V.canvas.api.urls.navigation_tabs, {
			perPage: 25,
			courseID: DATA.courseID
		});
		const navTabs = await Utils.getJSON<CanvasAPI.Tab[]>(navTabUrl);

		for (const tab of navTabs)
			DATA.navTabs.set(tab.id, new NavTab(tab));

	}

	// =======================================
	//              assignments
	//  requires: modules or grades page
	// =======================================
	private static async assignmentFlow() {

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

	// =======================================
	//       modules, items, and files
	//  requires: modules or grades page
	// =======================================
	private static async moduleItemFlow() {

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

	// =======================================
	//              custom data
	//  requires: modules or grades page
	// =======================================
	private static async customDataFlow() {

		const customDataUrl = Utils.formatUrl(V.canvas.api.urls.custom_data, {dataPath: ""});
		const customData: CanvasAPI.CustomData = (
			await Utils.getJSON<{data: CanvasAPI.CustomData}>(customDataUrl)
		).data;

		// this happens when there was an issue getting the data or there was no data at all
		// TODO figure out what to do here
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
		$.each(V.state, (name, stateData) => {
			const stateObj = new State(name, stateData, activeStates.includes(name));
			DATA.states.set(name, stateObj);
		});

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

	// update the checkboxes for this course
	static async updateCheckboxes() {
		const checkboxUrl = Utils.formatUrl(V.canvas.api.urls.custom_data, {
			dataPath: ["", V.canvas.api.data_urls.completed_assignments, DATA.courseID].join("/")
		});
		const checked = (
			await Utils.getJSON<{data: number[]}>(checkboxUrl)
		).data;

		for (const [modItemId, modItem] of DATA.moduleItems)
			modItem.checked = checked.includes(modItemId);
	}

	// update hide status for items for this course
	static async updateHiddenItems() {
		const checkboxUrl = Utils.formatUrl(V.canvas.api.urls.custom_data, {
			dataPath: ["", V.canvas.api.data_urls.hidden_assignments, DATA.courseID].join("/")
		});
		const hidden = (
			await Utils.getJSON<{data: number[]}>(checkboxUrl)
		).data;

		for (const [modItemId, modItem] of DATA.moduleItems)
			modItem.hidden = hidden.includes(modItemId);
	}

}

Requests.start()
.catch((err: Error) => {
	// Exceptions are intentionally throw by my code
	if (err instanceof Exception) {
		if (err.isFatal) throw err;
		else console.warn("Exception in init:", err);
	}
	else { // anything else is unknown and is a problem
		throw new Error("Unknown error in init: " + err);
	}
})
.then((totalDuration: number) => {
	console.debug(`Initialization completed in ${Math.round(totalDuration)}ms`);
	Main.initPage();
	chrome.runtime.onMessage.addListener(Main.onMessage);
});

class Main {

	static initPage() {

		PAGE.initialize();

		$(window).scroll(UI.updateScrollPosition);
		$(document).ready(UI.updateScrollPosition);

		// =============== misc global init stuff ============================

		// removing all repeated whitespace in class attributes
		PAGE.body.find("[class]")
			.attr("class", (i, oldClass) => (oldClass.match(/\S+/g) || []).join(" "));

		// make the course button take you to "all courses" and change the text to say so
		const origCourseNav = PAGE.sidebar.find("#global_nav_courses_link");
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

		// === insert individual course links after the all courses link ===

		for (const [tabID, courseTab] of DATA.courseTabs) {
			newCourseNav.after(
				Utils.format(V.element.course_link, {
					tabColor: courseTab.color,
					tabID,
					name: courseTab.name,
					code: courseTab.code
				})
			);
		}

		// === place "jump to top" button ===

		DATA.elements.jump_button =
			$(V.element.jump_button)
			.find("i")
			.click(() => {
				if (PAGE.scrollingElement.prop("scrollTop") > 0)
					PAGE.scrollingElement.animate({scrollTop: 0}, V.ui.scroll_time);
			})
			.end()
			.appendTo(PAGE.main);

		// ==========================================================
		//                   course page cutoff
		//      everything below this point is for course pages
		// ==========================================================
		if (DATA.coursePage === null) return;

		// ==== clear the active menu tab since we're using custom tabs ====

		PAGE.sidebar.find("li").removeClass("ic-app-header__menu-list-item--active");

		// === load initial states ===

		for (const [, state] of DATA.states) {
			if (state.active && state.onPages.includes(DATA.coursePage))
				PAGE.body.addClass(state.bodyClass);
		}

		// ==== apply course color to brand colors ====

		if (DATA.courseTabs.has(DATA.courseID)) {
			const color = DATA.courseTabs.get(DATA.courseID).color;
			document.documentElement.style.setProperty("--ic-brand-primary", color);
		}

		// ==== clear empty nav tabs ===

		PAGE.left.find(V.canvas.selector.nav_tabs).find("li:empty").remove();

		// ==== apply the custom nav tab positions ===

		Array.from(DATA.navTabs.values()).filter(tab => tab.hasCustomPosition)
			.sort((tabA, tabB) => tabA.position - tabB.position)
			.forEach(UI.updateNavTabPosition);

		// ==========================================================
		//                    main page cutoff
		//  everything below this is only for modules/grades pages
		// ==========================================================
		if (!DATA.onMainPage) return;

		// === place checkboxes & hide buttons ===

		for (const [itemId, item] of DATA.moduleItems) {

			const mainEl = PAGE.id(item.canvasElementId);
			let parentEl: JQuery;
			let hasCheckbox: boolean;
			let hasHideButton: boolean;

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
					$(Utils.format(V.element.checkbox, {item_id: itemId})).appendTo(parentEl);

				UI.updateCheckbox(item);
				item.checkboxElement.show();
			}
			if (hasHideButton) {
				item.hideElement =
					$(Utils.format(V.element.hide_button, {item_id: itemId})).appendTo(parentEl);

				// this function is async, but with second argument 'true', it updates instantly
				UI.updateItemHide(item, true);
				item.hideElement.show();
			}

		}

		if (DATA.coursePage === CanvasPage.GRADES) {

			PAGE.grades
			// fix grade checkboxes since they're in the table
				.find("td[colspan='5']")
					.attr("colspan", 6).end()
				.find("> thead > tr")
					.prepend($("<th>")
						.attr("scope", "col")
						.append("<i class='icon-check'></i>")
					).end()
				.find("tr.student_assignment")
					.prepend(function() {
						return $(this).has("td:first-child").length === 0 ?
							$("<td>").addClass(V.cssClass.checkbox_td) : undefined;
					}).end()
			// also improve spacing since some things are normally cut off
				.find("tbody").find("tr.group_total, tr.final_grade")
				.find("td.points_possible")
					.attr("colspan", "3").css("text-align", "center").end()
				.find("td.details, td.status").remove();
		}

		// === add change event for checkboxes ===

		PAGE.main.on("change", `.${V.cssClass.checkbox_parent} > input`, async function() {
			await Main.onCheckboxChange(this as HTMLInputElement);
		});

		// =============================================================
		//                     modules page cutoff
		//        everything below here is only on the modules page
		// =============================================================
		if (DATA.coursePage !== CanvasPage.MODULES) return;

		// === clean up empty modules ===
		PAGE.main.find(V.canvas.selector.module_items)
			.filter((i, el) => !el.innerHTML.trim().length)
			.html("");

		// === setup and apply custom indents ===
		// TODO this could be better

		const disabledIndentState = DATA.states.get("disable_indent_override");
		const disabledIndent = disabledIndentState.active;

		disabledIndentState.onEnable = () => {
			PAGE.main.find(V.canvas.selector.module_item).each(function() {
				[0,1,2,3,4,5].forEach(level => $(this).removeClass("indent_" + level));
				const defLevel = $(this).attr(V.dataAttr.def_indent);
				$(this).addClass("indent_" + defLevel);
			});
		};

		disabledIndentState.onDisable = () => {
			[0,1,2,3,4,5].forEach(level =>
				PAGE.main.find(V.canvas.selector.module_item
			).removeClass("indent_" + level));

			PAGE.main.find(V.canvas.selector.subheader)
				.addClass("indent_" + V.ui.subheader_indent);

			PAGE.main.find(V.canvas.selector.not_subheader)
				.addClass("indent_" + V.ui.main_indent);
		};

		PAGE.main.find(V.canvas.selector.module_item).each(function() {
			const defIndent =
				[0,1,2,3,4,5].filter(level => $(this).hasClass("indent_" + level))[0];
			$(this).attr(V.dataAttr.def_indent, defIndent);
			if (!disabledIndent)
				$(this).removeClass("indent_" + defIndent);
		});

		if (!disabledIndent) {
			PAGE.main.find(V.canvas.selector.subheader).addClass("indent_" + V.ui.subheader_indent);
			PAGE.main.find(V.canvas.selector.not_subheader).addClass("indent_" + V.ui.main_indent);
		}

		// === place and populate the table of contents ===

		const toc = $(V.element.toc);
		const ul = toc.find("ul");

		for (const [modId, mod] of DATA.modules) {

			const formatted = Utils.format(
				V.element.toc_item,
				{item_name: mod.name, item_id: modId}
			);
			$(formatted)
				.find("a")
				.click(e => {
					const moduleEl = PAGE.id("context_module_" + modId);
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

		// === add click event for hide buttons ===

		PAGE.main.on("click", `.${V.cssClass.hide_button} > i`, async function() {
			await Main.onHideButtonClick($(this));
		});

		// === add buttons to FILE and EXTERNAL_URL items ===

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

				PAGE.id(item.canvasElementId).find("a.external_url_link.title")
					.attr("href", function() { return $(this).attr("data-item-href"); })
					.removeAttr("target rel")
					.removeClass("external")
					.addClass("ig-title")
					.find(".ui-icon").remove();
			}
		}

		PAGE.cls(V.cssClass.download)
			.add(PAGE.cls(V.cssClass.external_url))
			.show();

	} // end initPage

	static async setState(stateName: string, state: boolean) {
		if (!DATA.states.has(stateName)) return;

		const stateObj = DATA.states.get(stateName);

		if (!stateObj.onPages.includes(DATA.coursePage)) return;

		if (stateObj.bodyClass)
			PAGE.body.toggleClass(stateObj.bodyClass, state);

		stateObj.active = state;
		stateObj.onChange(state);

		const url = Utils.formatUrl(V.canvas.api.urls.custom_data, {
			dataPath: "/" + V.canvas.api.data_urls.active_states
		});
		return Utils.editDataArray(url, state, [stateName]);
	}

	static async setNavTabPosition(tab: NavTab, position: number) {

		const url = Utils.formatUrl(V.canvas.api.urls.custom_data, {
			dataPath: ["", V.canvas.api.data_urls.tab_positions, DATA.courseID, tab.id].join("/")
		});

		const success = await Utils.putData(url, position);

		if (success) {
			tab.setPosition(position);
			UI.updateNavTabPosition(tab);
		}
		else {
			throw new Error("Tab position update failed.");
		}
	}

	// element is the <input>
	static async onCheckboxChange(el: HTMLInputElement) {
		const id = Number($(el).attr(V.dataAttr.mod_item_id));
		const item = DATA.moduleItems.get(id);
		const status = el.checked;
		const oldTitle = el.title;

		// reset back to previous state to allow for validation
		el.checked = !status;

		// before updating "item", check if it's already the same. if so, we have a desync
		if (status === item.checked) {
			console.error("Checkbox desync at item", item);
			return;
		}

		// TODO create a better method for waiting-disable for checkbox and hide button
		// - have a different class applied that sets the cursor to waiting mode and dims the button

		// disable until we confirm we can update the data
		el.disabled = true;
		el.title = V.tooltip.waiting;

		const url = Utils.formatUrl(V.canvas.api.urls.custom_data, {
			dataPath: ["", V.canvas.api.data_urls.completed_assignments, DATA.courseID].join("/")
		});

		const success = await Utils.editDataArray(url, status, [id]);

		el.disabled = false;
		el.title = oldTitle;

		if (success) {
			item.checked = status;
			UI.updateCheckbox(item);

			await chrome.runtime.sendMessage(new Message.SyncCheckboxes(id, DATA.courseID));

			console.debug(`Item ID ${id} (${item.name.substr(0, 25)}...) ` +
				`has been ${el.checked ? "" : "un"}checked`);
		}

	}

	// element is <i>
	static async onHideButtonClick(el: JQuery) {
		const id = Number(el.attr(V.dataAttr.mod_item_id));
		const item = DATA.moduleItems.get(id);

		// cancel hiding if the item is graded or has hiding manually disabled for any other reason
		if (item.isGraded || item.hideElement.hasClass(V.cssClass.hide_disabled)) return;

		// disable until updating complete. this is undone by updateHideButton later
		item.hideElement
			.addClass(V.cssClass.hide_disabled)
			.find("i")
			.attr("title", V.tooltip.waiting);

		const newState = !item.hidden;

		const url = Utils.formatUrl(V.canvas.api.urls.custom_data, {
			dataPath: ["", V.canvas.api.data_urls.hidden_assignments, DATA.courseID].join("/")
		});

		const success = await Utils.editDataArray(url, newState, [id]);

		if (success) {
			item.hidden = newState;
			await UI.updateItemHide(item);

			await chrome.runtime.sendMessage(new Message.SyncHidden(id, DATA.courseID));

			console.debug(`Item ID ${id} (${item.name.substr(0, 25)}...) ` +
				`has been ${item.hidden ? "" : "un"}hidden`);
		}
	}

	// this should return 'true' when 'respond' will be called with async
	static onMessage(msg: Message.Base, src: MessageSender, respond: (x?) => void) {

		if (src.id !== DATA.extensionId) return;

		let resp: any = null;

		const unchecked = Array.from(DATA.moduleItems.values())
			.filter(i => !i.checked && !i.hidden && !i.isSubHeader);

		if (msg.type === Message.Type.PING) {
			resp = {pong: $.now()};
		}
		else if (msg.type === Message.Type.COUNT_UNCHECKED) {
			resp = {count: unchecked.length};
		}
		else if (msg.type === Message.Type.JUMP_TO_FIRST_UNCHECKED) {
			const firstUnchecked = unchecked
				.map(i => PAGE.id(i.canvasElementId))[0];
			UI.scrollToElement(firstUnchecked);
			resp = undefined;
		}
		else if (msg.type === Message.Type.UPDATE_CHECKBOX) {

			const data = msg as Message.UpdateCheckbox;

			(async function() {
				await Requests.updateCheckboxes();
				await UI.updateCheckbox(DATA.moduleItems.get(data.itemId));
			})().then(respond);

			return true;
		}
		else if (msg.type === Message.Type.UPDATE_HIDDEN) {

			const data = msg as Message.UpdateHidden;

			(async function() {
				await Requests.updateHiddenItems();
				await UI.updateItemHide(DATA.moduleItems.get(data.itemId));
			})().then(respond);

			return true;
		}
		else if (msg.type === Message.Type.STATE_GET) {
			const data = msg as Message.GetState;
			resp = DATA.states.get(data.stateName);
		}
		else if (msg.type === Message.Type.STATE_SET) {
			const data = msg as Message.SetState;
			Main.setState(data.stateName, data.newState)
				.then(success => respond(success));

			return true;
		}
		else {
			console.warn("Unknown message in content script:", msg);
		}

		respond(resp);
	}

}

class UI {

	static updateCheckbox(item: ModuleItem) {
		if (item.checkboxElement === null) throw new Error("No checkbox to update");
		item.checkboxElement
			.find("input")
			.prop("checked", item.checked)
			.attr("title", item.checked ? V.tooltip.mark_incomplete : V.tooltip.mark_complete)
			.closest(V.canvas.selector.module_item)
			.toggleClass(V.cssClass.checkbox_checked, item.checked);

		UI.updateModule(item.module);
	}

	static async updateItemHide(item: ModuleItem, instant?: boolean) {
		if (item.hideElement === null) throw new Error("No hide button to update");

		const modItemEl = item.hideElement.closest(V.canvas.selector.module_item);
		const iEl = item.hideElement.find("i");

		// update hidden class on the <i> and <li>
		iEl.add(modItemEl).toggleClass(V.cssClass.item_hidden, item.hidden);

		if (!instant) await Utils.wait(V.ui.fade_time);

		// update disable status and title, undoing waiting-disable
		item.hideElement.toggleClass(V.cssClass.hide_disabled, item.isGraded);
		iEl.attr("title",
			item.isGraded ? V.tooltip.hide_disabled :
			item.hidden ? V.tooltip.unhide :
			V.tooltip.hide
		);

		UI.updateModule(item.module);

	}

	static updateModule(module: Module) {

		if (DATA.elements.toc !== null) {
			const allItems = module.items.filter(i => !i.isSubHeader && !i.hidden);
			const totalItems = allItems.length;

			let checkedItems: number;
			let percent: number;

			if (totalItems > 0) {
				checkedItems = allItems.filter(i => i.checked).length;
				percent = Math.round(checkedItems / totalItems * 100);
			}
			else {
				checkedItems = 0;
				percent = 0;
			}

			const backgroundImage = Utils.format(V.misc.toc_background, {percent});

			DATA.elements.toc
				.find(`[${V.dataAttr.toc_module_id}='${module.id}']`)
				.attr(V.dataAttr.toc_total, totalItems)
				.attr(V.dataAttr.toc_checked_count, checkedItems)
				.attr(V.dataAttr.toc_percentage, percent)
				.closest("li")
				.toggleClass(V.cssClass.item_hidden, totalItems === 0)
				.css({backgroundImage});
		}

		// if no visible items in this module, hide the entire module
		const noItems = module.items.filter(i => !i.isSubHeader && !i.hidden).length === 0;
		PAGE.id("context_module_" + module.id).toggleClass(V.cssClass.item_hidden, noItems);

	}

	static updateNavTabPosition(tab: NavTab) {

		if (!tab.hasCustomPosition) throw new Error("Tab has no custom position");

		const tabList = PAGE.left.find(V.canvas.selector.nav_tabs);
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

	static scrollToElement(element: JQuery) {
		const elRect = element[0].getBoundingClientRect();
		const cliHeight = document.documentElement.clientHeight;
		const topRatio = V.ui.top_inside_ratio;

		// if element is in viewport, just flash it
		/*	in viewport if...
		 height is shorter than viewport and both top and bottom are inside OR
		 height is taller than viewport and top is within top part of page
		 */
		if ((elRect.height < cliHeight && elRect.top >= 0 && elRect.bottom < cliHeight) ||
			(elRect.top >= 0 && elRect.top <= cliHeight * topRatio)) {
			UI.flashElement(element);
		}
		else { // if not, scroll to it
			const scrollTop = element.offset().top - V.ui.scroll_top_offset;
			PAGE.scrollingElement.animate({scrollTop},
				V.ui.scroll_time,
				() => UI.flashElement(element));
		}
	}

	static flashElement(element: JQuery) {
		element.addClass(V.cssClass.flash);
		setTimeout(() => element.removeClass(V.cssClass.flash), 1000);
	}

}

// exports in an entry point like this will be
// exposed to the global scope when compiled in development mode
export { DATA, Requests, Main, UI };
