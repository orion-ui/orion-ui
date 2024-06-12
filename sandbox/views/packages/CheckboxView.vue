<template>
	<o-page title="Checkbox">
		<o-alert>
			<pre>fieldBoolean: {{ fieldBoolean }}</pre>
		</o-alert>
		<o-checkbox
			v-model="fieldBoolean"
			label="boolean"
			disabled/>

		<hr>

		<o-alert>
			<pre>fieldMultiple: {{ fieldMultiple }}</pre>
		</o-alert>
		<o-checkbox
			v-model="fieldMultiple"
			multiple
			label="toto1"
			input-value="toto1"/>
		<o-checkbox
			v-model="fieldMultiple"
			multiple
			label="toto2"
			input-value="toto2"/>
		<o-checkbox
			v-model="fieldMultiple"
			multiple
			label="toto3"
			input-value="toto3"/>
		<o-checkbox
			v-model="fieldMultiple"
			multiple
			label="toto4"
			input-value="toto4"/>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fieldBoolean = ref(false);
const fieldMultiple = ref(['toto2']);
</script>
