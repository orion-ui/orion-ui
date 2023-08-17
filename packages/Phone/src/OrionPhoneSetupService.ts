import { reactive, ref, watch } from 'vue';
import { isEmpty, isNil } from 'lodash-es';
import 'cleave.js/src/addons/phone-type-formatter.i18n';
import SharedFieldSetupService, { FieldEmit } from '../../Shared/SharedFieldSetupService';
import useCountry from 'services/CountryService';
import useValidation from 'services/ValidationService';

type Props = SetupProps<typeof OrionPhoneSetupService.props>
type VModelType = Nil<{
  phoneNumber: Nil<string>;
  phoneCountryCode: Nil<Orion.Country['code']>;
}>;

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
	};

	_country = ref<OrionSelect>();
	_input = ref<HTMLInputElement & OrionInput>();
	countryList = useCountry().countries;

	protected state = reactive({
		...this.sharedState,
		country: useCountry().getCountryByCode(this.lang.ORION_PHONE__DEFAULT_COUNTRY_CODE),
		phoneNumber: '',
	});

	protected get isFrPhone () {
		return this.vModel?.phoneCountryCode === 'FR';
	}

	protected get hasValue () {
		return (
			!isNil(this.vModel) &&
			!isEmpty(this.phoneNumberWithoutIndicatif) &&
			!isNil(this.state.phoneNumber)
		);
	}

	get country () {
		return this.state.country;
	}

	set country (val) {
		this.state.country = val;
	}

	get phoneNumber () {
		return this.state.phoneNumber;
	}

	set phoneNumber (val) {
		this.state.phoneNumber = val;
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
		return this.isFrPhone && this.hasValue && !this.isValid && this.isFocus;
	}

	get isValidCustom () {
		return useValidation().checkRuleParams(this.vModel, this.props.mobile ? 'phone:mobile' : 'phone');
	}


	constructor (props: Props, emit: FieldEmit<VModelType>) {
		super(props, emit);

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
			if (this._input.value) {
				this._input.value.setHasBeenFocus(val);
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


	customSearch (x: Orion.Country, valueRechercher: string) {
		const display = `${x.name} +${x.areaCode}`;
		return (
			display.toLowerCase().indexOf(valueRechercher.toLowerCase()) !== -1
		);
	}

	sanitizePhoneNumber () {
		let phoneNumber = this.vModel?.phoneNumber;

		if (this.isFrPhone && phoneNumber) {
			if (phoneNumber.charAt(0) === '0') {
				phoneNumber = phoneNumber.replace('0', '+33');
			} else if (phoneNumber.includes('+330')) {
				phoneNumber = phoneNumber.replace('+330', '+33');
			}
		}

		return phoneNumber ?? '';
	}

	emitInput () {
		const regex = new RegExp(/^[+]330\d+$/);
		if (this.state.phoneNumber && regex.test(this.state.phoneNumber)) {
			this.state.phoneNumber = this.state.phoneNumber.replace('+330', '+33');
		}

		this.vModel = {
			phoneNumber: this.state.phoneNumber,
			phoneCountryCode: this.state.country?.code,
		};

		this.emit('input', this.vModel);
	}
}
