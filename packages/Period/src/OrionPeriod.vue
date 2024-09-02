<template>
	<div
		:ref="setup._el"
		class="orion-period"
		:class="[`orion-period--${color}`]">
		<div class="orion-period__dates">
			<slot/>
		</div>
		<!-- <div class="orion-period__progress">
			<progress
				value="75"
				min="0"
				max="100">
				75%
			</progress>
		</div> -->

		<div
			class="orion-period__extend orion-period__extend--left"/>
		<div
			class="orion-period__extend orion-period__extend--right"/>
	</div>
</template>

<script setup lang="ts">
import './OrionPeriod.less';
import OrionPeriodSetupService from './OrionPeriodSetupService';
const props = defineProps(OrionPeriodSetupService.props);
const setup = new OrionPeriodSetupService(props);
defineEmits<{(e: 'click'): void }>();
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the button
 * @doc/fr slot/default contenu du bouton
 *
 * @doc event/click/desc emitted on button click
 * @doc/fr event/click/desc émis lors du click sur le bouton
 */
</script>
