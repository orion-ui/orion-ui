<template>
	<o-page title="Phone">
		<div class="row row--gutter">
			<div class="col-sm-6">
				<o-phone
					v-model:phone-number="test2.phoneNumber"
					v-model:phone-country-code="test2.phoneCountryCode"
					:label="phone.label"/>
				<pre>{{ test2 }}</pre>
			</div>
			<div class="col-sm-6">
				<o-phone
					v-model="test3.phone"
					:label="`Mobile ${phone.label}`"
					mobile/>
				<pre>{{ test3.phone }}</pre>
			</div>
			<div class="col-sm-6">
				<o-phone
					v-model="phone.valueFilled"
					:label="`Mobile ${phone.label}`"
					mobile/>
				<pre>{{ phone.valueFilled }}</pre>
			</div>
		</div>
	</o-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const test = reactive({
	phoneNumber: undefined,
	phoneCountryCode: 'FR',
});
const test2 = reactive({
	phoneNumber: undefined,
	phoneCountryCode: 'FR',
});
const test3 = reactive({
	phone: {
		phoneNumber: undefined,
		phoneCountryCode: 'FR',
	},
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
