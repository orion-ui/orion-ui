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
				:disabled
				:readonly
				:options="setup.countryList"
				:custom-search="setup.customSearch.bind(setup)"
				@input-keydown-tab="setup._input.value?.focus()"
				@update:model-value="setup.changeAreaCode()">
				<template #value="{ item }: any">
					<div class="flex ai-c">
						<img
							v-if="flag && setup.country"
							:src="setup.src"
							width="15.75"
							height="12">
						&nbsp;{{ item !== null && item !== undefined ? item.code : '' }}
					</div>
				</template>

				<template #option="{ item }: any">
					{{ `${item.name} (+${item.areaCode})` }}
				</template>
			</orion-select>
			<orion-input
				:ref="setup._orionInput"
				v-model="setup.phoneNumberProxy"
				type="tel"
				:class="{ 'orion-input--warning': setup.showWarning }"
				:validation="setup.isValid.value"
				:inherit-validation-state="setup.showState"
				v-bind="{
					...$attrs,
					label: label,
					disabled: disabled,
					clearable: clearable,
					readonly,
					required: setup.isRequired,
				}"
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
import type { OrionPhoneProps, OrionPhoneEmits, VModelType } from './OrionPhoneSetupService';
// TODO: avoid code duplicate
// https://github.com/vuejs/core/issues/8301
// import OrionPhoneSetupService, { type OrionPhoneEmit } from './OrionPhoneSetupService';
const emits = defineEmits<OrionPhoneEmits>() as OrionPhoneEmits;
const vModel = defineModel<VModelType>();
const phoneCountryCode = defineModel<string | undefined>('phoneCountryCode');
const phoneNumber = defineModel<string | undefined>('phoneNumber');
const props = withDefaults(defineProps<OrionPhoneProps>(), OrionPhoneSetupService.defaultProps);
const setup = new OrionPhoneSetupService(props, emits, vModel, phoneCountryCode, phoneNumber);
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
