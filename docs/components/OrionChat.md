---
lang: en-US
title: Chat
---

# Orion Chat & Discussions

This component is relatively complex due to the mechanisms it entails, including interactions with your BackEnd and real-time events.\
However, we will try to explain it in a simple way based on the playground below.

:::tip
It can be used with the `OrionChatDiscussionList` component if you need to manage multiple conversations.\
More information can be found in the [OrionChatDiscussionList](#orionchatdiscussionlist) section.
:::

::: demo:Chat
ChatSimple
:::

<attribute-table package="Chat"/>

::: demo:Chat
ChatMultipleDiscussions
:::

<attribute-table package="ChatDiscussionList"/>


## ChatService configuration

<type-description>

You can define the configuration of your instance at the time of its creation or later through the `config` property.

```ts:no-line-numbers
// Configuration du user à la création
const chat = useChat({ user });

// Configuration de l'écouteur par la suite
chat.config.onNewMessageAsync = async (message, registerMessage) => {
	// ...
};
```

List of parameters:

<prop-description name="user" type="Orion.Chat.User">

The user of your application. **This parameter is required upon creation**.

</prop-description>

<prop-description name="allowMessageStatus" type="boolean">

Display the message status (read/unread)

</prop-description>

<prop-description name="allowDiscussionCreation" type="boolean">

Display the icon for creating a new discussion in the `OrionChatDiscussionList` component

</prop-description>

<prop-description name="allowDiscussionSearch" type="boolean">

Enable searching among discussions in the `OrionChatDiscussionList` component

</prop-description>

<prop-description name="discussionSearchTimer" type="number" value="500">

The delay before triggering the search within discussions

</prop-description>

<prop-description name="discussionFetcherAsync" type="(params: { oldestDiscussionId?: number, oldestDiscussionUpdatedDate?: Date, searchTerm?: string, searchTermHasChanged?: boolean }) => Promise<Discussion[]>">

The function to fetch the list of discussions from the BackEnd

</prop-description>

<prop-description name="discussionTitleFormatter" type="(discussion: OrionChatEntity) => string">

The function to format the title of discussions

</prop-description>

<prop-description name="discussionInterlocutorsFormatter" type="(discussion: OrionChatEntity) => User[]">

The function to format the participants of the discussion

</prop-description>

<prop-description name="discussionUnreadMessagesCounter" type="(params: {discussion: OrionChatEntity, discussionId: number, messages: OrionChatMessageEntity[] }) => number">

The function to determine the number of unread messages in a discussion

</prop-description>

<prop-description name="messageFetcherAsync" type="(params: { discussion: OrionChatEntity, discussionId: number, oldestMessageId?: number }) => Promise<Message[]>">

The function to fetch the list of messages from the BackEnd

</prop-description>

<prop-description name="onMessageReadAsync" type="(message: OrionChatMessageEntity) => void">

Callback to execute when reading a message (e.g., to save its status in the BackEnd)

</prop-description>

<prop-description name="onNewMessageAsync" type="(message: OrionChatMessageEntity, registerMessage: () => void) => void">

Callback to execute when the user creates a new message

</prop-description>

<prop-description name="onActiveDiscussionChange" type="(discussionId?: number, oldDiscussionId?: number) => void">

Callback to execute when changing the current discussion

</prop-description>


</type-description>
