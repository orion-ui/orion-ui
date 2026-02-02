import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionChat from './src/OrionChat.vue';
import { OrionChatEntity } from './src/OrionChatEntity';
import { OrionChatSetup, type OrionChatEmits, type OrionChatProps } from './src/OrionChatSetup';

export const OrionChatPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Chat`, OrionChat);
	},
};

export { OrionChat, OrionChatEntity, OrionChatSetup, type OrionChatEmits, type OrionChatProps };
