<template>
	<div class="flex fd-c g-8">
		<div class="flex g-8 fw-w">
			<o-toggle-button
				v-for="(color, index) of colors"
				:key="index"
				v-model="vModel"
				:color="color">
				{{ color }}
			</o-toggle-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { colors } from 'lib';
import { ref } from 'vue';

const vModel = ref(true);
</script>

@hl {8}

@lang:en
### Colors

It comes with different colors from `Orion.Color`.

You can easily change the style with the `nude` prop.
@lang

@lang:fr
### Couleurs

Plusieurs couleurs sont disponibles et définies par `Orion.Color`.\
Le style du bouton est personnalisable avec la props `nude`.
@lang
