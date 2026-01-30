import { reactive } from 'vue';
import type { OrionAsideSetup, OrionModalSetup, OrionNotifSetup } from '../packages';

class PopableQueueService {

	private readonly _popables: Record<number, Orion.Popable.PublicIntance> = {};
	private readonly _queue = reactive({
		OrionAside: [] as OrionAsideSetup['publicInstance'][],
		OrionModal: [] as OrionModalSetup['publicInstance'][],
		OrionNotif: [] as OrionNotifSetup['publicInstance'][],
		ids: [] as number[],
	});

	get queue () { return this._queue }
	get queueIds () { return this._queue.ids }
	get asideQueue () { return this._queue.OrionAside }
	get modalQueue () { return this._queue.OrionModal }
	get notifQueue () { return this._queue.OrionNotif }

	register (uid: number, instance: Orion.Popable.PublicIntance) {
		this._popables[uid] = instance;
	}

	unregister (uid: number) {
		delete this._popables[uid];
	}

	getInstance (uid: number) {
		return this._popables[uid];
	}

}

const popableQueueServiceSingleton = new PopableQueueService();

export function usePopableQueue () {
	return popableQueueServiceSingleton;
}
