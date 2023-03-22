import useLang from './LangService';

class CountryService {
	/**
	 * @desc returns all the countries objects
	 * @type {object}
	 * @return Orion.Country[]
	 */
	get countries () {
		return useLang().countries;
	}

	/**
 * @desc returns the country related to the code given in parameter
 * @param {string} code  the code of the country
 * @return Orion.Country | undefined
 */
	getCountryByCode (code: Orion.Country['code']) {
		return this.countries.find(x => x.code === code);
	}

	/**
 * @desc returns the country related to the area code given in parameter
 * @param {string} areaCode the areaCode of the country
 * @return Orion.Country | undefined
 */
	getCountryByAreaCode (areaCode: Orion.Country['areaCode']) {
		return this.countries.find(x => x.areaCode === areaCode);
	}

}

const serviceInstance = new CountryService();

export default function useCountry () {
	return serviceInstance;
}
