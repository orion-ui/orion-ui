<template>
	<o-rate
		v-bind="state"
		v-model="state.modelValue"/>

	<hr>

	<div class="row row--grid-sm row--middle">
		<div class="col-sm-4">
			<o-input
				v-model="state.modelValue"
				type="number"
				label="Value"/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model="state.numberOfRates"
				type="number"
				label="Number of rates"/>
		</div>
		<div class="col-sm-4">
			<color-selection v-model="state.color"/>
		</div>
		<div class="col-sm-4">
			<o-select
				v-model="state.icon"
				clearable
				label="Icon"
				:options="icons"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.disabled"
				label="disabled"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { materialIcons } from 'lib';

const state = reactive({
	modelValue: 3,
	disabled: false,
	icon: 'check_circle' as Orion.Icon,
	numberOfRates: 10,
	color: 'warning' as Orion.Color,
});

const icons = computed(() => {
	return materialIcons.slice(0, 50);
});
</script>

### Playground
