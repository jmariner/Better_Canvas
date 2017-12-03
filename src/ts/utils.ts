import "../lib/chrome-extension-async";

import { V } from "./vars";
import * as Message from "./message";

let ACCESS_TOKEN: string = null;

function checkToken(): void | never {
	if (ACCESS_TOKEN === null)
		throw new Error("Access token not set");
}

function perPage(url: string, itemsPerPage: number) {
	return `${url}?per_page=${itemsPerPage}`;
}

async function parseJSONResponse(resp: Response) {
	let json = await resp.text();
	json = json.replace("while(1);", "");

	return JSON.parse(json);
}

export function format(str: string, obj: object): string {

	for (const key in obj) {
		if (obj.hasOwnProperty(key))
			str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), obj[key]);
	}

	return str;
}

export function getOrDefault<T>(obj: object, key: PropertyKey, def: T): T {
	if (obj === undefined || obj[key] === undefined) return def;
	else return obj[key];
}

export function formatUrl(url: string, formatObj?: {perPage?: number, [key: string]: any}) {

	if (formatObj !== undefined) {
		if (formatObj.perPage !== undefined)
			url = perPage(url, formatObj.perPage);
		url = format(url, formatObj);
	}

	return V.canvas.api.root_url + url;
}

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

		return parseJSONResponse(resp);
	}

}

export async function putData(url, data: any[] | any): Promise<boolean> {

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
			return parseJSONResponse(resp);
	} catch (e) {
		error = true;
	}

	if (error)
		throw new Error("Problem occurred when testing access token.");
}

export async function wait(ms: number) {
	await new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

export async function loadToken() {
	const resultData = await chrome.storage.sync.get(V.misc.token_key);

	const success = ACCESS_TOKEN !== null || resultData[V.misc.token_key];

	if (success) ACCESS_TOKEN = resultData[V.misc.token_key];
	else throw new Error("Access token does not exist in storage.");

}

export function accessTokenPrompt() {
	const openOptions = confirm("Missing access token, press OK to open extension options");
	if (openOptions) // TODO send tab ID with this message?
		chrome.runtime.sendMessage(Message.Action.OPEN_OPTIONS);
}

export async function messageCanvasTabs(
	msg: Message.Base,
	courseId?: number,
	excludeTab?: chrome.tabs.Tab
) {

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

	let canvasTabs = await chrome.tabs.query(query);

	if (excludeTab !== undefined)
		canvasTabs = canvasTabs.filter(tab => tab.id !== excludeTab.id);

	if (canvasTabs.length === 0)
		console.warn("No tabs found to send message to.", {query, msg});
	else
		await Promise.all(canvasTabs.map(tab => chrome.tabs.sendMessage(tab.id, msg)));
}
