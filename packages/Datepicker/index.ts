import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionDatepicker from './src/OrionDatepicker.vue';
import type { OrionDatepickerEmits, OrionDatepickerProps } from './src/OrionDatepickerSetup';
import OrionDatepickerSetup from './src/OrionDatepickerSetup';

export const OrionDatepickerPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Datepicker`, OrionDatepicker);
	},
};

export { OrionDatepicker, OrionDatepickerEmits, OrionDatepickerProps, OrionDatepickerSetup };

