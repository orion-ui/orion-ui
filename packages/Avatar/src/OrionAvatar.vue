<template>
	<div
		:ref="setup._el"
		class="orion-avatar"
		:class="[`orion-avatar--${color}`, ...setup.additionalClass]">
		<div
			class="orion-avatar__pill"
			:style="setup.avatarStyle">
			<span
				v-if="setup.showInitial"
				class="orion-avatar__initial">{{
					setup.formatedName
				}}</span>
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
					button="primary"
					@click="updateFunction?.()"/>
			</div>
		</div>

		<div
			v-if="displayText && (name || description)"
			class="orion-avatar__text">
			<span
				v-if="name"
				class="orion-avatar__text-name">{{ name }}</span>
			<span
				v-if="description"
				class="orion-avatar__text-description">{{
					description
				}}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { OrionIcon } from 'packages/Icon';
import './OrionAvatar.less';
import { OrionAvatarSetup, type OrionAvatarEmits, type OrionAvatarProps } from './OrionAvatarSetup';
const emits = defineEmits<OrionAvatarEmits>() as OrionAvatarEmits;
const props = withDefaults(defineProps<OrionAvatarProps>(), OrionAvatarSetup.defaultProps);
const setup = new OrionAvatarSetup(props, emits);
defineExpose(setup.publicInstance);
</script>
