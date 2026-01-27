import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionPaginate from './src/OrionPaginate.vue';
import type { OrionPaginateEmits, OrionPaginateProps } from './src/OrionPaginateSetup';
import OrionPaginateSetup from './src/OrionPaginateSetup';

export const OrionPaginatePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Paginate`, OrionPaginate);
	},
};

export { OrionPaginate, OrionPaginateEmits, OrionPaginateProps, OrionPaginateSetup };

