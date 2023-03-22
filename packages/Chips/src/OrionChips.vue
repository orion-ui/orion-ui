<template>
	<span
		:ref="setup._el"
		class="orion-chips"
		:class="[
			`orion-chips--${setup.props.color}`,
			`orion-chips--${setup.props.size}`,
			{ 'orion-chips--outline' : setup.props.outline },
			{ 'orion-chips--closable' : setup.props.close },
			{ 'orion-chips--dual' : !!$slots.dual },
		]">
		<span class="orion-chips__main">
			<slot/>
		</span>

		<span
			v-if="$slots.dual"
			class="orion-chips__dual">
			<div class="orion-chips__dual-content">
				<slot name="dual"/>
			</div>
		</span>

		<span
			v-if="setup.props.close"
			class="orion-chips__close"
			@click="$emit('close')"
			@touchend.prevent.stop="$emit('close')"/>
	</span>
</template>

<script setup lang="ts">
import './OrionChips.less';
import OrionChipsSetupService from './OrionChipsSetupService';
const props = defineProps(OrionChipsSetupService.props);
const setup = new OrionChipsSetupService(props);
defineEmits<{(e: 'close'): void}>();
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default The content of the chips
 * @doc/fr slot/default Contenu de la chips
 *
 * @doc slot/dual The content of the second half of the chips
 * @doc/fr slot/dual Contenu de la seconde partie de la chips
 *
 * @doc event/close/desc Emitted when closing the chips
 * @doc/fr event/close/desc Émis lors de la fermeture de la chips
 */
</script>
