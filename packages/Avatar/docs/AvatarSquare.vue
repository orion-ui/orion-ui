<template>
	<div class="row row--grid row--middle">
		<div class="col-sm-4">
			<o-avatar
				square
				size="xl"
				:contain="contain"
				avatar="https://picsum.photos/id/1074/200/150"/>
		</div>

		<div class="col-sm-4">
			<o-avatar
				size="xl"
				:contain="contain"
				avatar="https://picsum.photos/id/1074/200/150"/>
		</div>

		<div class="col-sm-4">
			<o-toggle

				v-model="contain"
				label="Toggle contain"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const contain = ref(false);
</script>

@hl {5,6,12}

@lang:en
### Shapes & Contain

Define the shape of the avatar with the `square` prop and how the image should be displayed with the `contain` prop.
@lang

@lang:fr
### Formes et disposition

Par défaut, l'avatar sera sous forme de rond, mais on peut choisir de l'afficher sous forme de carré avec la prop `square`.\
La prop `contain` permet de définir si l'image doit être redimentionnée pour correspondre à la taille de l'avatar.

@lang
