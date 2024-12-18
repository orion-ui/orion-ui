<template>
	<transition name="fade">
		<div
			v-show="setup.props.visible || setup.forceVisible"
			:ref="setup._el"
			class="orion-loader"
			:class="[
				`orion-loader--${setup.props.size}`,
				`orion-loader--${setup.props.color}`,
				{ 'orion-loader--main': setup.props.global },
			]">
			<div class="orion-loader__spinner">
				<orion-icon loading/>
			</div>
			<div
				v-if="setup.text"
				class="orion-loader__text">
				{{ setup.text }}
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
import { OrionIcon } from 'packages/Icon';
import './OrionLoader.less';
import OrionLoaderSetupService from './OrionLoaderSetupService';
const props = defineProps(OrionLoaderSetupService.props);
const setup = new OrionLoaderSetupService(props);
defineExpose(setup.publicInstance);
</script>
