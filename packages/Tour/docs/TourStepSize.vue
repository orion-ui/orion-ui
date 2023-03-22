<template>
	<!-- <tour-step ref="_tourStep"/> -->

	<div class="row row--grid row--middle">
		<o-button
			id="tour2"
			outline
			color="info"
			@click="startTour(1)">
			Step sm
		</o-button>
		<o-button
			id="tour3"
			outline
			color="info"
			@click="startTour(2)">
			Step md
		</o-button>
		<o-button
			id="tour4"
			outline
			color="info"
			@click="startTour(3)">
			Step lg
		</o-button>
	</div>
</template>


<script setup lang="ts">
import { useTour } from 'lib';
// import TourStep from '../../../sandbox/views/sandbox-julie/TourStep.vue';
import { ref } from 'vue';

const _tourStep = ref<RefDom<OrionTour>>();

function startTour (index = 0) {
	useTour('_tourStep').start(index);
}

</script>

@lang:en
### Size

You can easyly change the size of the step. It comes with 3 sizes : `sm`, `md` and `lg`.
@lang

@lang:fr
### Taille

Il est possible de modifier la taille de l'étape avec la prop `size`.\
Trois valeurs sont disponibles : `sm`, `md` et `lg`.
@lang
