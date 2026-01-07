<template>
	<o-timeline
		v-model="activePane"
		horizontal>
		<o-timeline-pane
			name="pane1"
			complete
			disabled
			icon="check">
			Vestibulum id ligula porta felis euismod semper.
			Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
			Curabitur blandit tempus porttitor.
		</o-timeline-pane>
		<o-timeline-pane
			name="pane2"
			icon="image"
			complete>
			Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
			Aenean lacinia bibendum nulla sed consectetur.
			Nulla vitae elit libero, a pharetra augue.
		</o-timeline-pane>
		<o-timeline-pane
			name="pane3"
			pill="OK">
			Sed posuere consectetur est at lobortis.
			Maecenas faucibus mollis interdum.
			Maecenas sed diam eget risus varius blandit sit amet non magna.
		</o-timeline-pane>
	</o-timeline>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activePane = ref('pane2');
</script>

@hl {8,16,24}

@lang:en
### Style

With the prop `disabled` you can disabled a pill so the user cannot access it.

You can also add an icon on the pill with the prop `icon` (or `font-icon` if you are using your own icon font).

If no icon is set, then you can use the prop `pill` to display some text.
@lang

@lang:fr
### Style

Avec la prop `disabled` il est possible de désactiver une étape pour que l'utilisateur ne puisse pas y accéder.

Il est également possible d'ajouter une icône avec la prop `icon` (ou `font-icon` si vous utilisez votre propre police d'icône).

Si aucune icône n'est renseignée, la prop `pill` permet d'afficher du texte.
@lang
