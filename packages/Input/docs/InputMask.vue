<template>
	<div class="row row--grid">
		<div class="col-sm-3">
			<o-input
				v-model="state.integer"
				mask="integer"
				label="Integer"/>
			<pre>vModel value: {{ state.integer }}</pre>
		</div>
		<div class="col-sm-3">
			<o-input
				v-model="state.decimal"
				mask="decimal"
				label="Decimal"/>
			<pre>vModel value: {{ state.decimal }}</pre>
		</div>
		<div class="col-sm-3">
			<o-input
				v-model="state.custom"
				mask="$d-$d{3}-$w"
				label="Custom mask"/>
			<pre>vModel value: {{ state.custom }}</pre>
			<pre>mask: $d-$d{3}-$w</pre>
		</div>
		<div class="col-sm-3">
			<o-input
				v-model="state.hour"
				mask="hour"
				label="Hour"/>
			<pre>vModel value: {{ state.hour }}</pre>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const state = reactive({
	integer: '',
	decimal: '',
	hour: '',
	custom: '',
});
</script>


@lang:en
### Mask
With the prop `mask`, you can dynamically format the user input, improving the user experience and input validation.

You can use default masks like `hour`, `decimal` or `integer`, or create your own using a string pattern.
By default, the mask is always visible, but you can change this behavior with the `staticMask` prop.

::: tip Reminder
  * The mask is applied only to the input field, not to the `v-model` value.
  * If you want to use a custom mask, the available tokens are:
    * `$d`: digits
    * `$w`: letters
    * `$s`: spaces
    * you can precise the number of tokens with `{n}` after the token, for example `$d{3}` will match 3 digits.
:::
@lang

@lang:fr
### Masque
Il est possible d'utiliser la prop `mask` pour formater dynamiquement les données saisies par l'utilisateur,
améliorant ainsi l'expérience utilisateur et la validation des entrées.

Vous pouvez utiliser des masques par défaut comme `hour`, `decimal` ou `integer`, ou créer les vôtres en utilisant un pattern de type string.
Par défaut le masque est toujours visible, mais vous pouvez changer ce comportement avec la prop `staticMask`.

::: tip Rappel
  * Le masque est appliqué uniquement au champ de saisie, et non à la valeur du `v-model`.
  * Si vous souhaitez utiliser un masque personnalisé, les tokens disponibles sont :
    * `$d`: chiffres
    * `$w`: lettres
    * `$s`: espaces
    * vous pouvez préciser le nombre de tokens avec `{n}` après le token, par exemple `$d{3}` correspondra à 3 chiffres.
:::
@lang
