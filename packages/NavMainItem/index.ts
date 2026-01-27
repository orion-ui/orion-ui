import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionNavMainItem from './src/OrionNavMainItem.vue';
import type { OrionNavMainItemEmits, OrionNavMainItemProps } from './src/OrionNavMainItemSetup';
import OrionNavMainItemSetup from './src/OrionNavMainItemSetup';

export const OrionNavMainItemPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}NavMainItem`, OrionNavMainItem);
	},
};

export { OrionNavMainItem, OrionNavMainItemEmits, OrionNavMainItemProps, OrionNavMainItemSetup };

