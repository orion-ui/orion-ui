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
 * @doc vModel/datalist datas of the component
 * @doc/fr vModel/datalist liste d'objets du composant
 *
 * @doc slot/default The content of the component
 * @doc/fr slot/default Contenu du composant
 */
</script>
