<template>
	<div
		:ref="setup._el"
		class="orion-progress-bar"
		:class="`orion-progress-bar--${setup.props.color}`">
		<div
			class="orion-progress-bar__path"
			:style="{
				height: `calc(${setup.props.width}rem / 16)`,
				borderRadius: `calc(${setup.props.width}rem / 16)`,
			}">
			<div
				class="orion-progress-bar__value"
				:style="{
					width: setup.props.value + '%',
					borderRadius: `calc(${setup.props.width}rem / 16)`,
				}">
				<span class="orion-progress-bar__label">
					<slot>{{ setup.props.label }}</slot>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import './OrionProgressBar.less';
import OrionProgressBarSetupService from './OrionProgressBarSetupService';
const props = defineProps(OrionProgressBarSetupService.props);
const setup = new OrionProgressBarSetupService(props);
defineExpose(setup.publicInstance);
/** Doc
 * @doc slot/default the label of the progress bar
 * @doc/fr slot/default le label de la barre de progression
 */
</script>
