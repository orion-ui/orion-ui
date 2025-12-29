<template>
	<div
		class="size-selection orion-input"
		role="group"
		:aria-labelledby="labelId"
		:class="{ 'orion-input--focused': isFocus }">
		<span
			:id="labelId"
			:class="[
				'orion-input__label',
				{ 'orion-input__label--floating': labelIsFloating },
			]">
			{{ label }}
		</span>
		<div
			ref="inputEl"
			class="size-selection__input orion-input__input"
			tabindex="0"
			@focus="handleFocus"
			@blur="handleBlur"
			@mousedown="focusInput">
			<span
				v-for="(size, index) of sizeOptions"
				:key="index"
				:class="[
					`size-selection__size`,
					{ 'size-selection__size--selected': modelValue === size },
				]"
				@click="emit('update:modelValue', size)"
			>
				{{ size }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
import { getUid } from 'lib';
import { sizes } from '@/lib';

const props = defineProps({
	modelValue: {
		type: String as PropType<Orion.Size>,
		default: 'default',
	},
	label: {
		type: String,
		default: 'Size',
	},
	options: {
		type: Array as PropType<Nil<Orion.Size[]>>,
		default: undefined,
	},
});

const emit = defineEmits<{ (e: 'update:modelValue', val: Orion.Size): void }>();

const sizeOptions = props.options ?? sizes;
const inputEl = ref<HTMLElement | null>(null);
const isFocus = ref(false);
const labelId = `size-selection-label-${getUid()}`;
const hasValue = computed(() => props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== '');
const labelIsFloating = computed(() => isFocus.value || hasValue.value);

function handleFocus () {
	isFocus.value = true;
}

function handleBlur () {
	isFocus.value = false;
}

function focusInput () {
	inputEl.value?.focus();
}
</script>

<style lang="less" scoped>
.size-selection {
	min-height: 2.5rem;
	height: auto;

	.orion-input__label {
		top: var(--o-space-8);
	}

	&__input {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.25rem;
		min-height: 2.5rem;
		height: auto;
		padding: var(--o-space-8);
		width: fit-content;

		[class*='col-'] > .size-selection > & {
			width: auto;
		}
	}

	&__size {
		transition:
			background 0.3s,
			border-color 0.3s,
			color 0.3s;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 1.125rem;
		border-radius: 0.5rem;
		background: var(--o-background-neutral-moderate);
		border: 0.0625rem solid var(--o-border-neutral-default);
		color: var(--o-text-default-default);
		cursor: pointer;
		text-transform: uppercase;
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0 var(--o-space-8);

		&:hover {
			border-color: var(--o-border-info-default);
			color: var(--o-text-info-default);
			background: transparent;
		}

		&--selected,
		&--selected:hover {
			border-color: var(--o-border-info-default);
			background: var(--o-background-info-default);
			color: var(--o-text-default-inverted);
		}
	}
}
</style>
