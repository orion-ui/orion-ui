<template>
	<div
		:ref="setup._el"
		class="orion-period"
		:class="[`orion-period--${color}`]">
		<div>
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
				class="orion-period__resize-handle orion-period__resize-handle--left"
				@mousedown.stop="setup.stretchBegin($event)"/>
			<div
				class="orion-period__resize-handle orion-period__resize-handle--right"
				@mousedown.stop="setup.stretchEnd($event)"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import './OrionPeriod.less';
import OrionPeriodSetupService from './OrionPeriodSetupService';
type PeriodEmits = {
	(e: 'update-begin', date: Date | undefined): void,
	(e: 'update-end', date: Date | undefined): void,
};
const props = defineProps(OrionPeriodSetupService.props);
const emit = defineEmits<PeriodEmits>();
const setup = new OrionPeriodSetupService(props, emit);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the button
 * @doc/fr slot/default contenu du bouton
 *
 * @doc event/click/desc emitted on button click
 * @doc/fr event/click/desc émis lors du click sur le bouton
 */
</script>
