<template>
	<o-input-range
		v-if="state.range"
		v-model="state.valueRange"
		v-bind="state"/>
	<o-input-range
		v-else
		v-model="state.value"
		v-bind="state"/>

	<hr>

	<div class="flex fd-c g-16">
		<div>
			<code v-if="!state.range">value: {{ state.value }}</code>
			<code v-else>range value : [{{ state.valueRange[0] }} , {{ state.valueRange[1] }}]</code>
		</div>

		<div class="row row--grid row--toggle">
			<div class="col-sm-4">
				<o-toggle
					v-model="state.range"
					label="Range"/>
			</div>
			<div class="col-sm-4">
				<o-toggle
					v-model="state.disabled"
					label="Disabled"/>
			</div>
			<div class="col-sm-4">
				<o-toggle
					v-model="state.readonly"
					label="Readonly"/>
			</div>
		
		</div>
		

		<div class="row row--grid-xs">
			<div class="col-sm-4">
				<o-input
					v-model="state.step"
					label="Step"
					type="number"/>
			</div>
			<div class="col-sm-4">
				<o-input
					v-model="state.minValue"
					label="Min value"
					type="number"/>
			</div>
			<div class="col-sm-4">
				<o-input
					v-model="state.maxValue"
					label="Max value"
					type="number"/>
			</div>
			<div class="col-sm-4">
				<color-selection v-model="state.color"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
	value: 10,
	valueRange: [20, 30],
	range: false,
	disabled: false,
	readonly: false,
	step: 1,
	minValue: 0,
	maxValue: 100,
	color: 'brand' as Orion.Color,
});
</script>

### Playground
