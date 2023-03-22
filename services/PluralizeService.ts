import useLang from './LangService';

class PluralizeService {
	static get pluralize () {
		return useLang().pluralize;
	}
}

export default function usePluralize (words: string, quantity: number, quantityIncluded?: boolean) {
	return PluralizeService.pluralize(words, quantity, quantityIncluded);
}
