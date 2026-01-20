import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionToggleButton from './src/OrionToggleButton.vue';
import type { OrionToggleButtonEmits, OrionToggleButtonProps } from './src/OrionToggleButtonSetupService';
import OrionToggleButtonSetupService from './src/OrionToggleButtonSetupService';

export const OrionToggleButtonPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ToggleButton`, OrionToggleButton);
	},
};

export { OrionToggleButton, OrionToggleButtonEmits, OrionToggleButtonProps, OrionToggleButtonSetupService };

