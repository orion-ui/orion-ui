<template>
	<div
		v-if="setup.shouldBeInDom"
		v-show="setup.active"
		:ref="setup._el"
		class="orion-timeline-pane">
		<slot/>
	</div>
</template>

<script lang="ts">
// Needed to manage slots in OrionTimelineSetup / calcPaneInstances
// eslint-disable-next-line no-restricted-exports
export default { name: 'OrionTimelinePane' };
</script>

<script setup lang="ts">
import { inject } from 'vue';
import './OrionTimelinePane.less';
import { OrionTimelinePaneSetup, type OrionTimelinePaneEmits, type OrionTimelinePaneProps } from './OrionTimelinePaneSetup';
const _timeline = inject<OrionTimeline>('_timeline');
const emits = defineEmits<OrionTimelinePaneEmits>() as OrionTimelinePaneEmits;
const props = withDefaults(defineProps<OrionTimelinePaneProps>(), OrionTimelinePaneSetup.defaultProps);
const setup = new OrionTimelinePaneSetup(props, emits, _timeline);
defineExpose(setup.publicInstance);

/** Doc
* @doc slot/default the content of the timeline pane
* @doc/fr slot/default contenu du panneau
*/
</script>
