<template>
	<pre @click="setup.placeItemInPlanning()">orion Planning</pre>
	<div
		:ref="setup._el"
		class="orion-planning">
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
		<div
			id="bodyId"
			class="orion-planning-body">
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
					:onDragenter="setup.handleDragEnterEvent"
					:onDragleave="setup.handleDragExitEvent"
					:onDrop="setup.handleDropEvent"
					:onDragover="setup.enableDropping"
					:class="{ 'orion-planning-day__content--public-holiday': date.getDay() === 0 || date.getDay() === 6 }"/>
			</div>


			<jsx-planning
				v-for="item in items"
				:key="item.id"
				:item="item"/>
		</div>
	</div>
	<div
		:id="`context-menu-planning-${setup.uid}`"
		:class="{ 'orion-planning-context-menu--hide': !setup.showContextMenu }"
		class="orion-planning-context-menu">
		<div @click="setup.createItem()">
			<orion-icon
				font-icon="icon-plus"/> Add
		</div>
		<div><orion-icon font-icon="icon-trash"/>Delete</div>
	</div>
</template>

<script setup lang="tsx">
import './OrionPlanning.less';
import { useMonkey } from 'services';
import OrionPlanningSetupService from './OrionPlanningSetupService';
import { OrionPeriod } from 'packages/Period';
import { OrionIcon } from 'packages/Icon';
import { useSlots } from 'vue';
import { cloneDeep } from 'lodash-es';
const emit = defineEmits<PlanningEmit>();
const props = defineProps(OrionPlanningSetupService.props);

const slots = useSlots();
let loaded = false;

type PlanningEmit = {
	(e: 'update:dateRange', payload: Orion.Planning.DateRangeType): void;
}

const jsxPeriod = (item: Orion.Planning.Item) => {
	const idItem = 'item-' + item.id;
	return (<OrionPeriod
		id={idItem}
		class="orion-planning-placement"
		begin={item.begin}
		end={item.end}
		color={item.color}
		label={item.label}
		draggable="true"
		onDragstart={setup.handleDragStart(idItem)}>
		{slots.periodContent ? slots.periodContent({ item: item }) : null}
	</OrionPeriod>);
};

const jsxPlanning = (props: {item: Orion.Planning.Item}) => {
	let htmlResponse = [] as OrionPeriod[];
	const periodItem = jsxPeriod(props.item);
	htmlResponse.push((
		periodItem
	));
	let currentsubItem = props.item.subItem;
	while (currentsubItem) {
		//let copySubItem = cloneDeep(currentsubItem);
		const periodSubItem = jsxPeriod(currentsubItem);
		htmlResponse.push((
			periodSubItem
		));
		currentsubItem = currentsubItem.subItem;
	}
	return htmlResponse.map((x) => {return x;});
};
const setup = new OrionPlanningSetupService(props, emit);
defineExpose(setup.publicInstance);


/** Doc
 * @doc slot/default the content of the button
 * @doc/fr slot/default contenu du bouton
 *
 * @doc item/click/desc emitted on button click
 * @doc/fr item/click/desc émis lors du click sur le bouton
 */
</script>
