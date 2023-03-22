import { Component, reactive, Slots, VNode, watch } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import { isArray } from 'lodash-es';

type Props = SetupProps<typeof OrionTourSetupService.props>

export default class OrionTourSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/value current step index of the tour
		// @doc/fr props/value index courant du tour
		value: {
			type: Number,
			default: undefined,
		},
		// @doc props/callback function executed when the tour is stopped
		// @doc/fr props/callback fonction exécutée quand le tour est arrêté
		callback: {
			type: Function,
			default: undefined,
		},
	};

	private slots: Slots;
	private state = reactive({
		steps: [] as Orion.Private.TsxTourStep[],
		currentIndex: -1,
		tourStep: [] as Orion.Private.TsxTourStep[],
	});

	private get content () {
		return this.slots.default?.();
	}

	get steps () {
		return this.state.steps;
	}

	get currentIndex () {
		return this.state.currentIndex;
	}

	set currentIndex (val) {
		this.state.currentIndex = val;
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			steps: this.state.steps,
			getCurrentIndex: () => this.state.currentIndex,
			setCurrent: this.setCurrent.bind(this),
			start: (index = 0) => this.start(index),
			stop: () => this.stop(),
		};
	}

	constructor (props: Props, slots: Slots) {
		super(props);
		this.slots = slots;

		watch(() => this.content, () => this.calcStepInstances());
	}

	protected onMounted () {
		this.calcStepInstances();
	}

	protected onUpdated () {
		this.calcStepInstances();
	}

	setCurrent (val: number) {
		this.state.currentIndex = val;
	}

	private calcStepInstances () {
		this.state.steps.length = 0;

		if (this.slots.default) {
			const stepSlots = this.slots.default()
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

					return type === 'OrionTourStep';
				});

			this.state.steps.push(...stepSlots.map((x) => {
				const step = { props: x.props } as Orion.Private.TsxTourStep;
				return step;
			}));
		}
	}

	start (index = 0) {
		this.currentIndex = index;
		this.document?.documentElement.classList.add('ovf-h');
	}

	stop () {
		if (this.props.callback)
			this.props.callback();

		this.document?.documentElement.classList.remove('ovf-h');
		this.currentIndex = -1;

	}
}
