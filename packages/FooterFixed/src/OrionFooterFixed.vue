<template>
	<footer
		:ref="setup._el"
		class="orion-footer-fixed"
		:class="[{ 'orion-footer-fixed--visible': visible },
			{ 'orion-footer-fixed--without-nav': !setup.withNavItems },
		]">
		<h4
			v-if="title"
			class="orion-footer-fixed__title">
			{{ title }}
		</h4>
		<div>
			<slot/>
		</div>
	</footer>
</template>

<script setup lang="ts">
import './OrionFooterFixed.less';
import OrionFooterFixedSetupService from './OrionFooterFixedSetupService';
import type { OrionFooterFixedProps, OrionFooterFixedEmits } from './OrionFooterFixedSetupService';
const emits = defineEmits<OrionFooterFixedEmits>() as OrionFooterFixedEmits;
const props = withDefaults(defineProps<OrionFooterFixedProps>(), OrionFooterFixedSetupService.defaultProps);
const setup = new OrionFooterFixedSetupService(props, emits);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the footer
 * @doc/fr slot/default contenu du pied de page
 */
</script>
