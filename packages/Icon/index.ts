import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionIcon from './src/OrionIcon.vue';
import { OrionIconSetup, type OrionIconEmits, type OrionIconProps } from './src/OrionIconSetup';

export const OrionIconPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Icon`, OrionIcon);
	},
};

export { OrionIcon, OrionIconSetup, type OrionIconEmits, type OrionIconProps };
