<template>
	<o-chat
		class="demo-chat"
		:chat="chat"
		:discussion-id="1"/>
</template>

<script setup lang="ts">
import { faker } from '@faker-js/faker';
import { useChat, getUid, sleep } from 'lib';

const user: Orion.Chat.User = {
	id: getUid(),
	name: 'Jack',
	avatar: `https://picsum.photos/200?random=${getUid()}`,
};

const interlocutor: Orion.Chat.User = {
	id: getUid(),
	name: 'John',
	avatar: `https://picsum.photos/200?random=${getUid()}`,
};

const chat = useChat({ user });

chat.addDiscussion({
	id: 1,
	createdDate: new Date(),
	participants: [interlocutor],
	messages: [],
});

addFakeMessageAsync();

chat.config.onNewMessageAsync = async (message, registerMessage) => {
	// Here will be your ajax call to save the message on your BackEnd
	registerMessage();
	addFakeMessageAsync();
};


async function addFakeMessageAsync (delay = 1000) {
	await sleep(delay);
	chat.addMessagesToDiscussions([
		{
			discussionId: 1,
			id: getUid(),
			author: interlocutor,
			createdDate: new Date(),
			isRead: false,
			content: faker.lorem.sentence(),
		},
	]);
}
</script>

<style scoped lang="less">
.demo-chat {
	height: 25rem;
	border-radius: 0.5rem;
	overflow: hidden;
}
</style>

@hl {2-5,24,26-31,33,35-39,44}


@lang:en
## OrionChat

**The component `OrionChat` represents the chat window.**

For its proper functioning, it needs an instance of Orion's `ChatService`, as well as the `ID` of a conversation.\
In fact, its basic design is intended to work with multiple conversations (we will see this later).

Let's first observe an example below with a single conversation.

1. First, we create an instance of the `ChatService` using `useChat` // **line 24**.
2. Next, we add a conversation to this instance // **lines 26-31**.
3. Then, we add the first message to this conversation // **line 33**.
4. Finally, we configure the listener for the `onNewMessageAsync` event, which is called when the user sends a new message // **lines 35-39**.

The method `addMessagesToDiscussions`, used on **line 44**, allows you to add incoming messages via WebSocket to the relevant conversation.
@lang


@lang:fr
## OrionChat

**Le composant `OrionChat` représente la fenêtre de discussion.**

Pour son bon fonctionnement, il a besoin d'une instance du `ChatService` de **Orion**, ainsi que de l'`ID` d'une discussion.\
En effet, sa conception de base est prévue pour fonctionner avec plusieurs discussions (nous verrons cela dans un second temps).

Observons déjà un exemple ci-dessous avec une seule discussion.

1. Nous créons tout d'abord une instance du `ChatService` en utilisant `useChat` // **ligne 24**
2. Nous ajoutons ensuite une conversation à cette instance // **lignes 26-31**
3. Puis nous ajoutons un premier message à cette discussion // **lignes 33**
4. Enfin nous configurons l'écouteur de l'événement `onNewMessageAsync` qui est déclenché lorsque l'utilisateur envoie un nouveau message // **lignes 35-39**

La méthode `addMessagesToDiscussions` utilisée **ligne 44** vous permettra d'ajouter les messages entrant via WebSocket à la discussion concernée.
@lang
