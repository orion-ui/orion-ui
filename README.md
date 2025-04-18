# Orion - Another simple yet powerful UI framework

![GitHub Release](https://img.shields.io/github/v/release/orion-ui/orion-ui?style=for-the-badge)

[![Build & Publish for production](https://github.com/orion-ui/orion-ui/actions/workflows/build-publish-production.yml/badge.svg)](https://github.com/orion-ui/orion-ui/actions/workflows/build-publish-production.yml)

> 🎉 **Orion v2 has been released !** Heads up to the [release note](https://github.com/orion-ui/orion-ui/releases) for more details on breaking changes and migration process.

![Orion UI](https://repository-images.githubusercontent.com/616359964/fad1ee21-1781-452f-843d-43af9eda0802)

**Orion** aims at being as simple as possible, but still provides rich features out-of-the-box.\
It's written in TypeScript, fully typed, because **we care about DX**.\
Based on Vue 3 and Vite, it's customizable and well documented.

## Full documentation

[orion-ui.org](https://orion-ui.org/)

## Installation

`npm i @orion.ui/orion`

## Basic usage

```ts
import { createApp } from 'vue';
import App from './App.vue';

// Import library
import Orion from '@orion.ui/orion';
// Import styles (or .less files if needed)
import '@orion.ui/orion/dist/style.css';
// Import Monkey Patching definition file (if you chose to use our monkeyPatching)
import '@orion.ui/orion/dist/monkey-patching';

createApp(App).use(Orion).mount('#app');
```

## License

[MIT](https://opensource.org/licenses/MIT) Copyright (c) 2023-present Orion UI
