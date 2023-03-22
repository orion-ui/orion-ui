<template>
	<div class="flex jc-c g-xl">
		<div class="flex fd-c g-sm">
			<o-color-picker
				v-model="colorRgba"
				format="rgba"/>
			Value: {{ colorRgba }}
		</div>

		<div class="flex fd-c g-sm">
			<o-color-picker
				v-model="colorHex"
				format="hex"
				hide-rgba/>
			Value: {{ colorHex }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const colorRgba = ref('rgba(255, 0, 94, 1)');
const colorHex = ref('#B78EB3');
</script>

@hl {6,13-14}

@lang:en
### Format

You can define the format of the picked color with the prop `format` and choose to display the different values with the props
`hideHex` and `hideRgba`.
@lang

@lang:fr
### Format

Il est possible de définir le format de la couleur sélectionnée avec la prop `format` (hex ou RGBA),
et de choisir d'afficher les différents formats de valeur avec les props `hideHex` et `hideRgba`.
@lang
