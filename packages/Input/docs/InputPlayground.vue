<template>
	<o-input
		:key="state.mask"
		v-model="value"
		v-bind="state"/>

	<hr>

	<div class="flex fd-c g-8">
		<div class="row row--grid row--toggles">
			<div class="col-sm-4">
				<o-toggle
					v-model="state.clearable"
					label="Clearable"/>
			</div>
			<div class="col-sm-4">
				<o-toggle
					v-model="state.disabled"
					label="Disabled"/>
			</div>
			<div class="col-sm-4">
				<o-toggle
					v-model="state.allowNegative"
					label="Allow negative"/>
			</div>
		</div>
		<div class="row row--grid row--toggles">
			<div class="col-sm-4">
				<o-toggle
					v-model="state.floatingLabel"
					label="Use floating label"/>
			</div>
			<div class="col-sm-4">
				<o-toggle
					v-model="state.forceLabelFloating"
					label="Force label floating"/>
			</div>
		</div>
		<div class="row row--grid-xs">
			<div class="col-sm-3">
				<o-input
					v-model="state.label"
					label="Label"/>
			</div>
			<div class="col-sm-3">
				<size-selection
					v-model="state.size"
					:options="['md', 'xs']"/>
			</div>
			<div class="col-sm-3">
				<o-select
					v-model="state.prefixIcon"
					label="Prefix icon"
					clearable
					:options="icons"/>
			</div>
			<div class="col-sm-3">
				<o-select
					v-model="state.suffixIcon"
					label="Suffix icon"
					clearable
					:options="icons"/>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="state.type"
					label="Type"/>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="state.minValue"
					type="number"
					label="Integer Min value"
					clearable/>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="state.maxValue"
					type="number"
					label="Integer Max value"
					clearable/>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="state.maxLength"
					type="number"
					label="Value Max length"
					clearable/>
			</div>
			<div class="col-sm-3">
				<o-select
					v-model="state.mask"
					clearable
					:options="maskOptions"
					label="Mask"/>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="state.maskHourFormat"
					:disabled="state.mask !== 'hour'"
					label="Mask hour format"/>
			</div>
			<div class="col-sm-3">
				<o-input
					v-model="state.maskHourSeparator"
					:disabled="state.mask !== 'hour'"
					label="Mask hour separator"/>
			</div>
		</div>
		<div class="row row--grid-xs">
			<div class="col-sm-3">
				<o-input
					v-model="state.customMaskValue"
					label="Custom mask value"/>
			</div>
			<div class="col-sm-3 flex ai-c">
				<o-toggle
					v-model="state.staticMask"
					label="Static mask"/>
			</div>
		</div>
		<div class="row row--grid-xs">
			<div class="col-sm-3">
				<o-input
					v-model="state.hintText"
					label="Hint text"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { materialIcons } from 'lib';
import { computed, reactive, ref, watch } from 'vue';

const value = ref();

const state = reactive({
	prefixIcon: undefined as Undef<Orion.Icon>,
	suffixIcon: undefined as Undef<Orion.Icon>,
	size: 'md' as Orion.Size,
	clearable: true,
	disabled: false,
	floatingLabel: true,
	forceLabelFloating: false,
	type: 'text',
	allowNegative: false,
	mask: '',
	customMaskValue: '$w$d-$d{3}.',
	staticMask: true,
	maskHourFormat: '24h',
	maskHourSeparator: ':',
	maxLength: undefined,
	maxValue: undefined,
	minValue: undefined,
	label: 'Input playground',
	hintText: undefined as Undef<string>,
});

const icons = computed(() => {
	return materialIcons.slice(0, 50);
});

const maskOptions = [
	'integer',
	'decimal',
	'hour',
	state.customMaskValue,
];


watch(() => state.customMaskValue, (val) => {
	maskOptions[3] = val;
});
</script>

### Playground
