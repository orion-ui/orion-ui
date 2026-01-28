import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionTabs from './src/OrionTabs.vue';
import { OrionTabsSetup, type OrionTabsEmits, type OrionTabsProps } from './src/OrionTabsSetup';

export const OrionTabsPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Tabs`, OrionTabs);
	},
};

export { OrionTabs, OrionTabsSetup, type OrionTabsEmits, type OrionTabsProps };
