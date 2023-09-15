<template>
	<div class="row row--grid row--middle targetplayground">
		<o-button
			id="tour2"
			outline
			color="info"
			@click="startTour">
			Step with no target
		</o-button>
		<o-button
			id="tour3"
			outline
			color="info"
			@click="startTour(1)">
			Step with string target
		</o-button>
		<o-button
			id="tour4"
			outline
			color="info"
			@click="startTour(2)">
			Function target
		</o-button>
	</div>
</template>


<script setup lang="ts">
import { useTour } from 'lib';

function startTour (index?: number) {
	useTour('_tourProps').start(index);
}

</script>

@lang:en
### Target

The `target` prop allows you to select a DOM element. If it is a `string`, the target should represent an `id` of an element in the DOM.\
It can also be a function (so you can use a jquery selector for example or do some actions before selecting the target).\
If this prop is not set, no target will be highlighted and the step will appear in the middle of the window.
@lang

@lang:fr
### Cible

La prop `target` permet de selectionner un élément du DOM et de le mettre en surbrillance.
S'il s'agit d'une `string`, elle doit correspondre à l'id de cet élément dans le DOM.\
Il peut aussi s'agir d'une fonction qui doit renvoyer l'élément à sélectionner
(pour utiliser un selecteur jquery ou pour effectuer des actions avant de sélectionner l'élément).\
Si aucune valeur n'est fournie pour la prop `target`, la description de l'étape se placera au centre de la page.
@lang
