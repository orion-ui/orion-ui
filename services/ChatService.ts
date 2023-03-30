import mitt from 'mitt';
import useMonkey from './MonkeyService';
import { reactive } from 'vue';

import OrionChatMessageEntity from 'packages/ChatMessage/src/OrionChatMessageEntity';
import OrionChatEntity from 'packages/Chat/src/OrionChatEntity';
import { getUid } from 'utils/tools';


const defaultConfig: Omit<Orion.ChatConfig, 'user'> & {user: Undef<Orion.ChatUser>} = {
	user: undefined as Undef<Orion.ChatUser>,
	allowDiscussionSearch: true,
	discussionSearchTimer: 500,
	allowDiscussionCreation: true,
	allowMessageStatus: true,
	messageFetcher: async () => [],
	onActiveDiscussionChange: () => null,
	onMessageRead: () => null,
	onNewMessage: () => null,
};

export class ChatService {
	id = getUid();

	bus = mitt<{
		'message-added': number;
		'select-discussion': number;
		'new-discussion': void;
	}>();

	private state = reactive({
		activeDiscussionId: undefined as Undef<number>,
		discussionsFullyLoaded: false,
		registry: new Map<number, OrionChatEntity>(),
	});

	config: Orion.ChatConfig;

	get activeDiscussionId () { return this.state.activeDiscussionId; }
	set activeDiscussionId (val) { this.state.activeDiscussionId = val; }

	get discussionsFullyLoaded () { return this.state.discussionsFullyLoaded; }
	set discussionsFullyLoaded (val) { this.state.discussionsFullyLoaded = val; }

	get userId () {
		return this.config.user.id;
	}

	get discussions () {
		return [...this.registry.values()].filter(x => !x.hidden);
	}

	get registry () {
		return this.state.registry;
	}


	constructor (options: Orion.ChatOptions) {
		this.config = {
			...defaultConfig,
			...options,
		};
	}

	// #region Discussions
	async fetchDiscussions (searchTerm: Nil<string>, searchTermHasChanged: boolean) {
		if (!this.config.discussionFetcher) return;

		const loadedDiscussionIds = useMonkey(this.discussions).mapKey('id');
		const oldestDiscussionId = useMonkey([...this.discussions].sort((a, b) => a.id - b.id)).first()?.id;
		const oldestDiscussionUpdatedDate = useMonkey(
			[...this.discussions].sort((a, b) => a.updatedDate.valueOf() - b.updatedDate.valueOf()),
		).first()?.updatedDate;
		const fetchedDiscussions = await this.config.discussionFetcher({
			oldestDiscussionId,
			oldestDiscussionUpdatedDate,
			searchTerm,
			searchTermHasChanged,
		});

		if (searchTermHasChanged) {
			this.discussions.forEach(d => d.hidden = !!searchTerm?.length);

			fetchedDiscussions.forEach((discussion) => {
				const registeredDiscussion = this.registry.get(discussion.id);
				if (registeredDiscussion) {
					registeredDiscussion.hidden = false;
				} else {
					this.addDiscussion(discussion);
				}
			});
		} else {
			fetchedDiscussions
				.filter(d => !loadedDiscussionIds.includes(d.id))
				.forEach(d => this.addDiscussion(d));
		}
		this.discussionsFullyLoaded = !!fetchedDiscussions.length;
	}

	getDiscussion (discussionId: number) {
		return this.registry.get(discussionId);
	}

	deleteDiscussion (discussionId: number) {
		this.state.registry.delete(discussionId);
	}

	getActiveDiscussion () {
		if (this.state.activeDiscussionId)
			return this.getDiscussion(this.state.activeDiscussionId);
	}

	setDiscussions (discussions: Orion.ChatDiscussion[]) {
		discussions.forEach(d => this.registerDiscussionEntity(new OrionChatEntity(d, this)));
	}

	addDiscussion (discussion: Orion.ChatDiscussion) {
		this.registerDiscussionEntity(new OrionChatEntity(discussion, this));
	}

	registerDiscussionEntity (discussionEntity: OrionChatEntity) {
		this.state.registry.set(discussionEntity.id, discussionEntity);
	}

	registerBubbleEntity (bubbleEntity: OrionChatMessageEntity, discussionId: number) {
		this.registry.get(discussionId)?.registerChatMessageEntity(bubbleEntity);
	}
	// #endregion

	// #region Messages
	async fetchMessages (discussionId: number) {
		const discussion = this.getDiscussion(discussionId);

		if (!!discussion && !discussion.fullyLoaded) {
			const oldestMessageId = useMonkey(discussion.messages.sort((a, b) => a.id - b.id)).first()?.id;
			const messages = await this.config.messageFetcher({
				discussion,
				discussionId,
				oldestMessageId,
			});

			if (messages?.length) {
				messages
					.filter(m => !useMonkey(discussion.messages).mapKey().includes(m.id))
					.forEach(m => new OrionChatMessageEntity(m, discussion));
			} else {
				discussion.fullyLoaded = true;
			}
		}
	}

	getMessage (discussionId: number, messageId: number) {
		return this.getDiscussion(discussionId)?.getMessageEntity(messageId);
	}

	setMessageRead (discussionId: number, messageId: number) {
		const message = this.getMessage(discussionId, messageId);
		if (!message) return;

		message.read();
		this.config.onMessageRead(message);
	}

	addMessagesToDiscussion (discussionId: number, messages: Orion.ChatMessage[]) {
		const discussion = this.getDiscussion(discussionId);
		if (discussion) {
			messages.forEach(m => new OrionChatMessageEntity(m, discussion));
			discussion.setLastMessageFromRegistered();
			this.bus.emit('message-added', discussion.id);
		}
	}

	addNewMessage (discussionId: number, content: string) {
		if (!content?.trim().length) return;

		const discussion = this.getDiscussion(discussionId);
		if (!discussion) return;

		const message = new OrionChatMessageEntity(
			{
				id: getUid(),
				content,
				createdDate: new Date(),
				author: this.config.user,
			},
			discussion,
		);

		discussion.setLastMessage(message);

		this.config.onNewMessage(message);
	}
	// #endregion
}

export default function useChat (options: Orion.ChatOptions) {
	return new ChatService(options);
}

