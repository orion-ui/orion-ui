<template>
	<div
		:class="[
			`orion-field`,
			`orion-field--${size}`,
			`orion-phone`,
		]">
		<div
			:ref="setup._countryCode"
			class="orion-phone__country-code">
			<orion-select
				:ref="setup._countrySelect"
				v-model="setup.country"
				class="orion-phone__country-code-select"
				:class="{ 'orion-phone__country-code-select--with-flag': flag }"
				track-key="code"
				display-key="areaCode"
				searchable
				:disabled
				:readonly
				:size
				:options="setup.countryList"
				:favorites-options="countryFavoritesOptions"
				:custom-search="setup.customSearch.bind(setup)"
				@input-keydown-tab="setup.switchFocusFromCountryToInput()">
				<template #value="{ item }">
					<div class="orion-phone__country-code-select-option">
						<img
							v-if="flag && setup.country"
							class="orion-phone__country-code-flag"
							:src="setup.getSrc(item?.code)">
						{{ item !== null && item !== undefined ? item.code : '' }}
					</div>
				</template>
				<template #option="{ item }">
					<div class="orion-phone__country-code-select-option">
						<img
							v-if="flag"
							class="orion-phone__country-code-flag"
							:src="setup.getSrc(item?.code)">
						<span>{{ `${item.name} (+${item.areaCode})` }}</span>
					</div>
				</template>
			</orion-select>

			<span class="orion-phone__country-code-display">
				+{{ setup.country?.areaCode }}
			</span>
		</div>

		<orion-input
			:id="`orion-${setup.inputType}_${setup._uid}`"
			:ref="setup._orionInput"
			v-model="setup.phoneNumberProxy"
			type="tel"
			class="orion-phone__input"
			:validation="validation ?? setup.isValid.value"
			:validation-error-message
			v-bind="{
				...$attrs,
				disabled,
				clearable,
				readonly,
				size,
			}"
			@keydown.self="setup.keydownGuard($event)"
			@focus="setup.handleFocus($event)"
			@blur="setup.handleBlur($event)"
			@paste.prevent="setup.setDataFromPaste($event)">
			<template #hint>
				<slot name="hint"/>
			</template>
		</orion-input>
	</div>
</template>

<script setup lang="ts">
import { OrionInput } from 'packages/Input';
import { OrionSelect } from 'packages/Select';
import './OrionPhone.less';
import { OrionPhoneSetup, type OrionPhoneEmits, type OrionPhoneProps } from './OrionPhoneSetup';
// TODO: avoid code duplicate
// https://github.com/vuejs/core/issues/8301
const emits = defineEmits<OrionPhoneEmits>() as OrionPhoneEmits;
const vModel = defineModel<Nil<string>>();
const vModelCountryCode = defineModel<Nil<Orion.Country['code']>>('countryCode');
const vModelNationalNumber = defineModel<Nil<string>>('nationalNumber');
const props = withDefaults(defineProps<OrionPhoneProps>(), OrionPhoneSetup.defaultProps);
const setup = new OrionPhoneSetup(props, emits, vModel, vModelCountryCode, vModelNationalNumber);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 * @doc vModel/phoneCountryCode the country code string, isolated from its parent object
 * @doc/fr vModel/phoneCountryCode le code pays, isolé de son objet parent
 * @doc vModel/phoneNumber the phoneNumber string, isolated from its parent object
 * @doc/fr vModel/phoneNumber le numéro de téléphone, isolé de son objet parent
 */
</script>

<style lang="less" scoped>
.orion-phone {
	--o-phone-country-code-space: v-bind("setup.countryCodeWidth");

	&__input > {
		:deep(input) {
			margin-left: calc(var(--o-phone-country-code-space) - var(--o-field-input-padding-h) - 0.125rem);
			// background-color: crimson !important;
		}
	}
}
</style>
