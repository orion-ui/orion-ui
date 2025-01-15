import { reactive, ref, watch } from 'vue';
import { isEmpty, isNil } from 'lodash-es';
import 'cleave.js/src/addons/phone-type-formatter.i18n';
import SharedFieldSetupService from '../../Shared/SharedFieldSetupService';
import useCountry from 'services/CountryService';
import useValidation from 'services/ValidationService';
import { AsYouType, isValidPhoneNumber, validatePhoneNumberLength } from 'libphonenumber-js';
import useDynamicFlagService from 'services/DynamicFlagService';

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
		//@doc props/flag Allow to display or not the flag of the selected country
		//@doc/fr props/flag Permet d'afficher le drapeau du pays choisi
		flag: {
			type: Boolean,
			default: false,
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

	get phoneNumber () {
		// return this.state.phoneNumber;
		return new AsYouType(this.country?.code).input(this.state.phoneNumber);
	}

	set phoneNumber (val) {
		const sanitized = this.sanitizePhoneNumber(val);
		this.state.phoneNumber = sanitized.startsWith('+')
			? sanitized
			: this.indicatif + sanitized;
		this.emit('update:phoneNumber', this.state.phoneNumber);
		this.setVModel();
	}

	get vModel () { return this.props.modelValue as VModelType; }
	set vModel (val) {
		this.emit('update:modelValue', val);
		this.emit('input', val);
	}

	get phoneNumberWithoutIndicatif () {
		return this.state.phoneNumber ? this.state.phoneNumber.replace('+' + this.state.country?.areaCode, '') : null;
	}

	get showWarning () {
		return this.isFrPhone && this.hasValue && !this.isValid.value && this.isFocus;
	}

	get isValidCustom () {
		return isValidPhoneNumber(this.phoneNumber, this.country?.code);
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

	get src () { return useDynamicFlagService((this.country?.code ?? 'FR'));};

	get indicatif () { return `+${this.country?.areaCode}`.replace('-', ' ');};

	get publicInstance () {
		return {
			...super.publicInstance,
			_country: () => this._country.value,
			_orionInput: () => this._orionInput.value,
		};
	}


	constructor (props: Props, emit: OrionPhoneEmit) {
		super(props, emit);
		this.emit = emit;

		watch(() => this.vModel?.phoneNumber, (val) => {
			if (val) {
				this.state.phoneNumber = val;
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
			this.state.country = useCountry().getCountryByCode(this.lang.ORION_PHONE__DEFAULT_COUNTRY_CODE);
			this.state.phoneNumber += `+${this.state.country?.areaCode}`;
		} else {
			if (this.vModel && (isEmpty(this.vModel.phoneCountryCode) || isNil(this.vModel.phoneCountryCode))) {
				this.vModel.phoneCountryCode = this.lang.ORION_PHONE__DEFAULT_COUNTRY_CODE;
				this.state.phoneNumber += `+${this.state.country?.areaCode}`;
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
		const move = ['ArrowLeft', 'ArrowRight', 'Tab'];

		const validInput = [...numbers, ...misc, ...move];

		const inputElt = this._orionInput.value?._input();
		const valueLength = inputElt?.value.length ?? 0;
		const selectionStart = inputElt?.selectionStart ?? 0;
		const selectionEnd = inputElt?.selectionEnd ?? 0;
		const selectionLength = selectionEnd - selectionStart;
		const inputValueBeforeCursor = inputElt?.value.slice(0, selectionStart) ?? '';
		const inputValueAfterCursor = inputElt?.value.slice(selectionEnd) ?? '';
		const inputSelectionValue = inputElt?.value.slice(selectionStart, selectionEnd) ?? '';


		if (e.metaKey || e.ctrlKey) return;

		//Block input to everything except number, movement and delete
		if (!validInput.includes(e.key)) {
			e.preventDefault();
			return;
		}

		if (move.includes(e.key)) {
			return;
		}

		//Check if we try to delete the area code
		if (selectionStart <= this.indicatif.length && valueLength >= this.indicatif.length) {
			if (selectionLength === valueLength) {
				if (this.vModel)
					this.vModel.phoneNumber = undefined;
				return;
			}

			if (selectionStart < this.indicatif.length ||
				(selectionStart === this.indicatif.length && selectionStart === selectionEnd && e.key === 'Backspace')) {
				e.preventDefault();
				return;
			}
		}

		//The cursor is at the end
		if (selectionStart === valueLength) {
			const inputValueAfterKeydown = inputValueBeforeCursor + e.key;
			if (inputElt) {
				if ((!isValidPhoneNumber(inputElt.value, this.country?.code) || misc.includes(e.key))) {
					return;
				} else {
					if (!isValidPhoneNumber(inputValueAfterKeydown, this.country?.code)) {
						e.preventDefault();
					}
				}
			}
			return;
		}

		//The cursor is between two part
		if (selectionStart === selectionEnd) {
			const inputValueAfterKeydown = inputValueBeforeCursor + e.key
											+ (inputValueAfterCursor.startsWith(' ') ? inputValueAfterCursor.substring(1) : inputValueAfterCursor);

			if (inputElt) {
				if (!isValidPhoneNumber(inputElt.value, this.country?.code) || misc.includes(e.key)) {
					//return;
				} else {
					if (!isValidPhoneNumber(inputValueAfterKeydown, this.country?.code)) {
						const inputValueIfInsert = inputValueBeforeCursor + e.key
											+ (inputValueAfterCursor.startsWith(' ') ? inputValueAfterCursor.substring(2) : inputValueAfterCursor.substring(1));
						if (!isValidPhoneNumber(inputValueIfInsert, this.country?.code)) {
							e.preventDefault();
							return;
						}
						setTimeout(() => {
							this.phoneNumber = inputValueIfInsert.replace(/\s+/g, '');
						}, 10);
					}
				}
			}
		}

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

	sanitizePhoneNumber (phoneNumberToSanitize?: string) : string {
		phoneNumberToSanitize = phoneNumberToSanitize?.replaceAll('.', '');
		if (!phoneNumberToSanitize) {
			return '';
		}
		if (phoneNumberToSanitize && validatePhoneNumberLength(phoneNumberToSanitize.trim(), this.country?.code) === 'TOO_LONG') {
			while (validatePhoneNumberLength(phoneNumberToSanitize, this.country?.code) === 'TOO_LONG') {
				phoneNumberToSanitize = phoneNumberToSanitize?.slice(0, -1);
			}
			const inputValue = this._orionInput.value?._input();
			if (inputValue)
				inputValue.value = phoneNumberToSanitize;
			return phoneNumberToSanitize.replace(/\s*/g, '');
		}

		if (phoneNumberToSanitize && validatePhoneNumberLength(phoneNumberToSanitize.trim(), this.country?.code) === 'NOT_A_NUMBER') {
			if (validatePhoneNumberLength(this.phoneNumber, this.country?.code) !== 'NOT_A_NUMBER') {
				const inputValue = this._orionInput.value?._input();
				if (inputValue)
					inputValue.value = this.phoneNumber;
				return this.phoneNumber.replace(/\s*/g, '');
			}
		}

		let phoneNumber;
		if (!phoneNumberToSanitize?.startsWith(this.indicatif) && phoneNumberToSanitize?.startsWith('+')) {
			phoneNumber = phoneNumberToSanitize?.replace('+', this.indicatif);
		} else {
			phoneNumber = phoneNumberToSanitize ?? this.vModel?.phoneNumber;
		}

		if (phoneNumber) {
			phoneNumber = phoneNumber.replace(/\s*/g, '');
		}

		if (phoneNumber) {
			const regex = new RegExp(`^(0|\\${this.indicatif}0|\\${this.indicatif}\\${this.indicatif})(\\d+)`);
			const replaceRegex = `${this.indicatif}$2`;
			return phoneNumber.replace(regex, replaceRegex).replace(/\s*/g, '');
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

	changeAreaCode () {
		this.phoneNumber = this.indicatif;
	}

	handleMouseEvent (event: MouseEvent) {
		const input = (event.target as HTMLInputElement);
		event.preventDefault();
		input.focus();
		setTimeout(() => {
			input.setSelectionRange(3, 3);
		}, 10);
	}
}
