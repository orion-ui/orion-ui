/// <reference path="global.d.ts"/>
/// <reference path="private.d.ts"/>

import type { App, Plugin } from 'vue';

import 'packages/Shared/styles/styles.less';
import { OrionAppService } from 'utils/Orion';
import { orionAppInstance, setOrionAppInstance } from 'utils/OrionAppInstance';
import { setupDevtools } from '../devtool';
import { applyMonkeyPatching } from '../services/MonkeyService';


const OrionPlugin: Plugin = {
	install (app: App<any>, config?: Orion.Config) {
		setOrionAppInstance(new OrionAppService());

		orionAppInstance.init(app, {
			prefix: 'o',
			use: ['components', 'monkeyPatching'],
			lang: typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en',
			iconStyle: 'outlined',
			...config,
		} as Orion.AppServiceConfig);

		if (orionAppInstance.appUse.includes('monkeyPatching')) {
			applyMonkeyPatching();
		}

		setupDevtools(app, orionAppInstance);
	},
};


export default OrionPlugin;

export { materialIcons } from 'assets/fonts/materialIcons';
export * from '../lang';
export * from '../services';
export * from '../utils';
export { orionAppInstance, OrionPlugin };

