<template>
	<div>
		<o-button @click="showProgrammaticAside()">
			Show aside with nested component
		</o-button>
	</div>
</template>

<script setup lang="ts">
import { useAside } from 'lib';
import NestedComp from './NestedComp.vue';

function showProgrammaticAside () {
	useAside({
		Nested: NestedComp,
		NestedProps: { title: 'Title from nested props' },
	});
}
</script>

@hl {3,13-18}

@lang:en
### Programmatic aside & Nested component

You can insert an existing component in the aside with the property `Nested`.

Props can be passed to the nested component with the property `NestedProps`.

Take a look at the source code below.

:::tip Access parent OrionAside instance
In the `script` part of your nested component : `const _aside = inject('_aside');`
:::
@lang

@lang:fr
### Aside programmatique & Composant imbriqué

Il est possible d'imbriquer un composant existant dans l'aside avec la propriété `Nested`.

Les props peuvent être passées à ce composant avec la propriété `NestedProps`.

Jetez un oeil au code source ci-dessous.

:::tip Accéder à l'instance parente d'OrionAside
Dans la partie `script` de votre composant imbriqué : `const _aside = inject('_aside');`
:::
@lang
