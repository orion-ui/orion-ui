<template>
	<div
		v-if="setup.vModel"
		:ref="setup._el"
		class="orion-date-range">
		<orion-date-table
			:ref="setup._start"
			v-model="setup.vModel.start"
			v-model:range="setup.vModel"
			v-model:dayHover="setup.dayHover"
			type="range"
			range-start
			disable-month-and-year
			:min-date="minDate"
			:max-date="maxDate"
			:can-go-next-month="setup.canGoNextMonth"
			:display-week-number="displayWeekNumber"
			@change-month="setup.handleChangeMonth('start')"/>

		<div class="orion-date-range__separator"/>

		<orion-date-table
			:ref="setup._end"
			v-model="setup.vModel.end"
			v-model:range="setup.vModel"
			v-model:dayHover="setup.dayHover"
			type="range"
			range-end
			disable-month-and-year
			:min-date="minDate"
			:max-date="maxDate"
			:can-go-prev-month="setup.canGoPrevMonth"
			:display-week-number="displayWeekNumber"
			:display-next-month="setup.displayNextMonth"
			@change-month="setup.handleChangeMonth('end')"/>
	</div>
</template>

<script setup lang="ts">
import './OrionDateRange.less';
import { OrionDateTable } from 'packages/DateTable';
import OrionDateRangeSetupService from './OrionDateRangeSetupService';
type DateRangeEmit = {
	(e: 'update:modelValue', payload: Nil<Orion.DateRange>): void
	(e: 'select-range', payload: Orion.DateRange): void
}
const emit = defineEmits<DateRangeEmit>();
const props = defineProps(OrionDateRangeSetupService.props);
const setup = new OrionDateRangeSetupService(props, emit);
defineExpose(setup.publicInstance);
</script>
