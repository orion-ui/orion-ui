import { reactive, ref, watch } from 'vue';
import { isEmpty, isNil } from 'lodash-es';
import 'cleave.js/src/addons/phone-type-formatter.i18n';
import SharedFieldSetupService from '../../Shared/SharedFieldSetupService';
import useCountry from 'services/CountryService';
import useValidation from 'services/ValidationService';

type Props = SetupProps<typeof OrionPhoneSetupService.props>
type VModelType = Nil<{
  phoneNumber: Nil<string>;
  phoneCountryCode: Nil<Orion.Country['code']>;
}>;

export type OrionPhoneEmit = {
  (e: 'focus', payload: FocusEvent): void;
  (e: 'blur', payload?: FocusEvent): void;
  (e: 'input', payload: VModelType): void;
  (e: 'change', val?: VModelType): void;
  (e: 'update:modelValue', payload: VModelType): void;
  (e: 'update:phoneNumber', payload?: string): void;
  (e: 'update:phoneCountryCode', payload?: Orion.Country['code']): void;
  (e: 'clear'): void;
}

export default class OrionPhoneSetupService extends SharedFieldSetupService<Props, VModelType> {
	static props = {
		...SharedFieldSetupService.props,
		// @doc props/mobile defines if the number is a mobile phone
		// @doc/fr props/mobile définit si le numéro correspond à un portable
		mobile: Boolean,
		// @doc props/type the type of the input
		// @doc/fr props/type type du champ
		type: {
			type: String,
			default: 'tel',
		},
		// @doc props/phoneNumber the phoneNumber string, isolated from its parent object
		// @doc/fr props/phoneNumber le numéro de téléphone, isolé de son objet parent
		phoneNumber: {
			type: String,
			default: undefined,
		},
		// @doc props/phoneCountryCode the country code string, isolated from its parent object
		// @doc/fr props/phoneCountryCode le code pays, isolé de son objet parent
		phoneCountryCode: {
			type: String,
			default: undefined,
		},
	};

	protected readonly emit: OrionPhoneEmit;
	readonly _country = ref<OrionSelect>();
	readonly _orionInput = ref<HTMLInputElement & OrionInput>();

	protected state = reactive({
		...this.sharedState,
		country: useCountry().getCountryByCode(this.lang.ORION_PHONE__DEFAULT_COUNTRY_CODE),
		phoneNumber: '',
	});

	protected get isFrPhone () {
		return this.vModel?.phoneCountryCode === 'FR' || this.props.phoneCountryCode === 'FR';
	}

	protected override get hasValue () {
		return (
			!isNil(this.vModel) &&
			!isEmpty(this.phoneNumberWithoutIndicatif) &&
			!isNil(this.state.phoneNumber)
		);
	}

	get countryList () {
		return useCountry().countries.toSorted((a, b) => a.name.localeCompare(b.name));
	}

	get country () { return this.state.country; }
	set country (val) {
		this.state.country = val;
		this.emit('update:phoneCountryCode', val?.code);
		this.setVModel();
	}

	get phoneNumber () { return this.state.phoneNumber; }
	set phoneNumber (val) {
		this.state.phoneNumber = this.sanitizePhoneNumber(val);
		this.emit('update:phoneNumber', this.state.phoneNumber);
		this.setVModel();
	}

	get vModel () { return this.props.modelValue as VModelType; }
	set vModel (val) {
		this.emit('update:modelValue', val);
		this.emit('input', val);
	}

	get cleaveOptions () {
		return {
			phone: true,
			phoneRegionCode: this.state.country?.code,
			prefix: `+${this.state.country?.areaCode ?? '33'} `,
		};
	}

	get phoneNumberWithoutIndicatif () {
		return this.state.phoneNumber ? this.state.phoneNumber.replace('+' + this.state.country?.areaCode, '') : null;
	}

	get showWarning () {
		return this.isFrPhone && this.hasValue && !this.isValid.value && this.isFocus;
	}

	get isValidCustom () {
		return useValidation().check(this.vModel, this.props.mobile ? 'phone:mobile' : 'phone');
	}

	get showState () {
		const validator = this.props.validation as Undef<Orion.Validation.Rule>;

		if (this.props.inheritValidationState !== undefined) {
			return this.props.inheritValidationState;
		}

		if (this.state.hasBeenFocus) {
			return !!validator || !!this.hasValue;
		} else {
			return validator?.showStatus ?? false;
		}
	}


	constructor (props: Props, emit: OrionPhoneEmit) {
		super(props, emit);
		this.emit = emit;

		watch(() => this.vModel?.phoneNumber, (val) => {
			if (val) {
				this.state.phoneNumber = this.sanitizePhoneNumber();
			}
		});

		watch(() => this.vModel?.phoneCountryCode, (val) => {
			if (val && val !== this.state.country?.code) {
				this.state.country = useCountry().getCountryByCode(val);
			}
		});

		watch(() => this.state.hasBeenFocus, (val) => {
			// reflect validation state changes from OrionPhone to embed input
			if (this._orionInput.value) {
				this._orionInput.value.setHasBeenFocus(val);
			}
		});
	}

	protected async onBeforeMount () {
		if (isNil(this.vModel)) {
			this.state.phoneNumber = '';
			this.state.country = useCountry().getCountryByCode(this.lang.ORION_PHONE__DEFAULT_COUNTRY_CODE);
		} else {
			if (this.vModel && (isEmpty(this.vModel.phoneCountryCode) || isNil(this.vModel.phoneCountryCode))) {
				this.vModel.phoneCountryCode = this.lang.ORION_PHONE__DEFAULT_COUNTRY_CODE;
				this.vModel.phoneNumber = '';
			}

			if (this.vModel.phoneCountryCode) {
				this.state.phoneNumber = this.sanitizePhoneNumber();
				this.state.country = useCountry().getCountryByCode(this.vModel.phoneCountryCode);
			}
		}
	}


	keydownGuard (e: KeyboardEvent) {
		if (this.isFrPhone) {
			if (this.state.phoneNumber === '+33' && e.key === '0') {
				e.preventDefault();
			}
		}

		const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
		const misc = ['Backspace', 'Delete'];

		const valueLength = this._orionInput.value?._input()?.value.length ?? 0;
		const selectionStart = this._orionInput.value?._input()?.selectionStart ?? 0;
		const selectionEnd = this._orionInput.value?._input()?.selectionEnd ?? 0;
		const selectionLength = selectionEnd - selectionStart;
		// const inputValueBeforeCursor = this._orionInput.value?._input()?.value.slice(0, selectionStart) ?? '';
		const inputValueAfterCursor = this._orionInput.value?._input()?.value.slice(selectionEnd) ?? '';
		const inputSelectionValue = this._orionInput.value?._input()?.value.slice(selectionStart, selectionEnd) ?? '';

		if (selectionStart === selectionEnd && selectionStart === valueLength && selectionLength === 0) return;

		if ([...numbers, ...misc].includes(e.key)) {
			setTimeout(() => {
				if (selectionLength === 0) {
					let targetSelection = e.key === 'Backspace' ? selectionStart - 1 : selectionStart;

					if (e.key === 'Delete' && /^\s/.test(inputValueAfterCursor)) {
						targetSelection++;
					}

					if (numbers.includes(e.key)) {
						targetSelection = /^\s/.test(inputValueAfterCursor)
							? selectionStart + 2
							: selectionStart + 1;
					}

					this._orionInput.value?._input()?.setSelectionRange(targetSelection, targetSelection);
				} else {
					let targetSelectionStart = selectionStart;
					let targetSelectionEnd = selectionEnd;

					if (numbers.includes(e.key)) {
						targetSelectionStart = /^\s/.test(inputSelectionValue)
							? selectionStart + 2
							: selectionStart + 1;

						targetSelectionEnd = targetSelectionStart;
					}

					if (misc.includes(e.key)) {
						targetSelectionEnd = targetSelectionStart;
					}

					this._orionInput.value?._input()?.setSelectionRange(targetSelectionStart, targetSelectionEnd);
				}
			}, 10);
		}
	}

	customSearch (x: Orion.Country, valueRechercher: string) {
		const display = `${x.name} +${x.areaCode}`;
		return (
			display.toLowerCase().indexOf(valueRechercher.toLowerCase()) !== -1
		);
	}

	sanitizePhoneNumber (phoneNumberToSanitize?: string) {
		const phoneNumber = phoneNumberToSanitize ?? this.vModel?.phoneNumber;

		if (this.isFrPhone && phoneNumber) {
			return phoneNumber.replace(/^(0|\+330)(\d+)/, '+33$2');
		}

		return phoneNumber ?? '';
	}

	setVModel () {
		let phoneNumber = this.state.phoneNumber as Nil<string>;
		let phoneCountryCode = this.state.country?.code as Nil<Orion.Country['code']>;

		if (phoneNumber === `+${this.state.country?.areaCode}`) {
			phoneNumber = this.props.clearToNull ? null : undefined;
			phoneCountryCode = this.props.clearToNull ? null : undefined;
		}

		this.vModel = {
			phoneNumber,
			phoneCountryCode,
		};
	}
}
