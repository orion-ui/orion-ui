---
lang: en-US
title: Validator
---

# Validator

The `Validator` class is a powerful tool for data validation.\
It offers a flexible and extensible structure to adapt to various validation needs.

`Validator` accepts an array of rules upon instantiation.\
It can consist of basic rules available by default or custom rules returning a type `Orion.Validator.RuleResult`.

```ts:no-line-numbers
type RuleResult = {
	result: boolean
	message?: string
	level: 'warning' | 'error'
}
```

:::tip Good to know
The `Validator` class is used at the heart of the [`useValidation`](../services/Validation.md) service.
:::

## Validation of a Primitive Value

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

## Validation of an Object

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
