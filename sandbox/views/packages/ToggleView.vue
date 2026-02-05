<template>
	<o-page title="Toggle">
		<o-alert>
			<pre>fieldValue: {{ fieldValue }}</pre>
		</o-alert>
		<div class="flex-inline">
			<o-toggle
				v-for="(color, index) in colors"
				:key="index"
				v-model="fieldValue"
				:color="color"
				label="toto1"
				size="lg"/>
		</div>
		<div style="width: 20rem;">
			<o-toggle
				v-model="fieldValue"
				label="fqsmljqsdf oiazjfe ozaeijf zamleifj mldsqkfj fqsdlmijf smqoifdsjqmlksqdjf sqdomfij"/>
		</div>
	</o-page>
</template>

<script setup lang="ts">
import { colors } from 'lib';
import { ref } from 'vue';

const fieldValue = ref(false);
</script>
