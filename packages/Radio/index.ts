import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionRadio from './src/OrionRadio.vue';
import type { OrionRadioEmits, OrionRadioProps } from './src/OrionRadioSetupService';
import OrionRadioSetupService from './src/OrionRadioSetupService';

export const OrionRadioPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Radio`, OrionRadio);
	},
};

export { OrionRadio, OrionRadioSetupService, OrionRadioEmits, OrionRadioProps };
