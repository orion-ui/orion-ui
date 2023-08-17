<template>
	<o-page title="Textarea">
		<pre>Textarea</pre>
		<o-textarea
			v-model="value"
			label="My label trop cool"
			show-length
			suffix-icon="add_column"/>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref('Lorem ipsum');
</script>
