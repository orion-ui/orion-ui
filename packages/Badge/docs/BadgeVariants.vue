<template>
	<div class="flex fd-c g-16">
		<div class="flex g-12 ai-c fw-w">
			<o-badge
				v-for="color in badgeColors"
				:key="`dot-${color}`"
				type="dot"
				:color="color"/>
		</div>
		<div class="flex g-12 ai-c fw-w">
			<o-badge
				v-for="color in badgeColors"
				:key="`square-${color}`"
				type="square"
				:color="color">
				99+
			</o-badge>
		</div>
		<div class="flex g-12 ai-c fw-w">
			<o-badge
				v-for="color in badgeColors"
				:key="`rounded-${color}`"
				type="rounded"
				:color="color">
				99+
			</o-badge>
		</div>
	</div>
</template>

<script setup lang="ts">
const badgeColors = ['default', 'primary', 'success', 'warning', 'danger', 'highlight'];
</script>

@hl {5,13,23}

@lang:en
### Variants
Badge supports `dot`, `square`, and `rounded` types with six color variants.

@lang

@lang:fr
### Variantes
Le badge supporte les types `dot`, `square` et `rounded` avec six variantes de couleur.

@lang
