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
import './OrionCropper.less';
import { OrionButton } from 'packages/Button';
import { OrionInputRange } from 'packages/InputRange';
import { Cropper, CircleStencil, RectangleStencil } from 'vue-advanced-cropper';
import OrionCropperSetupService from './OrionCropperSetupService';
import type { OrionCropperProps, OrionCropperEmits } from './OrionCropperSetupService';
const emits = defineEmits<OrionCropperEmits>() as OrionCropperEmits;
const props = withDefaults(defineProps<OrionCropperProps>(), OrionCropperSetupService.defaultProps);
const setup = new OrionCropperSetupService(props, emits);
defineExpose(setup.publicInstance);
</script>
