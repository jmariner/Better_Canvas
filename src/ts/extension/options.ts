/**
 * Entry point for the Chrome extension options page. Only contains simple scripts to set up the
 * input and buttons for entering and testing the Canvas API acess token.
 *
 * Imports JS all libraries that the options page needs to run, like the Material Design Light
 * library that ensures everything consistently uses material design.
 */
import $ from "lib/jquery";
import "lib/material";
import "lib/chrome-extension-async";

import * as Utils from "../utils";
import { V } from "../vars";

/** Run everything on load using jQuery */
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

		const testData = await Utils.testToken(token);

		if (testData !== null) {
			nameEl.text("Welcome, " + testData.name);
			print("Token test passed. Saving token...");
		}
		else {
			error("Token test failed. Please check " +
				"that the token is correct and is still activated.");
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

		// TODO look into switching back to the canvas tab that brought the user to the
		// options page. also, figure out how to close the extensions page

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

// Expose the global variables and the Utils module to the global scope.
export { V, Utils };
