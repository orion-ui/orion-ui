<template>
	<o-button
		v-bind="state"
		:prefix-icon="state.prefix ? 'add' : undefined"
		:suffix-icon="state.suffix ? 'arrow_back' : undefined"
		:outline="state.style==='outline'"
		:nude="state.style==='nude'"
		@click="click()">
		{{ state.text }}
	</o-button>

	<hr>

	<div class="row row--grid">
		<div class="col-sm-4">
			<o-input
				v-model="state.text"
				label="Text"/>
		</div>
		<div class="col-sm-4">
			<o-select
				v-model="state.style"
				label="Style"
				:options="selectStyleOptions"
				inline/>
		</div>
	</div>

	<div class="row row--grid">
		<div class="col-sm-4">
			<color-selection v-model="state.color"/>
		</div>
		<div class="col-sm-4">
			<size-selection v-model="state.size"/>
		</div>
	</div>

	<div class="row row--grid row--toggles">
		<div class="col-sm-3">
			<o-toggle
				v-model="state.loading"
				label="loading"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.prefix"
				label="prefix icon"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.suffix"
				label="suffix icon"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.disabled"
				label="disabled"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNotif } from 'lib';
import { reactive } from 'vue';

const state = reactive({
	color: 'info' as Orion.Color,
	loading: false,
	text: 'Lorem ipsum',
	prefix: false,
	suffix: false,
	size: 'md'as Orion.Size,
	style: 'classic',
	disabled: false,
});

const selectStyleOptions = [
	'classic',
	'outline',
	'nude',
];

function click () {
	useNotif.info(`Button clicked`);
}
</script>

@hl {3,66-75}

### Playground
