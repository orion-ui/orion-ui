<template>
	<o-card>
		<o-carousel
			v-model="carouselStep"
			:step-timer="3000"
			pause-on-hover
			color="warning">
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
import { computed, ref } from 'vue';

type Step = { id: number, img: string, caption: string };

const carouselStep = ref<number>();
const steps = computed(() => {
	const fakeSteps: Step[] = [];
	for (let index = 0; index < 5; index++) {
		const id = getUid();
		fakeSteps.push({
			id,
			img: `https://picsum.photos/640/360?random=${id}`,
			caption: faker.lorem.sentence(),
		});
	}
	return fakeSteps;
});

carouselStep.value = steps.value[0].id;
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

@hl {3,5-8,11,30}

@lang:en
### Auto sliding carousel

Here is an example of an auto sliding carousel.\
Just hover it to pause the carousel, it will resume when leaving it.
@lang

@lang:fr
### Carrousel à défilement automatique

Voici un exemple d'un carrousel à défilement automatique.\
Survolez-le avec votre souris pour le mettre en pause. Il redémarrera automatiquement en le quittant.
@lang
