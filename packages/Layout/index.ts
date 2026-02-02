import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionLayout from './src/OrionLayout.vue';
import { OrionLayoutSetup, type OrionLayoutEmits, type OrionLayoutProps } from './src/OrionLayoutSetup';

export const OrionLayoutPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Layout`, OrionLayout);
	},
};

export { OrionLayout, OrionLayoutSetup, type OrionLayoutEmits, type OrionLayoutProps };
