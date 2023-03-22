<template>
	<div class="flex g-sm jc-sb">
		<o-progress-circle
			v-for="(color, index) of colors"
			:key="index"
			:label="`${index*10}%`"
			:value="index*10"
			:color="color"/>
	</div>
</template>

<script setup lang="ts">
import { colors } from 'lib';
</script>

@hl {8}

@lang:en
### Colors

It comes with different colors from `Orion.Color`.

:::tip Reminder
All colors are defined with CSS variables, so you can easily override them.
:::
@lang

@lang:fr
### Couleurs

Plusieurs couleurs sont disponibles et définies par `Orion.Color`.

:::tip Rappel
Toutes les couleurs sont définies via des CSS variables, vous pouvez donc les redéfinir facilement.
:::
@lang
