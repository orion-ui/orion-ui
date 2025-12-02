<template>
	<div class="flex ai-c jc-c g-32">
		<o-icon
			icon="warning"
			ripple="warning"/>
		<o-icon
			icon="file_copy"
			button="info"/>
		<o-icon
			icon="folder"
			:loading="loading"/>
		<o-toggle
			v-model="loading"
			label="loading"/>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(false);
</script>

<style lang="less" scoped>
.orion-icon{
  font-size: 1.5rem;
}
</style>

@hl {5,8,11}

@lang:en
### Style
You can add an animation on hover and click with the prop `ripple`, or add a background color with the `button` prop.

A `loading` prop can also be used.
@lang

@lang:fr
### Style
Il est possible d'ajouter une animation au survol et au click avec la prop `ripple`, ou d'ajouter une couleur de fond avec la prop `button`.\
La prop `loading` peut être utilisé pour indiquer un état de chargement.
@lang

