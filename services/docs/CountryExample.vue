<template>
	<div class="row row--grid">
		<div class="col-sm-6">
			<h5>List of all countries :</h5>
			<o-select
				v-model="state.country"
				searchable
				clearable
				label="Country"
				track-key="code"
				display-key="name"
				:options="useCountry().countries"/>
		</div>

		<div class="col-sm-6">
			<h5>Selected country data :</h5>
			<pre>{{ state.country }}</pre>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useCountry } from 'lib';
import { onMounted, reactive } from 'vue';

const state = reactive({ country: undefined as Orion.Country | undefined });

onMounted(() => {
	state.country = useCountry().getCountryByCode('GB');
});
</script>

@hmr services/Country.md

## Demo
