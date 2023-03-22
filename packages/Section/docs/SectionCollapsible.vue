<template>
	<div class="pa-sm">
		<o-section
			v-model:collapsed="sectionCollapsed"
			:title="`Section collapsed : ${sectionCollapsed}`"
			collapsible>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Duis sagittis viverra vulputate. Nunc ultricies ante urna.
				Aliquam sapien tortor, auctor sed consequat ac, tempor id nibh.
				Aenean diam mauris, venenatis et orci cursus, mollis ultrices nunc.
			</p>
			<p>
				Nullam eu ipsum eu nulla feugiat eleifend at id sem.
				Nunc id dui sed nibh interdum ultrices.
				Praesent eu erat iaculis, venenatis ligula non, fringilla turpis.
				Ut ut molestie nisi. Nulla facilisi. Duis volutpat imperdiet nisi.
			</p>
		</o-section>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const sectionCollapsed = ref(true);
</script>

@hl {4,6,26}

@lang:en
### Collapsible

Use the prop `collapsible` to easily define if the section content can be collapsed.\
The `collapsed` attribut is used to set the default state of the content.
@lang1

@lang:fr
### Section rétractable

Avec la prop `collapsible` il est possible de définir si le contenu de la section peut se rétracter.\
La prop `collapsed` quant à elle permet de définir l'état initial du contenu.
@lang
