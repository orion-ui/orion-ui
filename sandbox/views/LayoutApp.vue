<template>
	<o-layout
		v-bind="LayoutConfig"
		class="main-layout">
		<template #navTopLeft>
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
		</template>

		<!-- <template #nav-main-append="{ item }">
			<o-icon
				v-if="!item.children?.length"
				class="test-append-icon"
				icon="snapchat"
				@click.prevent="logIt()"/>
		</template> -->

		<!-- <the-julie-tour ref="_tour"/>
		<tour-aside/> -->

		<router-view/>
	</o-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import packagesNavigation from 'sandbox/utils/packages-navigation';
import { setThemeMode } from 'lib';

const navMain: OrionNavMain.Props = {
	items: [
		{
			label: `Home`,
			root: true,
			to: '/',
			icon: 'home_alt_fill',
		},
		{
			label: `Sandbox`,
			sectionTitle: true,
		},
		{
			label: `Sandbox JB`,
			icon: 'app_store',
			expand: false,
			children: [
				{
					label: `DocNodeScript`,
					to: { name: 'DocNodeScript' },
					icon: 'Sketch',
					wrapperClass: 'sandbox-jb',
				},
				{
					label: `NestedInNotif`,
					to: { name: 'NestedInNotif' },
					icon: 'Sketch',
					wrapperClass: 'sandbox-jb',
				},
				{
					label: `Palette`,
					to: { name: 'Palette' },
					icon: 'Sketch',
					wrapperClass: 'sandbox-jb',
				},
				{
					label: `Bus`,
					to: { name: 'Bus' },
					icon: 'Sketch',
					wrapperClass: 'sandbox-jb',
				},
			],
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
	navTop: { items: [ ...packagesNavigation.slice(0, 3) ] },
	navTabs: {
		navAside: { navMain },
		items: [ ...packagesNavigation.slice(0, 4) ],
	},
}));

function logIt () {
	console.log('logged');
}
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

.test-append-icon {
	color: red;
	&:hover {
		color: blue;
	}
}
</style>
