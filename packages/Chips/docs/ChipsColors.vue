<template>
	<div class="flex fd-c g-16">
		<div class="flex g-8 fw-w">
			<o-chips
				v-for="(color, index) of chipsColors"
				:key="index"
				:color="color">
				{{ color }}
			</o-chips>
		</div>
		<div class="flex g-8 fw-w">
			<o-chips
				v-for="(color, index) of chipsColors"
				:key="index"
				:color="color"
				outline>
				{{ color }}
			</o-chips>
		</div>
		<div
			v-if="showGreys"
			class="flex g-8 fw-w">
			<o-chips
				v-for="(color, index) of greys"
				:key="index"
				:color="color">
				{{ color }}
			</o-chips>
		</div>
		<div
			v-if="showGreys"
			class="flex g-8 fw-w">
			<o-chips
				v-for="(color, index) of greys"
				:key="index"
				:color="color"
				outline>
				{{ color }}
			</o-chips>
		</div>
		<div class="flex g-8 fw-w">
			<o-chips
				v-for="(color, index) of chipsColors"
				:key="index"
				:color="color">
				dual
				<template #dual>
					{{ index }}
				</template>
			</o-chips>
		</div>
	</div>

	<hr>
	<div class="flex g-32">
		<o-toggle
			v-model="altColors"
			label="Alternative colors"/>
		<o-toggle
			v-model="showGreys"
			label="Grey alternatives"/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { colors, colorsAlt, greys } from 'lib';
const altColors = ref(false);
const showGreys = ref(false);
const chipsColors = computed(() => altColors.value ? colorsAlt : colors);
</script>

@hl {7,15-16,26-28}

@lang:en
### Colors
It comes with different colors from `Orion.ColorExtendedAndGreys`.

You can easily change the style with the prop `outline` and add more informations with the `dual` slot.

:::tip Reminder
All colors are defined with CSS variables, so you can easily override them.
:::
@lang

@lang:fr
### Couleurs

Plusieurs couleurs sont disponibles et définies par `Orion.ColorExtendedAndGreys`.

Il est possibe de changer son style grâce à la prop `outline`,
et d'ajouter un complément d'information avec le slot `dual` qui va scinder le composant en deux.

:::tip Rappel
Toutes les couleurs sont définies via des CSS variables, vous pouvez donc les redéfinir facilement.
:::
@lang
