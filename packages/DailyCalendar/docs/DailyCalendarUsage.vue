<template>
	<o-daily-calendar
		v-if="dayTasks !== null"
		v-model:date="selectedDay"
		:day-tasks="dayTasks"
		:range="[8, 12]"/>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const selectedDay = ref(new Date());
const dayTasks = ref([
	{
		id: 0,
		start: new Date(new Date().setHours(8, 0)),
		end: new Date(new Date().setHours(10, 0)),
		title: 'task number 1',
		color: 'info' as Orion.Color,
	},
	{
		id: 2,
		start: new Date(new Date().setHours(8, 30)),
		end: new Date(new Date().setHours(12, 0)),
		title: 'task number 2',
		color: 'success' as Orion.Color,
	},
	{
		id: 3,
		start: new Date(new Date().setHours(20, 0)),
		end: new Date(new Date().setHours(23, 0)),
		title: 'task number 3',
		color: 'danger' as Orion.Color,
	},
]);

</script>

@hl {5,6}

@lang:en
### Configuration

You can easily define the visible hour range with the `range` prop, or leave it by default to `[8,18]`.

All tasks of the day are passed as an `Orion.DailyCalendarTask[]` with the prop `dayTasks`.
@lang

@lang:fr
### Configuration

Il est possible de limiter la vue du calendrier à une certaine plage horaire avec la prop `range`, ou la laisser par défaut à `[8,18]`.

Les tâches du jour sont passées sous la forme `Orion.DailyCalendarTask[]` à la prop `dayTasks`.
@lang
