<template>
	<o-alert
		v-bind="state"
		@close="closeCb()">
		Curabitur blandit tempus porttitor.
	</o-alert>

	<hr>

	<div class="row row--gutter">
		<div class="col-sm-4">
			<o-input
				v-model="state.title"
				label="Title"
				clearable/>
		</div>
		<div class="col-sm-4">
			<color-selection v-model="state.color"/>
		</div>
		<div class="col-sm-4">
			<o-select
				v-model="state.icon"
				label="Icon"
				clearable
				:options="icons"/>
		</div>
		<div class="col-sm-6">
			<o-toggle
				v-model="state.close"
				label="Closable"/>
		</div>
		<div class="col-sm-6">
			<o-toggle
				v-model="state.center"
				label="Centered"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { materialIcons, useNotif } from 'lib';

const state = reactive({
	title: 'Duis mollis est',
	color: 'info' as Orion.Color,
	icon: undefined as Undef<Orion.Icon>,
	close: true,
	center: false,
});

const icons = computed(() => {
	return materialIcons.slice(200, 250);
});

function closeCb () {
	useNotif.info(`Alert component closed`);
}
</script>

@hl {3,37-42}

### Playground
