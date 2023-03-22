<template>
	<o-page title="Notif">
		<o-section align="left">
			<o-button @click="triggerNotif()">
				trigger default notif
			</o-button>
			<o-button @click="triggerNoTimerNotif()">
				trigger notimer notif
			</o-button>
		</o-section>
	</o-page>
</template>

<script setup lang="ts">
import { useNotif } from 'lib';
import { sleep } from 'radash';

function triggerNotif () {
	useNotif.info(`title`, `messaaaaaaage`);
}
async function triggerNoTimerNotif () {
	const notif = useNotif.info({
		duration: 0,
		title: `no timer`,
		openauto: false,
	});

	await notif.open();
	// eslint-disable-next-line no-console
	// console.log('opened');

	// await sleep(2000);
	// await notif.close();
	// // eslint-disable-next-line no-console
	// console.log('closed');

}
</script>
