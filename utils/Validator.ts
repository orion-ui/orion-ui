import { useLang } from 'services/LangService';
import { useMonkey } from 'services/MonkeyService';
import { reactive } from 'vue';

type ValidatorPhoneValidation = Record<
	Orion.Country['code'],
	{
		default: RegExp,
		landline: RegExp,
		mobile: RegExp
	}
>;

type Rule<T> = ((value: T) => boolean | Orion.Validator.RuleResult)

export class Validator<T = any> {
	static readonly regex = {
		password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,60}$/,
		hasLowercase: /[a-z]/,
		hasUppercase: /[A-Z]/,
		hasNumber: /[0-9]/,
		hasSpecialChar: /[^A-Za-z0-9]/,
		email: /^([a-zA-Z0-9_-]+([+.]{1}[a-zA-Z0-9_-]+)*)@([a-zA-Z0-9_-]+([.]{1}[a-zA-Z0-9_-]+)*)([.]{1}[a-zA-Z]{2,12})$/,
		phone: {
			FR: {
				default: /^([+]33|0)\d{9}$/,
				landline: /^([+]33|0)[^67]\d{8}$/,
				mobile: /^([+]33|0)[67]\d{8}$/,
			},
			// @contribution Put other country validation RegExp here
		} as ValidatorPhoneValidation,
	};

	static readonly rules = {
		required: (message?: string) => (value: any): Orion.Validator.RuleResult => {
			const msg = message ?? useLang().VALIDATOR_ERROR_REQUIRED;
			// Handle OrionPhone validation
			if (typeof value === 'object' && value !== null && 'phoneCountryCode' in value && 'phoneNumber' in value) {
				return {
					result: !!value?.phoneNumber?.length,
					message: msg,
					level: 'error',
				};
			} else {
				return {
					result: !!value?.toString().trim().length,
					message: msg,
					level: 'error',
				};
			}
		},

		hasLowercase: (message?: string) => (value?: string): Orion.Validator.RuleResult => {
			return {
				result: !!value?.length && this.regex.hasLowercase.test(value),
				message: message ?? useLang().VALIDATOR_ERROR_HAS_LOWERCASE,
				level: 'error',
			};
		},

		hasUppercase: (message?: string) => (value?: string): Orion.Validator.RuleResult => {
			return {
				result: !!value?.length && this.regex.hasUppercase.test(value),
				message: message ?? useLang().VALIDATOR_ERROR_HAS_UPPERCASE,
				level: 'error',
			};
		},

		hasNumber: (message?: string) => (value?: string): Orion.Validator.RuleResult => {
			return {
				result: !!value?.length && this.regex.hasNumber.test(value),
				message: message ?? useLang().VALIDATOR_ERROR_HAS_NUMBER,
				level: 'error',
			};
		},

		hasSpecialChar: (message?: string) => (value?: string): Orion.Validator.RuleResult => {
			return {
				result: !!value?.length && this.regex.hasSpecialChar.test(value),
				message: message ?? useLang().VALIDATOR_ERROR_HAS_SPECIAL_CHAR,
				level: 'error',
			};
		},

		hasMinLength: (min: number, message?: string) => (value?: string): Orion.Validator.RuleResult => {
			const msg = message ?? useLang().VALIDATOR_ERROR_HAS_MIN_LENGTH;
			return {
				result: (value?.length ?? 0) >= min,
				message: msg.replace('$charLength', useMonkey(useLang().CHARACTER).pluralize(min)),
				level: 'error',
			};
		},

		hasMaxLength: (max: number, message?: string) => (value?: string): Orion.Validator.RuleResult => {
			const msg = message ?? useLang().VALIDATOR_ERROR_HAS_MAX_LENGTH;
			return {
				result: (value?.length ?? 0) <= max,
				message: msg.replace('$charLength', useMonkey(useLang().CHARACTER).pluralize(max)),
				level: 'error',
			};
		},

		length: (minLength?: number, maxLength?: number, message?: string) => (value?: string): Orion.Validator.RuleResult => {
			const min = minLength ?? 0;
			const max = maxLength ?? Infinity;
			const msg = message ?? useLang().VALIDATOR_ERROR_LENGTH;
			return {
				result: (value?.length ?? 0) >= min && (value?.length ?? 0) <= max,
				message: max !== Infinity
					? msg.replace('$min', min.toString()).replace('$max', max.toString())
					: useLang().VALIDATOR_ERROR_HAS_MIN_LENGTH.replace('$charLength', useMonkey(useLang().CHARACTER).pluralize(min)),
				level: 'error',
			};
		},

		phone: (mobile?: undefined | boolean, message?: string) => (value: any): Orion.Validator.RuleResult => {
			const msg = message ?? useLang().VALIDATOR_ERROR_PHONE;
			const countryCode = value?.phoneCountryCode as Undef<Orion.Country['code']>;
			if (!!countryCode && value?.phoneNumber && this.regex.phone[countryCode]) {
				return {
					result: mobile === undefined
						? this.regex.phone[countryCode].default.test(value.phoneNumber)
						: mobile
							? this.regex.phone[countryCode].mobile.test(value.phoneNumber)
							: this.regex.phone[countryCode].landline.test(value.phoneNumber),
					message: msg,
					level: 'error',
				};
			} else {
				return {
					result: true,
					message: msg,
					level: 'error',
				};
			}
		},

		password: (message?: string) => (value?: string): Orion.Validator.RuleResult => {
			return {
				result: !!value?.toString().trim().length && this.regex.password.test(value),
				message: message ?? useLang().VALIDATOR_ERROR_PASSWORD,
				level: 'error',
			};
		},

		passwordConfirm: (
			passwordToConfirm = '' as string | (() => string | undefined),
			message?: string,
		) => (value?: string): Orion.Validator.RuleResult => {
			const msg = message ?? useLang().VALIDATOR_ERROR_PASSWORD_CONFIRM;
			const valueToCompare = typeof passwordToConfirm === 'string' ? passwordToConfirm : passwordToConfirm?.();
			return {
				result: !!valueToCompare?.trim().length && !!value?.trim().length && (valueToCompare === value),
				message: msg,
				level: 'error',
			};
		},

		email: (message?: string) => (value?: string): Orion.Validator.RuleResult => {
			return {
				result: !value?.length || (!!value?.length && this.regex.email.test(value)),
				message: message ?? useLang().VALIDATOR_ERROR_EMAIL,
				level: 'error',
			};
		},
	};

	static convertToValidatorResult (result: boolean | Orion.Validator.RuleResult): Orion.Validator.RuleResult {
		return typeof result === 'object'
			? result
			: {
				result,
				level: 'error',
			};
	}


	private readonly state = reactive({ rules: [] as Rule<T>[] });


	constructor (rules?: Rule<T>[] | string) {
		this.handleConstructorRules(rules);
	}


	handleConstructorRules (rules?: Rule<T>[] | string) {
		if (typeof rules === 'string') {
			const rulesToValidate = rules?.split('|');
			for (let i = 0; i < rulesToValidate?.length; i++) {
				const rule = rulesToValidate[i];
				const ruleName = rule.split(':')[0] as keyof typeof Validator.rules;
				const ruleArgs = rule.split(':')[1]?.split(',') ?? [];

				if (['passwordConfirm'].includes(ruleName)) {
					throw [`\n`,
						`"${ruleName}" should only be used via Validator.rules.${ruleName}().`,
						`Check https://orion-ui.org/services/Validation.html for more infos.`,
					].join('\n');
				} else if (Validator.rules[ruleName]) {
					this.state.rules.push((Validator.rules[ruleName] as any)(...ruleArgs));
				}
			}
		} else if (rules) {
			this.state.rules.push(...rules);
		}
	}

	validate (value: T): Orion.Validator.RuleResult[] {
		return this.state.rules.map(rule => Validator.convertToValidatorResult(rule(value)));
	}
}
