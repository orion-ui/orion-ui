import { OrionNotif } from 'packages/Notif';
import { orionAppService } from 'utils/Orion';
import { h, render, unref } from 'vue';
import { useDocument } from './DocumentService';
import usePopableQueueService from './PopableQueueService';
import { PopableService } from './PopableService';

class NotifService extends PopableService<OrionNotif> {
	nameForDevtool = `OrionNotif`;

	constructor (options: Partial<Orion.Notif.Options>) {
		super({
			duration: 5,
			...options,
		});
	}

	createVNode () {
		const vnode = h(OrionNotif, { options: this.options });
		vnode.appContext = orionAppService.appContext;

		const container = useDocument()?.createElement('div');
		if (container) {
			container.id = `OrionNotif-wrapper-${this.options.uid}`;

			const popableWrapper = useDocument()?.getElementById('orion-popable-wrapper');
			if (popableWrapper) {
				popableWrapper.appendChild(container);
			} else {
				useDocument()?.body.appendChild(container);
			}

			render(vnode, container);

			this.registerComponentInstanceInDevtool(vnode);
		}

		const instance = usePopableQueueService().getInstance(this.options.uid);
		return instance as OrionNotif;
	}

	static sanitizeOptions (payload: Partial<Orion.Notif.Options> | string, message?: string): Partial<Orion.Notif.Options> {
		if (typeof payload === 'string') {
			return {
				title: payload,
				message,
			};
		} else {
			return {
				...payload,
				message: message ?? unref(payload.message),
			};
		}
	}
}

const useNotif = {
	primary: (options: Partial<Orion.Notif.Options> | string, message?: string) => new NotifService({
		icon: 'info',
		...NotifService.sanitizeOptions(options, message),
		color: 'primary',
	}).createVNode(),
	info: (options: Partial<Orion.Notif.Options> | string, message?: string) => new NotifService({
		icon: 'info',
		...NotifService.sanitizeOptions(options, message),
		color: 'info',
	}).createVNode(),
	success: (options: Partial<Orion.Notif.Options> | string, message?: string) => new NotifService({
		icon: 'check_circle',
		...NotifService.sanitizeOptions(options, message),
		color: 'success',
	}).createVNode(),
	warning: (options: Partial<Orion.Notif.Options> | string, message?: string) => new NotifService({
		icon: 'warning_amber',
		...NotifService.sanitizeOptions(options, message),
		color: 'warning',
	}).createVNode(),
	danger: (options: Partial<Orion.Notif.Options> | string, message?: string) => new NotifService({
		icon: 'error',
		...NotifService.sanitizeOptions(options, message),
		color: 'danger',
	}).createVNode(),
};

export default useNotif;
