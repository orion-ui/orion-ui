<template>
	<o-page title="Chat">
		<!-- <pre>{{ [...chat.registry.keys()] }}</pre> -->

		<!-- <pre>{{ discussionsToFetch.length }}</pre> -->

		<div class="flex ai-c g-xs">
			<o-button
				color="error"
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
			<o-button
				color="info"
				outline
				@click="deleteDiscussion()">
				Delete discussion
			</o-button>
			<o-input
				v-model.number="targetDiscussionId"
				label="DiscussionId"/>
		</div>

		<hr>

		<div style="display:flex; gap:30px; height:450px">
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

			<div style="flex:2; max-width:300px;">
				<o-chat
					v-if="discussionId"
					focus-on-open
					:chat="chat"
					:discussion-id="discussionId">
					<template #prepend-discussion-actions>
						<orion-icon icon="calendar_month"/>
					</template>
					<template #append-discussion-actions>
						<orion-icon icon="add_circle_outline"/>
					</template>
				</o-chat>
			</div>
		</div>
	</o-page>
</template>

<script setup lang="ts">
import { useChat, getUid, useMonkey, sleep } from 'lib';
import { computed, reactive, ref, watch } from 'vue';
import { OrionIcon } from 'packages/Icon';
import { faker } from '@faker-js/faker';
import { shuffle } from 'lodash-es';


const userId = getUid();
let discussionId = ref<number>();
let targetDiscussionId = ref<number>();
let discussionsMessages = reactive({}) as Record<number, Orion.Chat.Message[]>;
let discussionsToFetch = reactive([]) as Orion.Chat.Discussion[];

const user: Orion.Chat.User = {
	id: userId,
	name: 'Bobby Sixkiller',
	avatar: faker.image.avatar(),
};

const chat = useChat({ user });

const sortedDiscussions = computed(() => {
	return [...discussionsToFetch].sort((a, b) => b.id - a.id);
});

initChat();

watch(() => chat.activeDiscussionId, (val) => {
	console.log(`🚀 ~ watch ~ val:`, val);
	targetDiscussionId.value = val;
});


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

		if (oldestDiscussionIndex === -1) {
			chat.setDiscussionsFullyLoaded(true);
			return [];
		}

		const discussionsToReturn = filteredDiscussion.slice(oldestDiscussionIndex, oldestDiscussionIndex + 5);

		return discussionsToReturn;
	};

	chat.config.onMessageReadAsync = (message) => {
		// useNotif.success(`Ajax for read message ${message.id}`);
	};

	chat.config.onNewMessageAsync = async (message, registerMessage) => {
		await sleep(600);
		registerMessage();
		// useNotif.success(`Ajax for new message ${message.id}`);
	};

	chat.config.discussionUnreadMessagesCounter = ({ discussionId, messages }) => {
		const messageEntitiesIds = useMonkey(messages).mapKey('id');
		return discussionsMessages[discussionId]
			?.filter((m: Orion.Chat.Message) => m.author.id !== user.id
				&& !messageEntitiesIds.includes(m.id)
				&& !m.isRead,
			).length + messages.filter(m => !m.isReadByUser).length;
	};

	chat.config.discussionTitleFormatter = (discussion) => {
		return `la discussion ${discussion.id}`;
	};

	chat.config.discussionInterlocutorsFormatter = (discussion) => {
		return discussion.participants
			.filter(x => x.id !== discussion.chat.userId)
			.map(x => ({
				...x,
				name: x.name.slice(0, 3),
			})).slice(0, 3);
	};

	chat.config.onActiveDiscussionChange = (discussionId, oldId) => {
		console.log(`🚀 ~ initChat ~ discussionId:`, discussionId);
		console.log(`🚀 ~ initChat ~ oldId:`, oldId);
	};

	discussionsToFetch.length = 0;
	discussionsToFetch.push(...seedDiscussions(15));

	chat.fetchDiscussionsAsync();
}

function seedDiscussions (dicussionLength = 15, messageLength = 39) {
	const discussions = [];
	const baseDate = dicussionLength === 1 ? new Date() : faker.date.recent({ days: 90 });
	let i = 0;

	while (i < dicussionLength) {
		const agencyCompany: Orion.Chat.User = {
			id: getUid(),
			name: `${faker.person.firstName()} ${faker.person.lastName()}`,
			avatar: faker.image.url(),
			avatarProps: { square: false },
		};

		baseDate.setDate(baseDate.getDate() + 1);
		const updatedDate = new Date(baseDate);
		const createdDate = dicussionLength === 1 ? new Date() : faker.date.past({
			years: 1,
			refDate: updatedDate,
		});
		const id = getUid();
		const participants: Orion.Chat.User[] = [
			agencyCompany,
			{
				id: user.id,
				name: user.name,
				avatar: faker.image.url(),
			},
		];

		if (i > 1) {
			participants.push({
				id: getUid(),
				name: `${faker.person.firstName()} ${faker.person.lastName()}`,
				avatar: faker.image.url(),
			});
		}

		if (i > 2) {
			participants.push({
				id: getUid(),
				name: `${faker.person.firstName()} ${faker.person.lastName()}`,
				avatar: faker.image.url(),
			});
		}

		if (i > 3) {
			participants.push({
				id: getUid(),
				name: `${faker.person.firstName()} ${faker.person.lastName()}`,
				avatar: faker.image.url(),
			});
		}

		const discussion: Orion.Chat.Discussion = {
			id,
			createdDate,
			updatedDate,
			participants,
			messages: [],
			lastMessage: undefined,
		};

		discussionsMessages[discussion.id] = seedMessages(messageLength,
			discussion.id,
			discussion.createdDate,
			discussion.updatedDate ?? discussion.createdDate,
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

// eslint-disable-next-line max-len
function seedMessages (messagesLength: number, discussionId: number, discussionCreatedDate: Date, discussionUpdatedDate: Date, participants: Orion.Chat.User[]) {
	const messages: Orion.Chat.Message[] = [];
	const baseDate = faker.date.between({
		from: discussionCreatedDate,
		to: discussionUpdatedDate,
	});
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
			// isRead: i < (messagesLength - 1) ? false : true,
			isRead: false,
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
		const newMessage = useMonkey(seedMessages(
			1,
			discussion.id,
			discussion.createdDate,
			discussion.updatedDate ?? discussion.createdDate,
			discussion.participants,
		)).last();

		if (!newMessage) return;

		newMessage.createdDate = new Date();

		discussion.addMessages([newMessage]);
	}
}

function simulateIncomingDiscussion () {
	const newDiscussion = useMonkey(seedDiscussions(1, 0)).first();
	if (!newDiscussion) return;

	chat.addDiscussion(newDiscussion);
}

function deleteDiscussion () {
	if (!targetDiscussionId.value) return;
	chat.deleteDiscussion(targetDiscussionId.value);
}
</script>

