/**
 * Includes several utility functions that serve various uses. Noteworthy functions include:
 * - Functions to get and send JSON data to and from the Canvas API.
 * - Functions dealing with the access token.
 * - Functions to manage and use the Tab API to get Canvas tabs.
 *
 * Also includes a local variable that stores the user's Canvas access token.
 */
import "lib/chrome-extension-async";
import Tab = chrome.tabs.Tab;

import { V } from "./vars";
import * as Message from "./message";

/** The user's access token for the Canvas API. Starts as 'null' when not set. */
let ACCESS_TOKEN: string = null;

/**
 * Check if the ACCESS_TOKEN global in this module is 'null', and if so, throw an error.
 * @throws Will throw an Error as described above.
 */
function checkToken(): void | never {
	if (ACCESS_TOKEN === null)
		throw new Error("Access token not set");
}

/**
 * Format a given URL by appending a query parameter to set the amount of items to request per page.
 *
 * @param {string} url          The URL to format.
 * @param {number} itemsPerPage The amount of items to request per page.
 */
function perPage(url: string, itemsPerPage: number) {
	return `${url}?per_page=${itemsPerPage}`;
}

/**
 * Parse a Response object into JSON, then into a plain object. This may require removing the prefix
 * 'while(1);' from the beginning of the JSON string before parsing.
 *
 * @template T The type of object to treat the JSON as.
 * @param {Response} resp The response object to parse.
 * @returns {Promise<T>} A promise containing the resulting object.
 */
async function parseJSONResponse<T>(resp: Response): Promise<T> {
	let json = await resp.text();
	json = json.replace("while(1);", "");

	return JSON.parse(json);
}

/**
 * Parse a format string, inserting the properties of the given object. Inserted properties should
 * be placed inside '{}', for example: "hello {foo} world!" with object {foo: "bar"} would result in
 * "hello bar world". Note that properties missing from the given object will be ignored in the
 * given string.
 *
 * @param {string} str The format string to use.
 * @param {object} obj The object to retrieve properties from.
 * @returns {string} The new string.
 */
export function format(str: string, obj: object): string {

	for (const key in obj) {
		if (obj.hasOwnProperty(key))
			str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), obj[key]);
	}

	return str;
}

/**
 * Get a value from a plain object associated with a key, or return a default value if it does not
 * exist in the object.
 *
 * @template T The value type of the given object.
 * @param {object}      obj The plain object to retrieve the value from.
 * @param {PropertyKey} key The key to attempt to get.
 * @param {T}           def The default value to return.
 * @returns {T}         The resulting value, matching the type of the default value.
 */
export function getOrDefault<T>(obj: object, key: PropertyKey, def: T): T {
	if (obj === undefined || obj[key] === undefined) return def;
	else return obj[key];
}

/**
 * Format a given URL by applying both the 'perPage' and 'format' functions to it. Uses the given
 * object for both of those functions combined. This also prefixes the URL with the Canvas API
 * prefix.
 *
 * @param {string} url       The starting URL to format, including format tokens.
 * @param {object}  formatObj A plain object with key-value pairs to pass to 'format', and an
 *                            optional 'perPage' property to pass to the 'perPage' function.
 */
export function formatUrl(url: string, formatObj?: {perPage?: number, [key: string]: any}) {

	if (formatObj !== undefined) {
		if (formatObj.perPage !== undefined)
			url = perPage(url, formatObj.perPage);
		url = format(url, formatObj);
	}

	return V.canvas.api.root_url + url;
}

/**
 * Retrieve a JSON object from the Canvas API.
 *
 * @template T The type of object to expect from the API.
 * @param {string} url The URL to send the request to.
 * @returns {Promise<T>} A promise containing the result of the request, treated as type T.
 */
export async function getJSON<T>(url: string): Promise<T> {

	checkToken();

	const resp = await fetch(url, {
		method: "GET",
		headers: new Headers({
			"Content-Type": "application/json",
			"Authorization": "Bearer " + ACCESS_TOKEN
		})
	} as RequestInit);

	if (resp.status === 404) {
		throw new Error("HTTP 404 error when getting JSON");
	}
	else if (resp.status === 401) {
		throw new Error("HTTP 401: access token invalid");
	}
	else {
		if (resp.status === 400)
			console.debug("400 error when getting JSON was OKAY");

		return parseJSONResponse<T>(resp);
	}

}

/**
 * Send data to the Canvas API.
 *
 * @param {string}      url  The URL to send data to.
 * @param {any[] | any} data The data to send.
 * @returns {Promise<boolean>} A Promise containing the success state of the request.
 */
export async function putData(url: string, data: any[] | any): Promise<boolean> {

	checkToken();

	const bodyData = {ns: V.canvas.api.namespace, data};
	const method = Array.isArray(data) && data.length > 0 || data !== undefined ? "PUT" : "DELETE";

	if (method === "DELETE")
		delete bodyData.data;

	const ops = {
		method,
		headers: new Headers({
			"Content-Type": "application/json",
			"Authorization": "Bearer " + ACCESS_TOKEN
		}),
		body: JSON.stringify(bodyData)
	} as RequestInit;

	const resp = await fetch(url, ops);

	if (!resp.ok || resp.status === 401) { // 401 unauthorized
		console.error(`Unable to ${method} data to ${url}. resp:`, JSON.stringify(resp));
		return false;
	}
	else {
		return true;
	}

}

/**
 * Edit a data array on the Canvas API by either adding or removing elements from it. Requests the
 * existing data using 'getJSON' and updates it using 'putData'.
 *
 * @param {string}  url    The API URL to use.
 * @param {boolean} append To append ('true') or subtract ('false') from the data array.
 * @param {any[]}   values The array of values to either add or subtract.
 * @returns {Promise<boolean>} A promise containing the success status of the request.
 */
export async function editDataArray(url: string, append: boolean, values: any[]): Promise<boolean> {

	const existingData: any[] = (
		// url is same for get/put
		await getJSON<{data: any[]}>(url)
	).data || [];

	let newArray;

	if (append) {
		newArray = existingData.concat(values);
	}
	else { // subtract from data array
		if (existingData.length === 0)
			return true;
		newArray = existingData.filter(val => !values.includes(val));
	}

	return putData(url, newArray);
}

/**
 * Test the access token by sending a simple request for the current users's data.
 *
 * @param {string} token The possible token to test.
 * @returns {Promise<object | null>} A promise containing an object with a 'name' property for the
 *                                   user's name, or 'null' if the test failed.
 */
export async function testToken(token: string): Promise<{name: string} | null> {

	let resp;
	let error = false;

	try {
		resp = await fetch(V.canvas.api.absolute_url + "users/self", {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token
			})
		} as RequestInit);

		if (resp.status === 401) // unauthorized
			return null;
		else if (!resp.ok)
			error = true;
		else
			return parseJSONResponse<{name: string}>(resp);
	} catch (e) {
		error = true;
	}

	if (error)
		throw new Error("Problem occurred when testing access token.");
}

/**
 * Pause for a given amount of milliseconds. This should be called using 'await'.
 *
 * @param {number} ms The amount of milliseconds to pause for.
 */
export async function wait(ms: number) {
	await new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

/**
 * Try to load the token from the Chrome sync storage.
 */
export async function loadToken() {
	const resultData = await chrome.storage.sync.get(V.misc.token_key);

	const success = ACCESS_TOKEN !== null || resultData[V.misc.token_key];

	if (success) ACCESS_TOKEN = resultData[V.misc.token_key];
	else throw new Error("Access token does not exist in storage.");

}

/**
 * Prompt the user to open the extension's options page, and open it if the users answered 'OK'.
 */
export function accessTokenPrompt() {
	const openOptions = confirm("Missing access token, press OK to open extension options");
	if (openOptions) // TODO send tab ID with this message?
		chrome.runtime.sendMessage(Message.Action.OPEN_OPTIONS);
}

/**
 * Retrieve any existing Canvas tabs, optionally requiring that a specific course be open.
 *
 * @param {number} courseId The optional course ID to look for.
 * @returns {Promise<Tab[]>} A promise containing an array of found Canvas tabs.
 */
export async function getCanvasTabs(courseId?: number): Promise<Tab[]> {
	if (chrome.tabs === undefined)
		throw new Error("Unable to query tabs from content script.");

	const query = {
		url: [
			V.canvas.url_parts.protocol,
			"://",
			V.canvas.url_parts.host,
			V.canvas.url_parts.prefix,
			courseId === undefined ? "*" : courseId,
			V.canvas.url_parts.suffix,
			"*"
		].join("")
	};

	return chrome.tabs.query(query);
}

/**
 * Send a message to all existing Canvas tabs, optionally looking for a course ID or excluding a
 * single tab.
 *
 * @param {Message.Base}    msg        A Message object to send. Note that this becomes JSON and
 *                                     loses any special properties.
 * @param {number}          courseId   An optional course ID to look for.
 * @param {chrome.tabs.Tab} excludeTab An optional tab to exclude sending a message to.
 */
export async function messageCanvasTabs(msg: Message.Base, courseId?: number, excludeTab?: Tab) {

	let canvasTabs = await getCanvasTabs(courseId);

	if (excludeTab !== undefined)
		canvasTabs = canvasTabs.filter(tab => tab.id !== excludeTab.id);

	if (canvasTabs.length > 0)
		await Promise.all(canvasTabs.map(tab => chrome.tabs.sendMessage(tab.id, msg)));
}
