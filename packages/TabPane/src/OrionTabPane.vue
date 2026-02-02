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
// Needed to manage slots in OrionTabsSetup / calcPaneInstances
// eslint-disable-next-line no-restricted-exports
export default { name: 'OrionTabPane' };
</script>

<script setup lang="ts">
import { inject } from 'vue';
import './OrionTabPane.less';
import { OrionTabPaneSetup, type OrionTabPaneEmits, type OrionTabPaneProps } from './OrionTabPaneSetup';
const _tabs = inject<OrionTabs>('_tabs');
const emits = defineEmits<OrionTabPaneEmits>() as OrionTabPaneEmits;
const props = withDefaults(defineProps<OrionTabPaneProps>(), OrionTabPaneSetup.defaultProps);
const setup = new OrionTabPaneSetup(props, emits, _tabs);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the pane
 * @doc/fr slot/default contenu de l'onglet
 */
</script>
