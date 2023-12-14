import { reactive } from 'vue';
import Log from './Log';

type ValidatorExtendedRule<T> = {
	rule: (value?: T) => boolean,
	level: 'error' | 'warning'
	message?: string
	id?: string | number,
}

type ValidatorResults = {
	rule: (value?: any) => boolean,
	level: 'error' | 'warning'
	message?: string
	id?: string | number,
	result: boolean,
}[]

type ValidatorPhoneValidation = Record<
	Orion.Country['code'],
	{
		classic: RegExp,
		mobile: RegExp
	}
>;

type Rule<T> = ((value: T) => boolean) | ValidatorExtendedRule<T>

export class Validator<T = any> {
	static readonly regex = {
		password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,60}$/,
		hasLowercase: /[a-z]/,
		hasUppercase: /[A-Z]/,
		hasNumber: /[0-9]/,
		hasSpecialChar: /[^A-Za-z0-9]/,
		email: /^([a-zA-Z0-9_-]+([+.]{1}[a-zA-Z0-9_-]+)*)@([a-zA-Z0-9_-]+([.]{1}[a-zA-Z0-9_-]+)*)([.]{1}[a-z]{2,12})$/,
		phone: {
			FR: {
				classic: /^([+]33|0)\d{9}$/,
				mobile: /^([+]33|0)(6|7)\d{8}$/,
			},
			// @contribution Put other country validation RegExp here
		} as ValidatorPhoneValidation,
	};

	static readonly rules = {
		required: () => (value: any): boolean => {
			return !!value?.toString().trim().length;
		},

		hasLowercase: () => (value?: string): boolean => {
			return !!value?.length && this.regex.hasLowercase.test(value);
		},

		hasUppercase: () => (value?: string): boolean => {
			return !!value?.length && this.regex.hasUppercase.test(value);
		},

		hasNumber: () => (value?: string): boolean => {
			return !!value?.length && this.regex.hasNumber.test(value);
		},

		hasSpecialChar: () => (value?: string): boolean => {
			return !!value?.length && this.regex.hasSpecialChar.test(value);
		},

		hasMinLength: (min: number) => (value?: string): boolean => {
			return (value?.length ?? 0) >= min;
		},

		hasMaxLength: (max: number) => (value?: string): boolean => {
			return (value?.length ?? 0) <= max;
		},

		length: (...args: [number, number]) => (value?: string): boolean => {
			const min = args[0] ?? 0;
			const max = args[1] ?? Infinity;
			return (value?.length ?? 0) >= min && (value?.length ?? 0) <= max;
		},

		phone: (...args: any[]) => (value: any): boolean => {
			const countryCode = value?.phoneCountryCode as Undef<Orion.Country['code']>;
			if (!!countryCode && value?.phoneNumber && this.regex.phone[countryCode]) {
				return args[0]?.includes('mobile')
					? this.regex.phone[countryCode].mobile.test(value.phoneNumber)
					: this.regex.phone[countryCode].classic.test(value.phoneNumber);
			} else {
				return !!value?.phoneNumber;
			}
		},

		password: () => (value?: string): boolean => {
			return !!value?.toString().trim().length && this.regex.password.test(value);
		},

		passwordConfirm: (passwordToConfirm: string) => (value?: string): boolean => {
			return !!value?.toString().trim().length && value === passwordToConfirm;
		},

		email: () => (value?: string): boolean => {
			return !!value?.toString().trim().length && this.regex.email.test(value);
		},
	};

	/* static readonly defaultValidationMessages: Record<keyof typeof Validator.rules, string> = {
		required: '',
		hasLowercase: '',
		hasUppercase: '',
		hasNumber: '',
		hasSpecialChar: '',
		hasMinLength: '',
		hasMaxLength: '',
		length: '',
		phone: '',
		password: '',
		passwordConfirm: '',
		email: '',
	}; */

	private readonly state = reactive({ rules: [] as Rule<T>[] });


	constructor (rules?: Rule<T>[]) {
		this.state.rules = rules ?? [];
	}


	addRule (rule: Rule<T>) {
		this.state.rules.push(rule);
	}

	deleteRule (ruleId: number): void
	deleteRule (rule: Rule<T>): void
	deleteRule (rule: number | Rule<T>): void {
		if (typeof rule === 'number') {
			const targetRuleIndex = this.state.rules.findIndex(x => typeof x === 'object' && x.id === rule);
			if (targetRuleIndex > -1) this.state.rules.splice(targetRuleIndex, 1);
		} else if (typeof rule === 'object' && rule.id) {
			const targetRuleIndex = this.state.rules.findIndex(x => typeof x === 'object' && x.id === rule.id);
			if (targetRuleIndex > -1) this.state.rules.splice(targetRuleIndex, 1);
		} else {
			Log.error(`Rule should be an object and have an "id" property`, `Orion Validator`);
		}
	}

	validate (value: T): ValidatorResults {
		return this.state.rules.map((rule) => {
			// console.log(`🚀 ~ returnthis.state.rules.map ~ rule:\n`, typeof rule);
			// console.log(`🚀 ~ returnthis.state.rules.map ~ rule:\n`, rule);
			if (typeof rule === 'function') {
				const result = rule(value);
				return {
					rule,
					result,
					message: 'Oops',
					level: 'error',
					id: undefined,
				};
			}

			const result = rule.rule(value);
			return {
				...rule,
				result,
			};
		});
	}
}
