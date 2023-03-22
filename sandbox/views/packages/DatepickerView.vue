<template>
	<o-page title="Datepicker">
		<o-alert>
			<pre>date: {{ date }}</pre>
		</o-alert>
		<o-card style="width:320px">
			<o-datepicker
				v-model="date"
				label="simple date"/>
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
import { ref } from 'vue';

const date = ref<Date>();
const daterange = ref<Orion.DateRange>();
const dateweek = ref<Orion.DateRange>();
</script>
