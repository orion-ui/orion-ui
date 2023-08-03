<template>
	<orion-field
		v-bind="setup.orionFieldBinding"
		class="orion-textarea"
		:class="{ 'orion-textarea-max-length': setup.props.maxLength }"
		@clear="setup.clear()">
		<textarea
			:ref="setup._input"
			v-model="setup.vModel"
			style="resize: none;"
			class="orion-input__input"
			:maxlength="setup.props.maxLength"
			v-bind="{
				...$attrs,
				disabled: setup.props.disabled,
				readonly: setup.props.readonly,
			}"
			@keydown.enter.meta="$emit('submit', setup.vModel)"
			@keydown.enter.ctrl="$emit('submit', setup.vModel)"
			@focus="setup.handleFocus($event)"
			@blur="setup.handleBlur($event)"/>

		<span
			v-if="maxLength"
			class="orion-input__textarea-counter">
			{{ setup.vModel?.length ?? 0 }}/{{ maxLength }}
		</span>
		<span
			v-else-if="setup.props.showLength"
			class="orion-input__textarea-counter">
			{{ setup.vModel?.length ?? 0 }}
		</span>

		<div
			v-if="!setup.isValid && setup.orionFieldBinding.showError"
			class="orion-input__error-message">
			{{ setup.props.validationErrorMessage }}
		</div>
	</orion-field>
</template>

<script setup lang="ts">
import './OrionTextarea.less';
import { inject } from 'vue';
import { OrionField } from 'packages/Field';
import OrionTextareaSetupService from './OrionTextareaSetupService';
type VModelType = Nil<string>;
type FieldEmit = {
  (e: 'focus', payload: FocusEvent): void;
  (e: 'blur', payload?: FocusEvent): void;
  (e: 'submit', payload: VModelType): void;
  (e: 'input', payload: VModelType): void;
  (e: 'change', val?: VModelType): void;
  (e: 'update:modelValue', payload: VModelType): void;
  (e: 'clear'): void;
}
const emit = defineEmits<FieldEmit>();
const _aside = inject<OrionAside>('_aside');
const _modal = inject<OrionModal>('_modal');
const props = defineProps(OrionTextareaSetupService.props);
const setup = new OrionTextareaSetupService(props, emit, _modal, _aside);
defineExpose(setup.publicInstance);

/** Doc
 * @doc event/focus/desc emitted on focus
 * @doc/fr event/focus/desc émis lors du focus
 *
 * @doc event/blur/desc emitted when the focus leaves the field
 * @doc/fr event/blur/desc émis quand le focus quitte le champ
 *
 * @doc event/input/desc emitted when the value of the field changes
 * @doc/fr event/input/desc émis lorsque la valeur est modifiée
 *
 * @doc event/change/desc emitted when the value of the field changes
 * @doc/fr event/change/desc émis lorsque la valeur est modifiée
 *
 * @doc event/update:modelValue/desc emitted to update the field value
 * @doc/fr event/update:modelValue/desc émis pour mettre à jour la valeur
 *
 * @doc event/clear/desc emitted when the field is cleared
 * @doc/fr event/clear/desc émis quand le champ est vidé
 *
 * @doc event/submit/desc emitted when the enter key is pressed
 * @doc/fr event/submit/desc émis lorsque la touche `entrée` est appuyée
 */
</script>
