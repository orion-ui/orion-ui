<template>
	<o-tabs v-model="activePane">
		<o-tab-pane
			disabled
			name="pane1"
			label="pane 1 is disabled">
			Content of the pane
		</o-tab-pane>
		<o-tab-pane
			icon="check"
			name="pane2"
			label="pane 2">
			Content of the pane
		</o-tab-pane>
	</o-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activePane = ref<string>('pane2');
</script>

@hl {4,10}

@lang:en
### Style

With the prop `disabled` you can disabled a pane so the user cannot click on it and see its content.

You can also add an icon before the label of the pane with the prop `icon` (or `font-icon` if you are using your own font library).
@lang

@lang:fr
Avec la prop `disabled` il est possible de désactiver un onglet afin d'en bloquer l'accès.

On peut également ajouter une icône avant le nom de l'onglet avec la prop `icon` (ou `font-icon` si vous utilisez votre propre police d'icônes.)
@lang
