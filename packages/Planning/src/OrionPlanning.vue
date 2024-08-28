<template>
	<pre @click="setup.placeEventInPlanning()">orion Planning</pre>
	<div class="orion-planning">
		<div class="orion-planning-header">
			<div class="orion-planning-header__actions">
				<slot name="actions"/>
			</div>
			<div class="orion-planning-header__time-period">
				select
				<pre>{{ dateRange }}</pre>
				<div>
					<input
						type="button"
						value="Jour"
						@click="setup.changeDateRange('day');">
					<input
						type="button"
						value="Semaine"
						@click="setup.changeDateRange('week');">
					<input
						type="button"
						value="Mois"
						@click="setup.changeDateRange('month');">
				</div>
				timeslot
			</div>
		</div>
		<div class="orion-planning-body">
			<div
				v-for="date, index in setup.activePeriod"
				:id="`date-${useMonkey(date).toReadable('$DD-$MM-$YYYY')}`"
				:key="index"
				class="orion-planning-day"
				:class="{ 'orion-planning-day--today': setup.isSameDay(date, new Date()) }">
				<div
					class="orion-planning-day__date">
					{{ useMonkey(date).toReadable('$ddd $DD') }}
				</div>
				<div
					class="orion-planning-day__content"
					:class="{ 'orion-planning-day__content--public-holiday': date.getDay() === 0 || date.getDay() === 6 }"/>
			</div>

			<jsx-planning/>
		</div>
	</div>
</template>

<script setup lang="tsx">
import './OrionPlanning.less';
import { useMonkey } from 'services';
import OrionPlanningSetupService from './OrionPlanningSetupService';
import { OrionPeriod } from 'packages/Period';
import { useSlots } from 'vue';
const emit = defineEmits<PlanningEmit>();
const props = defineProps(OrionPlanningSetupService.props);
const setup = new OrionPlanningSetupService(props, emit);
const slots = useSlots();

type PlanningEmit = {
	(e: 'update:dateRange', payload: Orion.Planning.DateRangeType): void;
}

defineExpose(setup.publicInstance);

const jsxPlanning = () => {
	let htmlResponse = [] as OrionPeriod[];
	let subEventIndex = 0;
	props.events.forEach((event) => {
		let idEvent = 'event-' + event.id;
		htmlResponse.push((
			<OrionPeriod
				id={idEvent}
				class="orion-planning-placement"
				begin={event.begin}
				end={event.end}
				color={event.color}
				label={event.label}>
				{slots.periodContent ? slots.periodContent({ event: event }) : null}
			</OrionPeriod>
		));
		let currentsubEvent = event.subEvent;
		subEventIndex = 0;
		while (currentsubEvent) {
			let idsubEvent = 'event-' + currentsubEvent.id;
			htmlResponse.push((
				<OrionPeriod
					id={idsubEvent}
					class="orion-planning-placement"
					begin={currentsubEvent.begin}
					end={currentsubEvent.end}
					color={currentsubEvent.color}
					label={currentsubEvent.label}>
					{slots.periodContent ? slots.periodContent({ event: event }) : null}
				</OrionPeriod>
			));
			currentsubEvent = currentsubEvent.subEvent;
		}
	});

	return htmlResponse.map((x) => {return x;});
};

/** Doc
 * @doc slot/default the content of the button
 * @doc/fr slot/default contenu du bouton
 *
 * @doc event/click/desc emitted on button click
 * @doc/fr event/click/desc émis lors du click sur le bouton
 */
</script>
