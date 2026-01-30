<template>
	<pre style="margin: 0 0.5rem;">LayoutPackages</pre>

	<router-view/>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">
.test-grid {
	max-width: 45rem;

	> div {
		aspect-ratio: 1;
		background: lime;
	}
}
</style>
