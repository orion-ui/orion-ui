<template>
	<div :ref="setup._el" class="orion-paginate orion-paginate--detailed">
		<div
			class="orion-paginate__detail"
			:class="{ 'orion-paginate__detail--center-actions': onlyActionsVisible }">
			<div
				class="orion-paginate__detail-selection"
				:class="{
					'orion-paginate__detail-selection--hidden': !showSelection && !onlyActionsVisible,
					'orion-paginate__detail-selection--collapsed': !showSelection && onlyActionsVisible,
				}">
				<span class="orion-paginate__detail-text">
					{{ selectedCountValue }} / {{ props.total }} {{ props.selectionLabel }}
				</span>
			</div>
			<div class="orion-paginate__detail-actions">
				<div
					v-if="showPerPage"
					class="orion-paginate__detail-size">
					<span class="orion-paginate__detail-label">{{ props.perPageLabel }}</span>
					<orion-select v-model="sizeProxy" :options="setup.sizeOptions" :searchable="false" :clearable="false"
						size="xs" class="orion-paginate__size-select" />
				</div>
				<div
					v-if="showPageInfo"
					class="orion-paginate__detail-page">
					<span class="orion-paginate__detail-text">
						{{ props.pageLabel }} {{ setup.index }} {{ props.ofLabel }} {{ setup.pagesLength }}
					</span>
				</div>
				<div class="orion-paginate__detail-actions">
					<orion-button outline prefix-icon="keyboard_double_arrow_left"
						:disabled="setup.index <= 1 || setup.pagesLength <= 1" @click="setup.index = 1" />
					<orion-button outline prefix-icon="chevron_left" :disabled="setup.index <= 1 || setup.pagesLength <= 1"
						@click="setup.index -= 1" />
					<orion-button outline prefix-icon="chevron_right" :disabled="setup.index >= setup.pagesLength"
						@click="setup.index += 1" />
					<orion-button outline prefix-icon="keyboard_double_arrow_right" :disabled="setup.index >= setup.pagesLength"
						@click="setup.index = setup.pagesLength" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import './OrionPaginate.less';
import { computed } from 'vue';
import { OrionButton } from 'packages/Button';
import { OrionSelect } from 'packages/Select';
import OrionPaginateSetupService from './OrionPaginateSetupService';
import type { OrionPaginateProps, OrionPaginateEmits } from './OrionPaginateSetupService';
const emits = defineEmits<OrionPaginateEmits>() as OrionPaginateEmits;
const props = withDefaults(defineProps<OrionPaginateProps>(), OrionPaginateSetupService.defaultProps);
const vModel = defineModel<number>({ required: true });
const setup = new OrionPaginateSetupService(props, emits, vModel);
defineExpose(setup.publicInstance);

const showSelection = computed(() => props.selectedCount !== undefined && props.selectedCount !== null);
const showPerPage = computed(() => props.showPerPage !== false);
const showPageInfo = computed(() => props.showPageInfo !== false);
const onlyActionsVisible = computed(() => !showSelection.value && !showPerPage.value && !showPageInfo.value);
const selectedCountValue = computed(() => props.selectedCount ?? 0);

const sizeProxy = computed<number>({
	get: () => props.size,
	set: (val) => {
		const sizeValue = Number(val);
		if (!sizeValue || isNaN(sizeValue)) return;
		emits('update:size', sizeValue);
		const pagesLength = Math.ceil(props.total / sizeValue);
		if (pagesLength > 0 && setup.index > pagesLength) {
			setup.index = pagesLength;
		}
	},
});

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 */
</script>
