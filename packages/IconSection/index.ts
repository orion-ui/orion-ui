import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionIconSection from './src/OrionIconSection.vue';
import type { OrionIconSectionEmits, OrionIconSectionProps } from './src/OrionIconSectionSetup';
import OrionIconSectionSetup from './src/OrionIconSectionSetup';

export const OrionIconSectionPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}IconSection`, OrionIconSection);
	},
};

export { OrionIconSection, OrionIconSectionEmits, OrionIconSectionProps, OrionIconSectionSetup };

