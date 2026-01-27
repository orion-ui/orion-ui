import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionToggleButton from './src/OrionToggleButton.vue';
import type { OrionToggleButtonEmits, OrionToggleButtonProps } from './src/OrionToggleButtonSetup';
import OrionToggleButtonSetup from './src/OrionToggleButtonSetup';

export const OrionToggleButtonPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ToggleButton`, OrionToggleButton);
	},
};

export { OrionToggleButton, OrionToggleButtonEmits, OrionToggleButtonProps, OrionToggleButtonSetup };

