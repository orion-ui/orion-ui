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
		<div class="col-sm-4">
			<size-selection
				v-model="state.size"
				:options="['sm', 'md']"/>
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
	</div>

	<div class="row row--grid row--toggles">
		<div class="col-sm-3">
			<o-toggle
				v-model="state.disabled"
				label="Disabled"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.readonly"
				label="Readonly"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { materialIcons } from 'assets/fonts/materialIcons';
import { reactive, computed } from 'vue';

const state = reactive({
	color: 'primary' as Orion.Color,
	label: 'Option 1',
	size: 'md' as OrionCheckbox.Props['size'],
	inputValue: 'option1',
	disabled: false,
	inline: false,
	reverse: false,
	multiple: false,
	readonly: false,
	value: false,
	multipleValue: [],
	iconCheck: 'notifications' as Orion.Icon,
});

const icons = computed(() => {
	return materialIcons.slice(0, 50);
});
</script>

### Playground
