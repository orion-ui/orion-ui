<template>
	<div class="flex fd-c g-xs ai-c">
		<o-upload
			v-model="state.files"
			v-bind="state"/>
	</div>

	<hr>

	<div class="row row--gutter-sm">
		<div class="col-sm-6">
			<o-select
				v-model="state.fileTypes"
				:options="fileTypes"
				multiple
				label="File types"/>
		</div>
		<div class="col-sm-3">
			<o-input
				v-model="state.label"
				label="Label"/>
		</div>
		<div class="col-sm-3">
			<o-input
				v-model="state.fileMaxSize"
				label="Max size (Mo)"
				type="number"/>
		</div>
	</div>

	<div class="mt-xs row row--gutter row--toggles">
		<div class="col-sm-3">
			<o-toggle
				v-model="state.multiple"
				label="Multiple"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.showPreview"
				label="Preview"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
	files: [],
	multiple: false,
	showPreview: true,
	label: undefined,
	fileTypes: ['image/jpeg', 'application/pdf'],
	fileMaxSize: 2,
});

const fileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
</script>

<style scoped lang="less">
.orion-upload {
  width:28rem;
	max-width:100%;
}
</style>

### Playground
