import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionCard from './src/OrionCard.vue';
import type { OrionCardEmits, OrionCardProps } from './src/OrionCardSetupService';
import OrionCardSetupService from './src/OrionCardSetupService';

export const OrionCardPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Card`, OrionCard);
	},
};

export { OrionCard, OrionCardSetupService, OrionCardEmits, OrionCardProps  };
