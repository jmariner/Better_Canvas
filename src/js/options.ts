/// <reference path="objects.ts" />
/// <reference path="vars.ts" />

V = Vars.VARS;
$(function() {

	const tokenEl = $("#token");
	const statusEl = $("#status");
	const saveEl = $("#save");

	chrome.storage.sync.get(V.misc.token_key, data => {
		if (data[V.misc.token_key])
			tokenEl.val(data[V.misc.token_key]);
	});

	saveEl.click(() => {
		const token = tokenEl.val();

		chrome.storage.sync.set({
			[V.misc.token_key]: token
		}, () => {
			if (chrome.runtime.lastError === undefined) {
				statusEl.text("Access token saved");
				setTimeout(window.close, 500);

				// TODO update the current canvas pages with the access token

			}
		});
	});

});