<template>
	<orion-card
		:id="`calendar-` + setup.uid"
		:ref="setup._calendar"
		class="calendar"
		:style="`max-height: calc(${(range[1] - range[0] + 1)*50 + 60}rem / 16); overflow-y: scroll; overflow-x: hidden`"
		@scroll="setup.observeHiddenTasks()">
		<div class="orion-daily-calendar">
			<div class="orion-daily-calendar__header">
				<h4 class="orion-daily-calendar__title">{{ setup.readableDate }}</h4>
				<div class="orion-daily-calendar__other-days">
					<orion-icon
						icon="chevron_left"
						class="orion-daily-calendar__icon"
						:class="setup.today ? 'disabled' : null"
						:ripple="setup.today ? undefined : 'info'"
						:disabled="true"
						@click="setup.getPreviousDay()"/>

					<orion-icon
						ripple="info"
						class="orion-daily-calendar__icon"
						icon="chevron_right"
						@click="setup.getNextDay()"/>
				</div>
			</div>

			<div class="orion-daily-calendar__background">
				<div
					v-show="setup.today"
					class="orion-daily-calendar__hour orion-daily-calendar__hour--now"
					:style="`top:calc(${(setup.hourToDecimal(setup.hourNow) - setup.calendarRange[0]) * 50}rem / 16);`">
					<span class="orion-daily-calendar__hour-number orion-daily-calendar__hour-number--now">{{ setup.hourNow }}</span>
					<div class="orion-daily-calendar__hour-line orion-daily-calendar__hour-line--now"/>
				</div>

				<div
					v-for="hour in (setup.calendarRange[1] - setup.calendarRange[0] + 1)"
					:key="hour"
					class="orion-daily-calendar__hour">
					<span
						:style="setup.isNearFromNow(hour)"
						class="orion-daily-calendar__hour-number">{{ setup.toHourDisplay(hour + setup.calendarRange[0] - 1) }}</span>
					<div class="orion-daily-calendar__hour-line"/>
				</div>

				<div
					v-show="setup.taskStyle"
					class="orion-daily-calendar__task-wrapper">
					<!-- Ajouter la date de début et fin pour la tache dans le toltip, voir si on peut mettre de l'html dedans -->
					<div
						v-for="task in setup.taskOfTheDay"
						:key="task.id"
						v-tooltip="setup.taskTooltip(task)"
						:style="setup.taskStyle(task)"
						class="orion-daily-calendar__task"
						:class="[`orion-daily-calendar__task--${task.color}`, `orion-daily-calendar-${setup.uid}__task`]"
						@click="setup.handleTaskClick(task)">
						<p :style="setup.taskParagraphStyle(task)">{{ task.title }}</p>
					</div>
				</div>
			</div>
		</div>

		<div
			v-if="setup.elementsAreHidden"
			class="orion-daily-calendar__hidden-task-indicator">
			<orion-button
				prefix-icon="expand_more"
				@click="setup.scrollDown()"/>
		</div>

		<orion-loader
			:visible="!setup.hourNow"
			:message="setup.lang.LOADING_CALENDAR"/>
	</orion-card>
</template>

<script setup lang="ts">
import './OrionDailyCalendar.less';
import { OrionIcon } from 'packages/Icon';
import { OrionLoader } from 'packages/Loader';
import { OrionCard } from 'packages/Card';
import { OrionButton } from 'packages/Button';
import OrionDailyCalendarSetupService from './OrionDailyCalendarSetupService';
import type { OrionDailyCalendarProps, OrionDailyCalendarEmits } from './OrionDailyCalendarSetupService';
const date = defineModel<Date>('date', { required: true });
const emits = defineEmits<OrionDailyCalendarEmits>() as OrionDailyCalendarEmits;
const props = withDefaults(defineProps<OrionDailyCalendarProps>(), OrionDailyCalendarSetupService.defaultProps);
const setup = new OrionDailyCalendarSetupService(props, emits, date);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/date the selected date.
 * @doc/fr vModel/date la date sélectionnée.
 */
</script>

