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
import type { OrionOverlayEmits, OrionOverlayProps } from './OrionOverlaySetup';
import OrionOverlaySetup from './OrionOverlaySetup';
const emits = defineEmits<OrionOverlayEmits>() as OrionOverlayEmits;
const props = withDefaults(defineProps<OrionOverlayProps>(), OrionOverlaySetup.defaultProps);
const setup = new OrionOverlaySetup(props, emits);
defineExpose(setup.publicInstance);
</script>
