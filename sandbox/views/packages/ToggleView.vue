<template>
	<o-page title="Toggle">
		<o-alert>
			<pre>fieldValue: {{ fieldValue }}</pre>
		</o-alert>
		<div class="flex g-16">
			<o-radio
				v-model="fieldSize"
				label="SM"
				input-value="sm"
				:size="fieldSize"/>
			<o-radio
				v-model="fieldSize"
				label="MD"
				input-value="md"
				:size="fieldSize"/>
		</div>
		<div class="flex-inline">
			<o-toggle
				v-for="(color, index) in colors"
				:key="index"
				v-model="fieldValue"
				:color="color"
				label="toto1"
				reverse
				:size="fieldSize"/>
		</div>
		<div class="flex ai-fs">
			<o-toggle
				v-model="fieldValue"
				reverse
				:validation="false"
				validation-error-message="qsdfkjh"
				:size="fieldSize">
				<template #hint>
					this a toggle <em>hint</em>
				</template>
				another label using <strong>default slot</strong>
			</o-toggle>
			<o-checkbox
				v-model="fieldValue"
				label="fdsqlkjh"
				:validation="false"
				validation-error-message="qsdfkjh"
				:size="fieldSize">
				<template #hint>
					this a toggle <em>hint</em>
				</template>
			</o-checkbox>
		</div>
		<div class="flex ai-fs">
			<o-input
				label="sqdf"
				:size="fieldSize"
				clearable
				prefix-icon="align_horizontal_left"/>
			<o-toggle
				v-model="fieldValue"
				label="fqsmljqsdf fqsklj fdlsqkj fsqkljd fsdkqlj fsqdliuf qsdlifsqdlkjh  oiazjfe ozaeijf zamleifj mldsqkfj fqsdlmijf smqoifdsjqmlksqdjf sqdomfij"
				:size="fieldSize">
				dsqmlkiqs sqdmklfj sqdmlk jsqdfmoidsqj<br>
				fqsomiu fdsqmlkjsdqo fsdiop
			</o-toggle>
		</div>
	</o-page>
</template>

<script setup lang="ts">
import { colors } from 'lib';
import { ref } from 'vue';

const fieldValue = ref(false);
const fieldSize = ref<Orion.FieldSize>('sm');
</script>
