import { EnLang } from './en';
import { FrLang } from './fr';

// @tree-shaking lazy initialization
let lang: Orion.Lang | undefined;

export function getLang () {
	if (!lang) {
		lang = {
			en: { ...EnLang },
			fr: { ...FrLang },
		};
	}
	return lang;
}
