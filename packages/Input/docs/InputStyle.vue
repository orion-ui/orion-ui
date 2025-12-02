<template>
	<div class="flex g-8">
		<o-input
			v-model="value"
			label="Clearable"
			clearable/>
		<o-input
			v-model="value"
			label="Force label floating"
			force-label-floating/>
		<o-input
			v-model="value"
			label="Disabled"
			disabled/>
		<o-input
			v-model="value"
			label="Readonly"
			readonly/>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref();
</script>

@hl {6,10,14,18}

@lang:en
### Basic features

With the `clearable` prop, you can clear the field with one click.

You can force the label to be floating, even if the field is empty with the prop `forceLabelFloating`.

You can also prevent data input with the props `disabled` and `readonly`.
@lang

@lang:fr
### Fonctionnalités basiques

La prop `clearable` permet d'ajouter une croix dans le champ de saisie pour pouvoir le vider d'un seul clic.

Il est possible de forcer le statut floattant du label, même si le champ est vide, avec la prop `forceLabelFloating`.

Les props `disabled` et `readonly` permettent de désactiver le champ ou de le mettre en lecture-seule.
@lang
