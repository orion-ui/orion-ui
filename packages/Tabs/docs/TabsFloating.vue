<template>
	<o-tabs
		v-model="activePane"
		floating-tabs>
		<o-tab-pane
			name="pane1"
			label="pane 1">
			Content of the pane 1
		</o-tab-pane>
		<o-tab-pane
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

@hl {4}

@lang:en
### Floating Tabs

With the `floatingTabs` props ypou can display a navigation variant that allows quick access to a limited set of views or actions,
while remaining visually detached from the main content.

@lang

@lang:fr
### Floating Tabs

Avec la prop `floatingTabs`, vous pouvez afficher une variante de navigation secondaire qui permet d’accéder rapidement à un ensemble limité de vues
ou d’actions, tout en restant visuellement détaché du contenu principal.
@lang
