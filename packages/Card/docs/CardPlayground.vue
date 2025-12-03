<template>
	<o-card
		v-bind="state"
		:gradient="state.gradient === 'none' ? undefined : state.gradient">
		{{ state.content }}

		<template
			v-if="state.poster"
			#poster>
			<img
				style="height:10rem"
				src="https://picsum.photos/id/1006/200">
		</template>

		<template #actions>
			<o-icon
				icon="check"
				ripple="info"
				@click="state.selected = !state.selected"/>

			<o-icon
				icon="play_arrow"
				ripple="success"
				@click="triggerNotif()"/>
		</template>
	</o-card>

	<hr>

	<div class="row row--gutter">
		<div class="col-sm-4">
			<o-input
				v-model="state.title"
				label="Title"
				clearable/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model="state.subtitle"
				label="Subtitle"
				clearable/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model="state.hoverElevation"
				label="Hover elevation"
				type="number"/>
		</div>
	</div>

	<div class="row row--gutter">
		<div class="col-sm-4">
			<size-selection v-model="state.size"/>
		</div>
		<div class="col-sm-4">
			<color-selection
				v-model="state.gradient"
				label="Gradient"/>
		</div>
		<div class="col-sm-4">
			<color-selection
				v-model="state.selectedColor"
				label="Selected color"/>
		</div>
	</div>

	<div class="row row--grid row--toggles">
		<div class="col-sm-4">
			<o-toggle
				v-model="state.poster"
				label="Poster slot"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.selected"
				label="Selected"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.headerLine"
				label="Header Line"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.actionsLine"
				label="Actions Line"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useNotif } from 'lib';

function triggerNotif () {
	useNotif.info('Nice job !');
}

const state = reactive({
	title: 'Duis mollis est',
	subtitle: 'Aenean eu leo quam',
	poster: false,
	content: 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
	gradient: undefined as Orion.Color & undefined,
	selected: false,
	selectedColor: 'info' as Orion.Color,
	headerLine: false,
	actionsLine: false,
	size: 'md' as Orion.Size,
	hoverElevation: 1,
});
</script>

<style lang="less" scoped>
.orion-card {
	margin: auto;
	width: 20rem;
}
</style>

@hl {3,92-103}

### Playground
