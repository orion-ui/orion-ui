import { reactive } from 'vue';
import Validator from 'utils/Validator';



type FieldHasBeenFocusSetter = {
	setHasBeenFocus: (value: boolean) => void;
}

class ValidationService<T, V extends Orion.Validation.Rules<T>> {

	private state = reactive({
		showState: false,
		componentFocusState: [] as FieldHasBeenFocusSetter[],
	});

	objectToValidate?: T;
	validatorRules?: Orion.Validation.Rules<T>;


	constructor (objectToValidate?: T, validatorRules?: V) {
		this.objectToValidate = objectToValidate;
		this.validatorRules = validatorRules;
	}


	private checkObjectPropRule (propName: keyof T) {
		if (!this.objectToValidate?.[propName]) return false;
		return this.checkRuleParams(this.objectToValidate[propName], (this.validatorRules as any)[propName]);
	}

	/**
	 * @desc checks if the value verifies the rule given in parameter
	 * @param {any} value value to check
	 * @param {string | ((val: any) => boolean)} [ruleParams] rule which must verify the value to pass the verification
	 * @return boolean
	 */
	checkRuleParams (value: any, ruleParams: Orion.Validator.Rule<T>): boolean {
		if (typeof ruleParams === 'function') {
			return ruleParams(value);
		} else if (typeof ruleParams === 'string') {
			const rulesToValidate = ruleParams?.split('|');
			for (let i = 0; i < rulesToValidate?.length; i++) {
				const rule = rulesToValidate[i];
				const ruleName = rule.split(':')[0] as keyof typeof Validator.rules;
				const ruleArgs = rule.split(':')[1]?.split(',') ?? [];
				if (Validator.rules[ruleName]) {
					const test = (Validator.rules[ruleName] as Orion.Validator.RuleFunction)(...ruleArgs)(value);
					if (!test) return false;
				}
			}
			return true;
		} else if (ruleParams instanceof Validator) {
			return ruleParams.validate(value).filter(x => x.result === false).length === 0;
		} else {
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
	validate (): boolean {
		for (const key in this.validatorRules) {
			const result = this.checkObjectPropRule(key);
			if (!result) return false;
		}
		return true;
	}

	/**
	 * @param {string} ruleName name of the rule
	 */
	rule (ruleName: keyof V) {
		return {
			registerComponentFocusState: this.registerComponentFocusState.bind(this),
			showValidationState: this.state.showState,
			definition: this.validatorRules?.[ruleName as keyof T],
			validate: () => this.checkObjectPropRule(ruleName as keyof T),
		};
	}
}

export default function useValidation<T, V extends Orion.Validation.Rules<T>> (objectToValidate?: T, validatorRules?: V) {
	return new ValidationService(objectToValidate, validatorRules);
}
