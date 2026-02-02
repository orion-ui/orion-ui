<template>
	<o-editor
		v-model="state.text"
		v-bind="state"
		v-model:json="state.json"/>

	<div class="value-display">
		<div class="row row--grid">
			<div class="col-sm-6">
				<div class="value-display__type">
					<b>JSON format</b>
					<pre>{{ state.json }}</pre>
				</div>
			</div>
			<div class="col-sm-6">
				<div class="value-display__type">
					<b>HTML format</b>
					<pre>{{ state.text }}</pre>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
	json: {},
	text: '',
	placeholder: 'Enter your text...',
	imgMaxSize: 1500,
});
</script>

<style lang="less" scoped>
.value-display {
	overflow: auto;
	max-height: 50vh;
	margin-top: 1rem;

	&__type {
		overflow: auto;
		padding: 1rem;
		border: 0.0625rem solid var(--o-background-neutral-subtle);

		pre {
			overflow-wrap: break-word;
			white-space: break-spaces;
		}
	}
}
</style>

### Playground
