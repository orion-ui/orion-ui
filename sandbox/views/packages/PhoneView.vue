<template>
	<o-page title="Phone">
		<div class="row row--gutter">
			<div class="col-sm-6">
				<o-phone
					v-model="test2"
					:label="phone.label"/>
				<pre>{{ test2 }}</pre>
			</div>
			<div class="col-sm-6">
				<o-phone
					v-model="test"
					:label="`Mobile ${phone.label}`"
					mobile/>
				<pre>{{ test }}</pre>
			</div>
		</div>
	</o-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const test = ref({
	phoneNumber: undefined,
	phoneCountryCode: 'FR',
});
const test2 = reactive({
	phoneNumber: undefined,
	phoneCountryCode: 'FR',
});

const phone = reactive({
	value: null,
	valueFilled: {
		phoneNumber: '0607944218',
		phoneCountryCode: 'FR',
	},
	label: 'Phone',
});
</script>
