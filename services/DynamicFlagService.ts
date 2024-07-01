import { CountryCode } from 'libphonenumber-js';
import { filename } from 'pathe/utils';

class DynamicFlagService {

	readonly glob = import.meta.glob('assets/flag/*.svg', { eager: true });
	readonly flags = Object.fromEntries(Object.entries(this.glob).map(([key, value]) => [filename(key), value.default]));


	getImageFromSlug (slug: CountryCode) {
		return this.flags[slug];
	}

}

const dynamicFlagServiceSingleton = new DynamicFlagService();

export default function useDynamicFlagService (areaCode: CountryCode) {
	return dynamicFlagServiceSingleton.getImageFromSlug(areaCode);
}
