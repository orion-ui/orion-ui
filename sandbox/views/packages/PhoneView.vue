<template>
	<o-page title="Phone">
		<div class="row row--gutter">
			<div class="col-sm-6">
				<o-phone
					ref="_phoneOne"
					v-model:phone-number="test2.phoneNumber"
					v-model:phone-country-code="test2.phoneCountryCode"
					:label="phone.label"
					flag/>
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
import { CountryCode } from 'libphonenumber-js';
import { reactive, ref } from 'vue';

const _phoneOne = ref<OrionPhone>();

const favorites = [{
	code: 'FR',
	name: 'France',
	areaCode: '33',
}];

setTimeout(() => {
	_phoneOne.value?._country()?.setFavoritesOptions(favorites);
}, 1000);


const test = reactive({
	phoneNumber: undefined,
	phoneCountryCode: 'FR',
});
const test2 = reactive({
	phoneNumber: undefined as Undef<string>,
	phoneCountryCode: 'FR' as CountryCode,
});

const test3 = reactive({
	phone: {
		phoneNumber: undefined,
		phoneCountryCode: 'FR' as CountryCode,
	},
});

const phone = reactive({
	value: null,
	valueFilled: {
		phoneNumber: '0607944218',
		phoneCountryCode: 'FR' as CountryCode,
	},
	label: 'Phone',
});

</script>
