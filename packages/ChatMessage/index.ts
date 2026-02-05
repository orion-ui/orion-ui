import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionChatMessage from './src/OrionChatMessage.vue';
import { OrionChatMessageSetup, type OrionChatMessageEmits, type OrionChatMessageProps } from './src/OrionChatMessageSetup';

export const OrionChatMessagePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ChatMessage`, OrionChatMessage);
	},
};

export { OrionChatMessage, OrionChatMessageSetup, type OrionChatMessageEmits, type OrionChatMessageProps };
