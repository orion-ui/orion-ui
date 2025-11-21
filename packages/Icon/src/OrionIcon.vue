<template>
	<div
		:ref="setup._el"
		class="orion-icon icon"
		:class="[
			loading ? null : `${fontIcon ?? ``}`,
			ripple ? `orion-icon--ripple orion-icon--ripple-${ripple}` : '',
			button ? `orion-icon--button orion-icon--button-${button}` : '',
			{ 'orion-icon--clickable': setup.isClickable },
		]"
		@click="setup.handleClick($event)"
		@touchend="setup.handleClick($event)">
		<span
			v-if="icon && !loading"
			:class="`material-icons-${getIconStyle()}`">{{ icon }}</span>
		<svg
			v-if="loading"
			:ref="setup._elSpinner"
			class="orion-icon__loading"
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			xmlns:svgjs="http://svgjs.com/svgjs"
			viewBox="0 0 24 24">
			<g>
				<path
					d="M 16.5,22.038c-5.544,2.485-12.052,0.005-14.537-5.539S1.959,4.447,7.503,1.962C8.917,1.328,10.45,1,12,1 "
					fill="none"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"/>
				<path
					d="M 18.684,3.262c0.246,0.187,0.483,0.386,0.712,0.593c0.229,0.207,0.449,0.426,0.659,0.652 "
					fill="none"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"/>
				<path
					d="M 21.75,6.905 c0.143,0.274,0.275,0.554,0.394,0.839c0.119,0.285,0.227,0.575,0.322,0.869 "
					fill="none"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"/>
				<path
					d="M 22.989,11.5c0.014,0.309,0.014,0.618,0,0.927 c-0.013,0.308-0.038,0.617-0.076,0.923 "
					fill="none"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"/>
				<path
					d="M 22.169,16.193c-0.118,0.286-0.248,0.566-0.39,0.841c-0.142,0.275-0.295,0.543-0.458,0.806 "
					fill="none"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"/>
				<path
					d="M 15.286,1.5c0.321,0.1,0.635,0.214,0.943,0.343 "
					fill="none"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"/>
				<path
					d="M 19.725,19.829c-0.237,0.234-0.485,0.458-0.743,0.669 "
					fill="none"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"/>
				<path
					class="orion-icon__loading-inner"
					d="M 12,4c4.418,0,8,3.582,8,8 s-3.582,8-8,8s-8-3.582-8-8"
					fill="none"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"/>
			</g>
		</svg>
		<span
			v-if="ripple"
			:ref="setup._elRipple"
			class="orion-icon__ripple">
			<span class="ripple__wave"/>
		</span>
		<span
			v-if="button"
			class="orion-icon__button"/>
		<span
			v-if="marker"
			class="orion-icon__marker"
			:class="[
				`orion-icon__marker--${markerColor}`,
				{ 'orion-icon__marker--number': typeof marker === 'number' },
				{ 'orion-icon__marker--clickable': !!setup.onMarkerClick },
				setup.positionClass,
			]"
			@click="setup.handleMarkerClick($event)">
			{{ typeof marker === 'number' ? marker : null }}
		</span>
	</div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
import './OrionIcon.less';
import OrionIconSetupService from './OrionIconSetupService';
import type { OrionIconProps, OrionIconEmits } from './OrionIconSetupService';
import { getIconStyle } from 'lib';
const attrs = useAttrs();
const emits = defineEmits<OrionIconEmits>() as OrionIconEmits;
const props = withDefaults(defineProps<OrionIconProps>(), OrionIconSetupService.defaultProps);
const setup = new OrionIconSetupService(props, emits, attrs);

defineExpose(setup.publicInstance);

</script>
