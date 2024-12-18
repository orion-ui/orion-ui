<template>
	<span
		:ref="setup._el"
		class="orion-label"
		:class="[
			`orion-label--${setup.props.color}`,
			`orion-label--${setup.props.size}`,
			{ 'orion-label--outline' : setup.props.outline },
		]">
		<div class="orion-label__content">
			<slot/>
		</div>
	</span>
</template>

<script setup lang="ts">
import './OrionLabel.less';
import OrionLabelSetupService from './OrionLabelSetupService';
const props = defineProps(OrionLabelSetupService.props);
const setup = new OrionLabelSetupService(props);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the label
 * @doc/fr slot/default contenu du label
 */
</script>
