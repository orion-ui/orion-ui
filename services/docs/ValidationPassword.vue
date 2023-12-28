<template>
	<div class="row row--grid">
		<div class="col-sm-6">
			<o-password
				v-model="user.password"
				label="Password"
				password-tooltip/>
		</div>

		<div class="col-sm-6">
			<o-password
				v-model="user.passwordConfirm"
				label="Confirm password"
				password-tooltip
				:password-to-confirm="user.password"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

let user = reactive({
	password: undefined as Undef<string>,
	passwordConfirm: undefined as Undef<string>,
});
</script>

@hmr services/Validation.md

@hl {7,14-15,23-26}

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
