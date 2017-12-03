import "../lib/chrome-extension-async";
import MessageSender = chrome.runtime.MessageSender;

import * as Message from "./message";

const CANVAS_URL = {
	host: "ecpi.instructure.com",
	prefix: "/courses/",
	suffix: "/modules",
	protocol: "https"
};

const RULES = [
	{
		conditions: [
			new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {
					hostEquals: CANVAS_URL.host,
					pathPrefix: CANVAS_URL.prefix,
					pathSuffix: CANVAS_URL.suffix,
					schemes: [CANVAS_URL.protocol]
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
		syncMessage(src, data, new Message.UpdateCheckbox(data.itemId)).then(respond);
		return true;
	}
	else if (msg.type === Message.Type.SYNC_HIDDEN) {
		const data = msg as Message.SyncHidden;
		syncMessage(src, data, new Message.UpdateHidden(data.itemId)).then(respond);
		return true;
	}
	else {
		console.warn("Unknown message to chrome extension runtime:", msg);
	}

	respond(resp);
}

async function syncMessage(
		src: MessageSender,
		msgData: Message.SyncBase,
		outData: Message.UpdateBase
	) {

	const canvasTabs = await chrome.tabs.query({
		url: [
			CANVAS_URL.protocol,
			"://",
			CANVAS_URL.host,
			CANVAS_URL.prefix,
			msgData.courseId,
			CANVAS_URL.suffix,
			"*"
		].join("")
	});

	const msgPromises = canvasTabs
		.filter(tab => tab.id !== src.tab.id)
		.map(tab => chrome.tabs.sendMessage(tab.id, outData));

	await Promise.all(msgPromises);
}

chrome.runtime.onInstalled.addListener(onInstall);
chrome.runtime.onMessage.addListener(onMessage);
