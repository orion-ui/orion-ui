<template>
	<div
		:ref="setup._el"
		class="orion-avatar"
		:style="setup.avatarStyle"
		:class="[
			`orion-avatar--${color}`,
			...setup.additionalClass,
		]">
		<span
			v-if="setup.showInitial"
			class="orion-avatar__initial">{{ setup.formatedName }}</span>
		<img
			v-else
			class="orion-avatar__image"
			:src="setup.avatarSrc"
			@error="setup.error = true">
		<div
			v-if="updateFunction"
			class="orion-avatar__picto">
			<orion-icon
				v-tooltip="setup.tooltip"
				icon="cloud_upload"
				ripple="info"
				@click="updateFunction?.()"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import './OrionAvatar.less';
import { OrionIcon } from 'packages/Icon';
import OrionAvatarSetupService from './OrionAvatarSetupService';
import type { OrionAvatarProps, OrionAvatarEmits } from './OrionAvatarSetupService';
const emits = defineEmits<OrionAvatarEmits>() as OrionAvatarEmits;
const props = withDefaults(defineProps<OrionAvatarProps>(), OrionAvatarSetupService.defaultProps);
const setup = new OrionAvatarSetupService(props, emits);
defineExpose(setup.publicInstance);
</script>
