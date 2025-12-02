import { reactive, ref } from 'vue';
import anime from 'animejs';
import SharedPopableSetupService, { SharedPopableSetupServiceProps, SharedPopableSetupServiceEmits } from '../../Shared/SharedPopableSetupService';
import { orionAppServiceSingleton } from 'utils/Orion';

export type OrionModalEmits = SharedPopableSetupServiceEmits & {
	(e: 'cancel'): void;
	(e: 'confirm'): void;
}
export type OrionModalProps = SharedPopableSetupServiceProps & {
	// @doc props/display if set, displays the component
	// @doc/fr props/display si défini, affiche le composant
	display?: boolean,
	// @doc props/options options of the modal
	// @doc/fr props/options options de la modal
	options?: Partial<Orion.Modal.Options>,
};

export default class OrionModalSetupService extends SharedPopableSetupService {
	static readonly defaultProps = { ...SharedPopableSetupService.defaultProps };

	protected name = 'OrionModal' as const;


	readonly _prompt = ref<RefDom>();

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

	get slotFooter () { return `#OrionModal-${this.uid}__footer`;}

	get publicInstance () {
		return {
			...super.publicInstance,
			slotFooter: this.slotFooter,
		};
	}


	constructor (
		protected props: OrionModalProps & Omit<typeof OrionModalSetupService.defaultProps, 'options'> & {options: Partial<Orion.Popable.Options>},
		protected emits: OrionModalEmits) {
		super(props, emits);

		Object.assign(this.options, props.options);
	}


	async animateAsync (enter: boolean) {
		return new Promise<void>(async (resolve) => {
			if (enter) {
				this.state.visible = true;

				await orionAppServiceSingleton.popableAnimationHooks.modalEnterBefore?.(this.publicInstance);

				anime({
					targets: this._el.value,
					opacity: [0, 1],
					translateY: [-300, 0],
					duration: 600,
					easing: 'easeOutCubic',
					begin: async () => {
						await orionAppServiceSingleton.popableAnimationHooks.modalEnterStart?.(this.publicInstance);
						this.emits('enter-start');
						this.trigger('enter-start');
					},
					complete: async () => {
						await orionAppServiceSingleton.popableAnimationHooks.modalEnterEnd?.(this.publicInstance);
						resolve();
						this.promptAutoFocus();
						this.emits('enter-end');
						this.trigger('enter-end');
					},
				});
			} else {
				await orionAppServiceSingleton.popableAnimationHooks.modalLeaveBefore?.(this.publicInstance);

				anime({
					targets: this._el.value,
					opacity: 0,
					translateY: 300,
					duration: 300,
					easing: 'easeOutCubic',
					begin: async () => {
						await orionAppServiceSingleton.popableAnimationHooks.modalLeaveStart?.(this.publicInstance);
						this.emits('leave-start');
						this.trigger('leave-start');
					},
					complete: async () => {
						this.state.visible = false;
						await orionAppServiceSingleton.popableAnimationHooks.modalLeaveEnd?.(this.publicInstance);
						resolve();
						this.emits('leave-end');
						this.trigger('leave-end');
					},
				});
			}
		});
	}

	handlePromptEnter (e: KeyboardEvent) {
		if (this.prompt?.type === 'input' || this.prompt?.type === 'password') {
			e.preventDefault();
			this.emits('confirm');
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
