<template>
	<ClientOnly>
		<slot v-bind="{ lang: siteLocale.lang.split('-')[0] }"/>

		<div class="oriondoc-demo__component">
			<component :is="demo"/>
		</div>

		<div class="oriondoc-demo__actions">
			<o-button
				nude
				size="sm"
				color="info"
				:suffix-icon="showSource ? 'unfold_less' : 'unfold_more'"
				@click="handleShowSourceClick">
				{{ showSource ? `Hide source` : `Show source` }}
			</o-button>
		</div>

		<div v-show="showSource" class="oriondoc-demo__source" :id="demo.__name">
				<slot name="source"/>
		</div>
	</ClientOnly>
</template>

<script setup lang="ts">
import { addCopyFeatureToCode } from '@utils/tools'
import { useSiteLocaleData } from '@vuepress/client';
import { ref } from 'vue';

const siteLocale = useSiteLocaleData()

const props = defineProps<{
	demo: object & {__name: string}
	source: string
}>()

const showSource = ref(false);

function handleShowSourceClick () {
	showSource.value = !showSource.value
	addCopyFeatureToCode()
}
</script>
