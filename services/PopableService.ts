import { devtool } from 'devtool';
import { orionAppInstance } from 'utils/OrionAppInstance';
import { getUid } from 'utils/tools';
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
		if (!devtool || !orionAppInstance) return;

		if (vnode.component?.uid && orionAppInstance.appInstance) {
			vnode.component.parent = orionAppInstance.appInstance;
			vnode.component.root = orionAppInstance.appInstance;

			devtool.on.visitComponentTree((payload: any) => {
				// Add custom type to the treeNode
				type CustomComponentTreeNode = typeof payload.treeNode & { orionUid: number }

				if (payload.treeNode.uid === orionAppInstance?.appInstance?.uid && vnode.component?.uid) {
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
		if (!devtool || !orionAppInstance) return;

		const allInstances = await devtool.getComponentInstances(orionAppInstance.app);
		const instance = allInstances?.find((x: any) => x.uid === targetUid);
		devtool?.notifyComponentUpdate(instance);
	}


  abstract createVNode (): T
}
