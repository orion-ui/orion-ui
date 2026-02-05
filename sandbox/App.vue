<template>
	<router-view/>
</template>

<style lang="less">
.orion-page {
	padding-bottom: 4rem;
}

.flex-inline {
	display: flex;
	flex-wrap: wrap;
	gap: 0.75rem;
	padding: 1rem;
}

.orion-aside-background-content {
	will-change: transform;
	transform-origin: top right;
	transform: scale(1);
	transition: transform 0.4s cubic-bezier(0.24, 0.63, 0.76, 0.98);

	&--zoomout {
		transform: scale(0.95);
	}
}

pre {
	overflow: auto;
}
</style>
