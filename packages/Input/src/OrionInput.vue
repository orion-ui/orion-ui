<template>
	<orion-field
		v-bind="setup.orionFieldBinding"
		@clear="setup.clear()">
		<input
			:ref="setup._input"
			v-model="setup.vModelProxy"
			v-cleave="cleave"
			class="orion-input__input"
			:maxlength="maxLength"
			v-bind="{
				...$attrs,
				type: type,
				disabled: disabled,
				readonly: readonly,
				autocomplete: autocomplete,
			}"
			@keydown="setup.handleKeydownGuard($event)"
			@change="setup.handleChange()"
			@paste="setup.setVModelArray($event.clipboardData?.getData('text'))"
			@focus="setup.handleFocus($event)"
			@mousedown.right="emits('mousedown-right', $event)"
			@mouseup.left="setup.setCursorPosition($event)"
			@keyup.left="setup.setCursorPosition($event)"
			@keyup.right="setup.setCursorPosition($event)"
			@blur="setup.handleBlurCustom($event)">

		<div
			v-if="setup.showState
				&& (setup.showError || setup.showWarning)
				&& setup.validationHtmlMessages?.length"
			class="orion-input__error-message"
			v-html="setup.validationHtmlMessages"/>
	</orion-field>
</template>

<script setup lang="ts">
import './OrionInput.less';
import { OrionField } from 'packages/Field';
import OrionInputSetupService from './OrionInputSetupService';
import type { OrionInputProps, OrionInputEmits } from './OrionInputSetupService';
const emits = defineEmits<OrionInputEmits>() as OrionInputEmits;
const vModel = defineModel<Nil<string | number>>();
const props = withDefaults(defineProps<OrionInputProps>(), OrionInputSetupService.defaultProps);
const setup = new OrionInputSetupService(props, emits, vModel);
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
 * @doc event/clear/desc emitted when the field is cleared
 * @doc/fr event/clear/desc émis quand le champ est vidé
 *
 * @doc event/mousedown-right/desc emitted right-click
 * @doc/fr event/clear/desc émis lors du click droit
 *  */
</script>
