<template>
	<div class="flex fd-c g-8">
		<o-input-range
			v-model="value"
			color="info"/>
		<o-input-range
			v-model="valueRange"
			color="primary"/>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(10);
const valueRange = ref([40, 60]);
</script>

@lang:en
### Value

The value of the input can be a number, or an array of two number, which will display two sliders for the range.
@lang

@lang:fr
### Valeur

La valeur peut être un nombre, ou un tableau de deux nombres qui va alors afficher deux curseurs pour représenter une plage.
@lang
