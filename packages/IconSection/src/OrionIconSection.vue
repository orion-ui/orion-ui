<template>
	<div
		:ref="setup._el"
		class="orion-icon-section"
		:class="{ 'orion-icon-section--center': center }">
		<orion-icon
			v-if="icon || fontIcon"
			class="orion-icon-section__icon"
			v-bind="{ icon, fontIcon }"/>
		<div class="orion-icon-section__content">
			<h6
				v-if="title"
				class="orion-icon-section__title">
				{{ title }}
			</h6>

			<div
				v-if="$slots.default"
				class="orion-icon-section__description">
				<slot/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import './OrionIconSection.less';
import { OrionIcon } from 'packages/Icon';
import OrionIconSectionSetupService from './OrionIconSectionSetupService';
import type { OrionIconSectionProps, OrionIconSectionEmits } from './OrionIconSectionSetupService';
const emits = defineEmits<OrionIconSectionEmits>() as OrionIconSectionEmits;
const props = withDefaults(defineProps<OrionIconSectionProps>(), OrionIconSectionSetupService.defaultProps);
const setup = new OrionIconSectionSetupService(props, emits);
defineExpose(setup.publicInstance);
/**
 * @doc slot/default the content of the description
 * @doc/fr slot/default contenu de la description
*/
</script>
