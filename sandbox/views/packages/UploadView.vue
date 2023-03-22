<template>
	<o-page title="Upload">
		<o-upload
			v-model="value"
			:file-max-size="2"
			:file-types="['application/pdf']"
			multiple/>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref<File[]>([]);
</script>
