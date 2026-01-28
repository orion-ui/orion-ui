import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionIconSection from './src/OrionIconSection.vue';
import { OrionIconSectionSetup, type OrionIconSectionEmits, type OrionIconSectionProps } from './src/OrionIconSectionSetup';

export const OrionIconSectionPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}IconSection`, OrionIconSection);
	},
};

export { OrionIconSection, OrionIconSectionSetup, type OrionIconSectionEmits, type OrionIconSectionProps };
