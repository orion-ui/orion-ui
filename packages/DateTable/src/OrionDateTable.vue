<template>
	<div
		:ref="setup._el"
		:class="{
			'orion-date-table': true,
			'orion-date-table--with-week-number': displayWeekNumber,
		}"
		@mousedown.prevent>
		<div class="orion-date-table__header">
			<orion-icon
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
				class="orion-date-table__header-carret"
				:class="{ 'disable' : !canGoNextMonth }"
				icon="chevron_right"
				@click="setup.switchPeriod(1)"/>
		</div>

		<div class="orion-date-table__body">
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
					v-for="i in 6"
					:key="i"
					class="orion-date-table-row">
					<span
						v-if="displayWeekNumber"
						class="orion-date-table__week-number">{{ setup.getWeekNumber(setup.daysToDisplay[i - 1][0].date) }}</span>
					<span
						v-for="day in setup.daysToDisplay[i - 1]"
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

						<span
							class="orion-date-table-row__cell-display"
							:class="setup.getClassForDay(day)"
							@click="setup.handleSpecificDayCallback(day)">
							<span class="orion-date-table-row__cell-display-contrast">
								{{ day.number }}
							</span>
						</span>

					</span>
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
	</div>
</template>

<script setup lang="ts">
import './OrionDateTable.less';
import { OrionIcon } from 'packages/Icon';
import OrionDateTableSetupService from './OrionDateTableSetupService';
import type { OrionDateTableProps, OrionDateTableEmits } from './OrionDateTableSetupService';
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
 *
 * @doc event/update:range/desc emitted to update the range value
 * @doc/fr event/update:range/desc émis pour mettre à jour le vModel dans le cas ou il est de type `range`
 *
 * @doc event/update:multiple/desc emitted to update the multiple value
 * @doc/fr event/update:multiple/desc émis pour mettre à jour le vModel dans le cas ou il est de type `multiple`
 *
 * @doc event/update:dayHover/desc emitted to update the dayHover value
 * @doc/fr event/update:dayHover/desc émis pour mettre à jour la valeur de `dayHover`
 *
 * @doc event/change-month/desc emitted to change the current month
 * @doc/fr event/change-month/desc émis pour mettre à jour la valeur du mois courant
 *
 * @doc event/select-specific/desc emitted on day click, to execute the associate callback if it exists
 * @doc/fr event/select-specific/desc émis au moment du click sur un jour spécifique, pour exécuter le callback correspondant s'il est défini
 *
 * @doc event/select-period/desc emitted when a period is selected and executes its associated callbacks
 * @doc/fr event/select-period/desc émis quand une période est sélectionnée et exécute le callback si défini
 *
 * @doc event/select-day/desc emitted when a day is selected
 * @doc/fr event/select-day/desc émis quand un jour est sélectioné
 */
</script>
