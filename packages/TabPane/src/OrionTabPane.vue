<template>
	<div
		v-if="setup.shouldBeInDom"
		v-show="setup.active"
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
const _tabs = inject<OrionTabs>('_tabs');
const props = defineProps(OrionTabPaneSetupService.props);
const setup = new OrionTabPaneSetupService(props, _tabs);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the pane
 * @doc/fr slot/default contenu de l'onglet
 */
</script>
