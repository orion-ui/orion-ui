<template>
	Add an image to test the cropper :

	<div
		class="flex fd-c"
		style="width:30rem; max-width:100%; margin:auto;">
		<o-upload
			v-model="files"
			horizontal
			:file-types="['image/jpeg', 'image/png']"/>

		<template v-if="files[0]">
			<o-cropper
				ref="_cropper"
				:zoom-max="4"
				:zoom-min="0.2"
				:zoom-step="0.1"
				:file="files[0]"/>

			<o-button
				color="primary"
				outline
				@click="cropAsync()">
				Crop
			</o-button>
		</template>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const _cropper = ref<OrionCropper>();
const files = ref<File[]>([]);

async function cropAsync () {
	const res = await _cropper.value?.crop();
	if (res) window.open(URL.createObjectURL(res));
}
</script>

@hl {15-17,23,36-39}

@lang:en
### Zoom

You can change the zoom configuration with the props `zoomMin`, `zoomMax` and `zoomStep`.
@lang

@lang:fr
### Zoom

Il est possible de modifier la configuration avec les props `zoomMin`, `zoomMax` et `zoomStep`.
@lang
