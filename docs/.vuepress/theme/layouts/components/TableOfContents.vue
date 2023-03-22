<template>
	<aside class="toc-container" v-if="state.titles.length">
		<nav class="toc-content">
			<h5>{{tocTitle}}</h5>
			<ul class="toc-list">
				<li
					v-for="item in state.titles"
					:key="item.id"
					class="toc-list__item"
					:class="`toc-list__item--${item.tagName}`">
					<a 
						:href="'#' + item.id"
						:id="'toc-' + item.id"
						@click="makeActiveOnclick(item.id)">
						{{ capitalizeFirstLetter(item.innerText.replace(/#\s?/, '')) }}
					</a>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, onUnmounted, reactive, watch, nextTick, computed } from 'vue';
import { throttle } from 'lodash-es';
import { capitalizeFirstLetter } from '@utils/tools';
import { Bus } from '@/lib';
import { usePageFrontmatter } from '@vuepress/client';
import { useRouter } from 'vue-router';
import { DefaultThemePageFrontmatter } from 'vuepress-vite';

const scrollSpy = throttle(() => {
		checkActive();
}, 100);

const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()

const sectionMargin = 250;

const state = reactive({
	titles: [] as HTMLElement[],
})

Bus.on('AttributeTable:mounted', getTitles);
Bus.on('ServicePreview:mounted', getTitles);

Bus.on('AttributeTable:unMounted', () => {
	state.titles.length = 0;
});
Bus.on('ServicePreview:unMounted', () => {
	state.titles.length = 0;
});

const tocTitle = computed(() => {
	if(frontmatter.value.lang?.includes('en'))
		return 'On this page'
	else 
		return 'Sur cette page'
})

const router = useRouter();
watch(() => router.currentRoute.value, () => {
	nextTick(() => {
		getTitles();
	});
})

onMounted(() => {
	window.addEventListener("scroll", scrollSpy);
	getTitles();
	checkScroll();
});

onUpdated(() => {
	checkScroll();
});

onUnmounted(() => {
	window.removeEventListener("scroll", scrollSpy);
	checkScroll();
});

function getTitles () {
	state.titles.length = 0;
		const tab = document.querySelectorAll('h2, h3');
		tab.forEach((item) => {
			if (item.id !== '')
				state.titles.push(item as HTMLElement);
		});
}

function checkScroll () {
	checkActive()
}

function checkActive() {
	const sections = [...state.titles];
	const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin ) - 1
	let currentActive = 0;

	if (current !== currentActive || current === 0) {
		removeAllActive();
		currentActive = current;
		makeActive(current);
	}
}

function makeActive (link: number) {
	const menu_links = document.querySelectorAll(".toc-list__item a");
	menu_links[link]?.classList.add("active");
}

function removeActive (link: number) {
	const menu_links = document.querySelectorAll(".toc-list__item a");
	menu_links[link]?.classList.remove("active");
}

function removeAllActive () {
	const sections = [...state.titles];
	[...Array(sections.length).keys()].forEach((link) => removeActive(link));
} 

function makeActiveOnclick(item: string) {

	const element = document.getElementById('toc-' + item);
	setTimeout( () => {
		removeAllActive();
		element?.classList.add("active");
	}, 100) 
}
</script>

<style scoped lang="less">
.toc-content {
	width: 12.5rem;
}

.toc-list {
	&__item {
		font-size: var(--size-default);
		
		&--H3 {
			padding-left: var(--fluid-10px);
		}
	}
}
</style>
