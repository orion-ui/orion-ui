<template>
	<!-- <the-julie-tour ref="_tour"/> -->
	<o-button
		id="tour1"
		color="info"
		@click="startTour">
		Let's start a tour !
	</o-button>
</template>


<script setup lang="ts">
import { useTour } from 'lib';
// import TheJulieTour from '../../../sandbox/views/sandbox-julie/Tour.vue';
import { ref } from 'vue';

const _tour = ref<RefDom<OrionTour>>();

function startTour () {
	useTour('_tour').start();
}
</script>

### Playground
