<template>
	<div>
		<o-password
			v-model="user.password.value"
			password-tooltip
			label="Password"
			:validation="validator.rule('password.value')"
			:validation-messages="passwordValidationMessages"/>

		<o-password
			v-model="user.password.passwordConfirm"
			password-tooltip
			label="Confirm password"
			:validation="validator.rule('password.passwordConfirm')"/>
	</div>
</template>

<script setup lang="ts">import { reactive } from 'vue';
import { useValidation } from '../../lib';


let user = reactive({
	password: {
		value: null,
		passwordConfirm: null,
	},
});

let rules = {
	['password.value']: 'required|hasLowerase|hasUppercase|hasNumber',
	['password.passwordConfirm']: 'passwordConfirm:password.value',
};

const validator = useValidation(user, rules);

const passwordValidationMessages: OrionValidatorMessages = {
	hasLowercase: 'Need lowercase !',
	hasUppercase: 'Need uppercase !',
	hasNumber: 'Need numbers !',
};
</script>

@hmr services/Validation.md

@hl {5,7-8,12,14,22-27,29-32,34}

@lang:en
### Password validation

When using a `o-password` component with the props `tooltip`, it is possible to change the default verifications and messages.
You need to add the prop `validation-messages` and pass an object with the rule as a key, and the associated description as a value.
@lang

@lang:fr
### Validation de mot de passe

Lorsqu'un composant `o-password` est utilisé avec la prop `tooltip`, il est possible de changer les vérifications et les messages par défaut.\
Pour cela, ajoutez la prop `validation-messages` et passez en paramètre un objet qui a les règles à respecter en propriétés,
et la description associée en valeur.
@lang
