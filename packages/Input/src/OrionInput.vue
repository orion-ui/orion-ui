<template>
	<orion-field
		v-bind="setup.orionFieldBinding"
		@clear="setup.clear()">
		<input
			:ref="setup._input"
			v-model="setup.vModel"
			v-cleave="setup.props.cleave"
			class="orion-input__input"
			:maxlength="setup.props.maxLength"
			v-bind="{
				...$attrs,
				type: setup.props.type,
				disabled: setup.props.disabled,
				readonly: setup.props.readonly,
				autocomplete: autocomplete,
			}"
			@keydown="setup.handleKeydownGuard($event)"
			@change="setup.handleChange()"
			@focus="setup.handleFocus($event)"
			@blur="setup.handleBlur($event)">

		<div
			v-if="!setup.isValid && setup.orionFieldBinding.showError"
			class="orion-input__error-message">
			{{ setup.props.validationErrorMessage }}
		</div>
	</orion-field>
</template>

<script setup lang="ts">
import './OrionInput.less';
import { OrionField } from 'packages/Field';
import OrionInputSetupService from './OrionInputSetupService';
type VModelType = Nil<string | number>;
type FieldEmit = {
  (e: 'focus', payload: FocusEvent): void;
  (e: 'blur', payload?: FocusEvent): void;
  (e: 'input', payload: VModelType): void;
  (e: 'change', val?: VModelType): void;
  (e: 'update:modelValue', payload: VModelType): void;
  (e: 'clear'): void;
}
const emit = defineEmits<FieldEmit>();
const props = defineProps(OrionInputSetupService.props);
const setup = new OrionInputSetupService(props, emit);
const vCleave = OrionInputSetupService.cleaveDirective;
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
 *  */
</script>
