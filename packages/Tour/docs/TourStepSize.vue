<template>
	<!-- <tour-step ref="_tourStep"/> -->

	<div class="row row--grid row--middle">
		<o-button
			id="stepsm"
			outline
			color="info"
			@click="startTour(3)">
			Step sm
		</o-button>
		<o-button
			id="stepmd"
			outline
			color="info"
			@click="startTour(4)">
			Step md
		</o-button>
		<o-button
			id="steplg"
			outline
			color="info"
			@click="startTour(5)">
			Step lg
		</o-button>
	</div>
</template>


<script setup lang="ts">
import { useTour } from 'lib';

function startTour (index = 0) {
	useTour('_tourProps').start(index);
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
