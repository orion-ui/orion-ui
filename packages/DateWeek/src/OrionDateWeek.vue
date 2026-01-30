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
				<orion-button
					v-show="setup.viewYears"
					outline
					@click="setup.showDays()">
					{{ setup.lang.CLOSE_ACTION }}
				</orion-button>
				<orion-button
					v-if="!setup.viewYears"
					outline
					:readonly="disableMonthAndYear"
					class="orion-date-week__header-current-year"
					@click="setup.showYears()">
					{{ setup.year }}
				</orion-button>
				<orion-button
					v-else
					outline>
					{{ `${setup.rangeYears[0]} - ${setup.rangeYears[setup.rangeYears.length - 1]}` }}
				</orion-button>
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

			<div
				v-show="setup.viewYears"
				class="orion-date-table__body-years">
				<div
					v-for="i in 3"
					:key="i"
					class="orion-date-week-row">
					<orion-toggle-button
						v-for="year in setup.rangeYears.slice((i - 1) * 4, i * 4)"
						:key="`year-${year}`"
						:model-value="setup.isYearActive(year)"
						nude
						@click="setup.selectYear(year)">
						{{ year }}
					</orion-toggle-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { OrionButton } from 'packages/Button';
import { OrionIcon } from 'packages/Icon';
import { OrionToggleButton } from 'packages/ToggleButton';
import './OrionDateWeek.less';
import { OrionDateWeekSetup, type OrionDateWeekEmits, type OrionDateWeekProps } from './OrionDateWeekSetup';
const emits = defineEmits<OrionDateWeekEmits>() as OrionDateWeekEmits;
const vModel = defineModel<Undef<Orion.DateRange>>();
const props = withDefaults(defineProps<OrionDateWeekProps>(), OrionDateWeekSetup.defaultProps);
const setup = new OrionDateWeekSetup(props, emits, vModel);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
*/
</script>
