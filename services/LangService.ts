import { reactive } from 'vue';
import lang, { LangAvailable } from 'lang';

const state = reactive({ selectedLang: 'en' as LangAvailable });

export default function useLang () {
	return lang[state.selectedLang];
}

export function getAppLang () {
	return state.selectedLang;
}

export function setAppLang (lang: LangAvailable) {
	state.selectedLang = lang;
}
