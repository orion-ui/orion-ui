<template>
	<div
		class="orion-input-range"
		:class="{
			'orion-input-range--readonly': readonly,
			'orion-input-range--disabled': disabled,
		}">
		<div class="runnable-track"/>
		<div
			v-if="!setup.multiple"
			class="orion-input-range__progress-bar"
			:class="`orion-input-range__progress-bar--${color}`"
			:style="setup.progressBarStyle"/>
		<div
			v-if="setup.multiple"
			class="orion-input-range__progress-bar"
			:class="`orion-input-range__progress-bar--${color}`"
			:style="setup.inputRangeStyle"/>
		<input
			:ref="setup._input"
			v-model="setup.minFieldValue"
			class="orion-input-range__input"
			:class="`orion-input-range__input--${color}`"
			type="range"
			v-bind="{
				...$attrs,
				step: step,
				readonly: readonly,
				disabled: disabled,
			}"
			:min="minValue"
			:max="maxValue">
		<input
			v-if="setup.multiple"
			v-model="setup.maxFieldValue"
			style="position: absolute; left: 0;"
			class="orion-input-range__input"
			:class="`orion-input-range__input--${color}`"
			type="range"
			v-bind="{
				...$attrs,
				step: step,
				readonly: readonly,
				disabled: disabled,
			}"
			:min="minValue"
			:max="maxValue">
	</div>
</template>

<script setup lang="ts">
import './OrionInputRange.less';
import OrionInputRangeSetupService from './OrionInputRangeSetupService';
import type { OrionInputRangeProps, OrionInputRangeEmits } from './OrionInputRangeSetupService';
const emits = defineEmits<OrionInputRangeEmits>() as OrionInputRangeEmits;
const props = withDefaults(defineProps<OrionInputRangeProps>(), OrionInputRangeSetupService.defaultProps);
const setup = new OrionInputRangeSetupService(props, emits);
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
 */
</script>
