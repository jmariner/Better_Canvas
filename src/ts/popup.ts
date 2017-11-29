import { V } from "./vars";
import { format } from "./utils";
import { MessageData, StateMessageData, State } from "./objects";
import "../scss/popup.scss";

declare const componentHandler;

$(async function() {

	const BODY = $("body");
	const jumpButton = $("#" + V.id.popup_jump_button);
	const insertionPoint = $("#" + V.id.popup_insertion_point);

	$("#" + V.id.popup_ex_name).text(chrome.runtime.getManifest().name);

	// ============================
	//           page ping
	//  only continue if connected
	// ============================

	const startPing = $.now();
	const pingResp = await sendMessage(new MessageData("ping"));

	if (pingResp !== undefined) {
		console.log("page ping", pingResp.pong - startPing);
		BODY.addClass(V.cssClass.popup_connected);
	}
	else {
		BODY.addClass(V.cssClass.popup_loaded);
		return;
	}

	// ============================
	//        count unchecked
	//  show/enable jump button
	// ============================

	const uncheckedResp = await	sendMessage(new MessageData("count unchecked"));

	if (uncheckedResp !== undefined) {
		if (uncheckedResp.count === 0)
			jumpButton.prop("disabled", true).attr("title", V.tooltip.popup_no_unchecked);

		jumpButton.parent().show();
	}

	// ============================
	//           states
	// generate and update switches
	// ============================

	const statePromises: Promise<State>[] =
		Object.keys(V.state).map(stateName => sendMessage(new StateMessageData("get", stateName)));

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

			const setSuccess = sendMessage(new StateMessageData("set", state.name, newState));

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
		await sendMessage(new MessageData("jump to first unchecked"));
		window.close();
	});

	// === finalization ===

	insertionPoint.remove();
	BODY.addClass(V.cssClass.popup_loaded);

});

async function sendMessage(data: MessageData): Promise<any> {
	const activeTabs = await chrome.tabs.query({active: true, currentWindow: true});
	return chrome.tabs.sendMessage(activeTabs[0].id, data);
}

function setMdlChecked(checkbox: HTMLInputElement, checked: boolean) {
	$(checkbox)
		.prop("checked", checked)
		.parent()
		.toggleClass("is-checked", checked);
}
