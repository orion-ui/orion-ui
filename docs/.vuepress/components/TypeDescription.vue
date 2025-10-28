<template>
	<div class="type-description">
		<slot/>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.type-description {
	border: 0.125rem solid var(--border-neutral-default);
	padding: var(--fluid-15px);
	border-radius: 0.5rem;

	> :deep(div[class*="language-"]) {
		> pre {
			margin: 0;
		}

		+ .prop-description {
			margin-top: 0.5rem;
			border-top: none;
		}
	}

	> :deep(.prop-description) {
		&:last-child {
			border-bottom: none;
			padding-bottom: 0;
		}
	}
}
</style>
