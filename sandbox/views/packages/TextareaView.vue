<template>
	<o-page title="Textarea">
		<pre>Textarea</pre>
		<div class="row row--grid">
			<div class="col-sm-4">
				<o-textarea
					v-model="value"
					label="My label trop cool"
					show-length
					prefix-icon="archive"
					suffix-icon="archive"
					:maxlength="30"
					clearable
					:validation="val => val?.length > 12"
					@input="test"/>
			</div>
			<div class="col-sm-4">
				<o-input
					v-model="value"
					label="My label"
					clearable
					required
					suffix-icon="archive"/>
			</div>
		</div>

		<hr>

		<input
			v-model="value"
			@input="test">
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref('Lorem ipsum');

function test () {
	console.log('tete');
}
</script>
