<template>
	<div class="orion-phone">
		<div class="orion-input-group orion-input-group--phone">
			<orion-select
				:ref="setup._country"
				v-model="setup.country"
				class="orion-telephone--indicatif"
				:class="{ 'orion-telephone--with-flag': flag }"
				track-key="code"
				display-key="areaCode"
				searchable
				:readonly="setup.props.readonly"
				:disabled="setup.props.disabled"
				:options="setup.countryList"
				:custom-search="setup.customSearch.bind(setup)"
				@input-keydown-tab="setup._input.value?.focus()"
				@update:model-value="setup.changeAreaCode()">
				<template #value="{ item }">
					<div class="flex ai-c">
						<img
							v-if="flag && setup.country"
							:src="setup.src"
							width="15.75"
							height="12">
						&nbsp;{{ item !== null && item !== undefined ? item.code : '' }}
					</div>
				</template>

				<template #option="{ item }">
					{{ `${item.name} (+${item.areaCode})` }}
				</template>
			</orion-select>
			<orion-input
				:ref="setup._orionInput"
				v-model="setup.phoneNumber"
				type="tel"
				:class="{ 'orion-input--warning': setup.showWarning }"
				:validation="setup.isValid.value"
				:inherit-validation-state="setup.showState"
				v-bind="{
					...$attrs,
					label: setup.props.label,
					disabled: setup.props.disabled,
					readonly: setup.props.readonly,
					clearable: setup.props.clearable,
					required: setup.isRequired,
				}"
				force-label-floating
				@keydown.self="setup.keydownGuard($event)"
				@mousedown-right="setup.handleMouseEvent($event)"
				@focus="setup.handleFocus($event)"
				@blur="setup.handleBlur($event)"/>
		</div>
		<div
			v-if="setup.showState
				&& (setup.showError || setup.showWarning)
				&& setup.validationHtmlMessages?.length"
			class="orion-input__error-message"
			v-html="setup.validationHtmlMessages"/>
	</div>
</template>

<script setup lang="ts">
import './OrionPhone.less';
import { OrionInput } from 'packages/Input';
import { OrionSelect } from 'packages/Select';
import OrionPhoneSetupService from './OrionPhoneSetupService';
// TODO: avoid code duplicate
// https://github.com/vuejs/core/issues/8301
// import OrionPhoneSetupService, { type OrionPhoneEmit } from './OrionPhoneSetupService';
type VModelType = Nil<{
  phoneNumber: Nil<string>;
  phoneCountryCode: Nil<Orion.Country['code']>;
}>;
type OrionPhoneEmit = {
  (e: 'focus', payload: FocusEvent): void;
  (e: 'blur', payload?: FocusEvent): void;
  (e: 'input', payload: VModelType): void;
  (e: 'change', val?: VModelType): void;
  (e: 'update:modelValue', payload: VModelType): void;
  (e: 'update:phoneNumber', payload?: string): void;
  (e: 'update:phoneCountryCode', payload?: Orion.Country['code']): void;
  (e: 'clear'): void;
}
const emit = defineEmits<OrionPhoneEmit>();
const props = defineProps(OrionPhoneSetupService.props);
const setup = new OrionPhoneSetupService(props, emit);
defineExpose(setup.publicInstance);

/** Doc
 * @doc event/focus/desc emitted on focus
 * @doc/fr event/focus/desc émis lors du focus
 *
 * @doc event/blur/desc emitted when the focus leaves the field
 * @doc/fr event/blur/desc émis quand le focus quitte le champ
 *
 * @doc event/input/desc emitted when the value of the field changes
 * @doc/fr event/input/desc émis lorsque la valeur est modifiée
 *
 * @doc event/change/desc emitted when the value of the field changes
 * @doc/fr event/change/desc émis lorsque la valeur est modifiée
 *
 * @doc event/update:modelValue/desc emitted to update the field value
 * @doc/fr event/update:modelValue/desc émis pour mettre à jour la valeur
 *
 * @doc event/clear/desc emitted when the field is cleared
 * @doc/fr event/clear/desc émis quand le champ est vidé
 */
</script>
