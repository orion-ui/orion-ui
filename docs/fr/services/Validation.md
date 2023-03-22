---
lang: fr-FR
title: Validation
description:
---

# Service Validation

Ce service est utilisé pour effectuer une validation sur un champ ou sur un formulaire pour vérifier chaque champ.

<service-preview />

## Usage

### Validation de champ

Pour ajouter facilement une validation sur un champ, utilisez la prop `validation`.

Cela peut être une fonction qui retourne un booléen, ou l'une de ces règles :

```js
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
	'email',
];
```

::: demo:(service)
ValidationField
:::

::: demo:(service)
ValidationPassword
:::

:::tip
Pour voir le comportement par défaut, se référer à [Composants > Password](../../fr/components/OrionPassword.md).
:::

### Validation de formulaire

Pour créer une validation de formulaire, les valeurs à vérifier doivent appartenir à un objet réactif :

```js
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

Ensuite, créer un second objet qui a comme propriétés les noms des champs à vérifier, et en valeur la ou les règles à vérifier.\
Cela peut être une fonction qui retourne un booléen, ou l'une de ces règles :

```js
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
	'email',
];
```

**Exemple :**

```js
let tab = {
	name: 'required|length:5',
	phone: 'phone:mobile',
	choice: 'required',
	['password.value']: 'required|hasLowerase|hasUppercase|hasNumber',
	radio: () => {
		return user.radio === 'True';
	},
};
```

Enfin, créer une instance de ce service et appeler la fonction `validate` pour récupérer le résultat de la validation.

::: demo:(service)
ValidationForm
:::

### État de la validation

Lorsque que la validation est utilisée dans un formulaire, il est ppossible d'appeler la fonction `showValidationState` pour afficher les champs en erreur et en succès.\
`hideValidationState` permet de masquer l'état de la validation au niveau des champs, mais si des champs on déjà eu un focus ils resteront en erreur.\
`resetValidationState` permet de retirer l'historique de focus sur chaque champ et ensuite masquer l'état de la validation.

Essayez la validation avec l'exemple ci-dessus.
