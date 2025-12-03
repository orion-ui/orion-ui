import { groupBy } from 'lodash-es';
import mitt from 'mitt';
import { Reactive } from 'utils/decorators';
import { getUid } from 'utils/tools';
import OrionChatEntity from '../packages/Chat/src/OrionChatEntity';
import OrionChatMessageEntity from '../packages/ChatMessage/src/OrionChatMessageEntity';
import { useMonkey } from './MonkeyService';


const defaultConfig: Omit<Orion.Chat.Config, 'user'> & {user: Undef<Orion.Chat.User>} = {
	user: undefined as Undef<Orion.Chat.User>,
	allowDiscussionSearch: true,
	discussionSearchTimer: 500,
	allowDiscussionCreation: true,
	allowMessageStatus: true,
	messageFetcherAsync: async () => [],
	onActiveDiscussionChange: () => null,
	onMessageReadAsync: () => null,
	onNewMessageAsync: () => null,
};

export class ChatService {
	id = getUid();

	bus = mitt<{
		'message-added': number;
		'select-discussion': number;
		'new-discussion': void;
	}>();

	@Reactive private readonly state = {
		activeDiscussionId: undefined as Undef<number>,
		discussionsFullyLoaded: false,
		registry: new Map<number, OrionChatEntity>(),
	};

	config: Orion.Chat.Config;

	get activeDiscussionId () { return this.state.activeDiscussionId; }
	set activeDiscussionId (val) {
		const oldVal = this.state.activeDiscussionId;
		this.state.activeDiscussionId = val;
		this.config.onActiveDiscussionChange(val, oldVal);
	}

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


	constructor (options: Orion.Chat.Options) {
		this.config = {
			...defaultConfig,
			...options,
		};
	}


	// #region Discussions
	async fetchDiscussionsAsync (searchTerm?: string, searchTermHasChanged?: boolean) {
		if (!this.config.discussionFetcherAsync) return;

		const loadedDiscussionIds = useMonkey(this.discussions).mapKey('id');
		const oldestDiscussionId = useMonkey([...this.discussions].sort((a, b) => a.id - b.id)).first()?.id;
		const oldestDiscussionUpdatedDate = useMonkey(
			[...this.discussions].sort((a, b) => (a.updatedDate ?? 0).valueOf() - (b.updatedDate ?? 0).valueOf()),
		).first()?.updatedDate;
		const fetchedDiscussions = await this.config.discussionFetcherAsync({
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

	setDiscussions (discussions: Orion.Chat.Discussion[]) {
		discussions.forEach(d => this.registerDiscussionEntity(new OrionChatEntity(d, this)));
	}

	addDiscussion (discussion: Orion.Chat.Discussion) {
		this.registerDiscussionEntity(new OrionChatEntity(discussion, this));
	}

	registerDiscussionEntity (discussionEntity: OrionChatEntity) {
		this.state.registry.set(discussionEntity.id, discussionEntity);
	}

	registerBubbleEntity (bubbleEntity: OrionChatMessageEntity, discussionId: number) {
		this.registry.get(discussionId)?.registerChatMessageEntity(bubbleEntity);
	}

	setDiscussionsFullyLoaded (fullyLoaded: boolean) {
		this.discussionsFullyLoaded = fullyLoaded;
	}
	// #endregion

	// #region Messages
	async fetchMessagesAsync (discussionId: number) {
		const discussion = this.getDiscussion(discussionId);

		if (!!discussion && !discussion.fullyLoaded) {
			const oldestMessageId = useMonkey(discussion.messages.sort((a, b) => a.id - b.id)).first()?.id;
			const messages = await this.config.messageFetcherAsync({
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
		this.config.onMessageReadAsync(message);
	}

	addMessagesToDiscussions (messages: Orion.Chat.Message[]) {
		const discussionIds = groupBy(messages, 'discussionId');

		Object.keys(discussionIds).forEach((discussionId) => {
			const discussion = this.getDiscussion(+discussionId);
			if (discussion) {
				messages.forEach(m => new OrionChatMessageEntity(m, discussion));
				discussion.setLastMessageFromRegistered();
				this.bus.emit('message-added', discussion.id);
			}
		});

	}

	async addNewMessageAsync (discussionId: number, content: string) {
		if (!content?.trim().length) return;

		const discussion = this.getDiscussion(discussionId);
		if (!discussion) return;

		const message = new OrionChatMessageEntity(
			{
				id: getUid(),
				discussionId,
				isRead: false,
				content,
				createdDate: new Date(),
				author: this.config.user,
			},
			discussion,
			false,
		);

		await this.config.onNewMessageAsync(message, () => discussion.registerChatMessageEntity(message));

		discussion.setLastMessage(message);
	}
	// #endregion
}

export default function useChat (options: Orion.Chat.Options) {
	return new ChatService(options);
}

