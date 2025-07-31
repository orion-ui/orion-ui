<template>
	<div
		:ref="setup._el"
		class="orion-list">
		<orion-paginate
			v-if="usePaginationTop && !!page && !!total"
			v-model="page.index"
			:size="page.size"
			:total="total"
			:bind-router="bindRouter"
			@paginate="setup.handleOnPaginate()"/>

		<div
			v-if="setup.computedLayout === 'grid'"
			:class="gridClass">
			<div
				v-for="(item, index) in setup.listToDisplay"
				:key="item[trackKey]"
				:class="cellClass">
				<div class="orion-list__cell">
					<slot v-bind="{ item, index, selected: setup.listItemIsSelected(item) }"/>
				</div>
			</div>
		</div>

		<template v-else-if="setup.computedLayout === 'row'">
			<div
				v-for="(item, index) in setup.listToDisplay"
				:key="item[trackKey]"
				class="orion-list__row">
				<slot v-bind="{ item, index, selected: setup.listItemIsSelected(item) }"/>
			</div>
		</template>

		<orion-paginate
			v-if="usePaginationBottom && !!page && !!total"
			v-model="page.index"
			:size="page.size"
			:total="total"
			:bind-router="bindRouter"
			@paginate="setup.handleOnPaginate()"/>

		<orion-footer-fixed
			class="orion-footer-selected"
			:visible="useFooterSelected && !!selected.length">
			<div class="orion-footer-selected__qty">
				<span class="orion-footer-selected__qty-number">{{ selected.length }}</span>
				<div class="orion-footer-selected__qty-text">
					<span>{{ setup.computedItemType }}</span>
					<span>{{ setup.computedItemAdjective }}</span>
				</div>
			</div>
			<div class="orion-footer-selected__actions">
				<slot name="footer-selected-actions"/>
			</div>
			<span
				class="orion-footer-selected__close"
				@click="setup.clearSelection()"/>
		</orion-footer-fixed>
	</div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import './OrionList.less';
import { OrionFooterFixed } from 'packages/FooterFixed';
import { OrionPaginate } from 'packages/Paginate';
import OrionListSetupService from './OrionListSetupService';
import type { OrionListProps, OrionListEmits } from './OrionListSetupService';

const emits = defineEmits<OrionListEmits>() as OrionListEmits;
const page = defineModel<Orion.ListPage>('page', {
	default: {
		size: 20,
		index: 1,
	},
});

const selected = defineModel<T[]>('selected', { default: (): T[] => [] });
const props = withDefaults(defineProps<OrionListProps<T>>(), OrionListSetupService.defaultProps);
const setup = new OrionListSetupService(props, emits, page, selected);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/page configuration of the list's pagination (size: number of items per page, index: current page)
 * @doc/fr vModel/page configuration de la pagination de la liste (size: nombre d'éléments par page, index: page actuelle)
 * @doc vModel/selected array of the selected items
 * @doc/fr vModel/selected tableau contenant les élements sélectionnés
 *
 * @doc slot/default content of each item of the list
 * @doc/fr slot/default le contenu de chaque élément de la liste
 *
 * @doc slot/footer-selected-actions actions displayed in the selection footer
 * @doc/fr slot/footer-selected-actions actions affichées dans le footer de sélection
 */
</script>
