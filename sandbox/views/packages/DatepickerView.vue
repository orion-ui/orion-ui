<template>
	<o-page title="Datepicker">
		<pre>current language: {{ getAppLang() }}</pre>

		<o-alert>
			<pre>date: {{ date }}</pre>
			<pre>typeof: {{ typeof date }}</pre>
			<pre> = null: {{ date === null }}</pre>
		</o-alert>
		<o-card style="width:320px">
			<o-datepicker
				v-model="date"
				label="simple date"
				clearable
				time
				disabled
				clear-to-null/>
		</o-card>

		<hr>

		<o-alert>
			<pre>date: {{ date2 }}</pre>
			<pre>typeof: {{ typeof date2 }}</pre>
			<pre> = null: {{ date2 === null }}</pre>
		</o-alert>
		<o-card style="width:320px">
			<o-datepicker
				v-model="date2"
				label="simple date"
				clearable
				select-on-focus
				clear-to-null/>
		</o-card>

		<hr>

		<o-alert>
			<pre>daterange: {{ daterange }}</pre>
			<pre>typeof: {{ typeof daterange }}</pre>
			<pre> = null: {{ daterange === null }}</pre>
		</o-alert>
		<o-card style="width:320px">
			<o-datepicker
				v-model:range="daterange"
				type="range"
				label="simple daterange"
				clearable
				clear-to-null/>
		</o-card>

		<hr>

		<o-alert>
			<pre>dateweek: {{ dateweek }}</pre>
			<pre>typeof: {{ typeof dateweek }}</pre>
			<pre> = null: {{ dateweek === null }}</pre>
		</o-alert>
		<o-card style="width:320px">
			<o-datepicker
				v-model:range="dateweek"
				type="week"
				label="simple dateweek"
				clearable
				clear-to-null
				:min-date="new Date()"
				:max-date="new Date(2024, 2, 13)"
				hide-disabled/>
		</o-card>

		<hr>

		<o-alert>
			<pre>datemonth: {{ datemonth }}</pre>
			<pre>typeof: {{ typeof datemonth }}</pre>
			<pre> = null: {{ datemonth === null }}</pre>
		</o-alert>
		<o-card style="width:320px">
			<o-datepicker
				v-model:range="datemonth"
				type="month"
				label="simple datemonth"
				clearable
				clear-to-null/>
		</o-card>

		<hr>

		<o-alert>
			<pre>datemultiple: {{ datemultiple }}</pre>
			<pre>typeof: {{ typeof datemultiple }}</pre>
			<pre> = null: {{ datemultiple === null }}</pre>
		</o-alert>
		<o-card style="width:320px">
			<o-datepicker
				v-model:multiple="datemultiple"
				type="multiple"
				label="simple datemultiple"
				clearable
				clear-to-null/>
		</o-card>
	</o-page>
</template>

<script setup lang="ts">
import { getAppLang } from 'lib';
import { ref } from 'vue';

const date = ref<Date>(new Date(2023, 8, 3, 6, 42));
const date2 = ref<Date>(new Date(2023, 8, 3));
const daterange = ref<Orion.DateRange>();
const dateweek = ref<Orion.DateRange>();
const datemonth = ref<Orion.DateRange>();
const datemultiple = ref<Date[]>([]);
</script>
