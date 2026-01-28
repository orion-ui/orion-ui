<template>
	<transition name="fade">
		<div
			v-show="visible || setup.forceVisible"
			:ref="setup._el"
			class="orion-loader"
			:class="[
				`orion-loader--${size}`,
				`orion-loader--${color}`,
				{ 'orion-loader--main': global },
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
import { OrionLoaderSetup, type OrionLoaderEmits, type OrionLoaderProps } from './OrionLoaderSetup';
const emits = defineEmits<OrionLoaderEmits>() as OrionLoaderEmits;
const props = withDefaults(defineProps<OrionLoaderProps>(), OrionLoaderSetup.defaultProps);
const setup = new OrionLoaderSetup(props, emits);
defineExpose(setup.publicInstance);
</script>
