<template>
	<div
		class="orion-avatar-group">
		<template
			v-for="(vnode, i) in setup.visibleAvatars"
			:key="i">
			<component
				:is="vnode"
				:style="i !== 0 ? { 'margin-left': `-${spacing}px` } : {}"/>
		</template>

		<o-avatar
			v-if="setup.overflowCount > 0"
			:size="setup.avatars[0]?.props?.size ?? 'md'"
			:color
			:style="{ 'margin-left': `-${spacing}px` }"
			class="orion-avatar-group__counter"
			:name="`+ ${setup.overflowCount}`"/>
	</div>
</template>

<script setup lang="ts">
import './OrionAvatarGroup.less';
import OrionAvatarGroupSetupService from './OrionAvatarGroupSetupService';
import type { OrionAvatarGroupProps, OrionAvatarGroupEmits } from './OrionAvatarGroupSetupService';
const emits = defineEmits<OrionAvatarGroupEmits>() as OrionAvatarGroupEmits;
const slots = defineSlots();
const props = withDefaults(defineProps<OrionAvatarGroupProps>(), OrionAvatarGroupSetupService.defaultProps);
const setup = new OrionAvatarGroupSetupService(props, emits, slots);

defineExpose(setup.publicInstance);
</script>
