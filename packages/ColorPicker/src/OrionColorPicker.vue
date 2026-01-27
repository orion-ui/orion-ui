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
import { ColorPicker } from 'vue-color-kit';
import './OrionColorPicker.less';
import type { OrionColorPickerEmits, OrionColorPickerProps } from './OrionColorPickerSetup';
import OrionColorPickerSetup from './OrionColorPickerSetup';
const vModel = defineModel<Nil<string>>();
const emits = defineEmits<OrionColorPickerEmits>() as OrionColorPickerEmits;
const props = withDefaults(defineProps<OrionColorPickerProps>(), OrionColorPickerSetup.defaultProps);
const setup = new OrionColorPickerSetup(props, emits, vModel);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 */
</script>
