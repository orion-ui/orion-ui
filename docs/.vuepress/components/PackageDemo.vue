<template>
	<ClientOnly>
		<slot v-bind="{ lang: cleanRouteLocale }"/>

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
			<o-button
				v-if="!hasNested"
				nude
				size="sm"
				color="info"
				suffix-icon="external_link"
				@click="tryOnStackblitz()">
				Try on Stackblitz
			</o-button>
		</div>

		<div v-show="showSource" class="oriondoc-demo__source" :id="demo.__name">
				<slot name="source"/>
		</div>

		<div ref="_rawSource" v-if="!hasNested" v-show="false">
			<slot name="rawSource"/>
		</div>
	</ClientOnly>
</template>

<script setup lang="ts">
import { addCopyFeatureToCode } from '@utils/tools'
import { useRouteLocale } from 'vuepress/client';
import { ref } from 'vue';
import * as sb from '../utils/stackblitz'
import sdk from '@stackblitz/sdk';

const _rawSource = ref<HTMLElement>();
const routeLocale = useRouteLocale().value.replace(/\//g, '');
const cleanRouteLocale = routeLocale.length ? routeLocale : 'en';
const props = defineProps<{
	demo: object & {__name: string}
	source: string
	hasNested: boolean
}>()

const showSource = ref(false);

function handleShowSourceClick () {
	showSource.value = !showSource.value
	addCopyFeatureToCode()
}

function tryOnStackblitz () {
	const sourceCode = _rawSource.value?.getElementsByTagName('code')[0]?.innerText ?? '';

	sdk.openProject({
		title: `Orion demo - ${props.demo.__name}`,
		description: `Try Orion's components`,
		template: 'node',
		files: {
			...sb.files,
      'src/Demo.vue': sourceCode,
    },
	}, {
		openFile: 'src/Demo.vue',
		showSidebar: false,
	});
}
</script>
