import { h, render } from 'vue';
import { PopableService } from './PopableService';
import { _popables } from 'packages/Shared/SharedPopableSetupService';
import { OrionModal } from 'packages/Modal';
import orionAppService from 'utils/Orion';
import useDocument from './DocumentService';

class ModalService extends PopableService<OrionModal> {
	constructor (options: Partial<Orion.Modal.Options>) {
		super(options);
	}

	createVNode () {
		const vnode = h(OrionModal, { options: this.options });
		vnode.appContext = orionAppService.appContext;

		const container = useDocument()?.createElement('div');
		if (container) {
			container.id = 'orion-modal-wrapper';
			useDocument()?.body.appendChild(container);
			render(vnode, container);
		}

		const instance = _popables[this.options.uid];
		return instance as OrionModal;
	}
}

export default function useModal (options: Partial<Orion.Modal.Options>) {
	return new ModalService(options).createVNode();
}
