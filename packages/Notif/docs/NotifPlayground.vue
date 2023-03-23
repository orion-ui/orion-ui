<template>
	<o-sticker>
		<o-section align="stretch">
			<o-button
				color="info"
				nude
				@click="useNotif.info(state)">
				Info notif
			</o-button>
			<o-button
				color="success"
				nude
				@click="useNotif.success(state)">
				Success notif
			</o-button>
			<o-button
				color="warning"
				nude
				@click="useNotif.warning(state)">
				Warning notif
			</o-button>
			<o-button
				color="danger"
				nude
				@click="useNotif.danger(state)">
				Danger notif
			</o-button>
		</o-section>
	</o-sticker>

	<hr>

	<div class="row row--gutter">
		<div class="col-sm-4">
			<o-input
				v-model="state.title"
				label="Title"/>
		</div>
		<div class="col-sm-8">
			<o-input
				v-model="state.message"
				label="Message"/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model="state.duration"
				label="Duration"
				type="number"
				clearable/>
		</div>
		<div class="col-sm-4">
			<o-select
				v-model="state.icon"
				label="Icon"
				:options="icons"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNotif, coolicons } from 'lib';
import { reactive, computed } from 'vue';

const state = reactive({
	title: 'Lorem ipsum',
	message: `Cras mattis consectetur purus sit amet fermentum.`,
	duration: 5,
	icon: 'heart_fill' as Orion.Icon,
});

const icons = computed(() => {
	return coolicons.slice(0, 50);
});

</script>

<style scoped lang="less">

</style>

### Playground
