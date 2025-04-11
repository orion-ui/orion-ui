import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionDatepicker from './src/OrionDatepicker.vue';
import type { OrionDatepickerEmits, OrionDatepickerProps } from './src/OrionDatepickerSetupService';
import OrionDatepickerSetupService from './src/OrionDatepickerSetupService';

export const OrionDatepickerPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Datepicker`, OrionDatepicker);
	},
};

export { OrionDatepicker, OrionDatepickerSetupService, OrionDatepickerEmits, OrionDatepickerProps };
