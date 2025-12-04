import { useDocument } from 'services/DocumentService';
import { useWindow } from 'services/WindowService';
import { getUid } from './uid';

type EventEntry = {
  type: string;
  callback: EventListenerOrEventListenerObject;
	target: 'document' | 'window';
}

// @tree-shaking lazy initialization
let eventsRegistry: Record<number, EventEntry> | undefined;

export function toggleGlobalListener (
	type: string | number,
	callback?: EventListenerOrEventListenerObject,
	params?: (boolean | AddEventListenerOptions) & { uid?: number, target?: EventEntry['target'] },
) {
	if (!eventsRegistry) {
		eventsRegistry = {};
	}

	const uid = params?.uid ?? getUid();
	const target = params?.target ?? 'document';

	if (typeof type === 'string' && !!callback) {
		eventsRegistry[uid] = {
			type,
			callback,
			target,
		};

		if (target === 'document') {
			useDocument()?.addEventListener(type, callback, params);
		} else {
			useWindow()?.addEventListener(type, callback, params);
		}
		return uid;
	} else if (typeof type === 'number') {
		if (!eventsRegistry[type]) return;

		if (eventsRegistry[type].target === 'document') {
			useDocument()?.removeEventListener(eventsRegistry[type].type, eventsRegistry[type].callback);
		} else {
			useWindow()?.removeEventListener(eventsRegistry[type].type, eventsRegistry[type].callback);
		}
		return type;
	}
}
