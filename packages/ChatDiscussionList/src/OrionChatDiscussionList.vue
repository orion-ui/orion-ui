<template>
	<div class="orion-chat-discussion-list">
		<div class="orion-chat-discussion-list__header">
			<div class="orion-chat-discussion-list__subheader">
				<orion-input
					v-if="(setup.discussions.length || setup.searchTerm) && setup.chat.config.allowDiscussionCreation"
					v-model="setup.searchTerm"
					class="orion-chat-discussion-list__search"
					:label="setup.lang.SEARCH"
					suffix-icon="search"
					:donetyping="setup.chat.config.discussionSearchTimer"
					clearable/>

				<orion-button
					v-if="setup.discussions.length && setup.chat.config.allowDiscussionCreation"
					v-tooltip="setup.lang.ORION_CHAT_DISCUSSION__LIST_NEW_CONVERSATION"
					class="orion-chat-discussion-list__new-discussion"
					color="info"
					outline
					prefix-icon="message_writing"
					@click="setup.createNewDiscussion()"/>
			</div>

			<slot name="append-discussion-list-header"/>
		</div>

		<slot name="before-discussion-list"/>

		<transition-group
			v-if="setup.discussions.length || setup.searchTerm"
			ref="content"
			class="orion-chat-discussion-list__content"
			name="list-transitions"
			tag="div">
			<div
				v-for="discussion in setup.discussions"
				:key="discussion.id"
				ref="discussionListItem"
				class="orion-chat-discussion-list__item"
				:class="{
					'orion-chat-discussion-list__item--active': discussion.id === setup.chat.activeDiscussionId,
					'orion-chat-discussion-list__item--unread': discussion.unreadMessagesCount,
				}"
				@click="setup.selectDiscussion(discussion.id)">
				<slot
					name="discussion-item"
					v-bind="{ discussion }">
					<div class="orion-chat-discussion-list__item-content">
						<div
							class="orion-chat-discussion-list__item-avatars"
							:data-count="discussion.interlocutors.length">
							<orion-avatar
								v-for="interlocutor in discussion.interlocutors"
								:key="interlocutor.id"
								size="sm"
								v-bind="{
									...interlocutor,
									...interlocutor.avatarProps,
								}"/>
						</div>

						<div>
							<h5 class="orion-chat-discussion-list__item-header">
								<span class="orion-chat-discussion-list__item-interlocutor">{{ discussion.title }}</span>
								<span
									v-if="discussion.lastMessage"
									class="orion-chat-discussion-list__item-last-message-datetime">
									{{ setup.formatLastMessageDateTime(discussion.lastMessage.createdDate) }}
								</span>
							</h5>

							<div class="orion-chat-discussion-list__item-preview-wrapper">
								<div
									v-if="discussion.lastMessage"
									class="orion-chat-discussion-list__item-preview">
									{{ discussion.lastMessage.content }}
								</div>
								<span
									v-if="discussion.unreadMessagesCount"
									class="orion-chat-discussion-list__item-unread-count">
									{{ discussion.unreadMessagesCount }}
								</span>
							</div>
						</div>
					</div>
				</slot>

				<slot
					name="append-discussion-item"
					v-bind="{ discussion }"/>
			</div>

			<div
				v-show="setup.showLazyLoader"
				:ref="setup._lazyLoader"
				key="lazyLoader"
				class="orion-chat-discussion-list__lazy-loader">
				<orion-loader
					visible
					color="info"
					size="sm"/>
			</div>
		</transition-group>
		<div
			v-else
			class="orion-chat-discussion-list__content">
			<div class="orion-chat-discussion-list__no-discussion">
				<svg
					width="246px"
					height="170px"
					viewBox="0 0 246 170"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink">
					<g
						stroke="none"
						stroke-width="1"
						fill="none"
						fill-rule="evenodd">
						<g transform="translate(-912.000000, -388.000000)">
							<g transform="translate(880.000000, 388.000000)">
								<g transform="translate(32.000000, 0.000000)">
									<circle
										id="Oval"
										stroke="#717A8E"
										cx="138"
										cy="4"
										r="3.5"/>
									<circle
										id="Oval-Copy-14"
										stroke="#2BB9A6"
										cx="6"
										cy="56"
										r="5.5"/>
									<circle
										id="Oval-Copy-20"
										stroke="#D8D8D8"
										cx="33"
										cy="16"
										r="2.5"/>
									<circle
										id="Oval-Copy-16"
										stroke="#717A8E"
										cx="244"
										cy="84"
										r="1.5"/>
									<circle
										id="Oval-Copy-6"
										fill="#2BB9A6"
										cx="206"
										cy="147"
										r="4"/>
									<circle
										id="Oval-Copy-18"
										fill="#2BB9A6"
										cx="206"
										cy="16"
										r="4"/>
									<circle
										id="Oval-Copy-17"
										fill="#D8D8D8"
										cx="99"
										cy="22.5"
										r="2.5"/>
									<circle
										id="Oval-Copy-19"
										stroke="#CFD4E0"
										cx="14"
										cy="126.5"
										r="2"/>
									<rect
										id="Rectangle-Copy"
										fill="#DCDFE6"
										opacity="0.559593023"
										x="59.1944444"
										y="34"
										width="150.805556"
										height="92"
										rx="7"/>
									<rect
										id="Rectangle-Copy"
										fill="#F6F7F9"
										x="27"
										y="78"
										width="150.805556"
										height="92"
										rx="7"/>
									<rect
										id="Rectangle-Copy-9"
										fill="#2BB9A6"
										x="42"
										y="103"
										width="80"
										height="11"
										rx="5.5"/>
									<rect
										id="Rectangle-Copy-12"
										fill="#CFD4E0"
										x="80"
										y="53"
										width="59"
										height="11"
										rx="5.5"/>
									<rect
										id="Rectangle-Copy-11"
										fill="#DCDFE6"
										x="42"
										y="124"
										width="105"
										height="15"
										rx="7.5"/>
								</g>
							</g>
						</g>
					</g>
				</svg>

				<div class="orion-chat-discussion-list__no-discussion-label">
					{{ setup.lang.ORION_CHAT_DISCUSSION__LIST_NO_CONVERSATION }}
				</div>

				<orion-button
					v-if="setup.chat.config.allowDiscussionCreation"
					color="info"
					prefix-icon="message_writing"
					@click="setup.createNewDiscussion()">
					{{ setup.lang.ORION_CHAT_DISCUSSION__LIST_NEW_CONVERSATION }}
				</orion-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import './OrionChatDiscussionList.less';
import { OrionButton } from 'packages/Button';
import { OrionInput } from 'packages/Input';
import { OrionLoader } from 'packages/Loader';
import { OrionAvatar } from 'packages/Avatar';
import OrionChatDiscussionListSetupService from './OrionChatDiscussionListSetupService';
type Emits = {
	(e: 'new-discussion'): void;
	(e: 'select-discussion', payload: number): void;
}
const emits = defineEmits<Emits>();
const props = defineProps(OrionChatDiscussionListSetupService.props);
const setup = new OrionChatDiscussionListSetupService(props, emits);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/append-discussion-list-header the bottom content of the list header
 * @doc/fr slot/append-discussion-list-header contenu situé en bas de l'en-tête de la liste
 * @doc slot/before-discussion-list the content before all the discussion items
 * @doc/fr slot/before-discussion-list contenu placé juste avant la liste de discussions
 * @doc slot/discussion-item the content of the discussion item
 * @doc/fr slot/discussion-item contenu d'un élément de la liste
 * @doc slot/append-discussion-item the content under the discussion item
 * @doc/fr slot/append-discussion-item contenu situé juste après un élément de la liste
 *
 * @doc event/new-discussion/desc emitted when a new discussion is created
 * @doc/fr event/new-discussion/desc émis lorsqu'une nouvelle discussion est créée
 * @doc event/select-discussion/desc emitted when a discussion is selected
 * @doc/fr event/select-discussion/desc émis quand une discussion est séléctionnée
 */
</script>
