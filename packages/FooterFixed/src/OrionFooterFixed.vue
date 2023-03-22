<template>
	<footer
		class="orion-footer-fixed"
		:class="[{ 'orion-footer-fixed--visible': setup.props.visible },
			{ 'orion-footer-fixed--without-nav': !setup.withNavItems },
		]">
		<h4
			v-if="setup.props.title"
			class="orion-footer-fixed__title">
			{{ setup.props.title }}
		</h4>
		<div>
			<slot/>
		</div>
	</footer>
</template>

<script setup lang="ts">
import './OrionFooterFixed.less';
import OrionFooterFixedSetupService from './OrionFooterFixedSetupService';
const props = defineProps(OrionFooterFixedSetupService.props);
const setup = new OrionFooterFixedSetupService(props);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the footer
 * @doc/fr slot/default contenu du pied de page
 */
</script>
