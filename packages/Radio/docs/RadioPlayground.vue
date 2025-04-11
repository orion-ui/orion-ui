<template>
	<o-radio
		v-model="state.value"
		v-bind="state"/>
	<o-radio
		v-bind="state"
		v-model="state.value"
		label="Option 2"
		input-value="option2"/>
	<o-radio
		v-bind="state"
		v-model="state.value"
		label="Option 3"
		input-value="option3"/>

	<hr>

	<div class="row row--gutter row--middle">
		<div class="col-sm-4">
			<o-input
				v-model="state.label"
				label="Label"/>
		</div>
		<div class="col-sm-4">
			<color-selection v-model="state.color"/>
		</div>
		<div class="col-sm-4">
			<o-select
				v-model="state.iconCheck"
				clearable
				label="Icon"
				:options="icons"/>
		</div>
	</div>

	<div class="row row--grid row--toggles">
		<div class="col-sm-3">
			<o-toggle
				v-model="state.inline"
				label="Inline"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.reverse"
				label="Reverse"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.readonly"
				label="readonly"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.disabled"
				label="disabled"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { coolicons } from 'lib';

const state = reactive({
	value: [],
	inline: false,
	reverse: false,
	readonly: false,
	disabled: false,
	inputValue: 'option1',
	iconCheck: undefined,
	label: 'Option 1',
	color: 'brand' as Orion.Color,
});

const icons = computed(() => {
	return coolicons.slice(0, 50);
});
</script>

### Playground
