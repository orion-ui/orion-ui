<template>
	<div class="flex g-24">
		<div>
			<o-toggle-button-group
				v-bind="state"
				v-model="vModel">
				<o-toggle-button :name="1">
					Option 1
				</o-toggle-button>
				<o-toggle-button :name="2">
					Option 2
				</o-toggle-button>
				<o-toggle-button :name="3">
					Option 3
				</o-toggle-button>
			</o-toggle-button-group>
		</div>
		<div class="flex-1">
			<o-card>
				<pre class="ma-0">Value: {{ vModel }}</pre>
			</o-card>
		</div>
	</div>

	<hr>

	<div class="flex fd-c g-24">
		<div class="row row--grid">
			<div class="col-sm-4">
				<o-toggle
					v-model="state.multiple"
					label="Multiple"
					@update:model-value="updateVModel()"/>
			</div>
			<div class="col-sm-4">
				<o-toggle
					v-model="state.childProps.nude"
					label="Nude"/>
			</div>
		</div>
		<div class="row row--grid">
			<div class="col-sm-4">
				<color-selection v-model="state.childProps.color"/>
			</div>
			<div class="col-sm-4">
				<size-selection
					v-model="state.childProps.size"
					:options="['sm', 'md']"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { OrionToggleButtonProps } from 'packages/ToggleButton/src/OrionToggleButtonSetup';
import { reactive, ref } from 'vue';

const vModel = ref();

const state = reactive({
	multiple: false,
	displayPrefixIcon: false,
	childProps: {
		nude: true,
		prefixIcon: 'check' as Orion.Icon,
		color: 'info' as Orion.Color,
		size: 'md' as OrionToggleButtonProps['size'],
	},
});

function updateVModel () {
	if (!state.multiple) {
		vModel.value = undefined;
	}
	else if (state.multiple) {
		vModel.value = vModel.value ? [vModel.value] : [];
	}
}

</script>

### Playground
