/// <reference path="global.d.ts"/>
/// <reference path="private.d.ts"/>

import type { App, Plugin } from 'vue';

import orionAppService from '../utils/Orion';
import 'packages/Shared/styles/styles.less';
import { setupDevtools } from '../devtool';
import { applyMonkeyPatching } from 'services/MonkeyService';


const Orion: Plugin = {
	install (app: App<any>, config?: Orion.Config) {
		orionAppService.init(app, {
			prefix: 'o',
			use: ['components', 'monkeyPatching'],
			lang: typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en',
			iconStyle: 'outlined',
			...config,
		} as Orion.AppServiceConfig);

		if (orionAppService.appUse.includes('monkeyPatching')) {
			applyMonkeyPatching();
		}

		setupDevtools(app, orionAppService);
	},
};


export default Orion;

const OrionPlugin = Orion;

export { orionAppService, OrionPlugin };

// For export, use relative path`
export { materialIcons } from 'assets/fonts/materialIcons';
export { getAppLang, setAppLang } from '../services/LangService';
export * from '../utils/Bus';
export * from '../utils/Log';
export * from '../utils/Validator';
export * from '../utils/tools';
export * from '../utils/mockup';
export * from '../services';
export * from '../lang';
