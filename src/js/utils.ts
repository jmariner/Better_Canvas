import { V } from "./vars";
import { MessageData } from "./objects";

export default class Utils {

	private static ACCESS_TOKEN: string;

	static format(str: string, obj: object): string {

		for (const key in obj) {
			if (obj.hasOwnProperty(key))
				str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), obj[key]);
		}

		return str;
	}

	static getOrDefault<T>(obj: object, key: PropertyKey, def: T): T {
		if (obj === undefined || obj[key] === undefined) return def;
		else return obj[key];
	}

	static perPage(url: string, perPage: number) {
		return `${url}?per_page=${perPage}`;
	}

	static formatUrl(url: string, formatObj?: {perPage?: number, [key: string]: any}) {

		if (formatObj !== undefined) {
			if (formatObj.perPage !== undefined)
				url = Utils.perPage(url, formatObj.perPage);
			url = Utils.format(url, formatObj);
		}

		return V.canvas.api.root_url + url;
	}

	static async getJSON<T>(url: string): Promise<T> {

		Utils.checkToken();

		const resp = await fetch(url, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": "Bearer " + Utils.ACCESS_TOKEN
			})
		} as RequestInit);

		if (resp.status === 404) {
			throw new Error("404 error when getting JSON");
		}
		else {
			if (resp.status === 400)
				console.debug("400 error when getting JSON was OKAY");

			let json = await resp.text();
			json = json.replace("while(1);", "");

			return JSON.parse(json);
		}

	}

	static async putData(url, data: any[] | any): Promise<boolean> {

		Utils.checkToken();

		const bodyData = {ns: V.canvas.api.namespace, data};
		const method = data instanceof Array && data.length > 0 || data !== undefined ? "PUT" : "DELETE";

		if (method === "DELETE")
			delete bodyData.data;

		const ops = {
			method,
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": "Bearer " + Utils.ACCESS_TOKEN
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

	static async editDataArray(url: string, append: boolean, values: any[]): Promise<boolean> {

		const existingData: any[] = (
			// url is same for get/put
			await Utils.getJSON<{data: any[]}>(url)
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

		return Utils.putData(url, newArray);
	}

	static async wait(ms: number) {
		await new Promise(resolve => {
			setTimeout(resolve, ms);
		});
	}

	static checkToken(): void | never {
		if (Utils.ACCESS_TOKEN === null)
			throw new Error("Access token not set");
	}

	static async loadToken() {
		Utils.ACCESS_TOKEN = await new Promise<string>((resolve, reject) => {

			chrome.storage.sync.get(V.misc.token_key, resultData => {

				const success = Utils.ACCESS_TOKEN !== null || resultData[V.misc.token_key];
				if (success) resolve(resultData[V.misc.token_key]);
				else reject();

			});

		});
	}

	static accessTokenPrompt() {
		const openOptions = confirm("Missing access token, press OK to open extension options");
		if (openOptions) // TODO send tab ID with this message?
			chrome.runtime.sendMessage(new MessageData("open options"));
	}

	static runCb(callbackFunction: () => void) {
		if (callbackFunction !== undefined)
			callbackFunction();
	}

	static safeCb<F extends ((...args) => void)>(callbackFunction: F | undefined): F {
		if (callbackFunction !== undefined)
			return callbackFunction;
		else
			return (() => {}) as F; // tslint:disable-line:no-empty
	}

}
