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
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const date = ref(new Date());
const dateRange = reactive({
	range: undefined,
	week: undefined,
});
</script>

@hl {6,14,23}

@lang:en
### Type

Define the type of the model value.

:::warning
If you use the **range** or **week** `type`, you have to use `v-model:range` instead of `v-model`.
:::
@lang

@lang:fr
### Type

Il est possible de sélectionner différents types de date avec ce composant, comme une simple date, une période composée de deux dates voire même une semaine.

:::warning
Si vous utilisez le `type` **range** ou **week**, vous devrez utiliser `v-model:range` à la place `v-model`.
:::
@lang
