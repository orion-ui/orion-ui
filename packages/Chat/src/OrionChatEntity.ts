import { reactive } from 'vue';
import { groupBy } from 'lodash-es';

import useMonkey from 'services/MonkeyService';

import SharedEntity from 'packages/Shared/SharedEntity';
import OrionChatMessageEntity from '../../ChatMessage/src/OrionChatMessageEntity';
import type { ChatService } from '../../../services/ChatService';

export default class OrionChatEntity extends SharedEntity<Orion.Chat.Discussion> {
	private state = reactive({
		hidden: false,
		initialLoad: false,
		fullyLoaded: false,
		messages: new Map() as Map<number, OrionChatMessageEntity>,
		lastMessage: undefined as Undef<OrionChatMessageEntity>,
	});

	chat: ChatService;

	get initialLoad () { return this.state.initialLoad; }
	set initialLoad (val) { this.state.initialLoad = val; }

	get fullyLoaded () { return this.state.fullyLoaded; }
	set fullyLoaded (val) { this.state.fullyLoaded = val; }

	get hidden () { return this.state.hidden; }
	set hidden (val) { this.state.hidden = val; }

	get id () {
		return this.entity.id;
	}

	get messages () {
		return [...this.state.messages.values()];
	}

	get title () {
		return this.chat.config.discussionTitleFormatter
			? this.chat.config.discussionTitleFormatter(this)
			: this.interlocutors.map(p => p.name).join(', ');
	}

	get interlocutors () {
		return this.chat.config.discussionInterlocutorsFormatter
			? this.chat.config.discussionInterlocutorsFormatter(this)
			: this.entity.participants.filter(u => u.id !== this.chat.userId).slice(0, 3);
	}

	get participants () {
		return this.entity.participants;
	}

	get lastMessage () {
		return this.state.lastMessage;
	}

	get unreadMessagesCount () {
		if (this.chat.config.discussionUnreadMessagesCounter) {
			return this.chat.config.discussionUnreadMessagesCounter({
				discussion: this,
				discussionId: this.id,
				messages: this.messages,
			});
		} else if (this.messages.length) {
			return this.messages.filter(m => !m.isReadByUser).length;
		} else if (this.lastMessage) {
			return this.lastMessage.isReadByUser ? 0 : 1;
		} else {
			return 0;
		}
	}

	get createdDate () {
		return this.entity.createdDate;
	}

	get updatedDate () {
		return this.entity.updatedDate;
	}


	constructor (data: Partial<Orion.Chat.Discussion> & {id: number}, chat: ChatService) {
		super(data);
		this.chat = chat;

		data.messages?.forEach(m => this.registerChatMessageEntity(
			new OrionChatMessageEntity(
				m,
				this,
			)));

		if (data.lastMessage) {
			this.state.lastMessage = new OrionChatMessageEntity(
				data.lastMessage,
				this,
			);
		}
	}


	async fetchMessagesAsync () {
		await this.chat.fetchMessagesAsync(this.id);
	}

	addMessages (messages: Orion.Chat.Message[]) {
		this.chat.addMessagesToDiscussions(messages);
	}

	getMessageEntity (id: number) {
		return this.state.messages.get(id);
	}

	setLastMessage (message: OrionChatMessageEntity) {
		this.state.lastMessage = message;
	}

	setLastMessageFromRegistered () {
		const lastMessage = useMonkey(this.messages.sort((a, b) => a.createdDate.valueOf() - b.createdDate.valueOf())).last();
		if (lastMessage) this.setLastMessage(lastMessage);
	}

	getDiscussionDays (searchTerm?: string) {
		return groupBy(
			this.messages
				.filter(x => searchTerm
					? x.content?.toLowerCase().includes(searchTerm)
					: true,
				)
				.sort((a, b) => a.id - b.id),
			x => useMonkey(x.createdDate).toMidnight().valueOf(),
		);
	}

	registerChatMessageEntity (messageEntity: OrionChatMessageEntity) {
		this.state.messages.set(messageEntity.id, messageEntity);
	}

	async addNewMessageAsync (content: string) {
		await this.chat.addNewMessageAsync(this.id, content);
	}
}
