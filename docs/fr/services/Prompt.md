---
lang: fr-FR
title: Prompt
---

# Service Promt

Le service `usePrompt` affiche une modale avec un champ de saisie, ainsi que des boutons `valider` et `annuler`.\
Le champ de saisie peut être de l'un de ces types d'`Orion.Model.PromptType`.

```ts:no-line-numbers
// Type definition
type Orion.Model.PromptType =
	| "input"
	| "textarea"
	| "password"
	| "select"
	| "phone"
	| "upload"
	| "datepicker"
	;
```

\
Ce service prend des paramètres de type `Orion.Modal.Options`.\
Il est aussi possible d'ajouter des actions personnalisées en ajoutant la propriété `actions` à l'objet `options`.

## Usage

```ts:no-line-numbers
await usePrompt({
	title: 'Lorem ipsum',
	size: 'sm',
	prompt: {
		type: 'textarea',
		fieldProps: {
			required: true,
			label: `Your message`,
			maxLength: 1000,
		},
	},
});
```

<service-preview />

::: demo:(service)
PromptExample
:::
