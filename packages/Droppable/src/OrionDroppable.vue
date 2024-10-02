<template>
	<component
		:is="setup.tag"
		v-bind="$attrs"
		:id="`orion-droppable-${setup.uid}`"
		:ref="setup._el"
		class="orion-droppable"
		:class="{
			'orion-droppable--allowed': setup.isDragging && setup.canDrop && setup.canHandle,
			'orion-droppable--forbidden': setup.isDragging && !setup.canDrop,
			'orion-droppable--over': setup.isDraggingOver && setup.canDrop,
		}">
		<slot/>
		<div class="orion-droppable-dropzone"/>
	</component>
</template>

<script setup lang="ts">
import { inject, provide } from 'vue';
import './OrionDroppable.less';
import OrionDroppableSetupService from './OrionDroppableSetupService';
import type { OrionDroppableProps, OrionDroppableEmits, DataListItem } from './OrionDroppableSetupService';
const emits = defineEmits<OrionDroppableEmits>() as OrionDroppableEmits;
const props = withDefaults(defineProps<OrionDroppableProps>(), OrionDroppableSetupService.defaultProps);
const datalist = defineModel<Undef<DataListItem[]>>('datalist');
const _aside = inject<OrionAside>('_aside');
const _modal = inject<OrionModal>('_modal');
const setup = new OrionDroppableSetupService(props, emits, datalist, _modal, _aside);
provide('_droppable', setup.publicInstance);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default The content of the component
 * @doc/fr slot/default Contenu du composant
 *
 * @doc event/dropIn/desc Emitted when the draggable item is dropped in a zone
 * @doc/fr event/dropIn/desc émis quand un élément est déposé dans une zone de drop
 *
 * @doc event/dragOver/desc Emitted when the draggable item enters in a droppable zone
 * @doc/fr event/dragOver/desc émis quand un élément entre dans une zone de drop
 *
 * @doc event/dragLeave/desc Emitted when the draggable item leaves a droppable zone
 * @doc/fr event/dragLeave/desc émis quand un élément quitte une zone de drop
 *
 * @doc event/reorder/desc Emitted when the draggable item is dropped in its origin area
 * @doc/fr event/reorder/desc émis quand un élément est relaché dans la zone dont il provient
 *
 * @doc event/dropOut/desc Emitted when the draggable item is droped outside a droppable zone
 * @doc/fr event/dropOut/desc émis quand un élément est laché en dehors d'une zone de drop
 *
 * @doc event/update:datalist/desc Emitted to update the datalist
 * @doc/fr event/update:datalist/desc émis pour mettre à jour la liste d'élément du composant
 */
</script>
