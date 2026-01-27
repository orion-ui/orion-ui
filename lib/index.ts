/// <reference path="global.d.ts"/>
/// <reference path="private.d.ts"/>

import type { App, Plugin } from 'vue';

import 'packages/Shared/styles/styles.less';
import { orionAppService } from 'utils/Orion';
import { setupDevtools } from '../devtool';
import { applyMonkeyPatching } from '../services/MonkeyService';

const OrionPlugin: Plugin = {
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

// For export, use relative path
export { materialIcons } from 'assets/fonts/materialIcons';
export * from '../lang';
export * from '../services';
export * from '../utils';
export { orionAppService, OrionPlugin };

// Allow exporting the plugin as default export for easier usage
// eslint-disable-next-line no-restricted-exports
export default OrionPlugin;
