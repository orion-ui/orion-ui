<template>
	<o-page title="Input">
		<pre>LOG : {{ fields.input.value }} | {{ typeof fields.input.value }}</pre>
		<div class="row row--gutter">
			<div class="col-sm-3">
				<o-input
					v-model="fields.input.value"
					label="Simple input with donetyping"
					v-bind="commonBind"
					:donetyping="1000"
					@keydown:enter="cb('tto')"/>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="fields.input.value"
					label="Prefix Icon & force floating label"
					:max-length="6"
					force-label-floating
					v-bind="commonBind"
					prefix-icon="airplay"/>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="fields.input.value"
					label="Suffix Icon"
					v-bind="commonBind"
					suffix-icon="combine_cells"/>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="fields.input.value"
					label="Prefix and Suffix Icon"
					v-bind="commonBind"
					prefix-icon="airplay"
					suffix-icon="terminal"/>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="fields.input.integer"
					label="Mask integer"
					v-bind="commonBind"
					:min-value="4"
					type="number"
					mask="integer"/>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="fields.input.decimal"
					label="Mask decimal"
					v-bind="commonBind"
					mask="decimal"/>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="fields.inputHour.hour"
					label="Mask hour"
					v-bind="commonBind"
					select-on-focus
					mask="hour"
					mask-hour-separator="h"/>
				<pre>{{ fields.inputHour }}</pre>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="email"
					label="Email input (validation)"
					type="email"
					v-bind="commonBind"/>
			</div>
		</div>
	</o-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const commonBind = reactive({
	reverse: false,
	clearable: true,
	required: false,
	disabled: false,
});
const email = ref<string>();

const fields = reactive({
	showError: false,
	showSuccess: false,
	input: {
		value: null,
		integer: 10,
		decimal: 85.62,
		label: 'Label input',
	},
	inputHour: { hour: 10.5 },
});

function cb (arg: any) {
	// eslint-disable-next-line no-console
	console.log(arg);
}
</script>
