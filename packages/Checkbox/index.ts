import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionCheckbox from './src/OrionCheckbox.vue';
import type { OrionCheckboxEmits, OrionCheckboxProps } from './src/OrionCheckboxSetupService';
import OrionCheckboxSetupService from './src/OrionCheckboxSetupService';

export const OrionCheckboxPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Checkbox`, OrionCheckbox);
	},
};

export { OrionCheckbox, OrionCheckboxSetupService, OrionCheckboxEmits, OrionCheckboxProps };
