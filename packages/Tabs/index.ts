import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionTabs from './src/OrionTabs.vue';
import OrionTabsSetupService from './src/OrionTabsSetupService';

export const OrionTabsPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Tabs`, OrionTabs);
	},
};

export { OrionTabs, OrionTabsSetupService };
