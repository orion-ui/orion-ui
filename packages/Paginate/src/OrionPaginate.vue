<template>
	<div
		:ref="setup._el"
		class="orion-paginate"
		:class="{ 'orion-paginate--detailed': props.variant === 'detailed' }">
		<template v-if="props.variant === 'detailed'">
			<div
				v-if="props.showPerPage"
				class="orion-paginate__select-container">
				<span class="orion-paginate__detail-label">{{ props.perPageLabel }}</span>
				<orion-select
					:model-value="size"
					size="xs"
					class="orion-paginate__size-select"
					:options="setup.sizeOptions"
					@select="emits('update:size', $event);"/>
			</div>

			<div class="orion-paginate__paginate-container">
				<span
					v-if="props.showPageInfo"
					class="orion-paginate__detail-text">
					{{ props.pageLabel }} {{ setup.index }} {{ props.ofLabel }} {{ setup.pagesLength }}
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
						@click="setup.index -= 1"/>
					<orion-button
						outline
						class="orion-paginate__action"
						prefix-icon="chevron_right"
						:disabled="setup.index >= setup.pagesLength"
						@click="setup.index += 1"/>
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
				@click="setup.index -= 1"/>

			<div class="orion-paginate__wrapper">
				<template
					v-for="page in setup.pages"
					:key="page.key">
					<v-dropdown
						v-if="page.isEllipsis"
						theme="orion-paginate"
						placement="bottom"
						:triggers="['click']"
						:auto-hide="true">
						<orion-button
							outline
							prefix-icon="more_horiz"
							aria-label="Ellipsis"
							class="orion-paginate__index"/>
						<template #popper>
							<div class="orion-paginate__ellipsis-dropdown">
								<button
									v-for="hiddenPage in page.hiddenPages"
									:key="hiddenPage"
									v-close-popper
									type="button"
									class="orion-paginate__ellipsis-item"
									:class="{ 'orion-paginate__ellipsis-item--active': setup.isActive(hiddenPage) }"
									@click="setup.index = hiddenPage">
									{{ props.pageLabel }} {{ hiddenPage }}
								</button>
							</div>
						</template>
					</v-dropdown>
					<orion-button
						v-else
						:class="[
							{ 'orion-paginate__index-active': page.isActive },
						]"
						:color="page.isActive ? 'primary' : 'neutral'"
						focus
						outline
						class="orion-paginate__index"
						@click="setup.index = page.value">
						{{ page.label }}
					</orion-button>
				</template>
			</div>

			<orion-button
				outline
				class="orion-paginate__next"
				prefix-icon="chevron_right"
				:disabled="setup.index >= setup.pagesLength"
				@click="setup.index += 1"/>
		</template>
	</div>
</template>

<script setup lang="ts">
import { OrionButton } from 'packages/Button';
import { OrionSelect } from 'packages/Select';
import './OrionPaginate.less';
import { OrionPaginateSetup, type OrionPaginateEmits, type OrionPaginateProps } from './OrionPaginateSetup';
const emits = defineEmits<OrionPaginateEmits>() as OrionPaginateEmits;
const props = withDefaults(defineProps<OrionPaginateProps>(), OrionPaginateSetup.defaultProps);
const vModel = defineModel<number>({ required: true });
const setup = new OrionPaginateSetup(props, emits, vModel);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 */
</script>
