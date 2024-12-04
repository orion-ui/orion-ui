<template>
	<orion-nav-main
		v-if="navMain"
		class="orion-nav-main--aside"
		:items="navMain.items"
		v-bind="{ navTop: navTop }"/>
</template>

<script setup lang="ts">
import './OrionNavAside.less';
import { inject } from 'vue';
import { OrionNavMain } from 'packages/NavMain';
import OrionNavAsideSetupService from './OrionNavAsideSetupService';
import type { OrionNavAsideEmits, OrionNavAsideProps } from './OrionNavAsideSetupService';
const _aside = inject<OrionAside>('_aside');
const emits = defineEmits<OrionNavAsideEmits>() as OrionNavAsideEmits;
const props = withDefaults(defineProps<OrionNavAsideProps>(), OrionNavAsideSetupService.defaultProps);
const setup = new OrionNavAsideSetupService(props, emits, _aside);
defineExpose(setup.publicInstance);
</script>
