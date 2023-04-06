<template>
	<div id="layout">
		<orion-nav-main
			v-if="setup.responsive.onTabletLandscape"
			v-bind="setup.props.navMain">
			<template #prepend="{ item }">
				<slot
					name="nav-main-prepend"
					v-bind="{ item }"/>
			</template>
			<template #default="{ item }">
				{{ item.label }}
			</template>
			<template #append="{ item }">
				<slot
					name="nav-main-append"
					v-bind="{ item }"/>
			</template>
		</orion-nav-main>

		<orion-nav-tabs
			v-else
			v-bind="setup.props.navTabs"/>

		<orion-nav-top v-bind="setup.props.navTop">
			<template
				v-if="$slots['nav-top-left']"
				#nav-top-left>
				<slot name="nav-top-left"/>
			</template>
			<template
				v-if="$slots['nav-top-additional']"
				#nav-top-additional>
				<slot name="nav-top-additional"/>
			</template>
			<template
				v-if="$slots['nav-top-right']"
				#nav-top-right>
				<slot name="nav-top-right"/>
			</template>
		</orion-nav-top>

		<main
			id="main"
			:ref="setup._main">
			<slot/>
		</main>

		<footer
			v-if="$slots.footer"
			id="footer">
			<slot name="footer"/>
		</footer>
	</div>
</template>

<script setup lang="ts">
import './OrionLayout.less';
import { OrionNavMain } from 'packages/NavMain';
import { OrionNavTop } from 'packages/NavTop';
import { OrionNavTabs } from 'packages/NavTabs';
import OrionLayoutSetupService from './OrionLayoutSetupService';
const props = defineProps(OrionLayoutSetupService.props);
const setup = new OrionLayoutSetupService(props);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default displays the main content of your application
 * @doc/fr slot/default affiche le contenu principal de votre application
 *
 * @doc slot/footer displays the footer content of your application
 * @doc/fr slot/footer affiche le contenu du pied de page de votre application
 *
 * @doc slot/nav-main-prepend displays content before the main navigation
 * @doc/fr slot/nav-main-prepend affiche du contenu avant la navigation principale
 *
 * @doc slot/nav-main-append displays content after the main navigation
 * @doc/fr slot/nav-main-append affiche du contenu après la navigation principale
 *
 * @doc slot/nav-top-left displays content on the left part of the top navigation
 * @doc/fr slot/nav-top-left affiche du contenu à gauche de la navitation du haut
 *
 * @doc slot/nav-top-additional displays additional content in the top navigation
 * @doc/fr slot/nav-top-additional affiche du contenu additionnel dans la navitation du haut
 *
 * @doc slot/nav-top-right displays content on the right part of the top navigation
 * @doc/fr slot/nav-top-right affiche du contenu à droite de la navitation du haut
 */
</script>
