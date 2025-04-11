import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionChatMessage from './src/OrionChatMessage.vue';
import type { OrionChatMessageEmits, OrionChatMessageProps } from './src/OrionChatMessageSetupService';
import OrionChatMessageSetupService from './src/OrionChatMessageSetupService';

export const OrionChatMessagePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ChatMessage`, OrionChatMessage);
	},
};

export { OrionChatMessage, OrionChatMessageSetupService, OrionChatMessageEmits, OrionChatMessageProps };
