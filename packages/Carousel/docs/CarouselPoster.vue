<template>
	<o-card>
		<o-carousel
			v-model="carouselStep"
			:step-timer="3000"
			pause-on-hover
			color="pink">
			<template #poster="{ stepIndex }">
				<div
					class="animated-poster"
					:class="`animated-poster--${stepIndex + 1}`">
					<div
						v-for="item in steps"
						:key="item.id"/>
				</div>
			</template>

			<o-carousel-item
				v-for="(item, i) in steps"
				:key="item.id"
				:name="item.id">
				<div class="step-content">
					<o-input
						v-model="steps[i].label"
						label="Label"
						disabled/>
					{{ item.desc }}
				</div>
			</o-carousel-item>
		</o-carousel>
	</o-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { faker } from '@faker-js/faker';
import { getUid } from 'lib';

type Step = { id: number, index: number, desc: string, label: string };

const carouselStep = ref<number>();
const steps = computed(() => {
	const fakeSteps: Step[] = [];
	for (let index = 0; index < 5; index++) {
		const id = getUid();
		fakeSteps.push({
			id,
			index,
			desc: faker.lorem.sentence(),
			label: faker.lorem.words(3),
		});
	}
	return fakeSteps;
});

carouselStep.value = steps.value[0].id;
</script>

<style scoped lang="less">
.animated-poster {
	transition: gap 0.5s ease-out;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0;
	margin-bottom: 1rem;

	> div {
		transition: transform 0.5s ease-in-out;
		width: 2rem;
		height: 2rem;
		border-radius: 1rem;

		&:nth-child(1) {
			background-color: navy;
		}
		&:nth-child(2) {
			background-color: dodgerblue;
		}
		&:nth-child(3) {
			background-color: deepskyblue;
		}
		&:nth-child(4) {
			background-color: aqua;
		}
		&:nth-child(5) {
			background-color: aquamarine;
		}
	}

	each(range(5), {
		&.animated-poster--@{value} {
			gap: @value*10px;

			:nth-child(@{value}) {
				transform: translate3d(0, @value*20%, 0)
			}
		}

	})
}

.step-content {
	padding: 1rem 0;
	text-align: center;
	font-size: 0.85rem;
	font-weight: 600;
	color: var(--grey-darker);

	> .orion-input {
		width: 50%;
		margin: 1rem auto;
	}
}
</style>

@hl {3,5-8,11,30}

@lang:en
### Using poster slot

Use the `poster` slot if you want to display a fixed content or a CSS animation based on the active step's index.
@lang


@lang:fr
### Utilisation du slot poster

Utilisez le slot `poster` pour afficher un élément statique ou une animation CSS basée sur l'index de l'élément actif.
@lang
