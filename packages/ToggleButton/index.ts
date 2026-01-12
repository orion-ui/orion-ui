import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionToggleButton from './src/OrionToggleButton.vue';
import OrionToggleButtonSetupService from './src/OrionToggleButtonSetupService';

export const OrionToggleButtonPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ToggleButton`, OrionToggleButton);
	},
};

export { OrionToggleButton, OrionToggleButtonSetupService };
