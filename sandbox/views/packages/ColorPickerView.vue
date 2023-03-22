<template>
	<o-page title="ColorPicker">
		<o-color-picker
			v-model="color"
			hide-rgba/>

		<pre>color: {{ color }}</pre>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const color = ref<string>('#B12CB5');
</script>
