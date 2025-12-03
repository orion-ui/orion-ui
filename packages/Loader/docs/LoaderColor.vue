<template>
	<div class="loader-colors flex g-8 fw-w">
		<div
			v-for="(color, index) of colors"
			:key="index">
			<o-loader
				size="sm"
				:color="color"
				:message="`${color}`"
				visible/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { colors } from 'lib';
</script>

<style scoped lang="less">
.loader-colors {
	> div {
		position: relative;
		flex: 0 0 4.5rem;
		aspect-ratio: 1;
	}
}
</style>


@hl {8}

@lang:en
### Color

It comes with different colors from `Orion.Color` type.

:::tip Reminder
All colors are defined with CSS variables, so you can easily override them.
:::
@lang

@lang:fr
### Couleurs

Les couleurs disponibles sont définies par le type `Orion.Color`.

:::tip Rappel
Toutes les couleurs sont définies via des CSS variables, vous pouvez donc les redéfinir facilement.
:::
@lang
