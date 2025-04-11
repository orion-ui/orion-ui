<template>
	<span
		:ref="setup._el"
		class="orion-label"
		:class="[
			`orion-label--${color}`,
			`orion-label--${size}`,
			{ 'orion-label--outline' : outline },
		]">
		<div class="orion-label__content">
			<slot/>
		</div>
	</span>
</template>

<script setup lang="ts">
import './OrionLabel.less';
import OrionLabelSetupService from './OrionLabelSetupService';
import type { OrionLabelProps, OrionLabelEmits } from './OrionLabelSetupService';
const emits = defineEmits<OrionLabelEmits>() as OrionLabelEmits;
const props = withDefaults(defineProps<OrionLabelProps>(), OrionLabelSetupService.defaultProps);
const setup = new OrionLabelSetupService(props, emits);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the label
 * @doc/fr slot/default contenu du label
 */
</script>
