<template>
	<div class="flex fd-c g-8 ai-c">
		<o-upload
			v-model="state.filesA"
			multiple
			label="Drag $format files here with a max size of $fileMaxSize Mo"
			:file-types="['image/png', 'image/jpeg']"/>

		<o-upload
			v-model="state.filesB"
			:file-types="['application/pdf']">
			Only one PDF file allowed here !
		</o-upload>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const state = reactive({
	filesA: [],
	filesB: [],
});
</script>

<style scoped lang="less">
.orion-upload {
  width:28rem;
	max-width:100%;
}
</style>

@hl {5-7,11-12}


@lang:en
### Configuration

Define the maximum file size with the `maxFileSize` prop
and the accepted file formats with the `fileTypes` prop (array of MIME types).

The `multiple` prop allows you to upload multiple files (pretty obvious :wink:).

You can customize the text in the upload area by using the `default` slot,
or the `label` prop with the keywords **$format** and **$fileMaxSize**.
@lang

@lang:fr
### Configuration

Definissez la taille maximale d'un fichier avec la prop `maxFileSize`
ainsi que les formats de fichiers acceptés avec la prop `fileTypes` (tableau de types MIME).

La prop `multiple` vous permet de téléverser plusieurs fichiers (plutôt évident :wink:).

Vous pouvez personnaliser le texte dans la zone d'upload en utilisant le slot `default`,
ou la prop `label` avec les mots clés **$format** and **$fileMaxSize**.
@lang
