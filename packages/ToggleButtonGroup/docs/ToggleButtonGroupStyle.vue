<template>
	<div class="flex fd-c g-12">
		<div class="flex fd-c g-8">
			<strong>Classic style</strong>
			<o-toggle-button-group
				v-model="vModel">
				<o-toggle-button
					v-for="color of colors"
					:key="color"
					:model-value="true"
					:name="1"
					:color="color">
					{{ color }}
				</o-toggle-button>
			</o-toggle-button-group>
		</div>

		<div class="flex fd-c g-8">
			<strong>Nude style</strong>
			<o-toggle-button-group
				v-model="vModel">
				<o-toggle-button
					v-for="color of colors"
					:key="color"
					:name="1"
					nude
					:model-value="true"
					:color="color">
					{{ color }}
				</o-toggle-button>
			</o-toggle-button-group>
		</div>
	</div>
</template>

<script setup lang="ts">
import { colors } from 'lib';
import { ref } from 'vue';

const vModel = ref(1);


</script>

@hl {23}

@lang:en
### Style

You can customize the appearance of the toggle buttons by passing properties to the `childProps` prop of the `o-toggle-button-group`.
This allows you to set attributes such as `nude`, `prefixIcon` or any other props from `OrionToggleButtonProps

:::tip Good to know
It is possible to override the `childProps` for individual toggle buttons by passing props directly to the `o-toggle-button` components.
:::


@lang

@lang:fr
### Style

Vous pouvez personnaliser l'apparence des boutons bascule en passant des propriétés à la prop `childProps` du composant `o-toggle-button-group`.
Cela vous permet de définir des attributs tels que `nude`, `prefixIcon` ou toute autre prop de `OrionToggleButtonProps` pour tous les boutons du groupe.


:::tip Good to know
Il est possible de surcharger les `childProps` pour des boutons bascule individuels en passant des props directement aux composants `o-toggle-button`.
:::
@lang
