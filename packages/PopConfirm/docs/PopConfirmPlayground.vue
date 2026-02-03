<template>
	<o-pop-confirm v-bind="state" @confirm="useNotif.info('Action has been confirmed')"
		@cancel="useNotif.warning('Action has been cancel')">
		<o-button>
			Show {{ state.type }} pop confirm
		</o-button>
	</o-pop-confirm>

	<hr>

	<div class="row row--gutter">
		<div class="col-sm-6">
			<o-input v-model="state.title" label="Title" />
		</div>
		<div class="col-sm-6">
			<o-select v-model="state.type" label="Type" :options="typeOptions" inline />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNotif } from 'lib';
import { reactive } from 'vue';

const state = reactive({
	title: 'Do you confirm this action ?',
	type: 'default' as 'default' | 'destructive',
});

const typeOptions = [
	'default',
	'destructive',
];
</script>

@hl {2-6,15-26}

### Playground
