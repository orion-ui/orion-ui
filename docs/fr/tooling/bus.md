---
lang: fr-FR
title: Bus
---

# Bus

Cet outil vous permet d'émettre des évènements au sein de votre application à travers un bus d'évènements, qui sont émis globalement.\
La librairie externe utilisée est `mitt`. [(Voir la documentation de mitt)](https://github.com/developit/mitt)

## Usage

Pour émettre un évènement :

```ts:no-line-numbers
import { Bus } from '@/lib';

Bus.emit('composant:Event');
```

Pour recevoir un évènement :

```ts:no-line-numbers
Bus.on('composant:Event', () => {
	// Faire quelque chose
});
```
