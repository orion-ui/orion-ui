import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionBadge from './src/OrionBadge.vue';
import { OrionBadgeSetup, type OrionBadgeEmits, type OrionBadgeProps } from './src/OrionBadgeSetup';

export const OrionBadgePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Badge`, OrionBadge);
	},
};

export { OrionBadge, OrionBadgeSetup, type OrionBadgeEmits, type OrionBadgeProps };
