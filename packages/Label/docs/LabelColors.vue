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

		<div
			v-if="displayGreys"
			class="flex fd-c g-sm">
			<div class="flex g-xs">
				<o-label
					v-for="(color, index) of greys"
					:key="index"
					:color="color">
					{{ color }}
				</o-label>
			</div>
			<div
				class="flex g-xs">
				<o-label
					v-for="(color, index) of greys"
					:key="index"
					:color="color"
					outline>
					{{ color }}
				</o-label>
			</div>
		</div>

		<div class="flex g-md">
			<o-toggle
				v-model="displayAltColors"
				label="Display alternative colors"/>
			<o-toggle
				v-model="displayGreys"
				label="Display grey alternatives"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { colors, colorsAlt, greys } from 'lib';
const displayAltColors = ref(false);
const displayGreys = ref(false);
const colorsToDisplay = computed(() => displayAltColors.value ? colorsAlt : colors);
</script>

@hl {6,15-16}

@lang:en
### Colors
All the framework's colors are available (`Orion.ColorExtendedAndGreys`).

You can easily change the style with the prop `outline`.

:::tip Reminder
All colors are defined with CSS variables, so you can easily override them.
:::
@lang

@lang:fr
### Couleurs
Toutes les couleurs du framework sont disponibles (`Orion.ColorExtendedAndGreys`).

Vous pouvez facilement changer le style avec la prop `outline`.

:::tip Rappel
Toutes les couleurs sont définies via des CSS variables, vous pouvez donc les redéfinir facilement.
:::
@lang
