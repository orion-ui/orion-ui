<template>
	<div
		:ref="setup._el"
		:style="{ zIndex: setup.zIndex }"
		class="orion-overlay"
		:class="{
			'orion-overlay--global': global,
			'orion-overlay--visible': setup.visible,
		}"
		@click="setup.handleClick()">
		<div class="orion-overlay__overscroll-behavior"/>
	</div>
</template>

<script setup lang="ts">
import './OrionOverlay.less';
import OrionOverlaySetupService from './OrionOverlaySetupService';
import type { OrionOverlayProps, OrionOverlayEmits } from './OrionOverlaySetupService';
const emits = defineEmits<OrionOverlayEmits>() as OrionOverlayEmits;
const props = withDefaults(defineProps<OrionOverlayProps>(), OrionOverlaySetupService.defaultProps);
const setup = new OrionOverlaySetupService(props, emits);
defineExpose(setup.publicInstance);
</script>
