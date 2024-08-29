import SharedFieldSetupService, { SharedFieldSetupServiceEmits, SharedFieldSetupServiceProps } from '../../Shared/SharedFieldSetupService';
import { nextTick, ref } from 'vue';

export type OrionTextareaEmits = SharedFieldSetupServiceEmits<Nil<string>> & {}
export type OrionTextareaProps = SharedFieldSetupServiceProps & {
	// @doc props/maxLength maximal length of the input
	// @doc/fr props/maxLength taille maximale de l'entrée
	maxLength?: number,
	// @doc props/showLength show input's value length
	// @doc/fr props/showLength affiche le nombre de caractères
	showLength: boolean,
};

export default class OrionTextareaSetupService extends SharedFieldSetupService<OrionTextareaProps, string | null | undefined> {
	static readonly defaultProps = {
		...SharedFieldSetupService.defaultProps,
		showLength: false,
	};

	_input = ref<HTMLInputElement & HTMLTextAreaElement>();
	private _modal?: OrionModal;
	private _aside?: OrionAside;

	get vModel () {
		if (this.props.maxLength) {
			return (this.props.modelValue as string)?.slice(0, this.props.maxLength);
		}
		return this.props.modelValue as string;
	}

	set vModel (value) {
		this.handleInputDebounce(() => {
			this.emits(`update:modelValue`, value);
			this.emits('input', value);
		});
	}


	constructor (protected props: OrionTextareaProps, protected emits: OrionTextareaEmits, _modal?: OrionModal, _aside?: OrionAside) {
		super(props, emits);
		this._modal = _modal;
		this._aside = _aside;
	}


	protected onMounted () {
		super.onMounted();
		this.setTextareaHeight();

		this.Bus.on('Orion.setTextareaHeight', this.setTextareaHeight.bind(this));

		nextTick(() => {
			if (this._aside) this._aside.bus.on('enter-start', this.setTextareaHeight.bind(this));
			if (this._modal) this._modal.bus.on('enter-start', this.setTextareaHeight.bind(this));
		});
	}

	protected onUpdated () {
		this.setTextareaHeight();
	}


	setTextareaHeight () {
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
