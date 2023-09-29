<template>
	<v-dropdown
		:placement="setup.placementToolTip"
		:triggers="[]"
		:shown="setup.isFocus"
		:auto-hide="false"
		:disabled="!passwordTooltip">
		<orion-field
			v-bind="setup.orionFieldBinding"
			@clear="setup.clear()">
			<input
				:ref="setup._input"
				v-model="setup.vModel"
				class="orion-input__input"
				:type="setup.reveal ? 'text' : 'password'"
				:disabled="disabled"
				:readonly="readonly"
				v-bind="$attrs"
				@input="setup.handleInput($event)"
				@change="setup.handleChange()"
				@focus="setup.handleFocus($event)"
				@blur="setup.handleBlur($event)">

			<template #icon-suffix>
				<orion-icon
					class="orion-input__reveal"
					:icon="setup.reveal ? 'hide' : 'show'"
					ripple="default"
					@click="setup.toggleReveal()"/>
			</template>

			<div
				v-if="!setup.isValid && setup.orionFieldBinding.showError"
				class="orion-input__error-message">
				{{ setup.props.validationErrorMessage }}
			</div>
		</orion-field>

		<template #popper>
			<div class="orion-password-popover--password-check">
				<div
					v-for="(validationMessage, index) in setup.tooltipValidationMessages"
					:key="index"
					class="password-check-line"
					:class="validationMessage.valid ? 'text--success': 'text--warning'">
					<orion-icon :icon="validationMessage.valid ? 'check': 'warning'"/>
					<span>{{ validationMessage.message }}</span>
				</div>
			</div>
		</template>
	</v-dropdown>
</template>

<script setup lang="ts">
import './OrionPassword.less';
import { OrionField } from 'packages/Field';
import { OrionIcon } from 'packages/Icon';
import OrionPasswordSetupService from './OrionPasswordSetupService';
type VModelType = Nil<string>;
type FieldEmit = {
  (e: 'focus', payload: FocusEvent): void;
  (e: 'blur', payload?: FocusEvent): void;
  (e: 'input', payload: VModelType): void;
  (e: 'change', val?: VModelType): void;
  (e: 'update:modelValue', payload: VModelType): void;
  (e: 'clear'): void;
}
const emit = defineEmits<FieldEmit>();
const props = defineProps(OrionPasswordSetupService.props);
const setup = new OrionPasswordSetupService(props, emit);
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
