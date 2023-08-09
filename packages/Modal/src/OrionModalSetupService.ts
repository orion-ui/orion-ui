import { PropType, reactive, ref } from 'vue';
import anime from 'animejs';
import SharedPopableSetupService, { PopableEmit } from '../../Shared/SharedPopableSetupService';
import orionAppService from 'utils/Orion';

type Props = SetupProps<typeof OrionModalSetupService.props>

type ModalEmit = PopableEmit & {
	(e: 'cancel'): void;
	(e: 'confirm'): void;
}

export default class OrionModalSetupService extends SharedPopableSetupService<Props> {
	static props = {
		...SharedPopableSetupService.props,
		// @doc props/options options of the modal
		// @doc/fr props/options options de la modal
		options: {
			type: Object as PropType<Partial<Orion.Modal.Options>>,
			default: () => {},
		},
	};

	protected name = 'OrionModal' as const;
	protected emit: ModalEmit;

	_prompt = ref<RefDom>();

	options = reactive<Orion.Modal.Options>({
		...this.baseOptions,
		title: null,
	});

	get promptFieldComponent () {
		if (this.prompt) {
			return `orion-${this.prompt.type}`;
		}
	}

	get prompt () { return this.options.prompt as Orion.Modal.Prompt;}

	get footerSlotId () { return `#OrionModal-${this.uid}__footer`;}

	get publicInstance () {
		return {
			...super.publicInstance,
			footerSlotId: this.footerSlotId,
		};
	}


	constructor (props: Props, emit: ModalEmit) {
		super(props);
		this.emit = emit;
		Object.assign(this.options, props.options);
	}


	async animateAsync (enter: boolean) {
		return new Promise<void>(async (resolve) => {
			if (enter) {
				this.state.visible = true;

				await orionAppService.popableAnimationHooks.modalEnterBefore?.(this.publicInstance);

				anime({
					targets: this._el.value,
					opacity: [0, 1],
					translateY: [-300, 0],
					duration: 600,
					easing: 'easeOutCubic',
					begin: async () => {
						await orionAppService.popableAnimationHooks.modalEnterStart?.(this.publicInstance);
						this.emit('enter-start');
						this.trigger('enter-start');
					},
					complete: async () => {
						await orionAppService.popableAnimationHooks.modalEnterEnd?.(this.publicInstance);
						resolve();
						this.promptAutoFocus();
						this.emit('enter-end');
						this.trigger('enter-end');
					},
				});
			} else {
				await orionAppService.popableAnimationHooks.modalLeaveBefore?.(this.publicInstance);

				anime({
					targets: this._el.value,
					opacity: 0,
					translateY: 300,
					duration: 300,
					easing: 'easeOutCubic',
					begin: async () => {
						await orionAppService.popableAnimationHooks.modalLeaveStart?.(this.publicInstance);
						this.emit('leave-start');
						this.trigger('leave-start');
					},
					complete: async () => {
						this.state.visible = false;
						await orionAppService.popableAnimationHooks.modalLeaveEnd?.(this.publicInstance);
						resolve();
						this.emit('leave-end');
						this.trigger('leave-end');
					},
				});
			}
		});
	}

	handlePromptEnter (e: KeyboardEvent) {
		if (this.prompt?.type === 'input' || this.prompt?.type === 'password') {
			e.preventDefault();
			this.emit('confirm');
			this.trigger('confirm');
		}
	}

	actionCallback (action: Partial<Orion.Modal.ActionsParams>) {
		if (typeof action.callback === 'function') {
			if (this.prompt) {
				action.callback(this.publicInstance, this.prompt);
			} else {
				action.callback(this.publicInstance);
			}
		}
	}

	promptAutoFocus () {
		if (this._prompt.value && this.prompt?.type) {
			this._prompt.value?.focus();
		}
	}
}
