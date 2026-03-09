<template>
	<o-page title="Input">
		<br><br>
		<div class="flex g-16">
			<o-radio
				v-model="fieldSize"
				label="SM"
				input-value="sm"
				:size="fieldSize"/>
			<o-radio
				v-model="fieldSize"
				label="MD"
				input-value="md"
				:size="fieldSize"/>
		</div>
		<div class="flex ai-c g-32">
			<o-input
				v-model="fields.input.value"
				:class="['test-cllass', {
					'has-value': !!fields.input.value,
				}]"
				label="Label default"
				placeholder="Placeholder"
				:size="fieldSize">
				<template #hint>
					<div class="flex ai-c g-4">
						<o-icon icon="info"/>
						<span>Hint with slot</span>
					</div>
				</template>
			</o-input>
			<o-input
				v-model="fields.input.value"
				label="Label static"
				required
				placeholder="Placeholder"
				:floating-label="false"
				:size="fieldSize"/>
			<o-input
				v-model="fields.input.value"
				label="Label default no PH"
				:force-label-floating="true"
				:size="fieldSize"/>
			<o-input
				v-model="fields.input.value"
				label="Label static no PH"
				:floating-label="false"
				:size="fieldSize"/>
		</div>
		<hr>
		<pre>{{ fields.input }}</pre>
		<div class="row row--gutter">
			<div class="col-sm-3">
				<o-input
					label="Simple input with donetyping"
					placeholder="Placeholder"
					v-bind="commonBind"
					model-value="qsd"
					clear-to-null
					clearable
					:validation="false"
					@keydown:enter="cb('tto')"/>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="fields.input.value"
					label="Prefix Icon & force floating label"
					:max-length="6"
					force-label-floating
					v-bind="commonBind"
					prefix-icon="add_reaction"/>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="fields.input.value"
					label="Suffix Icon"
					v-bind="commonBind"
					suffix-icon="view_column"/>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="fields.input.value"
					label="Prefix and Suffix Icon"
					v-bind="commonBind"
					clearable
					prefix-icon="airplay"
					suffix-icon="collections_bookmark"
					:validation="val => val?.length > 4"/>
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
			<div class="col-sm-6">
				<o-input
					v-model="inputMaskStatic"
					label="Static mask - $d$d##$d$w%#&"
					v-bind="commonBind"
					mask="$d$d##$d$w%#&"
					clear-to-null
					@keydown:enter="cb('tto')"/>
			</div>
			<div class="col-sm-6">
				<o-input
					v-model="inputMask"
					:static-mask="false"
					label="As you type mask - $d$d##$d$w%#&"
					v-bind="commonBind"
					mask="$d$d##$d$w%#&"
					clear-to-null
					@keydown:enter="cb('tto')"/>
			</div>
		</div>
	</o-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const email = ref<string>();
const inputMask = ref<string>('');
const inputMaskStatic = ref<string>('');
const fieldSize = ref<Orion.FieldSize>('md');
const commonBind = reactive({
	reverse: false,
	clearable: false,
	required: false,
	disabled: false,
	size: fieldSize,
});

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
