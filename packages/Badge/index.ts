import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionBadge from './src/OrionBadge.vue';
import type { OrionBadgeEmits, OrionBadgeProps } from './src/OrionBadgeSetup';
import OrionBadgeSetup from './src/OrionBadgeSetup';

export const OrionBadgePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Badge`, OrionBadge);
	},
};

export { OrionBadge, OrionBadgeEmits, OrionBadgeProps, OrionBadgeSetup };

