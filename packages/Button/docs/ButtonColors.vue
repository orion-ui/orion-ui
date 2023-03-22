<template>
	<div class="flex fd-c g-xs">
		<div class="flex g-xs fw-w">
			<o-button
				v-for="(color, index) of colors"
				:key="index"
				:color="color">
				{{ color }}
			</o-button>
		</div>
		<div class="flex g-xs fw-w">
			<o-button
				v-for="(color, index) of colors"
				:key="index"
				:color="color"
				outline>
				{{ color }}
			</o-button>
		</div>
		<div class="flex g-xs fw-w">
			<o-button
				v-for="(color, index) of colors"
				:key="index"
				:color="color"
				nude>
				{{ color }}
			</o-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { colors } from 'lib';
</script>

@hl {7,15-16,24-25}

@lang:en
### Colors

It comes with different colors from `Orion.Color`.

You can easily change the style with the `outline` or the `nude` prop.
@lang

@lang:fr
### Couleurs

Plusieurs couleurs sont disponibles et définies par `Orion.Color`.\
Le style du bouton est personnalisable avec les props `outline` et `nude`.
@lang
