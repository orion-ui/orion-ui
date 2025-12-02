/// <reference path="global.d.ts"/>
/// <reference path="private.d.ts"/>

// import type { App } from 'vue';

import { orionAppServiceSingleton } from '../utils';
// import 'packages/Shared/styles/styles.less';
import { setupDevtools } from '../devtool';
import { applyMonkeyPatching } from 'services/MonkeyService';


const Orion = {
	install (app: any, config?: any) { // TODO: add clear types here
		orionAppServiceSingleton.init(app, {
			prefix: 'o',
			use: ['components', 'monkeyPatching'],
			lang: typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en',
			iconStyle: 'outlined',
			...config,
		} as Orion.AppServiceConfig);

		if (orionAppServiceSingleton.appUse.includes('monkeyPatching')) {
			applyMonkeyPatching();
		}

		setupDevtools(app, orionAppServiceSingleton);
	},
};

export default Orion;

export const OrionPlugin = Orion;

// For export, use relative path`
export { materialIcons } from 'assets/fonts/materialIcons';
export { getAppLang, setAppLang } from '../services/LangService';
export * from '../utils';
export * from '../services';
export * from '../lang';
