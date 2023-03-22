import { get } from 'lodash-es';
import { reactive } from 'vue';

type ValidationArrayType = {
  [key: string]: string | Function;
}

type FieldHasBeenFocusSetter = {
	setHasBeenFocus: (value: boolean) => void;
}

type PhoneValidation = Record<
	Orion.Country['code'],
	{
		classic: RegExp,
		mobile: RegExp
	}
>;

class ValidationService<T extends ValidationArrayType> {
	private regexRegistry = {
		password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,60}$/,
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
		} as PhoneValidation,
	};

	private rulesRegistry = {
		required: (value: any) => {
			return (value && value !== '');
		},

		hasLowercase: (value: string) => {
			return !!value?.length && this.regexRegistry.hasLowercase.test(value);
		},

		hasUppercase: (value: string) => {
			return !!value?.length && this.regexRegistry.hasUppercase.test(value);
		},

		hasNumber: (value: string) => {
			return !!value?.length && this.regexRegistry.hasNumber.test(value);
		},

		hasSpecialChar: (value: string) => {
			return !!value?.length && this.regexRegistry.hasSpecialChar.test(value);
		},

		length: (value: string, ...args: any[]) => {
			const min = args[0] ?? 0;
			const max = args[1] ?? Infinity;
			return value?.length >= min && value.length <= max;
		},

		phone: (value: any, ...args: any[]) => {
			const countryCode = value?.phoneCountryCode as Undef<Orion.Country['code']>;
			if (!!countryCode && value?.phoneNumber && this.regexRegistry.phone[countryCode]) {
				return args[0]?.includes('mobile')
					? this.regexRegistry.phone[countryCode].mobile.test(value.phoneNumber)
					: this.regexRegistry.phone[countryCode].classic.test(value.phoneNumber);
			} else {
				return !!value?.phoneNumber;
			}
		},

		password: (value: string) => {
			return this.regexRegistry.password.test(value);
		},

		passwordConfirm: (value : string, ...args: any[]) => {
			return !!value?.length && get(this.objectToValidate, args[0]) === value;
		},

		email: (value: string) => {
			return this.regexRegistry.email.test(value);
		},
	};

	private state = reactive({
		showState: false,
		componentFocusState: [] as FieldHasBeenFocusSetter[],
	});

	objectToValidate?: Record<string, any>;
	validatorRules?: T;


	constructor (objectToValidate?: Record<string, any>, validatorRules?: T) {
		this.objectToValidate = objectToValidate;
		this.validatorRules = validatorRules;
	}


	private phoneNumberWithoutPrefix (value: string) {
		return value.replace(value.slice(0, 3), '');
	}

	private checkObjectPropRule (propName: string) {
		return this.checkRuleParams(get(this.objectToValidate, propName), (this.validatorRules as any)[propName]);
	}

	/**
	 * @desc checks if the value verifies the rule given in parameter
	 * @param {any} value value to check
	 * @param {string | (() => boolean)} [ruleParams] rule which must verify the value to pass the verification
	 * @return boolean
	 */
	checkRuleParams (value: any, ruleParams: string | (() => boolean)) {
		if (typeof ruleParams === 'function') {
			return ruleParams();
		} else {
			const rulesToValidate = ruleParams?.split('|');
			for (let i = 0; i < rulesToValidate?.length; i++) {
				const rule = rulesToValidate[i];
				const ruleName = rule.split(':')[0] as keyof typeof this.rulesRegistry;
				const ruleArgs = rule.split(':')[1]?.split(',') ?? [];
				if (this.rulesRegistry[ruleName]) {
					const test = this.rulesRegistry[ruleName](value, ...ruleArgs);
					if (!test) return false;
				}
			}
			return true;
		}
	}

	/**
	 * @desc displays the validation state
	 * @return void
	 */
	showValidationState () {
		this.state.showState = true;
	}

	/**
	 * @desc hides the validation state
	 * @return void
	*/
	hideValidationState () {
		this.state.showState = false;
	}

	/**
	 * @desc resets the validation state
	 * @return void
	 */
	resetValidationState () {
		this.state.showState = false;
		this.state.componentFocusState.forEach((x) => {
			x.setHasBeenFocus(false);
		});
	}

	registerComponentFocusState (value: FieldHasBeenFocusSetter) {
		this.state.componentFocusState.push(value);
	}

	/**
	 * @desc checks if the object to validate verifies all the rules.
	 * @return boolean
	*/
	validate () {
		for (const key in this.validatorRules) {
			const test = this.checkObjectPropRule(key);
			if (!test)
				return false;
		}
		return true;
	}

	/**
	 * @param {string} ruleName name of the rule
	 */
	rule (ruleName: keyof T) {
		return {
			registerComponentFocusState: this.registerComponentFocusState.bind(this),
			showValidationState: this.state.showState,
			validationArgs: this.validatorRules?.[ruleName],
			validate: () => this.checkObjectPropRule(ruleName as string),
		};
	}
}

export default function useValidation<T extends ValidationArrayType> (objectToValidate?: Record<string, any>, validatorRules?: T) {
	return new ValidationService(objectToValidate, validatorRules);
}
