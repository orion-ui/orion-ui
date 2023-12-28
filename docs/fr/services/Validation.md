---
lang: fr-FR
title: Validation
description:
---

# Service Validation

La validation de formulaire est souvent un sujet complexe et lourd à mettre en place.

Nous avons imaginé la façon la plus simple d'obtenir un système de validation tout en proposant une granularité à même de répondre à tous les cas de figure.

:::tip
Le service `useValidation` vous permettra de simplement valider une valeur passée en paramètre, ou bien les propriétés d'un objet.\
Mais il permet aussi une utilisation fluide avec les composants de champ de formulaire d'**Orion**. *Nous verrons quelques exemples ci-après.*
:::

Ce système est lié à l'utilisation du [`Validator`](../tooling/validator.md) d'**Orion**.\
Il propose notamment des "raccourcis" vers les principales règles de validation *(ci-dessous).*

```js:no-line-numbers
'required'
'hasLowercase'
'hasUppercase'
'hasNumber'
'hasSpecialChar'
'hasMinLength'
'hasMaxLength'
'length:min'
'length:min,max'
'phone'
'phone:mobile'
'password'
'passwordConfirm' // uniquement avec le composant OrionPassword
'email'
```

## Validation d'une valeur

```js:no-line-numbers
useValidation().check(undefined, 'required') // return false
useValidation().check('doe', 'required') // return true

useValidation().check('doe', 'hasUppercase') // return false
useValidation().check('Doe', 'hasUppercase') // return true

useValidation().check('d', 'length:2') // return false
useValidation().check('doe', 'length:2') // return true
useValidation().check('john', 'length:2,3') // return false

// Équivalences
// string
useValidation().check('Doe', 'length:2')
// static Validator rule
useValidation().check('Doe', Validator.rules.hasMinLength(2))
// (val: T) => boolean
useValidation().check<string>('Doe', val => val.length >= 2)

// Combinaison de plusieurs règles
// string
useValidation().check('Joe', 'required|hasUppercase|length:2,3') // return true
// Validator instance
useValidation().check('Joe', new Validator([
	Validator.rules.required(),
	Validator.rules.hasUppercase(),
	Validator.rules.length(2, 3),
]))
```

## Validation d'un objet réactif

Le service `useValidation` va inférer le type de l'objet passé en premier paramètre.

Vous avez alors la possibilité de valider chaque propriété de l'objet en créant la propriété du même nom dans le deuxième paramètre.\
Votre éditeur devrait vous proposer les propiétés disponibles ainsi que leur type inféré depuis l'objet passé en premier paramètre.

```js:no-line-numbers
const user = reactive({
	birthdate: undefined as Date | undefined,
	firstName: 'john',
	lastName: 'doe',
	email: '',
})

// Combinaison de plusieurs types de règles de validation
const validator = useValidation(user, {
	// (val: T) => boolean
	birthdate: val => val?.getFullYear() === 2000,
	// string
	firstName: 'required',
	// static Validator rule
	lastName: Validator.rules.hasMinLength(2, 'Custom error message'),
	// Validator instance with multiple rules
	email: new Validator([
		Validator.rules.email(),
		// Custom function returns Orion.Validator.RuleResult
		val => ({
			result: val.includes(user.lastName), 							 // boolean
			level: 'error', 																	 // 'error' | 'warning'
			message: `Email should include "${user.lastName}"` // string
		}),
	]),
})

function checkForm () {
	return validator.validate();
}
```

## Binding avec le template

Le service `useValidation` s'intègre de façon transparente avec les composants d'**Orion** via la prop `validation` et la méthode `myValidator.rule('...')` de l'instance du service *(exemple ci-dessous)*.\
Cette métode prend en paramètre le nom de l'une des propriété de l'objet listant les règles de validation.\
Votre éditeur devrait inférer le type automatiquement et vous suggérer les règles disponibles.

```vue{5,10,14,9,27}
<template>
	<o-input
		label="Firstname"
		v-model="user.firstName"
		:validation="validator.rule('firstName')"/>
	<o-input
		label="Lastname"
		v-model="user.lastName"
		validation-error-message="Lastname at least 2 char. long"
		:validation="validator.rule('lastName')"/>
	<o-input
		label="Email"
		v-model="user.email"
		:validation="validator.rule('email')"/>
</template>

<script setup lang="ts">
const user = reactive({
	firstName: undefined as Undef<string>,
	lastName: undefined as Undef<string>,
	email: undefined as Undef<string>,
})

const validator = useValidation(user, {
	firstName: 'required',
	lastName: 'required|length:2',
	email: Validator.rules.email(`This email doesn't look good`),
})
</script>
```

Vous pouvez au besoin personnaliser le message d'erreur dans le template *(ligne 9)* ou dans le validateur *(ligne 27)*.

## État de la validation

L'instance du service `useValidation` enregistrera de façon transparente les composants de formulaire **Orion** utilisant une de ses règles via la prop `validation`.

Par défaut, seuls les champs ayant été **focus** afficheront le résultat de la validation lors du **blur**.
Vous pouvez afficher la validation sur tous les champs avec la méthode `showValidationState`, par exemple si la méthode `myValidator.validate()` renvoie **false**.

La méthode `hideValidationState` permet de masquer l'état de la validation sur les champs qui n'ont pas encore été **focus**.
Pour masquer l'état sur tous les champs il faudra utliser la méthode `resetValidationState`.

Observez ce comportement dans l'[exemple complet](#exemple-complet)

## Exemples

::: demo:(service)
ValidationField
:::

::: demo:(service)
ValidationPassword
:::

:::tip
Pour voir le comportement par défaut, se référer à [Composants > Password](../../fr/components/OrionPassword.md).
:::

::: demo:(service)
ValidationForm
:::

<service-preview/>
