import { describe, it, expect, vi } from 'vitest';


import { Validator } from '../../../../utils/Validator';
import { reactive } from 'vue';


vi.mock('services', () => ({
	useLang: () => ({
		VALIDATOR_ERROR_REQUIRED: 'Field is required',
		VALIDATOR_ERROR_HAS_LOWERCASE: 'Must contain a lowercase letter',
		VALIDATOR_ERROR_HAS_UPPERCASE: 'Must contain an uppercase letter',
		VALIDATOR_ERROR_HAS_NUMBER: 'Must contain a number',
		VALIDATOR_ERROR_HAS_SPECIAL_CHAR: 'Must contain a special character',
		VALIDATOR_ERROR_HAS_MIN_LENGTH: 'Must be at least $charLength long',
		VALIDATOR_ERROR_HAS_MAX_LENGTH: 'Must be at most $charLength long',
		VALIDATOR_ERROR_LENGTH: 'Must be between $min and $max characters',
		VALIDATOR_ERROR_PHONE: 'Invalid phone number',
		VALIDATOR_ERROR_PASSWORD: 'Invalid password format',
		VALIDATOR_ERROR_PASSWORD_CONFIRM: 'Passwords do not match',
		VALIDATOR_ERROR_EMAIL: 'Invalid email address',
		CHARACTER: 'character',
	}),
	useMonkey: (str: string) => ({
		pluralize: (count: number) => `${count} ${str}${count > 1 ? 's' : ''}`,
	}),
}));

describe('Validator', () => {
	describe('constructor', () => {
		it('should initialize with an array of rules', () => {
			const rule = (v: any) => ({ result: !!v, message: 'test', level: 'error' as const });
			const validator = new Validator([rule]);
			const results = validator.validate('test');
			expect(results).toHaveLength(1);
			expect(results[0].result).toBe(true);
		});

		it('should initialize with a string of rules', () => {
			const validator = new Validator('required|hasMinLength:3');
			const validResult = validator.validate('test');
			const invalidResult = validator.validate('t');

			expect(validResult.every(r => r.result)).toBe(true);
			expect(invalidResult.some(r => !r.result)).toBe(true);
			expect(invalidResult.find(r => !r.result)?.message).toBe('Must be at least 3 characters long');
		});

		it('should throw an error if passwordConfirm is used in string rules', () => {
			expect(() => new Validator('passwordConfirm:test')).toThrow(
				'"passwordConfirm" should only be used via Validator.rules.passwordConfirm()',
			);
		});

		it('should handle empty or undefined rules', () => {
			const validator = new Validator();
			expect(validator.validate('any')).toEqual([]);
			const validator2 = new Validator('');
			expect(validator2.validate('any')).toEqual([]);
		});
	});

	describe('Static Rules', () => {
		it('`required` rule works for strings', () => {
			const rule = Validator.rules.required();
			expect(rule('test').result).toBe(true);
			expect(rule('').result).toBe(false);
			expect(rule('  ').result).toBe(false);
			expect(rule(null).result).toBe(false);
			expect(rule(undefined).result).toBe(false);
			expect(rule(0).result).toBe(true);
		});

		it('`required` rule works for OrionPhone object', () => {
			const rule = Validator.rules.required();
			const phoneObjValid = { phoneCountryCode: 'FR', phoneNumber: '123456789' };
			const phoneObjInvalid = { phoneCountryCode: 'FR', phoneNumber: '' };
			expect(rule(phoneObjValid).result).toBe(true);
			expect(rule(phoneObjInvalid).result).toBe(false);
		});

		it('`hasLowercase` rule', () => {
			const rule = Validator.rules.hasLowercase();
			expect(rule('test').result).toBe(true);
			expect(rule('TEST').result).toBe(false);
			expect(rule('Test1').result).toBe(true);
			expect(rule('').result).toBe(false);
		});

		it('`hasUppercase` rule', () => {
			const rule = Validator.rules.hasUppercase();
			expect(rule('TEST').result).toBe(true);
			expect(rule('test').result).toBe(false);
			expect(rule('Test1').result).toBe(true);
			expect(rule('').result).toBe(false);
		});

		it('`hasNumber` rule', () => {
			const rule = Validator.rules.hasNumber();
			expect(rule('test1').result).toBe(true);
			expect(rule('test').result).toBe(false);
			expect(rule('').result).toBe(false);
		});

		it('`hasSpecialChar` rule', () => {
			const rule = Validator.rules.hasSpecialChar();
			expect(rule('test!').result).toBe(true);
			expect(rule('test').result).toBe(false);
			expect(rule('').result).toBe(false);
		});

		it('`hasMinLength` rule', () => {
			const rule = Validator.rules.hasMinLength(5);
			expect(rule('12345').result).toBe(true);
			expect(rule('123456').result).toBe(true);
			expect(rule('1234').result).toBe(false);
			expect(rule('1234').message).toBe('Must be at least 5 characters long');
		});

		it('`hasMaxLength` rule', () => {
			const rule = Validator.rules.hasMaxLength(5);
			expect(rule('12345').result).toBe(true);
			expect(rule('1234').result).toBe(true);
			expect(rule('123456').result).toBe(false);
			expect(rule('123456').message).toBe('Must be at most 5 characters long');
		});

		it('`length` rule', () => {
			const rule = Validator.rules.length(3, 5);
			expect(rule('123').result).toBe(true);
			expect(rule('12345').result).toBe(true);
			expect(rule('12').result).toBe(false);
			expect(rule('123456').result).toBe(false);
			expect(rule('12').message).toBe('Must be between 3 and 5 characters');
		});

		it('`length` rule with only min', () => {
			const rule = Validator.rules.length(3);
			expect(rule('12345').result).toBe(true);
			expect(rule('12').result).toBe(false);
			expect(rule('12').message).toBe('Must be at least 3 characters long');
		});

		describe('`phone` rule', () => {
			it('validates french mobile number correctly', () => {
				const rule = Validator.rules.phone(true); // mobile only
				const value = { phoneCountryCode: 'FR' as const, phoneNumber: '0612345678' };
				expect(rule(value).result).toBe(true);
			});

			it('validates french landline number correctly', () => {
				const rule = Validator.rules.phone(false); // landline only
				const value = { phoneCountryCode: 'FR' as const, phoneNumber: '0123456789' };
				expect(rule(value).result).toBe(true);
			});

			it('validates any french number when type is undefined', () => {
				const rule = Validator.rules.phone(); // any
				const mobile = { phoneCountryCode: 'FR' as const, phoneNumber: '0712345678' };
				const landline = { phoneCountryCode: 'FR' as const, phoneNumber: '0523456789' };
				expect(rule(mobile).result).toBe(true);
				expect(rule(landline).result).toBe(true);
			});

			it('returns false for invalid numbers', () => {
				const rule = Validator.rules.phone();
				const value = { phoneCountryCode: 'FR' as const, phoneNumber: '12345' };
				expect(rule(value).result).toBe(false);
			});

			it('returns true if country code is not supported or value is incomplete', () => {
				const rule = Validator.rules.phone();
				const valueNoCC = { phoneNumber: '0612345678' };
				const valueNoNum = { phoneCountryCode: 'FR' as const };
				expect(rule(valueNoCC).result).toBe(true);
				expect(rule(valueNoNum).result).toBe(true);
			});
		});

		it('`password` rule', () => {
			const rule = Validator.rules.password();
			expect(rule('Password123').result).toBe(true);
			expect(rule('password123').result).toBe(false); // No uppercase
			expect(rule('PASSWORD123').result).toBe(false); // No lowercase
			expect(rule('Password').result).toBe(false); // No number
			expect(rule('Pass1').result).toBe(false); // Too short
		});

		it('`passwordConfirm` rule', () => {
			const rule = Validator.rules.passwordConfirm('Password123');
			expect(rule('Password123').result).toBe(true);
			expect(rule('password123').result).toBe(false);
		});

		it('`passwordConfirm` rule with a function', () => {
			const password = reactive({ val: 'Password123' });
			const rule = Validator.rules.passwordConfirm(() => password.val);
			expect(rule('Password123').result).toBe(true);
			password.val = 'NewPassword';
			expect(rule('Password123').result).toBe(false);
			expect(rule('NewPassword').result).toBe(true);
		});

		it('`email` rule', () => {
			const rule = Validator.rules.email();
			expect(rule('test@example.com').result).toBe(true);
			expect(rule('test.name@example.co.uk').result).toBe(true);
			expect(rule('test@example').result).toBe(false);
			expect(rule('test.com').result).toBe(false);
			expect(rule('').result).toBe(true); // Empty is considered valid
			expect(rule(undefined).result).toBe(true);
		});
	});

	describe('validate method', () => {
		it('should return an array of validation results', () => {
			const validator = new Validator('required|hasMinLength:5');
			const results = validator.validate('test');
			expect(results).toHaveLength(2);
			expect(results[0].result).toBe(true);
			expect(results[1].result).toBe(false);
			expect(results[1].message).toBe('Must be at least 5 characters long');
		});

		it('should return an empty array if no rules are defined', () => {
			const validator = new Validator();
			const results = validator.validate('test');
			expect(results).toHaveLength(0);
		});
	});

	describe('convertToValidatorResult static method', () => {
		it('should convert a boolean to a result object', () => {
			const resultTrue = Validator.convertToValidatorResult(true);
			const resultFalse = Validator.convertToValidatorResult(false);
			expect(resultTrue).toEqual({ result: true, level: 'error' });
			expect(resultFalse).toEqual({ result: false, level: 'error' });
		});

		it('should return the object if it is already a result object', () => {
			const originalResult = { result: true, message: 'Custom', level: 'warning' as const };
			const convertedResult = Validator.convertToValidatorResult(originalResult);
			expect(convertedResult).toBe(originalResult);
		});
	});
});