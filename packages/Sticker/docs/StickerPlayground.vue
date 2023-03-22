<template>
	<o-sticker v-bind="state">
		Lorem ipsum dolor sit amet consectetur adipisicing elit.
		Tempora blanditiis cumque modi ullam non fugiat nulla suscipit.

		<template
			v-if="state.thumbnail"
			#thumbnail>
			<o-avatar
				:size="75"
				name="Jack"
				avatar="https://picsum.photos/id/104/3840/2160"/>
		</template>

		<template #actions>
			<o-icon
				ripple="info"
				icon="check"/>
			<o-icon icon="undo"/>
		</template>
	</o-sticker>

	<hr>

	<div class="row row--grid">
		<div class="col-sm-4">
			<o-input
				v-model="state.title"
				label="Title"/>
		</div>
		<div class="col-sm-4">
			<color-selection v-model="state.selectedColor"/>
		</div>
	</div>
	<div class="row row--grid row--toggles">
		<div class="col-sm-4">
			<o-toggle
				v-model="state.muted"
				label="Muted"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.hideActions"
				label="Hide action"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.thumbnail"
				label="Show thumbnail"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.selected"
				label="Selected"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.useElevation"
				label="Use elevation"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
	title: 'Title',
	muted: false,
	hideActions: false,
	selected: false,
	thumbnail: true,
	selectedColor: 'info' as Orion.Color,
	useElevation: true,
});
</script>

@hl {2,67-75}

### Playground
