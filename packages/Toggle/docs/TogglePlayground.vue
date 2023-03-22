<template>
	<o-toggle
		v-model="state.value"
		v-bind="state"/>

	<hr>

	<div class="row row--gutter">
		<div class="col-sm-4">
			<o-input
				v-model="state.label"
				label="Label"
				clearable/>
		</div>
		<div class="col-sm-4">
			<color-selection v-model="state.color"/>
		</div>
		<div class="col-sm-4">
			<size-selection v-model="state.size"/>
		</div>
	</div>

	<div class="row row--grid row--toggles">
		<div class="col-sm-4">
			<o-toggle
				v-model="state.inline"
				label="inline"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.reverse"
				label="reverse"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
	value: true,
	label: 'Label',
	color: 'info' as Orion.Color,
	inline: true,
	reverse: false,
	size: 'md' as Orion.Size,
});
</script>

### Playground
