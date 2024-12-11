import { Component, reactive, Slots, VNode, watch } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import { isArray } from 'lodash-es';
import type { OrionTourStepSetupService } from 'packages/TourStep';
import { Private } from 'lib/private';

export type OrionTourEmits = {}
export type OrionTourProps = {
	// @doc props/callback function executed when the tour is stopped
	// @doc/fr props/callback fonction exécutée quand le tour est arrêté
	callback?: Function,
	// @doc props/value current step index of the tour
	// @doc/fr props/value index courant du tour
	value?: number,
};

export default class OrionTourSetupService extends SharedSetupService {
	static readonly defaultProps = {};

	private slots: Slots;
	private state = reactive({
		steps: [] as Private.TsxTourStep[],
		tourStep: [] as Private.TsxTourStep[],
		currentIndex: -1,
		currentStepPublicInstance: undefined as Undef<OrionTourStepSetupService['publicInstance']>,
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

	get publicInstance () {
		return {
			...super.publicInstance,
			steps: this.state.steps,
			getCurrentIndex: () => this.state.currentIndex,
			setCurrent: this.setCurrent.bind(this),
			setCurrentStepPublicInstance: this.setCurrentStepPublicInstance.bind(this),
			start: (index = 0) => this.start(index),
			stop: () => this.stop(),
		};
	}

	constructor (protected props: OrionTourProps, protected emits: OrionTourEmits, slots: Slots) {
		super();
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

	setCurrentStepPublicInstance (instance: Undef<OrionTourStepSetupService['publicInstance']>) {
		this.state.currentStepPublicInstance = instance;
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
				const step = { props: x.props } as Private.TsxTourStep;
				return step;
			}));
		}
	}

	start (index = 0) {
		this.setCurrent(index);
		this.document?.documentElement.classList.add('ovf-h');
	}

	stop () {
		if (this.props.callback) {
			this.props.callback();
		}

		this.state.currentStepPublicInstance?.stop(true);
		this.document?.documentElement.classList.remove('ovf-h');
		this.setCurrent(-1);
	}
}
