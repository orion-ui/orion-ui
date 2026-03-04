<template>
	<orion-field
		v-bind="setup.orionFieldBinding"
		@clear="setup.clear()">
		<template #hint>
			<slot name="hint"/>
		</template>

		<input
			:id="`orion-${setup.inputType}_${setup._uid}`"
			:ref="setup._orionInput"
			v-model="setup.vModelProxy"
			:placeholder="(!floatingLabel || setup.labelIsFloating) ? placeholder : undefined"
			v-bind="{
				...$attrs,
				type,
				disabled,
				readonly,
				autocomplete,
				maxlength,
				min: type === 'number' ? minValue : undefined,
				max: type === 'number' ? maxValue : undefined,
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
</template>

<script setup lang="ts">
import { OrionField } from 'packages/Field';
import './OrionInput.less';
import { OrionInputSetup, type OrionInputEmits, type OrionInputProps } from './OrionInputSetup';
const emits = defineEmits<OrionInputEmits>() as OrionInputEmits;
const vModel = defineModel<Nil<string | number>>();
const props = withDefaults(defineProps<OrionInputProps>(), OrionInputSetup.defaultProps);
const setup = new OrionInputSetup(props, emits, vModel);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 *  */
</script>
