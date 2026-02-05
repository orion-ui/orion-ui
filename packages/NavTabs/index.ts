import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionNavTabs from './src/OrionNavTabs.vue';
import { OrionNavTabsSetup, type OrionNavTabsEmits, type OrionNavTabsProps } from './src/OrionNavTabsSetup';

export const OrionNavTabsPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}NavTabs`, OrionNavTabs);
	},
};

export { OrionNavTabs, OrionNavTabsSetup, type OrionNavTabsEmits, type OrionNavTabsProps };
