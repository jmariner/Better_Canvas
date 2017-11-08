/// <reference path="objects.ts" />
/// <reference path="canvas_api.ts" />
/// <reference path="vars.ts" />
import MessageSender = chrome.runtime.MessageSender;

// ===== main.ts =====
//noinspection JSUnusedGlobalSymbols
const MAIN_FLOW: ((callback: Callback, end?: Callback) => void)[] = [

	function initialize(callback) {

		DATA = new Data();
		PAGE = new Page();

		DATA.extensionId = chrome.runtime.id;
		DATA.name = chrome.runtime.getManifest().name;

		"log debug info warn error dir".split(" ").forEach(s => {
			const orig = console[s];
			console[s] = orig.bind(console, `[${DATA.name}] [${s.toUpperCase()}]`);
		});

		// load course id and what page user is on within that course
		const urlMatch = /courses\/(\d+)(?:\/(\w+))?.*/.exec(document.location.pathname);
		const onCoursePage = urlMatch !== null;
		DATA.coursePage = onCoursePage ? CanvasPage[(urlMatch[2] || "home").toUpperCase()] : null;
		DATA.courseID = onCoursePage ? Number(urlMatch[1]) : null;
		DATA.onMainPage = [CanvasPage.MODULES, CanvasPage.GRADES].includes(DATA.coursePage);

		if (onCoursePage)
			console.debug(`On course #${DATA.courseID} page, at ${CanvasPage[DATA.coursePage]}`);

		// load variables

		V = Vars.VARS;
		V.init(DATA.courseID);

		// try to load access token
		Utils.loadToken(success => {
			if (success) Utils.runCb(callback);
			else Utils.accessTokenPrompt();
		});
	},

	function getCourseTabs(callback, end) {

		Utils.getJSON(V.canvas.api.urls.custom_colors, (colorData: {custom_colors: Map<string, string>}) => {

			Utils.getJSON(V.canvas.api.urls.favorite_courses, (resultData: CanvasAPI.Course[]) => {
				resultData.forEach(courseData => {
					const color = colorData.custom_colors["course_" + courseData.id];
					DATA.courseTabs.set(courseData.id, new CustomCourseTab(courseData, color));
				});

				// if the user is on the grades or modules page, continue with the flow
				// otherwise, call the "end" callback
				Utils.runCb(DATA.onMainPage ? callback : end);

				// TODO consider setting up course tabs here since they don't need any other data
				/* actually, phase out this entire MAIN_FLOW thing and use only promises with:

					main initialization and config files =>
						load course tab data => place course tabs
						load all assignments && (load modules => load module items => load custom data) =>
							setup checkboxes and hide buttons

					arrows show dependence on the completion of the previous item(string);
					indentation shows multiple simultaneous actions that depend on one item;
					"&&" shows dependence on the completion of two items that start simultaneously
				*/
			});
		});

	},

	function getItemData(callback) {

		// in here, we're sending request for assignments at the same time as the one for modules then items
		// we cannot assume that one will be quicker than the other, so keep track and continue when both are done
		let firstDone = false;

		const partDone = () => {
			if (firstDone) Utils.runCb(callback);
			else firstDone = true;
		};

		// hopefully 1000 is enough to get all in one go
		const assignmentsUrl = Utils.perPage(V.canvas.api.urls.assignments, 1000);

		Utils.getJSON(assignmentsUrl, (resultData: CanvasAPI.Assignment[]) => {

			resultData.forEach(assignmentJson => {

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
				item.isSubmitted = typeof(assignmentJson.has_submitted_submissions) === "boolean" ?
					assignmentJson.has_submitted_submissions : null;
			});

			// getItemData done
			partDone();

		});

		new Promise(next => { // get modules

			// hopefully no more than 25 modules
			const modulesUrl = Utils.perPage(V.canvas.api.urls.modules, 25);

			Utils.getJSON(modulesUrl, (resultData: CanvasAPI.Module[]) => {

				resultData.forEach(moduleData => {
					DATA.modules.set(moduleData.id, new Module(moduleData));
				});

				next();
			});

		})
		.then(() => new Promise(next => { // get module items for each module

			const moduleIDs = Array.from(DATA.modules.keys());
			let waitingCount = moduleIDs.length;

			moduleIDs.forEach(moduleID => {

				const itemCount = DATA.modules.get(moduleID).itemCount;

				if (itemCount === 0) {
					if (--waitingCount === 0) next();
					return;
				}

				const moduleItemsUrl = Utils.perPage(
					Utils.format(V.canvas.api.urls.module_items, {moduleID}),
					itemCount);

				Utils.getJSON(moduleItemsUrl, (resultData: CanvasAPI.ModuleItem[]) => {

					resultData.forEach(modItemJson => {

						let item: ModuleItem;
						let contentId = modItemJson.content_id;

						if (ModuleItem.byContentId.has(contentId))
							item = ModuleItem.byContentId.get(contentId);
						else if (contentId)
							item = ModuleItem.fromContentId(contentId);
						else
							item = new ModuleItem();

						item.update(modItemJson);

						DATA.moduleItems.set(modItemJson.id, item);
						DATA.modules.get(modItemJson.module_id).items.push(item);
					});

					if (--waitingCount === 0) next();

				});

			});

		})).then(() => new Promise(next => { // get custom data

			const customDataUrl = Utils.format(V.canvas.api.urls.custom_data, {dataPath: ""});

			Utils.getJSON(customDataUrl, (resultData: {data: CanvasAPI.CustomData}) => {
				const customData = resultData.data;

				// this happens when there was an issue getting the data or there was no data at all
				if (customData === undefined) {
					Utils.runCb(callback);
					return;
				}

				let complete = customData.completed_assignments && customData.completed_assignments[DATA.courseID] || [];
				let hidden = customData.hidden_assignments && customData.hidden_assignments[DATA.courseID] || [];

				// Map.forEach takes "function(value, key, map)"
				DATA.moduleItems.forEach((modItem, modItemId) => {
					modItem.checked = complete.includes(modItemId);
					modItem.hidden = hidden.includes(modItemId);
				});

				const activeStates = customData.active_states || [];

				// load states from config
				$.each(V.state, (name, stateData) => {
					const stateObj = new State(name, stateData, activeStates.includes(name));
					DATA.states.set(name, stateObj);
				});

				next();

			});
		})).then(() => new Promise(next => { // get file urls for file items

			const fileItems = Array.from(DATA.moduleItems.values())
			.filter(item => item.type == ModuleItemType.FILE);

			let waitingCount = fileItems.length;

			fileItems.forEach(item => {
				const fileDataUrl = Utils.scopeFormat(V.canvas.api.urls.file_direct, {fileID: item.contentId});
				Utils.getJSON(fileDataUrl, (resultData: CanvasAPI.File) => {

					item.setFileData(resultData);

					if (--waitingCount === 0) next();
				});
			});

		}))
		.then(partDone);


	},

];

(function init() {

	const start: number = $.now();
	let lastTiming: number;

	const flowComplete = function() {
		PAGE.initialize();
		chrome.runtime.onMessage.addListener(Main.onMessage);
		Main.initPage();
		console.debug(`Initialization done, took ${$.now() - start}ms`);
	};

	// recursive function to run each step
	const runStep = function(item: number, lastItem?: number) {

		if (lastItem !== undefined)
			console.debug(`Completed init item #${lastItem+1} (${MAIN_FLOW[lastItem].name}) in ${$.now() - lastTiming}ms`);

		// if we're out of steps
		if (item >= MAIN_FLOW.length) {
			flowComplete();
			return;
		}

		lastTiming = $.now();

		// run this step with a callback to run the next one and a callback to end the flow
		MAIN_FLOW[item](
			() => runStep(item + 1, item),
			() => runStep(MAIN_FLOW.length, item)
		);
	};

	// init by running first step
	runStep(0);

})();

class Main {

	static initPage() {

		$(window).scroll(UI.updateScrollPosition);
		$(document).ready(UI.updateScrollPosition);

		// =============== misc global init stuff ============================

		// removing all repeated whitespace in class attributes
		$("[class]").attr("class", (i, oldClass) => (oldClass.match(/\S+/g) || []).join(" "));

		// clean up discussion post images
		$("#discussion_subentries .discussion_entry .message.user_content p > img")
			.css("max-width", "100%");

		// clean up grade table
		$("#grades_summary tbody")
		.find("tr.group_total, tr.final_grade")
		.find("td.points_possible").attr("colspan", "3").css("text-align", "center").end()
		.find("td.details, td.status").remove();

		// make the course button take you to "all courses" and change the text to say so
		const origCourseNav = $("#global_nav_courses_link");
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

		// === insert course links ===

		const $insertionPoint = PAGE.sidebar.children().eq(2);
		DATA.courseTabs.forEach((courseTab) => {
			$insertionPoint.after(
				Utils.format(V.element.course_link, {
					tabColor: courseTab.color,
					tabID: courseTab.id,
					name: courseTab.name,
					code: courseTab.code
				})
			);
		});

		// === place "jump to top" button ===

		DATA.elements.jump_button =
			$(V.element.jump_button)
			.find("i")
			.click(() => {
				if (document.body.scrollTop > 0)
					$("body").animate({scrollTop: 0}, V.ui.scroll_time);
			})
			.end()
			.appendTo(PAGE.main);

		// ======================= course page cutoff ===============
		// everything past this point is for course pages
		// ==========================================================
		if (DATA.coursePage === null) return;

		// ==== clear the active menu tab since we're using custom tabs ====

		$("ul#menu > li").removeClass("ic-app-header__menu-list-item--active");

		// ==== apply course color to brand colors ====

		const color = DATA.courseTabs.get(DATA.courseID).color;
		document.documentElement.style.setProperty("--ic-brand-primary", color);

		// ====================== main page cutoff ==================
		// everything past this is only for modules/grades pages
		// ==========================================================
		if (!DATA.onMainPage) return;

		// === load initial states ===

		Array.from(DATA.states.values())
			.filter(s => s.active && s.onPages.includes(DATA.coursePage))
			.forEach(s => PAGE.body.addClass(s.bodyClass));

		// === place checkboxes & hide buttons ===

		Array.from(DATA.moduleItems.values()).forEach(item => {

			const item_id = item.id;
			const mainEl = $("#"+item.canvasElementId);
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
					$(Utils.format(V.element.checkbox, {item_id})).appendTo(parentEl);

				UI.updateCheckbox(item);
				item.checkboxElement.show();
			}
			if (hasHideButton) {
				item.hideElement =
					$(Utils.format(V.element.hide_button, {item_id})).appendTo(parentEl);

				UI.updateHideButton(item);
				item.hideElement.show();
			}


		});

		// === fix grade checkboxes since they're in the table ===
		if (DATA.coursePage === CanvasPage.GRADES) {
			PAGE.grades
				.find("td[colspan='5']")
				.attr("colspan", 6)
				.end().find("> thead > tr")
				.prepend($("<th>")
					.attr("scope", "col")
					.append("<i class='icon-check'></i>")
				)
				.end().find("tr.student_assignment")
				.prepend(function() {
					return $(this).has("td:first-child").length === 0 ?
						$("<td>").addClass(V.cssClass.checkbox_td) : undefined;
				});
		}

		// === add change event for checkboxes ===

		PAGE.main.on("change", `.${V.cssClass.checkbox_parent} > input`, function() {
			Main.onCheckboxChange(this as HTMLInputElement);
		});

		// ====================== modules page cutoff ==================
		// everything past here is only on the modules page
		// =============================================================
		if (DATA.coursePage !== CanvasPage.MODULES) return;

		// === clean up empty modules ===
		$(V.canvas.selector.module_items).filter((i, el) => !el.innerHTML.trim().length).html("");

		// === set custom indent level ===

		const disabledIndent = DATA.states.get("disable_indent_override").active;

		$(V.canvas.selector.module_item).each(function() {
			const defIndent =
				[0,1,2,3,4,5].filter(level => $(this).hasClass("indent_"+level))[0];
			$(this).attr(V.data_attr.def_indent, defIndent);
			if (!disabledIndent)
				$(this).removeClass("indent_"+defIndent);
		});

		if (!disabledIndent) {
			$(V.canvas.selector.subheader).addClass("indent_"+V.ui.subheader_indent);
			$(V.canvas.selector.not_subheader).addClass("indent_"+V.ui.main_indent);
		}

		// === place and populate the table of contents ===

		const toc = $(V.element.toc);
		const ul = toc.find("ul");

		DATA.modules.forEach((mod, modId) => {
			let formatted = Utils.format(V.element.toc_item, {item_name: mod.name, item_id: modId});
			$(formatted)
				.find("a")
				.click(e => {
					const moduleEl = $("#context_module_" + modId);
					UI.scrollToElement(moduleEl);

					if (moduleEl.hasClass("collapsed_module"))
						moduleEl.find(".expand_module_link").click();

					e.preventDefault();
				})
				.end()
				.appendTo(ul);
		});

		DATA.elements.toc = toc
			.css("top", PAGE.left.height() + V.ui.toc_top_margin)
			.appendTo(PAGE.main)
			.data("cutoff", toc.offset().top - V.ui.toc_top_margin);

		UI.updateModules();

		// === add submission status icons ===

		/* TODO this only tracks if *someone* has submitted, not always this user. need to query submissions api for this
		Array.from(DATA.moduleItems.values())
		//	.filter(i => i.isSubmitted)
			.forEach(i => {
				if (i.isSubmitted)
					$("#"+i.canvasElementId).find(".module-item-status-icon").after(V.element.submission_icon);
			});

		*/

		// === add click event for hide buttons ===

		PAGE.main.on("click", `.${V.cssClass.hide_button} > i`, function() {
			Main.onHideButtonClick($(this));
		});

		// === add quick download buttons to FILE items

		const modItems = Array.from(DATA.moduleItems.values());

		modItems.filter(item => item.type == ModuleItemType.FILE)
			.forEach(item => {
				const element = Utils.format(V.element.download_button, {
					file_url: item.fileData.url,
					filename: item.fileData.display_name
				});
				$(element).insertBefore(item.checkboxElement);
		});

		$("."+V.cssClass.download).show();

		// === add quick link button to EXTERNAL_URL items

		modItems.filter(item => item.type == ModuleItemType.EXTERNAL_URL)
			.forEach(item => {
				const element = Utils.format(V.element.url_button, {
					external_url: item.externalUrl
				});
				$(element).insertBefore(item.checkboxElement);

				$("#"+item.canvasElementId).find("a.external_url_link.title")
				.attr("href", function() { return $(this).attr("data-item-href"); })
				.removeAttr("target rel")
				.removeClass("external")
				.addClass("ig-title")
				.find(".ui-icon").remove()
			});

		$("."+V.cssClass.external_url).show()
		// need to clear the "a" contents cause canvas inserts the external link icon
	//	$("."+V.cssClass.external_url).show().find("a").html("");

	}

	static getState(stateName: string): boolean {
		if (DATA.states.has(stateName)) {
			const state = DATA.states.get(stateName);
		//	return PAGE.body.hasClass(state.bodyClass);
			return state.active;
		}
		else {
			return null;
		}
	}

	static setState(stateName: string, state: boolean) {
		if (!DATA.states.has(stateName)) return;

		const stateObj = DATA.states.get(stateName);

		if (!stateObj.onPages.includes(DATA.coursePage)) return;

		if (stateObj.bodyClass)
			PAGE.body.toggleClass(stateObj.bodyClass, state);

		stateObj.active = state;
		stateObj.onChange(state, V, PAGE.body);

		const url = Utils.format(V.canvas.api.urls.custom_data, {dataPath: "/active_states"});
		Utils.editDataArray(url, state, [stateName]);
	}

	// element is the <input>
	static onCheckboxChange(el: HTMLInputElement) {
		const id = Number($(el).attr(V.data_attr.mod_item_id));
		const item = DATA.moduleItems.get(id);
		const status = el.checked;
		const oldTitle = el.title;

		// reset back to previous state to allow for validation
		el.checked = !status;

		// before updating "item", so if it's already the same, we have a desync
		if (status === item.checked) {
			console.error("Checkbox desync at item", item);
			return;
		}

		// TODO create a better method for waiting-disable for checkbox and hide button
		// - have a different class applied that sets the cursor to waiting mode and dims the button

		// disable until we confirm we can update the data
		el.disabled = true;
		el.title = V.tooltip.waiting;

		const url = Utils.format(V.canvas.api.urls.custom_data, {
			dataPath: `/${V.canvas.api.data_urls.completed_assignments}/${DATA.courseID}`
		});

		Utils.editDataArray(url, status, [id], success => {
			el.disabled = false;
			el.title = oldTitle;

			if (success) {
				item.checked = status;
				UI.updateModule(item.module);
				UI.updateCheckbox(item);
				console.debug(`Item ID ${id} (${item.name.substr(0, 25)}...) has been ${el.checked?"":"un"}checked`);
			}
		});

	}

	// element is the <i>
	static onHideButtonClick(el: JQuery) {
		const id = Number(el.attr(V.data_attr.mod_item_id));
		const item = DATA.moduleItems.get(id);

		if (item.isGraded || item.hideElement.hasClass(V.cssClass.hide_disabled)) return;

		const newState = !item.hidden;

		// disable until updating complete. this is undone by updateHideButton later
		item.hideElement
			.addClass(V.cssClass.hide_disabled)
			.find("i")
			.attr("title", V.tooltip.waiting);

		const url = Utils.format(V.canvas.api.urls.custom_data, {
			dataPath: `/${V.canvas.api.data_urls.hidden_assignments}/${DATA.courseID}`
		});

		Utils.editDataArray(url, newState, [id], success => {
			if (success) item.hidden = newState;
			UI.updateHideButton(item, success, () => {
				if (success) {
					UI.updateModule(item.module);
					console.debug(`Item ID ${id} (${item.name.substr(0, 25)}...) has been ${item.hidden ? "" : "un"}hidden`);
				}
			});

		});

	}

	static onMessage(data: MessageData, source: MessageSender, respondFunc: (data?: any) => void) {

		if (source.id !== DATA.extensionId) return;

		if (data.type === MessageType.BASIC) {
			const unchecked = Array.from(DATA.moduleItems.values()).filter(i=>!i.checked&&!i.hidden&&!i.isSubHeader);
			switch (data.action) {
				case "ping":
					respondFunc({pong: $.now()});
					break;
				case "count unchecked":
					respondFunc({count: unchecked.length});
					break;
				case "update token":
					Utils.loadToken(respondFunc);
					break;
				case "jump to first unchecked":
					let uncheckedEls = unchecked
						.map(i => document.getElementById(i.canvasElementId));
					UI.scrollToElement($(uncheckedEls).first());
					respondFunc();
					break;
				default:
					console.warn("Unknown basic message in content script:", data);
			}
		}
		else if (data.type === MessageType.STATE) {
			const stateData = data as StateMessageData;
			if (data.action === "get") {
				const state = Main.getState(stateData.stateName);
				respondFunc({state});
			}
			else if (data.action === "set") {
				Main.setState(stateData.stateName, stateData.state);
				respondFunc();
			}
			else {
				console.warn("Unknown state message in content script:", data);
			}
		}
		else {
			console.warn("Unknown message in content script:", data);
		}
	}
}

class UI {

	static updateCheckbox(item: ModuleItem) {
		if (item.checkboxElement === null) throw "No checkbox to update";
		item.checkboxElement
			.find("input")
			.prop("checked", item.checked)
			.attr("title", item.checked ? V.tooltip.mark_incomplete : V.tooltip.mark_complete)
			.closest(V.canvas.selector.module_item)
			.toggleClass(V.cssClass.checkbox_checked, item.checked);
	}

	static updateHideButton(item: ModuleItem, animate?: boolean, after?: Callback) {
		if (item.hideElement === null) throw "No hide button to update";

		const modItemEl = item.hideElement.closest(V.canvas.selector.module_item);
		const iEl = item.hideElement.find("i");

		// update hidden class on the <i> and <li>
		iEl.add(modItemEl).toggleClass(V.cssClass.item_hidden, item.hidden);

		const update = () => {
			// update disable status and title, undoing waiting-disable
			item.hideElement.toggleClass(V.cssClass.hide_disabled, item.isGraded);
			iEl.attr("title", item.isGraded ? V.tooltip.hide_disabled : item.hidden ? V.tooltip.unhide : V.tooltip.hide);

			Utils.runCb(after);
		};

		if (animate) setTimeout(update, V.ui.fade_time);
		else update();

	}

	private static updateTableOfContents(module?: Module) {
		const allItems = module.items.filter(i => !i.isSubHeader && !i.hidden);
		const totalItems = allItems.length;

		let checkedItems, percent;

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
			.find(`[${V.data_attr.toc_module_id}='${module.id}']`)
			.attr(V.data_attr.toc_total, totalItems)
			.attr(V.data_attr.toc_checked_count, checkedItems)
			.attr(V.data_attr.toc_percentage, percent)
			.closest("li")
			.toggleClass(V.cssClass.item_hidden, totalItems === 0)
			.css({backgroundImage});
	}

	static updateModules() {
		Array.from(DATA.modules.values()).forEach(UI.updateModule);
	}

	static updateModule(module: Module) {

		if (DATA.elements.toc !== null)
			UI.updateTableOfContents(module);

		// if no visible items in this module, hide the entire module
		const noItems = module.items.filter(i => !i.isSubHeader && !i.hidden).length === 0;
		$("#context_module_"+module.id).toggleClass(V.cssClass.item_hidden, noItems);

	}

	static updateScrollPosition() {
		const scrollTop = document.body.scrollTop;

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
			let scrollTop = element.offset().top - V.ui.scroll_top_offset;
			PAGE.body.animate({scrollTop},
				V.ui.scroll_time,
				() => UI.flashElement(element));
		}
	}

	static flashElement(element: JQuery) {
		element.addClass(V.cssClass.flash);
		setTimeout(() => element.removeClass(V.cssClass.flash), 1000);
	}

}
// end MAIN