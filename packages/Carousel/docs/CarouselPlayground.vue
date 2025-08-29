<template>
	<o-card>
		<o-carousel
			:key="state.stepTimer"
			v-bind="state"
			:step-timer="(state.stepTimer ?? 0) * 1000">
			<o-carousel-item
				v-for="item in steps"
				:key="item.id"
				:name="item.id">
				<figure>
					<img
						:src="item.img"
						:alt="item.caption">
					<figcaption>{{ item.caption }}</figcaption>
				</figure>
			</o-carousel-item>
		</o-carousel>
	</o-card>

	<hr>

	<div class="row row--gutter">
		<div class="col-sm-4">
			<color-selection
				v-model="state.color"
				label="Couleur"/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model="state.stepTimer"
				label="Timer (seconds)"
				type="number"/>
		</div>
	</div>

	<div class="row row--grid row--toggles">
		<div class="col-sm-4">
			<o-toggle
				v-model="state.loop"
				label="Loop"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.pauseOnHover"
				label="Pause on hover"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.hideNavigationButtons"
				label="Hide navigation buttons"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.hideNavigationDots"
				label="Hide navigation dots"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { faker } from '@faker-js/faker';
import { getUid } from 'lib';

type Step = { id: number, img: string, caption: string };


function getSteps () {
	const fakeSteps: Step[] = [];
	for (let index = 0; index < 5; index++) {
		const id = getUid();

		if (index === 0)
			state.modelValue = id;

		fakeSteps.push({
			id,
			img: `https://picsum.photos/640/360?random=${id}`,
			caption: faker.lorem.sentence(),
		});
	}
	return fakeSteps;
};

const state = reactive({
	stepTimer: 0,
	pauseOnHover: false,
	color: 'brand' as Orion.Color,
	loop: false,
	hideNavigationButtons: false,
	hideNavigationDots: false,
	modelValue: 0,
});

const steps = getSteps();
</script>

<style scoped lang="less">
figure {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	margin: 2rem 0;

	img {
		max-width: 90%;
		border-radius: 0.5rem;
		box-shadow:
			0px 2.8px 2.2px rgba(0, 0, 0, 0.02),
			0px 6.7px 5.3px rgba(0, 0, 0, 0.028),
			0px 12.5px 10px rgba(0, 0, 0, 0.035),
			0px 22.3px 17.9px rgba(0, 0, 0, 0.042)
		;
	}
}
</style>

@hl {3,5-8,11,30}

### Playground
