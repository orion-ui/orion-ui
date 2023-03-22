<template>
	<o-input
		v-model="inputValue"
		size="sm"
		label="blabla"
		autofocus/>
	<o-button
		size="sm"
		@click="submit()">
		valider
	</o-button>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';

const inputValue = ref<string>();
const _notif = inject<OrionNotif>('_notif');

function submit () {
	_notif?.trigger('heho', inputValue.value);
}
</script>

<style scoped lang="less">

</style>
