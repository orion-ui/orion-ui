<template>
	<o-page title="Radio">
		<o-alert>
			<pre>fieldValue: {{ fieldValue }}</pre>
		</o-alert>
		<o-radio
			v-model="fieldValue"
			label="toto1"
			icon-check="airplay"
			input-value="toto1"/>
		<o-radio
			v-model="fieldValue"
			label="toto2"
			input-value="toto2"/>
		<o-radio
			v-model="fieldValue"
			label="toto3"
			input-value="toto3"/>
		<o-radio
			v-model="fieldValue"
			label="toto4"
			input-value="toto4"/>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fieldValue = ref('toto2');
</script>
