import mitt from 'mitt';
import { Log } from './Log';

export const Bus = mitt();

export function logBusEvents () {
	Bus.on('*', (type, e) => {
		Log.info(e, `Bus ~ ${type as string}`);
	});
}
