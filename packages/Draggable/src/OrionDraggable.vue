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

type DraggableEmit = {
	(e: 'update:disabled', payload: boolean): void;
}

const props = defineProps(OrionDraggableSetupService.props);
const _aside = inject<OrionAside>('_aside');
const _modal = inject<OrionAside>('_modal');
const _droppable = inject<OrionDroppable>('_droppable');
const emit = defineEmits<DraggableEmit>();
const setup = new OrionDraggableSetupService(props, emit, _droppable, _aside, _modal);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the draggable component
 * @doc/fr slot/default contenu de l'élément
 */
</script>
