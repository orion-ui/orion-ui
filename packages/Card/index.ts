import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionCard from './src/OrionCard.vue';
import { OrionCardSetup, type OrionCardEmits, type OrionCardProps } from './src/OrionCardSetup';

export const OrionCardPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Card`, OrionCard);
	},
};

export { OrionCard, OrionCardSetup, type OrionCardEmits, type OrionCardProps };
