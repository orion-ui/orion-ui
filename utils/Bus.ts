import mitt from 'mitt';
import { Log } from './Log';

export const Bus = mitt();

export function logBusEvents () {
	// eslint-disable-next-line orion-rules/events-are-in-camel-case
	Bus.on('*', (type, e) => {
		Log.info(e, `Bus ~ ${type as string}`);
	});
}
