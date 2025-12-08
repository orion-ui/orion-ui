import { EnLang } from './en';
import { FrLang } from './fr';

export type LangAvailable = 'en' | 'fr';

export type Lang = Record<LangAvailable, Omit<typeof EnLang, 'pluralize'> & {
	pluralize: (words: string, quantity: number, quantityIncluded?: boolean) => string
}>

// @tree-shaking lazy initialization
let lang: Lang | undefined;

export function getLang () {
	if (!lang) {
		lang = {
			en: { ...EnLang },
			fr: { ...FrLang },
		};
	}
	return lang;
}
