<template>
	<o-page title="DailyCalendar">
		<o-daily-calendar
			v-if="dayTasks !== null"
			v-model:date="selectedDay"
			:day-tasks="dayTasks"/>
	</o-page>
</template>

<script setup lang="ts">
import { useNotif } from 'lib';
import { ref } from 'vue';

const dayTasks = ref([
	{
		id: 0,
		start: new Date(new Date().setHours(8, 0)),
		end: new Date(new Date().setHours(10, 0)),
		title: 'task number 1',
		color: 'info',
	},
	{
		id: 2,
		start: new Date(new Date().setHours(8, 30)),
		end: new Date(new Date().setHours(12, 0)),
		title: 'task number 2',
		color: 'success',
	},
	{
		id: 3,
		start: new Date(new Date().setHours(20, 0)),
		end: new Date(new Date().setHours(23, 0)),
		title: 'task with callback',
		color: 'danger',
		callback: () => {useNotif.success('task callback');},
	},
]);
const selectedDay = ref(new Date());
</script>
