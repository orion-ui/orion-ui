<template>
	<div class="row row--grid row--middle">
		<div class="col-sm-9">
			<o-phone
				v-model="number"
				:flag="flag"
				:mobile="mobile"/>
		</div>
	</div>
	<hr>
	<div class="row row--grid row--middle">
		<o-toggle
			v-model="mobile"
			label="Mobile"/>

		<o-toggle
			v-model="flag"
			label="Drapeau"/>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const number = ref<Orion.Phone>({ phoneCountryCode: 'FR' });
const mobile = ref(false);
const flag = ref(false);
</script>

### Playground
