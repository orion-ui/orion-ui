<template>
	<div
		v-if="setup.discussion"
		class="orion-chat">
		<div class="orion-chat__header">
			<div
				v-if="!setup.showSearch"
				class="orion-chat__title">
				<slot
					name="discussion-title"
					v-bind="{ discussion: setup.discussion }">
					<div class="orion-chat__avatars">
						<orion-avatar
							v-for="interlocutor in setup.discussion.interlocutors"
							:key="interlocutor.id"
							size="sm"
							v-bind="{
								...interlocutor,
								...interlocutor.avatarProps,
							}"/>
					</div>
					<div class="orion-chat__interlocutors">{{ setup.discussion.title }}</div>
				</slot>
			</div>

			<div class="orion-chat__actions">
				<slot
					name="prepend-discussion-actions"
					v-bind="{ discussion: setup.discussion, showSearch: setup.showSearch }"/>

				<template v-if="!setup.hideSearch">
					<orion-input
						v-if="setup.showSearch"
						:ref="setup._search"
						v-model="setup.searchTerm"
						class="orion-chat__search"
						label="Rechercher"
						:donetyping="300"
						clearable
						@keydown-esc="setup.toggleSearch()"
						@blur="setup.handleSearchBlur()"/>
					<orion-icon
						v-else
						icon="search_magnifying_glass"
						ripple="info"
						@click="setup.toggleSearch()"/>
				</template>

				<slot
					name="append-discussion-actions"
					v-bind="{ discussion: setup.discussion, showSearch: setup.showSearch }"/>
			</div>
		</div>

		<div
			:ref="setup._content"
			class="orion-chat__content">
			<div
				v-if="setup.showLazyLoader"
				:ref="setup._lazyLoader"
				class="orion-chat__lazy-loader">
				<orion-loader
					visible
					color="info"
					size="sm"/>
			</div>

			<div
				v-if="setup.discussion.messages.length"
				:ref="setup._sectionsWrapper"
				class="orion-chat__sections-wrapper">
				<div
					v-if="setup.unreadTop"
					class="orion-chat__unread-top">
					<span class="arrow">&#10140;</span>
					{{ setup.unreadMessageLabel }}
				</div>

				<section
					v-for="(messagesByDay, date) in setup.discussion.getDiscussionDays(setup.searchTerm)"
					:key="date"
					class="orion-chat__section">
					<h4 class="orion-chat__section-title">
						<span>{{ setup.getSectionTitle(+date) }}</span>
					</h4>
					<transition-group
						name="chat-message"
						appear
						:duration="1000">
						<orion-chat-message
							v-for="message in messagesByDay"
							:key="message.id"
							v-bind="{
								chat: setup.props.chat,
								discussion: setup.discussion,
								message,
							}"/>
					</transition-group>
				</section>

				<div
					v-if="setup.unreadBottom"
					class="orion-chat__unread-bottom">
					<span class="arrow">&#10140;</span>
					{{ setup.newMessageLabel }}
				</div>
			</div>

			<div
				v-else
				class="orion-chat__content-empty">
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
				<h4 v-if="setup.isLoading">{{ setup.lang.ORION_CHAT__LOADING_CONVERSATION }}</h4>
				<h4 v-else>{{ setup.lang.ORION_CHAT__START_CONVERSATION }}</h4>
			</div>
		</div>

		<div class="orion-chat__footer">
			<orion-textarea
				:ref="setup._input"
				v-model="setup.newMessage"
				:label="setup.textareaLabel"
				class="orion-chat__textarea"
				@submit="setup.sendNewMessageAsync()"/>
			<orion-icon
				v-tooltip="setup.sendTooltip"
				class="orion-chat__send"
				icon="chat_add"
				ripple="info"
				@click="setup.sendNewMessageAsync()"/>
		</div>

		<orion-loader
			:visible="setup.isLoading"
			:message="setup.lang.ORION_CHAT__LOADING_MESSAGES"/>
	</div>
</template>

<script setup lang="ts">
import './OrionChat.less';
import { OrionAvatar } from 'packages/Avatar';
import { OrionIcon } from 'packages/Icon';
import { OrionInput } from 'packages/Input';
import { OrionLoader } from 'packages/Loader';
import { OrionTextarea } from 'packages/Textarea';
import { OrionChatMessage } from 'packages/ChatMessage';
import OrionChatSetupService from './OrionChatSetupService';
type ChatEmit = { (e: 'new-message', payload: Orion.Chat.NewMessage): void; }
const props = defineProps(OrionChatSetupService.props);
const emit = defineEmits<ChatEmit>();
const setup = new OrionChatSetupService(props, emit);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/discussion-title title of the discussion
 * @doc/fr slot/discussion-title titre de la discussion
 * @doc slot/discussion-title/discussion/type OrionChatEntity
 * @doc slot/discussion-title/discussion/desc Instance of the discussion entity
 * @doc/fr slot/discussion-title/discussion/desc Instance de l'entité `discussion`
 *
 * @doc slot/prepend-discussion-actions left part of the action's content
 * @doc/fr slot/prepend-discussion-actions partie située avant les actions
 * @doc slot/prepend-discussion-actions/discussion/type OrionChatEntity
 * @doc slot/prepend-discussion-actions/discussion/desc Instance of the discussion entity
 * @doc/fr slot/prepend-discussion-actions/discussion/desc Instance de l'entité `discussion`
 * @doc slot/prepend-discussion-actions/showSearch/type boolean
 * @doc slot/prepend-discussion-actions/showSearch/desc `true` if the search field is displayed
 * @doc/fr slot/prepend-discussion-actions/showSearch/desc `true` si le champ de recherche est affiché
 *
 * @doc slot/append-discussion-actions right part of the action's content
 * @doc/fr slot/append-discussion-actions partie située à droite des actions
 * @doc slot/append-discussion-actions/discussion/type OrionChatEntity
 * @doc slot/append-discussion-actions/discussion/desc Instance of the discussion entity
 * @doc/fr slot/append-discussion-actions/discussion/desc Instance de l'entité `discussion`
 * @doc slot/prepend-discussion-actions/showSearch/type boolean
 * @doc slot/prepend-discussion-actions/showSearch/desc `true` if the search field is displayed
 * @doc/fr slot/prepend-discussion-actions/showSearch/desc `true` si le champ de recherche est affiché
 *
 * @doc event/new-message/desc emitted when a new message is sent
 * @doc/fr event/new-message/desc émis lorsqu'un nouveau message est envoyé
 */
</script>
