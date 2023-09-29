<template>
	<div
		:ref="setup._el"
		class="orion-avatar"
		:style="setup.avatarStyle"
		:class="[
			`orion-avatar--${setup.props.color}`,
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
				@click="setup.props.updateFunction?.()"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import './OrionAvatar.less';
import { OrionIcon } from 'packages/Icon';
import OrionAvatarSetupService from './OrionAvatarSetupService';
const props = defineProps(OrionAvatarSetupService.props);
const setup = new OrionAvatarSetupService(props);
defineExpose(setup.publicInstance);
</script>
