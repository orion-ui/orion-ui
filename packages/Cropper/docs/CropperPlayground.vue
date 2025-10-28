<template>
	Add a file to test the cropper :

	<div
		class="flex fd-c"
		style="width:30rem; max-width:100%; margin:auto;">
		<o-upload
			v-model="files"
			horizontal
			:file-types="['image/jpeg', 'image/png']"/>

		<template v-if="files[0]">
			<o-cropper
				v-if="files[0]"
				ref="_cropper"
				v-bind="state"
				:file="files[0]"/>

			<div class="flex jc-c">
				<o-button
					color="primary"
					@click="cropAsync()">
					Crop
				</o-button>
			</div>
		</template>
	</div>

	<hr>

	<div class="row row--grid row--middle">
		<div class="col-sm-3">
			<o-input
				v-model="state.zoomMin"
				type="Number"
				label="Zoom min"/>
		</div>
		<div class="col-sm-3">
			<o-input
				v-model="state.zoomMax"
				type="Number"
				label="Zoom Max"/>
		</div>
		<div class="col-sm-3">
			<o-input
				v-model="state.zoomStep"
				type="Number"
				label="Zoom Step"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.circle"
				label="Circle"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const _cropper = ref<RefDom<OrionCropper>>();
const files = ref<File[]>([]);
const state = reactive({
	circle: true,
	zoomMin: 0.1,
	zoomMax: 3,
	zoomStep: 0.1,
	options: {},
	cropHeight: 300,
	cropWidth: 300,
});

async function cropAsync () {
	const res = await _cropper.value?.crop();
	if (res) window.open(URL.createObjectURL(res));
}
</script>

### Playground
