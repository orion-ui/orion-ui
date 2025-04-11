<template>
	<div class="row row--grid mb-xs">
		<div class="col-sm-6">
			<o-password
				v-model="state.value"
				v-bind="state"
				:password-tooltip="state.passwordTooltip"
				label="Password"/>
		</div>
		<div class="col-sm-6">
			<o-password
				v-model="state.passwordToConfirm"
				:password-tooltip="state.passwordTooltip"
				:password-to-confirm="state.value"
				label="Password confirmation"/>
		</div>
	</div>

	<div class="row row--toggles">
		<div class="col-sm-4">
			<o-toggle
				v-model="state.passwordTooltip"
				label="Password tooltip"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.disabled"
				label="disabled"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.readonly"
				label="readonly"/>
		</div>
		
		
	
	</div>
	
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
	value: undefined,
	passwordTooltip: true,
	disabled: false,
	readonly: false,
	passwordToConfirm: undefined,
});
</script>

### Playground
