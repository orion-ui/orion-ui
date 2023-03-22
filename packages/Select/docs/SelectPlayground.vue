<template>
	<div class="row row--grid">
		<div class="col-sm-6">
			<o-select
				v-model="state.value"
				v-bind="state"
				size="lg"
				:options="selectData.options"/>
		</div>
	</div>

	<hr>

	<div class="row row--grid">
		<div class="col-sm-4">
			<o-input
				v-model="state.label"
				label="Label"/>
		</div>
		<div class="col-sm-4">
			<o-select
				v-model="state.prefixIcon"
				label="Prefix icon"
				clearable
				:options="icons"/>
		</div>
		<div class="col-sm-4">
			<o-select
				v-model="state.suffixIcon"
				label="Suffix icon"
				clearable
				:options="icons"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.autocomplete"
				label="Autocomplete"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.searchable"
				label="Searchable"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.multiple"
				label="Multiple"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.clearable"
				label="Clearable"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { coolicons } from 'lib';

const state = reactive({
	value: null,
	label: 'My label',
	autocomplete: false,
	searchable: false,
	multiple: false,
	clearable: false,
	trackKey: 'id',
	displayKey: 'label',
	valueKey: 'label',
	disabledKey: 'htrf',
	donetyping: 600,
	prefixIcon: undefined,
	suffixIcon: undefined,
});

const icons = computed(() => {
	return coolicons.slice(0, 50);
});


const selectData = reactive({
	options: [
		{
			id: 0,
			label: 'yes',
		},
		{
			id: 1,
			label: 'no',
		},
		{
			id: 2,
			label: 'maybe',
		}],
});
</script>

### Playground
