<template>
	<o-sticker>
		<div class="flex g-16">
			<o-button
				color="info"
				nude
				@click="useNotif.info({ icon: 'lightbulb', title: 'Lorem ipsum' })">
				Show notif with custom icon
			</o-button>
			<o-button
				color="success"
				nude
				@click="useNotif.success({ title: 'Success !' })">
				Show success notif
			</o-button>
			<o-button
				color="error"
				nude
				@click="useNotif.danger({ title: 'Error !', duration: undefined })">
				Show notif without timer
			</o-button>
		</div>
	</o-sticker>
</template>

<script setup lang="ts">
import { useNotif } from 'lib';
</script>

@hl {7,13}

@lang:en
### Style

5 colors from `Orion.Color` type are available : `info`, `success`, `warning`, `error`, `primary`.

You can also customize the `icon` with an `Orion.Icon` or use one of your own font library with `fontIcon` prop.

If no duration is set, the notification will stay until the user closes it and no background color is applied.

:::tip Reminder
All colors are defined with CSS variables, so you can easily override them.
:::
@lang

@lang:fr
### Style

5 couleurs du type `Orion.Color` sont disponibles : `info`, `success`, `warning`, `error` et `primary`.

Vous pouvez également personnaliser l'icône en associant une `Orion.Icon` à la prop `icon`
ou en utilisant votre propre police d'icônes avec la prop `fontIcon`.

Si aucune durée n'est définie, la notification restera affichée jusqu'à ce que l'utilisateur la ferme et aucune couleur de fond ne sera appliquée.

:::tip Rappel
Toutes les couleurs sont définies via des CSS variables, vous pouvez donc les redéfinir facilement.
:::
@lang
