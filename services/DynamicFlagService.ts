import { CountryCode } from 'libphonenumber-js';
import { filename } from 'pathe/utils';

export class DynamicFlagService {

	readonly glob = import.meta.glob('assets/flag/*.svg', { eager: true });
	readonly flags = Object.fromEntries(Object.entries(this.glob).map(([key, value]) => [filename(key), (value as any).default]));


	getImageFromSlug (slug: CountryCode) {
		return this.flags[slug];
	}

}

// @tree-shaking lazy initialization
let dynamicFlagServiceSingleton: DynamicFlagService;

export function useDynamicFlagService (areaCode: CountryCode) {
	if (!dynamicFlagServiceSingleton) {
		dynamicFlagServiceSingleton = new DynamicFlagService();
	}
	return dynamicFlagServiceSingleton.getImageFromSlug(areaCode);
}
