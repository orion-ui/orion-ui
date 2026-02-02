import { useLang } from './LangService';

class CountryService {

	/**
	 * @desc returns all the countries objects
	 * @type {object}
	 * @return Orion.Country[]
	 */
	get countries () { return useLang().countries }

	getCountryByCode (code: Orion.Country['code']) {
		return this.countries.find(x => x.code === code);
	}

	getCountryByAreaCode (areaCode: Orion.Country['areaCode']) {
		return this.countries.find(x => x.areaCode === areaCode);
	}

}

const serviceInstance = new CountryService();

export function useCountry () {
	return serviceInstance;
}
