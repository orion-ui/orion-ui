<template>
	<router-view/>
</template>

<style lang="less">
.orion-page {
	padding-bottom: 60px;
}

.flex-inline {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	padding: 15px;
}

.orion-aside-background-content {
	transition: transform 0.4s cubic-bezier(0.24, 0.63, 0.76, 0.98);
	will-change: transform;
	transform: scale(1);
	transform-origin: top right;

	&--zoomout {
		transform: scale(0.95);
	}
}

pre {
	overflow: auto;
}
</style>
