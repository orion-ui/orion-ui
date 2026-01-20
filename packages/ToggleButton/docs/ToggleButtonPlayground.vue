<template>
	<o-toggle-button
		v-if="!state.iconOnly"
		v-bind="state"
		:prefix-icon="state.prefix ? 'add_circle' : undefined"
		:suffix-icon="state.suffix ? 'check' : undefined"
		@click="click()">
		{{ state.text }}
	</o-toggle-button>
	<o-toggle-button
		v-if="state.iconOnly"
		v-bind="state"
		prefix-icon="add_circle"
		@click="click()"/>

	<hr>

	<div class="row row--grid ai-c flex">
		<div class="col-sm-4">
			<o-input
				v-model="state.text"
				label="Text"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.nude"
				label="Nude"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.disabled"
				label="disabled"/>
		</div>
	</div>

	<div class="row row--grid">
		<div class="col-sm-4">
			<color-selection v-model="state.color"/>
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
				v-model="state.iconOnly"
				label="icon only"/>
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
	size: 'md' as OrionToggleButton.Props['size'],
	nude: false,
	disabled: false,
	iconOnly: false,
});

function click () {
	useNotif.info(`Button clicked`);
}
</script>

@hl {3,66-75}

### Playground
