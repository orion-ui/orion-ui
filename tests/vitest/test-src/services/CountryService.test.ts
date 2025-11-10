
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useCountry from '../../../../services/CountryService';
import useLang from '../../../../services/LangService';

type MockCountry = {
	name: string;
	code: string;
	areaCode: string;
};

const mockCountries: MockCountry[] = [
	{ name: 'France', code: 'FR', areaCode: '+33' },
	{ name: 'United States', code: 'US', areaCode: '+1' },
	{ name: 'Canada', code: 'CA', areaCode: '+1' },
];

vi.mock('../../../../services/LangService', () => ({
	default: vi.fn(() => ({
		countries: mockCountries,
	})),
}));

describe('CountryService', () => {
	const countryService = useCountry();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('`useCountry` should return a singleton instance', () => {
		const anotherInstance = useCountry();
		expect(countryService).toBe(anotherInstance);
	});

	describe('`countries` getter', () => {
		it('should return the list of countries from LangService', () => {
			const countries = countryService.countries;

			expect(countries).toEqual(mockCountries);
			expect(useLang).toHaveBeenCalledTimes(1);
		});
	});

	describe('getCountryByCode()', () => {
		it('should find and return a country by its code', () => {
			const country = countryService.getCountryByCode('US');

			expect(country).toBeDefined();
			expect(country).toEqual(mockCountries[1]);
			expect(useLang).toHaveBeenCalledTimes(1);
		});

		it('should return undefined if no country matches the code', () => {
			const country = countryService.getCountryByCode('XX');

			expect(country).toBeUndefined();
			expect(useLang).toHaveBeenCalledTimes(1);
		});
	});

	describe('getCountryByAreaCode()', () => {
		it('should find and return a country by its area code', () => {
			const country = countryService.getCountryByAreaCode('+33');

			expect(country).toBeDefined();
			expect(country).toEqual(mockCountries[0]);
			expect(useLang).toHaveBeenCalledTimes(1);
		});

		it('should return the first matching country when area codes are shared', () => {
			const country = countryService.getCountryByAreaCode('+1');

			expect(country).toBeDefined();
			expect(country).toEqual(mockCountries[1]);
			expect(useLang).toHaveBeenCalledTimes(1);
		});

		it('should return undefined if no country matches the area code', () => {
			const country = countryService.getCountryByAreaCode('+999');

			expect(country).toBeUndefined();
			expect(useLang).toHaveBeenCalledTimes(1);
		});
	});
});
