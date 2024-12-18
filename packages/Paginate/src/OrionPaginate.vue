<template>
	<div
		:ref="setup._el"
		class="orion-paginate">
		<orion-button
			nude
			class="orion-paginate__prev"
			prefix-icon="chevron_left"
			@click="setup.index -= 1"/>

		<div class="orion-paginate__wrapper">
			<orion-button
				v-for="(page, i) in setup.pagesArray"
				:key="i"
				:class="[
					{ 'orion-paginate__index-active': setup.isActive(Number(page)) },
					{ 'orion-paginate__ellipsis': page === '...' },
				]"
				:color="setup.isActive(Number(page)) ? 'info' : 'default'"
				:disabled="page === '...'"
				nude
				class="orion-paginate__index"
				@click="setup.index = Number(page)">
				{{ page }}
			</orion-button>
		</div>

		<orion-button
			nude
			class="orion-paginate__next"
			suffix-icon="chevron_right"
			@click="setup.index += 1"/>
	</div>
</template>

<script setup lang="ts">
import './OrionPaginate.less';
import { OrionButton } from 'packages/Button';
import OrionPaginateSetupService from './OrionPaginateSetupService';
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
	(e: 'update:modelValue', payload: number): void;
	(e: 'paginate', payload: number): void;
}>();
const props = defineProps(OrionPaginateSetupService.props);
const setup = new OrionPaginateSetupService(props, emit);
defineExpose(setup.publicInstance);

/** Doc
 * @doc event/update:modelValue/desc emitted to update the active page index
 * @doc/fr event/update:modelValue/desc émis pour mettre à jour l'index de la page active
 *
 * @doc event/paginate/desc emitted on page changement
 * @doc/fr event/paginate/desc émis au changement de page
 */
</script>
