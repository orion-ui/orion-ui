<template>
	<div class="flex g-sm">
		<o-button @click="showPromptModal()">
			Show prompt modal
		</o-button>
		<o-button @click="showCustomPromptModal()">
			Show custom prompt modal
		</o-button>
		<o-button @click="showConfirmModal()">
			Show confirm modal
		</o-button>
	</div>
</template>

<script setup lang="ts">
import { usePrompt, useConfirm, useNotif, useMonkey } from 'lib';

async function showPromptModal () {
	const { confirm, value } = await usePrompt<string>({
		title: `What's your favorite color ?`,
		message: `<div class="mb-sm">Press <kbd>Enter</kbd> to <b>submit</b> or <kbd>Esc</kbd> to <b>cancel</b>.</div>`,
	});
	confirm
		? useNotif.info(`You're right !`, `<b>${value}</b> is a nice color ;)`)
		: useNotif.warning(`No favorite color ???`);
}

async function showCustomPromptModal () {
	const { confirm, value } = await usePrompt<Date>({
		title: `What's your day this month ?`,
		message: `I know this is a useless question`,
		prompt: {
			type: 'datepicker',
			value: new Date(),
			fieldProps: {
				label: `Your favorite day this month`,
				clearable: true,
			},
		},
	});
	confirm && !!value
		? useNotif.info(`${useMonkey(value).toReadable(`$dddd $DD`)} is probably a cool day ;)`)
		: useNotif.warning(`I said this was useless ;)`);
}

async function showConfirmModal () {
	const confirm = await useConfirm(`
		<div class="flex fd-c g-xs">
			<div>Confirm this action ?</div>
			<div>Press <kbd>Enter</kbd> to <b>confirm</b> or <kbd>Esc</kbd> to <b>cancel</b>.</div>
			<div class="text--info">You can use string or <em>secure html</em> in case you need it</div>
		</div>
	`);
	confirm
		? useNotif.success(`Action confirmed`)
		: useNotif.warning(`Action canceled`);
}
</script>

@hl {3,6,9,19-22,32-39,47}

@lang:en
### Prompt & Confirm

**Orion** provides `usePrompt()` and `useConfirm()` services to quickly add those mecanisms to your app.

Basically it is just two wrappers around `useModal()` with predefined parameters.
However feel free to override them as you need.

::: tip useConfirm()
It is pretty basic and return a `boolean` **promise** to get the user confirmation.
:::

::: tip usePrompt()
It can be customisable via the `options.prompt` prop of `Orion.Modal.Prompt` type.

It returns a `Orion.Modal.PromptResolveType` **promise**.

You can choose which type of field to use, and apply initial value and props to it.
:::
@lang

@lang:fr
### Prompt & Confirm

**Orion** fournit les services `usePrompt()` et `useConfirm()` pour implémenter rapidement ces mécanismes dans votre application.

Il s'agît en réalité de deux *wrappers* autour de `useModal()` avec des paramètres prédéfinis.
Cependant vous avez bien sur la possibilité d'écraser ces paramètres à votre convenance.

::: tip useConfirm()
Son fonctionnement est plutôt basique et retourne simplement une **promise** `boolean` pour récupérer le choix de l'utilisateur.
:::

::: tip usePrompt()
Il peut être personnalisé via la prop `options.prompt` du type `Orion.Modal.Prompt`.

Il retourne une **promise** `Orion.Modal.PromptResolveType`.

Vous pouvez choisir quel type de champ utiliser, et appliquer une valeur initiale ainsi que des props.
:::
@lang
