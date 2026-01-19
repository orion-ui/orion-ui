import anime from 'animejs';
import { Reactive } from 'utils';
import { ref, Slots } from 'vue';
import SharedPopableSetupService, { SharedPopableSetupServiceEmits, SharedPopableSetupServiceProps } from '../../Shared/SharedPopableSetupService';

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

	protected readonly name = 'OrionModal' as const;

	readonly _prompt = ref<RefDom>();

	@Reactive readonly options: Orion.Modal.Options = { ...this.baseOptions };

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
		protected emits: OrionModalEmits,
		protected slots: Slots,
	) {
		super(props, emits, slots);

		Object.assign(this.options, props.options);
	}


	async animateAsync (enter: boolean) {
		return new Promise<void>(async (resolve) => {
			if (enter) {
				this.state.visible = true;

				anime({
					targets: this._el.value,
					opacity: [0, 1],
					translateY: ['-200vh', '-50%'],
					duration: 600,
					easing: 'easeOutCubic',
					begin: async () => {
						this.emits('enter-start');
						this.trigger('enter-start');
					},
					complete: async () => {
						resolve();
						this.promptAutoFocus();
						this.emits('enter-end');
						this.trigger('enter-end');
					},
				});
			} else {
				anime({
					targets: this._el.value,
					opacity: 0,
					//translateY: '-100vh',
					translateY: ['-50%', '-100vh'],
					duration: 600,
					easing: 'easeOutCubic',
					begin: async () => {
						this.emits('leave-start');
						this.trigger('leave-start');
					},
					complete: async () => {
						this.state.visible = false;
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
