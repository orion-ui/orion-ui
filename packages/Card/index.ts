import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionCard from './src/OrionCard.vue';
import type { OrionCardEmits, OrionCardProps } from './src/OrionCardSetup';
import OrionCardSetup from './src/OrionCardSetup';

export const OrionCardPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Card`, OrionCard);
	},
};

export { OrionCard, OrionCardEmits, OrionCardProps, OrionCardSetup };

