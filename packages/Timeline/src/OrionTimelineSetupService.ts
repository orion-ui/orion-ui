import { Component, reactive, ref, Slots, VNode, watch } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import { isDefineOrTrue } from 'utils/tools';
import { isArray } from 'lodash-es';

type Props = SetupProps<typeof OrionTimelineSetupService.props>
type TimelineEmit = {
	(e: 'input', payload: string | number): void
	(e: 'pill-click', ...payload: [OrionTimelinePane, MouseEvent]): void
	(e: 'update:modelValue', payload: string | number): void
}

export default class OrionTimelineSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/horizontal the orientation of the component
		// @doc/fr props/horizontal l'orientation du composant
		horizontal: Boolean,
		// @doc props/scrollable displays an horizontal scroll on the timeline pills if it does not fit in its container
		// @doc/fr props/scrollable affiche un scroll horizontal au niveau de la timeline si elle dépasse de son conteneur.
		scrollable: Boolean,
		// @doc props/modelValue the model value
		// @doc/fr props/modelValue le modelValue
		modelValue: {
			type: [String, Number],
			default: undefined,
		},
		// @doc props/loader displays a loader on the timeline
		// @doc/fr props/loader affiche un loader sur la timeline
		loader: {
			type: [String, Boolean],
			default: undefined,
		},
	};

	_loader = ref<OrionLoader>();
	private slots: Slots;
	private emit: TimelineEmit;
	private state = reactive({
		current: this.props.modelValue,
		panes: [] as Orion.Private.TsxTimelinePane[],
	});

	private get content () {
		return this.slots.default?.();
	}

	get panes () {
		return this.state.panes;
	}

	get current () {
		return this.state.current;
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			_loader: () => this._loader.value,
			panes: this.state.panes as Orion.Private.TsxTimelinePane[],
			getValue: () => this.props.modelValue,
			getCurrent: () => this.state.current,
			setCurrent: this.setCurrent.bind(this),
		};
	}


	constructor (props: Props, slots: Slots, emit: TimelineEmit) {
		super(props);
		this.slots = slots;
		this.emit = emit;

		watch(() => this.props.modelValue, (val) => {
			if (!!val) this.setOrigin(val);
		});

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
					if (!vnode) return false;
					// https://github.com/element-plus/element-plus/blob/dev/packages/tabs/src/tabs.vue#L115
					let type = vnode.type;
					type = (type as Component).name || type;

					return type === 'OrionTimelinePane';
				});

			this.state.panes.push(...paneSlots.map((x) => {
				const pane = {
					props: x.props,
					children: x.children,
				} as Orion.Private.TsxTimelinePane;

				return pane;
			}));
		}
	}

	onPillClick (pane: OrionTimelinePane, event: MouseEvent) {
		if (isDefineOrTrue(pane.disabled)) return;

		this.setCurrent(pane.name);
		this.emit('pill-click', pane, event);
	}

	setCurrent (name: string | number) {
		this.state.current = name;
	}

	private setOrigin (val: string | number) {
		this.emit('update:modelValue', val);
		this.emit('input', val);
		this.setCurrent(val);
	}
}
