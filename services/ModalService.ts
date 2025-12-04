import { h, render } from 'vue';

import { OrionModal } from 'packages/Modal';
import { orionAppService } from 'utils/Orion';
import { useDocument } from './DocumentService';
import usePopableQueueService from './PopableQueueService';
import { PopableService } from './PopableService';

class ModalService extends PopableService<OrionModal> {
	nameForDevtool = `OrionModal`;

	constructor (options: Partial<Orion.Modal.Options>) {
		super(options);
	}

	createVNode () {
		const vnode = h(OrionModal, { options: this.options });
		vnode.appContext = orionAppService.appContext;

		const container = useDocument()?.createElement('div');
		if (container) {
			container.id = `OrionModal-wrapper-${this.options.uid}`;

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
		return instance as OrionModal;
	}
}

export default function useModal (options: Partial<Orion.Modal.Options>) {
	return new ModalService(options).createVNode();
}
