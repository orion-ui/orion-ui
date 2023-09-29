<template>
	<div
		:ref="setup._options"
		class="orion-date-table"
		@mousedown.prevent>
		<div class="orion-date-table__header">
			<orion-icon
				class="orion-date-table__header-carret"
				:class="{ 'disable' : !setup.props.canGoPrevMonth }"
				icon="chevron_left"
				@click="setup.switchPeriod(-1)"/>

			<div class="orion-date-table__header-current-display">
				<span
					v-show="!setup.viewMonth && !setup.viewYears"
					class="orion-date-table__header-current-month"
					:class="{ 'disable': setup.props.disableMonthAndYear }"
					@click="setup.showMonths">{{ setup.monthName }} </span>
				<span
					v-if="!setup.viewYears"
					class="orion-date-table__header-current-year"
					:class="{ 'disable': setup.props.disableMonthAndYear }"
					@click="setup.showYears">{{ setup.currentYear }}</span>
				<span
					v-else
					class="orion-date-table__header-current-range-years">
					{{ `${setup.rangeYears[0]} - ${setup.rangeYears[setup.rangeYears.length - 1]}` }}
				</span>
			</div>

			<orion-icon
				class="orion-date-table__header-carret"
				:class="{ 'disable' : !setup.props.canGoNextMonth }"
				icon="chevron_right"
				@click="setup.switchPeriod(1)"/>
		</div>

		<div class="orion-date-table__body">
			<div
				v-show="!setup.viewMonth && !setup.viewYears"
				class="orion-date-table__body-dow">
				<span>{{ setup.lang.DAY_NAME_SHORT[0] }}</span>
				<span>{{ setup.lang.DAY_NAME_SHORT[1] }}</span>
				<span>{{ setup.lang.DAY_NAME_SHORT[2] }}</span>
				<span>{{ setup.lang.DAY_NAME_SHORT[3] }}</span>
				<span>{{ setup.lang.DAY_NAME_SHORT[4] }}</span>
				<span>{{ setup.lang.DAY_NAME_SHORT[5] }}</span>
				<span>{{ setup.lang.DAY_NAME_SHORT[6] }}</span>
			</div>

			<div
				v-show="!setup.viewMonth && !setup.viewYears"
				class="orion-date-table__body">
				<div
					v-for="i in 6"
					:key="i"
					class="orion-date-table-row">
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
				v-show="setup.viewMonth"
				class="orion-date-table__body__months">
				<div
					v-for="i in 3"
					:key="i"
					class="orion-date-table-row">
					<span
						v-for="(month, index) in setup.lang.MONTH_NAME.slice((i - 1) * 4, i * 4)"
						:key="`month-${month}`"
						class="orion-date-table-row__cell orion-date-table-row__cell--month"
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

		<!-- <pre>{{ setup.daysToDisplay }}</pre> -->
	</div>
</template>

<script setup lang="ts">
import './OrionDateTable.less';
import { OrionIcon } from 'packages/Icon';
import OrionDateTableSetupService from './OrionDateTableSetupService';
type Period = {
	isStart?: boolean;
	isEnd?: boolean;
	start: Date;
	end: Date;
	label: string;
	color: Orion.Color;
	callback?: () => void;
	specific?: {
		color: Orion.Color;
		date: Date;
		exclude: boolean;
	}[];
}
type PeriodDay = {
	color?: Orion.Color;
	date: Date;
	isStart: boolean;
	isEnd: boolean;
	isSelected: boolean;
	exclude: boolean;
	number: number;
	month: number;
	year: number;
	period: Period[];
	callback?: () => void;
}
type DateTableEmit = {
	(e: 'update:modelValue', payload: Nil<Date>): void;
	(e: 'update:range', payload: Nil<Orion.DateRange>): void;
	(e: 'update:dayHover', payload: Nil<Date>): void;
	(e: 'change-month', payload: { month: number, year: number }): void;
	(e: 'select-specific', payload: Period | PeriodDay): void;
	(e: 'select-period', payload: Period[]): void;
	(e: 'select-day', payload: Period | PeriodDay): void;
}
const emit = defineEmits<DateTableEmit>();
const props = defineProps(OrionDateTableSetupService.props);
const setup = new OrionDateTableSetupService(props, emit);
defineExpose(setup.publicInstance);

/** Doc
 * @doc event/update:modelValue/desc emitted to update the modelValue
 * @doc/fr event/update:modelValue/desc émis pour mettre à jour le modelValue
 *
 * @doc event/update:range/desc emitted to update the range value
 * @doc/fr event/update:range/desc émis pour mettre à jour le modelValue dans le cas ou il est de type `range`
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
