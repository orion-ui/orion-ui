<template>
	<o-tabs v-model="activePane">
		<o-tab-pane
			marker
			name="pane1"
			label="pane 1">
			Content of the pane 1
		</o-tab-pane>
		<o-tab-pane
			:marker="3"
			marker-color="success"
			name="pane2"
			label="pane 2">
			Content of the pane 2
		</o-tab-pane>
	</o-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activePane = ref<string>('pane1');
</script>

@hl {4,10-11}

@lang:en
### Marker

You can easily add a visual marker on the pane and change its color and value.
@lang

@lang:fr
### Pastille

Il est possible d'afficher une pastille au niveau du nom de l'onglet, et de changer sa couleur ou sa valeur.
@lang
