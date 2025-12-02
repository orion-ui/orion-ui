import { h, render } from 'vue';
import { PopableService } from './PopableService';
import { OrionAside } from 'packages/Aside';
import { orionAppServiceSingleton } from 'utils/Orion';
import useDocument from './DocumentService';
import usePopableQueueService from './PopableQueueService';

class AsideService extends PopableService<OrionAside> {
	nameForDevtool = `OrionAside`;

	constructor (options: Partial<Orion.Aside.Options>) {
		super(options);
	}

	createVNode () {
		const vnode = h(OrionAside, { options: this.options });
		vnode.appContext = orionAppServiceSingleton.appContext;

		const container = useDocument()?.createElement('div');
		if (container) {
			container.id = `OrionAside-wrapper-${this.options.uid}`;

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
		return instance as OrionAside;
	}
}

export default function useAside (options: Partial<Orion.Aside.Options>) {
	return new AsideService(options).createVNode();
}
