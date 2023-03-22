<template>
	<o-pop-confirm
		v-bind="state"
		@confirm="useNotif.info('Action has been confirmed')"
		@cancel="useNotif.warning('Action has been cancel')">
		<o-button>
			Show pop confirm
		</o-button>
	</o-pop-confirm>

	<hr>

	<o-input
		v-model="state.title"
		label="Title"/>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useNotif } from 'lib';

const state = reactive({ title: 'Do you confirm this action ?' });
</script>

@hl {3-5,22}

### Playground
