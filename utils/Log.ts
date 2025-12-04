import { isReactive, isRef, toRaw, unref } from 'vue';

/* eslint-disable no-console */
export class Log {
	static info (payload: any, title?: string): void {
		console.log(`%c${title ?? 'INFO'} ➤`, 'color:#198CFF; font-weight:600', this.convertData(payload));
	}

	static success (payload: any, title?: string): void {
		console.log(`%c${title ?? 'SUCCESS'} ➤`, 'color:#00d883; font-weight:600', this.convertData(payload));
	}

	static warn (payload: any, title?: string): void {
		console.log(`%c${title ?? 'WARN'} ➤`, 'color:#ff7043; font-weight:600', this.convertData(payload));
	}

	static error (payload: any, title?: string): void {
		console.log(`%c${title ?? 'ERROR'} ➤`, 'color:#ff0033; font-weight:600', this.convertData(payload));
	}

	static orion (message: string) {
		if (!import.meta.env.PROD) {
			console.log(`%c🥨 ORION ➤`, 'color:#d5742c; font-weight:600', message);
		}
	}

	private static convertData (payload: any) {
		if (isRef(payload)) {
			return unref(payload);
		} else if (isReactive(payload) && typeof payload === 'object') {
			return toRaw(payload);
		}

		return payload;
	}
}
