import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionLayout from './src/OrionLayout.vue';
import type { OrionLayoutEmits, OrionLayoutProps } from './src/OrionLayoutSetup';
import OrionLayoutSetup from './src/OrionLayoutSetup';

export const OrionLayoutPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Layout`, OrionLayout);
	},
};

export { OrionLayout, OrionLayoutEmits, OrionLayoutProps, OrionLayoutSetup };

