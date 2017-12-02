import "../lib/chrome-extension-async";
import MessageSender = chrome.runtime.MessageSender;

import { MessageData, MessageAction } from "./objects";

const RULES = [
	{
		conditions: [
			new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {
					hostEquals: "ecpi.instructure.com",
					pathPrefix: "/courses/",
					pathSuffix: "/modules",
					schemes: ["https"]
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

function onMessage(data: MessageData, source: MessageSender, respondFunc: (data?: any) => void) {
	if (data.action === MessageAction.OPEN_OPTIONS) {
		chrome.runtime.openOptionsPage();
		respondFunc();
	}
}

chrome.runtime.onInstalled.addListener(onInstall);
chrome.runtime.onMessage.addListener(onMessage);
