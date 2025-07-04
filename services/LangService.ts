import { reactive } from 'vue';
import lang, { LangAvailable } from 'lang';
import { Log } from 'lib';

const state = reactive({ selectedLang: 'en' as LangAvailable });

export default function useLang () {
	return lang[state.selectedLang];
}

export function getAppLang () {
	return state.selectedLang;
}

export function setAppLang (language: LangAvailable) {
	if (!(language in lang))
		Log.warn('Unknown language, using `en` by default', 'Orion Config');

	state.selectedLang = language in lang ? language : 'en';
}
