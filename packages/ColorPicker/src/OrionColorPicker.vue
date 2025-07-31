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
 */
</script>
