<template>
	<div class="flex g-sm">
		<div class="flex fd-c g-xs">
			<o-rate
				v-for="(color, index) of colors"
				:key="index"
				:model-value="3"
				:color="color"/>
		</div>
		<div class="flex fd-c g-xs">
			<o-rate
				v-for="(icon, index) of icons"
				:key="index"
				:model-value="3"
				:icon="icon"
				color="info"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { colors } from 'lib';

const icons = [
	'message_circle',
	'heart_fill',
	'home_heart-1',
	'check',
	'mention',
	'filter',
	'dot_05_xl',
	'cloud',
] as Orion.Icon[];
</script>

@hl {8,15-16,24-33}

@lang:en
### Colors
It comes with different colors from `Orion.Color`.

You can also change the icon with the `ìcon` prop (or `font-icon` if you use your own icon font).

:::tip Reminder
All colors are defined with CSS variables, so you can easily override them.
:::
@lang

@lang:fr

@lang

@lang:fr
### Couleurs

Plusieurs couleurs sont disponibles et définies par `Orion.Color`.

Il est aussi possible de changer l'icône avec la prop `icon` (ou `font-icon` si vous utilisez votre propre police d'icônes).

:::tip Rappel
Toutes les couleurs sont définies via des CSS variables, vous pouvez donc les redéfinir facilement.
:::
@lang
