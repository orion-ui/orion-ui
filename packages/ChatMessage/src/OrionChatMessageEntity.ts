import SharedEntity from 'packages/Shared/SharedEntity';
import useMonkey from 'services/MonkeyService';


export default class OrionChatMessageEntity extends SharedEntity<Orion.Chat.Message> {
	private discussion: Orion.Chat.Entity;

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
		discussion: Orion.Chat.Entity,
	) {
		super(data);
		this.discussion = discussion;

		this.discussion.registerChatMessageEntity(this);
	}


	read () {
		this.entity.isRead = true;
	}
}
