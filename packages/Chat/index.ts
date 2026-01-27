import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionChat from './src/OrionChat.vue';
import OrionChatEntity from './src/OrionChatEntity';
import type { OrionChatEmits, OrionChatProps } from './src/OrionChatSetup';
import OrionChatSetup from './src/OrionChatSetup';

export const OrionChatPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Chat`, OrionChat);
	},
};

export { OrionChat, OrionChatEmits, OrionChatEntity, OrionChatProps, OrionChatSetup };

