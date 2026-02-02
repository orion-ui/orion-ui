import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionButton from './src/OrionButton.vue';
import { OrionButtonSetup, type OrionButtonEmits, type OrionButtonProps } from './src/OrionButtonSetup';

export const OrionButtonPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Button`, OrionButton);
	},
};

export { OrionButton, OrionButtonSetup, type OrionButtonEmits, type OrionButtonProps };
