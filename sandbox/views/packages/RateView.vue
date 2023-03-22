<template>
	<o-page title="Rate">
		<o-card>
			classic
			<o-rate
				v-model="value"/>
			disabled
			<o-rate
				v-model="value"
				color="info"
				:number-of-rates="2"/>
			number of rates
			<o-rate
				v-model="value"
				color="pink"
				disabled/>
			number of rates
			<o-rate
				v-model="value"
				disabled
				:number-of-rates="2"/>
		</o-card>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(2.5);
</script>
