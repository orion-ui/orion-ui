<template>
	<template v-if="state.multiple">
		<o-checkbox
			v-bind="state"
			v-model="state.multipleValue"/>
		<o-checkbox
			v-model="state.multipleValue"
			:inline="state.inline"
			:reverse="state.reverse"
			multiple
			label="Option 2"
			input-value="option2"/>
		<o-checkbox
			v-model="state.multipleValue"
			:inline="state.inline"
			:reverse="state.reverse"
			multiple
			label="Option 3"
			input-value="option3"/>
		<o-checkbox
			v-model="state.multipleValue"
			:inline="state.inline"
			:reverse="state.reverse"
			multiple
			label="Option 4"
			input-value="option4"/>

		<pre>Value: {{ state.multipleValue }}</pre>
	</template>

	<template v-else>
		<o-checkbox
			v-bind="state"
			v-model="state.value"/>
		<o-checkbox
			v-model="state.value"
			:inline="state.inline"
			:reverse="state.reverse">
			<o-alert>Use default slot to display custom html content</o-alert>
		</o-checkbox>

		<pre>Value: {{ state.value }}</pre>
	</template>

	<hr>

	<b>Change the configuration of the Option 1 checkbox :</b>
	<div class="mt-sm row row--grid">
		<div class="col-sm-4">
			<o-input
				v-model="state.label"
				label="Label"/>
		</div>
		<div class="col-sm-4">
			<color-selection v-model="state.color"/>
		</div>
		<div class="col-sm-4">
			<o-select
				v-model="state.iconCheck"
				clearable
				label="Icon"
				:options="icons"/>
		</div>
	</div>

	<div class="row row--grid row--toggles">
		<div class="col-sm-3">
			<o-toggle
				v-model="state.reverse"
				label="Reverse"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.inline"
				label="Inline"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.multiple"
				label="Multiple"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.disabled"
				label="Disabled"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { coolicons } from 'lib';

const state = reactive({
	color: 'brand' as Orion.Color,
	label: 'Option 1',
	inputValue: 'option1',
	disabled: false,
	inline: false,
	reverse: false,
	multiple: false,
	value: false,
	multipleValue: [],
	iconCheck: 'notification' as Orion.Icon,
});

const icons = computed(() => {
	return coolicons.slice(0, 50);
});
</script>

### Playground
