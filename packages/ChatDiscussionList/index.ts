import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionChatDiscussionList from './src/OrionChatDiscussionList.vue';
import type { OrionChatDiscussionListEmits, OrionChatDiscussionListProps } from './src/OrionChatDiscussionListSetup';
import OrionChatDiscussionListSetup from './src/OrionChatDiscussionListSetup';

export const OrionChatDiscussionListPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ChatDiscussionList`, OrionChatDiscussionList);
	},
};

export { OrionChatDiscussionList, OrionChatDiscussionListEmits, OrionChatDiscussionListProps, OrionChatDiscussionListSetup };

