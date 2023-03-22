import { PropType, reactive } from 'vue';
import SharedFieldSetupService, { FieldEmit } from '../../Shared/SharedFieldSetupService';
import useValidation from 'services/ValidationService';

type Props = SetupProps<typeof OrionPasswordSetupService.props>

export default class OrionPasswordSetupService extends SharedFieldSetupService<Props, string | null | undefined> {
	static props = {
		...SharedFieldSetupService.props,
		// @doc props/passwordTooltip shows the tooltip with the password's rules
		// @doc/fr props/passwordTooltip affiche la une tooltip avec les règles à respecter
		passwordTooltip: Boolean,
		// @doc props/passwordToConfirm if specified, checks the match with the password value
		// @doc/fr props/passwordToConfirm si spécifié, vérifie la correspondance avec le champ de mot de passe dans le cas d'une confirmation
		passwordToConfirm: {
			type: String as PropType<Nullable<string>>,
			default: undefined,
		},
		// @doc props/type type of the input
		// @doc/fr props/type type du champ
		type: {
			type: String,
			default: 'password',
		},
	};

	protected state = reactive({
		...this.sharedState,
		reveal: false,
		validPassword: false,
		placementToolTip: 'auto',
	});

	protected get isValidCustom () {
		if (this.props.passwordToConfirm) {
			return this.props.passwordToConfirm === this.vModel;
		}
		return useValidation().checkRuleParams(this.vModel, 'password');
	}

	protected get showStateCustom () {
		return this.props.passwordTooltip;
	}

	get tooltipValidationMessages () {
		if (!this.props.validationMessages) {
			if (this.props.passwordToConfirm !== undefined
				|| (typeof this.props.validation === 'string' && this.props.validation.includes('passwordConfirm'))
				|| (typeof this.props.validation === 'object'
					&& typeof this.props.validation.validationArgs === 'string'
					&& this.props.validation.validationArgs.includes('passwordConfirm')
				)
			) {
				return [{
					message: this.lang.ORION_PASSWORD__VALIDATION_PASWWORD_CONFIRMATION,
					valid: this.isValid,
				}];
			} else {
				return [
					{
						message: this.lang.ORION_PASSWORD__VALIDATION_HAS_LOWERCASE,
						valid: useValidation().checkRuleParams(this.vModel, 'hasLowercase'),
					},
					{
						message: this.lang.ORION_PASSWORD__VALIDATION_HAS_UPPERCASE,
						valid: useValidation().checkRuleParams(this.vModel, 'hasUppercase'),
					},
					{
						message: this.lang.ORION_PASSWORD__VALIDATION_HAS_NUMBER,
						valid: useValidation().checkRuleParams(this.vModel, 'hasNumber'),
					},
					{
						message: this.lang.ORION_PASSWORD__VALIDATION_LENGTH,
						valid: useValidation().checkRuleParams(this.vModel, 'length:6,60'),
					},
				];
			}
		}

		return this.validationMessagesToDisplay;
	}

	get placementToolTip () {
		return this.state.placementToolTip;
	}

	get reveal () {
		return this.state.reveal;
	}


	constructor (props: Props, emit: FieldEmit<string>) {
		super(props, emit);
	}

	protected onMounted () {
		super.onMounted();
		if (this.window && this.window.innerWidth < 600) {
			this.state.placementToolTip = 'top';
		}
	}


	toggleReveal () {
		this.state.reveal = !this.state.reveal;
	}
}
