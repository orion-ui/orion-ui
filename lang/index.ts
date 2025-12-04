import { getEnLang } from './en';
import { getFrLang } from './fr';

export type LangAvailable = 'en' | 'fr';

export type Lang = Record<LangAvailable, Omit<ReturnType<typeof getEnLang>, 'pluralize'> & {
	pluralize: (words: string, quantity: number, quantityIncluded?: boolean) => string
}>

// @tree-shaking lazy initialization
let lang: Lang | undefined;

export function getLang () {
	if (!lang) {
		lang = {
			en: getEnLang(),
			fr: getFrLang(),
		};
	}
	return lang;
}
