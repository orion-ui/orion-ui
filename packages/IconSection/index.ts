import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionIconSection from './src/OrionIconSection.vue';
import type { OrionIconSectionEmits, OrionIconSectionProps } from './src/OrionIconSectionSetupService';
import OrionIconSectionSetupService from './src/OrionIconSectionSetupService';

export const OrionIconSectionPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}IconSection`, OrionIconSection);
	},
};

export { OrionIconSection, OrionIconSectionSetupService, OrionIconSectionEmits, OrionIconSectionProps };
