import EnLang from './en';
import FrLang from './fr';

export type LangAvailable =
	| 'en'
	| 'fr'
	;

const lang: Lang = {
	en: { ...EnLang },
	fr: { ...FrLang },
};

export default lang;

export { lang };

type Lang = Record<LangAvailable, Omit<typeof EnLang, 'pluralize'> & {
	pluralize: (words: string, quantity: number, quantityIncluded?: boolean) => string
}>
