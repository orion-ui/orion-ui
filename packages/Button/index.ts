import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionButton from './src/OrionButton.vue';
import type { OrionButtonEmits, OrionButtonProps } from './src/OrionButtonSetup';
import OrionButtonSetup from './src/OrionButtonSetup';

export const OrionButtonPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Button`, OrionButton);
	},
};

export { OrionButton, OrionButtonEmits, OrionButtonProps, OrionButtonSetup };

