/// <reference path="global.d.ts"/>

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
			lang: 'en',
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

// For export, use relative path
export { coolicons } from '../assets/fonts/coolicons';
export * from '../utils/Bus';
export * from '../utils/Log';
export * from '../utils/tools';
export * from '../utils/mockup';
export * from '../services';
export * from '../lang';
