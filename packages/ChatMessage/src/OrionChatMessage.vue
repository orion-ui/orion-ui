<template>
	<div
		v-if="setup.message"
		class="orion-chat-message"
		:class="{
			'orion-chat-message--from-user': setup.message.isFromUser,
			'orion-chat-message--from-interlocutor': !setup.message.isFromUser,
			'orion-chat-message--is-read': !!setup.message.isReadByUser,
			'orion-chat-message--is-unread': !setup.message.isReadByUser,
		}"
		:data-chat-message-id="setup.message.id"
		:data-chat-message-author-id="setup.message.author.id">
		<div class="orion-chat-message__wrapper">
			<orion-avatar
				class="orion-chat-message__avatar"
				v-bind="{
					...setup.message?.author,
					...setup.message?.author.avatarProps,
				}"
				size="sm"/>
			<div class="orion-chat-message__data">
				<div
					v-if="!setup.message?.isFromUser"
					class="orion-chat-message__author">
					{{ setup.message?.author.name }} • {{ setup.message.createdReadableDate }}
				</div>
				<div
					v-else
					class="orion-chat-message__author">
					{{ setup.message.createdReadableDate }}
				</div>
				<div class="orion-chat-message__message">
					{{ setup.message?.content }}
				</div>
			</div>
		</div>

		<div
			v-if="setup.messageStatusEnabled
				&& setup.message.isFromUser
				&& ((setup.message.isLastRead && setup.message.isRead) || !message.isRead)"
			class="orion-chat-message__status">
			{{ setup.message.isRead
				? setup.lang.ORION_CHAT_MESSAGE__READ
				: setup.lang.ORION_CHAT_MESSAGE__DELIVERED
			}}
		</div>
	</div>
</template>

<script setup lang="ts">
import './OrionChatMessage.less';
import { OrionAvatar } from 'packages/Avatar';
import OrionChatMessageSetupService from './OrionChatMessageSetupService';
import type { OrionChatMessageProps, OrionChatMessageEmits } from './OrionChatMessageSetupService';
const emits = defineEmits<OrionChatMessageEmits>() as OrionChatMessageEmits;
const props = withDefaults(defineProps<OrionChatMessageProps>(), OrionChatMessageSetupService.defaultProps);
const setup = new OrionChatMessageSetupService(props, emits);
defineExpose(setup.publicInstance);
</script>
