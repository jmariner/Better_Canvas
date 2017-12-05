import $ from "lib/jquery";

import * as Utils from "../utils";
import { V } from "../vars";
import { DATA, Module, ModuleItem, NavTab, State, CanvasPage } from "../objects";

class Page {

	body: JQuery;
	scrollingElement: JQuery;
	main?: JQuery;
	content?: JQuery;
	left?: JQuery;
	sidebar: JQuery;
	grades?: JQuery;

	initialize() {

		this.body = $("body");
		this.scrollingElement = $(document.scrollingElement || document.body);
		this.sidebar = $("#menu");
		this.main = $("#main");

		if (DATA.onMainPage) {
			this.content = $("#content");
			this.left = $("#left-side");
		}

		if (DATA.coursePage === CanvasPage.GRADES)
			this.grades = $("#grades_summary");
	}

	id(cssId: string): JQuery {
		return this.body.find("#" + cssId);
	}

	cls(cssClass: string): JQuery {
		return this.body.find("." + cssClass);
	}

}

export function updateState(stateObj: State) {
	if (stateObj.bodyClass !== undefined)
		PAGE.body.toggleClass(stateObj.bodyClass, stateObj.active);

	stateObj.onChange();
}

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

export async function updateItemHide(item: ModuleItem, instant?: boolean) {
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

	updateModule(item.module);

}

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

export function updateNavTabPosition(tab: NavTab) {

	if (!tab.hasCustomPosition) throw new Error("Tab has no custom position");

	const tabList = PAGE.left.find(V.canvas.selector.nav_tabs);
	const tabEl = tabList.find("a." + tab.id).parent();

	if (tab.hidden)
		tabEl.hide();
	else
		tabEl.show().detach().insertBefore(tabList.children().eq(tab.position - 1));
}

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

export function scrollToElement(element: JQuery) {
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
		flashElement(element);
	}
	else { // if not, scroll to it
		const scrollTop = element.offset().top - V.ui.scroll_top_offset;
		PAGE.scrollingElement.animate({scrollTop},
			V.ui.scroll_time,
			() => flashElement(element));
	}
}

function flashElement(element: JQuery) {
	element.addClass(V.cssClass.flash);
	setTimeout(() => element.removeClass(V.cssClass.flash), 1000);
}

const PAGE = new Page();
export default PAGE;
