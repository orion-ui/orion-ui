<template>
	<o-page title="DateTable">
		<o-alert><pre>{{ date }}</pre></o-alert>
		<o-card style="width:20rem">
			<o-date-table
				v-model="date"
				type="range"
				:periods="periods"/>
		</o-card>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const date = ref(new Date());
const periods = ref<OrionDateTable.Props['periods']>([
	{
		start: new Date(2022, 4, 13),
		end: new Date(2022, 4, 20),
		color: 'success',
		label: 'turlutu',
		callback: () => console.log('sfldk'),
	},
	{
		start: new Date(2022, 7, 13),
		end: new Date(2022, 7, 20),
		color: 'pink',
		label: 'tototo',
		callback: () => console.log('sfldk'),
	},
]);
</script>
