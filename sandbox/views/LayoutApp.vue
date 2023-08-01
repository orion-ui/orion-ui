<template>
	<o-layout
		v-bind="LayoutConfig"
		class="main-layout">
		<template #nav-top-left>
			Orion v1

			<o-button @click="setThemeMode('light')">
				light theme
			</o-button>
			<o-button @click="setThemeMode('dark')">
				dark theme
			</o-button>
			<o-button
				id="auto-theme"
				v-tooltip="`OS theme`"
				@click="setThemeMode('auto')">
				auto theme
			</o-button>

			<div class="language">
				LANGUAGE:
				<o-radio
					v-model="lang"
					label="EN"
					input-value="en"/>
				<o-radio
					v-model="lang"
					label="FR"
					input-value="fr"/>
			</div>
		</template>
		<router-view/>
	</o-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import packagesNavigation from 'sandbox/utils/packages-navigation';
import { setThemeMode, getAppLang, setAppLang } from 'lib';

const navMain: OrionNavMain.Props = {
	items: [
		{
			label: `Home`,
			root: true,
			to: '/',
			icon: 'home_alt_fill',
		},
		{
			label: `test callback`,
			icon: 'alarm',
			// eslint-disable-next-line no-console
			callback: (item, ev) => console.log(item, ev),
			if: () => false,
		},
		{
			label: `Sandbox`,
			sectionTitle: true,
		},
		{
			label: `Services`,
			icon: 'note',
			replace: true,
			children: [
				{
					label: `Validation`,
					to: { name: 'ValidationService' },
					icon: 'cupcake',
				},
				{
					label: `Prompt`,
					to: { name: 'PromptService' },
					icon: 'cupcake',
				},
				{
					label: `DragNDrop`,
					to: { name: 'DragNDropService' },
					icon: 'cupcake',
				},
			],
		},
		{
			label: `Components`,
			sectionTitle: true,
		},
		...packagesNavigation,
	],
};

const LayoutConfig = computed<Orion.LayoutConfig>(() => ({
	navMain,
	navTop: {
		items: [
			{
				label: `test callback`,
				icon: 'alarm',
				// eslint-disable-next-line no-console
				callback: (item, ev) => console.log(item, ev),
				if: () => false,
			},
			...packagesNavigation.slice(0, 3) ],
	},
	navTabs: {
		navAside: { navMain },
		items: [
			{
				label: `test callback`,
				icon: 'alarm',
				// eslint-disable-next-line no-console
				callback: (item, ev) => console.log(item, ev),
				if: () => false,
			},
			...packagesNavigation.slice(0, 4),
		],
	},
}));

const lang = computed({
	get: () => getAppLang(),
	set: val => setAppLang(val),
});
</script>

<style lang="less">
.orion-nav-top__slot-left {
	display: flex;
	align-items: center;
	gap: 10px;
}
</style>

<style lang="less" scoped>
.navigation {
	display: flex;
	gap: 10px;
	padding: 20px 30px;

	> a {
		font-weight: 600;
		color: var(--info);

		&.router-link-exact-active {
			color: var(--warning-alt);
		}
	}
}

.language {
	display: flex;
	align-items: center;
	font-size: 0.85rem;
	font-weight: normal;
	gap: 0.5rem;
	margin-left: 0.5rem;
}

.test-append-icon {
	color: red;
	&:hover {
		color: blue;
	}
}
</style>
