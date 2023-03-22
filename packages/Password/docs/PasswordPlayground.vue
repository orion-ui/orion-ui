<template>
	<div class="row row--grid mb-xs">
		<div class="col-sm-6">
			<o-password
				v-model="state.value"
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

	<o-toggle
		v-model="state.passwordTooltip"
		label="Password tooltip"/>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
	value: undefined,
	passwordTooltip: true,
	passwordToConfirm: undefined,
});
</script>

### Playground
