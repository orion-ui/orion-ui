<template>
	<div
		class="orion-input-range"
		:class="{
			'orion-input-range--readonly': setup.props.readonly,
			'orion-input-range--disabled': setup.props.disabled,
		}">
		<div class="runnable-track"/>
		<div
			v-if="!setup.multiple"
			class="orion-input-range__progress-bar"
			:class="`orion-input-range__progress-bar--${setup.props.color}`"
			:style="setup.progressBarStyle"/>
		<div
			v-if="setup.multiple"
			class="orion-input-range__progress-bar"
			:class="`orion-input-range__progress-bar--${setup.props.color}`"
			:style="setup.inputRangeStyle"/>
		<input
			:ref="setup._minInput"
			v-model="setup.minFieldValue"
			class="orion-input-range__input"
			:class="`orion-input-range__input--${setup.props.color}`"
			type="range"
			v-bind="{
				...$attrs,
				step: setup.props.step,
				readonly: setup.props.readonly,
				disabled: setup.props.disabled,
			}"
			:min="minValue"
			:max="maxValue">
		<input
			v-if="setup.multiple"
			:ref="setup._maxInput"
			v-model="setup.maxFieldValue"
			style="position: absolute; left: 0;"
			class="orion-input-range__input"
			:class="`orion-input-range__input--${setup.props.color}`"
			type="range"
			v-bind="{
				...$attrs,
				step: setup.props.step,
				readonly: setup.props.readonly,
				disabled: setup.props.disabled,
			}"
			:min="setup.props.minValue"
			:max="setup.props.maxValue">
	</div>
</template>

<script setup lang="ts">
import './OrionInputRange.less';
import OrionInputRangeSetupService from './OrionInputRangeSetupService';
type VModelType = Nil<number[] | number>;
type FieldEmit = {
  (e: 'focus', payload: FocusEvent): void;
  (e: 'blur', payload?: FocusEvent): void;
  (e: 'input', payload: VModelType): void;
  (e: 'change', val?: VModelType): void;
  (e: 'update:modelValue', payload: VModelType): void;
  (e: 'clear'): void;
}
const emit = defineEmits<FieldEmit>();
const props = defineProps(OrionInputRangeSetupService.props);
const setup = new OrionInputRangeSetupService(props, emit);
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
