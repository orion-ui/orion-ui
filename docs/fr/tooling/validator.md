---
lang: fr-FR
title: Validator
---

# Validator

La classe `Validator` est un outil puissant de validation de données.\
Elle offre une structure flexible et extensible pour s'adapter à divers besoins de validation.

`Validator` accepte un tableau de règles lors de son instanciation.\
Il peut être composé des règles de base disponibles par défaut ou de règles personnalisées renvoyant un type `Orion.Validator.RuleResult`.

```ts:no-line-numbers
type RuleResult = {
	result: boolean
	message?: string
	level: 'warning' | 'error'
}
```

:::tip Bon à savoir
La class `Validator` est utilisée au coeur du service [`useValidation`](../services/Validation.md)
:::

## Validation d'une valeur primitive

```js:no-line-numbers
new Validator([
	Validator.rules.hasUppercase(),
	Validator.rules.hasMinLength(3, 'too short'),
	(val: string) => ({
		result: val.includes('test'),
		message: '"test" is missing',
		level: 'error',
	}),
]).validate('super')

/** returns
[
    {
        "result": false,
        "message": "Missing uppercase character",
        "level": "error"
    },
    {
        "result": true,
        "message": "too short",
        "level": "error"
    },
    {
        "result": false,
        "message": "\"test\" is missing",
        "level": "error"
    }
]
*/
```

## Validation d'un objet

```ts:no-line-numbers
const user = {
	firstName: 'John',
	lastName: undefined as Undef<string>,
	email: 'john@',
};

new Validator<typeof user>([
	val => Validator.rules.hasMinLength(3)(val.firstName),
	val => Validator.rules.required()(val.lastName),
	val => Validator.rules.email()(val.email),
	val => ({
		result: !!val.lastName?.length && val.email.includes(val.lastName),
		level: 'warning',
		message: `Email doesn't include last name`,
	}),
]).validate(user)

/** returns
[
    {
        "result": true,
        "message": "Minimum length of 3 characters required",
        "level": "error"
    },
    {
        "result": false,
        "message": "Required",
        "level": "error"
    },
    {
        "result": false,
        "message": "Invalid email",
        "level": "error"
    },
    {
        "result": false,
        "message": "Email doesn't include last name",
        "level": "warning"
    }
]
*/
```
