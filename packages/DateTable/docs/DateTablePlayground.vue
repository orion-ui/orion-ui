<template>
	<o-date-table
		v-model="state.date"
		v-model:range="state.daterange"
		type="range"
		v-bind="state"
		range-start
		:periods="state.periods"/>

	<div class="playground-form flex fd-c g-sm">
		<div class="row row--gutter">
			<div class="col-sm-4">
				<o-toggle
					v-model="state.canGoPrevMonth"
					label="Can go prev month"/>
			</div>
			<div class="col-sm-4">
				<o-toggle
					v-model="state.canGoNextMonth"
					label="Can go next month"/>
			</div>
			<div class="col-sm-4">
				<o-toggle
					v-model="state.disableMonthAndYear"
					label="Disabled month and year"/>
			</div>
		</div>

		<o-section align="left">
			<o-button
				color="success"
				@click="addPeriod()">
				Add a period
			</o-button>
			<o-button
				color="danger"
				outline
				@click="reset()">
				Reset
			</o-button>
		</o-section>

		<div>
			<b>Add new period:</b>
			<div class="row row--gutter">
				<div class="col-sm-4">
					<o-datepicker
						v-model="periodToAdd.start"
						label="Start date"/>
				</div>
				<div class="col-sm-4">
					<o-datepicker
						v-model="periodToAdd.end"
						label="End date"/>
				</div>
				<div class="col-sm-4">
					<o-input
						v-model="periodToAdd.label"
						label="Label"/>
				</div>
				<div class="col-sm-4">
					<color-selection v-model="periodToAdd.color"/>
				</div>
			</div>
		</div>

		<div>
			<b>Add a specific day:</b>
			<div class="row row--gutter row--middle">
				<div class="col-sm-4">
					<o-datepicker
						v-model="specificToAdd.date"
						label="Date"/>
				</div>
				<div class="col-sm-4">
					<color-selection v-model="specificToAdd.color"/>
				</div>
				<div class="col-sm-4">
					<o-toggle
						v-model="specificToAdd.exclude"
						label="Exclude"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

type Specific = {
		color: Orion.Color;
		date: Date;
		exclude: boolean;
};

const today = new Date();

const specificToAdd = reactive({
	date: new Date(),
	color: 'info' as Orion.Color,
	exclude: false,
});

const periodToAdd = reactive({
	start: new Date(),
	end: new Date(),
	label: '',
	isStart: false,
	isEnd: false,
	color: 'info' as Orion.Color,
	specific: [] as Specific[],
});

const state = reactive({
	periods: [
		{
			isStart: false,
			isEnd: false,
			start: new Date(today.setDate(today.getDate())),
			end: new Date(today.setDate(today.getDate()+7)),
			label: 'period 1',
			color: 'info',
		},
	] as Orion.Period[],
	canGoNextMonth: true,
	canGoPrevMonth: true,
	disableMonthAndYear: false,
	daterange: null,
	date: new Date(),
});

function addPeriod () {
	if (specificToAdd.date !== undefined)
		periodToAdd.specific.push(specificToAdd);

	state.periods.push({ ...periodToAdd });
}

function reset () {
	state.periods.splice(1);
}
</script>

<style lang="less" scoped>
.playground-form {
	margin-top: 3rem;
}
</style>

@hl {6,130-146}

### Playground
