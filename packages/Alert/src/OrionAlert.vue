<template>
	<div
		:ref="setup._el"
		class="orion-alert"
		:class="[
			`orion-alert--${color}`,
			{ 'orion-alert--center': center },
		]">
		<h5
			v-if="title"
			class="orion-alert__title">
			{{ title }}
		</h5>

		<span
			v-if="close"
			class="orion-alert__close"
			@click="emits('close')"
			@touchend.prevent.stop="emits('close')"/>

		<div class="orion-alert__contrast">
			<slot/>
		</div>
	</div>
</template>

<script setup lang="ts">
import './OrionAlert.less';
import OrionAlertSetupService from './OrionAlertSetupService';
import type { OrionAlertProps, OrionAlertEmits } from './OrionAlertSetupService';
const emits = defineEmits<OrionAlertEmits>() as OrionAlertEmits;
const props = withDefaults(defineProps<OrionAlertProps>(), OrionAlertSetupService.defaultProps);
const setup = new OrionAlertSetupService(props, emits);

defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the alert
 * @doc/fr slot/default contenu de l'alerte
 *
 * @doc event/close/desc emitted when closing the alert
 * @doc/fr event/close/desc émis lors de la fermeture de l'alerte
 */
</script>
