<template>
	<div :ref="setup._el" class="orion-paginate" :class="{ 'orion-paginate--detailed': props.variant === 'detailed' }">
		<template v-if="props.variant === 'detailed'">
			<div class="orion-paginate__detail">
				<div
					v-if="props.selectedCount !== undefined && props.selectedCount !== null"
					class="orion-paginate__detail-selection">
					<span class="orion-paginate__detail-text">
						{{ props.selectedCount }} / {{ props.total }} {{ props.selectionLabel }}
					</span>
				</div>
				<div class="orion-paginate__detail-actions">
					<div class="orion-paginate__detail-size">
						<span class="orion-paginate__detail-label">{{ props.perPageLabel }}</span>
						<orion-select v-model="sizeProxy" :options="setup.sizeOptions" :searchable="false" :clearable="false"
							size="xs" class="orion-paginate__size-select" />
					</div>
					<div class="orion-paginate__detail-page">
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
		</template>
		<template v-else>
			<orion-button outline prefix-icon="chevron_left" @click="setup.index -= 1" />

			<div class="orion-paginate__wrapper">
				<template v-for="(page, i) in setup.pagesArray" :key="i">
					<orion-button v-if="page !== '...' || (page === '...' && i === 1)" :class="[
						{ 'orion-paginate__index-active': setup.isActive(Number(page)) },
						{ 'orion-paginate__ellipsis': page === '...' },
					]" :color="setup.isActive(Number(page)) ? 'primary' : 'neutral'" :disabled="page === '...'" nude
						class="orion-paginate__index" @click="setup.index = Number(page)">
						{{ page }}
					</orion-button>
					<o-input v-else v-model="setup.pageInput" placeholder="..." type="number" :max-value="setup.pagesLength"
						:min-value="1" size="sm" class="orion-paginate__input" />
				</template>
			</div>

			<orion-button outline suffix-icon="chevron_right" @click="setup.index += 1" />
		</template>
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

