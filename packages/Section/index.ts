import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionSection from './src/OrionSection.vue';
import { OrionSectionSetup, type OrionSectionEmits, type OrionSectionProps } from './src/OrionSectionSetup';

export const OrionSectionPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Section`, OrionSection);
	},
};

export { OrionSection, OrionSectionSetup, type OrionSectionEmits, type OrionSectionProps };
