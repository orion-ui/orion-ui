import { reactive } from 'vue';
import type { OrionAsideSetupService, OrionModalSetupService, OrionNotifSetupService } from '../packages';

class PopableQueueService {
	private readonly _popables: Record<number, Orion.Popable.PublicIntance> = {};
	private readonly _queue = reactive({
		OrionAside: [] as OrionAsideSetupService['publicInstance'][],
		OrionModal: [] as OrionModalSetupService['publicInstance'][],
		OrionNotif: [] as OrionNotifSetupService['publicInstance'][],
		ids: [] as number[],
	});

	get queue () { return this._queue; }
	get queueIds () { return this._queue.ids; }
	get asideQueue () { return this._queue.OrionAside; }
	get modalQueue () { return this._queue.OrionModal; }
	get notifQueue () { return this._queue.OrionNotif; }

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

// @tree-shaking lazy initialization
let popableQueueServiceSingleton: PopableQueueService;

export function usePopableQueueService () {
	if (!popableQueueServiceSingleton) {
		popableQueueServiceSingleton = new PopableQueueService();
	}
	return popableQueueServiceSingleton;
}
