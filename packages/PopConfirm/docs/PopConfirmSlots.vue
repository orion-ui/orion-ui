<template>
	<div class="flex g-16">
		<o-pop-confirm
			title="Do you confirm this incredible action ?"
			@confirm="useNotif.info('Action has been confirmed')"
			@cancel="useNotif.warning('Action has been cancel')">
			<o-button>
				Use of the actions slot
			</o-button>
			<template #actions="{ cancel, confirm }">
				<o-button
					outline
					@click="cancel()">
					Nope
				</o-button>
				<o-button
					color="primary"
					autofocus
					@click="confirm()">
					Of course
				</o-button>
			</template>
		</o-pop-confirm>

		<o-pop-confirm
			title="Do you confirm this dangerous action ?"
			type="danger"
			@confirm="useNotif.info('Action has been confirmed')"
			@cancel="useNotif.warning('Action has been cancel')">
			<o-button>
				Dangerous with the actions slot
			</o-button>
			<template #actions="{ cancel, confirm }">
				<o-button
					outline
					@click="cancel()">
					Nope
				</o-button>
				<o-button
					color="danger"
					autofocus
					@click="confirm()">
					Oh yeah
				</o-button>
			</template>
		</o-pop-confirm>

		<o-pop-confirm
			hide-title
			@confirm="useNotif.info('Action has been confirmed')"
			@cancel="useNotif.warning('Action has been cancel')">
			<o-button>
				Use of the content slot
			</o-button>
			<template #content>
				<o-alert
					title="Confirmation"
					color="info">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</o-alert>
			</template>
		</o-pop-confirm>
	</div>
</template>

<script setup lang="ts">
import { useNotif } from 'lib';
</script>

<style scoped lang="less"></style>

@hl {12-28,37-43}

@lang:en
### Slots

Use the `actions` slot to change the default actions, and the `content` slot to change the popup content.
Use `type="danger"` for dangerous actions.
@lang

@lang:fr
### Slot

Utilisez le slot `actions` pour changer les actions par défaut, et le slot `content` pour changer le contenu de la
popup.
Utilisez `type="danger"` pour une action dangereuse.
@lang
