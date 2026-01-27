<template>
	<div
		v-if="setup.image"
		class="orion-cropper">
		<cropper
			:ref="setup._cropper"
			class="cropper"
			:src="setup.image"
			:stencil-component="circle ? CircleStencil : RectangleStencil"
			v-bind="setup.cropperOptions"
			@ready="setup.onReady()"/>

		<orion-input-range
			v-model="setup.zoom"
			:min-value="zoomMin"
			:max-value="zoomMax"
			:step="zoomStep"
			@input="setup.zoomCropper()"/>

		<div class="orion-cropper__actions">
			<orion-button
				nude
				prefix-icon="undo"
				@click="setup.rotateCropper(-90)"/>
			<orion-button
				nude
				prefix-icon="redo"
				@click="setup.rotateCropper(90)"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { OrionButton } from 'packages/Button';
import { OrionInputRange } from 'packages/InputRange';
import { CircleStencil, Cropper, RectangleStencil } from 'vue-advanced-cropper';
import './OrionCropper.less';
import type { OrionCropperEmits, OrionCropperProps } from './OrionCropperSetup';
import OrionCropperSetup from './OrionCropperSetup';
const emits = defineEmits<OrionCropperEmits>() as OrionCropperEmits;
const props = withDefaults(defineProps<OrionCropperProps>(), OrionCropperSetup.defaultProps);
const setup = new OrionCropperSetup(props, emits);
defineExpose(setup.publicInstance);
</script>
