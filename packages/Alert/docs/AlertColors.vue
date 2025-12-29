<template>
	<o-alert
		v-for="(color, index) of colors"
		:key="index"
		:color="color"
		:center="index > 1"
		title="Dapibus Adipiscing Aenean">
		Donec ullamcorper nulla non metus auctor fringilla.<br>
		Curabitur blandit tempus porttitor. Donec sed odio dui.
	</o-alert>
</template>

<script setup lang="ts">
const colors: Orion.Color[] = [
	'primary',
	'success',
	'danger',
	'warning',
];
</script>

<style scoped lang="less">
.orion-alert + .orion-alert {
	margin-top: 2rem;
}
</style>

@hl {5,6,7}

@lang:en
### Colors

It comes with different colors from `Orion.Color` type.

You can easily add a `title` or center the content with the `center` prop.

:::tip Reminder
All colors are defined with CSS variables, so you can easily override them.
:::
@lang

@lang:fr
### Couleurs

Les couleurs disponibles sont du type `Orion.Color`.

Il est également possible d'ajouter un titre via la prop `title`, ou de centrer le contenu avec la prop `center`.

:::tip Rappel
Toutes les couleurs sont définies via des CSS variables, vous pouvez donc les redéfinir facilement.
:::
@lang
