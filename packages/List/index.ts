import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionList from './src/OrionList.vue';
import type { OrionListEmits, OrionListProps } from './src/OrionListSetup';
import OrionListSetup from './src/OrionListSetup';

export const OrionListPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}List`, OrionList);
	},
};

export { OrionList, OrionListEmits, OrionListProps, OrionListSetup };

