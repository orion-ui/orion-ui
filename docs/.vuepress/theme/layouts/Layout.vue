<template>
		<div
			class="doc-content-wrapper"
			:class="[
				frontmatter.pageClass,
				{
					'sidebar--opened': sidebarOpened,
					'doc-content-wrapper--home': frontmatter.home,
					'doc-content-wrapper--no-toc': frontmatter.noToc,
				}
			]">
			<Sidebar v-if="shouldShowSidebar"/>
			
			<Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar()"/>
			
			<main class="doc-content">
				<v-dropdown 
					v-if="useResponsive().onPhone && shouldShowToc && !sidebarOpened"
					:arrow-padding="180"
					class="show-toc-button" 
					placement="bottom-end"
					@apply-show="toggleTocIcon()"
					@apply-hide="toggleTocIcon()">
						<o-button 
							outline 
							nude 
							:suffix-icon="tocOpened ? 'chevron_down' : 'chevron_right'"
							color="brand">
								{{ tocButtonLabel }}
						</o-button>
					<template #popper="{ hide }">
						<TableOfContent @click="hide()"/>
					</template>
				</v-dropdown>

				<component 
					v-if="frontmatter.viewComponent && viewComponent[frontmatter.viewComponent]" 
					:is="viewComponent[frontmatter.viewComponent]"/>
				<Content v-else/>
				<PageNav v-if="!frontmatter.home"/>
				<PageMeta v-if="!frontmatter.home"/>
				<div class="footer">
					<span>
						<a href="https://choosealicense.com/licenses/mit/" target="_blank">MIT Licensed</a> 
						| Copyright © 2023-present Orion UI
					</span>
				</div>
			</main>
			
			
			<TableOfContent v-if="!useResponsive().onPhone && shouldShowToc"/>
		</div>
		<tour-doc/>
		<tour-props/>
</template>


<script setup lang="ts">
import '../../styles/index.less';

import { nextTick, onMounted, ref, watch, computed, type Component } from 'vue';
import { useRouter } from 'vue-router';
import { usePageFrontmatter, usePageLang } from 'vuepress/client';
import { setThemeMode, setAppLang, useResponsive, Bus } from '@/lib';
import { addCopyFeatureToCode } from '@utils/tools';
import Sidebar from '@theme/VPSidebar.vue';
import Navbar from '@theme/VPNavbar.vue';
import PageNav from '@theme/VPPageNav.vue';
import PageMeta from '@theme/VPPageMeta.vue';
import TableOfContent from './components/TableOfContents.vue';
import Home from './components/Home.vue';
import Services from './components/Services.vue';
import TourDoc from '@/packages/Tour/docs/TourDoc.vue'
import TourProps from '@/packages/Tour/docs/TourProps.vue'

const frontmatter = usePageFrontmatter();

const viewComponent: Record<string, Component> = {
	Home,
	Services,
}

const sidebarOpened = ref(false);
const tocOpened = ref(false);
// navbar
const shouldShowNavbar = computed(() => frontmatter.value.navbar !== false)
const shouldShowSidebar = computed(() => frontmatter.value.home !== true)
const shouldShowToc = computed(() => frontmatter.value.home !== true && !frontmatter.value.pageClass?.includes('no-toc'))
const tocButtonLabel = computed(() => frontmatter.value.lang?.includes('en') ? `On this page`: 'Sur cette page')

const router = useRouter();
const currentLang = usePageLang();

watch(() => currentLang.value, (val) => setAppLang(val.split('-')[0].toLowerCase()))
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
	setAppLang(currentLang.value.split('-')[0].toLowerCase());
	addCopyFeatureToCode();
	setTimeout(addGlobalTypesLink, 200);

	nextTick(() => {
		const darkModeThemeObserver = new MutationObserver(setTheme);
		darkModeThemeObserver.observe(document.documentElement, { attributeFilter: ['data-theme'] })
	})
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

function toggleTocIcon () {
	tocOpened.value = !tocOpened.value;
}

function setTheme () {
	setThemeMode(document.getElementsByTagName('html')[0].getAttribute("data-theme")?.toString().includes('dark') ? 'dark' : 'light')
}

function toggleSearch() {
  const element = document.querySelectorAll('form[class="search-box"]')?.forEach((el) => {
    el.getElementsByTagName('input').item(0)?.focus()
  });
}
</script>
