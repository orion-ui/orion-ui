<template>
	<div
		:ref="setup._el"
		class="orion-overlay"
		:class="{
			'orion-overlay--global': setup.props.global,
			'orion-overlay--visible': setup.visible,
		}"
		@click="setup.handleClick()">
		<div class="orion-overlay__overscroll-behavior"/>
	</div>
</template>

<script setup lang="ts">
import './OrionOverlay.less';
import OrionOverlaySetupService from './OrionOverlaySetupService';
const props = defineProps(OrionOverlaySetupService.props);
const setup = new OrionOverlaySetupService(props);
defineExpose(setup.publicInstance);
</script>
