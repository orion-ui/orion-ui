<template>
	<div class="flex fd-c g-sm">
		<o-progress-bar
			v-for="(color, index) of colors"
			:key="index"
			:label="`${index*10}%`"
			:value="index*10"
			:color="color"
			:width="15"/>
	</div>
</template>

<script setup lang="ts">
import { colors } from 'lib';
</script>

@hl {8}

@lang:en
### Colors

It comes with different colors from `Orion.Color` type.

:::tip Reminder
All colors are defined with CSS variables, so you can easily override them.
:::
@lang

@lang:fr
### Couleurs

Plusieurs couleurs sont disponibles et définies par le type `Orion.Color`.

:::tip Rappel
Toutes les couleurs sont définies via des CSS variables, vous pouvez donc les redéfinir facilement.
:::
@lang
