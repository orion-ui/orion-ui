import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionToggleButtonGroup from './src/OrionToggleButtonGroup.vue';
import { OrionToggleButtonGroupSetup, type OrionToggleButtonGroupEmits, type OrionToggleButtonGroupProps } from './src/OrionToggleButtonGroupSetup';

export const OrionToggleButtonGroupPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ToggleButtonGroup`, OrionToggleButtonGroup);
	},
};

export { OrionToggleButtonGroup, OrionToggleButtonGroupSetup, type OrionToggleButtonGroupEmits, type OrionToggleButtonGroupProps };
