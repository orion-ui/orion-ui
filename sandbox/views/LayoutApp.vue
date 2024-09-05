<template>
	<o-layout
		v-bind="LayoutConfig"
		class="main-layout">
		<template #nav-top-left>
			Orion v1
		</template>

		<div class="flex fw-w g-xs mb-md">
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
		</div>
		<o-period
			:begin="new Date()"
			:end="new Date()"
			color="danger"/>

		<span @click="console.log(tmpTasks)">
			Orion Planning
		</span>
		<o-planning
			v-model:date-range="tmpDateRange"
			:day-start="new Date('2024-08-01T00:00:00')"
			:day-end="new Date('2024-10-30T00:00:00')"
			:date="date"
			:items="tmpTasks">
			<template #periodContent="{ item }">
				<span>
					{{ item.label }}
				</span>
			</template>
		</o-planning>

		<router-view/>
	</o-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import packagesNavigation from 'sandbox/utils/packages-navigation';
import { setThemeMode, getAppLang, setAppLang, getUid } from 'lib';

let tmpDateRange = ref('month' as Orion.Planning.DateRangeType);

const date = new Date('2024-09-11T00:00:00');

const tmpTasks = [{
	id: getUid(),
	begin: new Date('2024-09-12T00:00:00'),
	end: new Date('2024-09-18T00:00:00'),
	label: 'vacances',
	color: 'info',
}, {
	id: getUid(),
	begin: new Date('2024-09-14T00:00:00'),
	end: new Date('2024-09-26T00:00:00'),
	label: '2xko',
	color: 'brand',
	subItem: {
		id: getUid(),
		begin: new Date('2024-09-27T00:00:00'),
		end: new Date('2024-09-29T00:00:00'),
		label: 'Sub2xko',
		color: 'brand',
	},
}, {
	id: getUid(),
	begin: new Date('2024-09-09T00:00:00'),
	end: new Date('2024-09-11T00:00:00'),
	label: 'last',
	color: 'warning',
}, {
	id: getUid(),
	begin: new Date('2024-09-15T00:00:00'),
	end: new Date('2024-09-30T00:00:00'),
	label: 'last',
	color: 'pink',
}] as Array<Orion.Planning.Item>;

const navMain: OrionNavMain.Props = {
	items: [
		{
			label: `Home`,
			root: true,
			to: '/',
			icon: 'house_01',
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
			// replace: true,
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
