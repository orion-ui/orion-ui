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
	// @doc props/rules rules to validate the password
	// @doc/fr props/rules règles de validation du mot de passe
	rules?: Orion.PasswordRuleSpec[];
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
		rules: () => ['hasLowercase', 'hasUppercase', 'hasNumber', 'length:8,60'] as Orion.PasswordRuleSpec[],
	};

	protected state = reactive({
		...this.sharedState,
		reveal: false,
		placementToolTip: 'auto',
	});

	protected get isValidCustom () {
		if (typeof this.props.passwordToConfirm === 'string' && this.props.passwordToConfirm?.length) {
			return this.props.passwordToConfirm === this.vModel.value;
		}
		if (this.props.rules?.length) {
			for (const validation of this.tooltipValidationMessages) {
				if (!validation.valid) {
					return false;
				}
				return true;
			}
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
			const rules = [] as {message: string; valid: boolean}[];
			this.props.rules?.forEach((rule) => {
				if (typeof rule === 'string') {
					const [ruleName, param] = rule.split(':');
					rules.push({
						message: this.getPasswordRuleMessage(ruleName as Orion.PasswordRuleKey, param),
						valid: useValidation().check(this.vModel.value, rule),
					});
				}
			});
			return rules;
		}
	}

	getPasswordRuleMessage (rule: Orion.PasswordRuleKey, param?: string) {
		switch (rule) {
		case 'hasLowercase':
			return this.lang.ORION_PASSWORD__VALIDATION_HAS_LOWERCASE;
		case 'hasUppercase':
			return this.lang.ORION_PASSWORD__VALIDATION_HAS_UPPERCASE;
		case 'hasNumber':
			return this.lang.ORION_PASSWORD__VALIDATION_HAS_NUMBER;
		case 'hasSpecialChar':
			return this.lang.ORION_PASSWORD__VALIDATION_HAS_SPECIAL_CHAR;
		case 'hasMinLength':
			return this.lang.ORION_PASSWORD__VALIDATION_HAS_MIN_LENGTH.replace('$charLength', param?.toString() || '');
		case 'hasMaxLength':
			return this.lang.ORION_PASSWORD__VALIDATION_HAS_MAX_LENGTH.replace('$charLength', param?.toString() || '');
		case 'length':
			const [min, max] = param?.split(',') || [];
			return this.lang.ORION_PASSWORD__VALIDATION_LENGTH.replace('$min', min || '').replace('$max', max || '');
		default:
			return '';
		}
	}

	get placementToolTip () {
		return this.state.placementToolTip;
	}

	get reveal () {
		return this.state.reveal;
	}

	get passwordScore () {
		let i = 0;
		if (!this.vModel.value || !this.vModel.value.length) return i;

		if (this.vModel.value.length > 6 && this.vModel.value?.length < 11) {
			i++;
		}

		if (this.vModel.value.length >= 11) {
			i++;
		}

		if (/[A-Z]/.test(this.vModel.value)) {
			i++;
		}

		if (/[0-9]/.test(this.vModel.value)) {
			i++;
		}

		if (/[^A-Za-z0-9]/.test(this.vModel.value)) {
			i++;
		}

		return i;
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
		case 5:
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
				return 'orion-password-popover__indicator-step--danger';
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
		protected props: OrionPasswordProps & Omit<typeof OrionPasswordSetupService.defaultProps, 'rules'> &{
			rules: Orion.PasswordRuleSpec[]
		},
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
		return validation ? 'text--success' : 'text--danger';
	}
}
