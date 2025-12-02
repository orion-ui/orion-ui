<template>
	<o-card>
		<o-horizontal-scroll
			:scroll-step="horizontalScrollStepper"
			:targets="horizontalScrollStepper"
			shadow-color="white">
			<div
				id="show-preview"
				class="flex g-8">
				<o-button
					v-for="number in 15"
					:key="number"
					outline
					:size="number%2 ? 'xs' : 'lg'"
					color="info">
					{{ number }}
				</o-button>
			</div>
		</o-horizontal-scroll>
	</o-card>
</template>

<script setup lang="ts">
function horizontalScrollStepper () {
	const buttons = document.getElementById('show-preview')?.querySelectorAll('.orion-button');
	if (buttons) {
		return [...buttons] as HTMLElement[];
	}
	return [];
};
</script>

@hl {5,23}

@lang:en
### Preview

You can add a preview of the items contained in the scroll with the prop `target`. \
The function must return an array of DOM elements on which the scroll will be applied.
@lang

@lang:fr
### Aperçu

Il est possible de d'afficher un aperçu des objets contenus dans le scroll avec la prop `target`. \
La fonction doit retourner un tableau d'éléments du DOM sur lesquels le scroll va s'appliquer.
@lang
