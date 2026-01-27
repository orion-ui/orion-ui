import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionTabs from './src/OrionTabs.vue';
import type { OrionTabsEmits, OrionTabsProps } from './src/OrionTabsSetup';
import OrionTabsSetup from './src/OrionTabsSetup';

export const OrionTabsPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Tabs`, OrionTabs);
	},
};

export { OrionTabs, OrionTabsEmits, OrionTabsProps, OrionTabsSetup };

