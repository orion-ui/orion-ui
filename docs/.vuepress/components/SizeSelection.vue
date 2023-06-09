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
		padding: var(--fluid-10px);
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
		background: var(--grey-light);
		border: 0.0625rem solid var(--grey-light);
		color: var(--grey-darker);
		cursor: pointer;
		text-transform: uppercase;
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0 var(--fluid-8px);

		&:hover {
			border-color: var(--info);
			color: var(--info);
			background: transparent;
		}

		&--selected, &--selected:hover {
			border-color: var(--info);
			background: var(--info);
			color: white;
		}
	}
}
</style>
