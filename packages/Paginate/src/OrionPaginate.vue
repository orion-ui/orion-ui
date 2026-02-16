<template>
	<div
		:ref="setup._el"
		class="orion-paginate"
		:class="{ 'orion-paginate--detailed': variant === 'detailed' }">
		<template v-if="variant === 'detailed'">
			<div
				v-if="showPageSizeSelect"
				class="orion-paginate__select-container">
				<span
					v-if="perPageItemLabel"
					class="orion-paginate__detail-label">{{ perPageItemLabel(setup.size) }}</span>
				<orion-select
					v-model="setup.size"
					size="xs"
					class="orion-paginate__size-select"
					:options="sizeOptions"/>
			</div>

			<div class="orion-paginate__paginate-container">
				<span
					v-if="showPageInfo"
					class="orion-paginate__detail-text">
					{{ pageLabel }} {{ setup.index }} / {{ setup.pagesLength }}
				</span>
				<div class="orion-paginate__detail-actions">
					<orion-button
						outline
						class="orion-paginate__action"
						prefix-icon="keyboard_double_arrow_left"
						:disabled="setup.index <= 1"
						@click="setup.index = 1"/>
					<orion-button
						outline
						class="orion-paginate__action"
						prefix-icon="chevron_left"
						:disabled="setup.index <= 1"
						@click="setup.index--"/>
					<v-dropdown
						theme="orion-paginate"
						placement="bottom"
						:triggers="['click']"
						:auto-hide="true">
						<orion-button
							outline
							prefix-icon="more_horiz"
							class="orion-paginate__index"/>
						<template #popper>
							<div
								v-if="setup.flatPages.length < 10"
								class="orion-paginate__ellipsis-dropdown">
								<span
									v-for="page in setup.flatPages"
									:key="page"
									v-close-popper
									class="orion-paginate__ellipsis-item"
									:class="{ 'orion-paginate__ellipsis-item--active': setup.isActive(page) }"
									@click="setup.index = page">
									{{ pageLabel }} {{ page }}
								</span>
							</div>
							<orion-input
								v-else
								v-model.number="setup.index"
								:max-value="setup.pagesLength"
								:min-value="1"
								:donetyping="500"
								type="number"
								autofocus
								size="xs"
								select-on-focus
								label="Page"
								class="orion-paginate__ellipsis-input"
								@keyup.enter.prevent="setup.hideAllPoppers()"/>
						</template>
					</v-dropdown>
					<orion-button
						outline
						class="orion-paginate__action"
						prefix-icon="chevron_right"
						:disabled="setup.index >= setup.pagesLength"
						@click="setup.index++"/>
					<orion-button
						outline
						class="orion-paginate__action"
						prefix-icon="keyboard_double_arrow_right"
						:disabled="setup.index >= setup.pagesLength"
						@click="setup.index = setup.pagesLength"/>
				</div>
			</div>
		</template>

		<template v-else>
			<orion-button
				outline
				class="orion-paginate__prev"
				prefix-icon="chevron_left"
				:disabled="setup.index <= 1"
				@click="setup.index--"/>

			<div class="orion-paginate__wrapper">
				<template
					v-for="(page, index) in setup.pages"
					:key="index">
					<v-dropdown
						v-if="Array.isArray(page)"
						theme="orion-paginate"
						placement="bottom"
						:triggers="['click']"
						:auto-hide="true">
						<orion-button
							outline
							prefix-icon="more_horiz"
							class="orion-paginate__index"/>
						<template #popper>
							<div
								v-if="page.length < 10"
								class="orion-paginate__ellipsis-dropdown">
								<span
									v-for="hiddenPage in page"
									:key="hiddenPage"
									v-close-popper
									class="orion-paginate__ellipsis-item"
									:class="{ 'orion-paginate__ellipsis-item--active': setup.isActive(hiddenPage) }"
									@click="setup.index = hiddenPage">
									{{ pageLabel }} {{ hiddenPage }}
								</span>
							</div>
							<orion-input
								v-else
								v-model.number="setup.index"
								:max-value="setup.pagesLength"
								:donetyping="500"
								type="number"
								autofocus
								select-on-focus
								label="Page"
								class="orion-paginate__ellipsis-input"
								@keyup.enter.prevent="setup.hideAllPoppers()"/>
						</template>
					</v-dropdown>
					<orion-button
						v-else
						:class="{ 'orion-paginate__index-active': setup.isActive(page) }"
						:color="setup.isActive(page) ? 'primary' : 'neutral'"
						focus
						outline
						class="orion-paginate__index"
						@click="setup.index = page">
						{{ page }}
					</orion-button>
				</template>
			</div>

			<orion-button
				outline
				class="orion-paginate__next"
				prefix-icon="chevron_right"
				:disabled="setup.index >= setup.pagesLength"
				@click="setup.index++"/>
		</template>
	</div>
</template>

<script setup lang="ts">
import { OrionButton } from 'packages/Button';
import { OrionInput } from 'packages/Input';
import { OrionSelect } from 'packages/Select';
import { inject } from 'vue';
import './OrionPaginate.less';
import { OrionPaginateSetup, type OrionPaginateEmits, type OrionPaginateProps } from './OrionPaginateSetup';
const _list = inject<OrionList>('_list');
const emits = defineEmits<OrionPaginateEmits>() as OrionPaginateEmits;
const props = withDefaults(defineProps<OrionPaginateProps>(), OrionPaginateSetup.defaultProps);
const vModelPage = defineModel<number>('page');
const vModelSize = defineModel<number>('size');
const setup = new OrionPaginateSetup(props, emits, vModelPage, vModelSize, _list);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/page Pagination active page
 * @doc/fr vModel/page Page active de la pagination
 * @doc vModel/size Number of items per page
 * @doc/fr vModel/size Nombre d'éléments par page
 */
</script>
