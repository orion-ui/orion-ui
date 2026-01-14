<template>
	<span
		:ref="setup._el"
		class="orion-badge"
		:class="[
			`orion-badge--${type}`,
			`orion-badge--${color}`,
		]">
		<slot v-if="type !== 'dot'"/>
	</span>
</template>

<script setup lang="ts">
import './OrionBadge.less';
import OrionBadgeSetupService from './OrionBadgeSetupService';
import type { OrionBadgeProps, OrionBadgeEmits } from './OrionBadgeSetupService';
const emits = defineEmits<OrionBadgeEmits>() as OrionBadgeEmits;
const props = withDefaults(defineProps<OrionBadgeProps>(), OrionBadgeSetupService.defaultProps);
const setup = new OrionBadgeSetupService(props, emits);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default badge label
 * @doc/fr slot/default label du badge
 */
</script>
