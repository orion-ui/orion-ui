<template>
	<div class="loader-sizes flex g-xs fw-w">
		<div
			v-for="(size, index) of sizes"
			:key="index">
			<o-loader
				:size="size"
				:message="`Loader ${size}`"
				visible/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { sizes } from 'lib';
</script>

<style scoped lang="less">
.loader-sizes {
	> div {
		position: relative;
		flex: 0 0 calc(20% - 0.7rem);
		aspect-ratio: 1;
	}
}
</style>

@hl {4,10}

@lang:en
### Size

You can define if the loader must fit in its parent container or be fullscreen with the `global` prop.

You change also change the size with the `size` prop.
@lang

@lang:fr
### Taille

Il est possible de définir si l'icône de chargement s'affichera sur toute la page ou dans le composant parent avec la props `global`.\
Plusieurs tailles sont égelement disponibles et définies par `Orion.Size`.
@lang
