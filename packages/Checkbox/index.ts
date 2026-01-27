import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionCheckbox from './src/OrionCheckbox.vue';
import type { OrionCheckboxEmits, OrionCheckboxProps } from './src/OrionCheckboxSetup';
import OrionCheckboxSetup from './src/OrionCheckboxSetup';

export const OrionCheckboxPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Checkbox`, OrionCheckbox);
	},
};

export { OrionCheckbox, OrionCheckboxEmits, OrionCheckboxProps, OrionCheckboxSetup };

