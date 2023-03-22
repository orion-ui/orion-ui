<template>
	<o-label
		v-bind="state">
		{{ state.content }}
	</o-label>

	<hr>

	<div class="row row--gutter row--middle">
		<div class="col-sm-4">
			<o-input
				v-model="state.content"
				label="Content"
				clearable/>
		</div>
		<div class="col-sm-4">
			<size-selection v-model="state.size"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.outline"
				label="Outline"/>
		</div>
		<div class="col-sm-4">
			<color-selection v-model="state.color"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
	content: 'Duis mollis est',
	color: 'info' as Orion.Color,
	close: true,
	dual: false,
	outline: false,
	size: 'md' as Orion.Size,
});
</script>

### Playground
