/**
 * Entry point for the Chrome runtime background page. Only contains event listeners for
 * installtion, messages, and storage changes. The background page is used to connect the content
 * script to the other parts of the extension.
 */
import "lib/chrome-extension-async";
import MessageSender = chrome.runtime.MessageSender;

import * as Message from "../message";
import { V } from "../vars";
import { messageCanvasTabs } from "../utils";

/**
 * Chrome declarative content rule that allows the enabling and disabling of the page action when on
 * the Canvas modules page.
 */
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

/**
 * Function ran when extension is installed that sets up the declarative content rule described
 * above. This ensures the page action rule is always active.
 */
function onInstall() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
		chrome.declarativeContent.onPageChanged.addRules(RULES);
	});
}

/**
 * Chrome message handler that deals with all messages sent from the content script to the chrome
 * runtime.
 *
 * @param   {Message.Base}  msg The instance of a message type, which is received as a plain object
 *                              with no understanding of its class, so casting is required and
 *                              'instanceof' does not work.
 * @param   {MessageSender} src The source of this message, which in this case should be a tab
 *                              containing the content script.
 * @param   {(x?) => void}  respond The callback function used to respond to the message.
 * @returns {true | void} Must return 'true' when the callback function will be called
 *                        asychronously. Otherwise, does not return.
 */
function onMessage(msg: Message.Base, src: MessageSender, respond: (x?) => void): true | void {

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

/**
 * Chrome storage change handler, called whenever this extension's storage is altered. Used to
 * update the content scripts whenever the access token is updated in the sync storage.
 *
 * @param {object} changes A plain object, where keys are storage item keys and items are
 *                         StorageChange objects.-
 * @param {string} areaName The name of the storage area: either "sync" or "local". Only the "sync"
 *                          storage matters for this.
 */
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

// add all listeners to the chrome runtime
chrome.runtime.onInstalled.addListener(onInstall);
chrome.runtime.onMessage.addListener(onMessage);
chrome.storage.onChanged.addListener(onStorageChanged);
