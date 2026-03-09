<template>
	<orion-field
		v-bind="setup.orionFieldBinding"
		@clear="setup.clear()">
		<template #label>
			<slot name="label"/>
		</template>
		<template #hint>
			<slot name="hint"/>
		</template>

		<textarea
			:id="`orion-${setup.inputType}_${setup._uid}`"
			:ref="setup._orionInput"
			v-model="vModel"
			style="resize: none;"
			v-bind="{
				...$attrs,
				disabled,
				readonly,
				maxlength,
			}"
			@keydown.enter.meta="emits('submit', vModel)"
			@keydown.enter.ctrl="emits('submit', vModel)"
			@focus="setup.handleFocus($event)"
			@blur="setup.handleBlur($event)"/>

		<span
			v-if="maxlength"
			class="orion-textarea__counter">
			{{ vModel?.length ?? 0 }}/{{ maxlength }}
		</span>
		<span
			v-else-if="showLength"
			class="orion-textarea__counter">
			{{ vModel?.length ?? 0 }}
		</span>
	</orion-field>
</template>

<script setup lang="ts">
import { OrionField } from 'packages/Field';
import { inject } from 'vue';
import './OrionTextarea.less';
import { OrionTextareaSetup, type OrionTextareaEmits, type OrionTextareaProps } from './OrionTextareaSetup';
const _aside = inject<OrionAside>('_aside');
const _modal = inject<OrionModal>('_modal');
const emits = defineEmits<OrionTextareaEmits>() as OrionTextareaEmits;
const vModel = defineModel<Nil<string>>();
const props = withDefaults(defineProps<OrionTextareaProps>(), OrionTextareaSetup.defaultProps);
const setup = new OrionTextareaSetup(props, emits, vModel, _modal, _aside);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 */
</script>
