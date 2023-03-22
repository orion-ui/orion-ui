<template>
	<o-progress-circle v-bind="state"/>

	<hr>
	<div class="row row--gutter row--middle">
		<o-input
			v-model="state.value"
			type="number"
			label="Value"/>
		<o-input
			v-model="state.pathWidth"
			type="number"
			label="Path width"
			:min-value="1"/>
		<o-input
			v-model="state.valueWidth"
			type="number"
			label="Value width"
			:min-value="1"/>
		<o-input
			v-model="state.label"
			label="Label"/>
		<color-selection v-model="state.color"/>
		<o-input
			v-model="state.size"
			type="number"
			label="Size"
			:min-value="1"/>
	</div>
</template>


<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
	value: 40,
	size: 100,
	label: '40%',
	color: 'info' as Orion.Color,
	pathWidth: 10,
	valueWidth: 8,
});
</script>

### Playground
