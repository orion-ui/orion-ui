import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionLabel from './src/OrionLabel.vue';
import type { OrionLabelEmits, OrionLabelProps } from './src/OrionLabelSetupService';
import OrionLabelSetupService from './src/OrionLabelSetupService';

export const OrionLabelPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Label`, OrionLabel);
	},
};

export { OrionLabel, OrionLabelSetupService, OrionLabelEmits, OrionLabelProps };
