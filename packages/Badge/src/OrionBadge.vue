<template>
	<span
		:ref="setup._el"
		class="orion-badge"
		:class="[
			`orion-badge--${type}`,
			`orion-badge--${color}`,
		]"
		@click="emits('clicked', $event)">
		<slot v-if="type !== 'dot'"/>
	</span>
</template>

<script setup lang="ts">
import './OrionBadge.less';
import { OrionBadgeSetup, type OrionBadgeEmits, type OrionBadgeProps } from './OrionBadgeSetup';
const emits = defineEmits<OrionBadgeEmits>() as OrionBadgeEmits;
const props = withDefaults(defineProps<OrionBadgeProps>(), OrionBadgeSetup.defaultProps);
const setup = new OrionBadgeSetup(props, emits);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default badge label
 * @doc/fr slot/default label du badge
 */
</script>
