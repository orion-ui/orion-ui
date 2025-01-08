import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionTabPane from './src/OrionTabPane.vue';
import type { OrionTabPaneEmits, OrionTabPaneProps } from './src/OrionTabPaneSetupService';
import OrionTabPaneSetupService from './src/OrionTabPaneSetupService';

export const OrionTabPanePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}TabPane`, OrionTabPane);
	},
};

export { OrionTabPane, OrionTabPaneSetupService, OrionTabPaneEmits, OrionTabPaneProps };
