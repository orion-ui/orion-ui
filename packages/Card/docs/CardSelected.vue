<template>
	<div class="row row--grid">
		<div class="col-sm-6">
			<o-card
				:selected="selected"
				title="Title of the card"
				@click="selected = !selected">
				Duis elit dolore elit eiusmod ipsum ex cillum eu eiusmod tempor ipsum do magna qui.
				Veniam est ex ullamco deserunt elit id anim tempor.
			</o-card>
		</div>

		<div class="col-sm-6">
			<o-card
				:selected="selected"
				selected-color="success"
				@click="selected = !selected">
				Duis elit dolore elit eiusmod ipsum ex cillum eu eiusmod tempor ipsum do magna qui.
				Veniam est ex ullamco deserunt elit id anim tempor.
			</o-card>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref(true);
</script>

@hl {5,15-16}

@lang:en
### Selection

You can easily apply a selected style to a card with the prop `selected` and change the color with `selected-color` which takes a string from `Orion.Color`.\
This can be useful in a list to select one or more card items for example.

::: tip
You can use the `o-footer` component to display more informations about the items selected (see [Orion Footer](./OrionFooterFixed.md) component page).
:::
@lang

@lang:fr
### Sélection
Il est possible d'appliquer un style particulier lorqu'une carte est sélectionnée avec la prop `selected`,
et de changer la couleur avec la prop `selected-color` à partir des couleurs définies par `Orion.Color`.\
Cela peut être utile dans le cas d'une liste, pour selectionner une ou plusieurs cartes.

:::tip
Le composant `o-footer` peut être utilisé de façon complémentaire pour afficher plus d'informations à propos de la carte sélectionnée
(voir la page [Orion Footer](/fr/components/OrionFooterFixed.md)).
:::
@lang
