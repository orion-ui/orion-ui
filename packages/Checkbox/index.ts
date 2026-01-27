import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionCheckbox from './src/OrionCheckbox.vue';
import { OrionCheckboxSetup, type OrionCheckboxEmits, type OrionCheckboxProps } from './src/OrionCheckboxSetup';

export const OrionCheckboxPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Checkbox`, OrionCheckbox);
	},
};

export { OrionCheckbox, OrionCheckboxSetup, type OrionCheckboxEmits, type OrionCheckboxProps };
