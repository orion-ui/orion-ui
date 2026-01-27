import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionToggle from './src/OrionToggle.vue';
import type { OrionToggleEmits, OrionToggleProps } from './src/OrionToggleSetup';
import OrionToggleSetup from './src/OrionToggleSetup';

export const OrionTogglePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Toggle`, OrionToggle);
	},
};

export { OrionToggle, OrionToggleEmits, OrionToggleProps, OrionToggleSetup };

