<template>
	<o-page title="Radio">
		<o-alert>
			<pre>fieldValue: {{ fieldValue }}</pre>
		</o-alert>
		<div class="flex g-16 ai-fs">
			<o-radio
				v-model="fieldValue"
				label="toto1"
				icon-check="airplay"
				input-value="toto1"
				:validation="val => val === 'toto1'"
				validation-error-message="value should be toto1"/>
			<o-radio
				v-model="fieldValue"
				label="toto2"
				reverse
				input-value="toto2"
				:validation="val => val === 'toto2'"
				validation-error-message="value should be toto2">
				<template #hint>
					Hint for toto2
					<span>dsfklmjh</span>
				</template>
				ok <strong>dude</strong>
			</o-radio>
			<o-input
				model-value="dfkjh"
				label="tutu"/>
		</div>
		<o-radio
			v-model="fieldValue"
			label="toto3"
			input-value="toto3"
			hint="qsdfkjh"
			disabled/>
		<o-radio
			v-model="fieldValue"
			label="toto4"
			input-value="toto4"/>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fieldValue = ref('toto2');
</script>
