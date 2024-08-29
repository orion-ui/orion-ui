import SharedSetupService from '../../Shared/SharedSetupService';
import { reactive, ref } from 'vue';

export type OrionOtpEmits = { (e: 'filled', val: string): void }
export type OrionOtpProps = {
	// @doc props/dataType defines the type of the code
	// @doc/fr props/dataType definit le type du code
	dataType: 'number' | 'text',
	// @doc props/readonly if set, the code will be on read-only mode
	// @doc/fr props/readonly si défini, le code sera en mode read-only
	readonly: boolean,
	// @doc props/size defines the size of the code
	// @doc/fr props/size définit la taille du code
	size: number,
	// @doc props/value the string value of the code, if it is prefilled
	// @doc/fr props/value valeur du code sous forme de chaîne de caractères, s'il est pré-rempli
	value: string,
};

type Code = {[key: number]: string }
export default class OrionOtpSetupService extends SharedSetupService {
	static readonly defaultProps = {
		dataType: 'text' as OrionOtpProps['dataType'],
		readonly: false,
		size: 4,
	};

	readonly _inputs = ref<OrionInput[]>();

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

	get publicInstance () {
		return {
			...super.publicInstance,
			reset: this.reset.bind(this),
			focus: this.focus.bind(this),
			code: () => this.code,
			readableCode: () => this.readableCode,
		};
	}


	constructor (protected props: OrionOtpProps, protected emits: OrionOtpEmits) {
		super();
	}

	onMounted () {
		if (this.props.value) {
			this.splitCodeFromString(this.props.value, 1);
		}
	}

	splitCodeFromString (value: string, index: number) {

		const array = value.split('');
		for (let i=0; i<this.props.size; i++) {
			this.state.code[i+1] = array[i];
		}

		if (!this._inputs.value) return;

		if (value.length >= this.props.size) {
			this._inputs.value[index-1].blur();
			this.validate();
		} else {
			this._inputs.value[this.props.size-1].focus();
		}
	}

	handleInput (payload: any, index: number) {
		if (!this._inputs.value) return;

		if (payload.length > 1)
			this.splitCodeFromString(payload, index);
		else if (payload) {
			if (index < this.props.size) {
				this._inputs.value[index].focus();
			} else if (index === this.props.size) {
				if (!this.state.validated) {
					this.validate();
					this.state.validated = !this.state.validated;
				}
				this._inputs.value[index-1].blur();
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
