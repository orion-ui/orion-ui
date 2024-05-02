<template>
	<o-page title="DateTable">
		<o-alert><pre>{{ date }}</pre></o-alert>
		<div class="mv-sm">
			<o-toggle
				v-model="showWeekNumber"
				label="show week number"/>
		</div>
		<o-card style="width:20rem">
			<o-date-table
				v-model="date"
				type="range"
				:periods="periods"
				:display-week-number="showWeekNumber"/>
		</o-card>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showWeekNumber = ref(true);
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const date = ref(new Date());
const periods = ref<OrionDateTable.Props['periods']>([
	{
		start: new Date(currentYear, currentMonth, 3),
		end: new Date(currentYear, currentMonth, 17),
		color: 'success',
		label: 'turlutu',
		callback: () => console.log('sfldk'),
	},
	{
		start: new Date(currentYear, currentMonth, 13),
		end: new Date(currentYear, currentMonth, 20),
		color: 'pink',
		label: 'tototo',
		callback: () => console.log('sfldk'),
	},
]);
</script>
