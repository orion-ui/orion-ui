<template>
	<button
		:ref="setup._el"
		class="orion-button"
		:class="[
			`orion-button--${color}`,
			`orion-button--${size}`,
			{ 'orion-button--prefix-icon': prefixIcon },
			{ 'orion-button--suffix-icon': suffixIcon },
			{ 'orion-button--icon-only': !$slots.default },
			{ 'orion-button--outline': outline },
			{ 'orion-button--disabled': disabled || loading },
			{ 'orion-button--loading': loading },
			{ 'orion-button--nude': nude },
			{ 'orion-button--block': block },
		]"
		:tabindex="disabled || loading ? undefined : setup.uid"
		:disabled="disabled || loading"
		:autofocus="autofocus"
		@click.left="setup.visualClick($event)"
		@click="emits('click', $event)">
		<orion-icon
			v-if="prefixIcon || prefixFontIcon || loading"
			class="orion-button__icon orion-button__icon--prefix"
			:icon="prefixIcon"
			:font-icon="prefixFontIcon"
			:loading="loading"
			@click.prevent.stop="setup._el.value?.click()"/>

		<span
			v-if="$slots.default"
			class="orion-button__text">
			<slot/>
		</span>

		<orion-icon
			v-if="suffixIcon || suffixFontIcon"
			class="orion-button__icon orion-button__icon--suffix"
			:icon="suffixIcon"
			:font-icon="suffixFontIcon"
			@click.prevent.stop="setup._el.value?.click()"/>
	</button>
</template>

<script setup lang="ts">
import './OrionButton.less';
import { OrionIcon } from 'packages/Icon';
import OrionButtonSetupService from './OrionButtonSetupService';
import type { OrionButtonProps, OrionButtonEmits } from './OrionButtonSetupService';
const emits = defineEmits<OrionButtonEmits>() as OrionButtonEmits;
const props = withDefaults(defineProps<OrionButtonProps>(), OrionButtonSetupService.defaultProps);
const setup = new OrionButtonSetupService(props, emits);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the button
 * @doc/fr slot/default contenu du bouton
 */
</script>
