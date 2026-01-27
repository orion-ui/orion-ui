import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionNavTabs from './src/OrionNavTabs.vue';
import type { OrionNavTabsEmits, OrionNavTabsProps } from './src/OrionNavTabsSetup';
import OrionNavTabsSetup from './src/OrionNavTabsSetup';

export const OrionNavTabsPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}NavTabs`, OrionNavTabs);
	},
};

export { OrionNavTabs, OrionNavTabsEmits, OrionNavTabsProps, OrionNavTabsSetup };

