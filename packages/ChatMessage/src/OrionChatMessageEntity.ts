import SharedEntity from 'packages/Shared/SharedEntity';
import useMonkey from 'services/MonkeyService';


export default class OrionChatMessageEntity extends SharedEntity<Orion.ChatMessage> {
	private discussion: Orion.ChatEntity;

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
		data: Orion.ChatMessage,
		discussion: Orion.ChatEntity,
	) {
		super(data);
		this.discussion = discussion;

		this.discussion.registerChatMessageEntity(this);
	}


	read () {
		this.entity.isRead = true;
	}
}
