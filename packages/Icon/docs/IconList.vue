<template>
	<o-input
		v-model="filter"
		label="Search"/>

	<div class="demo-icon-wrapper">
		<div
			v-for="icon in icons"
			:key="`${icon}-${getUid()}`"
			class="demo-icon">
			<o-icon :icon="icon"/>
			{{ icon }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { getUid, materialIcons } from 'lib';
import { computed, ref } from 'vue';

const filter = ref<string>();
const icons = computed(() => {
	return materialIcons.filter(x => !!filter.value?.length
		? x.includes(filter.value)
		: true,
	);
});
</script>

<style scoped lang="less">
.orion-input {
	max-width: calc(11rem * 3 + 4rem);
	margin: 0 auto 2rem;
}

.demo-icon-wrapper {
	overflow: auto;
	display: flex;
	flex-wrap: wrap;
	gap: 2rem;
	align-items: flex-start;
	justify-content: center;
	max-height: 60vh;
}

.demo-icon {
	display: flex;
	flex: 11rem 0 0;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	padding: 1.25rem;
	background: var(--o-background-neutral-default);

	.orion-icon {
		display: block;
		font-size: 1.5rem;
	}
}
</style>

@lang:en
### Icon List

See the full icon list and filter them by name or browse on the library's official website : [Material Icons](https://fonts.google.com/icons)
@lang

@lang:fr
### Liste des icônes

Retrouvez ici la liste complèteque vous pouvez filtrer par nom, ou visitez le site officiel de la
bibliothèque : [Material Icons](https://fonts.google.com/icons)
@lang
