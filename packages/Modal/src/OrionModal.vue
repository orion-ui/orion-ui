<template>
	<teleport
		to="#orion-popable-wrapper"
		:disabled="setup.options.programmatic">
		<dialog
			:id="`OrionModal-${setup.uid}`"
			:ref="setup._el"
			:style="setup.domStyle"
			class="orion-modal"
			:open="setup.visible"
			:class="[
				setup.options.customClass,
				`orion-modal--${setup.options.size}`,
				{ 'orion-modal--visible': setup.visible },
			]">
			<div
				v-if="$slots.poster"
				:id="`OrionModal-${setup.uid}__poster`"
				class="orion-modal__poster">
				<slot name="poster"/>
			</div>
			<div
				v-if="$slots.header || setup.options.title || setup.options.description"
				:id="`OrionModal-${setup.uid}__header`"
				class="orion-modal__header">
				<h5
					v-if="options.title"
					class="orion-modal__title">
					{{ options.title }}
				</h5>
				<span v-if="options.description">{{ options.description }}</span>
				<slot name="header"/>
			</div>

			<div
				:id="`OrionModal-${setup.uid}__footer`"
				class="orion-modal__footer">
				<div
					v-if="options?.actions?.length"
					class="orion-modal__actions">
					<orion-button
						v-for="(action, index) in options.actions"
						:key="index"
						v-bind="action"
						@click="setup.actionCallback(action)">
						{{ action.label }}
					</orion-button>
				</div>

				<slot
					name="footer"
					:close="setup.close.bind(setup)"/>
			</div>

			<div
				:id="`OrionModal-${setup.uid}__body`"
				class="orion-modal__body">
				<orion-section>
					<div
						v-if="setup.options.message"
						class="orion-modal__message"
						v-html="setup.options.message"/>

					<template v-if="setup.prompt?.type">
						<component
							:is="setup.promptFieldComponent"
							:ref="setup._prompt"
							v-model="setup.prompt.value"
							v-bind="setup.prompt.fieldProps"
							@submit="setup.trigger('confirm')"
							@keydown.enter.stop="setup.handlePromptEnter($event)"/>
					</template>

					<component
						:is="setup.options.Nested"
						v-if="setup.options.Nested && setup.isMounted"
						class="orion-modal__nested"
						v-bind="setup.options.NestedProps"/>

					<slot :close="setup.close.bind(setup)"/>
				</orion-section>
			</div>

			<teleport
				defer
				:to="setup.displayHeader
					? `#OrionModal-${setup.uid}__header`
					: `#OrionModal-${setup.uid}__body`">
				<span
					v-if="!setup.options.hideClose"
					class="orion-modal__close"
					@click="setup.close({ keepInQueue: false } )"
					@touchend.prevent.stop="setup.close({ keepInQueue: false } )"/>
			</teleport>

			<orion-loader :ref="setup._loader"/>
		</dialog>
	</teleport>
</template>

<script lang="ts">
export default {
	components: {
		OrionInput: defineAsyncComponent(() => import('../../Input/src/OrionInput.vue')),
		OrionTextarea: defineAsyncComponent(() => import('../../Textarea/src/OrionTextarea.vue')),
		OrionPassword: defineAsyncComponent(() => import('../../Password/src/OrionPassword.vue')),
		OrionDatepicker: defineAsyncComponent(() => import('../../Datepicker/src/OrionDatepicker.vue')),
		OrionSelect: defineAsyncComponent(() => import('../../Select/src/OrionSelect.vue')),
		OrionPhone: defineAsyncComponent(() => import('../../Phone/src/OrionPhone.vue')),
		OrionUpload: defineAsyncComponent(() => import('../../Upload/src/OrionUpload.vue')),
	},
};
</script>

<script setup lang="ts">
import { OrionButton } from 'packages/Button';
import { OrionLoader } from 'packages/Loader';
import { OrionSection } from 'packages/Section';
import { defineAsyncComponent, provide } from 'vue';
import './OrionModal.less';
import type { OrionModalEmits, OrionModalProps } from './OrionModalSetupService';
import OrionModalSetupService from './OrionModalSetupService';
const emits = defineEmits<OrionModalEmits>() as OrionModalEmits;
const props = withDefaults(defineProps<OrionModalProps>(), OrionModalSetupService.defaultProps);
const slots = defineSlots();
const setup = new OrionModalSetupService(props, emits, slots);
provide('_modal', setup.publicInstance);
defineExpose(setup.publicInstance);


/** Doc
 * @doc slot/header the header of the modal
 * @doc/fr slot/header en-tête de la modal
 *
 * @doc slot/poster the poster of the modal
 * @doc/fr slot/poster en-tête de la modal
 *
 * @doc slot/footer the content on the bottom, useful for actions
 * @doc/fr slot/footer contenu en bas, pratique pour les actions
 * @doc slot/footer/close/type () => void
 * @doc slot/footer/close/desc to close the modal
 * @doc/fr slot/footer/close/desc fonction pour fermer la modal
 *
 * @doc slot/default the content of the modal
 * @doc/fr slot/default contenu de la modal
 * @doc slot/default/close/type () => void
 * @doc slot/default/close/desc to close the modal
 * @doc/fr slot/default/close/desc fonction pour fermer la modal
 */
</script>
