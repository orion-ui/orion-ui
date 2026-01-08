<template>
	<div class="row row--grid mb-xs">
		<div class="col-sm-6">
			<o-password
				v-model="state.value"
				v-bind="state"
				:rules="['hasSpecialChar', 'hasMinLength:6']"
				:password-tooltip="state.passwordTooltip"
				:password-to-confirm="undefined"
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
		<div class="col-sm-3">
			<o-toggle
				v-model="state.passwordTooltip"
				label="Password tooltip"/>
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
		<div class="col-sm-3">
			<o-toggle
				v-model="state.strengthIndicator"
				label="Strength indicator"/>
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
	strengthIndicator: true,
});
</script>

### Playground
