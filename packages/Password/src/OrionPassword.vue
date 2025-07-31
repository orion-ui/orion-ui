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
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 */
</script>
