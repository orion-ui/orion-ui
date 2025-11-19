<template>
  <h2>Namespaces</h2>

	<div v-for="(namespaceItem, key) in globalTypesDocData">
		<h3 :id="key">{{key}}</h3>

		<div v-for="(typeItem, key) in namespaceItem">
			<div class="type-item">
			<!--  <span class="type-item__name">{{typeItem.type}} </span>
		<code v-if="typeItem.generic"> &lt{{typeItem.generic}}&gt</code> =  -->
							
							<!-- <div class="oriondoc-demo__source">
								<code>{{typeItem.type}} =</code>
								<code >{{typeItem.description}}</code>
							</div> -->
						
					<Markdown :source="formatSource(typeItem)"/> 
				</div>
			</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Bus } from '@/lib';
import Markdown from 'vue3-markdown-it';
import globalTypesDocData from '@/docs/global-types-doc-data';

type GlobalTypesData<T> = Record<string, T>;
type TypeDataPrototype = Record<string, TypeDataItem>;
type TypeDataItem = {
  ns: string;
  type: string;
  generic?: string;
  description: string;
}

onMounted(() => {
Bus.emit('ServicePreview:mounted');
});

onUnmounted(() => {
Bus.emit('ServicePreview:unMounted');
});

function formatSource (item: any) {
  return `
\`\`\`ts
${item.description}
\`\`\`
`
}

</script>

<style scoped lang="less">
.type-item {
  margin-bottom: 1.25rem;

  &__name {
    font-family: var(--font-family-code);
    color: var(--text-info-default);
    margin-right: 0.25rem;
  }

  &_description {
    display: inline-flex;
  }
}
</style>
