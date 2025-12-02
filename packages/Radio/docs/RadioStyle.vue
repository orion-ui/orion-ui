<template>
	<div class="flex g-16 fw-w">
		<o-radio
			v-for="(color, index) of colors"
			:key="index"
			v-model="checkValue"
			:color="color"
			:label="color"/>
	</div>
	<div class="flex g-16 fw-w">
		<o-radio
			v-for="(icon, index) of icons"
			:key="index"
			v-model="checkValue"
			:icon-check="icon"
			:label="icon"/>
	</div>
</template>


<script setup lang="ts">
import { computed, ref } from 'vue';
import { materialIcons, colors } from 'lib';

const checkValue = ref(true);

const icons = computed(() => {
	return materialIcons.slice(60, 66);
});
</script>

@hl {7,15}

@lang:en
### Style
It comes with different colors from `Orion.Color`.

You can also change the check icon with the prop `iconCheck`.

:::tip Reminder
All colors are defined with CSS variables, so you can easily override them.
:::
@lang

@lang:fr
### Style
Plusieurs couleurs sont disponibles et définies par `Orion.Color`.

Il est aussi possible de modifier l'icône quand l'input est coché avec la prop `iconCheck`.

:::tip Rappel
Toutes les couleurs sont définies via des CSS variables, vous pouvez donc les redéfinir facilement.
:::
@lang
