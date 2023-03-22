---
lang: en-US
title: Validation service
description:
---

# Validation service

This service is used to perform validation on a field or on a form to check every input.

<service-preview />


## Usage

### Field validation

You can easily add a validation for a field with the props `validation`.

It can be a custom function which returns a boolean, or one or more rules from : 
``` js
  [
		'required', 
		'hasLowercase', 
		'hasUppercase', 
		'hasNumber', 
		'hasSpecialChar', 
		'length', 
		'phone', 
		'password', 
		'passwordConfirm', 
		'email' 
	]
```

::: demo:(service)
ValidationField
:::

::: demo:(service)
ValidationPassword
:::

:::tip
If you want to see the default behaviour, you can look at [Components > Password](../components/OrionPassword.md)  
:::



### Form validation

To create a form validation, all the values to check must be in a reactive object:

``` js
let user = reactive({
	name: '',
	choice: false,
	radio: null,
	password: {
		value: null,
		passwordConfirm: null,
	},
	phone: {
		phoneCountryCode: 'FR',
		phoneNumber: null,
	},
});
```

Then, create a second object which has the name of the field to check, and the associated rules to verify. It can be a custom function which returns a boolean, or one or more rules from : 
``` js
  [
		'required', 
		'hasLowercase', 
		'hasUppercase', 
		'hasNumber', 
		'hasSpecialChar', 
		'length', 
		'phone', 
		'password', 
		'passwordConfirm', 
		'email' 
	]
```

**Object example :**

``` js
let tab = {
	name: 'required|length:5',
	phone: 'phone:mobile',
	choice: 'required',
	['password.value']: 'required|hasLowerase|hasUppercase|hasNumber',
	radio: () => {return user.radio === 'True'; },
};
```


Finally, create an instance of this service and call the `validate` function to get the result of the form validation.

::: demo:(service)
ValidationForm
:::

### Validation state

When using validation on a form, you can call the function `showValidationState` to show if the fields are in success or in error.

`hideValidationState` will hide the validation state on the fields, but the fields that have already been focused will stayed in error.

`resetValidationState` will remove the focus history on each field and then remove the validation state.

You can try it on the example with the form above.
