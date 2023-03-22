<template>
	<div class="row row--grid">
		<div
			v-for="color of colors"
			:key="color"
			class="col-sm-4">
			<o-card
				title="Info"
				:gradient="color">
				Duis elit dolore elit eiusmod ipsum ex.
				Veniam est ex ullamco deserunt elit id anim tempor.
			</o-card>
		</div>
	</div>
</template>

<script setup lang="ts">

const colors = ['info', 'success', 'warning', 'pink', 'brand'];
</script>

@hl {9,19}

@lang:en
### Gradients

You can use pre-made gradients `info` `success` `warning` `pink` `brand` to add a gradient on the background of the card with the prop `gradient`.
@lang

@lang:fr
### Dégradés

Il est possible d'utiliser les dégradés prédéfinis  `info` `success` `warning` `pink` `brand` pour ajouter un dégradé sur la carte,
en utilisant la prop `gradient`.
@lang
