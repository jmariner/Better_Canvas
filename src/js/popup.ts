/// <reference path="objects.ts" />
/// <reference path="vars.ts" />

declare const componentHandler;
const QUERY = {active: true, currentWindow: true};

$(function() {

V = Vars.VARS;
const BODY = $("body");
const jumpButton = $("#" + V.id.popup_jump_button);
const insertionPoint = $("#" + V.id.popup_insertion_point);

$("#" + V.id.popup_ex_name).text(chrome.runtime.getManifest().name);

Promise.resolve()

	.then(() => new Promise(next => {

		const startPing = $.now();

		sendMessage(new MessageData("ping"), resp => {
			if (resp !== undefined) {
				console.log("page ping", resp.pong - startPing);

				BODY.addClass(V.cssClass.popup_connected);
				next();
			}
			else {
				BODY.addClass(V.cssClass.popup_loaded);
			}
		});

	})).then(() => new Promise(next => {

		sendMessage(new MessageData("count unchecked"), resp => {
			if (resp !== undefined) {
				if (resp.count === 0)
					jumpButton.prop("disabled", true).attr("title", V.tooltip.popup_no_unchecked);
				next();
			}
		});

	})).then(() => new Promise(next => {

		let remaining = Object.keys(V.state).length;

		$.each(V.state, (stateName, stateData) => {
			sendMessage(new StateMessageData("get", stateName), resp => {

				console.debug("resp", resp);

				const el = $(Utils.format(V.element.popup_state_switch, {name: stateName, desc: stateData.desc}));

				el.insertAfter(insertionPoint);
				componentHandler.upgradeElement(el.find("label").get(0));

				const inputEl = el.find("input").get(0) as HTMLInputElement;

				el.change(() => {
					const newState = inputEl.checked;

					setMdlChecked(inputEl, !newState);
					inputEl.title = V.tooltip.waiting;
					inputEl.disabled = true;

					sendMessage(new StateMessageData("set", stateName, newState), msgSuccess => {
						console.debug("setResp", msgSuccess);
						if (msgSuccess) {
							setMdlChecked(inputEl, newState);
							inputEl.title = ""; // TODO state.long_desc ?
							inputEl.disabled = false;
						}
					});
				});

				setMdlChecked(inputEl, resp.state);

				if (--remaining === 0) next();

			});
		});

		jumpButton.click(() => {
			sendMessage(new MessageData("jump to first unchecked"), resp => window.close());
		});

	})).then(() => new Promise(next => {

		insertionPoint.remove();
		BODY.addClass(V.cssClass.popup_loaded);
		next();

	}));

});

function sendMessage(data: MessageData, callback?: (response: any) => void) {
	chrome.tabs.query(QUERY, tabs => chrome.tabs.sendMessage(tabs[0].id, data, callback));
}

function setMdlChecked(checkbox: HTMLInputElement, checked: boolean) {
	$(checkbox)
		.prop("checked", checked)
		.parent()
		.toggleClass("is-checked", checked);
}
