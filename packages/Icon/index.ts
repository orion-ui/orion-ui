import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionIcon from './src/OrionIcon.vue';
import OrionIconSetupService from './src/OrionIconSetupService';

export const OrionIconPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Icon`, OrionIcon);
	},
};

export { OrionIcon, OrionIconSetupService };
