<template>
	<div class="pa-sm">
		<o-section
			v-bind="state"
			v-model:collapsed="state.collapsed">
			<template #actions>
				<o-button color="inverse">
					Action
				</o-button>
			</template>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et sem commodo, feugiat lorem ut, aliquam eros.
				Duis sagittis viverra vulputate. Nunc ultricies ante urna, eget aliquet lectus consectetur et.
				Pellentesque lectus massa, fringilla eu risus id, semper volutpat nunc. Curabitur libero odio, condimentum ac massa eget, placerat commodo mi.
				Aliquam sapien tortor, auctor sed consequat ac, tempor id nibh. In eget quam turpis.
				Aenean diam mauris, venenatis et orci cursus, mollis ultrices nunc.
				Nullam eu ipsum eu nulla feugiat eleifend at id sem. Nunc id dui sed nibh interdum ultrices.
				Praesent eu erat iaculis, venenatis ligula non, fringilla turpis.
				Ut ut molestie nisi. Nulla facilisi. Duis volutpat imperdiet nisi, quis semper enim hendrerit in.
			</p>
			<p>
				Quisque sed blandit nulla, et rhoncus libero. Nunc a sodales nunc. Fusce ultrices sit amet lacus vitae interdum.
				Ut ultricies justo sit amet nulla dictum finibus. Phasellus at sollicitudin nulla, id euismod sapien.
				Quisque rutrum urna tellus, commodo pellentesque quam facilisis a. Vivamus tincidunt augue id metus interdum ullamcorper.
			</p>
		</o-section>
	</div>

	<hr>

	<div class="row row--grid">
		<div class="col-sm-4">
			<o-input
				v-model="state.title"
				label="Title"/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model="state.subtitle"
				label="Subtitle"/>
		</div>
	</div>

	<div class="row row--grid row--toggles">
		<div class="col-sm-4">
			<o-toggle
				v-model="state.collapsible"
				label="Collapsible"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.collapsed"
				label="Collapsed"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
	title: 'Section',
	subtitle: 'Subtitle',
	align: 'right' as 'left' | 'center' |'right' | 'stretch',
	collapsible: true,
	collapsed: false,
});
</script>

### Playground
