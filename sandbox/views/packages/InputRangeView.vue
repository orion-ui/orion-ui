<template>
	<o-page title="InputRange">
		<o-alert>
			<pre>fieldValue: {{ fieldValue }}</pre>
			<pre>fieldValueMultiple: {{ fieldValueMultiple }}</pre>
		</o-alert>
		<o-card style="width: 400px;">
			<o-input-range v-model="fieldValue"/>
			<hr>
			<o-input-range v-model="fieldValueMultiple"/>
		</o-card>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fieldValue = ref(10);
const fieldValueMultiple = ref([10, 20]);
</script>
