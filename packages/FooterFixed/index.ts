import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionFooterFixed from './src/OrionFooterFixed.vue';
import { OrionFooterFixedSetup, type OrionFooterFixedEmits, type OrionFooterFixedProps } from './src/OrionFooterFixedSetup';

export const OrionFooterFixedPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}FooterFixed`, OrionFooterFixed);
	},
};

export { OrionFooterFixed, OrionFooterFixedSetup, type OrionFooterFixedEmits, type OrionFooterFixedProps };
