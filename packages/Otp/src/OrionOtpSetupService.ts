import SharedSetupService from '../../Shared/SharedSetupService';
import { PropType, nextTick, reactive, ref, watch } from 'vue';

type Props = SetupProps<typeof OrionOtpSetupService.props>
type Emits = {(e: 'filled', val: string): void}
type Code = {[key: number]: string }

export default class OrionOtpSetupService extends SharedSetupService<Props> {
	static props = {
		readonly: Boolean,
		size: {
			type: Number,
			default: 4,
		},
		dataType: {
			type: String as PropType<'number' | 'text'>,
			default: 'text',
		},
		value: {
			type: String,
			default: undefined,
		},
	};

	readonly _inputs = ref<OrionInput[]>();

	private emits: Emits;
	private state = reactive({
		code: {} as Code,
		validated: false,
	});

	get code () { return this.state.code;}
	set code (val) { this.state.code = val;}

	get readableCode () {
		let result = '';
		Object.values(this.code).forEach(val => result += val);
		return result;
	}

	constructor (props: Props, emits: Emits) {
		super(props);
		this.emits = emits;

		watch(() => this.code[this.props.size], (val) => {
			if (val.length > 1) {
				this.code[this.props.size] = val[0];
			}
		});
	}

	onMounted () {
		if (this.props.value) {
			this.splitCodeFromString(this.props.value);
		}
	}

	splitCodeFromString (value: string) {
		const array = value.split('');
		array.forEach((char, index) => {
			if (index > this.props.size - 1) return;
			this.state.code[index+1] = char;
		});

		if (this._inputs.value)
			this._inputs.value[this.props.size-1].focus();
	}

	handleInput (payload: any, index: number) {
		if (!this._inputs.value || payload.length > 1) return;

		if (payload) {
			if (index < this.props.size) {
				this._inputs.value[index].focus();
			} else if (index === this.props.size) {
				if (!this.state.validated) {
					this.validate();
					this.state.validated = !this.state.validated;
				}
			}
		}
	}

	handleDelete (index: number) {
		if (!this._inputs.value) return;

		this.state.validated = false;
		if (!this.code[index] && index > 1) {
			this._inputs.value[index-2].focus();
		}
	}

	handlePaste (event: ClipboardEvent) {
		nextTick(() => {
			const text = event.clipboardData?.getData('text/plain').slice(0, this.props.size);
			if (text) {
				this.splitCodeFromString(text);
				this.validate();
			}
		});
	}

	validate () {
		this.emits('filled', this.readableCode);
	}

	reset () {
		Object.keys(this.code).forEach(key => this.state.code[Number(key)] = '');
		this.state.validated = false;
		this.focus();
	}

	focus () {
		if (!this._inputs.value) return;
		this._inputs.value[0].focus();
	}
}
