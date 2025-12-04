import { h, render } from 'vue';

import { OrionAside } from 'packages/Aside';
import { orionAppInstance } from 'utils/OrionAppInstance';
import { useDocument } from './DocumentService';
import { usePopableQueueService } from './PopableQueueService';
import { PopableService } from './PopableService';

class AsideService extends PopableService<OrionAside> {
	nameForDevtool = `OrionAside`;

	constructor (options: Partial<Orion.Aside.Options>) {
		super(options);
	}

	createVNode () {
		const vnode = h(OrionAside, { options: this.options });
		if (orionAppInstance?.appContext) {
			vnode.appContext = orionAppInstance.appContext;
		}

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

export function useAside (options: Partial<Orion.Aside.Options>) {
	return new AsideService(options).createVNode();
}
