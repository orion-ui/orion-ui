<template>
	<o-page title="Phone">
		<div class="row row--gutter">
			<div class="col-sm-6">
				<o-phone
					v-model:phone-number="test2.phoneNumber"
					v-model:phone-country-code="test2.phoneCountryCode"
					:label="phone.label"
					with-flag
					@update:phone-country-code="onChangeCountryCode()"/>
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
		<div class="row row--gutter">
			<div class="shared-phone-display">
				<div class="shared-phone-display__country">
					<img
						id="flag"
						:src="src(test2.phoneCountryCode)"
						width="15.75"
						height="12">
				</div>
				<div class="shared-phone-display__number">
					<u>
						<span>{{ displayPhone(test2.phoneNumber ?? '', test2.phoneCountryCode) }}</span>
					</u>
				</div>
			</div>
		</div>
	</o-page>
</template>

<script setup lang="ts">
import { CountryCode } from 'libphonenumber-js';
import { reactive } from 'vue';
import { displayPhone } from 'lib';

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

function src (countryCode: string) { return new URL('../../../../assets/flag/' + countryCode + '.svg', import.meta.url).href;};

async function onChangeCountryCode () {
	const img = document.getElementById('flag') as HTMLImageElement;
	if (test2.phoneCountryCode)
		img.src = src(test2.phoneCountryCode);
}

</script>

<style scoped lang="less">
.shared-phone-display {
	display: flex;
	align-items: center;
	gap: .5rem;
	&__country {
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}
	&__number {
	}
}</style>
