<template>
	<div class="flex fw-w g-16">
		<o-toggle
			v-for="(color, index) of colors"
			:key="index"
			v-model="checkValue"
			:label="color"
			:color="color"/>
	</div>

	<hr>

	<div class="flex fw-w g-16">
		<o-toggle
			v-for="(size, index) of sizes"
			:key="index"
			v-model="checkValue"
			:label="size"
			:size="size"/>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { colors, sizes } from 'lib';

const checkValue = ref(true);
</script>

@hl {8,19}

@lang:en
### Colors and sizes
It comes with different colors from `Orion.Color` and different sizes from `Orion.Size`.

:::tip Reminder
All colors are defined with CSS variables, so you can easily override them.
:::
@lang

@lang:fr
### Couleurs et tailles
Plusieurs couleurs et tailles sont disponibles et définies par `Orion.Color` et `Orion.Size`.

:::tip Rappel
Toutes les couleurs sont définies via des CSS variables, vous pouvez donc les redéfinir facilement.
:::
@lang
