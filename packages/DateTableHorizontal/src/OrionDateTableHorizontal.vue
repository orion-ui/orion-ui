<template>
	<div
		:key="setup.currentMonth"
		:ref="setup._el"
		:class="{
			'orion-date-table': true,
			'orion-date-table--horizontal': true,
			'orion-date-table--with-week-number': displayWeekNumber,
		}"
		@mousedown.prevent>
		<div
			v-if="!hideMonthNavigation"
			class="orion-date-table__carrets">
			<orion-icon
				class="orion-date-table__header-carret"
				:class="{ 'disable' : !canGoPrevMonth }"
				icon="chevron_left"
				@click="setup.switchPeriod(-1)"/>
			<orion-icon
				class="orion-date-table__header-carret"
				:class="{ 'disable' : !canGoNextMonth }"
				icon="chevron_right"
				@click="setup.switchPeriod(1)"/>
		</div>
		<orion-horizontal-scroll
			hide-button
			drop-shadow>
			<div
				v-if="!setup.viewYears && !setup.viewMonth && !month"
				class="orion-date-table__body">
				<template
					v-for="days in setup.daysToDisplay"
					:key="days[0].month">
					<div class="orion-date-table__month-container">
						<div class="orion-date-table__header-current-display">
							<orion-button
								v-show="!setup.viewMonth && !setup.viewYears && !month"
								outline
								class="orion-date-table__header-current-month"
								:class="{ 'disabled': disableMonthAndYear }"
								@click="setup.showMonths()">
								{{ useMonkey(days[0].date).toReadable('$MMMM') }}
							</orion-button>
							<orion-button
								class="orion-date-table__header-current-year"
								outline
								:class="{ 'disabled': disableMonthAndYear }"
								@click="setup.showYears()">
								{{ useMonkey(days[0].date).toReadable('$YYYY') }}
							</orion-button>
						</div>
						<div
							class="orion-date-table-row">
							<template
								v-for="day in days"
								:key="day.date.getTime()">
								<div
									class="orion-date-table-row__cell"
									:class="setup.getCssClassForDayInRange(day)"
									@click="setup.selectDate(day)">
									<span class="week-day">
										{{ setup.lang.DAY_NAME_SHORT[day.date.getDay() === 0 ? 6 : day.date.getDay() -1] }}
									</span>

									<span
										v-for="(period, index) in day.period"
										:key="index"
										:class="setup.getClassForBackground(period)"/>

									<span
										v-if="day.color"
										:class="setup.getClassForBackground(day)"/>
									<span
										class="orion-date-table-row__cell-display"
										:class="setup.getClassForDay(day)">
										<span
											v-if="markers?.map(m => m.date.getTime()).includes(day.date.getTime())"
											class="orion-date-table__marker"
											:class="[
												`orion-date-table__marker--${markers.find(m => m.date.getTime() === day.date.getTime())?.color}`,
											]"/>
										<span
											class="orion-date-table-row__cell-display-number">
											{{ day.date.getDate() }}
										</span>
									</span>
								</div>
							</template>
						</div>
					</div>
				</template>
			</div>
			<div
				v-show="(setup.viewMonth || month) && !setup.viewYears"
				class="orion-date-table__body-months">
				<div class="flex jc-c">
					<strong>{{ setup.currentYear }}</strong>
				</div>
				<div
					v-for="i in 2"
					:key="i"
					class="flex jc-c">
					<orion-toggle-button
						v-for="(month, index) in setup.lang.MONTH_NAME.slice((i - 1) * 6, i * 6)"
						:key="`month-${month}`"
						nude
						:model-value="setup.isMonthActive(index + ((i - 1) * 4))"
						class="orion-date-table-row__cell--month"
						@click="setup.selectMonth(index + ((i - 1) * 6))">
						{{ month }}
					</orion-toggle-button>
				</div>
			</div>
			<div
				v-show="setup.viewYears"
				class="orion-date-table__body-years">
				<div class="flex jc-c">
					<strong>{{ setup.rangeYears[0] }} - {{ setup.rangeYears[setup.rangeYears.length - 1] }}</strong>
				</div>
				<div class="flex">
					<orion-toggle-button
						v-for="year in setup.rangeYears"
						:key="`year-${year}`"
						nude
						:model-value="setup.isYearActive(year)"
						class="orion-date-table-row__cell"
						@click="setup.selectYear(year)">
						{{ year }}
					</orion-toggle-button>
				</div>
			</div>
		</orion-horizontal-scroll>
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
import { OrionButton } from 'packages/Button';
import { OrionHorizontalScroll } from 'packages/HorizontalScroll';
import { OrionIcon } from 'packages/Icon';
import { OrionToggleButton } from 'packages/ToggleButton';
import { useMonkey } from 'services';
import './OrionDateTableHorizontal.less';
import type { OrionDateTableHorizontalEmits, OrionDateTableHorizontalProps } from './OrionDateTableHorizontalSetup';
import OrionDateTableHorizontalSetup from './OrionDateTableHorizontalSetup';
const vModel = defineModel< Nil<Date>>();
const range = defineModel<Nil<Orion.DateRange>>('range');
const multiple = defineModel<Nil<Date[]>>('multiple');
const dayHover = defineModel<Nil<Date>>('dayHover');
const emits = defineEmits<OrionDateTableHorizontalEmits>() as OrionDateTableHorizontalEmits;
const props = withDefaults(defineProps<OrionDateTableHorizontalProps>(), OrionDateTableHorizontalSetup.defaultProps);
const setup = new OrionDateTableHorizontalSetup(props, emits, vModel, range, multiple, dayHover);
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
