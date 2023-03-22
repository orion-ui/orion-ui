<template>
	<o-section align="left">
		<o-button @click="showGlobalOverlay()">
			Show global overlay
		</o-button>
		It will hide after 2 sec.
	</o-section>
</template>

<script setup lang="ts">
import { useOverlay } from 'lib';

function showGlobalOverlay () {
	useOverlay().show();

	setTimeout(() => {
		useOverlay().hide();
	}, 2000);
}
</script>

@hl {14}

@hmr services/Overlay.md

## Demo
