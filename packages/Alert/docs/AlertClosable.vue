<template>
	<o-alert
		v-if="showAlert"
		color="info"
		close
		@close="closeCbAsync()">
		Curabitur blandit tempus porttitor.
	</o-alert>
</template>

<script setup lang="ts">
import { useConfirm } from 'lib';
import { ref } from 'vue';

const showAlert = ref(true);

async function closeCbAsync () {
	showAlert.value = false;
	await useConfirm(`o-alert has been closed, it will reappear in 3sec`);
	setTimeout(() => {
		showAlert.value = true;
	}, 3000);
}
</script>

@hl {6,17-23}

@lang:en
### Close callback

Define your own callback for the `@close` event.
@lang

@lang:fr
### Fonction "close"

Définissez votre propre fonction de callback pour l'évènement `@close`.
@lang
