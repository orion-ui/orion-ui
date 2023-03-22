<template>
	<o-progress-bar
		v-bind="state"/>

	<hr>
	<div class="row row--gutter row--middle">
		<o-input
			v-model="state.value"
			type="number"
			label="Value"/>
		<o-input
			v-model="state.label"
			label="Label"/>
		<o-input
			v-model="state.width"
			type="number"
			label="Width"
			:min-value="1"/>
		<color-selection v-model="state.color"/>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
	value: 40,
	label: 'loading',
	color: 'info' as Orion.Color,
	width: 10,
});
</script>

### Playground
