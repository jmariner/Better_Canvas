import $ from "../lib/jquery";
import "../lib/material";
import "../lib/chrome-extension-async";

import { V } from "./vars";
import { testToken } from "./utils";

$(async function() {

	const [tokenEl, statusEl, nameEl, saveEl, closeEl] =
		[$("#token"), $("#status"),	$("#name"),	$("#save"),	$("#close")];

	const KEY = V.misc.token_key;

	const getResp: {[key: string]: string} = await chrome.storage.sync.get(KEY);

	if (getResp[KEY]) {
		tokenEl.val(getResp[KEY]);
		tokenEl.parent().focus().addClass("is-dirty");
	}
	else {
		saveEl.attr("disabled", "");
	}

	tokenEl.on("input", function() {
		const empty = (tokenEl.val() as string).length === 0;
		saveEl.attr("disabled", empty ? "" : null);
	});

	saveEl.click(async function() {
		const token = tokenEl.val() as string;

		// disable close button until done
		closeEl.attr("disabled", "");

		print("Testing token...");

		const testData = await testToken(token);

		if (testData !== null) {
			nameEl.text("Welcome, " + testData.name);
			print("Token test passed. Saving token...");
		}
		else {
			error("Token test failed. Please check that the token is correct and is still activated.");
			closeEl.attr("disabled", null);
			return;
		}

		try {
			await chrome.storage.sync.set({ [KEY]: token });
		}
		catch (e) {
			error("Unable to save token to Chrome sync storage.");
			closeEl.attr("disabled", null);
			throw new Error("Failed to save token to storage.");
		}

		closeEl.attr("disabled", null);

		print("Access token saved.");

		// TODO update the current canvas pages with the access token
		// for this, add a button "Return to Canvas" that switches back to the Canvas tab
		// don't think it's possible to also close the extensions page while doing this, though
	});

	closeEl.click(() => window.close());

	function print(text: string) {
		statusEl.removeClass("error").text(text);
	}

	function error(text: string) {
		statusEl.addClass("error").text(text);
		nameEl.html("&nbsp");
	}

});
