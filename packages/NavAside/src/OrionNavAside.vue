<template>
	<orion-nav-main
		v-if="setup.props.navMain"
		class="orion-nav-main--aside"
		:items="setup.props.navMain.items"
		v-bind="{ navTop: setup.props.navTop }"/>
</template>

<script setup lang="ts">
import './OrionNavAside.less';
import { inject } from 'vue';
import { OrionNavMain } from 'packages/NavMain';
import OrionNavAsideSetupService from './OrionNavAsideSetupService';
const _aside = inject<OrionAside>('_aside');
const props = defineProps(OrionNavAsideSetupService.props);
const setup = new OrionNavAsideSetupService(props, _aside);
defineExpose(setup.publicInstance);
</script>
