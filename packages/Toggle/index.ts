import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionToggle from './src/OrionToggle.vue';
import { OrionToggleSetup, type OrionToggleEmits, type OrionToggleProps } from './src/OrionToggleSetup';

export const OrionTogglePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Toggle`, OrionToggle);
	},
};

export { OrionToggle, OrionToggleSetup, type OrionToggleEmits, type OrionToggleProps };
