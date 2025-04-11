<template>
	<div class="row row--grid">
		<div class="col-sm-6">
			<o-password
				v-model="state.value"
				password-tooltip
				label="Password"/>
		</div>
		<div class="col-sm-6">
			<o-password
				v-model="state.passwordToConfirm"
				:password-to-confirm="state.value"
				password-tooltip
				label="Password confirmation"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';


const state = reactive({
	value: undefined,
	passwordToConfirm: undefined,
});
</script>

@hl {4,8,9}

@lang:en
### Password confirmation

You can add password rules with the prop `passwordTooltip` which will display a tooltip of the rules that must be applied.
You can also specify your own password rules with the [validation service](/services/validation.md).

If you want to check the password with a confirmation input, you can use the prop `passwordToConfirm` to target the password input.
@lang

@lang:fr
### Confirmation de mot de passe

Il est possible d'afficher une info-bulle avec les règles que doit repespecter le mot de passe avec la prop `passwordTooltip`.\
Il est également possible de spécifier vos propres règles de mot de passe avec le [service de validation](/fr/services/validation.md).

Si vous souhaitez demander une confimation de mot de passe avec un second champ, il suffit d'y ajouter la prop
`passwordToConfirm` et indiquer quelle est la valeur à vérifier.
@lang
