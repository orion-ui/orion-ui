<template>
	<div class="row row--grid row--middle mb-xs">
		<div class="col-sm-4">
			<o-input
				v-model="state.title"
				label="Title"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.visible"
				label="Visible"/>
		</div>
	</div>

	<o-textarea
		v-model="state.content"
		label="Content"/>

	<o-footer-fixed v-bind="state">
		{{ state.content }}
	</o-footer-fixed>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
	visible: false,
	title: 'Lorem ipsum',
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor',
});
</script>

### Playground
