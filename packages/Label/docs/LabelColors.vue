<template>
	<div class="flex fd-c g-sm">
		<div class="flex g-xs">
			<o-label
				v-for="(color, index) of colorsToDisplay"
				:key="index"
				:color="color">
				{{ color }}
			</o-label>
		</div>
		<div class="flex g-xs">
			<o-label
				v-for="(color, index) of colorsToDisplay"
				:key="index"
				:color="color"
				outline>
				{{ color }}
			</o-label>
		</div>
		<o-toggle
			v-model="displayAltColors"
			label="Display alternative colors"/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { colors, colorsAlt } from 'lib';
const displayAltColors = ref(false);
const colorsToDisplay = computed(() => displayAltColors.value ? colorsAlt : colors);
</script>

@hl {6,15-16}

@lang:en
### Colors
All the framework's colors are available (`Orion.ColorExtended`).

You can easily change the style with the prop `outline`.

:::tip Reminder
All colors are defined with CSS variables, so you can easily override them.
:::
@lang

@lang:fr
### Couleurs
Toutes les couleurs du framework sont disponibles (`Orion.ColorExtended`).

Vous pouvez facilement changer le style avec la prop `outline`.

:::tip Rappel
Toutes les couleurs sont définies via des CSS variables, vous pouvez donc les redéfinir facilement.
:::
@lang
