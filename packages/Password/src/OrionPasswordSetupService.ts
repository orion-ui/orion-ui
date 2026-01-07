import { ModelRef, reactive } from 'vue';
import SharedFieldSetupService, { SharedFieldSetupServiceEmits, SharedFieldSetupServiceProps } from '../../Shared/SharedFieldSetupService';
import useValidation from 'services/ValidationService';
import { useLang } from 'services';

export type OrionPasswordEmits = SharedFieldSetupServiceEmits<string> & {}
export type OrionPasswordProps = SharedFieldSetupServiceProps & {
	// @doc props/passwordToConfirm if specified, checks the match with the password value
	// @doc/fr props/passwordToConfirm si spécifié, vérifie la correspondance avec le champ de mot de passe dans le cas d'une confirmation
	passwordToConfirm?: string | boolean,
	// @doc props/passwordTooltip shows the tooltip with the password's rules
	// @doc/fr props/passwordTooltip affiche la une tooltip avec les règles à respecter
	passwordTooltip?: boolean,
	// @doc props/strengthIndicator displays a password strength indicator
	// @doc/fr props/strengthIndicator affiche un indicateur de robustesse du mot de passe
	strengthIndicator?: boolean,
	// @doc props/type type of the input
	// @doc/fr props/type type du champ
	type?: string,
};

export default class OrionPasswordSetupService extends SharedFieldSetupService<OrionPasswordProps, string | null | undefined> {
	static readonly defaultProps = {
		...SharedFieldSetupService.defaultProps,
		type: 'password',
		strengthIndicator: true,
		passwordToConfirm: undefined as OrionPasswordProps['passwordToConfirm'],
	};

	protected state = reactive({
		...this.sharedState,
		reveal: false,
		validPassword: false,
		placementToolTip: 'auto',
	});

	protected get isValidCustom () {
		if (typeof this.props.passwordToConfirm === 'string' && this.props.passwordToConfirm?.length) {
			return this.props.passwordToConfirm === this.vModel.value;
		}
		return useValidation().check(this.vModel.value, 'password');
	}

	get showState () {
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
					valid: useValidation().check(this.vModel.value, 'hasLowercase'),
				},
				{
					message: this.lang.ORION_PASSWORD__VALIDATION_HAS_UPPERCASE,
					valid: useValidation().check(this.vModel.value, 'hasUppercase'),
				},
				{
					message: this.lang.ORION_PASSWORD__VALIDATION_HAS_NUMBER,
					valid: useValidation().check(this.vModel.value, 'hasNumber'),
				},
				{
					message: this.lang.ORION_PASSWORD__VALIDATION_LENGTH,
					valid: useValidation().check(this.vModel.value, 'length:8,60'),
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

	get passwordScore () {
		let score = 0;
		this.tooltipValidationMessages.forEach((validation) => {
			if (validation.valid) {
				score += 1;
			}
		});
		return score;
	}

	get passwordStrength () {
		switch (this.passwordScore) {
		case 0:
		case 1:
			return useLang().PASSWORD_STRENGTH_WEAK;
		case 2:
			return useLang().PASSWORD_STRENGTH_MEDIUM;
		case 3:
			return useLang().PASSWORD_STRENGTH_GOOD;
		case 4:
			return useLang().PASSWORD_STRENGTH_STRONG;
		default:
			return useLang().PASSWORD_STRENGTH_WEAK;
		}
	}

	getIndicatorStepClass (step: number) {
		if (step <= this.passwordScore || (this.passwordScore === 0 && step === 1)) {
			switch (this.passwordScore) {
			case 0:
			case 1:
				return 'orion-password-popover__indicator-step--error';
			case 2:
				return 'orion-password-popover__indicator-step--warning';
			case 3:
				return 'orion-password-popover__indicator-step--info';
			case 4:
				return 'orion-password-popover__indicator-step--success';
			default:
				return undefined;
			}
		}
	}

	get tooltipSubtitle () {
		if (!this.vModel.value || !this.vModel.value.length) {
			return this.lang.PASSWORD_CRITERIAS_SUBTITLE_PENDING;
		} else if (this.isValid.value) {
			return this.lang.PASSWORD_CRITERIAS_SUBTITLE_OK;
		} else {
			return this.lang.PASSWORD_CRITERIAS_SUBTITLE_ERROR;
		}
	}

	constructor (
		protected props: OrionPasswordProps & typeof OrionPasswordSetupService.defaultProps,
		protected emits: OrionPasswordEmits,
		protected vModel: ModelRef<Nil<string>>) {
		super(props, emits, vModel);
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

	getPasswordCheckIcon (validation: boolean) {
		if (!this.vModel.value || !this.vModel.value.length) {
			return 'radio_button_unchecked';
		}
		return validation ? 'check_circle' : 'cancel';
	}

	getPasswordCheckClass (validation: boolean) {
		if (!this.vModel.value || !this.vModel.value.length) {
			return 'text--neutral-light';
		}
		return validation ? 'text--success' : 'text--error';
	}
}
