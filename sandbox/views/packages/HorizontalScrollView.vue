<template>
	<o-page title="HorizontalScroll">
		<o-horizontal-scroll
			:scroll-step="horizontalScrollStepper"
			:tolerance="10">
			<div
				id="turltutu"
				style="display: flex; gap: 10px;">
				<o-button
					v-for="o in numberOfButton"
					:key="o"
					outline
					color="info">
					Button {{ ('12316513158641531865308521563245632156321563').slice(0, o * 2) }}
				</o-button>
			</div>
		</o-horizontal-scroll>

		<hr>

		<o-horizontal-scroll
			:scroll-step="horizontalScrollStepper"
			:tolerance="10"
			hide-button
			:targets="horizontalScrollStepper">
			<div
				id="preview"
				style="display: flex; gap: 10px;">
				<o-button
					v-for="o in numberOfButton"
					:key="o"
					outline
					color="info">
					Button {{ ('12316513158641531865308521563245632156321563').slice(0, o * 2) }}
				</o-button>
			</div>
		</o-horizontal-scroll>
	</o-page>
</template>

<script setup lang="ts">

const numberOfButton = 7;

function horizontalScrollStepper () {
	return [...document.getElementById('preview')?.querySelectorAll('.orion-button')];
};

</script>
