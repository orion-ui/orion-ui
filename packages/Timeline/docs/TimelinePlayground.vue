<template>
	<o-card :use-elevation="false">
		<o-timeline
			v-model="activePane"
			scrollable
			v-bind="state">
			<o-timeline-pane
				name="pane1"
				complete
				icon="check">
				<template #[targetSlot]>
					Cras eu sapien fermentum, bibendum turpis vel, congue metus. Phasellus ultricies
					urna porta sem auctor, in dignissim lorem tempus. Morbi non blandit ante, a fermentum orci.
				</template>
			</o-timeline-pane>
			<o-timeline-pane
				v-bind="state"
				name="pane2"
				icon="clock">
				<template #[targetSlot]>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
					in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac.
				</template>
			</o-timeline-pane>
			<o-timeline-pane
				name="pane3"
				label="step 3"
				icon="download">
				<template #[targetSlot]>
					Donec sed odio dui.
					Cras mattis consectetur purus sit amet fermentum.
					Fusce dapibus, tellus ac cursus commodo.
				</template>
			</o-timeline-pane>
			<o-timeline-pane
				name="pane4"
				label="step 4"
				disabled
				icon="heart_01">
				<template #[targetSlot]>
					Cras mattis consectetur purus sit amet fermentum.
					Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
					Vestibulum id ligula porta felis euismod semper.
				</template>
			</o-timeline-pane>
		</o-timeline>
	</o-card>

	<hr>

	<b>Timeline value</b>

	<div class="row row--grid">
		<div class="col-sm-3">
			<o-radio
				v-model="activePane"
				label="Pane 1"
				input-value="pane1"/>
		</div>
		<div class="col-sm-3">
			<o-radio
				v-model="activePane"
				label="Pane 2"
				input-value="pane2"/>
		</div>
		<div class="col-sm-3">
			<o-radio
				v-model="activePane"
				label="Pane 3"
				input-value="pane3"/>
		</div>
		<div class="col-sm-3">
			<o-radio
				v-model="activePane"
				label="Pane 4"
				input-value="pane4"/>
		</div>
	</div>

	<hr>

	<b>Modify the configuration of the 2nd pill :</b>

	<div class="mt-xs row row--gutter row--middle">
		<div class="col-sm-4">
			<o-select
				v-model="state.icon"
				clearable
				label="icon"
				:options="icons">
				<template #value="{ item }">
					<div class="icon-select-option">
						<i :class="`orion-icon icon ci-${item}`"/>
						{{ item }}
					</div>
				</template>
				<template #before-options>
					<o-alert
						class="mb-xs"
						color="info"
						center>
						Just a preview of<br>
						the 410+ icons
					</o-alert>
				</template>
				<template #option="{ item }">
					<div class="icon-select-option">
						<i :class="`orion-icon icon ci-${item}`"/>
						{{ item }}
					</div>
				</template>
			</o-select>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model="state.pill"
				label="Pill"/>
		</div>
		<div class="col-sm-4">
			<o-select
				v-model="state.marker"
				label="Marker"
				:options="marker"/>
		</div>
		<div class="col-sm-4">
			<color-selection
				v-model="state.markerColor"
				label="Marker"/>
		</div>
	</div>

	<div class="mt-xs row row--gutter row--toggles">
		<div class="col-sm-3">
			<o-toggle
				v-model="state.horizontal"
				label="Horizontal"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.loader"
				label="Loader"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.disabled"
				label="Disabled"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.complete"
				label="Complete"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { materialIcons } from 'lib';

const activePane = ref('pane3');
const targetSlot = computed(() => state.horizontal ? 'default' : 'after');
const icons = computed(() => materialIcons.slice(0, 50));

const state = reactive({
	horizontal: true,
	loader: false,
	disabled: false,
	label: 'step 1',
	icon: 'notification' as Orion.Icon,
	complete: false,
	pill: '1',
	marker: false,
	markerColor: 'info' as Orion.Color,
});

const marker = [
	true,
	1,
	2,
	3,
	4,
];
</script>

### Playground
