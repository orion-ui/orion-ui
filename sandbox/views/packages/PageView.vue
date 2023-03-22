<template>
	<o-page
		title="Page"
		subtitle="Lorem dolor amet">
		<template #actions>
			<o-button
				color="info"
				prefix-icon="Sketch">
				hehhhoooo
			</o-button>
		</template>

		<hr>

		<h1>Lorem dolor amet</h1>
		<h2>Lorem dolor amet</h2>
		<h3>Lorem dolor amet</h3>
		<h4>Lorem dolor amet</h4>
		<h5>Lorem dolor amet</h5>
		<h6>Lorem dolor amet</h6>

		<hr>

		<sections-generator :qty="3"/>
	</o-page>
</template>

<script setup lang="ts">
// Page
import SectionsGenerator from 'sandbox/SectionsGenerator.vue';
</script>
