<template>
	<o-daily-calendar
		v-if="dayTasks !== null"
		v-model:date="selectedDay"
		:day-tasks="dayTasks"/>
</template>

<script setup lang="ts">
import { useNotif } from 'lib';
import { ref } from 'vue';

const selectedDay = ref(new Date());
const dayTasks = ref([
	{
		id: 0,
		start: new Date(new Date().setHours(8, 0)),
		end: new Date(new Date().setHours(10, 0)),
		title: 'task with callback',
		color: 'info' as Orion.Color,
		callback: () => useNotif.info('You clicked on this task !'),
	},
]);
</script>

@hl {20}

@lang:en
### Callback event

Define your own callback when clicking on a task.
@lang

@lang:fr
### Évènement callback

Définissez votre propre callback lors du click sur une tâche.
@lang
