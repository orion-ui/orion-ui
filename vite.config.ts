import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import babel from 'vite-plugin-babel';
import TurboConsole from 'unplugin-turbo-console/vite';

const alias = {
	'assets': resolve(__dirname, 'assets'),
	'devtool': resolve(__dirname, 'devtool'),
	'lang': resolve(__dirname, 'lang'),
	'lib': resolve(__dirname, 'lib'),
	'packages': resolve(__dirname, 'packages'),
	'sandbox': resolve(__dirname, 'sandbox'),
	'services': resolve(__dirname, 'services'),
	'utils': resolve(__dirname, 'utils'),
};

export { alias };

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		babel({ filter: /\.tsx?$/ }),
		TurboConsole({ disableLaunchEditor: true }),
	],
	resolve: { alias },
	build: {
		lib: {
			entry: resolve(__dirname, 'lib/index.ts'),
			name: 'Orion',
		},
		rollupOptions: {
			output: {
				exports: 'named',
				globals: { vue: 'Vue' },
			},
			external: ['vue'],
		},
	},
	optimizeDeps: {
		exclude: [
			'animejs',
			'lodash-es',
			'mitt',
			'vue',
			'vue-router',
			'floating-vue',
		],
	},
});
