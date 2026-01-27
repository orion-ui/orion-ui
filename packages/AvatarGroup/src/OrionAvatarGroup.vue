<template>
	<div class="orion-avatar-group">
		<template
			v-for="(vnode, i) in setup.visibleAvatars"
			:key="i">
			<component
				:is="vnode"
				:style="i !== 0 ? { 'margin-left': `-${spacing}px` } : {}"/>
		</template>

		<orion-avatar
			v-if="setup.overflowCount > 0"
			:size="setup.avatars[0]?.props?.size ?? 'md'"
			:color
			:style="{ 'margin-left': `-${spacing}px` }"
			class="orion-avatar-group__counter"
			:name="`+ ${setup.overflowCount}`"/>
	</div>
</template>

<script setup lang="ts">
import { OrionAvatar } from 'packages/Avatar';
import './OrionAvatarGroup.less';
import { OrionAvatarGroupSetup, type OrionAvatarGroupEmits, type OrionAvatarGroupProps } from './OrionAvatarGroupSetup';
const emits = defineEmits<OrionAvatarGroupEmits>() as OrionAvatarGroupEmits;
const slots = defineSlots();
const props = withDefaults(defineProps<OrionAvatarGroupProps>(), OrionAvatarGroupSetup.defaultProps);
const setup = new OrionAvatarGroupSetup(props, emits, slots);

defineExpose(setup.publicInstance);
</script>
