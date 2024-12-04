<template>
	<div
		:ref="setup._el"
		class="orion-date-week"
		@mousedown.prevent>
		<div class="orion-date-week__header">
			<orion-icon
				class="orion-date-week__header-carret"
				icon="chevron_left"
				@click="setup.switchPeriod(-1)"/>

			<span class="orion-date-week__header-current-display">
				<span
					v-if="!setup.viewYears"
					class="orion-date-week__header-current-year"
					:class="{ 'disable': disableMonthAndYear }"
					@click="setup.showYears()">{{ setup.year }}</span>
				<span
					v-else
					class="orion-date-week__header-current-range-years">
					{{ `${setup.rangeYears[0]} - ${setup.rangeYears[setup.rangeYears.length - 1]}` }}
				</span>
			</span>

			<orion-icon
				class="orion-date-week__header-carret"
				icon="chevron_right"
				@click="setup.switchPeriod(1)"/>
		</div>

		<div class="orion-date-week__body">
			<div
				v-show="!setup.viewYears"
				:ref="setup._weekPicker"
				class="orion-date-week__week-picker">
				<div
					v-for="week in setup.weekOptions"
					:key="week.weekNumber"
					class="orion-date-week__week-row"
					:class="[
						{ 'orion-date-week__week-row--disabled': setup.weekIsDisabled(week) },
						{ 'orion-date-week__week-row--active': setup.weekIsActive(week) },
					]"
					@click="setup.selectWeek(week)">
					<div class="orion-date-week__week-number">{{ setup.lang.WEEK }} {{ week.weekNumber }}</div>
					<div class="orion-date-week__week-readable-days">
						{{ setup.readableWeek(week) }}
					</div>
				</div>
			</div>

			<div v-show="setup.viewYears">
				<div
					v-for="i in 3"
					:key="i"
					class="orion-date-week-row">
					<span
						v-for="year in setup.rangeYears.slice((i - 1) * 4, i * 4)"
						:key="`year-${year}`"
						class="orion-date-week-row__cell orion-date-week-row__cell--year"
						@click="setup.selectYear(year)">{{ year }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import './OrionDateWeek.less';
import { OrionIcon } from 'packages/Icon';
import OrionDateWeekSetupService from './OrionDateWeekSetupService';
import type { OrionDateWeekProps, OrionDateWeekEmits } from './OrionDateWeekSetupService';
const emits = defineEmits<OrionDateWeekEmits>() as OrionDateWeekEmits;
const vModel = defineModel<Undef<Orion.DateRange>>();
const props = withDefaults(defineProps<OrionDateWeekProps>(), OrionDateWeekSetupService.defaultProps);
const setup = new OrionDateWeekSetupService(props, emits, vModel);
defineExpose(setup.publicInstance);
</script>
