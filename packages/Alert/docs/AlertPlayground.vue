<template>
	<o-alert
		v-bind="state"
		@close="closeCb()">
		Curabitur blandit tempus porttitor.
	</o-alert>

	<hr>

	<div class="row row--gutter">
		<div class="col-sm-6">
			<o-input
				v-model="state.title"
				label="Title"
				clearable/>
		</div>
		<div class="col-sm-6">
			<color-selection v-model="state.color"/>
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
import { reactive } from 'vue';
import { useNotif } from 'lib';

const state = reactive({
	title: 'Duis mollis est',
	color: 'info' as Orion.Color,
	close: true,
	center: false,
});

function closeCb () {
	useNotif.info(`Alert component closed`);
}
</script>

@hl {3,37-42}

### Playground
