<template>
	<div
		v-if="setup.shouldBeInDom"
		v-show="setup.active"
		:ref="setup._el"
		class="orion-tab-pane">
		<slot/>
	</div>
</template>

<script lang="ts">
// Needed to manage slots in OrionTabsSetupService / calcPaneInstances
export default { name: 'OrionTabPane' };
</script>

<script setup lang="ts">
import './OrionTabPane.less';
import { inject } from 'vue';
import OrionTabPaneSetupService from './OrionTabPaneSetupService';
import type { OrionTabPaneProps, OrionTabPaneEmits } from './OrionTabPaneSetupService';
const _tabs = inject<OrionTabs>('_tabs');
const emits = defineEmits<OrionTabPaneEmits>() as OrionTabPaneEmits;
const props = withDefaults(defineProps<OrionTabPaneProps>(), OrionTabPaneSetupService.defaultProps);
const setup = new OrionTabPaneSetupService(props, emits, _tabs);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the pane
 * @doc/fr slot/default contenu de l'onglet
 */
</script>
