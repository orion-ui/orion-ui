<template>
	<div
		:ref="setup._el"
		class="orion-progress-bar"
		:class="`orion-progress-bar--${color}`">
		<div
			class="orion-progress-bar__path"
			:style="{
				height: `calc(${width}rem / 16)`,
				borderRadius: `calc(${width}rem / 16)`,
			}">
			<div
				class="orion-progress-bar__value"
				:style="{
					width: value + '%',
					borderRadius: `calc(${width}rem / 16)`,
				}">
				<span class="orion-progress-bar__label">
					<slot>{{ label }}</slot>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import './OrionProgressBar.less';
import OrionProgressBarSetupService from './OrionProgressBarSetupService';
import type { OrionProgressBarProps, OrionProgressBarEmits } from './OrionProgressBarSetupService';
const emits = defineEmits<OrionProgressBarEmits>() as OrionProgressBarEmits;
const props = withDefaults(defineProps<OrionProgressBarProps>(), OrionProgressBarSetupService.defaultProps);
const setup = new OrionProgressBarSetupService(props, emits);
defineExpose(setup.publicInstance);
/** Doc
 * @doc slot/default the label of the progress bar
 * @doc/fr slot/default le label de la barre de progression
 */
</script>
