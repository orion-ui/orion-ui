import { getLang, LangAvailable } from 'lang/index';
import { Log } from 'utils/Log';
import { reactive } from 'vue';

// @tree-shaking lazy initialization
let state: { selectedLang: LangAvailable } | undefined;

function getState () {
	if (!state) {
		state = reactive({ selectedLang: 'en' as LangAvailable });
	}
	return state;
}

export function useLang () {
	return getLang()[getState().selectedLang];
}

export function getAppLang () {
	return getState().selectedLang;
}

export function setAppLang (language: LangAvailable) {
	if (!(language in getLang())) {
		Log.warn('Unknown language, using `en` by default', 'Orion Config');
	}

	getState().selectedLang = language in getLang() ? language : 'en';
}
