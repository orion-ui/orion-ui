<template>
	<div class="flex g-32">
		<o-chips
			v-if="showChip"
			color="info"
			close
			@close="closeCb()">
			Close me
		</o-chips>
		<o-chips
			color="info"
			close>
			Dual
			<template #dual>
				Close
			</template>
		</o-chips>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNotif } from 'lib';

const showChip = ref(true);

async function closeCb () {
	showChip.value = false;
	useNotif.success('Chip will come back in 2s');
	setTimeout(() => {
		showChip.value = true;
	}, 3000);
}
</script>

@hl {6-7,12,27-33}

@lang:en
### Close callback

If the prop `closable` is set, the component will emit a `close` event when the cross is pressed,
so you can define your own callback for this event.

@lang

@lang:fr
### Fonction close

Si la prop `closable` est définie, le composant va émettre un évènement `close` lorsque que l'utilisateur va cliquer sur la croix.
Il est donc possible de définir le comportement souhaité en implémentant un callback pour cet évènement.
@lang
