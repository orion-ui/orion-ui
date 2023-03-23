<template>
	<o-section
		title="Lorem Ipsum"
		style="position:relative"
		class="pa-sm">
		<div class="flex fd-c g-sm">
			<div>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.<br>
				Exercitationem, sapiente error ipsam veniam saepe molestias enim alias
				cumque quos repellendus aliquid, labore temporibus expedita necessitatibus
				nostrum laudantium autem voluptas eligendi.
			</div>
			<div>
				Repellat molestiae hic voluptate saepe nemo minus inventore maxime
				architecto obcaecati recusandae ex excepturi facilis, quaerat officiis
				doloribus et illum ut illo?
			</div>
		</div>

		<o-loader v-bind="state"/>
	</o-section>

	<o-section>
		<div class="row row--grid row--middle">
			<div class="col-sm-4">
				<size-selection v-model="state.size"/>
			</div>
			<div class="col-sm-4">
				<color-selection v-model="state.color"/>
			</div>
			<div class="col-sm-4">
				<o-input
					v-model="state.message"
					label="Message"/>
			</div>
		</div>

		<div class="row row--grid row--middle mt-xs">
			<div class="col-sm-4">
				<o-button
					color="info"
					outline
					block
					@click="showGlobalLoader()">
					Show global loader
				</o-button>
			</div>
			<div class="col-sm-4">
				<o-toggle
					v-model="state.visible"
					label="Visible"/>
			</div>
		</div>
	</o-section>
</template>

<script setup lang="ts">
import { useLoader } from 'lib';
import { reactive } from 'vue';

const state = reactive({
	global: false,
	visible: true,
	color: 'brand' as Orion.Color,
	size: 'md' as Orion.Size,
	message: 'Loading...',
});

function showGlobalLoader () {
	useLoader().show(`Loading for 3 sec...`);

	setTimeout(() => {
		useLoader().hide();
	}, 3000);
}
</script>

### Playground
