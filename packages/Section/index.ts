import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionSection from './src/OrionSection.vue';
import type { OrionSectionEmits, OrionSectionProps } from './src/OrionSectionSetupService';
import OrionSectionSetupService from './src/OrionSectionSetupService';

export const OrionSectionPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Section`, OrionSection);
	},
};

export { OrionSection, OrionSectionSetupService, OrionSectionEmits, OrionSectionProps };
