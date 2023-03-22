import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionNavTabs from './src/OrionNavTabs.vue';
import OrionNavTabsSetupService from './src/OrionNavTabsSetupService';

export const OrionNavTabsPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}NavTabs`, OrionNavTabs);
	},
};

export { OrionNavTabs, OrionNavTabsSetupService };
