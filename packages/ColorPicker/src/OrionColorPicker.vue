<template>
	<color-picker
		class="orion-color-picker"
		:class="[
			{ 'orion-color-picker--hide-hex': hideHex },
			{ 'orion-color-picker--hide-rgba': hideRgba },
		]"
		theme="light"
		:color="setup.color"
		sucker-hide
		@change-color="setup.changeColor($event)"/>
</template>

<script setup lang="ts">
import './OrionColorPicker.less';
import { ColorPicker } from 'vue-color-kit';
import type { OrionColorPickerProps, OrionColorPickerEmits } from './OrionColorPickerSetupService';
import OrionColorPickerSetupService from './OrionColorPickerSetupService';
const vModel = defineModel<Nil<string>>();
const emits = defineEmits<OrionColorPickerEmits>() as OrionColorPickerEmits;
const props = withDefaults(defineProps<OrionColorPickerProps>(), OrionColorPickerSetupService.defaultProps);
const setup = new OrionColorPickerSetupService(props, emits, vModel);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant

 * @doc event/focus/desc emitted on focus
 * @doc/fr event/focus/desc émis lors du focus
 *
 * @doc event/blur/desc emitted when the focus leaves the component
 * @doc/fr event/blur/desc émis quand le focus quitte la case à cocher
 *
 * @doc event/input/desc emitted when the value changes
 * @doc/fr event/input/desc émis lorsque la valeur est modifiée
 *
 * @doc event/change/desc emitted when the value changes
 * @doc/fr event/change/desc  émis lorsque la valeur est modifiée
 *
 * @doc event/clear/desc emitted when the value is cleared
 * @doc/fr event/clear/desc
 *
 * @doc event/picked/desc emitted when a color is selected
 * @doc/fr event/picked/desc émis quand une couleur est selectionnée
 */
</script>
