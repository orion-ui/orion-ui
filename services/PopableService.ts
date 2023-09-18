import { devtool } from 'devtool';
import { getUid } from 'utils/tools';
import orionAppService from 'utils/Orion';
import { VNode } from 'vue';

export abstract class PopableService<T> {
	abstract nameForDevtool: string;

	protected options: Partial<Orion.Popable.Options> & {
    openauto: boolean;
    programmatic: boolean;
    uid: number;
  };


	constructor (options: Partial<Orion.Aside.Options>) {
		this.options = {
			openauto: true,
			...options,
			programmatic: true,
			uid: getUid(),
		};
	}


	registerComponentInstanceInDevtool (vnode: VNode) {
		if (vnode.component?.uid && orionAppService.appInstance) {
			vnode.component.parent = orionAppService.appInstance;
			vnode.component.root = orionAppService.appInstance;

			devtool?.on.visitComponentTree((payload) => {
				if (payload.treeNode.uid === orionAppService.appInstance?.uid && vnode.component?.uid) {
					payload.treeNode.children.push({
						autoOpen: false,
						children: [],
						hasChildren: false,
						id: `${payload.app.__VUE_DEVTOOLS_APP_RECORD_ID__}:${vnode.component.uid}`,
						inactive: false,
						isFragment: false,
						name: this.nameForDevtool,
						renderKey: undefined as unknown as string,
						tags: [],
						uid: vnode.component?.uid,
						orionUid: this.options.uid,
					});

					setTimeout(() => {
						this.notifyPopableUpdate(vnode.component?.uid ?? 0);
					}, 100);
				}
			});
		}
	}

	async notifyPopableUpdate (targetUid: number) {
		const allInstances = await devtool?.getComponentInstances(orionAppService.app);
		const instance = allInstances?.find(x => x.uid === targetUid);
		devtool?.notifyComponentUpdate(instance);
	}


  abstract createVNode (): T
}
