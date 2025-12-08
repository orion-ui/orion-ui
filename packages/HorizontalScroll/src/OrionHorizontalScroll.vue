<template>
	<div :ref="setup._el">
		<div
			class="orion-horizontal-scroll"
			:class="[
				{ 'orion-horizontal-scroll--show-left-shadow' : setup.showLeftShadow },
				{ 'orion-horizontal-scroll--show-right-shadow' : setup.showRightShadow },
				`orion-horizontal-scroll--${setup.shadowColor}`,
				{ 'orion-horizontal-scroll--drop-shadow' : setup.dropShadow },
			]"
			v-bind="$attrs"
			@touchmove="setup.handleDragScroll($event)"
			@mousemove="setup.handleDragScroll($event)"
			@touchend="setup.resetDragScroll()"
			@mouseup="setup.resetDragScroll()">
			<div
				v-if="setup.showLeftShadow && !hideButton"
				class="orion-horizontal-scroll__button orion-horizontal-scroll__button--left">
				<orion-icon
					:button="setup.dropShadow ? `default` : undefined"
					icon="chevron_left"
					@click="setup.slide('left')"/>
			</div>
			<div
				v-if="setup.showRightShadow && !hideButton"
				class="orion-horizontal-scroll__button orion-horizontal-scroll__button--right">
				<orion-icon
					:button="setup.dropShadow ? `default` : undefined"
					icon="chevron_right"
					@click="setup.slide('right')"/>
			</div>

			<div
				id="slider"
				:ref="setup._slider"
				class="orion-horizontal-scroll__slider"
				@wheel="setup.handleWheel($event)"
				@scroll.capture="setup.handleScroll($event)">
				<slot/>
			</div>
		</div>
		<div
			v-if="targets"
			class="orion-horizontal-scroll__preview">
			<span
				class="orion-horizontal-scroll__preview-legend"
				@click="setup.slide('left')">{{ setup.lang.ORION_HORIZONTAL_SCROLL__LEFT.toLowerCase() }}</span>
			<div
				:ref="setup._previewContainer"
				class="orion-horizontal-scroll__preview-visible">
				<span>{{ setup.lang.ORION_HORIZONTAL_SCROLL__VISIBLE.toLowerCase() }}</span>
				<div
					v-if="setup.visibilityValues.length"
					class="orion-horizontal-scroll__preview-container">
					<div
						v-for="(element, index) of setup.elements"
						:key="index"
						class="orion-horizontal-scroll__preview-path"
						:style="{
							width: `calc(${element.getBoundingClientRect().width} * ${setup.pourcentage}px)`,
							background: setup.visibilityValues[index].isHidingLeft
								? `linear-gradient(
								to left,
								var(--info) ${setup.visibilityValues[index].visibility}%,
								var(--grey) 0%
							)`
								: `linear-gradient(
								to right,
								var(--info) ${setup.visibilityValues[index].visibility}%,
								var(--grey) 0%
							)`,
						}"
						@click="setup.scrollTo(element)"/>
				</div>
			</div>
			<span
				class="orion-horizontal-scroll__preview-legend"
				@click="setup.slide('right')">{{ setup.lang.ORION_HORIZONTAL_SCROLL__RIGHT.toLowerCase() }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import './OrionHorizontalScroll.less';
import { OrionIcon } from 'packages/Icon';
import OrionHorizontalScrollSetupService from './OrionHorizontalScrollSetupService';
const emits = defineEmits<OrionHorizontalScrollEmits>() as OrionHorizontalScrollEmits;
import type { OrionHorizontalScrollProps, OrionHorizontalScrollEmits } from './OrionHorizontalScrollSetupService';
const props = withDefaults(defineProps<OrionHorizontalScrollProps>(), OrionHorizontalScrollSetupService.defaultProps);
const setup = new OrionHorizontalScrollSetupService(props, emits);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default The content of the scroll
 * @doc/fr slot/default Contenu du composant
 */
</script>
