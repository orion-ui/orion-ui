<template>
	<div class="row row--grid">
		<div class="col-sm-4">
			<o-input
				v-model="value"
				label="Prefix icon"
				prefix-icon="check"/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model="value"
				label="Suffix icon"
				suffix-icon="calendar"/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model="value"
				label="Both"
				prefix-icon="warning"
				suffix-icon="check"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref();
</script>

@hl {7,13,19-20}

@lang:en
### Icons

You can easily add a prefix or a suffix icon on the input with the props `prefixIcon` and `suffixIcon`.

:::tip Reminder
You can also use `prefixFontIcon` and `suffixFontIcon` props if you use your own icon font.
:::
@lang

@lang:fr
### Icônes

Il est possible d'ajouter une icône en préfix ou en suffix du champ de saisie avec les props `prefixIcon` et `suffixIcon`.

:::tip Rappel
Vous pouvez également utiliser les props `prefixFontIcon` et `suffixFontIcon` si vous utilisez votre propre police d'icônes.
:::
@lang
