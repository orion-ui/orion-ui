<template>
	<o-textarea
		v-bind="state"
		v-model="state.value"/>

	<hr>

	<div class="row row--gutter">
		<div class="col-sm-3">
			<o-input
				v-model="state.label"
				label="label"/>
		</div>
		<div class="col-sm-3">
			<o-input
				v-model="state.maxLength"
				type="number"
				label="Max length"/>
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
	</div>

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
				v-model="state.readonly"
				label="Readonly"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { materialIcons } from 'lib';

const icons = computed(() => materialIcons.slice(0, 50));
const state = reactive({
	label: 'Textarea',
	value: '',
	readonly: false,
	prefixIcon: 'bulb' as Orion.Icon,
	suffixIcon: undefined,
	disabled: false,
	clearable: true,
	maxLength: 100,
});
</script>

### Playground
