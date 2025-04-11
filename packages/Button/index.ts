import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionButton from './src/OrionButton.vue';
import type { OrionButtonEmits, OrionButtonProps } from './src/OrionButtonSetupService';
import OrionButtonSetupService from './src/OrionButtonSetupService';

export const OrionButtonPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Button`, OrionButton);
	},
};

export { OrionButton, OrionButtonSetupService, OrionButtonEmits, OrionButtonProps  };
