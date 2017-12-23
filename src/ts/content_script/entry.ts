/**
 * Main content script entry point. The functions in this module use some combination of the other
 * content script modules, where importing them into each other would result in a circular import
 * situation.
 *
 * This module also includes imports for the content script SCSS file and the import for jQuery,
 * both of which need to be injected along with the rest of the content script.
 */
import $ from "lib/jquery";
import "scss/style.scss";
import MessageSender = chrome.runtime.MessageSender;

import PAGE, * as UI from "./ui";
import * as Main from "./main";
import * as Init from "./init";

import * as Utils from "../utils";
import * as Message from "../message";
import { V } from "../vars";
import { DATA, CanvasPage, ModuleItemType, Exception } from "../objects";

/** If the extension has been initialized. */
let extensionInitialized = false;
/** If the core of the extension has been initialized. */
let coreInitialized = false;

/**
 * Initialize everything. This is called once on load (see the bottom of this file) and can be
 * called again when the background page sends the RE_INITIALIZE request. All errors
 * from the separate init functions are caught here.
 */
function init() {
	if (!extensionInitialized)
		initExtension();

	if (coreInitialized) return;

	initCore()
	// TODO global error handling needs work
	.catch((err: Error) => {
		// Exceptions are intentionally throw by my code
		if (err instanceof Exception) {
			if (err.isFatal) throw err;
			else console.warn("Exception in init:", err);
		}
		else { // anything else is unknown and is a problem
			throw err;
		}
	})
	.then((totalDuration: number) => {
		console.debug(`Initialization completed in ${Math.round(totalDuration)}ms`);
	});
}

/**
 * Initialize the Chrome extension settings and data. This includes:
 * - storing the ID and name of the extension
 * - overriding default console.{log,debug,info,...} functions to display the extension name
 * - parsing the URL of the page to determine which Canvas page is active
 * - setting the Chrome message listener
 *
 * This should only ever run one time.
 */
function initExtension() {
	const extensionName = chrome.runtime.getManifest().name;

	for (const logType of "log debug info warn error dir".split(" ")) {
		const orig = console[logType];
		console[logType] = orig.bind(console, `[${extensionName}] [${logType.toUpperCase()}]`);
	}

	// load course id and what page user is on within that course
	const urlMatch = /courses\/(\d+)(?:\/(\w+))?.*/.exec(document.location.pathname);
	const onCoursePage = urlMatch !== null;
	DATA.coursePage = onCoursePage ? CanvasPage[(urlMatch[2] || "home").toUpperCase()] : null;
	DATA.courseID = onCoursePage ? Number(urlMatch[1]) : null;
	DATA.onMainPage = [CanvasPage.MODULES, CanvasPage.GRADES].includes(DATA.coursePage);

	if (DATA.coursePage === undefined) // course page was not in the CanvasPage enum
		console.warn("Unknown course page:", urlMatch[2]);

	chrome.runtime.onMessage.addListener(onMessage);

	extensionInitialized = true;
}

/**
 * Initialize the core of the extension, including:
 * - checking for the access token
 * - sending and parsing JSON requests for various Canvas data
 * - tracking the duration of this entire process
 *
 * This is intended to be ran again when the access token check fails, but will not run to
 * completion more than once.
 *
 * @returns {Promise<number>} A promise containing the milliseconds elapsed during the full
 *                              asynchronous initialization process
 */
async function initCore(): Promise<number> {

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

	const promises = [Init.courseTabFlow];
	const customDataPromises = new Array<() => Promise<void>>();

	if (DATA.coursePage !== null) {
		promises.push(Init.navTabFlow);
		customDataPromises.push(Init.customTabPositionsFlow);
	}
	if (DATA.onMainPage) {
		promises.push(Init.assignmentFlow);
		promises.push(Init.moduleItemFlow);
		customDataPromises.push(Init.customItemDataFlow);
	}
	if (DATA.coursePage === CanvasPage.MODULES)
		customDataPromises.push(Init.customStatesFlow);

	// Run main promises
	await Promise.all(promises.map(func => func()));

	// Run custom data flow items after everything else completes
	await Promise.all(customDataPromises.map(func => func()));

	initPage();

	coreInitialized = true;

	return performance.now() - initStart;
}

/**
 * Initialize the Canvas page, including:
 * - placing all custom elements on the page
 * - setting up all event listeners, including for custom elements
 * - repairing misc. parts of the webpage to better complement the additions
 *
 * The current Canvas page determines exactly how much of this function runs; it's filled with
 * 'return' guards to that it stops early when it can.
 *
 * This should only ever run once to prevent elements from being added multiple times.
 */
function initPage() {

	PAGE.initialize();

	$(window).scroll(UI.updateScrollPosition);
	$(document).ready(UI.updateScrollPosition);

	// =============== misc global init stuff ============================

	// remove all repeated whitespace in class attributes
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
		courseNavLi.after(
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
		PAGE.newEl(V.element.jump_button)
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
		// TODO: do more with this accent color - edit more of the --ic-* variables
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
			hasCheckbox = item.isAssignment;
		}

		if (hasCheckbox) {
			item.checkboxElement =
				PAGE.newEl(V.element.checkbox, {item_id: itemId}).appendTo(parentEl);

			UI.updateCheckbox(item);
			item.checkboxElement.show();
		}
		if (hasHideButton) {
			item.hideElement =
				PAGE.newEl(V.element.hide_button, {item_id: itemId}).appendTo(parentEl);

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
	// TODO custom ident feature could be better

	const disabledIndentState = DATA.states.get("disable_indent_override");
	const indentClasses = [0,1,2,3,4,5].map(level => "indent_" + level);

	const applyIndentOverrides = () => {
		PAGE.main
		.find(V.canvas.selector.module_item)
			.removeClass(indentClasses.join(" ")).end()
		.find(V.canvas.selector.subheader)
			.addClass(indentClasses[V.ui.subheader_indent]).end()
		.find(V.canvas.selector.not_subheader)
			.addClass(indentClasses[V.ui.main_indent]);
	};

	disabledIndentState.onEnable = () => {
		for (const modItem of DATA.moduleItems.values())
			PAGE.id(modItem.canvasElementId)
				.removeClass(indentClasses.join(" "))
				.addClass(indentClasses[modItem.indentLevel]);
	};

	disabledIndentState.onDisable = applyIndentOverrides;

	if (!disabledIndentState.active)
		applyIndentOverrides();

	// === place and populate the table of contents ===

	const toc = PAGE.newEl(V.element.toc);
	const ul = toc.find("ul");

	for (const [modId, mod] of DATA.modules) {

		PAGE.newEl(V.element.toc_item, {
			item_name: mod.name,
			item_id: modId
		})
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

	// === add buttons to FILE and EXTERNAL_URL items and add status icons to assignments ===

	const gradedEl = Utils.format(V.element.status_icon, V.icon.graded);
	const notGradedEl = Utils.format(V.element.status_icon, V.icon.submitted_not_graded);

	for (const [modItemId, item] of DATA.moduleItems) {

		if (item.type === ModuleItemType.FILE) {
			PAGE.newEl(V.element.download_button, {
				file_url: item.fileData.url,
				filename: item.fileData.display_name,
				item_id: modItemId
			}).insertBefore(item.checkboxElement);
		}
		else if (item.type === ModuleItemType.EXTERNAL_URL) {
			PAGE.newEl(V.element.url_button, {
				external_url: item.externalUrl,
				item_id: modItemId
			}).insertBefore(item.checkboxElement);

			PAGE.id(item.canvasElementId).find("a.external_url_link.title")
				.attr("href", function() { return $(this).attr("data-item-href"); })
				.removeAttr("target rel")
				.removeClass("external")
				.addClass("ig-title")
				.find(".ui-icon").remove();
		}
		else if (item.isAssignment) {

			// using an array to allow future additions
			const statusIcons = new Array<JQuery>();

			if (item.isGraded)
				statusIcons.push(PAGE.newEl(gradedEl, {item_id: modItemId}));
			else if (item.isSubmitted)
				statusIcons.push(PAGE.newEl(notGradedEl, {item_id: modItemId}));

			// add elements in reverse order to the left of the checkbox
			for (const icon of statusIcons.reverse())
				icon.insertBefore(item.checkboxElement);

		}
	}

	PAGE.cls(
		V.cssClass.download,
		V.cssClass.external_url,
		V.cssClass.status_icon
	).show();

}

/**
 * Chrome runtime message listener. See the Message module for the types of messages this handles.
 *
 * @param   {Message.Base}  msg The instance of a message type, which is received as a plain object
 *                              with no understanding of its class, so casting is required and
 *                              'instanceof' does not work.
 * @param   {MessageSender} src The source of this message. Should be the Chrome extension runtime.
 * @param   {(x?) => void}  respond The callback function used to respond to the message.
 * @returns {true | void} Must return 'true' when the callback function will be called
 *                        asychronously. Otherwise, does not return.
 */
function onMessage(msg: Message.Base, src: MessageSender, respond: (x?) => void): true | void {

	if (src.id !== chrome.runtime.id) return;

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
			await Main.updateCheckboxes();
			UI.updateCheckbox(DATA.moduleItems.get(data.itemId));
		})().then(respond);

		return true;
	}
	else if (msg.type === Message.Type.UPDATE_HIDDEN) {

		const data = msg as Message.UpdateHidden;

		(async function() {
			await Main.updateHiddenItems();
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
	else if (msg.type === Message.Type.RE_INITIALIZE) {
		// this function should be able to handle being called again after initialization
		init();
	}
	else {
		console.warn("Unknown message in content script:", msg);
	}

	respond(resp);
}

// run overall initialization function
init();

/**
 * Export several constants and modules, exposing them to the global scope when built in
 * development mode.
 */
export { V, DATA, Init, Main, UI, Utils };
export * from "../objects";
