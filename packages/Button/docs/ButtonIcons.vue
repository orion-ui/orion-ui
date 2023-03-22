<template>
	<div class="flex fw-w g-xs">
		<o-button prefix-icon="bulb">
			prefix
		</o-button>
		<o-button suffix-icon="bulb">
			suffix
		</o-button>
		<o-button loading>
			loading
		</o-button>
		<o-button prefix-icon="bulb"/>
	</div>
</template>

@hl {3,6,9,12}

@lang:en
### Icons

Add icons from `Orion.Icon` with the props `prefixIcon` or `suffixIcon`.

A loading state can be set with the boolean prop `loading`, which adds an spinner icon and disables the button.

:::tip Reminder
You can also use `prefixFontIcon` and `suffixFontIcon` props if you use your own icon font.
:::
@lang

@lang:fr
### Icônes

Ajoutez une icône du type `Orion.Icon` avec les props `prefixIcon` et `suffixIcon`.

Un état de chargement peut être défini avec la prop booléenne `loading`, qui ajoute un spinner et désactive le bouton.

:::tip Rappel
Vous pouvez également utiliser les props `prefixFontIcon` et `suffixFontIcon` si vous utilisez votre propre police d'icônes.
:::
@lang
