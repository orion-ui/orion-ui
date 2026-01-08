<template>
	<o-password
		v-model="state.value"
		password-tooltip
		:rules="['hasSpecialChar', 'hasUppercase', 'hasMinLength:8']"
		label="Password"/>
</template>

<script setup lang="ts">
import { reactive } from 'vue';


const state = reactive({
	value: undefined,
	passwordToConfirm: undefined,
});
</script>

@hl {4,5}

@lang:en
### Password Tooltip

You can display password rules with the prop `passwordTooltip` which will show a tooltip of the rules that must be applied.
You can also specify your own password rules with the prop `rules` or with the [validation service](/services/validation.md).

@lang

@lang:fr
### Tooltip de mot de passe

Il est possible d'afficher une info-bulle avec les règles que doit repespecter le mot de passe avec la prop `passwordTooltip`.\
Il est également possible de spécifier vos propres règles de mot de passe avec le [service de validation](/fr/services/validation.md).

@lang
