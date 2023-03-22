<template>
	<o-sticker
		selected
		title="Title">
		Lorem ipsum dolor sit amet consectetur adipisicing elit.
		Tempora blanditiis cumque modi ullam non fugiat nulla suscipit.
	</o-sticker>

	<o-sticker
		selected
		selected-color="success"
		title="Title">
		Lorem ipsum dolor sit amet consectetur adipisicing elit.
		Tempora blanditiis cumque modi ullam non fugiat nulla suscipit.
	</o-sticker>
</template>

@hl {3,10-11}

@lang:en
### Selection

You can easily apply a selected style to a sticker with the prop `selected` and change the color with `selected-color` which takes a string from `Orion.Color`.\
This can be useful in a list to select one or more stickers items for example.

::: tip
You can use the `o-footer` component to display more actions on the selected sticker (see [Orion Footer](./OrionFooterFixed.md) component page).
:::
@lang

@lang:fr
### Sélection
Il est possible d'appliquer un style particulier lorqu'un sticker est sélectionné avec la prop `selected`,
et de changer la couleur avec la prop `selected-color` à partir des couleurs définies par `Orion.Color`.\
Cela peut être utile dans le cas d'une liste, pour selectionner un ou plusieurs stickers.

:::tip
Le composant `o-footer` peut être utilisé de façon complémentaire pour afficher plus d'actions sur le sticker sélectionné
(voir la page [Orion Footer](/fr/components/OrionFooterFixed.md)).
:::
@lang
