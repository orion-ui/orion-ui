<template>
		<div
			class="doc-content-wrapper"
			:class="[
				frontmatter.pageClass,
				{
					'sidebar--opened': sidebarOpened,
					'doc-content-wrapper--home': frontmatter.home,
				}
			]">
			<Sidebar v-if="shouldShowSidebar"/>
			
			<Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar()"/>
			
			<main class="doc-content">
				<Home v-if="frontmatter.home"/>
				<Content v-else/>
				<PageNav v-if="!frontmatter.home"/>
				<PageMeta v-if="!frontmatter.home"/>
				<div class="footer">
					<span><a href="https://choosealicense.com/licenses/mit/" target="_blank">MIT Licensed</a> 
						| Copyright © 2023-present Orion UI</span>
				</div>
			</main>
			
			<TableOfContent v-if="shouldShowToc"/>
		</div>
</template>


<script setup lang="ts">
import '../../styles/index.less';

import { nextTick, onMounted, ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { DefaultThemePageFrontmatter } from 'vuepress-vite';
import { usePageFrontmatter } from '@vuepress/client';
import { setThemeMode } from '@/lib';
import { addCopyFeatureToCode } from '@utils/tools';
import Sidebar from '@theme/Sidebar.vue';
import Navbar from '@theme/Navbar.vue';
import PageNav from '@theme/PageNav.vue';
import PageMeta from '@theme/PageMeta.vue';
import TableOfContent from './components/TableOfContents.vue';
import Home from './components/Home.vue';

const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()

const sidebarOpened = ref(false);
// navbar
const shouldShowNavbar = computed(() => frontmatter.value.navbar !== false)
const shouldShowSidebar = computed(() => frontmatter.value.home !== true)
const shouldShowToc = computed(() => frontmatter.value.home !== true && !frontmatter.value.pageClass?.includes('no-toc'))

const router = useRouter();

watch(() => router.currentRoute.value, () => {
	nextTick(() => {
		toggleSidebar();
		cleanCopyFeature();
		addCopyFeatureToCode();
		setTimeout(addGlobalTypesLink, 200);
	});
})

onMounted(() => {
	if (typeof MutationObserver !== 'undefined') {
		const darkModeObserver = new MutationObserver(setTheme);
		darkModeObserver.observe(document.documentElement, { attributeFilter: ['class'] })
	}

	setTheme();
	addCopyFeatureToCode();
	setTimeout(addGlobalTypesLink, 200);
});

function addGlobalTypesLink() {
	document.querySelectorAll('code')?.forEach((el) => {
		const typeRegex = /(?<before>\w*.*)?(?<type>Orion(\.\w*)+)(?<after>.*)?/

		if(typeRegex.exec(el.innerText.split('\n',1)[0]))
		{
			let spanBefore = document.createElement("span");
			let spanType = document.createElement("span");
			let spanAfter = document.createElement("span");

			let groups = typeRegex.exec(el.innerText)?.groups
			spanType.innerText = groups?.type ?? el.innerText.split(' ')[0];
			spanType.classList.add('global-type')

			spanBefore.innerText = groups?.before ?? ''

			if(groups?.after)
				spanAfter.innerText = groups?.after

			if(spanAfter.innerText.includes(':'))
				spanAfter.classList.add('data__value')
			
			el.innerText = '';

			if(spanBefore.innerText)
				el.appendChild(spanBefore)

			el.appendChild(spanType)

			if(spanAfter.innerText)
			el.appendChild(spanAfter)
			
			let link = '/globalTypes.html#Orion';
			if(frontmatter.value.lang?.includes('fr'))
				link = '/fr' + link
			
			if(spanType.innerHTML.match('Aside|Modal|Notif|Popable'))
				link += '.' + spanType.innerHTML.split('.',2)[1]

			spanType.onclick = function() {
				window.open(link,'_blank');
			}
		}
	});
}

function cleanCopyFeature() {
	// remove element from DOM when changing page
	sidebarOpened.value = false;
	document.querySelectorAll('div[class="tooltip-prog"]')?.forEach((el) => {
		el.remove();
	})
	// to remove the event listener when changing page
	document.querySelectorAll('i[class*="copy-icon"]')?.forEach((el) => {
		el.remove();
	})
}

function toggleSidebar () {
	sidebarOpened.value = !sidebarOpened.value;
}

function setTheme () {
	setThemeMode(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
}

function toggleSearch() {
  const element = document.querySelectorAll('form[class="search-box"]')?.forEach((el) => {
    el.getElementsByTagName('input').item(0)?.focus()
  });
}
</script>
