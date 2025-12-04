import { useMonkey } from 'services/MonkeyService';
import type { OrionChatEntity } from '../../Chat/src/OrionChatEntity';
import SharedEntity from '../../Shared/SharedEntity';


export class OrionChatMessageEntity extends SharedEntity<Orion.Chat.Message> {
	readonly discussion: OrionChatEntity;

	get isRead () { return this.entity.isRead; }
	set isRead (val) { this.entity.isRead = val; }

	get id () {
		return this.entity.id;
	}

	get isFromUser () {
		return this.entity.author.id === this.discussion.chat.userId;
	}

	get isReadByUser () {
		return this.isFromUser
			? true
			: this.isRead;
	}

	get author () {
		return this.entity.author;
	}

	get createdDate () {
		return this.entity.createdDate;
	}

	get createdReadableDate () {
		return useMonkey(this.entity.createdDate).toReadable('$hh:$mm');
	}

	get content () {
		return this.entity.content;
	}

	get isLastRead () {
		if (this.discussion.messages)
			return useMonkey(this.discussion?.messages
				.filter(m => m.isRead)
				.sort((cm, nm) => (cm.id - nm.id)),
			).last()?.id === this.id;
	}


	constructor (
		data: Orion.Chat.Message,
		discussion: OrionChatEntity,
		autoRegisterMessage = true,
	) {
		super(data);
		this.discussion = discussion;
		if (autoRegisterMessage) {
			this.discussion.registerChatMessageEntity(this);
		}
	}

	setId (id: number) {
		this.entity.id = id;
	}

	read () {
		this.entity.isRead = true;
	}
}
