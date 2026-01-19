<template>
	<button
		:ref="setup._el"
		class="orion-toggle-button"
		:class="[
			`orion-toggle-button--${color}`,
			`orion-toggle-button--${size}`,
			{ 'orion-toggle-button--active': vModel },
			{ 'orion-toggle-button--prefix-icon': prefixIcon },
			{ 'orion-toggle-button--suffix-icon': suffixIcon },
			{ 'orion-toggle-button--icon-only': !$slots.default },
			{ 'orion-toggle-button--disabled': disabled || loading },
			{ 'orion-toggle-button--loading': loading },
			{ 'orion-toggle-button--nude': nude },
		]"
		@click="setup.handleClick($event)">
		<orion-icon
			v-if="prefixIcon || prefixFontIcon"
			class="orion-toggle-button__icon orion-toggle-button__icon--prefix"
			:icon="prefixIcon"
			:font-icon="prefixFontIcon"
			:loading="loading"
			@click.prevent.stop="setup._el.value?.click()"/>

		<span
			v-if="$slots.default"
			class="orion-toggle-button__text">
			<slot/>
		</span>

		<orion-icon
			v-if="suffixIcon || suffixFontIcon"
			class="orion-toggle-button__icon orion-toggle-button__icon--suffix"
			:icon="suffixIcon"
			:font-icon="suffixFontIcon"
			:loading="loading"
			@click.prevent.stop="setup._el.value?.click()"/>
	</button>
</template>

<script setup lang="ts">
import './OrionToggleButton.less';
import { OrionIcon } from 'packages/Icon';
import OrionToggleButtonSetupService from './OrionToggleButtonSetupService';
import type { OrionToggleButtonProps, OrionToggleButtonEmits } from './OrionToggleButtonSetupService';
const emits = defineEmits<OrionToggleButtonEmits>() as OrionToggleButtonEmits;
const props = withDefaults(defineProps<OrionToggleButtonProps>(), OrionToggleButtonSetupService.defaultProps);
const vModel = defineModel<boolean>({ default: false });
const setup = new OrionToggleButtonSetupService(props, emits, vModel);
defineExpose(setup.publicInstance);
</script>
