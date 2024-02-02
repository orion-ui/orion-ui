import { reactive } from 'vue';
import { Validator } from '../utils/Validator';


type FieldHasBeenFocusSetter = {
	setHasBeenFocus: (value: boolean) => void;
}


class ValidationService<T, V extends Orion.Validation.Rules<T>> {

	private state = reactive({
		showStatus: false,
		componentFocusState: [] as FieldHasBeenFocusSetter[],
	});

	objectToValidate?: T;
	validatorRules?: Orion.Validation.Rules<T>;


	constructor (objectToValidate?: T, validatorRules?: V) {
		this.objectToValidate = objectToValidate;
		this.validatorRules = validatorRules;
	}


	private checkObjectPropRule (propName: keyof T) {
		if (typeof this.objectToValidate !== 'object') return false;
		if (!this.objectToValidate || !(propName in this.objectToValidate)) return false;
		return this.check(this.objectToValidate[propName], (this.validatorRules as any)[propName]);
	}

	/**
	 * @desc checks if the value verifies the rule given in parameter
	 * @param {T} value value to check
	 * @param {Orion.Validation.RuleResult<T>} ruleParams rule which must verify the value to pass the verification
	 * @return boolean
	 */
	check <T = any> (value: T, ruleParams: Orion.Validation.RuleResult<T>): boolean {
		if (typeof ruleParams === 'function') {
			return new Validator([ruleParams]).validate(value)[0].result;
		} else if (typeof ruleParams === 'string') {
			return new Validator(ruleParams).validate(value).filter(x => x.result === false).length === 0;
		} else if (ruleParams instanceof Validator) {
			return ruleParams.validate(value).filter(x => x.result === false).length === 0;
		} else {
			return true;
		}
	}

	/**
	 * @desc checks if the value verifies the rule given in parameter
	 * @param {any} value value to check
	 * @param {Orion.Validation.RuleResult<any>} ruleParams rule which must verify the value to pass the verification
	 * @return boolean
	 * @deprecated Use "check" method instead
	 */
	checkRuleParams (value: any, ruleParams: Orion.Validation.RuleResult<T>): boolean {
		return this.check(value, ruleParams);
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

	private getResultForObjectPropRule (propName: keyof T) {
		if (typeof this.objectToValidate !== 'object') return [Validator.convertToValidatorResult(false)];
		if (!this.objectToValidate || !(propName in this.objectToValidate)) return [Validator.convertToValidatorResult(false)];
		return this.getResult(this.objectToValidate[propName], (this.validatorRules as any)[propName]);
	}

	/**
	 * @desc checks if the value verifies the rule given in parameter and return its full result.
	 * @param {T} value value to check
	 * @param {Orion.Validation.RuleResult<T>} ruleParams rule which must verify the value to pass the verification
	 * @return Orion.Validator.RuleResult[]
	 */
	getResult <T = any> (value: T, ruleParams: Orion.Validation.RuleResult<T>): Orion.Validator.RuleResult[] {
		if (typeof ruleParams === 'function') {
			return new Validator([ruleParams]).validate(value);
		} else if (typeof ruleParams === 'string') {
			return new Validator(ruleParams).validate(value);
		} else if (ruleParams instanceof Validator) {
			return ruleParams.validate(value);
		} else {
			return [Validator.convertToValidatorResult(true)];
		}
	}

	/**
	 * @desc checks each rule and return its result.
	 * @return Orion.Validator.RuleResult[]
	 */
	getResults (): Record<keyof V, Orion.Validator.RuleResult[]> {
		if (!this.validatorRules) return {} as Record<keyof V, Orion.Validator.RuleResult[]>;

		return Object.fromEntries(Object.keys(this.validatorRules)?.map((key) => {
			return [key as keyof V, this.getResultForObjectPropRule(key as keyof T)];
		})) as Record<keyof V, Orion.Validator.RuleResult[]>;
	}

	/**
	 * @param {string} ruleName name of the rule
	 */
	rule (ruleName: keyof V) {
		return {
			registerComponentFocusStateSetter: this.registerComponentFocusStateSetter.bind(this),
			showStatus: this.state.showStatus,
			definition: this.validatorRules?.[ruleName as keyof T],
			validate: () => this.checkObjectPropRule(ruleName as keyof T),
		};
	}

	/**
	 * @desc displays the validation state
	 * @return void
	 */
	showValidationState () {
		this.state.showStatus = true;
	}

	/**
	 * @desc hides the validation state
	 * @return void
	 */
	hideValidationState () {
		this.state.showStatus = false;
	}

	/**
	 * @desc resets the validation state
	 * @return void
	 */
	resetValidationState () {
		this.state.showStatus = false;
		this.state.componentFocusState.forEach((x) => {
			x.setHasBeenFocus(false);
		});
	}

	/**
	 * @desc this method allows the ValidationService instance to set the component's focus state, to display validation status on it
	 * @param {FieldHasBeenFocusSetter} setter
	 * @return void
	 */
	registerComponentFocusStateSetter (setter: FieldHasBeenFocusSetter) {
		this.state.componentFocusState.push(setter);
	}
}

export default function useValidation<T, V extends Orion.Validation.Rules<T>> (objectToValidate?: T, validatorRules?: V) {
	return new ValidationService(objectToValidate, validatorRules);
}
