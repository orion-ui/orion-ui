import { useLang, useMonkey } from 'services';
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
		required: (message = useLang().VALIDATOR_ERROR_REQUIRED) => (value: any): Orion.Validator.RuleResult => ({
			result: !!value?.toString().trim().length,
			message,
			level: 'error',
		}),

		hasLowercase: (message = useLang().VALIDATOR_ERROR_HAS_LOWERCASE) => (value?: string): Orion.Validator.RuleResult => ({
			result: !!value?.length && this.regex.hasLowercase.test(value),
			message,
			level: 'error',
		}),

		hasUppercase: (message = useLang().VALIDATOR_ERROR_HAS_UPPERCASE) => (value?: string): Orion.Validator.RuleResult => ({
			result: !!value?.length && this.regex.hasUppercase.test(value),
			message,
			level: 'error',
		}),

		hasNumber: (message = useLang().VALIDATOR_ERROR_HAS_NUMBER) => (value?: string): Orion.Validator.RuleResult => ({
			result: !!value?.length && this.regex.hasNumber.test(value),
			message,
			level: 'error',
		}),

		hasSpecialChar: (message = useLang().VALIDATOR_ERROR_HAS_SPECIAL_CHAR) => (value?: string): Orion.Validator.RuleResult => ({
			result: !!value?.length && this.regex.hasSpecialChar.test(value),
			message,
			level: 'error',
		}),

		hasMinLength: (min: number, message = useLang().VALIDATOR_ERROR_HAS_MIN_LENGTH) => (value?: string): Orion.Validator.RuleResult => ({
			result: (value?.length ?? 0) >= min,
			message: message.replace('$charLength', useMonkey(useLang().CHARACTER).pluralize(min)),
			level: 'error',
		}),

		hasMaxLength: (max: number, message = useLang().VALIDATOR_ERROR_HAS_MAX_LENGTH) => (value?: string): Orion.Validator.RuleResult => ({
			result: (value?.length ?? 0) <= max,
			message: message.replace('$charLength', useMonkey(useLang().CHARACTER).pluralize(max)),
			level: 'error',
		}),

		length: (minLength?: number, maxLength?: number, message = useLang().VALIDATOR_ERROR_LENGTH) => (value?: string): Orion.Validator.RuleResult => {
			const min = minLength ?? 0;
			const max = maxLength ?? Infinity;
			return {
				result: (value?.length ?? 0) >= min && (value?.length ?? 0) <= max,
				message: max !== Infinity
					? message.replace('$min', min.toString()).replace('$max', max.toString())
					: useLang().VALIDATOR_ERROR_HAS_MIN_LENGTH.replace('$charLength', useMonkey(useLang().CHARACTER).pluralize(min)),
				level: 'error',
			};
		},

		phone: (mobile?: undefined | boolean, message = useLang().VALIDATOR_ERROR_PHONE) => (value: any): Orion.Validator.RuleResult => {
			const countryCode = value?.phoneCountryCode as Undef<Orion.Country['code']>;
			if (!!countryCode && value?.phoneNumber && this.regex.phone[countryCode]) {
				return {
					result: mobile === undefined
						? this.regex.phone[countryCode].default.test(value.phoneNumber)
						: mobile
							? this.regex.phone[countryCode].mobile.test(value.phoneNumber)
							: this.regex.phone[countryCode].landline.test(value.phoneNumber),
					message,
					level: 'error',
				};
			} else {
				return {
					result: !!value?.phoneNumber,
					message,
					level: 'error',
				};
			}
		},

		password: (message = useLang().VALIDATOR_ERROR_PASSWORD) => (value?: string): Orion.Validator.RuleResult => ({
			result: !!value?.toString().trim().length && this.regex.password.test(value),
			message,
			level: 'error',
		}),

		passwordConfirm: (
			passwordToConfirm = '' as string | (() => string | undefined),
			message = useLang().VALIDATOR_ERROR_PASSWORD_CONFIRM,
		) => (value?: string): Orion.Validator.RuleResult => {
			const valueToCompare = typeof passwordToConfirm === 'string' ? passwordToConfirm : passwordToConfirm?.();
			return {
				result: !!valueToCompare?.trim().length && !!value?.trim().length && (valueToCompare === value),
				message,
				level: 'error',
			};
		},

		email: (message = useLang().VALIDATOR_ERROR_EMAIL) => (value?: string): Orion.Validator.RuleResult => {
			return {
				result: !value?.length || (!!value?.length && this.regex.email.test(value)),
				message,
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
