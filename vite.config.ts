import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import babel from 'vite-plugin-babel';
import TurboConsole from 'unplugin-turbo-console/vite';
import dts from 'vite-plugin-dts';

const pkg = JSON.parse(fs.readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));

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
		dts({
			outDir: 'dist/types',
			tsconfigPath: 'tsconfig.build-lib.json',
		}),
		{
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
			entry: resolve(__dirname, 'lib/index.ts'),
			name: 'Orion',
			formats: ['es'],
		},
		rollupOptions: {
			output: {
				preserveModules: true,
				entryFileNames: '[name].js',
				inlineDynamicImports: false,
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
			external: [
				...Object.keys(pkg.dependencies || {}),
				...Object.keys(pkg.peerDependencies || {}),
				/^@tiptap\/.*$/,
			],
		},
	},
	optimizeDeps: {
		exclude: [
			'animejs',
			'lodash-es',
			'mitt',
			'vue',
			'vue-router',
		],
	},
});
