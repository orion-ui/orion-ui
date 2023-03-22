<template>
	<o-page title="Loader">
		<o-section align="left">
			<o-button @click="loaderVisible = true">
				Show card loader
			</o-button>
			<o-button @click="loaderVisible = false">
				Hide card loader
			</o-button>
			<o-button @click="showGlobalLoader()">
				Show global loader from setup
			</o-button>
		</o-section>

		<o-section align="left">
			<o-radio
				v-for="(size, index) in loaderSizes"
				:key="index"
				v-model="loaderSize"
				:input-value="size"
				:label="size"/>
		</o-section>

		<o-section>
			<div class="row row--grid">
				<div
					v-for="(color, index) in colors"
					:key="index"
					class="col-sm-3">
					<o-card>
						<o-section title="Purus Commodo Fermentum">
							Nulla vitae elit libero, a pharetra augue. Aenean eu leo quam.
							Pellentesque ornare sem lacinia quam venenatis vestibulum.
							Aenean lacinia bibendum nulla sed consectetur.
						</o-section>
						<o-loader
							:color="color"
							message="Loading..."
							:visible="loaderVisible"
							:size="loaderSize"/>
					</o-card>
				</div>
			</div>
		</o-section>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoader, colors } from 'lib';

const loaderVisible = ref(false);
const loaderSize = ref<Orion.Size>('md');
const loaderSizes: Orion.Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

function showGlobalLoader () {
	useLoader().show('Loading');
	setTimeout(() => {
		useLoader().hide();
	}, 2000);
}
</script>
