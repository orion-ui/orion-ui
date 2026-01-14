<template>
	<orion-date-table-horizontal
		v-if="horizontal"
		v-model="vModel"
		v-bind="props"/>
	<div
		v-else
		:key="setup.currentMonth"
		:ref="setup._el"
		:class="{
			'orion-date-table': true,
			'orion-date-table--with-week-number': displayWeekNumber,
		}"
		@mousedown.prevent>
		<div
			class="orion-date-table__header">
			<orion-icon
				v-if="!hideMonthNavigation"
				class="orion-date-table__header-carret"
				:class="{ 'disable' : !canGoPrevMonth }"
				icon="chevron_left"
				@click="setup.switchPeriod(-1)"/>

			<div class="orion-date-table__header-current-display">
				<span
					v-show="!setup.viewMonth && !setup.viewYears && !month"
					class="orion-date-table__header-current-month"
					:class="{ 'disabled': disableMonthAndYear }"
					@click="setup.showMonths">{{ setup.monthName }} </span>
				<span
					v-if="!setup.viewYears"
					class="orion-date-table__header-current-year"
					:class="{ 'disabled': disableMonthAndYear }"
					@click="setup.showYears">{{ setup.currentYear }}</span>
				<span
					v-else
					class="orion-date-table__header-current-range-years">
					{{ `${setup.rangeYears[0]} - ${setup.rangeYears[setup.rangeYears.length - 1]}` }}
				</span>
			</div>

			<orion-icon
				v-if="!hideMonthNavigation"
				class="orion-date-table__header-carret"
				:class="{ 'disable' : !canGoNextMonth }"
				icon="chevron_right"
				@click="setup.switchPeriod(1)"/>
		</div>


		<div
			class="orion-date-table__body">
			<div
				v-show="!setup.viewMonth && !setup.viewYears && !month"
				class="orion-date-table__body-dow">
				<span
					v-if="displayWeekNumber"
					class="orion-date-table__week-number">{{ setup.lang.WEEK_NUMBER_LABEL }}</span>
				<span>{{ setup.lang.DAY_NAME_SHORT[0] }}</span>
				<span>{{ setup.lang.DAY_NAME_SHORT[1] }}</span>
				<span>{{ setup.lang.DAY_NAME_SHORT[2] }}</span>
				<span>{{ setup.lang.DAY_NAME_SHORT[3] }}</span>
				<span>{{ setup.lang.DAY_NAME_SHORT[4] }}</span>
				<span>{{ setup.lang.DAY_NAME_SHORT[5] }}</span>
				<span>{{ setup.lang.DAY_NAME_SHORT[6] }}</span>
			</div>

			<div
				v-show="!setup.viewMonth && !setup.viewYears && !month"
				class="orion-date-table__body">
				<div
					v-for="i in setup.daysToDisplay.length"
					:key="i"
					class="orion-date-table-row">
					<span
						v-if="displayWeekNumber"
						class="orion-date-table__week-number">{{ setup.getWeekNumber(setup.daysToDisplay[i - 1][0].date) }}</span>
					<span
						v-for="(day) in setup.daysToDisplay[i - 1]"
						:key="`day-${day.number}`"
						class="orion-date-table-row__cell"
						:class="setup.getCssClassForDayInRange(day)"
						@click="setup.selectDate(day)"
						@mouseover="setup.handleMouseOverDay(day)">

						<span
							v-for="(period, index) in day.period"
							:key="index"
							:class="setup.getClassForBackground(period)"/>

						<span
							v-if="day.color"
							:class="setup.getClassForBackground(day)"/>


						<div
							v-if="day.period.length > 1"
							class="orion-date-table-row__cell-notification">
							<span
								class="notification"
								:class="setup.getClassForNotification(day)"/>
						</div>

						<div class="orion-date-table-row__cell-content">

							<span
								v-if="markers?.map(m => m.date.getTime()).includes(day.date.getTime())"
								class="orion-date-table__marker"
								:class="[
									`orion-date-table__marker--${markers.find(m => m.date.getTime() === day.date.getTime())?.color}`,
								]"/>

							<span
								class="orion-date-table-row__cell-display"
								:class="setup.getClassForDay(day)"
								@click="setup.handleSpecificDayCallback(day)">

								<span class="orion-date-table-row__cell-display-contrast">
									{{ day.number }}
								</span>
							</span>
						</div>

					</span>
				</div>
			</div>

			<div
				v-show="(setup.viewMonth || month) && !setup.viewYears"
				class="orion-date-table__body__months">
				<div
					v-for="i in 3"
					:key="i"
					class="orion-date-table-row">
					<span
						v-for="(month, index) in setup.lang.MONTH_NAME.slice((i - 1) * 4, i * 4)"
						:key="`month-${month}`"
						:class="setup.getCssClassForMonth(index + ((i - 1) * 4))"
						@click="setup.selectMonth(index + ((i - 1) * 4))">{{ month }}</span>
				</div>
			</div>

			<div
				v-show="setup.viewYears"
				class="orion-date-table__body__years">
				<div
					v-for="i in 3"
					:key="i"
					class="orion-date-table-row">
					<span
						v-for="year in setup.rangeYears.slice((i - 1) * 4, i * 4)"
						:key="`year-${year}`"
						class="orion-date-table-row__cell orion-date-table-row__cell--year"
						@click="setup.selectYear(year)">{{ year }}</span>
				</div>
			</div>
		</div>
		<div
			v-if="!!setup.labels.length"
			class="orion-date-table__footer">
			<div
				v-for="(label, index) in setup.labels"
				:key="index"
				v-tooltip="setup.filter.includes(label.color)
					? setup.lang.ACTIVATE
					: setup.lang.DEACTIVATE"
				class="orion-date-table__legend"
				:class="setup.filter.includes(label.color)
					? `text--${label.color} orion-date-table__legend--opacity`
					: `text--${label.color} background`"
				@click.prevent="setup.filterColorOnClick(label.color)"
				@mouseenter="setup.filterColorOnHover(label.color)"
				@mouseleave="setup.filterColorOnHover(label.color, true)">
				<div :class="`legend legend--${label.color}`"/>
				{{ label.label }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { OrionDateTableHorizontal } from 'packages/DateTableHorizontal';
import { OrionIcon } from 'packages/Icon';
import './OrionDateTable.less';
import type { OrionDateTableEmits, OrionDateTableProps } from './OrionDateTableSetupService';
import OrionDateTableSetupService from './OrionDateTableSetupService';
const vModel = defineModel< Nil<Date>>();
const range = defineModel<Nil<Orion.DateRange>>('range');
const multiple = defineModel<Nil<Date[]>>('multiple');
const dayHover = defineModel<Nil<Date>>('dayHover');
const emits = defineEmits<OrionDateTableEmits>() as OrionDateTableEmits;
const props = withDefaults(defineProps<OrionDateTableProps>(), OrionDateTableSetupService.defaultProps);
const setup = new OrionDateTableSetupService(props, emits, vModel, range, multiple, dayHover);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/range the vModel if the type is set to `range`
 * @doc/fr vModel/range vModel du composant si la prop `type` est `range`
 * @doc vModel/multiple the vModel if the type is set to `multiple`
 * @doc/fr vModel/multiple vModel du composant si la prop `type` est `multiple`
 * @doc vModel/dayHover the value of the hovered day
 * @doc/fr vModel/dayHover valeur du jour survolé
 */
</script>
