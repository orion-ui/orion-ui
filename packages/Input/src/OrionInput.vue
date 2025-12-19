<template>
	<label
		v-if="!floatingLabel"
		:for="`orion-input_${setup._uid}`"
		class="orion-input__static-label">
		{{ label }}
	</label>

	<orion-field
		v-bind="setup.orionFieldBinding"
		@clear="setup.clear()">
		<input
			:id="`orion-input_${setup._uid}`"
			:ref="setup._input"
			v-model="setup.vModelProxy"
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
	</orion-field>
	<div
		v-if="setup.showState
			&& (setup.showError || setup.showWarning)
			&& setup.validationHtmlMessages?.length"
		class="orion-input__error-message"
		v-html="setup.validationHtmlMessages"/>
	<div
		v-if="hintText && !(setup.showState
			&& (setup.showError || setup.showWarning)
			&& setup.validationHtmlMessages?.length)"
		class="orion-input__hint-text">
		{{ hintText }}
	</div>
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
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 *  */
</script>
