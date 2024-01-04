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
			type: [String, Boolean] as PropType<Undef<string | boolean>>,
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
		if (typeof this.props.passwordToConfirm === 'string' && this.props.passwordToConfirm?.length) {
			return this.props.passwordToConfirm === this.vModel;
		}
		return useValidation().check(this.vModel, 'password');
	}

	get showState (): boolean {
		return super.showState || (this.props.passwordTooltip && this.state.hasBeenFocus);
	}

	get tooltipValidationMessages () {
		if (this.props.passwordToConfirm !== undefined) {
			return [{
				message: this.lang.ORION_PASSWORD__VALIDATION_PASWWORD_CONFIRMATION,
				valid: this.isValid.value,
			}];
		} else {
			return [
				{
					message: this.lang.ORION_PASSWORD__VALIDATION_HAS_LOWERCASE,
					valid: useValidation().check(this.vModel, 'hasLowercase'),
				},
				{
					message: this.lang.ORION_PASSWORD__VALIDATION_HAS_UPPERCASE,
					valid: useValidation().check(this.vModel, 'hasUppercase'),
				},
				{
					message: this.lang.ORION_PASSWORD__VALIDATION_HAS_NUMBER,
					valid: useValidation().check(this.vModel, 'hasNumber'),
				},
				{
					message: this.lang.ORION_PASSWORD__VALIDATION_LENGTH,
					valid: useValidation().check(this.vModel, 'length:8,60'),
				},
			];
		}
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
