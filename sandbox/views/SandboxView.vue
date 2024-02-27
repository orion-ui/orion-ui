<template>
	<section class="sandbox-view">
		<component
			:is="targetComponent"
			v-if="route.params.sandbox"/>
	</section>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const targetComponent = computed(() => defineAsyncComponent(() => import(/* @vite-ignore */ `./sandbox-${route.params.sandbox}/HomeView.vue`)));
</script>

<style scoped lang="less">

</style>
