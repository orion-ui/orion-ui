<template>
	<color-picker
		class="orion-color-picker"
		:class="[
			{ 'orion-color-picker--hide-hex': setup.props.hideHex },
			{ 'orion-color-picker--hide-rgba': setup.props.hideRgba },
		]"
		theme="light"
		:color="setup.color"
		sucker-hide
		@change-color="setup.changeColor($event)"/>
</template>

<script setup lang="ts">
import './OrionColorPicker.less';
import { ColorPicker } from 'vue-color-kit';
import OrionColorPickerSetupService from './OrionColorPickerSetupService';
type ColorValue = {
  rgba: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  hsv: {
    h: number;
    s: number;
    v: number;
  };
  hex: string;
}
type VModelType = Nil<string>;
type ColorPickerEmit = {
  (e: 'focus', payload: FocusEvent): void;
  (e: 'blur', payload?: FocusEvent): void;
  (e: 'input', payload: VModelType): void;
  (e: 'change', val?: VModelType): void;
  (e: 'update:modelValue', payload: VModelType): void;
  (e: 'clear'): void;
	(e: 'picked', payload: ColorValue): void;
}
const emit = defineEmits<ColorPickerEmit>();
const props = defineProps(OrionColorPickerSetupService.props);
const setup = new OrionColorPickerSetupService(props, emit);
defineExpose(setup.publicInstance);

/** Doc
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
 * @doc event/update:modelValue/desc emitted to update the value
 * @doc/fr event/update:modelValue/desc émis pour mettre à jour la valeur
 *
 * @doc event/clear/desc emitted when the value is cleared
 * @doc/fr event/clear/desc
 *
 * @doc event/picked/desc emitted when a color is selected
 * @doc/fr event/picked/desc émis quand une couleur est selectionnée
 */
</script>
