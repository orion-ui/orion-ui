<template>
	<div class="row row--grid">
		<div class="col-sm-4">
			<o-textarea
				v-model="value"
				label="Tristique Fusce"
				prefix-icon="check"/>
		</div>
		<div class="col-sm-4">
			<o-textarea
				v-model="value"
				label="Tristique Vestibulum"
				suffix-icon="calendar_today"/>
		</div>
		<div class="col-sm-4">
			<o-textarea
				v-model="value"
				label="Lorem Vehicula"
				prefix-icon="warning"
				suffix-icon="check"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref(null);
</script>

<style lang="less" scoped>
.textarea-icon {
  display: flex;
  justify-content: space-between;
}
</style>

@hl {7,13,19-20}

@lang:en
### Icons

You can easily add icons on the textarea with the props `prefixIcon` and `suffixIcon`.

:::tip Reminder
You can also use `prefixFontIcon` and `suffixFontIcon` props if you use your own icon font.
:::
@lang

@lang:fr
### Icônes
Il est possible d'ajouter une icône avant ou après le texte avec les props `prefixIcon` et `suffixIcon`.

:::tip Rappel
Vous pouvez également utiliser les props `prefixFontIcon` et `suffixFontIcon` si vous utilisez votre propre police d'icônes.
:::
@lang
