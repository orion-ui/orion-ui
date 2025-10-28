<template>
	<o-page title="Cropper">
		<o-upload
			v-model="files"
			horizontal
			style="width: 500px"/>
		<o-cropper
			v-if="files[0]"
			ref="_cropper"
			circle
			style="width: 500px"
			:file="files[0]"/>

		<o-section>
			<o-button
				color="primary"
				@click="validateCrop()">
				valider
			</o-button>
		</o-section>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNotif } from 'lib';

const _cropper = ref<OrionCropper>();
const files = ref<File[]>([]);

async function validateCrop () {
	const res = await _cropper.value?.crop();
	if (res) {
		window.open(URL.createObjectURL(res));
	}
	useNotif.info('cropped');
}
</script>
