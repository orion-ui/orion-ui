<template>
	<o-page title="Input">
		<pre>{{ fields.input }}</pre>
	
		valeur du mask $d$w.
		<br>
		<o-input
					v-model="inputMask"
					label="MASK"
					placeholder="Placeholder"
					v-bind="commonBind"
					mask="$d$w."
					clear-to-null
					@keydown:enter="cb('tto')"/>

		valeur du mask <strong>$d$d#$w$w##</strong>
		<br>
		valeur du vmodel {{ inputMask }}
		<o-input
					v-model="inputMask"
					label="MASK"
					placeholder="Placeholder"
					v-bind="commonBind"
					mask="$d$d#$w$w%#"
					clear-to-null
					@keydown:enter="cb('tto')"/>
			<pre>

			</pre>
		<div class="row row--gutter">
			
			<div class="col-sm-3">
				
				<o-input
					label="Simple input with donetyping"
					placeholder="Placeholder"
					v-bind="commonBind"
					clear-to-null
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
					allow-negative
					mask="integer"/>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="fields.input.decimal"
					label="Mask decimal"
					v-bind="commonBind"
					allow-negative
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
const inputMask = ref<string>('');

const fields = reactive({
	showError: false,
	showSuccess: false,
	input: {
		value: undefined,
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
