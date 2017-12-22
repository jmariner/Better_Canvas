/**
 * Deals with all manipulations of the Canvas page.
 *
 * Exports several functions to update each part of the extension and includes a default export of
 * the global PAGE object, which is an instance of the Page class.
 */
import $ from "lib/jquery";

import * as Utils from "../utils";
import { V } from "../vars";
import { DATA, Module, ModuleItem, NavTab, State, CanvasPage } from "../objects";

/**
 * The Page class contains global data members referencing the common elements in the Canvas page.
 * Also contains functions to find other elements.
 *
 * This eventual plan here is to create a full interface to jQuery in a separate module; this is the
 * initial state of that.
 */
class Page {

	body: JQuery;
	scrollingElement: JQuery;
	main: JQuery;
	content: JQuery;
	left: JQuery;
	sidebar: JQuery;
	grades?: JQuery;

	initialize() {

		this.body = $("body");
		this.scrollingElement = $(document.scrollingElement || document.body);
		this.main = $("#main");
		this.content = $("#content");
		this.left = $("#left-side");
		this.sidebar = $("#menu");

		if (DATA.coursePage === CanvasPage.GRADES)
			this.grades = $("#grades_summary");
	}

	id(cssId: string): JQuery {
		return this.body.find("#" + cssId);
	}

	cls(...cssClasses: string[]): JQuery {
		return this.body.find(
			cssClasses.map(cls => "." + cls).join(",")
		);
	}

	/**
	 * Create a new element from an HTML string and a format object. This allows for better control
	 * of all created elements.
	 *
	 * @param {string} html      The HTML to turn into an element.
	 * @param {object} formatObj The format object to pass to Utils.format
	 * @returns {JQuery} The resulting jQuery element instance.
	 */
	newEl(html: string, formatObj?: object): JQuery {
		if (formatObj !== undefined)
			html = Utils.format(html, formatObj);

		return $(html);
	}

}

/**
 * Updates the new boolean value of a state on the Canvas page. This consists of toggling the
 * state's bodyClass and calling its onChange handler.
 *
 * @param {State} stateObj The State object to update the page for.
 */
export function updateState(stateObj: State) {
	if (stateObj.bodyClass !== undefined)
		PAGE.body.toggleClass(stateObj.bodyClass, stateObj.active);

	stateObj.onChange();
}

/**
 * Updates the new checked value of a checkbox on the Canvas page. This consists of updating the
 * 'checked' attribute and the tooltip of the <input> element, as well as toggling classes in the
 * checkbox's parent element. Also updates the parent module of this item.
 *
 * @param {ModuleItem} item The module item object to update the checkbox for.
 */
export function updateCheckbox(item: ModuleItem) {
	if (item.checkboxElement === null) throw new Error("No checkbox to update");
	item.checkboxElement
		.find("input")
		.prop("checked", item.checked)
		.attr("title", item.checked ? V.tooltip.mark_incomplete : V.tooltip.mark_complete)
		.closest(V.canvas.selector.module_item)
		.toggleClass(V.cssClass.checkbox_checked, item.checked);

	updateModule(item.module);
}

/**
 * Update the hide status of a module item on the Canvas page. This consists of updating the hide
 * button's tooltip and toggling the required classes on the module item. The class change will also
 * run the particular animation. Also updates the parent module of this item.
 *
 * @param {ModuleItem} item    The module item object to update the hide status for.
 * @param {boolean}    instant Whether or not to update this item instantly. If 'false', this
 *                             function will run asychronously.
 */
export async function updateItemHide(item: ModuleItem, instant?: boolean) {
	if (item.hideElement === null) throw new Error("No hide button to update");

	const modItemEl = item.hideElement.closest(V.canvas.selector.module_item);
	const iEl = item.hideElement.find("i");

	// update hidden class on the <i> and <li>
	iEl.add(modItemEl).toggleClass(V.cssClass.item_hidden, item.hidden);

	if (!instant) await Utils.wait(V.ui.fade_time);

	// update disable status and title, undoing waiting-disable
	item.hideElement.toggleClass(V.cssClass.hide_disabled, item.isAssignment);
	iEl.attr("title",
		item.isAssignment ? V.tooltip.hide_disabled :
		item.hidden ? V.tooltip.unhide :
		V.tooltip.hide
	);

	updateModule(item.module);

}

/**
 * Update a module on the Canvas page, consisting of updating the table of contents in the sidebar,
 * which counts the amount of items that are checked versus the total amount of items that are not
 * hidden or subheaders. Also will optionally hide an entire module, and its entry in the TOC, if
 * it does not have any items at all.
 *
 * @param {Module} module The module object to update the page for.
 */
export function updateModule(module: Module) {

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

/**
 * Update the Canvas page with the custom position of a navigation tab. This consists of detaching
 * and re-inserting the tab into the navigation list.
 *
 * @param {NavTab} tab The navigation tab object to upate the page for.
 */
export function updateNavTabPosition(tab: NavTab) {

	if (!tab.hasCustomPosition) throw new Error("Tab has no custom position");

	const tabList = PAGE.left.find(V.canvas.selector.nav_tabs);
	const tabEl = tabList.find("a." + tab.id).parent();

	if (tab.hidden)
		tabEl.hide();
	else
		tabEl.show().detach().insertBefore(tabList.children().eq(tab.position - 1));
}

/**
 * Update the page when it is scrolled, which consists of updating the table of contents and the
 * 'jump to top' button accordingly.
 */
export function updateScrollPosition() {
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

/**
 * Scroll to an element on the Canvas page, flashing it after arriving. If the element is already in
 * the viewport, no scrolling will occur.
 *
 * An element is in the viewport if its height is shorter than viewport height and both top and
 * bottom are inside the viewport OR if its height is taller than viewport and top is within top
 * part of the page.
 *
 * @param {JQuery} element The element to scroll to.
 */
export function scrollToElement(element: JQuery) {
	const elRect = element[0].getBoundingClientRect();
	const cliHeight = document.documentElement.clientHeight;
	const topRatio = V.ui.top_inside_ratio;

	// if element is in viewport, just flash it
	if ((elRect.height < cliHeight && elRect.top >= 0 && elRect.bottom < cliHeight) ||
		(elRect.top >= 0 && elRect.top <= cliHeight * topRatio)) {
		flashElement(element);
	}
	else { // if not, scroll to it
		const scrollTop = element.offset().top - V.ui.scroll_top_offset;
		PAGE.scrollingElement.animate({scrollTop},
			V.ui.scroll_time,
			() => flashElement(element));
	}
}

/**
 * Flash an element on the page by setting the flash class and removing it after one second.
 *
 * @param {JQuery} element The element to flash.
 */
function flashElement(element: JQuery) {
	element.addClass(V.cssClass.flash);
	setTimeout(() => element.removeClass(V.cssClass.flash), 1000);
}

const PAGE = new Page();
export default PAGE;
