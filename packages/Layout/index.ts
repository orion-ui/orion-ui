import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionLayout from './src/OrionLayout.vue';
import OrionLayoutSetupService from './src/OrionLayoutSetupService';

export const OrionLayoutPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Layout`, OrionLayout);
	},
};

export { OrionLayout, OrionLayoutSetupService };
