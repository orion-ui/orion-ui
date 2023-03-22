<template>
	<o-input
		v-model="value"
		v-bind="state"/>

	<hr>

	<div class="flex fd-c g-xs">
		<div class="row row--grid row--toggles">
			<div class="col-sm-3">
				<o-toggle
					v-model="state.clearable"
					label="Clearable"/>
			</div>
			<div class="col-sm-3">
				<o-toggle
					v-model="state.disabled"
					label="Disabled"/>
			</div>
			<div class="col-sm-3">
				<o-toggle
					v-model="state.forceLabelFloating"
					label="Force label floating"/>
			</div>
			<div class="col-sm-3">
				<o-toggle
					v-model="state.allowNegative"
					label="Allow negative"/>
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
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { coolicons } from 'lib';

const value = ref();

const state = reactive({
	prefixIcon: undefined as Undef<Orion.Icon>,
	suffixIcon: undefined as Undef<Orion.Icon>,
	size: 'md' as Orion.Size,
	clearable: true,
	disabled: false,
	forceLabelFloating: false,
	type: 'text',
	allowNegative: false,
	mask: '',
	maskHourFormat: '24h',
	maskHourSeparator: ':',
	maxLength: undefined,
	maxValue: undefined,
	minValue: undefined,
	label: 'Input playground',
});

const icons = computed(() => {
	return coolicons.slice(0, 50);
});

const maskOptions = [
	'integer',
	'decimal',
	'hour',
];
</script>

### Playground
