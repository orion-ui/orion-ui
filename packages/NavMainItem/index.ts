import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionNavMainItem from './src/OrionNavMainItem.vue';
import { OrionNavMainItemSetup, type OrionNavMainItemEmits, type OrionNavMainItemProps } from './src/OrionNavMainItemSetup';

export const OrionNavMainItemPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}NavMainItem`, OrionNavMainItem);
	},
};

export { OrionNavMainItem, OrionNavMainItemSetup, type OrionNavMainItemEmits, type OrionNavMainItemProps };
