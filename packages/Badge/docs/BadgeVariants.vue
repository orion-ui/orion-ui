<template>
	<div class="flex fd-c g-16">
		<div class="flex g-12 ai-c fw-w">
			<o-badge
				v-for="color of colors"
				:key="`dot-${color}`"
				type="dot"
				:color="color"/>
		</div>
		<div class="flex g-12 ai-c fw-w">
			<o-badge
				v-for="color of colors"
				:key="`square-${color}`"
				type="square"
				:color="color">
				99+
			</o-badge>
		</div>
		<div class="flex g-12 ai-c fw-w">
			<o-badge
				v-for="color of colors"
				:key="`rounded-${color}`"
				type="rounded"
				:color="color">
				99+
			</o-badge>
		</div>
	</div>
</template>

<script setup lang="ts">
import { colors } from 'lib';
</script>

@hl {8,14-15,23-24}

@lang:en
### Variants
Badge supports `dot`, `square`, and `rounded` types with colors from `Orion.Color`.

@lang

@lang:fr
### Variantes
Le badge supporte les types `dot`, `square` et `rounded` avec les couleurs de `Orion.Color`.

@lang
