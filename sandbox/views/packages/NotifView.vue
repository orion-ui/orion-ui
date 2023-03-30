<template>
	<o-page title="Notif">
		<o-section align="left">
			<o-button @click="triggerNotif()">
				trigger default notif
			</o-button>
			<o-button @click="resetNotifTimer()">
				reset default notif timer
			</o-button>
			<o-button @click="triggerNoTimerNotif()">
				trigger notimer notif
			</o-button>
		</o-section>

		<o-section>
			<o-radio
				v-for="(color, i) in ['info', 'success', 'warning', 'danger']"
				:key="i"
				v-model="notifColor"
				:input-value="color"
				:label="color"/>
		</o-section>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNotif } from 'lib';
import type { OrionNotif } from 'packages';
import { sleep } from 'radash';

let notifToReset: Undef<OrionNotif>;
const notifColor = ref<'info' | 'success' | 'warning' | 'danger'>('info');

function triggerNotif () {
	notifToReset = useNotif[notifColor.value]({
		title: `Condimentum Pharetra`,
		message: `Integer posuere erat a ante venenatis dapibus posuere velit aliquet.`,
	});
}

function resetNotifTimer () {
	notifToReset?.resetTimer();
}

async function triggerNoTimerNotif () {
	const notif = useNotif[notifColor.value]({
		duration: 0,
		title: `no timer`,
		openauto: false,
	});

	await notif.open();
	// console.log('opened');
	// await sleep(2000);
	// await notif.close();
	// console.log('closed');
}
</script>
