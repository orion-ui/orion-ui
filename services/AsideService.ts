import { h, render } from 'vue';
import { PopableService } from './PopableService';
import { _popables } from 'packages/Shared/SharedPopableSetupService';
import { OrionAside } from 'packages/Aside';
import orionAppService from 'utils/Orion';
import useDocument from './DocumentService';

class AsideService extends PopableService<OrionAside> {
	constructor (options: Partial<Orion.Aside.Options>) {
		super(options);
	}

	createVNode () {
		const vnode = h(OrionAside, { options: this.options });
		vnode.appContext = orionAppService.appContext;

		const container = useDocument()?.createElement('div');
		if (container) {
			container.id = 'orion-modal-wrapper';
			useDocument()?.body.appendChild(container);
			render(vnode, container);
		}

		const instance = _popables[this.options.uid];
		return instance as OrionAside;
	}
}

export default function useAside (options: Partial<Orion.Aside.Options>) {
	return new AsideService(options).createVNode();
}
