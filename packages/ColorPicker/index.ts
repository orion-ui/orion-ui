import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionColorPicker from './src/OrionColorPicker.vue';
import type { OrionColorPickerEmits, OrionColorPickerProps } from './src/OrionColorPickerSetup';
import OrionColorPickerSetup from './src/OrionColorPickerSetup';

export const OrionColorPickerPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ColorPicker`, OrionColorPicker);
	},
};

export { OrionColorPicker, OrionColorPickerEmits, OrionColorPickerProps, OrionColorPickerSetup };

