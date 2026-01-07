<template>
	<aside class="toc-container" v-if="state.titles.length">
		<nav class="toc-content">
			<h5 @click="useResponsive().onPhone ? scrollToTop() : undefined">
				{{ tocTitle }}
			</h5>
			<ul class="toc-list">
				<li
					v-for="item in state.titles"
					:key="item.id"
					class="toc-list__item"
					:class="`toc-list__item--${item.tagName}`"
				>
					<a :href="'#' + item.id" :id="'toc-' + item.id">
						{{ capitalizeFirstLetter(item.innerText.replace(/#\s?/, '')) }}
					</a>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<script setup lang="ts">
import {
	onMounted,
	onUpdated,
	onUnmounted,
	reactive,
	watch,
	nextTick,
	computed,
} from 'vue';
import { throttle } from 'lodash-es';
import { capitalizeFirstLetter } from '@utils/tools';
import { Bus, useResponsive } from '@/lib';
import { usePageFrontmatter } from 'vuepress/client';
import { useRouter } from 'vue-router';

const scrollSpy = throttle(() => {
	checkActive();
}, 100);

const frontmatter = usePageFrontmatter();

const sectionMargin = 250;

const state = reactive({
	titles: [] as HTMLElement[],
});

Bus.on('AttributeTable:mounted', getTitles);
Bus.on('ServicePreview:mounted', getTitles);

Bus.on('AttributeTable:unMounted', () => {
	state.titles.length = 0;
});
Bus.on('ServicePreview:unMounted', () => {
	state.titles.length = 0;
});

const tocTitle = computed(() => {
	if (frontmatter.value.lang?.includes('en')) {
		return useResponsive().onPhone ? 'Return to top' : 'On this page';
	} else {
		return useResponsive().onPhone ? 'Retour en haut' : 'Sur cette page';
	}
});

const router = useRouter();
watch(
	() => router.currentRoute.value,
	(to, from) => {
		if (from.fullPath !== to.fullPath) {
			nextTick(getTitles);
		}
	},
);

onMounted(() => {
	window.addEventListener('scroll', scrollSpy);
	getTitles();
	checkScroll();
});

onUpdated(() => {
	checkScroll();
});

onUnmounted(() => {
	window.removeEventListener('scroll', scrollSpy);
	checkScroll();
});

function scrollToTop() {
	window.scrollTo(0, 0);
}

function getTitles() {
	state.titles.length = 0;
	nextTick(() => {
		const tab = document.querySelectorAll('h2, h3');
		tab.forEach((item) => {
			if (item.id !== '' && !state.titles.includes(item as HTMLElement))
				state.titles.push(item as HTMLElement);
		});
		nextTick(checkScroll);
	});
}

function checkScroll() {
	checkActive();
}

function checkActive() {
	const sections = [...state.titles];
	const current =
		sections.length -
		[...sections]
			.reverse()
			.findIndex(
				(section) => window.scrollY >= section.offsetTop - sectionMargin,
			) -
		1;
	let currentActive = 0;

	if (current !== currentActive || current === 0) {
		removeAllActive();
		currentActive = current;
		makeActive(current);
	}
}

function makeActive(link: number) {
	const menu_links = document.querySelectorAll('.toc-list__item a');
	menu_links[link]?.classList.add('active');
}

function removeActive(link: number) {
	const menu_links = document.querySelectorAll('.toc-list__item a');
	menu_links[link]?.classList.remove('active');
}

function removeAllActive() {
	const sections = [...state.titles];
	[...Array(sections.length).keys()].forEach((link) => removeActive(link));
}
</script>

<style scoped lang="less">
.toc-list {
	&__item {
		font-size: var(--o-size-default);

		&--H3 {
			padding-left: var(--o-space-8);
		}
	}
}
</style>
