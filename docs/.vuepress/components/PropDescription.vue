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
	border-top: 0.125rem solid var(--grey-lighter);
	border-bottom: 0.125rem solid var(--grey-lighter);

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
		color: var(--info);

		.prop-description--deprecated & {
			color: var(--warning);
		}
	}

	&__value {
		color: var(--grey-darker);
	}
	
	&__description {
		color: var(--grey-dark);

		:deep(p) {
			font-size: var(--size-default);
		}
		
		:deep(strong) {
			color: var(--grey-darker);
		}

		:deep(p:last-child) {
			margin-bottom: 0;
		}
	}

	&__deprecated {
		display: flex;
		gap: 0.5rem;
		color: var(--warning);
		border: 1px solid var(--warning-light);
		border-radius: 0.25rem;
		padding: 0.25rem;

		code {
			color: var(--warning);
			background-color: var(--warning-light);
		}
	}
}

h2 + .prop-description {
	border-top: none;
}
</style>
