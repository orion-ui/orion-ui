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
import { ref, computed } from 'vue';
import { faker } from '@faker-js/faker';
import { getUid } from 'lib';

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
