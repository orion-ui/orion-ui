<template>
	<div
		:ref="setup._el"
		class="orion-alert"
		:class="[
			`orion-alert--${color}`,
			{ 'orion-alert--center': center },
			{ 'orion-alert--closable': close },
			{ 'orion-alert--icon': props.icon || props.fontIcon },
		]">
		<orion-icon
			v-if="props.icon || props.fontIcon"
			class="orion-alert__icon"
			v-bind="{
				icon: setup.icon,
				fontIcon: fontIcon,
			}"/>

		<div class="orion-alert__content">
			<h5
				v-if="title"
				class="orion-alert__title">
				{{ title }}
			</h5>
			<slot/>
			<div
				v-if="$slots.actions"
				class="orion-alert__actions">
				<slot name="actions"/>
			</div>
		</div>

		<span
			v-if="close"
			class="orion-alert__close"
			@click="emits('close')"
			@touchend.prevent.stop="emits('close')"/>
	</div>
</template>

<script setup lang="ts">
import './OrionAlert.less';
import { OrionIcon } from 'packages/Icon';
import OrionAlertSetupService from './OrionAlertSetupService';
import type { OrionAlertProps, OrionAlertEmits } from './OrionAlertSetupService';
const emits = defineEmits<OrionAlertEmits>() as OrionAlertEmits;

const props = withDefaults(defineProps<OrionAlertProps>(), OrionAlertSetupService.defaultProps);

const setup = new OrionAlertSetupService(props, emits);

defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the alert
 * @doc/fr slot/default contenu de l'alerte
 * @doc slot/actions actions of the alert
 * @doc/fr slot/actions actions de l'alerte
 */
</script>
