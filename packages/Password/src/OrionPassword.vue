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
			<template #hint>
				<slot name="hint"/>
			</template>

			<input
				:id="`orion-${setup.inputType}_${setup._uid}`"
				:ref="setup._orionInput"
				v-model="vModel"
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
					class="orion-password__reveal"
					:icon="setup.reveal ? 'visibility_off' : 'visibility'"
					ripple="primary"
					@click="setup.toggleReveal()"/>
			</template>
		</orion-field>

		<template #popper>
			<div class="orion-password-popover">
				<div
					v-if="!passwordToConfirm"
					class="orion-password-popover__header">
					<span class="orion-password-popover__title">
						{{ setup.lang.PASSWORD_CRITERIAS }}
					</span>
					<span class="orion-password-popover__subtitle">
						{{ setup.tooltipSubtitle }}
					</span>
				</div>

				<div class="orion-password-popover__password-check">
					<div
						v-for="(validationMessage, index) in setup.tooltipValidationMessages"
						:key="index"
						class="password-check-line">
						<orion-icon
							:icon="setup.getPasswordCheckIcon(validationMessage.valid)"
							:class="setup.getPasswordCheckClass(validationMessage.valid)"/>
						<span>{{ validationMessage.message }}</span>
					</div>
				</div>

				<div
					v-if="!passwordToConfirm && strengthIndicator"
					class="orion-password-popover__indicator">
					<div
						v-for="i in 4"
						:key="i"
						class="orion-password-popover__indicator-step"
						:class="setup.getIndicatorStepClass(i)">
						<span
							v-if="setup.passwordScore === i || (setup.passwordScore === 0 && i === 1)"
							class="orion-password-popover__indicator-step-label">
							{{ setup.passwordStrength }}
						</span>
						<span class="orion-password-popover__indicator-step-line"/>
					</div>
				</div>
			</div>
			<slot name="popper-content"/>
		</template>
	</v-dropdown>
</template>

<script setup lang="ts">
import { OrionField } from 'packages/Field';
import { OrionIcon } from 'packages/Icon';
import './OrionPassword.less';
import { OrionPasswordSetup, type OrionPasswordEmits, type OrionPasswordProps } from './OrionPasswordSetup';
const vModel = defineModel<Nil<string>>();
const emits = defineEmits<OrionPasswordEmits>() as OrionPasswordEmits;
const props = withDefaults(defineProps<OrionPasswordProps>(), OrionPasswordSetup.defaultProps);
const setup = new OrionPasswordSetup(props, emits, vModel);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 *
 * @doc slot/popper-content additionnal content of the dropdown popper
 * @doc/fr slot/popper-content contenu additionnel du popper du dropdown
 */
</script>
