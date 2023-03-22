<template>
	<div>
		<o-section>
			<o-card title="Lorem">
				Nulla vitae elit libero, a pharetra augue. Aenean eu leo quam.
				Pellentesque ornare sem lacinia quam venenatis vestibulum.
				Aenean lacinia bibendum nulla sed consectetur.

				<o-overlay ref="_overlay"/>
			</o-card>
		</o-section>

		<o-section align="left">
			<o-button @click="_overlay?.show()">
				Show card overlay
			</o-button>
			<o-button @click="_overlay?.hide()">
				Hide card overlay
			</o-button>
			<o-button @click="showGlobalOverlay()">
				Show global overlay
			</o-button>
		</o-section>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useOverlay } from 'lib';

const _overlay = ref<OrionOverlay>();

function showGlobalOverlay () {
	useOverlay().show();
	setTimeout(() => useOverlay().hide(), 2000);
}
</script>

@hl {9,14,17,20,31,33-36}

### Playground
