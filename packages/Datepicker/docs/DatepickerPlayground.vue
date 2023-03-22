<template>
	<div class="row row--grid">
		<div class="col-sm-6">
			<o-datepicker
				v-model="state.date"
				v-model:range="state.daterange"
				clearable
				label="Date"
				v-bind="state"/>
		</div>
	</div>

	<hr>

	<div class="flex g-sm">
		<o-radio
			v-for="(type, index) in typeOptions"
			:key="index"
			v-model="state.type"
			:input-value="type"
			:label="type"/>
	</div>
	<div class="row row--grid">
		<div class="col-sm-6">
			<o-datepicker
				v-model="state.minDate"
				clearable
				label="Min date"/>
		</div>
		<div class="col-sm-6">
			<o-datepicker
				v-model="state.maxDate"
				clearable
				label="Max date"/>
		</div>
	</div>
	<div class="row row--grid row--toggles">
		<div class="col-sm-6">
			<o-toggle
				v-model="state.time"
				clearable
				label="Display Time"/>
		</div>
		<div class="col-sm-6">
			<o-toggle
				v-model="state.preserveTime"
				clearable
				label="Preserve time on date change"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const typeOptions = [
	'date',
	'range',
	'week',
];

const state = reactive({
	type: 'date' as Orion.DatepickerType,
	date: new Date(),
	daterange: null,
	minDate: null,
	maxDate: null,
	preserveTime: false,
	time: false,
});
</script>

### Playground
