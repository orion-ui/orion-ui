---
lang: en-US
title: Validation service
description:
---

# Validation service

Form validation is often a complex and burdensome topic to tackle.

We have envisioned the simplest way to achieve a validation system while offering granularity capable of addressing all scenarios.

:::tip
The `useValidation` service will allow you to simply validate a value passed as a parameter, or the properties of an object.
But it also allows for smooth use with **Orion**'s form field components. *We will see some examples below.*
:::

This system is linked to the use of [`Validator`](../tooling/validator.md) from **Orion**.
It notably proposes "shortcuts" to the main validation rules *(below)*.

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
'email'
```

## Validating a value

```js:no-line-numbers
useValidation().check(undefined, 'required') // return false
useValidation().check('doe', 'required') // return true

useValidation().check('doe', 'hasUppercase') // return false
useValidation().check('Doe', 'hasUppercase') // return true

useValidation().check('d', 'length:2') // return false
useValidation().check('doe', 'length:2') // return true
useValidation().check('john', 'length:2,3') // return false

// Equivalents
// string
useValidation().check('Doe', 'length:2')
// static Validator rule
useValidation().check('Doe', Validator.rules.hasMinLength(2))
// (val: T) => boolean
useValidation().check<string>('Doe', val => val.length >= 2)

// Combining several rules
// string
useValidation().check('Joe', 'required|hasUppercase|length:2,3') // return true
// Validator instance
useValidation().check('Joe', new Validator([
	Validator.rules.required(),
	Validator.rules.hasUppercase(),
	Validator.rules.length(2, 3),
]))
```

## Validating a reactive object

The `useValidation` service will infer the type of the object passed in the first parameter.

You then have the possibility to validate each property of the object by creating the property of the same name in the second parameter.\
Your editor should suggest the available properties and their inferred type from the object passed in the first parameter.

```js:no-line-numbers
const user = reactive({
	birthdate: undefined as Date | undefined,
	firstName: 'john',
	lastName: 'doe',
	email: '',
})

// Combining several types of validation rules
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

## Retrieving full results

The `getResults()` method will allow you to retrieve the complete result for each validation rule.

:::tip
The `getResult(value, ruleParams)` method will do the same for a value and a rule passed as parameters.
:::

Following the example of the **validator** above, you will get this:


```ts:no-line-numbers
validator.getResults();

/** returns
{
	"birthdate": [
		{
			"result": false,
			"level": "error"
		}
	],
	"firstName": [
		{
			"result": true,
			"message": "Requis",
			"level": "error"
		}
	],
	"lastName": [
		{
			"result": true,
			"message": "Custom error message",
			"level": "error"
		}
	],
	"email": [
		{
			"result": true,
			"message": "Email non valide",
			"level": "error"
		},
		{
			"result": false,
			"level": "error",
			"message": "Email should include \"doe\""
		}
	]
}
*/
```

## Binding with the template

The `useValidation` service integrates seamlessly with **Orion** components via the `validation` prop and the method `myValidator.rule('...')` of the service instance *(example below)*.\
This method takes as a parameter the name of one of the properties of the object listing the validation rules.\
Your editor should automatically infer the type and suggest the available rules.

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

You can, if needed, customize the error message in the template *(line 9)* or in the validator *(line 27)*.

## Validation Status

The `useValidation` service instance will transparently register **Orion** form components using one of its rules via the `validation` prop.

By default, only fields that have been **focus** will display the result of the validation upon **blur**.
You can display the validation on all fields with the method `showValidationState`, for example, if the method `myValidator.validate()` returns **false**.

The method `hideValidationState` allows hiding the validation state on fields that have not yet been **focus**.
To hide the state on all fields, you will need to use the method `resetValidationState`.

Observe this behavior in the [full example](#full-example)

## Examples

::: demo:(service)
ValidationField
:::

::: demo:(service)
ValidationPassword
:::

:::tip
To see the default behavior, refer to [Composants > Password](../components/OrionPassword.md).
:::

::: demo:(service)
ValidationForm
:::

<service-preview/>
