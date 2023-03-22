<template>
	<jsx-timeline/>
</template>

<script setup lang="tsx">
import './OrionTour.less';
import { provide, useSlots } from 'vue';
import OrionTourSetupService from './OrionTourSetupService';

const slots = useSlots();
const props = defineProps(OrionTourSetupService.props);
const setup = new OrionTourSetupService(props, slots);
provide('_tour', setup.publicInstance);
defineExpose(setup.publicInstance);

const jsxTimeline = () => {

	if (Number.isFinite(setup.currentIndex) && setup.currentIndex !== -1 && slots.default) {
		const test = slots.default().filter(x => !!x.props);

		const tourSteps = (
			<div class="orion-tour__steps" >
				{ test.length ? test[setup.currentIndex] : null }
			</div>
		);

		return (
			<div class="orion-tour">
				<orion-overlay ref="overlay" class="orion-tour-overlay"/>
				{tourSteps}
			</div>
		);
	} else {
		return <div class="orion-tour"/>;
	}
	// #endregion
};

</script>
