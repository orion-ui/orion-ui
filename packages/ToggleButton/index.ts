import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionToggleButton from './src/OrionToggleButton.vue';
import { OrionToggleButtonSetup, type OrionToggleButtonEmits, type OrionToggleButtonProps } from './src/OrionToggleButtonSetup';

export const OrionToggleButtonPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ToggleButton`, OrionToggleButton);
	},
};

export { OrionToggleButton, OrionToggleButtonSetup, type OrionToggleButtonEmits, type OrionToggleButtonProps };
