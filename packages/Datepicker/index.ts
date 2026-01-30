import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionDatepicker from './src/OrionDatepicker.vue';
import { OrionDatepickerSetup, type OrionDatepickerEmits, type OrionDatepickerProps } from './src/OrionDatepickerSetup';

export const OrionDatepickerPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Datepicker`, OrionDatepicker);
	},
};

export { OrionDatepicker, OrionDatepickerSetup, type OrionDatepickerEmits, type OrionDatepickerProps };
