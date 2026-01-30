import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionPaginate from './src/OrionPaginate.vue';
import { OrionPaginateSetup, type OrionPaginateEmits, type OrionPaginateProps } from './src/OrionPaginateSetup';

export const OrionPaginatePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Paginate`, OrionPaginate);
	},
};

export { OrionPaginate, OrionPaginateSetup, type OrionPaginateEmits, type OrionPaginateProps };
