<template>
	<div
		:class="[
			`orion-field`,
			`orion-field--${size}`,
			`orion-phone`,
			{
				'orion-field--disabled': disabled,
				'orion-field--readonly': readonly,
				'orion-field--required': required,
			},
		]"
		:style="`--o-phone-country-code-space: ${setup.countryCodeWidth}`">
		<label
			v-if="setup.displayStaticLabel"
			:for="`orion-${setup.inputType}_${setup._uid}`"
			class="orion-field__label orion-field__label--static"
			@click.prevent>
			<slot name="label">
				<span v-html="label"/>
			</slot>
		</label>

		<div class="orion-phone__wrapper">
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
					placeholder,
					floatingLabel,
					label: setup.displayStaticLabel ? undefined : label,
				}"
				@keydown.self="setup.keydownGuard($event)"
				@focus="setup.handleFocus($event)"
				@blur="setup.handleBlur($event)"
				@paste.prevent="setup.setDataFromPaste($event)">
				<!-- <template #label>
				<slot name="label"/>
			</template> -->
				<template #hint>
					<slot name="hint"/>
				</template>
			</orion-input>
		</div>
	</div>
</template>

<script setup lang="ts">
import { OrionInput } from 'packages/Input';
import { OrionSelect } from 'packages/Select';
import { inject } from 'vue';
import './OrionPhone.less';
import { OrionPhoneSetup, type OrionPhoneEmits, type OrionPhoneProps } from './OrionPhoneSetup';
const slots = defineSlots<{
	label: () => any
	hint: () => any
}>();
// TODO: avoid code duplicate
// https://github.com/vuejs/core/issues/8301
const emits = defineEmits<OrionPhoneEmits>() as OrionPhoneEmits;
const vModel = defineModel<Nil<string>>();
const vModelCountryCode = defineModel<Nil<Orion.Country['code']>>('countryCode');
const vModelNationalNumber = defineModel<Nil<string>>('nationalNumber');
const _aside = inject<OrionAside>('_aside');
const _modal = inject<OrionModal>('_modal');
const props = withDefaults(defineProps<OrionPhoneProps>(), OrionPhoneSetup.defaultProps);
const setup = new OrionPhoneSetup(props, emits, slots, vModel, vModelCountryCode, vModelNationalNumber, _modal, _aside);
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
