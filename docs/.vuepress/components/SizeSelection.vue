<template>
	<div class="size-selection orion-input">
		<label class="orion-input__label orion-input__label--floating">
			{{ label }}
		</label>
		<div class="size-selection__input orion-input__input">
			<span
				v-for="(size, index) of sizeOptions"
				:key="index"
				:class="[
					`size-selection__size`,
					{ 'size-selection__size--selected': modelValue === size }
				]"
				@click="emit('update:modelValue', size)">
				{{ size }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { sizes } from '@/lib';

const props = defineProps({
	modelValue: {
		type: String as PropType<Orion.Size>,
		default: 'default'
	},
	label: {
		type: String,
		default: 'Size',
	},
	options: {
		type: Array as PropType<Nil<Orion.Size[]>>,
		default: undefined,
	},
})

const sizeOptions = props.options ?? sizes;

const emit = defineEmits<{(e: 'update:modelValue', val: Orion.Size): void}>();
</script>

<style lang="less" scoped>
.size-selection {
	min-height: 2.5rem;
	height: auto;
	
	&__input {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.25rem;
		min-height: 2.5rem;
		height: auto;
		padding: var(--space-xs);
		width: fit-content;

		[class*="col-"] > .size-selection > & {
			width: auto;
		}
	}

	&__size {
		transition: background 0.3s, border-color 0.3s, color 0.3s;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 1.125rem;
		border-radius: 0.5rem;
		background: var(--background-neutral-moderate);
		border: 0.0625rem solid var(--border-neutral-default);
		color: var(--text-default-default);
		cursor: pointer;
		text-transform: uppercase;
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0 var(--space-xs);

		&:hover {
			border-color: var(--border-primary-default);
			color: var(--text-primary-default);
			background: transparent;
		}

		&--selected, &--selected:hover {
			border-color: var(--border-primary-default);
			background: var(--background-primary-default);
			color: var(--text-default-inverted);
		}
	}
}
</style>
