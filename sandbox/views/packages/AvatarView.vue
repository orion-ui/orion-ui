<template>
	<o-page title="Avatar">
		<o-section align="left">
			<o-radio
				v-for="(size, index) in sizes"
				:key="index"
				v-model="avatarSize"
				:input-value="size"
				:label="size"/>

			<o-toggle
				v-model="avatarSquare"
				label="Square"/>
		</o-section>

		<o-section>
			<o-avatar
				color="brand"
				:square="avatarSquare"
				contain
				avatar="https://picsum.photos/50/100"
				name="JB"/>
		</o-section>

		<o-section>
			<div class="row row--grid">
				<o-avatar
					v-for="(color, index) in colors"
					:key="index"
					:color="color"
					:size="avatarSize"
					:square="avatarSquare"
					:update-function="update"
					name="JB"/>
			</div>
			<br>
			<div class="row row--grid">
				<o-avatar
					v-for="(color, index) in colors"
					:key="index"
					:color="color"
					:avatar="images[index]?.download_url"
					:size="avatarSize"
					:square="avatarSquare"
					:update-function="update"
					name="JB"/>
			</div>
		</o-section>
	</o-page>
</template>

<script setup lang="ts">
import { colors, sizes, useNotif } from 'lib';
import { onMounted, reactive, ref } from 'vue';

const avatarSize = ref<Orion.Size>('md');
const avatarSquare = ref(false);
const images = reactive<{
	author: string;
	download_url: string;
	height: number;
	id: string;
	url: string;
	width: number;
}[]>([]);

onMounted(async () => {
	const resp = await fetch(`https://picsum.photos/v2/list?limit=${colors.length}`);
	images.push(...await resp.json());
});


function update () {
	useNotif.info('Create your update function');
}
</script>
