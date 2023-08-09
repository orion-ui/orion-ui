<template>
	<o-otp
		ref="otp"
		v-bind="state"/>
	<pre> ReadableCode : {{ otp?.readableCode() }}</pre>

	<div class="row row--gutter">
		<div class="col-sm-4">
			<o-input
				v-model="state.size"
				type="number"
				label="size"/>
		</div>
		<div class="col-sm-4">
			<o-select
				v-model="state.dataType"
				:options="dataOptions"
				label="dataType"/>
		</div>
		<o-toggle
			v-model="state.readonly"
			label="readonly"/>
		<o-button
			color="warning"
			outline
			@click="otp?.reset()">
			Reset
		</o-button>
		<o-button
			color="info"
			outline
			@click="otp?.focus()">
			Focus
		</o-button>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { reactive } from 'vue';

const otp = ref<OrionOtp>();

const state = reactive({
	size: 4,
	value: '',
	dataType: 'text',
	readonly: false,
});

const dataOptions = [
	'text',
	'number',
];

watch(() => state.dataType, () => {
	otp.value?.reset();
});

</script>


### Playground
