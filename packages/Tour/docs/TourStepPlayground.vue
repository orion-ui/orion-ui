<template>
	<o-button
		id="tour11"
		color="info"
		@click="startTour(0)">
		Step with no target
	</o-button>
	<hr>
	<div class="row row--grid row--middle">
		<b>Change the size :</b>
		<o-button
			id="tour2"
			outline
			color="info"
			@click="startTour(1)">
			Step xs
		</o-button>
		<o-button
			id="tour3"
			outline
			color="info"
			@click="startTour(2)">
			Step lg
		</o-button>
	</div>
	<hr>
	<div class="row row--grid row--middle">
		<b>Close props :</b>
		<o-button
			id="tour2"
			outline
			color="info"
			@click="startTour(1)">
			closable
		</o-button>
		<o-button
			id="tour3"
			outline
			color="info"
			@click="startTour(2)">
			hideFinish
		</o-button>
	</div>
</template>


<script setup lang="ts">
import { useTour } from 'lib';

function startTour (index = 0) {
	useTour('_tourStep').start(index);
}

</script>

### Playground
