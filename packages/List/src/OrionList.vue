<template>
	<div
		:ref="setup._el"
		class="orion-list">
		<orion-paginate
			v-if="usePaginationTop && !!setup.page && !!setup.size && !!total"
			:page="setup.page"
			:size="setup.size"
			:total
			:bind-router-page
			:bind-router-size
			:variant="paginationVariant"
			:size-options="paginationSizeOptions"
			@paginate="setup.handleOnPaginate($event)"/>

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
			v-if="usePaginationBottom && !!setup.page && !!setup.size && !!total"
			:page="setup.page"
			:size="setup.size"
			:total
			:bind-router-page
			:bind-router-size
			:variant="paginationVariant"
			:size-options="paginationSizeOptions"
			@paginate="setup.handleOnPaginate($event)"/>

		<orion-footer-fixed
			class="orion-footer-selected"
			:visible="useFooterSelected && !!vModelSelected.length">
			<div class="orion-footer-selected__qty">
				<span class="orion-footer-selected__qty-number">{{ vModelSelected.length }}</span>
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
import { OrionFooterFixed } from 'packages/FooterFixed';
import { OrionPaginate } from 'packages/Paginate';
import { provide } from 'vue';
import './OrionList.less';
import { OrionListSetup, type OrionListEmits, type OrionListProps } from './OrionListSetup';
const vModelPage = defineModel<number>('page', { default: 1 });
const vModelSize = defineModel<number>('size', { default: 20 });
const vModelSelected = defineModel<T[]>('selected', { default: (): T[] => [] });
const emits = defineEmits<OrionListEmits>() as OrionListEmits;
const props = withDefaults(defineProps<OrionListProps<T>>(), OrionListSetup.defaultProps);
const setup = new OrionListSetup(props, emits, vModelPage, vModelSize, vModelSelected);
defineExpose(setup.publicInstance);
provide('_list', setup.publicInstance);

/** Doc
 * @doc vModel/page Pagination active page
 * @doc/fr vModel/page Page active de la pagination
 * @doc vModel/size Number of items per page
 * @doc/fr vModel/size Nombre d'éléments par page
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
