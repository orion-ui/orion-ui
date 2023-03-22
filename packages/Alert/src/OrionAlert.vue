<template>
	<div
		:ref="setup._el"
		class="orion-alert"
		:class="[
			`orion-alert--${setup.props.color}`,
			{ 'orion-alert--center': setup.props.center },
		]">
		<h5
			v-if="setup.props.title"
			class="orion-alert__title">
			{{ setup.props.title }}
		</h5>

		<span
			v-if="setup.props.close"
			class="orion-alert__close"
			@click="$emit('close')"
			@touchend.prevent.stop="$emit('close')"/>

		<div class="orion-alert__contrast">
			<slot/>
		</div>
	</div>
</template>

<script setup lang="ts">
import './OrionAlert.less';
import OrionAlertSetupService from './OrionAlertSetupService';
const props = defineProps(OrionAlertSetupService.props);
const setup = new OrionAlertSetupService(props);
defineEmits<{(e: 'close'): void}>();
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the alert
 * @doc/fr slot/default contenu de l'alerte
 *
 * @doc event/close/desc emitted when closing the alert
 * @doc/fr event/close/desc émis lors de la fermeture de l'alerte
 */
</script>
