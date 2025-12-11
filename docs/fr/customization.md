---
lang: fr-FR
title: Personnalisation
---

<h1> Personnalisation des variables CSS </h1>

**Orion UI** utilise un système de variables CSS
définies sur les sélecteurs `data-orion-theme='light'` et
`data-orion-theme='dark'`.\
Le dark thème surcharge uniquement les variables de couleur.
Ces variables permettent de personnaliser **la typographie, les
couleurs, les espacements et les arrondis** de tous les composants.\
Le fichier correspondant est `css-vars.less`


## Surcharger le style

Il est facile de surcharger les variables CSS par défaut pour adapter l'apparence au thème souhaité.

Le plus simple est de créer un fichier qui va contenir toutes les surcharges dont vous avez besoin (`orion-override.less` par exemple), et de l'importer dans votre fichier de style après les imports de styles d'Orion.

::: code-tabs
@tab main.less

```less{4}
@import "@orion.ui/orion/dist/styles/styles.less";
@import "@orion.ui/orion/dist/styles/packages/index.less";

@import "orion-override.less";

h1 {
	color: var(--grey-light);
}
...
```
:::

### Surcharge des sélecteurs CSS

::: code-tabs
@tab orion-override.less

```less{4}

.orion-input {
	&__input {
		border-color: var(--neutral-100);
	}

  // Modification pour le dark-thème
  [data-orion-theme="dark"] & {
    background-color: var(--info-100);
  }
}

.orion-sticker {
	align-items: center;
	padding: 1.5rem;
	border-radius: 0.75rem;
	font-size: 0.9rem;

	&__title {
		margin-bottom: 0.25rem;
		font-size: 1rem;
		color: var(--brand);
	}
}
```
:::

--- 

::: info surcharge d'un élément en particulier
En utilisant un bloc `<style scoped>` et le sélecteur `:deep()` il est possible de modifier ponctuellement le style d'un composant d'Orion
:::

::: code-tabs
@tab MyComponent.vue

```vue{7-9}
<style lang="less" scoped>

.my-component {
  display: flex;
  justify-content: flex-end;

// surcharge du style uniquement au sein de MyComponent
  :deep(.orion-icon) {
    font-size: 1rem;
  }
}
</style>
```
:::


### Surcharge des variables

::: code-tabs
@tab orion-override.less

```less{4}
:root {
	--radius-input: 0.5rem;
	--rgb-brand: 51, 67, 148;
}
```
:::

## Variables disponibles

### Fontes et tailles de texte

| Variable                     | Description                        | Valeur par défaut                     |
|------------------------------|-----------------------------------|---------------------------------------|
| `--font-family`               | Police principale                  | `'Source Sans Pro', sans-serif`        |
| `--font-title`                | Police des titres                  | `'Source Sans Pro', sans-serif`        |
| `--font-paragraph`            | Police des paragraphes             | `'Source Sans Pro', sans-serif`        |
| `--size-default`               | Taille de base                     | `0.875rem`                             |
| `--font-weight-default`        | Graisse par défaut                 | `400`                                  |
| `--font-weight-title`          | Graisse des titres                 | `700`                                  |
| `--font-weight-page-title`     | Graisse titre de page              | `700`                                  |
| `--font-weight-page-subtitle`  | Graisse sous-titre de page         | `300`                                  |
| `--font-weight-section-title`  | Graisse titre de section            | `600`                                  |
| `--font-weight-section-subtitle` | Graisse sous-titre de section   | `300`                                  |

---

### Rayons (Border radius)


  | Variable                     | Composant concerné                        | Valeur par défaut                     |
|------------------------------|-----------------------------------|---------------------------------------|
| `--radius-card`               | OrionCard                  | `0.5rem`        |
| `--radius-sticker`                | OrionSticker                  | `0.5rem`        |
| `--radius-popover`            | OrionPopover             | `0.5rem`        |
| `--radius-btn`               | OrionButton                     | `0.25rem`                             |
| `--radius-alert`          | OrionAlert                 | `0.25rem`                                  |
| `--radius-notif`     | OrionNotification              | `0.25rem`                                  |
| `--radius-aside`  | OrionAside         | `1.25rem`                                  |
| `--radius-modal`  | OrionModal            | `1.25rem`                                  |
| `--radius-input-range` | OrionInputRange  | `0.5rem`                                  |
| `--radius-input` | OrionInput   | `0.25rem`                                  |
| `--radius-upload` | OrionUpload   | `0.25rem`                                  |
---

### Couleurs

#### Variables RGB de base

Ces variables stockent les couleurs sous forme de **triplets RGB** et servent de source pour toutes les autres variables CSS.\
Chaque couleur possède 3 déclinaisons supplémentaires (`light`, `dark`, `alt`)


| Couleur        | Variable                | Valeur en thème clair | Valeur en thème sombre |
|----------------|---------------------------|-----------------------------|-----------------------------|
| **Principale** | `--rgb-brand`           | `112, 39, 250`   | `156, 105, 252`   |
|                | `--rgb-brand-light`     | `242, 233, 255`  | `199, 169, 253`   |
|                | `--rgb-brand-dark`      | `83, 5, 228`     | `21, 1, 57`       |
|                | `--rgb-brand-alt`       | `163, 64, 205`   | `163, 64, 205`       |
| **Gris**        | `--rgb-grey-darker`     | `56, 61, 71`      | `235, 235, 235`   |
|                | `--rgb-grey-dark`       | `113, 122, 142`   | `173, 173, 175`   |
|                | `--rgb-grey`            | `183, 188, 198`   | `71, 71, 77`      |
|                | `--rgb-grey-light`      | `220, 223, 230`   | `42, 44, 47`      |
|                | `--rgb-grey-lighter`    | `246, 247, 249`   | `26, 28, 32`      |
| **Succès**      | `--rgb-success`         | `0, 214, 118`     | `49, 253, 162`    |
|                | `--rgb-success-light`   | `225, 255, 242`   | `137, 254, 201`   |
|                | `--rgb-success-dark`    | `4, 170, 94`      | `0, 42, 23`       |
|                | `--rgb-success-alt`     | `185, 213, 4`     | `185, 213, 4`_      |
| **Info**         | `--rgb-info`            | `0, 120, 255`     | `76, 160, 255`    |
|                | `--rgb-info-light`      | `229, 241, 255`   | `153, 201, 255`   |
|                | `--rgb-info-dark`       | `1, 94, 204`      | `0, 24, 51`       |
|                | `--rgb-info-alt`        | `0, 230, 244`     | `0, 230, 244`_      |
| **Avertissement** | `--rgb-warning`       | `253, 151, 73`    | `254, 182, 128`   |
|                | `--rgb-warning-light`   | `255, 233, 219`   | `254, 213, 182`   |
|                | `--rgb-warning-dark`    | `252, 114, 11`    | `64, 28, 1`       |
|                | `--rgb-warning-alt`     | `254, 203, 3`     | `254, 203, 3`_      |
| **Danger**       | `--rgb-danger`          | `247, 53, 104`     | `247, 94, 135`    |
|                | `--rgb-danger-light`    | `253, 215, 225`   | `250, 135, 165`   |
|                | `--rgb-danger-dark`     | `230, 10, 69`      | `58, 2, 17`        |
|                | `--rgb-danger-alt`      | `240, 25, 72`      | `240, 25, 72`       |
| **Rose**          | `--rgb-pink`            | `247, 149, 237`   | `250, 182, 243`    |
|                | `--rgb-pink-light`      | `253, 234, 251`   | `252, 213, 248`    |
|                | `--rgb-pink-dark`       | `242, 77, 225`     | `74, 6, 67`         |
|                | `--rgb-pink-alt`        | `255, 0, 128`      | `255, 0, 128`_        |

---

#### Variables CSS dérivées

Ces variables utilisent les valeurs RGB pour créer des couleurs CSS utilisables directement dans le style.

| Couleur         | Variable CSS           | 
|-----------------|-----------------------|
| **Principale**      | `--brand`             |
|                 | `--brand-light`       |
|                 | `--brand-dark`        |
|                 | `--brand-alt`         |
| **Gris**            | `--grey-darker`       |
|                 | `--grey-dark`         |
|                 | `--grey`              |
|                 | `--grey-light`        |
|                 | `--grey-lighter`      |
| **Inverse/Base**    | `--inverse`           |
|                 | `--base`              |  
| **Info**            | `--info`              |
|                 | `--info-light`        |
|                 | `--info-dark`         |
|                 | `--info-alt`          |
| **Succès**          | `--success`           |
|                 | `--success-light`     |
|                 | `--success-dark`      |
|                 | `--success-alt`       |
| **Avertissement**   | `--warning`           |
|                 | `--warning-light`     |
|                 | `--warning-dark`      |
|                 | `--warning-alt`       |
| **Danger**          | `--danger`            |
|                 | `--danger-light`      |
|                 | `--danger-dark`       |
|                 | `--danger-alt`        |
| **Rose**            | `--pink`              |
|                 | `--pink-light`        |
|                 | `--pink-dark`         |
|                 | `--pink-alt`          |

---

#### Bonnes pratiques

1. **Toujours utiliser les variables CSS dérivées** (`--grey`, `--brand`, etc.) dans vos styles plutôt que les RVB bruts pour assurer la cohérence des thèmes.
2. **Surcharger les couleurs pour les thèmes sombres** uniquement en modifiant les variables RVB correspondantes.
3. **Éviter de modifier directement les variables dérivées**, pour ne pas casser la cohérence des thèmes.
4. **Utiliser les suffixes `-light`, `-dark`, `-alt`** pour gérer les nuances et les variantes de couleur.

---

#### Exemple d’utilisation

```less
.button {
  background-color: var(--brand);
  color: var(--base);
}

.alert-success {
  background-color: var(--success-light);
  border-color: var(--success);
  color: rgb(var(--rgb-inverse),0.2); // Pour gérer l'opacité par exemple
}
```



### Fluid

Les variables `--space-*` sont utilisées pour définir des padding et rester cohérent dans toute l'application.

| Variable          | Valeur par défaut         |
|--------------------|------------------------------|
| `--space-xs`      | `calc(3px + 0.125rem)`       |
| `--space-xs`      | `calc(5px + 0.1875rem)`      |
| `--space-xs`     | `calc(5px + 0.3125rem)`      |
| `--space-xs`     | `calc(8px + 0.25rem)`        |
| `--space-sm`     | `calc(10px + 0.3rem)`        |
| `--space-sm`     | `calc(10px + 0.5rem)`        |
| `--space-sm`     | `calc(12px + 0.5rem)`        |
| `--space-sm`     | `calc(13px + 0.75rem)`       |
| `--space-md`     | `calc(14px + 1rem)`          |
| `--space-md`     | `calc(19px + 1rem)`          |
| `--space-md`     | `calc(24px + 1rem)`          |
| `--space-lg`     | `calc(25px + 1.25rem)`       |
| `--space-xl`     | `calc(36px + 1.5rem)`         |



---

### Espaces

Les variables `--space-*` définissent les **marges et espacements standards** dans la grille du design.  
Elles sont fixes (en `rem`) et permettent de **garantir une cohérence verticale et horizontale**.

| Variable         | Valeur par défaut | Utilisation recommandée                   |
|-------------------|-------------------------|----------------------------------------------|
| `--space-xs`       | `0.5rem`               | Espacement très petit (éléments très proches) |
| `--space-sm`       | `1rem`                 | Petit espacement                             |
| `--space-md`       | `2rem`                 | Espacement moyen                             |
| `--space-lg`       | `3rem`                 | Grand espacement                             |
| `--space-xl`       | `4rem`                 | Très grand espacement                        |

:::tip Conseil
 Ces valeurs sont idéales pour définir les **gaps entre composants, sections, ou colonnes**.

