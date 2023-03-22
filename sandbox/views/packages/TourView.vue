<template>
	<o-page title="Tour">
		<o-section>
			<o-button
				id="target1"
				color="info"
				@click="startTour">
				Start Tour !
			</o-button>
		</o-section>

		<o-section>
			<sections-generator :qty="4"/>
		</o-section>

		<o-section>
			<o-alert id="targetAlert">
				scroll to target
			</o-alert>
		</o-section>
	</o-page>
</template>

<script setup lang="ts">
import { useTour } from 'lib';
import SectionsGenerator from 'sandbox/SectionsGenerator.vue';

function startTour () {
	useTour('tour').start();
}

</script>
