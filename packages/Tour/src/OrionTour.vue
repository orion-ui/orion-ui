<template>
	<jsx-timeline/>
</template>

<script setup lang="tsx">
import './OrionTour.less';
import { provide } from 'vue';
import OrionTourSetupService from './OrionTourSetupService';

const slots = defineSlots();
const emits = defineEmits<OrionTourEmits>() as OrionTourEmits;
import type { OrionTourProps, OrionTourEmits } from './OrionTourSetupService';
const props = withDefaults(defineProps<OrionTourProps>(), OrionTourSetupService.defaultProps);
const setup = new OrionTourSetupService(props, emits, slots);
provide('_tour', setup.publicInstance);
defineExpose(setup.publicInstance);

const jsxTimeline = () => {

	if (Number.isFinite(setup.currentIndex) && setup.currentIndex !== -1 && slots.default) {
		const test = slots.default().filter((x: any) => !!x.props);

		const tourSteps = (
			<div class="orion-tour__steps" key={setup.getUid()}>
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
