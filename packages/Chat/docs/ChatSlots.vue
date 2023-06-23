<template>
	<o-chat
		v-if="discussionId"
		style="height:30rem"
		:chat="chat"
		:discussion-id="discussionId">
		<template #discussion-title>
			Conversation with : {{ chat.registry.get(discussionId)?.interlocutors.map(x => x.name).join(", ") }}
		</template>
		<template #prepend-discussion-actions>
			prepend
			<orion-icon icon="calendar"/>
		</template>
		<template #append-discussion-actions>
			<orion-icon icon="plus_circle"/>
		</template>
	</o-chat>
</template>

<script setup lang="ts">
import { useChat, getUid, useMonkey, sleep } from 'lib';
import { computed, reactive, ref } from 'vue';
import { OrionIcon } from 'packages/Icon';
import { faker } from '@faker-js/faker';
import { shuffle } from 'lodash-es';

const userId = getUid();
let discussionId = ref<number>();
let discussionsMessages = reactive({}) as Record<number, Orion.ChatMessage[]>;
let discussionsToFetch = reactive([]) as Orion.ChatDiscussion[];

const user: Orion.ChatUser = {
	id: userId,
	name: 'Bobby Sixkiller',
	avatar: faker.image.avatar(),
};

const chat = useChat({ user });

const sortedDiscussions = computed(() => {
	return [...discussionsToFetch].sort((a, b) => b.id - a.id);
});

initChat();

discussionId.value = sortedDiscussions.value[0].id;

function initChat () {
	chat.config.messageFetcherAsync = async ({ discussionId, oldestMessageId }) => {

		await sleep(400);
		const oldestMessageIndex = oldestMessageId
			? discussionsMessages[discussionId].findIndex(x => x.id < oldestMessageId)
			: 0;
		return discussionsMessages[discussionId].slice(oldestMessageIndex, oldestMessageIndex + 8);
	};

	chat.config.discussionFetcherAsync = async ({ oldestDiscussionId, searchTerm, searchTermHasChanged }) => {

		const filteredDiscussion = sortedDiscussions.value.filter(x => searchTerm
			? useMonkey(x.participants).mapKey('name').join(' ').toLowerCase().includes(searchTerm.toLowerCase())
			: true,
		);

		const oldestDiscussionIndex = (oldestDiscussionId && !searchTermHasChanged)
			? filteredDiscussion.findIndex(x => x.id < oldestDiscussionId)
			: 0;

		const discussionsToReturn = filteredDiscussion.slice(oldestDiscussionIndex, oldestDiscussionIndex + 5);

		return discussionsToReturn;
	};

	chat.config.discussionUnreadMessagesCounter = ({ discussionId, messages }) => {
		const messageEntitiesIds = useMonkey(messages).mapKey('id');
		return discussionsMessages[discussionId]
			?.filter((m: Orion.ChatMessage) => m.author.id !== user.id
				&& !messageEntitiesIds.includes(m.id)
				&& !m.isRead,
			).length + messages.filter(m => !m.isReadByUser).length;
	};

	discussionsToFetch.length = 0;
	discussionsToFetch.push(...seedDiscussions(1));
	chat.fetchDiscussionsAsync(undefined, false);
}

function seedDiscussions (dicussionLength = 15) {
	const discussions = [];
	const baseDate = dicussionLength === 1 ? new Date() : faker.date.recent(90);
	let i = 0;

	while (i < dicussionLength) {
		const agencyCompany: Orion.ChatUser = {
			id: getUid(),
			name: `${faker.name.firstName()} ${faker.name.lastName()}`,
			avatar: faker.image.image(),
			avatarProps: { square: false },
		};

		baseDate.setDate(baseDate.getDate() + 1);
		const updatedDate = new Date(baseDate);
		const createdDate = dicussionLength === 1 ? new Date() : faker.date.past(0, updatedDate);
		const id = getUid();
		const participants: Orion.ChatUser[] = [
			agencyCompany,
			{
				id: user.id,
				name: user.name,
				avatar: faker.image.image(),
			},
		];


		const discussion: Orion.ChatDiscussion = {
			id,
			createdDate,
			updatedDate,
			participants,
			messages: [],
			lastMessage: undefined,
		};

		discussionsMessages[discussion.id] = seedMessages(10,
			discussion.id,
			discussion.createdDate,
			discussion.updatedDate ?? discussion.createdDate,
			discussion.participants,
		);

		discussion.lastMessage = useMonkey(discussionsMessages[discussion.id]).first();
		discussion.messages = discussionsMessages[discussion.id];
		discussions.push(discussion);

		if (i === 0) {
			// discussionId.value = id;
		}

		i++;
	}
	return discussions;
}

function seedMessages (messagesLength: number, discussionId: number, discussionCreatedDate: Date, discussionUpdatedDate: Date, participants: Orion.ChatUser[]) {
	const messages: Orion.ChatMessage[] = [];
	const baseDate = faker.date.between(discussionCreatedDate, discussionUpdatedDate);
	let i = 0;

	while (i < messagesLength) {
		const interlocutorId = useMonkey(shuffle(useMonkey(participants).mapKey('id').filter(x => x !== user.id))).first();
		const interlocutor = participants.find(x => x.id === interlocutorId);
		const tempUser = i % 4 === 0 && messagesLength !== 1 ? user : interlocutor ?? user;

		baseDate.setHours(baseDate.getHours() + 5);
		const createdDate = new Date(baseDate);
		const id = getUid();

		messages.unshift({
			id,
			content: tempUser.id + ' • ' + id + ' • ' + faker.lorem.sentences(1),
			type: 0,
			createdDate,
			updatedDate: undefined,
			deletedDate: undefined,
			isRead: i < (messagesLength - 1) ? false : true,
			//isRead: messagesLength !== 1,
			metaData: undefined,
			author: tempUser,
			discussionId,
		});

		i++;
	}

	return messages;
}

</script>

@hl {6-15}

@lang:en
### Chat header

There are three slots you can use to change the appearance of a chat: `discussion-title`, `prepend-discussion-actions`, and `append-discussion-actions`.
@lang

@lang:fr
### Slots

Il y a 3 slots qu'il est possible d'utiliser pour modifier ou ajouter du contenu à un chat :
`discussion-title`, `prepend-discussion-actions`, et `append-discussion-actions`.
@lang
