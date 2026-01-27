import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionChatDiscussionList from './src/OrionChatDiscussionList.vue';
import { OrionChatDiscussionListSetup, type OrionChatDiscussionListEmits, type OrionChatDiscussionListProps } from './src/OrionChatDiscussionListSetup';

export const OrionChatDiscussionListPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ChatDiscussionList`, OrionChatDiscussionList);
	},
};

export { OrionChatDiscussionList, OrionChatDiscussionListSetup, type OrionChatDiscussionListEmits, type OrionChatDiscussionListProps };
