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
const vModel = defineModel<number | number[]>({ required: true });
const props = withDefaults(defineProps<OrionInputRangeProps>(), OrionInputRangeSetupService.defaultProps);
const setup = new OrionInputRangeSetupService(props, emits, vModel);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 */
</script>
