<template>
	<div class="row row--grid">
		<div class="col-sm-6">
			<o-datepicker
				v-model="state.date"
				v-model:range="state.daterange"
				v-model:multiple="state.dates"
				label="Date"
				v-bind="state"/>
		</div>
	</div>
	<div class="row row--grid">
		<div class="col-sm-6 flex fd-c fw-w">
			<strong>daterange: </strong><pre>{{ state.daterange }}</pre>
			<strong>date:</strong> <div class="flex fw-w">{{ state.date }}</div>
			<br>
			<strong>dates:</strong> <pre>{{ state.dates }}</pre>
		</div>
	</div>
	<hr>

	<div class="flex g-16 fw-w">
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
		<div class="col-sm-4">
			<o-toggle
				v-model="state.time"
				clearable
				label="Display Time"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.preserveTime"
				clearable
				label="Preserve time on date change"/>
		</div>
	</div>

	<div class="row row--grid row--toggles">
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
		<div class="col-sm-4">
			<o-toggle
				v-model="state.clearable"
				label="Clearable"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const typeOptions = [
	'date',
	'range',
	'week',
	'month',
	'multiple',
];

const state = reactive({
	type: 'date' as Orion.DatepickerType,
	date: new Date(),
	dates: [],
	daterange: undefined,
	minDate: undefined,
	maxDate: undefined,
	preserveTime: false,
	time: false,
	disabled: false,
	readonly: false,
	clearable: false,
});
</script>

### Playground
