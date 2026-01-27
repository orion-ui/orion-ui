import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionIcon from './src/OrionIcon.vue';
import type { OrionIconEmits, OrionIconProps } from './src/OrionIconSetup';
import OrionIconSetup from './src/OrionIconSetup';

export const OrionIconPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Icon`, OrionIcon);
	},
};

export { OrionIcon, OrionIconEmits, OrionIconProps, OrionIconSetup };

