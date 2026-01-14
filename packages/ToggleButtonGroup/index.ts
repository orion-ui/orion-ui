import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionToggleButtonGroup from './src/OrionToggleButtonGroup.vue';
import OrionToggleButtonGroupSetupService from './src/OrionToggleButtonGroupSetupService';

export const OrionToggleButtonGroupPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ToggleButtonGroup`, OrionToggleButtonGroup);
	},
};

export { OrionToggleButtonGroup, OrionToggleButtonGroupSetupService };
