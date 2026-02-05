<template>
	<div class="flex fd-c g-12">
		<div class="flex fd-c g-8">
			<strong>Simple selection</strong>
			<o-toggle-button-group v-model="vModel">
				<o-toggle-button :name="1">
					Option 1
				</o-toggle-button>
				<o-toggle-button :name="2">
					Option 2
				</o-toggle-button>
				<o-toggle-button :name="3">
					Option 3
				</o-toggle-button>
			</o-toggle-button-group>
		</div>

		<div class="flex fd-c g-8">
			<strong>Multiple selection</strong>
			<o-toggle-button-group
				v-model="vModelMultiple"
				multiple>
				<o-toggle-button
					prefix-icon="format_italic"
					:name="1"/>
				<o-toggle-button
					prefix-icon="format_underlined"
					:name="2"/>
				<o-toggle-button
					prefix-icon="text_format"
					:name="3"/>
				<o-toggle-button
					prefix-icon="format_list_numbered"
					:name="4"/>
				<o-toggle-button
					prefix-icon="format_bold"
					:name="5"/>
			</o-toggle-button-group>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const vModel = ref();
const vModelMultiple = ref([1, 3]);

</script>

@hl {23}

@lang:en
### Behavior

Two behaviors are available:
- **Single selection**: Only one button can be active at a time. Clicking another button deactivates the previous one.\
- **Multiple selection**: Multiple buttons can be active simultaneously. Clicking an active button deactivates it, and vice versa.

By default, only one button can be active at a time.
To enable multiple selection, set the `multiple` prop to true on the `o-toggle-button-group` component.

@lang

@lang:fr
### Comportement

Deux comportements sont disponibles :\
- **Simple sélection**: Un seul bouton peut être actif à la fois. Cliquer sur un autre bouton désactive le précédent.\
- **Sélection multiple**: Plusieurs boutons peuvent être actifs simultanément. Cliquer sur un bouton actif le désactive, et vice versa.

Par défaut, un seul bouton peut être actif à la fois.\
Pour activer la sélection multiple,
définissez la props `multiple` à true sur le composant `o-toggle-button-group`
@lang
