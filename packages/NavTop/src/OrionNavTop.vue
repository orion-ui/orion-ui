<template>
	<header
		id="nav-top"
		:ref="setup._el"
		:class="[
			setup.baseClass,
			{ 'orion-nav-top--overlay': setup.isSticky },
		]">
		<div
			v-if="$slots.navTopLeft"
			class="orion-nav-top__slot-left">
			<slot name="navTopLeft"/>
		</div>
		<nav>
			<template v-if="setup.itemsToDisplay.length">
				<component
					:is="setup.itemIs(item)"
					v-for="(item, i) in setup.itemsToDisplay"
					:key="i"
					v-bind="setup.itemData(item)"
					@click.prevent="setup.handleClick(item)"
					@touchstart.prevent="setup.handleClick(item)">
					<span class="orion-nav-top__item-label">
						{{ item.label }}
					</span>

					<orion-icon
						v-if="item.icon || item.fontIcon"
						v-bind="item"/>
				</component>
			</template>

			<div
				v-if="$slots.navTopAdditional"
				class="orion-nav-top__slot-additional">
				<slot name="navTopAdditional"/>
			</div>
		</nav>

		<div
			v-if="$slots.navTopRight"
			class="orion-nav-top__slot-right">
			<slot
				name="navTopRight"
				class="orion-nav-top__slot-right"/>
		</div>
	</header>
</template>

<script setup lang="ts">
import './OrionNavTop.less';
import { OrionIcon } from 'packages/Icon';
import OrionNavTopSetupService from './OrionNavTopSetupService';
const props = defineProps(OrionNavTopSetupService.props);
const setup = new OrionNavTopSetupService(props);
defineExpose(setup.publicInstance);
</script>
