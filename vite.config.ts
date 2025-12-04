import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import TurboConsole from 'unplugin-turbo-console/vite';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

const alias = {
	'assets': resolve(__dirname, 'assets'),
	'devtool': resolve(__dirname, 'devtool'),
	'lang': resolve(__dirname, 'lang'),
	'lib': resolve(__dirname, 'lib'),
	'packages': resolve(__dirname, 'packages'),
	'sandbox': resolve(__dirname, 'sandbox'),
	'services': resolve(__dirname, 'services'),
	'utils': resolve(__dirname, 'utils'),
	'material-icons': resolve(__dirname, 'node_modules/material-icons'),
};

export { alias };

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		babel({ filter: /\.tsx?$/ }),
		TurboConsole({ disableLaunchEditor: true }),
		{ // fix router in dev mode
			name: 'router-fallback',
			configureServer (server) {
				server.middlewares.use((req, res, next) => {
					if (req.url?.startsWith('/packages') && !req.url.includes('.')) {
						req.url = '/index.html';
					}
					next();
				});
			},
		},
	],
	resolve: { alias },
	build: {
		lib: {
			entry: {
				orion: resolve(__dirname, 'lib/index.ts'),
				utils: resolve(__dirname, 'utils/index.ts'),
				services: resolve(__dirname, 'services/index.ts'),
			},
			name: 'Orion',
		},
		rollupOptions: {
			output: {
				exports: 'named',
				globals: { vue: 'Vue' },
				assetFileNames: (assetInfo) => {
					const fileName = assetInfo.names?.[0] || '';
					if (fileName.endsWith('.css')) {
						return 'style.css';
					}
					return assetInfo.names[0];
				},
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
