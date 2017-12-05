import $ from "lib/jquery";
import "scss/style.scss";
import MessageSender = chrome.runtime.MessageSender;

import * as UI from "./ui";
import * as Main from "./main";
import * as Init from "./init";

import * as Utils from "../utils";
import * as Message from "../message";
import { V } from "../vars";
import { DATA, PAGE, CanvasPage, ModuleItemType, Exception } from "../objects";

let extensionInitialized = false;
let coreInitialized = false;

function init() {
	if (!extensionInitialized)
		initExtension();

	if (coreInitialized) return;

	initCore()
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
	});
}

// =======================================
//         extension initialization
//   this only needs to run once;
//   start() can be re-ran to retry token
// =======================================
function initExtension() {
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

	chrome.runtime.onMessage.addListener(onMessage);

	extensionInitialized = true;
}

// =======================================
//           core initialization
//  will only run when coreInitialized = false.
//  access token problems cause it to remain false
// =======================================
async function initCore() {

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

	const promises = [Init.courseTabFlow()];

	if (DATA.coursePage !== null)
		promises.push(Init.navTabFlow());

	if (DATA.onMainPage) {
		promises.push(Init.assignmentFlow());
		promises.push(Init.moduleItemFlow());
	}

	await Promise.all(promises);

	// run custom data flow after everything
	if (DATA.onMainPage) await Init.customDataFlow();

	initPage();

	coreInitialized = true;

	return performance.now() - initStart;
}

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
	// TODO custom ident feature could be better

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

}

// this should return 'true' when 'respond' will be called with async
function onMessage(msg: Message.Base, src: MessageSender, respond: (x?) => void) {

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
			await Main.updateCheckboxes();
			await UI.updateCheckbox(DATA.moduleItems.get(data.itemId));
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

// exports in an entry point like this will be
// exposed to the global scope when compiled in development mode
export { DATA, Init, Main, UI };
