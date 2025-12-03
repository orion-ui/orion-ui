<template>
	<div class="pa-sm">
		<o-section title="Cursus Egestas">
			Vestibulum id ligula porta felis euismod semper.
			Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.
			Ut fermentum massa justo sit amet risus.
			Maecenas sed diam eget risus varius blandit sit amet non magna.
			Aenean lacinia bibendum nulla sed consectetur.
		</o-section>

		<o-section
			:align="align"
			gap="xs">
			<o-button
				color="error"
				outline>
				Cancel
			</o-button>
			<o-button color="success">Save</o-button>
		</o-section>
	</div>

	<hr>

	<div class="flex g-32 jc-c">
		<o-radio
			v-for="(option, index) in alignOptions"
			:key="index"
			v-model="align"
			:label="option"
			:input-value="option"/>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const align = ref<OrionSection.Props['align']>('right');
const alignOptions: OrionSection.Props['align'][] = [
	'center',
	'left',
	'right',
	'stretch',
];
</script>

@hl {12,38}

@lang:en
### Actions only
@lang

@lang:fr
### Actions uniquement
@lang
