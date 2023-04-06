<template>
	<header
		id="nav-top"
		:ref="setup._el"
		:class="[
			setup.baseClass,
			{ 'orion-nav-top--overlay': setup.isSticky },
		]">
		<div
			v-if="$slots['nav-top-left']"
			class="orion-nav-top__slot-left">
			<slot name="nav-top-left"/>
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
				v-if="$slots['nav-top-additional']"
				class="orion-nav-top__slot-additional">
				<slot name="nav-top-additional"/>
			</div>
		</nav>

		<div
			v-if="$slots['nav-top-right']"
			class="orion-nav-top__slot-right">
			<slot
				name="nav-top-right"
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
