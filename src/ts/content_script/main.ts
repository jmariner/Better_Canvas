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
import { DATA, NavTab, EditMode } from "../objects";

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

	const success = await Utils.editCustomDataArray(
		[V.canvas.api.data_urls.active_states],
		newState ? EditMode.APPEND : EditMode.SUBTRACT,
		[stateName]
	);

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
 * Change the custom position of a navigation tab. This includes changing, or setting, the custom
 * position of all tabs within the range that this tab is moving. For example, if this tab is moved
 * from position 6 up to position 2, then tabs 3, 4, and 5 all must be moved down to make space.
 * The NavTab objects and custom data storage are both updated with these changes.
 *
 * @param {NavTab} targetTab   The navigation tab object to change.
 * @param {number} newPosition The new 1-indexed position to give to this tab.
 */
export async function setNavTabPosition(targetTab: NavTab, newPosition: number) {

	// Get the previous position of this tab and go through all tabs between its previous and new
	// position. If any in between have a custom position, update that custom position by either +1
	// or -1 depending on which way this tab is changing.

	const prevPos = targetTab.position;
	const direction = Math.sign(newPosition - prevPos); // negative = up, positive = down
	const [minPos, maxPos] = [prevPos, newPosition].sort((a, b) => a - b);
	const sortedTabs = Array.from(DATA.navTabs.values())
		.filter(tab => !tab.hidden)
		.sort((a, b) => a.position - b.position);

	const tabUpdates: {[tabId: string]: number} = {};
	const queuedUpdates = new Array<[NavTab, number]>();

	tabUpdates[targetTab.id] = newPosition;
	queuedUpdates.push([targetTab, newPosition]);

	// Tab positions are 1-indexed; subtract 1 to reference array items.
	for (let pos = 1; pos <= sortedTabs.length; pos++) {
		const curTab = sortedTabs[pos - 1];

		// Special case for tabs in between the moving range. Includes the new position, which may
		// have previously been taken. This is guaranteed to not contain the target tab.
		if (pos > minPos && pos < maxPos || pos === newPosition) {
			// Move each tab in the opposite direction of the target tab's change.
			const newPos = curTab.position - direction;
			tabUpdates[curTab.id] = newPos;
			queuedUpdates.push([curTab, newPos]);
		}
		// Keep existing tabs, except the one being changed, the same.
		else if (curTab.hasCustomPosition && curTab !== targetTab) {
			tabUpdates[curTab.id] = curTab.position;
		}

	}

	// Update the API with the new tab data.

	const success = await Utils.putCustomData(
		[V.canvas.api.data_urls.tab_positions, DATA.courseID],
		tabUpdates
	);

	if (success) {
		for (const [curTab, newPos] of queuedUpdates) {
			curTab.setPosition(newPos);
			UI.updateNavTabPosition(curTab);
		}
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

	const success = await Utils.editCustomDataArray(
		[V.canvas.api.data_urls.completed_assignments, DATA.courseID],
		status ? EditMode.APPEND : EditMode.SUBTRACT,
		[id]
	);

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
	if (item.isAssignment || item.hideElement.hasClass(V.cssClass.hide_disabled)) return;

	// disable until updating complete. this is undone by updateHideButton later
	item.hideElement
		.addClass(V.cssClass.hide_disabled)
		.find("i")
		.attr("title", V.tooltip.waiting);

	const newState = !item.hidden;

	const success = await Utils.editCustomDataArray(
		[V.canvas.api.data_urls.hidden_assignments, DATA.courseID],
		newState ? EditMode.APPEND : EditMode.SUBTRACT,
		[id]
	);

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

	const checked = await Utils.getCustomData<number[]>(
		V.canvas.api.data_urls.completed_assignments,
		DATA.courseID
	);

	for (const [modItemId, modItem] of DATA.moduleItems)
		modItem.checked = checked.includes(modItemId);
}

/**
 * Update the hidden items from the custom data storage in the Canvas API. This runs similarly to
 * the customDataFlow() in the Init module, but only requests this courses hidden items. Used for
 * synchronizing the hide status of the items.
 */
export async function updateHiddenItems() {

	const hidden = await Utils.getCustomData<number[]>(
		V.canvas.api.data_urls.hidden_assignments,
		DATA.courseID
	);

	for (const [modItemId, modItem] of DATA.moduleItems)
		modItem.hidden = hidden.includes(modItemId);
}
