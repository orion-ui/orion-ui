<template>
	<div class="orion-toggle-button-group">
		<template
			v-for="(item, index) in setup.slotsItem"
			:key="index">
			<component
				:is="item"
				v-bind="{
					...childProps,
					...item.props,
				}"
				:model-value="setup.buttonIsActive(item)"
				:class="[
					'orion-toggle-button-group__item',
				]"
				@click.stop="setup.onButtonClick(item, $event)"/>
		</template>
	</div>
</template>

<script setup lang="ts">
import './OrionToggleButtonGroup.less';
import OrionToggleButtonGroupSetupService from './OrionToggleButtonGroupSetupService';
import type { OrionToggleButtonGroupProps, OrionToggleButtonGroupEmits } from './OrionToggleButtonGroupSetupService';
const emits = defineEmits<OrionToggleButtonGroupEmits>() as OrionToggleButtonGroupEmits;
const slots = defineSlots();
const props = withDefaults(defineProps<OrionToggleButtonGroupProps>(), OrionToggleButtonGroupSetupService.defaultProps);
const vModel = defineModel<string | number |(string | number)[]>({ default: [] });
const setup = new OrionToggleButtonGroupSetupService(props, emits, slots, vModel);
defineExpose(setup.publicInstance);
</script>
