import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionChatMessage from './src/OrionChatMessage.vue';
import type { OrionChatMessageEmits, OrionChatMessageProps } from './src/OrionChatMessageSetup';
import OrionChatMessageSetup from './src/OrionChatMessageSetup';

export const OrionChatMessagePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ChatMessage`, OrionChatMessage);
	},
};

export { OrionChatMessage, OrionChatMessageEmits, OrionChatMessageProps, OrionChatMessageSetup };

