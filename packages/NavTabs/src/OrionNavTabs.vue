<template>
	<nav
		:ref="setup._el"
		:class="setup.baseClass">
		<template v-if="setup.itemsToDisplay.length">
			<component
				:is="setup.itemIs(item)"
				v-for="(item, i) in setup.itemsToDisplay"
				:key="i"
				v-bind="setup.itemData(item)"
				@click.prevent="setup.handleClick(item, $event)">
				<orion-icon
					v-if="item.icon || item.fontIcon"
					v-bind="item"/>
				{{ item.label }}
			</component>
		</template>

		<span
			v-if="navAside"
			class="orion-nav-tabs__item"
			@click.capture="setup.openAsideNav()">
			<orion-icon icon="bar_right"/>
			{{ setup.lang.MENU }}
		</span>

		<orion-aside
			v-if="navAside"
			:ref="setup._navAside"
			:options="{ size:'xs' }">
			<orion-nav-aside v-bind="navAside"/>
			<template #footer="{ close }">
				<div class="orion-nav-aside__footer">
					<orion-button
						suffix-icon="chevron_right"
						outline
						@click="close()">
						{{ setup.lang.CLOSE_MENU }}
					</orion-button>
				</div>
			</template>
		</orion-aside>
	</nav>
</template>

<script setup lang="ts">
import './OrionNavTabs.less';
import { OrionIcon } from 'packages/Icon';
import { OrionButton } from 'packages/Button';
import { OrionNavAside } from 'packages/NavAside';
import { OrionAside } from 'packages/Aside';
import OrionNavTabsSetupService from './OrionNavTabsSetupService';
import type { OrionNavTabsProps, OrionNavTabsEmits } from './OrionNavTabsSetupService';
const emits = defineEmits<OrionNavTabsEmits>() as OrionNavTabsEmits;
const props = withDefaults(defineProps<OrionNavTabsProps>(), OrionNavTabsSetupService.defaultProps);
const setup = new OrionNavTabsSetupService(props, emits);
defineExpose(setup.publicInstance);
</script>
