<template>
	<o-page title="Datepicker">
		<pre>current language: {{ getAppLang() }}</pre>

		<o-alert>
			<pre>date: {{ date }}</pre>
		</o-alert>
		<o-card style="width:320px">
			<o-datepicker
				v-model="date"
				label="simple date"
				clearable
				time/>
		</o-card>

		<hr>

		<o-alert>
			<pre>date: {{ date2 }}</pre>
		</o-alert>
		<o-card style="width:320px">
			<o-datepicker
				v-model="date2"
				label="simple date"
				clearable/>
		</o-card>

		<hr>

		<o-alert>
			<pre>daterange: {{ daterange }}</pre>
		</o-alert>
		<o-card style="width:320px">
			<o-datepicker
				v-model:range="daterange"
				type="range"
				label="simple daterange"/>
		</o-card>

		<hr>

		<o-alert>
			<pre>dateweek: {{ dateweek }}</pre>
		</o-alert>
		<o-card style="width:320px">
			<o-datepicker
				v-model:range="dateweek"
				type="week"
				label="simple dateweek"/>
		</o-card>
	</o-page>
</template>

<script setup lang="ts">
import { getAppLang } from 'lib';
import { ref } from 'vue';

const date = ref<Date>(new Date(2023, 8, 3, 12, 2));
const date2 = ref<Date>(new Date(2023, 8, 3));
const daterange = ref<Orion.DateRange>();
const dateweek = ref<Orion.DateRange>();
</script>
