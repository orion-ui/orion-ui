import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionColorPicker from './src/OrionColorPicker.vue';
import { OrionColorPickerSetup, type OrionColorPickerEmits, type OrionColorPickerProps } from './src/OrionColorPickerSetup';

export const OrionColorPickerPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ColorPicker`, OrionColorPicker);
	},
};

export { OrionColorPicker, OrionColorPickerSetup, type OrionColorPickerEmits, type OrionColorPickerProps };
