<template>
	<orion-field
		v-bind="setup.orionFieldBinding"
		class="orion-textarea"
		:class="{ 'orion-textarea-max-length': maxLength }"
		@clear="setup.clear()">
		<textarea
			:ref="setup._input"
			v-model="vModel"
			style="resize: none;"
			class="orion-input__input"
			:maxlength="maxLength"
			v-bind="{
				...$attrs,
				disabled: disabled,
				readonly: readonly,
			}"
			@keydown.enter.meta="emits('submit', vModel)"
			@keydown.enter.ctrl="emits('submit', vModel)"
			@focus="setup.handleFocus($event)"
			@blur="setup.handleBlur($event)"/>

		<span
			v-if="maxLength"
			class="orion-input__textarea-counter">
			{{ vModel?.length ?? 0 }}/{{ maxLength }}
		</span>
		<span
			v-else-if="showLength"
			class="orion-input__textarea-counter">
			{{ vModel?.length ?? 0 }}
		</span>

		<div
			v-if="setup.showState
				&& (setup.showError || setup.showWarning)
				&& setup.validationHtmlMessages?.length"
			class="orion-input__error-message"
			v-html="setup.validationHtmlMessages"/>
	</orion-field>
</template>

<script setup lang="ts">
import './OrionTextarea.less';
import { inject } from 'vue';
import { OrionField } from 'packages/Field';
import OrionTextareaSetupService from './OrionTextareaSetupService';


const _aside = inject<OrionAside>('_aside');
const _modal = inject<OrionModal>('_modal');
const emits = defineEmits<OrionTextareaEmits>() as OrionTextareaEmits;
import type { OrionTextareaProps, OrionTextareaEmits } from './OrionTextareaSetupService';
const vModel = defineModel<Nil<string>>();
const props = withDefaults(defineProps<OrionTextareaProps>(), OrionTextareaSetupService.defaultProps);
const setup = new OrionTextareaSetupService(props, emits, vModel, _modal, _aside);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 */
</script>
