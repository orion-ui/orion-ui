<template>
	<div
		:ref="setup._el"
		class="orion-swipe"
		@touchstart="setup.touchCallback()"
		@mouseenter="setup.handleHover()"
		@mouseleave="setup.handleHover(true)">
		<div
			v-if="$slots.actions"
			:ref="setup._actions"
			class="orion-swipe__actions"
			:class="`orion-swipe__actions--${setup.actionsPosition}`">
			<slot name="actions"/>
		</div>
		<div
			class="orion-swipe__content"
			:class="{ 'orion-swipe__content--swipe': setup.isTouch }"
			:style="`transform: translate3d(${setup.cssOffset}, 0, 0)`"
			@touchstart="setup.handleTouchStart($event)"
			@touchmove="setup.handleTouchMove($event)"
			@touchend="setup.handleTouchEnd()">
			<slot/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
import './OrionSwipe.less';
import OrionSwipeSetupService from './OrionSwipeSetupService';
import type { OrionSwipeProps, OrionSwipeEmits } from './OrionSwipeSetupService';
const slots = useSlots();
const emits = defineEmits<OrionSwipeEmits>() as OrionSwipeEmits;
const props = withDefaults(defineProps<OrionSwipeProps>(), OrionSwipeSetupService.defaultProps);
const setup = new OrionSwipeSetupService(props, emits, slots);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default content of the swipe
 * @doc/fr slot/default contenu du swipe
 *
 * @doc slot/actions actions of the swipe
 * @doc/fr slot/actions actions du swipe
 */
</script>
