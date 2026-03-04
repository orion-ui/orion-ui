<template>
	<o-page title="Checkbox">
		<o-alert>
			<pre>fieldBoolean: {{ fieldBoolean }}</pre>
		</o-alert>
		<div class="row row--grid">
			<div class="col-sm-3">
				<o-checkbox
					v-model="fieldBoolean"
					label="boolean"
					hint="This is a boolean field"
					:validation="val => !!val"
					validation-error-message="bweeeeee"
					required/>
			</div>
			<div class="col-sm-3">
				<o-checkbox
					v-model="fieldBoolean"
					label="tototo"
					hint="This is a boolean field"
					:validation="false"
					validation-error-message="bweeeeee"
					required>
					<div>multiline label</div>
					<em>using slot</em>

					<template #hint>
						turlktutu <strong>sdlmkj</strong>
					</template>
				</o-checkbox>
			</div>
			<div class="col-sm-3">
				<o-checkbox
					v-model="fieldBoolean"
					label="boolean"
					hint="This is a boolean field"
					:validation="false"
					validation-error-message="bweeeeee"
					reverse
					required/>
			</div>
		</div>

		<hr>

		<o-alert>
			<pre>fieldMultiple: {{ fieldMultiple }}</pre>
		</o-alert>
		<div class="flex g-16">
			<o-checkbox
				v-model="fieldMultiple"
				multiple
				label="toto1"
				input-value="toto1"
				inline/>
			<o-checkbox
				v-model="fieldMultiple"
				multiple
				label="toto2"
				input-value="toto2"
				color="success"
				inline/>
		</div>
		<o-checkbox
			v-model="fieldMultiple"
			multiple
			label="toto3"
			input-value="toto3"
			disabled/>
		<o-checkbox
			v-model="fieldMultiple"
			multiple
			disabled
			label="toto4"
			input-value="toto4"
			icon-check="access_alarm"/>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fieldBoolean = ref<boolean>();
const fieldMultiple = ref(['toto2', 'toto3', 'toto4']);
</script>
