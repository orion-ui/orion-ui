<template>
	<div class="row row--grid row--middle">
		<div class="col-sm-6">
			<o-phone
				v-model="number"
				:mobile="mobile"/>
		</div>
		<div class="col-sm-6">
			<o-toggle
				v-model="mobile"
				label="Mobile"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const number = ref<Orion.Phone>({ phoneCountryCode: 'FR' });
const mobile = ref(false);
</script>

### Playground
