import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionSection from './src/OrionSection.vue';
import type { OrionSectionEmits, OrionSectionProps } from './src/OrionSectionSetup';
import OrionSectionSetup from './src/OrionSectionSetup';

export const OrionSectionPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Section`, OrionSection);
	},
};

export { OrionSection, OrionSectionEmits, OrionSectionProps, OrionSectionSetup };

