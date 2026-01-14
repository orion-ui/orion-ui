<template>
	<o-card :use-elevation="false">
		<o-tabs
			v-model="activePane"
			v-bind="state">
			<o-tab-pane
				v-bind="state">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</o-tab-pane>

			<o-tab-pane
				name="pane2"
				label="Pane 2"
				:marker="3">
				Cras eu sapien fermentum, bibendum turpis vel, congue metus. Phasellus ultricies
				urna porta sem auctor, in dignissim lorem tempus. Morbi non blandit ante, a fermentum orci. Praesent
				dolor ex, vehicula non semper et, fringilla lacinia erat.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</o-tab-pane>

			<o-tab-pane
				name="pane3"
				label="Pane 3">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</o-tab-pane>
		</o-tabs>
	</o-card>

	<hr>

	<div class="mt-12 row row--gutter row--middle">
		<div class="col-sm-4">
			<o-toggle
				v-model="state.floatingTabs"
				label="Use floating Tabs"/>
		</div>
		<div class="col-sm-4">
			<size-selection
				v-model="state.headerSize"
				:options="['sm', 'md']"
				label="Header Size"/>
		</div>
	</div>

	<hr>

	<b>Modify the configuration of the first tab :</b>

	<div class="mt-12 row row--gutter row--middle">
		<div class="col-sm-4">
			<o-input
				v-model="state.label"
				label="Label"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.loader"
				label="Loader"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.disabled"
				label="Disabled"/>
		</div>
		<div class="col-sm-4">
			<o-select
				v-model="state.icon"
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
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { materialIcons } from 'lib';

const activePane = ref('pane1');

const state = reactive({
	floatingTabs: false,
	loader: false,
	icon: 'check' as Orion.Icon,
	disabled: false,
	headerSize: 'md' as Extract<Orion.Size, 'sm' | 'md'>,
	lazy: false,
	lazyOnce: false,
	name: 'pane1',
	label: 'Try me !',
	marker: true,
	markerColor: 'info' as Orion.Color,
});

const icons = computed(() => {
	return materialIcons.slice(0, 50);
});

const marker = [
	false,
	true,
	1,
	2,
	3,
	4,
];
</script>

### Playground
