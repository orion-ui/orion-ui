<template>
	<div class="row row--grid row--middle">
		<div class="col-sm-9">
			<o-phone
				v-model="number"
				:flag="flag"
				v-bind="state"
				:mobile="mobile"/>
		</div>
	</div>
	<hr>
	<div class="row row--toggles">
		<div class="col-sm-3">
			<o-toggle
			v-model="mobile"
			label="Mobile"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
			v-model="flag"
			label="Flag"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.disabled"
				label="disabled"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.readonly"
				label="readonly"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const number = ref<Orion.Phone>({ phoneCountryCode: 'FR' });
const mobile = ref(false);
const flag = ref(false);

const state = reactive({
	disabled: false,
	readonly: false,
});
</script>

### Playground
