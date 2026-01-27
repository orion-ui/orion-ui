import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionRadio from './src/OrionRadio.vue';
import type { OrionRadioEmits, OrionRadioProps } from './src/OrionRadioSetup';
import OrionRadioSetup from './src/OrionRadioSetup';

export const OrionRadioPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Radio`, OrionRadio);
	},
};

export { OrionRadio, OrionRadioEmits, OrionRadioProps, OrionRadioSetup };

