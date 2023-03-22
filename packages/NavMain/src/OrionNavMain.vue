<template>
	<nav
		:ref="setup._el"
		:class="setup.baseClass"
		@mouseup="setup.checkIfReloadIsNeeded($event)">
		<div
			:ref="setup._wrapper"
			class="orion-nav-main__wrapper">
			<div
				:key="setup.ui.token"
				:ref="setup._children"
				class="orion-nav-main__children">
				<orion-nav-main-item
					v-for="(navItem, i) in setup.itemsToDisplay"
					:key="`main_${i}_${setup.getUid()}`"
					:data-index="i"
					:item="navItem"
					@click-label="setup.handleClick(navItem)"
					@touchstart.prevent="setup.handleClick(navItem)">
					<template #prepend="{ item }">
						<slot
							name="prepend"
							v-bind="{ item }"/>
					</template>
					<template #default="{ item }">
						<slot v-bind="{ item }">{{ item.label }}</slot>
					</template>
					<template #append="{ item }">
						<slot
							name="append"
							v-bind="{ item }"/>
					</template>
				</orion-nav-main-item>

				<template v-if="navTop && setup.itemsToDisplayTop?.length">
					<hr>
					<orion-nav-main-item
						v-for="(item, i) in setup.itemsToDisplayTop"
						:key="'top' + i"
						v-bind="{ item }"
						@click.prevent="setup.handleClick(item)"/>
				</template>
			</div>
		</div>

		<img
			v-if="logo && setup.responsive.onTabletLandscape"
			class="orion-nav-main__logo"
			:src="logo">
	</nav>
</template>

<script setup lang="ts">
import './OrionNavMain.less';
import { OrionNavMainItem } from 'packages/NavMainItem';
import OrionNavMainSetupService from './OrionNavMainSetupService';
const props = defineProps(OrionNavMainSetupService.props);
const setup = new OrionNavMainSetupService(props);
defineExpose(setup.publicInstance);
</script>
