<template>
	<o-card>
		<o-carousel v-model="carouselStep">
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
</template>

<script setup lang="ts">
import { faker } from '@faker-js/faker';
import { getUid } from 'lib';
import { ref } from 'vue';

type Step = { id: number, img: string, caption: string };

const carouselStep = ref<number>();
function getSteps () {
	const fakeSteps: Step[] = [];
	for (let index = 0; index < 5; index++) {
		const id = getUid();
		if (index === 0)
			carouselStep.value = id;

		fakeSteps.push({
			id,
			img: `https://picsum.photos/640/360`,
			caption: faker.lorem.sentence(),
		});
	}
	return fakeSteps;
};
const steps = getSteps();
</script>

<style scoped lang="less">
figure {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	margin: 2rem 0;

	img {
		max-width: 90%;
		border-radius: 0.5rem;
		box-shadow:
			0 2.8px 2.2px rgb(0 0 0 / 2%),
			0 6.7px 5.3px rgb(0 0 0 / 2.8%),
			0 12.5px 10px rgb(0 0 0 / 3.5%),
			0 22.3px 17.9px rgb(0 0 0 / 4.2%);
	}
}
</style>

@hl {3,4,7,26}

@lang:en
### Simple carousel

This is a very basic example of a simple carousel to learn the template structure.
@lang

@lang:fr
### Carrousel simple

Voici un exemple très basique d'un simple carrousel pour dévouvrir la structure du template.
@lang
