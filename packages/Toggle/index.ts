import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionToggle from './src/OrionToggle.vue';
import OrionToggleSetupService from './src/OrionToggleSetupService';

export const OrionTogglePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Toggle`, OrionToggle);
	},
};

export { OrionToggle, OrionToggleSetupService };
