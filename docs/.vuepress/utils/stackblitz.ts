export const files = {
	'package.json': `{
	"name": "orion-demo",
	"version": "0.0.0",
	"scripts": {
		"dev": "vite"
	},
	"dependencies": {
		"@orion.ui/orion": "latest",
		"vue": "^3.2.45",
		"@faker-js/faker": "^8.4.0",
	},
	"devDependencies": {
		"@vitejs/plugin-vue": "^4.0.0",
		"less": "^4.1.3",
		"typescript": "^4.9.3",
		"vite": "^4.0.1",
		"vue-tsc": "^1.0.13"
	}
}	
`,

	'vite.config.ts': `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()]
})
`,

	'index.html': `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Orion Demo</title>
		<style>
			#app { padding: 2rem; }
		</style>
	</head>
	<body>
		<div id="app"></div>
		<script type="module" src="/src/main.ts"></script>
	</body>
</html>
`,

	'tsconfig.json': `{
	"compilerOptions": {
		"target": "esnext",
		"useDefineForClassFields": true,
		"module": "esnext",
		"moduleResolution": "node",
		"strict": true,
		"jsx": "preserve",
		"sourceMap": true,
		"resolveJsonModule": true,
		"esModuleInterop": true,
		"lib": ["esnext", "dom"]
	},
	"include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
`,

	'src/env.d.ts': `/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
`,

	'src/main.ts': `import { createApp } from 'vue';
import Orion from '@orion.ui/orion';
import '@orion.ui/orion/dist/style.css';

import Demo from './Demo.vue';

createApp(Demo)
	.use(Orion)
	.mount('#app');
`,
}
