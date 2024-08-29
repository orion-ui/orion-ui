<template>
	<div class="orion-carousel-item">
		<div class="orion-carousel-item__content">
			<slot
				v-if="setup.shouldBeInDom"
				v-bind="{ isActive: setup.isActive }"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import './OrionCarouselItem.less';
import OrionCarouselItemSetupService from './OrionCarouselItemSetupService';
import type { OrionCarouselItemProps, OrionCarouselItemEmits } from './OrionCarouselItemSetupService';
const _carousel = inject<OrionCarousel>('_carousel');
const emits = defineEmits<OrionCarouselItemEmits>() as OrionCarouselItemEmits;
const props = withDefaults(defineProps<OrionCarouselItemProps>(), OrionCarouselItemSetupService.defaultProps);
const setup = new OrionCarouselItemSetupService(props, emits, _carousel);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the item
 * @doc/fr slot/default contenu de l'élément
 * @doc slot/default/isActive/type boolean
 * @doc slot/default/isActive/desc item is active
 * @doc/fr slot/default/isActive/desc l'élément est actif
 */
</script>
