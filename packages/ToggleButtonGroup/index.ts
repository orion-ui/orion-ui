import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionToggleButtonGroup from './src/OrionToggleButtonGroup.vue';
import type { OrionToggleButtonGroupEmits, OrionToggleButtonGroupProps } from './src/OrionToggleButtonGroupSetup';
import OrionToggleButtonGroupSetup from './src/OrionToggleButtonGroupSetup';

export const OrionToggleButtonGroupPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ToggleButtonGroup`, OrionToggleButtonGroup);
	},
};

export { OrionToggleButtonGroup, OrionToggleButtonGroupEmits, OrionToggleButtonGroupProps, OrionToggleButtonGroupSetup };

