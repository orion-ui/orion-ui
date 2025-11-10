import { describe, it, expect, vi, beforeEach } from 'vitest';
import useValidation from '../../../../services/ValidationService';
import { Validator } from '../../../../utils/Validator';
import Log from '../../../../utils/Log';
import { reactive } from 'vue';

vi.mock('../../../../utils/Log', () => ({
	default: {
		info: vi.fn(),
		success: vi.fn(),
		warn: vi.fn(),
		error: vi.fn(),
		orion: vi.fn(),
	},
}));

vi.mock('../../../../utils/Validator', () => {
	const Validator = vi.fn().mockImplementation(function (this: any, rules: any) {
		this.validate = (value: any) => {
			if (rules === 'required' && (value === '' || value === null || value === undefined)) {
				return [{ result: false, message: 'Field is required' }];
			}
			if (typeof rules === 'function') {
				const result = rules(value);
				return [{ result: result, message: result ? '' : 'Validation failed' }];
			}
			if (Array.isArray(rules) && typeof rules[0] === 'function') {
				const result = rules[0](value);
				return [{ result: result, message: result ? '' : 'Validation failed' }];
			}
			return [{ result: true, message: '' }];
		};
	});

	Validator.convertToValidatorResult = (res: boolean) => ({ result: res, message: '' });

	return { Validator };
});


declare global {
	namespace Orion {
		namespace Validation {
			type Rules<T> = Record<keyof T, RuleResult<T[keyof T]>>;
			type RuleResult<T> = string | ((val: T) => boolean) | Validator;
		}
		namespace Validator {
			interface RuleResult {
				result: boolean;
				message?: string;
			}
		}
	}
}

const mockedLog = vi.mocked(Log);
const mockedValidator = Validator as vi.MockedClass<typeof Validator>;

describe('useValidation / ValidationService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const dummyObject = {
		name: 'Orion',
		email: 'test@orion.com',
		age: 1,
	};

	const dummyRules = {
		name: (val: string) => val.length > 3,
		email: 'required',
		age: (val: number) => val > 0,
	};

	it('should create an instance of ValidationService', () => {
		const validationService = useValidation(dummyObject, dummyRules);
		expect(validationService).toBeDefined();
		expect(validationService.constructor.name).toBe('ValidationService');
	});

	describe('check()', () => {
		const validationService = useValidation();

		it('should return true for a valid function rule', () => {
			const rule = (v: string) => v === 'valid';
			expect(validationService.check('valid', rule)).toBe(true);
		});

		it('should return false for an invalid function rule', () => {
			const rule = (v: string) => v === 'valid';
			expect(validationService.check('invalid', rule)).toBe(false);
		});

		it('should return true for a valid string rule', () => {
			expect(validationService.check('some value', 'required')).toBe(true);
		});

		it('should return false for an invalid string rule', () => {
			expect(validationService.check('', 'required')).toBe(false);
		});

		it('should handle Validator instance', () => {
			const validatorInstance = new Validator('required');
			const spy = vi.spyOn(validatorInstance, 'validate').mockReturnValue([{ result: true, message: '' }]);
			expect(validationService.check('value', validatorInstance)).toBe(true);
			expect(spy).toHaveBeenCalledWith('value');
		});

		it('should return true if no rule is provided', () => {
			expect(validationService.check('any value', undefined as any)).toBe(true);
		});
	});

	describe('validate()', () => {
		it('should return true if all rules pass', () => {
			const validationService = useValidation(dummyObject, dummyRules);
			expect(validationService.validate()).toBe(true);
		});

		it('should return false if one rule fails', () => {
			const invalidObject = { ...dummyObject, name: 'Ori' };
			const validationService = useValidation(invalidObject, dummyRules);
			expect(validationService.validate()).toBe(false);
		});

		it('should log a warning if objectToValidate is not an object', () => {
			const validationService = useValidation(undefined, dummyRules);
			validationService.validate();
			expect(mockedLog.warn).toHaveBeenCalledWith('useValidation() first parameter is undefined or not an object.');
		});

		it('should log a warning if a property does not exist on the object', () => {
			const partialObject = { name: 'Orion' };
			const validationService = useValidation(partialObject, dummyRules);
			validationService.validate();
			expect(mockedLog.warn).toHaveBeenCalledWith('useValidation() first parameter does not contain the property "email"');
		});
	});

	describe('validateAndShowState()', () => {
		it('should call validate and showValidationState, and return validation result', () => {
			const validationService = useValidation(dummyObject, dummyRules);
			const validateSpy = vi.spyOn(validationService, 'validate');
			const showStateSpy = vi.spyOn(validationService, 'showValidationState');

			const isValid = validationService.validateAndShowState();

			expect(isValid).toBe(true);
			expect(validateSpy).toHaveBeenCalled();
			expect(showStateSpy).toHaveBeenCalled();
		});
	});

	describe('getResult()', () => {
		const validationService = useValidation();

		it('should return full result for a function rule', () => {
			const rule = (v: string) => v.length > 0;
			const result = validationService.getResult('test', rule);
			expect(result).toEqual([{ result: true, message: '' }]);
		});

		it('should return full result for a string rule', () => {
			const result = validationService.getResult('', 'required');
			expect(result).toEqual([{ result: false, message: 'Field is required' }]);
		});
	});

	describe('getResults()', () => {
		it('should return a record of all validation results', () => {
			const objectToTest = { name: 'Ok', email: '' };
			const validationService = useValidation(objectToTest, dummyRules);
			const results = validationService.getResults();

			expect(results.name[0].result).toBe(false);
			expect(results.email[0].result).toBe(false);
			expect(results).toHaveProperty('age');
		});

		it('should return an empty object if no rules are provided', () => {
			const validationService = useValidation(dummyObject, undefined);
			expect(validationService.getResults()).toEqual({});
		});
	});

	describe('State Management', () => {

		it('showValidationState() should set showStatus to true', () => {
			const validationService = useValidation() as any;
			expect(validationService.state.showStatus).toBe(false);
			validationService.showValidationState();
			expect(validationService.state.showStatus).toBe(true);
		});

		it('hideValidationState() should set showStatus to false', () => {
			const validationService = useValidation() as any;
			validationService.showValidationState();
			expect(validationService.state.showStatus).toBe(true);
			validationService.hideValidationState();
			expect(validationService.state.showStatus).toBe(false);
		});

		it('resetValidationState() should hide status and reset focus state', () => {
			const validationService = useValidation() as any;
			const mockFocusSetter = { setHasBeenFocus: vi.fn() };

			validationService.registerComponentFocusStateSetter(mockFocusSetter);
			validationService.showValidationState();
			expect(validationService.state.showStatus).toBe(true);

			validationService.resetValidationState();

			expect(validationService.state.showStatus).toBe(false);
			expect(mockFocusSetter.setHasBeenFocus).toHaveBeenCalledWith(false);
		});

		it('registerComponentFocusStateSetter() should add a setter to the state', () => {
			const validationService = useValidation() as any;
			const mockFocusSetter = { setHasBeenFocus: vi.fn() };

			expect(validationService.state.componentFocusState).toHaveLength(0);
			validationService.registerComponentFocusStateSetter(mockFocusSetter);
			expect(validationService.state.componentFocusState).toHaveLength(1);
			expect(validationService.state.componentFocusState[0]).toEqual(mockFocusSetter);
		});
	});

	describe('rule()', () => {
		it('should return an API for a specific rule', () => {
			const validationService = useValidation(dummyObject, dummyRules);
			const nameRuleApi = validationService.rule('name');

			expect(nameRuleApi).toHaveProperty('showStatus');
			expect(nameRuleApi).toHaveProperty('definition');
			expect(nameRuleApi).toHaveProperty('validate');
			expect(nameRuleApi).toHaveProperty('registerComponentFocusStateSetter');

			expect(nameRuleApi.definition).toBe(dummyRules.name);
			expect(nameRuleApi.showStatus).toBe(false);
		});

		it('returned validate function should check only the specific rule', () => {
			const invalidObject = { name: 'Orion', email: '' };
			const validationService = useValidation(invalidObject, dummyRules);
			const nameRuleApi = validationService.rule('name');
			const emailRuleApi = validationService.rule('email');

			expect(nameRuleApi.validate()).toBe(true);
			expect(emailRuleApi.validate()).toBe(false);
		});
	});
});