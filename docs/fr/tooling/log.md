---
lang: fr-FR
title: Log
---

# Log

Un outil pour personnaliser et mettre en valeur vos logs dans la console du navigateur.

## Exemple

<o-button color="info" outline @click="Log.success('Voici mon log', 'Titre');">
Essayez ce log SUCCESS
</o-button>

```ts:no-line-numbers
import { Log } from '@/lib';

Log.success('Voici mon log', 'Titre');
```

## Usage

Plusieurs niveau de langues sont disponibles, ce qui va changer la couleur do log :

- info
- success
- warn
- error

Le titre du log est optionnel. S'il n'est pas renseigné il correspondra à son niveau.

<o-button color="info" outline @click="Log.warn('Essayez ce log warning');">
Essayez ce log warning
</o-button>

<script setup lang="ts">
import { Log } from '@/lib';

</script>
