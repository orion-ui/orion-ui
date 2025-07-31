<template>
	<v-dropdown
		:ref="setup._popper"
		placement="top"
		:triggers="['click']"
		theme="orion-pop-confirm"
		@show="setup.handlePopoverShow()">
		<slot/>

		<template #popper>
			<p class="orion-pop-confirm__title">
				<slot name="content">
					<orion-icon icon="warning"/>
					{{ setup.title }}
				</slot>
			</p>
			<div
				:ref="setup._actions"
				class="orion-pop-confirm__actions"
				@keyup.esc="setup.cancel()">
				<slot
					name="actions"
					v-bind="{
						close: setup.close.bind(setup),
						confirm: setup.confirm.bind(setup),
						cancel: setup.cancel.bind(setup),
					}">
					<orion-button
						color="danger"
						outline
						size="xs"
						@click="setup.cancel()">
						{{ setup.lang.CANCEL }}
					</orion-button>
					<orion-button
						color="success"
						autofocus
						size="xs"
						@click="setup.confirm()">
						{{ setup.lang.CONFIRM }}
					</orion-button>
				</slot>
			</div>
		</template>
	</v-dropdown>
</template>

<script setup lang="ts">
import './OrionPopConfirm.less';
import { OrionButton } from 'packages/Button';
import { OrionIcon } from 'packages/Icon';
import OrionPopConfirmSetupService from './OrionPopConfirmSetupService';
import type { OrionPopConfirmProps, OrionPopConfirmEmits } from './OrionPopConfirmSetupService';
const emits = defineEmits<OrionPopConfirmEmits>() as OrionPopConfirmEmits;
const props = withDefaults(defineProps<OrionPopConfirmProps>(), OrionPopConfirmSetupService.defaultProps);
const setup = new OrionPopConfirmSetupService(props, emits);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the element that will trigger the popup
 * @doc/fr slot/default l'élément qui va déclencher la popup
 *
 * @doc slot/content the title of the popconfirm
 * @doc/fr slot/content titre de la popup
 *
 * @doc slot/actions actions of the popconfirm
 * @doc/fr slot/actions actions de la popup
 * @doc slot/actions/close/type function
 * @doc slot/actions/close/desc to close the popconfirm
 * @doc/fr slot/actions/close/desc fonction pour fermer la popup
 *
 * @doc slot/actions/confirm/type function
 * @doc slot/actions/confirm/desc to confirm the action
 * @doc/fr slot/actions/confirm/desc pour confirmer l'action
 *
 * @doc slot/actions/cancel/type function
 * @doc slot/actions/cancel/desc to cancel the action
 * @doc/fr slot/actions/cancel/desc pour annuler l'action
 */
</script>
