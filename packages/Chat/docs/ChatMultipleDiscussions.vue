<template>
	<div class="flex g-xs">
		<o-chat-discussion-list
			class="demo-chat"
			:chat="chat"
			@select-discussion="(id) => selectedDiscussion = id"
			@new-discussion="createDiscussion()"/>

		<o-chat
			v-if="selectedDiscussion"
			class="demo-chat"
			:chat="chat"
			:discussion-id="selectedDiscussion"/>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { random, shuffle } from 'radash';
import { faker } from '@faker-js/faker';
import { useChat, getUid, sleep } from 'lib';

const selectedDiscussion = ref<number>();

const user: Orion.Chat.User = {
	id: getUid(),
	name: 'Jack',
	avatar: `https://picsum.photos/200?random=${getUid()}`,
};

const chat = useChat({
	user,
	discussionFetcherAsync: async () => generateDiscussions(5),
	onNewMessageAsync: (message, registerMessage) => {
		// Here will be your ajax call to save the message on your BackEnd
		registerMessage();
		addFakeMessageAsync(message.discussion.id);
	},
});

chat.fetchDiscussionsAsync();

async function addFakeMessageAsync (discussionId: number, delay = 1000) {
	const discussion = chat.getDiscussion(discussionId);
	if (!discussion) return;

	await sleep(delay);
	chat.addMessagesToDiscussions([
		{
			discussionId,
			id: getUid(),
			author: discussion.interlocutors[0],
			createdDate: new Date(),
			isRead: false,
			content: faker.lorem.sentence(),
		},
	]);
}

function generateInterlocutors (qty = 1): Orion.Chat.User[] {
	const interlocutors: Orion.Chat.User[] = [];

	for (let index = 0; index < qty; index++) {
		interlocutors.push({
			id: getUid(),
			name: faker.person.firstName(),
			avatar: `https://picsum.photos/200?random=${getUid()}`,
		});
	}

	return interlocutors;
}

function generateMessages (qty = 1, discussionId: number, interlocutors: Orion.Chat.User[], isRead = false): Orion.Chat.Message[] {
	const messages: Orion.Chat.Message[] = [];

	for (let index = 0; index < qty; index++) {
		messages.push({
			discussionId,
			isRead,
			id: getUid(),
			author: shuffle(interlocutors)[0],
			createdDate: new Date(),
			content: faker.lorem.sentence(),
		});
	}

	return messages;
}

function generateDiscussions (qty: number) {
	const discussions: Orion.Chat.Discussion[] = [];

	for (let i = 0; i < qty; i++) {
		const id = getUid();
		const participants = generateInterlocutors(random(1, 3));
		const messages = generateMessages(5, id, participants, true);
		const discussion: Orion.Chat.Discussion = {
			id,
			messages,
			participants,
			createdDate: new Date(),
			lastMessage: messages[messages.length-1],
		};
		discussions.push(discussion);
	}

	return discussions;
}

function createDiscussion () {
	// Place here the code to create your new discussion
	chat.addDiscussion(generateDiscussions(1)[0]);
}
</script>

<style scoped lang="less">
.demo-chat {
	height: 25rem;
	border-radius: 0.5rem;
	overflow: hidden;
	flex: 1;
}
</style>

@hl {3-7,33,60,74,91}

@lang:en
## OrionChatDiscussionList

Let's continue with our previous example, this time creating multiple conversations.

The `OrionChatDiscussionList` component **lines 3-7** will allow us to list these conversations
and select the one we want to display.

You have the option to disable the search field or the creation of new conversations
through the configuration of the `ChatService` instance (more information on the [configuration below](#chatservice-configuration)).

Here we use generators to simulate data coming from the BackEnd:
- `generateInterlocutors` **line 60**
- `generateMessages` **line 74**
- `generateDiscussions` **line 91**

We use `generateDiscussions` in the `discussionFetcherAsync` property of the configuration **(line 33)**.
This property allows fetching discussions from your BackEnd.
@lang

@lang:fr
## OrionChatDiscussionList

Reprenons notre exemple précédent en créant cette fois plusieurs discussions.

Le composant `OrionChatDiscussionList` **lignes 3-7** va nous permettre de lister ces discussions
et de sélectionner celle que nous souhaitons afficher.

Vous avez la possibilité de désactiver le champ de recherche ou la création de nouvelle discussion
via la configuration de l'instance du `ChatService` (plus d'infos sur la [configuration ci-dessous](#configuration-de-chatservice)).

Ici nous utilisons des générateurs pour simuler les données venant du BackEnd:
- `generateInterlocutors` **ligne 60**
- `generateMessages` **ligne 74**
- `generateDiscussions` **ligne 91**

Nous utilisons `generateDiscussions` dans la propriété `discussionFetcherAsync` de la configuration **(ligne 33)**.
Cette propriété permet de récupérer les discussions depuis votre BackEnd.
@lang
