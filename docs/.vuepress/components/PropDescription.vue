<template>
	<div class="prop-description" :class="{ 'prop-description--deprecated': !!deprecated }">
		<div class="prop-description__header">
			<span class="prop-description__name">{{ name }}</span>
			<code>
				<span v-if="type">{{ type }}</span>
				<span v-if="type && value"> : </span>
				<span v-if="value" class="prop-description__value">{{ value }}</span>
			</code>
		</div>

		<div v-if="!!deprecated" class="prop-description__deprecated">
			<code>deprecated</code>
			<span>{{ deprecated }}</span>
		</div>
		
		<div class="prop-description__description">
			<slot/>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		default: undefined,
	},
	value: {
		type: [String, Number],
		default: undefined,
	},
	deprecated: {
		type: String,
		default: undefined,
	}
})
</script>

<style scoped lang="less">
.prop-description {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	padding: var(--fluid-15px);
	border-top: 0.125rem solid var(--border-neutral-minimal);
	border-bottom: 0.125rem solid var(--border-neutral-minimal);

	& + & {
		margin-top: -0.125rem;
	}

	&__header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 800;
		font-size: 0.75rem;
		line-height: 1.25rem;
	}
	
	&__name {
		font-family: var(--font-family-code);
		color: var(--text-info-default);

		.prop-description--deprecated & {
			color: var(--text-warning-default);
		}
	}

	&__value {
		color: var(--text-neutral-default);
	}
	
	&__description {
		color: var(--text-neutral-default);

		:deep(p) {
			font-size: var(--size-default);
		}
		
		:deep(strong) {
			color: var(--text-neutral-default);
		}

		:deep(p:last-child) {
			margin-bottom: 0;
		}
	}

	&__deprecated {
		display: flex;
		gap: 0.5rem;
		color: var(--text-warning-default);
		border: 1px solid var(--border-warning-subtle);
		border-radius: 0.25rem;
		padding: 0.25rem;

		code {
			color: var(--text-warning-default);
			background-color: var(--background-warning-subtle);
		}
	}
}

h2 + .prop-description {
	border-top: none;
}
</style>
