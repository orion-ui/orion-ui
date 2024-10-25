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
				v-model="vModel"
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

			error{{ setup.showError }}
			error{{ setup.showWarning }}

			<div
				v-if="setup.showState
					&& (setup.showError || setup.showWarning)
					&& setup.validationHtmlMessages?.length"
				class="orion-input__error-message"
				v-html="setup.validationHtmlMessages"/>
		</orion-field>

		<template #popper>
			<div class="orion-password-popover--password-check">
				<div
					v-for="(validationMessage, index) in setup.tooltipValidationMessages"
					:key="index"
					class="password-check-line"
					:class="validationMessage.valid ? 'text--success': 'text--warning'">
					<orion-icon :icon="validationMessage.valid ? 'check': 'triangle_warning'"/>
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
import type { OrionPasswordProps, OrionPasswordEmits } from './OrionPasswordSetupService';
const vModel = defineModel<Nil<string>>();
const emits = defineEmits<OrionPasswordEmits>() as OrionPasswordEmits;
const props = withDefaults(defineProps<OrionPasswordProps>(), OrionPasswordSetupService.defaultProps);
const setup = new OrionPasswordSetupService(props, emits, vModel);
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
 * @doc event/clear/desc emitted when the field is cleared
 * @doc/fr event/clear/desc émis quand le champ est vidé
 */
</script>
