import { Component, ModelRef, reactive, ref, Slots, VNode, watch } from 'vue';
import { isArray } from 'lodash-es';
import { isDefineOrTrue } from 'utils/tools';
import SharedSetupService from '../../Shared/SharedSetupService';
import { Private } from 'lib/private';

export type OrionTabsEmits = {
	(e: 'tab-click', ...payload: [OrionTabPane, MouseEvent]): void
}

export type OrionTabsProps = {
	// @doc props/loader adds a loader on the tab
	// @doc/fr props/loader ajoute une icône de chargement sur l'onglet
	loader?: string | boolean,
	// @doc props/routerViewName the name of the `<router-view/>` when using `use-router` prop
	// @doc/fr props/routerViewName le nom du `<router-view/>` lors de l'utilisation de la prop `use-router`
	routerViewName?: string,
	// @doc props/useRouter connect the tabs to the router to bind active tab to current route and use `<router-view/>` component
	// @doc/fr props/useRouter connecte les tabs au router pour synchroniser la tab active avec la router actuelle et utiliser le composant `<router-view/>`
	useRouter?: boolean,


};

export default class OrionTabsSetupService extends SharedSetupService {
	static readonly defaultProps = {};

	_loader = ref<OrionLoader>();
	private slots: Slots;

	private state = reactive({ panes: [] as Private.TsxTabPane[] });

	private get content () {
		return this.slots.default?.();
	}

	get panes () {
		return this.state.panes;
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			_loader: () => this._loader.value,
			panes: this.state.panes as Private.TsxTabPane[],
			getValue: () => this.vModel?.value,
			useRouter: this.props.useRouter,
		};
	}


	constructor (protected props: OrionTabsProps, protected emits: OrionTabsEmits, slots: Slots, protected vModel?: ModelRef<string | undefined>) {
		super();
		this.slots = slots;


		watch(() => this.content, () => this.calcPaneInstances());
	}

	protected onMounted () {
		this.calcPaneInstances();
	}

	protected onUpdated () {
		this.calcPaneInstances();
	}


	private calcPaneInstances () {
		this.state.panes.length = 0;

		if (this.slots.default) {
			const paneSlots = this.slots.default()
				.map((vnode) => {
					// Handle Fragement created by v-for
					if (typeof vnode.type === 'symbol' && isArray(vnode.children)) {
						return vnode.children as VNode[];
					}
					return vnode;
				})
				.flat()
				.filter((vnode) => {
					// https://github.com/element-plus/element-plus/blob/dev/packages/tabs/src/tabs.vue#L115
					let type = vnode.type;
					type = (type as Component).name || type;

					return type === 'OrionTabPane';
				});

			this.state.panes.push(...paneSlots.map((x) => {
				const pane = {
					props: x.props,
					children: x.children,
				} as Private.TsxTabPane;

				return pane;
			}));
		}
	}

	onTabClick (pane: OrionTabPane, event: MouseEvent) {
		if (isDefineOrTrue(pane.disabled)) return;

		if (this.props.useRouter && this.router.currentRoute.value.name !== pane.name) {
			this.router.push({ name: pane.name });
		} else if (this.vModel?.value !== pane.name && this.vModel?.value) {
			this.vModel.value = pane.name;
		}

		this.emits('tab-click', pane, event);
	}
}
