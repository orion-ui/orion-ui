import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionChat from './src/OrionChat.vue';
import OrionChatSetupService from './src/OrionChatSetupService';
import OrionChatEntity from './src/OrionChatEntity';

export const OrionChatPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Chat`, OrionChat);
	},
};

export { OrionChat, OrionChatSetupService, OrionChatEntity };
