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
// Needed to manage slots in OrionTimelineSetupService / calcPaneInstances
export default { name: 'OrionTimelinePane' };
</script>

<script setup lang="ts">
import './OrionTimelinePane.less';
import { inject } from 'vue';
import OrionTimelinePaneSetupService from './OrionTimelinePaneSetupService';
const _timeline = inject<OrionTimeline>('_timeline');
const props = defineProps(OrionTimelinePaneSetupService.props);
const setup = new OrionTimelinePaneSetupService(props, _timeline);
defineExpose(setup.publicInstance);

/** Doc
* @doc slot/default the content of the timeline pane
* @doc/fr slot/default contenu du panneau
*/
</script>
