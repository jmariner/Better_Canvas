/**
 * Functions that control various parts of the global DATA. This mostly ends up being event
 * listeners and functions to update the custom data storage in the Canvas API.
 *
 * Exports all functions for use in the Entry module.
 */
import * as UI from "./ui";

import * as Message from "../message";
import * as Utils from "../utils";
import { V } from "../vars";
import { DATA, NavTab } from "../objects";

/**
 * Set the boolean value of one of the states in DATA.states. This includes updating the State
 * object and the custom data storage with the new value and updating the current page accordingly.
 *
 * @param   {string}           stateName The name of the state to change.
 * @param   {boolean}          newState  The new boolean value of the state.
 * @returns {Promise<boolean>}           A Promise containing the success status of this change.
 */
export async function setState(stateName: string, newState: boolean): Promise<boolean> {
	if (!DATA.states.has(stateName)) return;

	const stateObj = DATA.states.get(stateName);

	if (!stateObj.onPages.includes(DATA.coursePage)) return;

	const url = Utils.formatUrl(V.canvas.api.urls.custom_data, {
		dataPath: "/" + V.canvas.api.data_urls.active_states
	});
	const success = Utils.editDataArray(url, newState, [stateName]);

	if (success) {
		stateObj.active = newState;
		UI.updateState(stateObj);
	}
	else {
		console.error("State update failed.");
	}

	return success;
}

/**
 * Change the custom position of a navigation tab. This includes updating the NavTab object and the
 * custom data storage with the new position and updating the page accordingly.
 *
 * @param {NavTab} tab      the navigation tab object to change
 * @param {number} position the new 1-indexed position to give to this tab
 */
export async function setNavTabPosition(tab: NavTab, position: number) {

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

/**
 * Event handler for when a checkbox is checked or unchecked. Disables the checkbox while it updates
 * the custom data storage, and then updates the respective ModuleItem object with the new value.
 * Also sends a message to the chrome runtime to update all other Canvas pages with the new status.
 *
 * @param {HTMLInputElement} el The checkbox's <input> element.
 */
export async function onCheckboxChange(el: HTMLInputElement) {
	const id = Number(el.getAttribute(V.dataAttr.mod_item_id));
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
	else {
		throw new Error("Checkbox update failed.");
	}

}

/**
 * Event handler for when a module item's hide or unhide button is clicked. Disables the hide button
 * while it updates the custom data storage, then updates the ModuleItem object with the new status.
 * Also sends a message to the chrome runtime to update all other Canvas pages with the new status.
 *
 * @param {JQuery} el The <i> element used in the hide button.
 */
export async function onHideButtonClick(el: JQuery) {
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
	else {
		throw new Error("Hidden status update failed.");
	}
}

/**
 * Update the checkboxes from the custom data storage in the Canvas API. This runs very similar to
 * the customDataFlow() in the Init module, but only requests and only handles this course's
 * completed assignments. Used for synchronizing the checkboxes between pages.
 */
export async function updateCheckboxes() {
	const checkboxUrl = Utils.formatUrl(V.canvas.api.urls.custom_data, {
		dataPath: ["", V.canvas.api.data_urls.completed_assignments, DATA.courseID].join("/")
	});
	const checked = (
		await Utils.getJSON<{data: number[]}>(checkboxUrl)
	).data;

	for (const [modItemId, modItem] of DATA.moduleItems)
		modItem.checked = checked.includes(modItemId);
}

/**
 * Update the hidden items from the custom data storage in the Canvas API. This runs similarly to
 * the customDataFlow() in the Init module, but only requests this courses hidden items. Used for
 * synchronizing the hide status of the items.
 */
export async function updateHiddenItems() {
	const checkboxUrl = Utils.formatUrl(V.canvas.api.urls.custom_data, {
		dataPath: ["", V.canvas.api.data_urls.hidden_assignments, DATA.courseID].join("/")
	});
	const hidden = (
		await Utils.getJSON<{data: number[]}>(checkboxUrl)
	).data;

	for (const [modItemId, modItem] of DATA.moduleItems)
		modItem.hidden = hidden.includes(modItemId);
}
