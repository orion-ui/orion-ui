import { ModelRef, reactive, ref, watch } from 'vue';
import { isEmpty, isNil } from 'lodash-es';
import 'cleave.js/src/addons/phone-type-formatter.i18n';
import SharedFieldSetupService, { SharedFieldSetupServiceEmits, SharedFieldSetupServiceProps } from '../../Shared/SharedFieldSetupService';
import useCountry from 'services/CountryService';
import useValidation from 'services/ValidationService';
import { AsYouType, isValidPhoneNumber, validatePhoneNumberLength } from 'libphonenumber-js';
import useDynamicFlagService from 'services/DynamicFlagService';

export type OrionPhoneEmits = SharedFieldSetupServiceEmits<VModelType> & {
	(e: 'focus', payload: FocusEvent): void;
  (e: 'blur', payload?: FocusEvent): void;
  (e: 'change', val?: VModelType): void;
  (e: 'clear'): void;
}

export type OrionPhoneProps = SharedFieldSetupServiceProps & {
	// @doc props/flag Allow to display or not the flag of the selected country
	// @doc/fr props/flag Permet d'afficher le drapeau du pays choisi
	flag: boolean,
	// @doc props/mobile defines if the number is a mobile phone
	// @doc/fr props/mobile définit si le numéro correspond à un portable
	mobile: boolean,
	// @doc props/type the type of the input
	// @doc/fr props/type type du champ
	type: string,
};

export type VModelType = Nil<{
  phoneNumber: Nil<string>;
  phoneCountryCode: Nil<Orion.Country['code']>;
}>;
export default class OrionPhoneSetupService extends SharedFieldSetupService<OrionPhoneProps, VModelType> {
	static readonly defaultProps = {
		...SharedFieldSetupService.defaultProps,
		flag: false,
		mobile: false,
		type: 'tel',
	};

	readonly _country = ref<OrionSelect>();
	readonly _orionInput = ref<HTMLInputElement & OrionInput>();

	protected state = reactive({
		...this.sharedState,
		country: useCountry().getCountryByCode(this.lang.ORION_PHONE__DEFAULT_COUNTRY_CODE),
		phoneNumber: '',
	});

	protected get isFrPhone () {
		return this.vModel.value?.phoneCountryCode === 'FR' || this.phoneCountryCode?.value === 'FR';
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
		if (this.phoneCountryCode?.value)
			this.phoneCountryCode.value = val?.code;
		this.setVModel();
	}

	get phoneNumberProxy () {
		return new AsYouType(this.country?.code).input(this.state.phoneNumber);
	}

	set phoneNumberProxy (val) {
		const sanitized = this.sanitizePhoneNumber(val);
		this.state.phoneNumber = sanitized.startsWith('+')
			? sanitized
			: this.indicatif + sanitized;
		this.phoneNumberProxy = this.state.phoneNumber;
		this.setVModel();
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

	get src () { return useDynamicFlagService((this.country?.code ?? 'FR'));};

	get indicatif () { return `+${this.country?.areaCode}`.replace('-', ' ');};

	get publicInstance () {
		return {
			...super.publicInstance,
			_country: () => this._country.value,
			_orionInput: () => this._orionInput.value,
		};
	}

	// @doc vModel/phoneCountryCode the country code string, isolated from its parent object
	// @doc/fr vModel/phoneCountryCode le code pays, isolé de son objet parent
	// @doc vModel/phoneNumber the phoneNumber string, isolated from its parent object
	// @doc/fr vModel/phoneNumber le numéro de téléphone, isolé de son objet parent
	constructor (
		protected props: OrionPhoneProps,
		protected emits: OrionPhoneEmits,
		protected vModel: ModelRef<VModelType>,
		protected phoneCountryCode?: ModelRef<string | undefined>,
		protected phoneNumber?: ModelRef<string | undefined>,
	) {
		super(props, emits, vModel);


		watch(() => this.vModel.value?.phoneNumber, (val) => {
			if (val) {
				this.state.phoneNumber = this.sanitizePhoneNumber();
			}
		});

		watch(() => this.vModel.value?.phoneCountryCode, (val) => {
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
		if (isNil(this.vModel.value)) {
			this.state.country = useCountry().getCountryByCode(this.lang.ORION_PHONE__DEFAULT_COUNTRY_CODE);
			this.state.phoneNumber += `+${this.state.country?.areaCode}`;
		} else {
			if (this.vModel.value && (isEmpty(this.vModel.value?.phoneCountryCode) || isNil(this.vModel.value.phoneCountryCode))) {
				this.vModel.value.phoneCountryCode = this.lang.ORION_PHONE__DEFAULT_COUNTRY_CODE;
				this.state.phoneNumber += `+${this.state.country?.areaCode}`;
			}

			if (this.vModel.value?.phoneCountryCode) {
				this.state.phoneNumber = this.sanitizePhoneNumber();
				this.state.country = useCountry().getCountryByCode(this.vModel.value.phoneCountryCode);
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
							this.phoneNumberProxy = inputValueIfInsert.replace(/\s+/g, '');
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
		if (phoneNumberToSanitize && validatePhoneNumberLength(phoneNumberToSanitize, this.country?.code) === 'TOO_LONG') {
			while (validatePhoneNumberLength(phoneNumberToSanitize, this.country?.code) === 'TOO_LONG') {
				phoneNumberToSanitize = phoneNumberToSanitize?.slice(0, -1);
			}
			const inputValue = this._orionInput.value?._input();
			if (inputValue)
				inputValue.value = phoneNumberToSanitize;
			return phoneNumberToSanitize.replace(/\s*/g, '');
		}

		if (phoneNumberToSanitize && validatePhoneNumberLength(phoneNumberToSanitize, this.country?.code) === 'NOT_A_NUMBER') {
			if (validatePhoneNumberLength(this.phoneNumberProxy, this.country?.code) !== 'NOT_A_NUMBER') {
				const inputValue = this._orionInput.value?._input();
				if (inputValue)
					inputValue.value = this.phoneNumberProxy;
				return this.phoneNumberProxy.replace(/\s*/g, '');
			}
		}

		let phoneNumber;
		if (!phoneNumberToSanitize?.startsWith(this.indicatif) && phoneNumberToSanitize?.startsWith('+')) {
			phoneNumber = phoneNumberToSanitize?.replace('+', this.indicatif);
		} else phoneNumber = phoneNumberToSanitize ?? this.vModel.value?.phoneNumber;

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

		this.vModel.value = {
			phoneNumber,
			phoneCountryCode,
		};
	}

	changeAreaCode () {
		if (this.phoneNumber?.value)
			this.phoneNumber.value = this.indicatif;
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
