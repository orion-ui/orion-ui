<template>
	<div
		:ref="setup._el"
		class="orion-paginate">
		<orion-button
			nude
			class="orion-paginate__prev"
			prefix-icon="chevron_left"
			@click="setup.index -= 1"/>

		<div
			class="orion-paginate__wrapper">
			<template
				v-for="(page, i) in setup.pagesArray"
				:key="i">
				<orion-button
					v-if="page !== '...' || (page === '...' && i === 1 )"
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
				<o-input
					v-else
					v-model="setup.pageInput"
					placeholder="..."
					type="number"
					:max-value="setup.pagesLength"
					:min-value="1"
					size="sm"
					class="orion-paginate__input"/>
			</template>
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
import type { OrionPaginateProps, OrionPaginateEmits } from './OrionPaginateSetupService';
const emits = defineEmits<OrionPaginateEmits>() as OrionPaginateEmits;
const props = withDefaults(defineProps<OrionPaginateProps>(), OrionPaginateSetupService.defaultProps);
const vModel = defineModel<number>({ required: true });
const setup = new OrionPaginateSetupService(props, emits, vModel);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 */
</script>
