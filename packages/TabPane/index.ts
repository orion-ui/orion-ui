import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionTabPane from './src/OrionTabPane.vue';
import OrionTabPaneSetupService from './src/OrionTabPaneSetupService';

export const OrionTabPanePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}TabPane`, OrionTabPane);
	},
};

export { OrionTabPane, OrionTabPaneSetupService };
