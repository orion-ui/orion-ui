<template>
	<span
		:ref="setup._el"
		class="orion-chips"
		:class="[
			`orion-chips--${color}`,
			`orion-chips--${size}`,
			{ 'orion-chips--outline' : outline },
			{ 'orion-chips--closable' : close },
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
			v-if="close"
			class="orion-chips__close"
			@click="emits('close')"
			@touchend.prevent.stop="emits('close')"/>
	</span>
</template>

<script setup lang="ts">
import './OrionChips.less';
import OrionChipsSetupService from './OrionChipsSetupService';
import type { OrionChipsProps, OrionChipsEmits } from './OrionChipsSetupService';
const emits = defineEmits<OrionChipsEmits>() as OrionChipsEmits;
const props = withDefaults(defineProps<OrionChipsProps>(), OrionChipsSetupService.defaultProps);
const setup = new OrionChipsSetupService(props, emits);

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
