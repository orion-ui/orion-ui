<template>
	<o-page title="Otp">
		code <pre>{{ test?.code() }}</pre>
		readable code {{ test?.readableCode() }}
		<o-otp
			ref="test"
			:size="6"
			:data-type="'text'"
			@filled="filled()"/>
		<o-otp
			:size="6"
			readonly
			value="azerty"
			:data-type="'text'"
			@filled="filled()"/>
	</o-page>
</template>

<script setup lang="ts">
import { useNotif } from 'services';
import { ref } from 'vue';

const test = ref<OrionOtp>();

function filled () {
	useNotif.info('Filled event ');
}
</script>
