<template>
	<o-horizontal-scroll
		:scroll-step="horizontalScrollStepper"
		:targets="state.preview ? horizontalScrollStepper : undefined"
		v-bind="state">
		<div
			id="horizontal-playground"
			class="flex g-8">
			<o-button
				v-for="number in 20"
				:key="number"
				outline
				color="info">
				{{ number }}
			</o-button>
		</div>
	</o-horizontal-scroll>

	<hr>
	<div class="row row--gutter row--middle">
		<div class="col-md-6">
			<color-selection
				v-model="state.shadowColor"
				label="Shadow color"
				show-greys/>
		</div>
		<div class="col-md-6">
			<o-input
				v-model="state.tolerance"
				label="Tolerance"
				type="number"/>
		</div>
	</div>
	<br>
	<div class="row row--gutter row--middle">
		<div class="col-md-4">
			<o-toggle
				v-model="state.dropShadow"
				label="Drop shadow"/>
		</div>
		<div class="col-md-4">
			<o-toggle
				v-model="state.preview"
				label="Show preview"/>
		</div>
		<div class="col-md-4">
			<o-toggle
				v-model="state.hideButton"
				label="Hide button"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
	shadowColor: 'grey-lighter',
	dropShadow: false,
	tolerance: 1,
	preview: true,
	hideButton: false,
});

function horizontalScrollStepper () {
	const buttons = document.getElementById('horizontal-playground')?.querySelectorAll('.orion-button');
	if (buttons) {
		return [...buttons] as HTMLElement[];
	}
	return [];
};
</script>

### Playground
