import { devtool } from 'devtool';
import { getUid } from 'utils/tools';
import { orionAppServiceSingleton } from 'utils/Orion';
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
		if (vnode.component?.uid && orionAppServiceSingleton.appInstance) {
			vnode.component.parent = orionAppServiceSingleton.appInstance;
			vnode.component.root = orionAppServiceSingleton.appInstance;

			devtool?.on.visitComponentTree((payload: any) => {
				// Add custom type to the treeNode
				type CustomComponentTreeNode = typeof payload.treeNode & { orionUid: number }

				if (payload.treeNode.uid === orionAppServiceSingleton.appInstance?.uid && vnode.component?.uid) {
					(payload.treeNode.children as CustomComponentTreeNode[]).push({
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
		const allInstances = await devtool?.getComponentInstances(orionAppServiceSingleton.app);
		const instance = allInstances?.find((x: any) => x.uid === targetUid);
		devtool?.notifyComponentUpdate(instance);
	}


  abstract createVNode (): T
}
