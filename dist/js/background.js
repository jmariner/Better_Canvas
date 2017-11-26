const URL_RULE = {
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
};

chrome.runtime.onInstalled.addListener(() => {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
		chrome.declarativeContent.onPageChanged.addRules([URL_RULE]);
	});
});

chrome.runtime.onMessage.addListener(requestData => {
	if (requestData.action === "open options") {
		chrome.runtime.openOptionsPage();
	}
});