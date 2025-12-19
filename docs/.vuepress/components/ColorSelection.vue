<template>
	<div class="color-selection orion-input">
		<label class="orion-input__label orion-input__label--floating">
			{{ label }}
		</label>
		<div class="color-selection__input orion-input__input">
			<span
				v-for="(color, index) of [...colors, undefined]"
				v-tooltip="color ?? 'unset'"
				:key="index"
				:class="[
					`color-selection__tint background--${color}`,
					{ 'color-selection__tint--selected': modelValue === color },
				]"
				@click="emit('update:modelValue', color)"
			/>
			<span
				v-if="showGreys"
				v-for="(grey, index) of [...greys]"
				v-tooltip="grey"
				:key="index"
				:class="[
					`color-selection__tint background--${grey}`,
					{ 'color-selection__tint--selected': modelValue === grey },
				]"
				@click="emit('update:modelValue', grey)"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { colors, greys } from '@/lib';

defineProps({
	modelValue: {
		type: String as PropType<Orion.Color | Orion.Grey>,
		default: 'primary',
	},
	label: {
		type: String,
		default: 'Color',
	},
	showGreys: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits<{
	(e: 'update:modelValue', val?: Orion.Color | Orion.Grey): void;
}>();
</script>

<style lang="less" scoped>
.color-selection {
	min-height: 2.5rem;
	height: auto;

	&__input {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.25rem;
		min-height: 2.5rem;
		height: auto;
		padding: var(--space-8);
		width: fit-content;

		[class*='col-'] > .color-selection > & {
			width: auto;
		}
	}

	&__tint {
		transition: transform 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 1rem;
		aspect-ratio: 1;
		border-radius: 50%;
		border: 0.03125rem solid var(--border-neutral-default);
		cursor: pointer;

		&--selected {
			&::after {
				content: '';
				display: block;
				height: 0.5rem;
				aspect-ratio: auto 1;
				border-radius: 50%;
				background: var(--background-neutral-default);
				border: 0.0625rem solid var(--border-neutral-default);

				[data-orion-theme='dark'] & {
					background: var(--background-neutral-minimal);
				}
			}
		}

		&:hover {
			transform: scale3d(1.2, 1.2, 1);
		}
	}
}
</style>
