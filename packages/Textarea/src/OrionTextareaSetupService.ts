import SharedFieldSetupService, { FieldEmit } from '../../Shared/SharedFieldSetupService';
import { nextTick, ref } from 'vue';

type Props = SetupProps<typeof OrionTextareaSetupService.props>

export default class OrionTextareaSetupService extends SharedFieldSetupService<Props, string | null | undefined> {
	static props = {
		...SharedFieldSetupService.props,
		// @doc props/maxLength maximal length of the input
		// @doc/fr props/maxLength taille maximale de l'entrée
		maxLength: {
			type: Number,
			default: undefined,
		},
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
			this.emit(`update:modelValue`, value);
			this.emit('input', value);
		});
	}


	constructor (props: Props, emit: FieldEmit<string>, _modal?: OrionModal, _aside?: OrionAside) {
		super(props, emit);
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
				const minRows = 2;
				input.rows = 2;
				const rows = Math.ceil((input.scrollHeight - 60) / 20);
				input.rows = minRows + rows;
			}
		});
	}
}
