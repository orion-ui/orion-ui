import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionList from './src/OrionList.vue';
import type { OrionListEmits, OrionListProps } from './src/OrionListSetupService';
import OrionListSetupService from './src/OrionListSetupService';

export const OrionListPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}List`, OrionList);
	},
};

export { OrionList, OrionListSetupService, OrionListEmits, OrionListProps };
