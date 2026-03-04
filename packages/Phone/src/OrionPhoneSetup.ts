import parsePhoneNumberFromString, { AsYouType, isValidPhoneNumber } from 'libphonenumber-js/max';
import { isNil } from 'lodash-es';
import { useCountry } from 'services/CountryService';
import { useDynamicFlag } from 'services/DynamicFlagService';
import { type ModelRef, nextTick, reactive, ref } from 'vue';
import { SharedFieldSetup, type SharedFieldSetupEmits, type SharedFieldSetupProps } from '../../Shared/SharedFieldSetup';

export type OrionPhoneEmits = SharedFieldSetupEmits<Nil<Orion.Phone>> & {
	(e: 'focus', payload: FocusEvent): void
	(e: 'blur', payload?: FocusEvent): void
	(e: 'change', val?: Nil<Orion.Phone>): void
	(e: 'clear'): void
};

export type OrionPhoneProps = SharedFieldSetupProps & {
	// @doc props/flag Allow to display or not the flag of the selected country
	// @doc/fr props/flag Permet d'afficher le drapeau du pays choisi
	flag?: boolean
	// @doc props/mobile defines if the number is a mobile phone
	// @doc/fr props/mobile définit si le numéro correspond à un portable
	mobile?: boolean
	// @doc props/type the type of the input
	// @doc/fr props/type type du champ
	type?: string
	// @doc props/country-favorites-options list of countries to display at the top of the country select
	// @doc/fr props/country-favorites-options liste des pays à afficher en haut du sélecteur de pays
	countryFavoritesOptions?: Orion.Country[]
};

export class OrionPhoneSetup extends SharedFieldSetup<OrionPhoneProps, Nil<string>> {

	static readonly defaultProps = {
		...SharedFieldSetup.defaultProps,
		countryFavoritesOptions: () => [] as Orion.Country[],
	};

	readonly inputType = 'phone';
	readonly _countrySelect = ref<OrionSelect>();
	readonly _orionInput = ref<HTMLInputElement & OrionInput>();
	readonly _countryCode = ref<HTMLElement>();
	private _countryCodeObserver?: MutationObserver;

	protected state = reactive({
		...this.sharedState,
		country: useCountry().getCountryByCode(this.lang.ORION_PHONE__DEFAULT_COUNTRY_CODE),
		phoneNumber: '',
		countryCodeWidth: 0,
	});

	private get internationalDialCode () { return `+${this.country?.areaCode}` }
	protected override get hasValue () { return !isNil(this.vModel.value) && !isNil(this.state.phoneNumber) }
	protected get isValidCustom () { return this.isValidMobile && isValidPhoneNumber(this.phoneNumberProxy, this.country?.code) }
	get countryList () { return useCountry().countries.toSorted((a, b) => a.name.localeCompare(b.name)) }
	get countryCodeWidth () { return this.state.countryCodeWidth + 'rem' }
	// eslint-disable-next-line orion-rules/private-property-if-only-in-template
	get isFocus () { return this._countrySelect.value?.isFocus() || this._orionInput?.value?.isFocus() || false }
	private get isValidMobile () {
		const phoneNumber = parsePhoneNumberFromString(this.phoneNumberProxy, this.country?.code);
		return this.props.mobile ? phoneNumber?.getType() === 'MOBILE' : true;
	}

	// eslint-disable-next-line orion-rules/private-property-if-only-in-template
	get showState () {
		const validator = this.props.validation as Undef<Orion.Validation.Rule>;

		if (this.state.hasBeenFocus) {
			return !!validator || !!this.hasValue;
		}
		else {
			return validator?.showStatus ?? false;
		}
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			isValidMobile: () => this.isValidMobile,
			_country: () => this._countrySelect.value,
			_orionInput: () => this._orionInput.value,
		};
	}

	get country () { return useCountry().getCountryByCode(this.vModelCountryCode?.value ?? this.lang.ORION_PHONE__DEFAULT_COUNTRY_CODE) }
	set country (val) { this.vModelCountryCode.value = val?.code }

	get phoneNumberProxy () {
		if (!this.state.phoneNumber.length) return '';

		const cleanNumber = this.state.phoneNumber.replace(this.internationalDialCode, '');
		const formattedNumber = new AsYouType().input(this.internationalDialCode + cleanNumber).split(this.internationalDialCode)[1] ?? '';
		return formattedNumber.trim();
	}

	set phoneNumberProxy (val) {
		if (!val) {
			this.vModel.value = undefined;
			this.vModelNationalNumber.value = undefined;
			this.state.phoneNumber = '';
			return;
		}

		this.state.phoneNumber = val ?? '';
		if (!this.state.phoneNumber.length) return;

		const parsedPhoneNumber = parsePhoneNumberFromString(this.state.phoneNumber, this.country?.code);
		this.vModel.value = parsedPhoneNumber?.format('E.164');
		this.vModelNationalNumber.value = parsedPhoneNumber?.formatNational();
	}

	constructor (
		protected props: OrionPhoneProps,
		protected emits: OrionPhoneEmits,
		protected vModel: ModelRef<Nil<string>>,
		protected vModelCountryCode: ModelRef<Nil<Orion.Country['code']>>,
		protected vModelNationalNumber: ModelRef<Nil<string>>,
	) {
		super(props, emits, vModel);

		if (vModel.value) {
			const parsedPhone = parsePhoneNumberFromString(vModel.value, this.country?.code);
			this.state.phoneNumber = parsedPhone?.number.toString() ?? '';
			this.vModelCountryCode.value = parsedPhone?.country ?? this.lang.ORION_PHONE__DEFAULT_COUNTRY_CODE;
		}
		else if (vModelNationalNumber?.value) {
			const parsedPhone = parsePhoneNumberFromString(vModelNationalNumber.value, this.country?.code)?.number;
			this.state.phoneNumber = parsedPhone?.toString() ?? '';
		}
	}

	protected onMounted () {
		super.onMounted();
		nextTick(() => {
			this.watchCountryCodeMutations();
		});
	}

	protected onUnmounted () {
		super.onUnmounted();
		this.resetCountryCodeObservation();
	}

	private watchCountryCodeMutations () {
		if (!this._countryCode.value) return;

		const updateWidth = () => {
			const width = Math.ceil((this._countryCode.value?.getBoundingClientRect().width ?? 0)) / 16 + 0.25;
			this.state.countryCodeWidth = width;
		};

		updateWidth();
		this._countryCodeObserver?.disconnect();
		this._countryCodeObserver = new MutationObserver(updateWidth);
		this._countryCodeObserver.observe(this._countryCode.value, {
			childList: true,
			subtree: true,
			attributes: true,
		});
	}

	private resetCountryCodeObservation () {
		this._countryCodeObserver?.disconnect();
		this._countryCodeObserver = undefined;
		this.state.countryCodeWidth = 0;
	}

	setDataFromPaste (e: ClipboardEvent) {
		const val = e.clipboardData?.getData('text');
		if (val) {
			const parsedPhone = parsePhoneNumberFromString(val);
			this.state.phoneNumber = parsedPhone?.number.toString() ?? '';
			this.vModel.value = parsedPhone?.format('E.164');
			this.vModelNationalNumber.value = parsedPhone?.formatNational();
			this.vModelCountryCode.value = parsedPhone?.country ?? this.lang.ORION_PHONE__DEFAULT_COUNTRY_CODE;
		}
	}

	getSrc (countryCode?: Orion.Country['code']) {
		const countryCodeToUse = countryCode ?? this.country?.code;
		return useDynamicFlag(countryCodeToUse ?? 'FR');
	}

	keydownGuard (e: KeyboardEvent) {
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

		// Block input to everything except number, movement and delete
		if (!validInput.includes(e.key)) {
			e.preventDefault();
			return;
		}

		if (move.includes(e.key)) {
			return;
		}

		// The cursor is at the end
		if (selectionStart === valueLength) {
			const inputValueAfterKeydown = inputValueBeforeCursor + e.key;
			if (inputElt) {
				if ((!isValidPhoneNumber(inputElt.value, this.country?.code) || misc.includes(e.key))) {
					return;
				}
				else {
					if (!isValidPhoneNumber(inputValueAfterKeydown, this.country?.code)) {
						e.preventDefault();
					}
				}
			}
			return;
		}

		// The cursor is between two part
		if (selectionStart === selectionEnd) {
			const inputValueAfterKeydown = inputValueBeforeCursor + e.key + (inputValueAfterCursor.startsWith(' ')
				? inputValueAfterCursor.substring(1)
				: inputValueAfterCursor);

			if (inputElt) {
				if (!isValidPhoneNumber(inputElt.value, this.country?.code) || misc.includes(e.key)) {
					// return;
				}
				else {
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
				}
				else {
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
		return display.toLowerCase().indexOf(valueRechercher.toLowerCase()) !== -1;
	}

	switchFocusFromCountryToInput () {
		this._countrySelect.value?.togglePopover();
		this._orionInput.value?._input()?.focus();
	}

}
