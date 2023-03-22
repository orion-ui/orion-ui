<template>
	<o-sticker>
		<div class="flex g-sm">
			<o-button
				color="info"
				nude
				@click="useNotif.info({ icon: 'bulb', title: 'Lorem ipsum' })">
				Show notif with custom icon
			</o-button>
			<o-button
				color="success"
				nude
				@click="useNotif.success({ title: 'Success !' })">
				Show success notif
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

4 colors from `Orion.Color` type are available : `info`, `success`, `warning`, `danger`.

You can also customize the `icon` with an `Orion.Icon` or use one of your own font library with `fontIcon` prop.

:::tip Reminder
All colors are defined with CSS variables, so you can easily override them.
:::
@lang

@lang:fr
### Style

4 couleurs du type `Orion.Color` sont disponibles : `info`, `success`, `warning` et `danger`.

Vous pouvez également personnaliser l'icône en associant une `Orion.Icon` à la prop `icon`
ou en utilisant votre propre police d'icônes avec la prop `fontIcon`.

:::tip Rappel
Toutes les couleurs sont définies via des CSS variables, vous pouvez donc les redéfinir facilement.
:::
@lang
