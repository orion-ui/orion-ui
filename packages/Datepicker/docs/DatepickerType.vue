<template>
	<div class="row row--grid">
		<div class="col-sm-6">
			<b>Single Date</b>
			<o-datepicker
				v-model="date"
				label="Date"
				clearable/>
		</div>

		<div class="col-sm-6">
			<b>Date range</b>
			<o-datepicker
				v-model:range="dateRange.range"
				label="Date range"
				type="range"
				clearable/>
		</div>

		<div class="col-sm-6">
			<b>Week</b>
			<o-datepicker
				v-model:range="dateRange.week"
				label="Date Week"
				type="week"
				clearable/>
		</div>

		<div class="col-sm-6">
			<b>Month</b>
			<o-datepicker
				v-model:range="dateRange.month"
				label="Month selection"
				type="month"
				clearable/>
		</div>

		<div class="col-sm-6">
			<b>Multiple dates</b>
			<o-datepicker
				v-model:multiple="dates"
				label="Multiple dates"
				type="multiple"
				clearable/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const date = ref(new Date());
const dates = ref([]);

const dateRange = reactive({
	range: undefined,
	week: undefined,
	month: undefined,
});

</script>

@hl {6,14,23,32,41}

@lang:en
### Type

Define the type of the vModel.

:::warning
If you use the **range**, **week** or **month** `type`, you have to use `v-model:range` instead of `v-model`.\
And if you use the **multiple** `type`, you have to use `v-model:multiple`.
:::
@lang

@lang:fr
### Type

Il est possible de sélectionner différents types de dates avec ce composant, comme une simple date, une période composée de deux dates, une semaine,
on bien plusieurs dates.

:::warning
Si vous utilisez le `type` **range**, **week** ou **month**, vous devrez utiliser `v-model:range` à la place du `v-model`.\
Et si vous utilisez le `type` **multiple**, vous devrez utiliser `v-model:multiple` à la place du `v-model`.
:::
@lang
