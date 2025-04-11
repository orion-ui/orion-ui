![Legacy](https://img.shields.io/badge/status-legacy-lightgrey)

> ⚠️ Version 1.x.x is now in legacy maintenance mode. Please use version 2.x for active development.

## For mainteners

Create hotfix or releases from `legacy/v1` branch.

##### For regular git users :

```sh
git checkout legacy/v1
git checkout -b hotfix/1.x.x
#... do your thing
#...
#... commit your changes
#... back merge into legacy/v1
git checkout legacy/v1
git merge hotfix/1.x.x
```

##### For gitflow users :

```sh
git flow hotfix start 1.x.x legacy/v1
#... do your thing
#...
#... commit your changes
git flow hotfix finish
#... will back merge into legacy/v1
```

Once changes have been back merged, tag your commit

```sh
#... use the right version number based on latest legacy tag
git tag 1.x.x
git push origin 1.x.x
```

Then [draft a new release](https://github.com/orion-ui/orion-ui/releases/new) and select the tag you just pushed.

> ⚠️ Uncheck **Set as the latest release** checkbox before **Publish release**

---

# Orion - Another simple yet powerful UI framework

![Orion UI](https://repository-images.githubusercontent.com/616359964/fad1ee21-1781-452f-843d-43af9eda0802)

Orion aims at being as simple as possible, but still provides rich features out-of-the-box.\
It's written in TypeScript, fully typed, because we care about DX.\
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
