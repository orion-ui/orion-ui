<template>
	<o-page title="PopConfirm">
		<o-pop-confirm
			@confirm="exeConfirm()"
			@cancel="exeCancel()">
			<o-button>Confirm ?</o-button>
		</o-pop-confirm>
		<hr>
		<o-pop-confirm
			@confirm="exeConfirm()"
			@cancel="exeCancel()">
			<o-button>Custom actions slot</o-button>

			<template #actions="{ close, confirm, cancel }">
				<o-button
					size="xs"
					@click="close()">
					close
				</o-button>
				<o-button
					size="xs"
					color="success"
					outline
					autofocus
					@click="confirm()">
					confirm
				</o-button>
				<o-button
					size="xs"
					color="warning"
					outline
					@click="cancel()">
					cancel
				</o-button>
			</template>
		</o-pop-confirm>
	</o-page>
</template>

<script setup lang="ts">
import { useNotif } from 'lib';

function exeConfirm () {
	useNotif.success('confirmed !');
}
function exeCancel () {
	useNotif.warning('canceled !');
}
</script>
