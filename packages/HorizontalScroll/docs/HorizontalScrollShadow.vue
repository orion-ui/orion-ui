<template>
	<o-card>
		<o-horizontal-scroll
			:scroll-step="horizontalScrollStepper"
			shadow-color="white">
			<div
				id="horizontal-item"
				class="flex g-8">
				<o-button
					v-for="number in 20"
					:key="number"
					outline
					color="info">
					{{ number }}
				</o-button>
			</div>
		</o-horizontal-scroll>
	</o-card>

	<o-section class="mt-md mb-xs">
		<o-horizontal-scroll
			:scroll-step="horizontalScrollStepper"
			drop-shadow>
			<div
				id="horizontal-item"
				class="flex g-8">
				<o-button
					v-for="number in 20"
					:key="number"
					outline
					color="info">
					{{ number }}
				</o-button>
			</div>
		</o-horizontal-scroll>
	</o-section>
</template>

<script setup lang="ts">
function horizontalScrollStepper () {
	const buttons = document.getElementById('horizontal-item')?.querySelectorAll('.orion-button');
	if (buttons) {
		return [...buttons] as HTMLElement[];
	}
	return [];
};
</script>

@hl {5,23}

@lang:en
### Shadows

You can hide the shadow borders with the prop `dropShadow` or change the color with `shadowColor`.
@lang

@lang:fr
### Ombres

Il est possible de masquer les ombres aux extrémités avec la prop `dropShadow`, ou de changer leur coulour avec `shadowColor`.
@lang
