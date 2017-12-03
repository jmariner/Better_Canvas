import "../lib/chrome-extension-async";
import MessageSender = chrome.runtime.MessageSender;

import * as Message from "./message";
import { V } from "./vars";
import { messageCanvasTabs } from "./utils";

const RULES = [
	{
		conditions: [
			new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {
					hostEquals: V.canvas.url_parts.host,
					pathPrefix: V.canvas.url_parts.prefix,
					pathSuffix: V.canvas.url_parts.suffix,
					schemes: [V.canvas.url_parts.protocol]
				}
			})
		],
		actions: [ new chrome.declarativeContent.ShowPageAction() ]
	}
];

function onInstall() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
		chrome.declarativeContent.onPageChanged.addRules(RULES);
	});
}

function onMessage(msg: Message.Base, src: MessageSender, respond: (x?) => void) {

	if (src.tab === undefined) return;

	let resp: any = null;

	if (msg.type === Message.Type.OPEN_OPTIONS) {
		chrome.runtime.openOptionsPage();
		resp = undefined;
	}
	else if (msg.type === Message.Type.SYNC_CHECKBOXES) {

		const data = msg as Message.SyncCheckboxes;

		messageCanvasTabs(
			new Message.UpdateCheckbox(data.itemId),
			data.courseId,
			src.tab
		).then(respond);

		return true;
	}
	else if (msg.type === Message.Type.SYNC_HIDDEN) {
		const data = msg as Message.SyncHidden;

		messageCanvasTabs(
			new Message.UpdateHidden(data.itemId),
			data.courseId,
			src.tab
		).then(respond);

		return true;
	}
	else {
		console.warn("Unknown message to chrome extension runtime:", msg);
	}

	respond(resp);
}

function onStorageChanged(
	changes: {[key: string]: chrome.storage.StorageChange},
	areaName: "sync" | "local"
) {

	const change = changes[V.misc.token_key];

	if (
		areaName === "sync" &&
		change !== undefined &&
		change.newValue !== change.oldValue &&
		change.newValue !== undefined
	) {
		messageCanvasTabs(Message.Action.RE_INITIALIZE);
	}
}

chrome.storage.onChanged.addListener(onStorageChanged);
chrome.runtime.onInstalled.addListener(onInstall);
chrome.runtime.onMessage.addListener(onMessage);
