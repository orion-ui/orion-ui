<template>
	<component
		:is="setup.tag"
		:id="`orion-draggable-${setup.uid}`"
		:ref="setup._el"
		v-bind="$attrs"
		class="orion-draggable"
		:class="{
			'orion-dragging': setup.isDragging,
			'orion-draggable--disabled': setup.disabled,
		}"
		@touchstart="setup.handleMouseDown($event)"
		@touchend="setup.handleMouseUp()"
		@mouseup.left="setup.handleMouseUp()"
		@mousedown.left="setup.handleMouseDown($event)">
		<slot/>
	</component>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import './OrionDraggable.less';
import OrionDraggableSetupService from './OrionDraggableSetupService';
import type { OrionDraggableProps, OrionDraggableEmits } from './OrionDraggableSetupService';
const emits = defineEmits<OrionDraggableEmits>() as OrionDraggableEmits;
const props = withDefaults(defineProps<OrionDraggableProps>(), OrionDraggableSetupService.defaultProps);
const _aside = inject<OrionAside>('_aside');
const _modal = inject<OrionAside>('_modal');
const _droppable = inject<OrionDroppable>('_droppable');

const setup = new OrionDraggableSetupService(props, emits, _droppable, _aside, _modal);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the draggable component
 * @doc/fr slot/default contenu de l'élément
 */
</script>
