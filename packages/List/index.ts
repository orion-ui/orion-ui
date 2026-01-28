import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionList from './src/OrionList.vue';
import { OrionListSetup, type OrionListEmits, type OrionListProps } from './src/OrionListSetup';

export const OrionListPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}List`, OrionList);
	},
};

export { OrionList, OrionListSetup, type OrionListEmits, type OrionListProps };
