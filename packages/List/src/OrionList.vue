<template>
	<div class="orion-list">
		<orion-paginate
			v-if="setup.props.usePaginationTop && !!setup.page && !!setup.props.total"
			v-model="setup.page.index"
			:size="setup.page.size"
			:total="setup.props.total"
			:bind-router="bindRouter"
			@paginate="setup.handleOnPaginate()"/>

		<div
			v-if="setup.computedLayout === 'grid'"
			:class="gridClass">
			<div
				v-for="(item, index) in list"
				:key="item[trackKey]"
				:class="cellClass">
				<div class="orion-list__cell">
					<slot v-bind="{ item, index, selected: setup.listItemIsSelected(item) }"/>
				</div>
			</div>
		</div>

		<template v-else-if="setup.computedLayout === 'row'">
			<div
				v-for="(item, index) in list"
				:key="item[trackKey]"
				class="orion-list__row">
				<slot v-bind="{ item, index, selected: setup.listItemIsSelected(item) }"/>
			</div>
		</template>

		<orion-paginate
			v-if="usePaginationBottom && !!setup.page && !!setup.props.total"
			v-model="setup.page.index"
			:size="setup.page.size"
			:total="setup.props.total"
			:bind-router="bindRouter"
			@paginate="setup.handleOnPaginate()"/>

		<orion-footer-fixed
			class="orion-footer-selected"
			:visible="useFooterSelected && !!setup.selected.length">
			<div class="orion-footer-selected__qty">
				<span class="orion-footer-selected__qty-number">{{ setup.selected.length }}</span>
				<span class="orion-footer-selected__qty-text">
					{{ setup.computedItemType }}<br>
					{{ setup.computedItemAdjective }}
				</span>
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

<script setup lang="ts">
import './OrionList.less';
import { OrionFooterFixed } from 'packages/FooterFixed';
import { OrionPaginate } from 'packages/Paginate';
import OrionListSetupService from './OrionListSetupService';
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
	(e: 'update:page', payload: Orion.ListPage): void;
	(e: 'update:selected', payload: any[]): void;
	(e: 'clear-selection'): void;
	(e: 'paginate', payload: number): void;
}>();
const props = defineProps(OrionListSetupService.props);
const setup = new OrionListSetupService(props, emit);
defineExpose(setup.publicInstance);

/** Doc
 * @doc event/update:page/desc emitted to update the page of the list
 * @doc/fr event/update:page/desc émis pour mettre à jour l'élément `page` de la liste
 *
 * @doc event/update:selected/desc emitted to update the selected items
 * @doc/fr event/update:selected/desc émis pour mettre à jour les éléments sélectionés
 *
 * @doc event/clear-selection/desc emitted to clear the selected items
 * @doc/fr event/clear-selection/desc émis pour effacer la sélection des éléments
 *
 * @doc event/paginate/desc emitted to update the page index of the list
 * @doc/fr event/paginate/desc émis pour mettre à jour l'index de la liste
 *
 * @doc slot/default content of each item of the list
 * @doc/fr slot/default le contenu de chaque élément de la liste
 *
 * @doc slot/footer-selected-actions actions displayed in the selection footer
 * @doc/fr slot/footer-selected-actions actions affichées dans le footer de sélection
 */
</script>
