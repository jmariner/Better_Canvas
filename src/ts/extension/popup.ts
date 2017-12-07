/**
 * Entry point for the Chrome extension popup window that is openable on Canvas pages that contain
 * the content script. Includes an initialization that creates toggle switches for all available
 * states listed in the global variables, event handlers for those switches and for some extra
 * buttons, and utility functions for easily messaging the active Canvas tab and for updating the
 * custom material design switches.
 *
 * Imports all required JS libraries like Material Design Light, and also imports the SCSS styles
 * for this page.
 */
import $ from "lib/jquery";
import "lib/material";
import "lib/chrome-extension-async";
import "scss/popup.scss";

import { V } from "../vars";
import { format, getCanvasTabs, messageCanvasTabs } from "../utils";
import { State } from "../objects";
import * as Message from "../message";

declare const componentHandler;

/** Run everything on load using jQuery */
$(async function() {

	const BODY = $("body");
	const jumpButton = $("#" + V.id.popup_jump_button);
	const insertionPoint = $("#" + V.id.popup_insertion_point);

	$("#" + V.id.popup_ex_name).text(chrome.runtime.getManifest().name);

	// ============================
	//        refresh button
	//  does not need connection
	// ============================

	$("#" + V.id.popup_refresh_button).click(async function() {
		const canvasTabs = await getCanvasTabs();
		const reloadPromises = canvasTabs.map(tab => chrome.tabs.reload(tab.id));
		await Promise.all(reloadPromises);
		// TODO figure out how to reload the popup after the canvas tabs reload
		window.close();
	});

	// ============================
	//           page ping
	//  only continue if connected
	// ============================

	const startPing = $.now();

	try {
		const pingResp = await sendMessage<{pong: number}>(Message.Action.PING);
		console.log("page ping", pingResp.pong - startPing);
		BODY.addClass(V.cssClass.popup_connected);
	} catch (e) {
		BODY.addClass(V.cssClass.popup_loaded);
		return;
	}

	// ============================
	//        count unchecked
	//  show/enable jump button
	// ============================

	const uncheckedResp = await	sendMessage<{count: number}>(Message.Action.COUNT_UNCHECKED);

	if (uncheckedResp !== undefined) {
		if (uncheckedResp.count === 0)
			jumpButton.prop("disabled", true).attr("title", V.tooltip.popup_no_unchecked);

		jumpButton.parent().show();
	}

	// ============================
	//           states
	// generate and update switches
	// ============================

	const statePromises: Array<Promise<State>> =
		Object.keys(V.state).map(stateName => sendMessage<State>(new Message.GetState(stateName)));

	const states: State[] = await Promise.all(statePromises);

	for (const state of states) {

		const el = $(format(V.element.popup_state_switch, {name: state.name, desc: state.desc}));

		el.insertAfter(insertionPoint);
		componentHandler.upgradeElement(el.find("label").get(0));

		const inputEl = el.find("input").get(0) as HTMLInputElement;

		el.change(async function() {
			const newState = inputEl.checked;

			setMdlChecked(inputEl, !newState);
			inputEl.title = V.tooltip.waiting;
			inputEl.disabled = true;

			const setSuccess = messageCanvasTabs(new Message.SetState(state.name, newState));

			if (setSuccess) {
				setMdlChecked(inputEl, newState);
				inputEl.title = ""; // TODO state.long_desc ?
				inputEl.disabled = false;
			}
		});

		setMdlChecked(inputEl, state.active);
	}

	// ============================
	//        jump button
	//    init click handler
	// ============================

	jumpButton.click(async function() {
		await sendMessage<void>(Message.Action.JUMP_TO_FIRST_UNCHECKED);
		window.close();
	});

	// === finalization ===

	insertionPoint.remove();
	BODY.addClass(V.cssClass.popup_loaded);

});

/**
 * Send a message to the current Canvas page and waits for a response.
 *
 * @template T The type of the expected response to this message.
 * @param   {Message.Base} data The message data object to send, which will be received as a plain
 *                              object.
 * @returns {Promise<T>} A promise containing the response to this message.
 */
async function sendMessage<T>(data: Message.Base): Promise<T> {
	const activeTabs = await chrome.tabs.query({active: true, currentWindow: true});
	return chrome.tabs.sendMessage(activeTabs[0].id, data) as Promise<T>;
}

/**
 * Upate the checked status of a Material Design Light checkbox, which requires setting more than
 * just the 'checked' property.
 *
 * @param {HTMLInputElement} checkbox The checkbox element to update.
 * @param {boolean}          checked  The new checked status to give this checkbox.
 */
function setMdlChecked(checkbox: HTMLInputElement, checked: boolean) {
	$(checkbox)
		.prop("checked", checked)
		.parent()
		.toggleClass("is-checked", checked);
}
