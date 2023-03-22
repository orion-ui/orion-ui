import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionColorPicker from './src/OrionColorPicker.vue';
import OrionColorPickerSetupService from './src/OrionColorPickerSetupService';

export const OrionColorPickerPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ColorPicker`, OrionColorPicker);
	},
};

export { OrionColorPicker, OrionColorPickerSetupService };
