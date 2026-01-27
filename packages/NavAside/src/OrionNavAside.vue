<template>
	<orion-nav-main
		v-if="navMain"
		class="orion-nav-main--aside"
		:items="navMain.items"
		v-bind="{ navTop: navTop }"/>
</template>

<script setup lang="ts">
import { OrionNavMain } from 'packages/NavMain';
import { inject } from 'vue';
import './OrionNavAside.less';
import type { OrionNavAsideEmits, OrionNavAsideProps } from './OrionNavAsideSetup';
import OrionNavAsideSetup from './OrionNavAsideSetup';
const _aside = inject<OrionAside>('_aside');
const emits = defineEmits<OrionNavAsideEmits>() as OrionNavAsideEmits;
const props = withDefaults(defineProps<OrionNavAsideProps>(), OrionNavAsideSetup.defaultProps);
const setup = new OrionNavAsideSetup(props, emits, _aside);
defineExpose(setup.publicInstance);
</script>
