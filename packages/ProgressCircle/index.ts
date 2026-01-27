import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionProgressCircle from './src/OrionProgressCircle.vue';
import type { OrionProgressCircleEmits, OrionProgressCircleProps } from './src/OrionProgressCircleSetup';
import OrionProgressCircleSetup from './src/OrionProgressCircleSetup';

export const OrionProgressCirclePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ProgressCircle`, OrionProgressCircle);
	},
};

export { OrionProgressCircle, OrionProgressCircleEmits, OrionProgressCircleProps, OrionProgressCircleSetup };

