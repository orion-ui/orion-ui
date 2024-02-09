import { defineClientConfig } from 'vuepress/client';
import Orion, { useDocument } from '@/lib';
import Markdown from 'vue3-markdown-it';
import PackageDemo from '../components/PackageDemo.vue';
import Layout from './layouts/Layout.vue';
import NotFound from './layouts/NotFound.vue';

export default defineClientConfig({
	layouts: { Layout, NotFound },

	enhance({ app }) {
		app.use(Orion);

		app.component('Markdown', Markdown);
		app.component('PackageDemo', PackageDemo);

		useDocument()?.body.classList.add('oriondoc')
	},
})

