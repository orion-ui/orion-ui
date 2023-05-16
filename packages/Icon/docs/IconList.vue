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
import { ref, computed } from 'vue';
import { coolicons, getUid } from 'lib';

const filter = ref<string>();
const icons = computed(() => {
	return coolicons.filter(x => !!filter.value?.length
		? x.includes(filter.value)
		: true,
	);
});
</script>

<style scoped lang="less">
.orion-input {
	margin: 0 auto 2rem;
	max-width: calc(11rem * 3 + 4rem);
}

.demo-icon-wrapper {
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-wrap: wrap;
	gap: 2rem;
	max-height: 60vh;
	overflow: auto;
}

.demo-icon {
	flex: 11rem 0 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	background: var(--c-bg);
	padding: 1.25rem;

	.orion-icon {
		display: block;
		font-size: 1.5rem;
	}
}
</style>

@lang:en
### Icon List

See the full icon list and filter them by name or browse on the library's official website : [Coolicons](https://coolicons.cool/)
@lang

@lang:fr
### Liste des icônes

Retrouvez ici la liste complèteque vous pouvez filtrer par nom, ou visitez le site officiel de la bibliothèque : [Coolicons](https://coolicons.cool/)
@lang
