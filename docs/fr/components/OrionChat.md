---
lang: fr-FR
title: Chat
---

# Orion Chat & Discussions

Ce composant est relativement complexe du fait des mécanismes qu'il induit, notamment les échanges avec votre BackEnd et les événements en temps réel.\
Toutefois nous allons tenter de vous l'expliquer de façon simple en nous basant sur le playground ci-dessous.

:::tip
Il peut-être utilisé avec le composant `OrionChatDiscussionList` si vous devez gérer plusieurs conversations.\
Plus d'infos plus loin dans la section [OrionChatDiscussionList](#orionchatdiscussionlist).
:::

::: demo:Chat
ChatSimple
:::

<attribute-table package="Chat"/>

::: demo:Chat
ChatMultipleDiscussions
:::

<attribute-table package="ChatDiscussionList"/>


## Configuration de ChatService

<type-description>

Vous pouvez définir la configuration de votre instance au moment de sa création,
où plus tard par le biais de la propriété `config`

```ts:no-line-numbers
// Configuration du user à la création
const chat = useChat({ user });

// Configuration de l'écouteur par la suite
chat.config.onNewMessageAsync = async (message, registerMessage) => {
	// ...
};
```

Liste des paramètres:

<prop-description name="user" type="Orion.Chat.User">

L'utilisateur de votre application. **Ce paramètre est requis à la création**.

</prop-description>

<prop-description name="allowMessageStatus" type="boolean">

Affiche le statut du message (lu / non lu)

</prop-description>

<prop-description name="allowDiscussionCreation" type="boolean">

Affiche l'icône de création d'une discussion dans le composant `OrionChatDiscussionList`

</prop-description>

<prop-description name="allowDiscussionSearch" type="boolean">

Active la recherche parmi les discussions dans le composant `OrionChatDiscussionList`

</prop-description>

<prop-description name="discussionSearchTimer" type="number" value="500">

Le délai avant de déclencher la recherche dans les discussions

</prop-description>

<prop-description name="discussionFetcherAsync" type="(params: { oldestDiscussionId?: number, oldestDiscussionUpdatedDate?: Date, searchTerm?: string, searchTermHasChanged?: boolean }) => Promise<Discussion[]>">

La fonction permettant de récupérer la liste des discussions depuis le BackEnd

</prop-description>

<prop-description name="discussionTitleFormatter" type="(discussion: OrionChatEntity) => string">

La fonction permettant de formatter le titre des discussions

</prop-description>

<prop-description name="discussionInterlocutorsFormatter" type="(discussion: OrionChatEntity) => User[]">

La fonction permettant de formatter les participants à la discussion

</prop-description>

<prop-description name="discussionUnreadMessagesCounter" type="(params: {discussion: OrionChatEntity, discussionId: number, messages: OrionChatMessageEntity[] }) => number">

La fonction permettant de définir le nombre de messages non lus dans une discussion

</prop-description>

<prop-description name="messageFetcherAsync" type="(params: { discussion: OrionChatEntity, discussionId: number, oldestMessageId?: number }) => Promise<Message[]>">

La fonction permettant de récupérer la liste des messages depuis le BackEnd

</prop-description>

<prop-description name="onMessageReadAsync" type="(message: OrionChatMessageEntity) => void">

Callback à éxécuter lors de la lecture d'un message (pour sauvegarder son statut en BackEnd par exemple)

</prop-description>

<prop-description name="onNewMessageAsync" type="(message: OrionChatMessageEntity, registerMessage: () => void) => void">

Callback à éxécuter lors de la création d'un nouveau message par l'utilisateur

</prop-description>

<prop-description name="onActiveDiscussionChange" type="(discussionId?: number, oldDiscussionId?: number) => void">

Callback à éxécuter lors du changement de discussion

</prop-description>


</type-description>
