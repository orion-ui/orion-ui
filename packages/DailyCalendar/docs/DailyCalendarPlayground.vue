<template>
	<o-section>
		<o-daily-calendar
			v-if="state.dayTasks"
			v-model:date="selectedDay"
			v-bind="state"
			:range="[startRange, endRange]"/>
	</o-section>

	<o-section gap="sm">
		<div class="row row--gutter">
			<div class="col-sm-4">
				<o-input
					v-model="startRange"
					:min-value="0"
					:max-value="23"
					type="number"
					label="Range start"/>
			</div>
			<div class="col-sm-4">
				<o-input
					v-model="endRange"
					:min-value="0"
					:max-value="23"
					type="number"
					label="Range end"/>
			</div>
		</div>

		<div class="row row--gutter">
			<div class="col-sm-4">
				<o-input
					v-model="taskToAdd.title"
					label="Title"/>
			</div>
			<div class="col-sm-4">
				<o-datepicker
					v-model="taskToAdd.start"
					label="Start date"
					time/>
			</div>
			<div class="col-sm-4">
				<o-select
					v-model="taskToAdd.duration"
					label="Duration"
					display-key="label"
					value-key="value"
					track-key="id"
					:options="taskDurationOptions"/>
			</div>
			<div class="col-sm-4">
				<color-selection v-model="taskToAdd.color"/>
			</div>
		</div>
	</o-section>

	<o-section gap="sm">
		<div class="flex g-xs">
			<o-button
				color="success"
				@click="addTask()">
				Add a task
			</o-button>
			<o-button
				color="danger"
				outline
				@click="reset()">
				Reset
			</o-button>
		</div>
	</o-section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { getUid } from 'lib';

const taskDurationOptions = [
	{
		id: 1,
		label: '30 minutes',
		value: 0.5,
	},
	{
		id: 2,
		label: '1 hour',
		value: 1,
	},
	{
		id: 3,
		label: '2 hours',
		value: 2,
	},
	{
		id: 4,
		label: '3 hours',
		value: 3,
	},
	{
		id: 5,
		label: '4 hours',
		value: 4,
	},
	{
		id: 6,
		label: '5 hours',
		value: 5,
	},
	{
		id: 7,
		label: '6 hours',
		value: 6,
	},
	{
		id: 8,
		label: '7 hours',
		value: 7,
	},
	{
		id: 9,
		label: '8 hours',
		value: 8,
	},
	{
		id: 10,
		label: '9 hours',
		value: 9,
	},
	{
		id: 11,
		label: '10 hours',
		value: 10,
	},
];

const currentHour = new Date().getHours();
const startRange = ref(currentHour - 6);
const endRange = ref(currentHour + 4);

const taskToAdd = reactive({
	start: new Date(),
	title: '',
	color: 'info' as Orion.Color,
	duration: 1,
});

const selectedDay = ref(new Date());

const state = reactive({
	dayTasks: [
		{
			id: 0,
			start: new Date(new Date().setHours(12, 0)),
			end: new Date(new Date().setHours(13, 0)),
			title: 'task number 1',
			color: 'info',
		},
	] as Orion.DailyCalendarTask[],
});

function addTask () {
	state.dayTasks.push({
		...taskToAdd,
		id: getUid(),
		end: new Date(new Date().setHours(taskToAdd.start.getHours() + taskToAdd.duration)),
	});
}

function reset () {
	state.dayTasks.splice(1);
	startRange.value = 8;
	endRange.value = 12;
}
</script>

@hl {6,149-159}

### Playground
