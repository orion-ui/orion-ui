<template>
	<div>
		<o-button @click="showProgrammaticModal()">
			Show modal with nested component
		</o-button>
	</div>
</template>

<script setup lang="ts">
import { useModal } from 'lib';
import NestedComp from './NestedComp.vue';

function showProgrammaticModal () {
	useModal({
		Nested: NestedComp,
		NestedProps: { title: 'Title from nested props' },
	});
}
</script>

@hl {3,13-18}

@lang:en
### Programmatic modal & Nested component

You can insert an existing component in the modal with the property `Nested`.

Props can be passed to the nested component with the property `NestedProps`.

Take a look at the source code below.

:::tip Access parent OrionModal instance
In the `script` part of your nested component : `const _modal = inject('_modal');`

See the **Nested component source code** below the demo.
:::
@lang

@lang:fr
### Modal programmatique & Composant imbriqué

Il est possible d'imbriquer un composant existant dans la modal avec la propriété `Nested`.

Les props peuvent être passées à ce composant avec la propriété `NestedProps`.

Jetez un oeil au code source ci-dessous.

:::tip Accéder à l'instance parente d'OrionModal
Dans la partie `script` de votre composant imbriqué : `const _modal = inject('_modal');`

Voir le **Nested component source code** sous la demo.
:::
@lang
