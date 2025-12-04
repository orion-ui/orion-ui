<template>
	<o-page title="Otp">
		<strong>Enter your code :</strong>

		<o-otp
			ref="test"
			:size="6"
			:data-type="'text'"
			@filled="filled()"/>

		<br>

		<o-button @click="test?.reset()">
			reset
		</o-button>
		<o-button @click="test?.focus()">
			focus
		</o-button>
		<br>
		<br>
	</o-page>
</template>

<script setup lang="ts">
import { useNotif } from 'lib';
import { ref } from 'vue';

const test = ref<OrionOtp>();

function filled () {
	useNotif.info('Filled event ');
}
</script>
