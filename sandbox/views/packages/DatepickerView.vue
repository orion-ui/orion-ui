<template>
	<o-page title="Datepicker">
		<pre>current language: {{ getAppLang() }}</pre>

		<o-alert>
			<pre>date: {{ date }}</pre>
			<pre>typeof: {{ typeof date }}</pre>
			<pre> = null: {{ date === null }}</pre>
		</o-alert>
		<o-card style="width: 20rem;">
			<o-datepicker
				label="simple date"
				clearable
				time
				clear-to-null
				placeholder="placeh"/>
			<o-datepicker
				v-model:multiple="datemultiple"
				label="simple date"
				clearable
				time
				clear-to-null
				type="multiple"
				:floating-label="false"
				placeholder="placeh">
				<!-- <template #popper="{ closePopperSlot }">
					<div style="width: 45rem; padding: 1rem; color: black; background-color: aquamarine;">
						Aenean eu leo quam.
						Pellentesque ornare sem lacinia quam venenatis vestibulum.
						Maecenas sed diam eget risus varius blandit sit amet non magna.
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
						Nulla vitae elit libero, a pharetra augue.
						<o-button @click="closePopperSlot()">close</o-button>
					</div>
				</template> -->
			</o-datepicker>
		</o-card>

		<hr>

		<o-alert>
			<pre>date: {{ date2 }}</pre>
			<pre>typeof: {{ typeof date2 }}</pre>
			<pre> = null: {{ date2 === null }}</pre>
		</o-alert>
		<div class="mv-sm">
			<o-toggle
				v-model="showWeekNumber"
				label="show week number"/>
		</div>
		<o-card style="width: 20rem;">
			<o-datepicker
				v-model="date2"
				label="simple date"
				:display-week-number="showWeekNumber"
				clearable
				select-on-focus
				clear-to-null
				required/>
		</o-card>

		<hr>

		<o-alert>
			<pre>daterange: {{ daterange }}</pre>
			<pre>typeof: {{ typeof daterange }}</pre>
			<pre> = null: {{ daterange === null }}</pre>
		</o-alert>
		<o-card style="width: 20rem;">
			<o-datepicker
				v-model:range="daterange"
				type="range"
				label="simple daterange"
				:display-week-number="showWeekNumber"
				clearable
				clear-to-null/>
		</o-card>

		<hr>

		<o-alert>
			<pre>dateweek: {{ dateweek }}</pre>
			<pre>typeof: {{ typeof dateweek }}</pre>
			<pre> = null: {{ dateweek === null }}</pre>
		</o-alert>
		<o-card style="width: 20rem;">
			<o-datepicker
				v-model:range="dateweek"
				type="week"
				label="simple dateweek"
				clearable
				clear-to-null
				hide-disabled
				prefix-icon="add_home_work"
				suffix-icon="cloud_off">
				<template #hint>
					pick a week
				</template>
			</o-datepicker>
		</o-card>

		<hr>

		<o-alert>
			<pre>datemonth: {{ datemonth }}</pre>
			<pre>typeof: {{ typeof datemonth }}</pre>
			<pre> = null: {{ datemonth === null }}</pre>
		</o-alert>
		<o-card style="width: 20rem;">
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
		<o-card style="width: 20rem;">
			<o-datepicker
				v-model:multiple="datemultiple"
				type="multiple"
				label="simple datemultiple"
				:display-week-number="showWeekNumber"
				clearable
				prefix-icon="event_note"
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
const showWeekNumber = ref(true);
</script>
