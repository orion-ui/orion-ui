<template>
	<o-page title="Carousel">
		<o-button
			color="brand"
			@click="test = !test">
			toggle first slide
		</o-button>

		<o-card class="carousel">
			<o-carousel
				v-model="carouselValue"
				:step-timer="3000"
				:pause-on-hover="true"
				:loop="false"
				color="success">
				<o-carousel-item
					v-if="test"
					name="step1">
					<o-section title="step1">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Quasi vitae, commodi corporis consequatur eum ipsam nihil?
							Corporis, ex voluptatum ullam quam ducimus hic atque voluptas distinctio nam obcaecati explicabo.
						</p>
					</o-section>
				</o-carousel-item>
				<o-carousel-item name="step2">
					<o-section title="step2">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Fugiat nisi maxime illo culpa pariatur eaque debitis reprehenderit molestiae,
							laborum esse quisquam doloribus commodi ab ratione magni sint alias dicta at.
						</p>
					</o-section>
				</o-carousel-item>
				<o-carousel-item
					name="step3"
					lazy-once>
					<o-section
						title="step3"
						@vue:mounted="logMounted('step3')">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Id dolorem asperiores tempora error aliquid omnis,
							magni cum non delectus quos cumque unde ratione reiciendis et mollitia fugit eaque consectetur aut!
						</p>
					</o-section>
				</o-carousel-item>
				<o-carousel-item
					name="step4"
					lazy>
					<o-section
						title="step4"
						@vue:mounted="logMounted('step4')">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Beatae eligendi eveniet asperiores et labore odio iste, esse voluptate officia magnam.
							Ducimus quam omnis totam dolor ratione dolores aliquam dolorem nobis?
						</p>
					</o-section>
				</o-carousel-item>

				<template #actions="{ goNextStep }">
					<o-button @click="goNextStep()">
						next
					</o-button>
				</template>
			</o-carousel>
		</o-card>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Carousel
const test = ref(true);
const carouselValue = ref('step1');

function logMounted (step: string) {
	console.log('carousel item mounted' + step);
}
</script>

<style scoped lang="less">
.carousel {
	max-width: 25rem;
	margin: 3rem auto;
}
</style>
