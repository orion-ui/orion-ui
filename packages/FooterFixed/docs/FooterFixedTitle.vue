<template>
	<o-toggle
		v-model="state.visible"
		label="Visible"/>

	<o-footer-fixed
		:visible="state.visible"
		title="Lorem ipsum">
		{{ state.content }}
	</o-footer-fixed>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
	visible: false,
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor',
});
</script>

<style scoped lang="less">
.playground {
  display: flex;
  align-items: center;
}
</style>

@hl {8-9}

@lang:en
### Title

You can set a title with the corresponding prop and add content with the default slot.
@lang

@lang:fr
### Titre

Pour ajouter un titre, utilisez la prop `title` et ajoutez du contenu avec le slot `default`.
@lang
