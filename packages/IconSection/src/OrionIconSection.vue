<template>
	<div
		:ref="setup._el"
		class="orion-icon-section"
		:class="{ 'orion-icon-section--center': setup.props.center }">
		<orion-icon
			v-if="setup.props.icon || setup.props.fontIcon"
			class="orion-icon-section__icon"
			v-bind="{ icon, fontIcon }"/>
		<div class="orion-icon-section__content">
			<h6
				v-if="setup.props.title"
				class="orion-icon-section__title">
				{{ setup.props.title }}
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
const props = defineProps(OrionIconSectionSetupService.props);
const setup = new OrionIconSectionSetupService(props);
defineExpose(setup.publicInstance);
/**
 * @doc slot/default the content of the description
 * @doc/fr slot/default contenu de la description
*/
</script>
