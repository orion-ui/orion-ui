<template>
	<o-color-picker
		v-model="state.value"
		v-bind="state"/>

	<hr>

	<div class="row row--grid">
		<div class="col-sm-4">
			<o-input
				v-model="state.value"
				label="Color"/>
		</div>
		<div class="col-sm-4">
			<o-select
				v-model="state.format"
				label="Format"
				:options="formatOptions"/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model="state.debounce"
				type="number"
				label="debounce"/>
		</div>
	</div>
	<div class="row row--grid row--toggles">
		<div class="col-sm-4">
			<o-toggle
				v-model="state.hideHex"
				label="Hide hex"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.hideRgba"
				label="Hide rgba"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
type ColorFormat = 'rgba' | 'hsv' | 'hex';

const state = reactive({
	value: '#D64EC9',
	hideHex: false,
	hideRgba: false,
	startValue: undefined,
	format: 'hex' as ColorFormat,
	debounce: 0,
});

const formatOptions = [
	'rgba',
	'hex',
	'hsv',
];
</script>

### Playground
