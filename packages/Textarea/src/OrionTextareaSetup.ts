import { type ModelRef, nextTick, ref } from 'vue';
import { SharedFieldSetup, type SharedFieldSetupEmits, type SharedFieldSetupProps } from '../../Shared/SharedFieldSetup';

export type OrionTextareaEmits = SharedFieldSetupEmits<Nil<string>> & {
	// @doc event/submit/desc emitted when the enter key is pressed
	// @doc/fr event/submit/desc émis lorsque la touche `entrée` est appuyée
	(e: 'submit', payload: Nil<string>): void
};

export type OrionTextareaProps = SharedFieldSetupProps & {
	// @doc props/maxLength maximal length of the input
	// @doc/fr props/maxLength taille maximale de l'entrée
	maxLength?: number
	// @doc props/showLength show input's value length
	// @doc/fr props/showLength affiche le nombre de caractères
	showLength?: boolean
};

export class OrionTextareaSetup extends SharedFieldSetup<OrionTextareaProps, string | null | undefined> {

	static readonly defaultProps = { ...SharedFieldSetup.defaultProps };

	_input = ref<HTMLInputElement & HTMLTextAreaElement>();
	private _modal?: OrionModal;
	private _aside?: OrionAside;

	constructor (
		protected props: OrionTextareaProps & typeof OrionTextareaSetup.defaultProps,
		protected emits: OrionTextareaEmits,
		protected vModel: ModelRef<Nil<string>>,
		_modal?: OrionModal,
		_aside?: OrionAside) {
		super(props, emits, vModel);
		this._modal = _modal;
		this._aside = _aside;
	}

	protected onMounted () {
		super.onMounted();
		this.setTextareaHeight();

		this.Bus.on('orion:settextareaheight', this.setTextareaHeight.bind(this));

		nextTick(() => {
			if (this._aside) this._aside.bus.on('enter-start', this.setTextareaHeight.bind(this));
			if (this._modal) this._modal.bus.on('enter-start', this.setTextareaHeight.bind(this));
		});
	}

	protected onUpdated () {
		this.setTextareaHeight();
	}

	private setTextareaHeight () {
		nextTick(() => {
			const input = this._input.value;
			if (input) {
				const minRows = 1;
				input.rows = minRows;
				const scrollHeight = input.scrollHeight;
				const rows = Math.ceil((scrollHeight - 40) / 20);
				input.rows = minRows + rows;
			}
		});
	}

}
