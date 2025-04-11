<template>
	<div
		:ref="setup._el"
		class="orion-progress-circle"
		:class="`orion-progress-circle--${color}`"
		:style="{
			flex: `0 0 calc(${size}rem / 16)`,
			width: `calc(${size}rem / 16)`,
			height: `calc(${size}rem / 16)`,
			fontSize: `calc(${size}rem / 16)`,
		}">
		<svg
			class="orion-progress-circle__path"
			:viewBox="`0 0 ${size} ${size}`">
			<circle
				:cx="setup.coord"
				:cy="setup.coord"
				:r="setup.radius"
				:stroke-width="pathWidth"/>
		</svg>

		<svg
			class="orion-progress-circle__value"
			:viewBox="`0 0 ${size} ${size}`">
			<circle
				:cx="setup.coord"
				:cy="setup.coord"
				:r="setup.radius"
				:stroke-width="valueWidth"
				:stroke-dashoffset="setup.progress"
				:stroke-dasharray="`${setup.perimeter} ${setup.perimeter}`"/>
		</svg>

		<span class="orion-progress-circle__label">
			<slot>{{ label }}</slot>
		</span>
	</div>
</template>

<script setup lang="ts">
import './OrionProgressCircle.less';
import OrionProgressCircleSetupService from './OrionProgressCircleSetupService';
const emits = defineEmits<OrionProgressCircleEmits>() as OrionProgressCircleEmits;
import type { OrionProgressCircleProps, OrionProgressCircleEmits } from './OrionProgressCircleSetupService';
const props = withDefaults(defineProps<OrionProgressCircleProps>(), OrionProgressCircleSetupService.defaultProps);
const setup = new OrionProgressCircleSetupService(props, emits);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the label of the progress circle
 * @doc/fr slot/default le label du cercle
 */
</script>
