import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionNavMainItem from './src/OrionNavMainItem.vue';
import type { OrionNavMainItemEmits, OrionNavMainItemProps } from './src/OrionNavMainItemSetupService';
import OrionNavMainItemSetupService from './src/OrionNavMainItemSetupService';

export const OrionNavMainItemPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}NavMainItem`, OrionNavMainItem);
	},
};

export { OrionNavMainItem, OrionNavMainItemSetupService, OrionNavMainItemEmits, OrionNavMainItemProps };
