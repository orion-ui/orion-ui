<template>
	<div
		v-if="setup.vModelProxy"
		:ref="setup._el"
		class="orion-date-range">
		<orion-date-table
			:ref="setup._start"
			v-model="setup.vModelProxy.start"
			v-model:range="setup.vModelProxy"
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
			v-model="setup.vModelProxy.end"
			v-model:range="setup.vModelProxy"
			v-model:dayHover="setup.dayHover"
			type="range"
			range-end
			disable-month-and-year
			:min-date="minDate"
			:max-date="maxDate"
			:can-go-prev-month="setup.canGoPrevMonth"
			:display-week-number="displayWeekNumber"
			@change-month="setup.handleChangeMonth('end')"/>
	</div>
</template>

<script setup lang="ts">
import './OrionDateRange.less';
import { OrionDateTable } from 'packages/DateTable';
import OrionDateRangeSetupService from './OrionDateRangeSetupService';
import type { OrionDateRangeProps, OrionDateRangeEmits } from './OrionDateRangeSetupService';
const emits = defineEmits<OrionDateRangeEmits>() as OrionDateRangeEmits;
const vModel = defineModel<Nil<Orion.DateRange>>();
const props = withDefaults(defineProps<OrionDateRangeProps>(), OrionDateRangeSetupService.defaultProps);
const setup = new OrionDateRangeSetupService(props, emits, vModel);
defineExpose(setup.publicInstance);
</script>
