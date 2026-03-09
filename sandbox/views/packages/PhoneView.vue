<template>
	<o-page title="Phone">
		<div class="row row--gutter">
			<div class="col-sm-6">
				<o-phone
					ref="_phoneOne"
					v-model="test2.phoneNumber"
					v-model:country-code="test2.phoneCountryCode"
					:label="phone.label"
					:country-favorites-options="favorites"
					flag
					clearable
					required
					size="sm"
					prefix-icon="content_paste"
					suffix-icon="business_center"/>
				<pre>{{ test2 }}</pre>
			</div>
			<div class="col-sm-6">
				<o-phone
					v-model="test3.phone.phoneNumber"
					v-model:country-code="test3.phone.phoneCountryCode"
					:label="`Mobile ${phone.label}`"
					placeholder="test placeholder"
					:floating-label="false"
					mobile>
					<!-- <template #label>
						<span style="color: cyan;">Custom label</span>
					</template> -->
				</o-phone>
				<pre>{{ test3.phone }}</pre>
			</div>
			<div class="col-sm-6">
				<o-phone
					v-model="phone.valueFilled.phoneNumber"
					:label="`Mobile ${phone.label}`"
					mobile/>
				<pre>{{ phone.valueFilled }}</pre>
			</div>
			<div class="col-sm-6">
				<o-phone
					v-model="phone.valueFilled.phoneNumber"
					v-model:country-code="phone.valueFilled.phoneCountryCode"
					v-model:national-number="phone.valueFilled.phoneNationalNumber"
					:label="`Mobile ${phone.label}`"
					mobile/>
				<pre>{{ phone.valueFilled }}</pre>
			</div>
			<div class="col-sm-6">
				<o-phone
					v-model="emptyTest.phoneNumber"
					:label="`${phone.label}`"
					flag
					:validation="validator.rule('phoneNumber')">
					<template #hint>
						<span>Hint</span>
					</template>
				</o-phone>
				<pre>{{ emptyTest }}</pre>
			</div>

			<o-select
				v-model="phone.valueFilled.phoneCountryCode"
				:options="favorites"
				label="country"
				track-key="code"
				display-key="name"
				value-key="code"/>
		</div>
	</o-page>
</template>

<script setup lang="ts">
import { CountryCode } from 'libphonenumber-js';
import { useValidation } from 'services';
import { Validator } from 'utils';
import { reactive, ref } from 'vue';

const _phoneOne = ref<OrionPhone>();

const favorites: Orion.Country[] = [
	{
		code: 'FR',
		name: 'France',
		areaCode: '33',
	},
	{
		code: 'DE',
		name: 'Allemagne',
		areaCode: '49',
	},
];

/* setTimeout(() => {
	_phoneOne.value?._country()?.setFavoritesOptions(favorites);
}, 1000); */

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

const emptyTest = reactive({
	phoneNumber: '+491635551584',
	phoneCountryCode: undefined as Undef<CountryCode>,
	phoneNationalNumber: undefined,
});

const phone = reactive({
	value: null,
	valueFilled: {
		phoneNumber: '01.23.45.67.89',
		phoneCountryCode: 'FR' as CountryCode,
		phoneNationalNumber: '0607944218',
	},
	label: 'Phone',
});
const validator = useValidation(emptyTest, { phoneNumber: Validator.rules.required() });

</script>
