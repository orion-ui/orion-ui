<template>
	<div class="flex ai-c g-xs">
		<o-button
			color="danger"
			outline
			@click="discussionId = undefined">
			Close discussion
		</o-button>
		<o-button
			color="info"
			outline
			@click="simulateIncomingDiscussion()">
			Simul incoming discussion
		</o-button>
		<o-button
			color="info"
			outline
			@click="simulateIncomingMessage()">
			Simul incoming message
		</o-button>
		<o-input
			v-model.number="targetDiscussionId"
			label="DiscussionId"/>
	</div>

	<hr>

	<div
		class="flex g-sm"
		style="height:30rem">
		<o-chat-discussion-list
			style="flex:1"
			:chat="chat"
			@select-discussion="discussionId = $event;">
			<template #append-discussion-item="{ discussion }">
				<div style="display: flex">
					<o-label>{{ discussion.id }}</o-label>
				</div>
			</template>
		</o-chat-discussion-list>

		<div style="flex:2; max-width:19rem;">
			<o-chat
				v-if="discussionId"
				v-bind="state"
				:chat="chat"
				:discussion-id="discussionId">
				<template #prepend-discussion-actions>
					<orion-icon icon="calendar"/>
				</template>
				<template #append-discussion-actions>
					<orion-icon icon="plus_circle"/>
				</template>
			</o-chat>
		</div>
	</div>
	<hr>
	<div class="flex g-md">
		<o-toggle
			v-model="state.hideSearch"
			label="Hide Search"/>
		<o-toggle
			v-model="state.focusOnOpen"
			label="Focus on open"/>
	</div>
</template>

<script setup lang="ts">
import { useChat, getUid, useMonkey, useNotif, during } from 'lib';
import { computed, reactive, ref, watch } from 'vue';
import { OrionIcon } from 'packages/Icon';
import { faker } from '@faker-js/faker';
import { shuffle } from 'lodash-es';


const userId = getUid();
let discussionId = ref<number>();
let targetDiscussionId = ref<number>();
let discussionsMessages = reactive({}) as Record<number, Orion.ChatMessage[]>;
let discussionsToFetch = reactive([]) as Orion.ChatDiscussion[];

const user: Orion.ChatUser = {
	id: userId,
	name: 'Bobby Sixkiller',
	avatar: faker.image.avatar(),
};

const state = reactive({
	hideSearch: false,
	focusOnOpen: true,
});

const chat = useChat({ user });

const sortedDiscussions = computed(() => {
	return [...discussionsToFetch].sort((a, b) => b.id - a.id);
});

initChat();

watch(() => chat.activeDiscussionId, (val) => {
	targetDiscussionId.value = val;
});


function initChat () {
	chat.config.messageFetcher = async ({ discussionId, oldestMessageId }) => {

		await during(400);
		const oldestMessageIndex = oldestMessageId
			? discussionsMessages[discussionId].findIndex(x => x.id < oldestMessageId)
			: 0;
		return discussionsMessages[discussionId].slice(oldestMessageIndex, oldestMessageIndex + 8);
	};

	chat.config.discussionFetcher = async ({ oldestDiscussionId, searchTerm, searchTermHasChanged }) => {

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

	chat.config.onMessageRead = (message) => {
		useNotif.success(`Ajax for read message ${message.id}`);
	};

	chat.config.onNewMessage = (message) => {
		useNotif.success(`Ajax for new message ${message.id}`);
	};

	chat.config.discussionUnreadMessagesCounter = ({ discussionId, messages }) => {
		const messageEntitiesIds = useMonkey(messages).mapKey('id');
		return discussionsMessages[discussionId]
			?.filter((m: Orion.ChatMessage) => m.author.id !== user.id
				&& !messageEntitiesIds.includes(m.id)
				&& !m.isRead,
			).length + messages.filter(m => !m.isReadByUser).length;
	};

	/* chat.config.discussionTitleFormatter = (discussion) => {
		return `la discussion ${discussion.id}`;
	}; */

	/* chat.config.discussionInterlocutorsFormatter = (discussion) => {
		return discussion.participants
			.filter(x => x.id !== discussion.chat.userId)
			.map(x => ({
				...x,
				name: x.name.slice(0, 3),
			})).slice(0, 3);
	}; */

	discussionsToFetch.length = 0;
	discussionsToFetch.push(...seedDiscussions(15));
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

		if (i > 1) {
			participants.push({
				id: getUid(),
				name: `${faker.name.firstName()} ${faker.name.lastName()}`,
				avatar: faker.image.image(),
			});
		}

		if (i > 2) {
			participants.push({
				id: getUid(),
				name: `${faker.name.firstName()} ${faker.name.lastName()}`,
				avatar: faker.image.image(),
			});
		}

		if (i > 3) {
			participants.push({
				id: getUid(),
				name: `${faker.name.firstName()} ${faker.name.lastName()}`,
				avatar: faker.image.image(),
			});
		}

		const discussion: Orion.ChatDiscussion = {
			id,
			createdDate,
			updatedDate,
			participants,
			messages: [],
			lastMessage: undefined,
		};

		discussionsMessages[discussion.id] = seedMessages(dicussionLength === 1 ? 1 : 29,
			discussion.id,
			discussion.createdDate,
			discussion.updatedDate,
			discussion.participants,
		);

		discussion.lastMessage = useMonkey(discussionsMessages[discussion.id]).first();

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
			updatedDate: null,
			deletedDate: null,
			isRead: i < (messagesLength - 1) ? false : true,
			//isRead: messagesLength !== 1,
			metaData: undefined,
			author: tempUser,
			discussionId,
		});

		i++;
	}

	// return sortBy(messages, x => new Date(x.createdDate).toMidnight().valueOf());
	return messages;
}

function simulateIncomingMessage () {
	if (!targetDiscussionId.value) return;

	const discussion = chat.getDiscussion(targetDiscussionId.value);

	if (discussion) {
		const newMessage = useMonkey(seedMessages(1, discussion.id, discussion.createdDate, discussion.updatedDate, discussion.participants)).last();
		if (!newMessage) return;

		newMessage.createdDate = new Date();

		discussion.addMessages([newMessage]);
	}
}

function simulateIncomingDiscussion () {
	const newDiscussion = useMonkey(seedDiscussions(1)).first();
	if (!newDiscussion) return;

	chat.addDiscussion(newDiscussion);
}
</script>

### Playground
