import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionRadio from './src/OrionRadio.vue';
import { OrionRadioSetup, type OrionRadioEmits, type OrionRadioProps } from './src/OrionRadioSetup';

export const OrionRadioPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Radio`, OrionRadio);
	},
};

export { OrionRadio, OrionRadioSetup, type OrionRadioEmits, type OrionRadioProps };
