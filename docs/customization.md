---
lang: en-US
title: Customization
---

<h1> Customizing CSS Variables </h1>

**Orion UI** uses a system of CSS variables
defined on the selectors `data-orion-theme='light'` and
`data-orion-theme='dark'`.\
The dark theme only overrides the color variables.  
These variables allow you to customize **typography, colors, spacings and border radius** for all components.\
The related file is `css-vars.less`.

## Override styles

It’s easy to override the default CSS variables to adapt the appearance to your desired theme.

The simplest way is to create a file that contains all the overrides you need (ie. `orion-override.less`) and import it into your style file **after** importing Orion styles.

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

### Overriding CSS selectors

::: code-tabs
@tab orion-override.less

```less{4}
.orion-input {
  &__input {
    border-color: var(--neutral-100);
  }

  // Dark theme modification
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

::: info overriding a specific element
Using a `<style scoped>` block and the `:deep()` selector, you can locally modify the style of an Orion component
:::

::: code-tabs
@tab MyComponent.vue

```vue{7-9}
<style lang="less" scoped>

.my-component {
  display: flex;
  justify-content: flex-end;

// local style override only within MyComponent
  :deep(.orion-icon) {
    font-size: 1rem;
  }
}
</style>
```
:::

### Overriding variables

::: code-tabs
@tab orion-override.less

```less{4}
:root {
  --radius-input: 0.5rem;
  --rgb-brand: 51, 67, 148;
}
```
:::

## Available Variables

### Fonts and Text Sizes

| Variable                     | Description                        | Default Value                     |
|------------------------------|-----------------------------------|----------------------------------|
| `--font-family`               | Main font                          | `'Source Sans Pro', sans-serif`  |
| `--font-title`                | Title font                         | `'Source Sans Pro', sans-serif`  |
| `--font-paragraph`            | Paragraph font                     | `'Source Sans Pro', sans-serif`  |
| `--size-default`              | Base size                           | `0.875rem`                       |
| `--font-weight-default`       | Default font weight                 | `400`                            |
| `--font-weight-title`         | Title font weight                   | `700`                            |
| `--font-weight-page-title`    | Page title font weight              | `700`                            |
| `--font-weight-page-subtitle` | Page subtitle font weight           | `300`                            |
| `--font-weight-section-title` | Section title font weight           | `600`                            |
| `--font-weight-section-subtitle` | Section subtitle font weight    | `300`                            |

---

### Border Radius

| Variable                     | Component                  | Default Value                     |
|------------------------------|----------------------------|----------------------------------|
| `--radius-card`               | OrionCard                  | `0.5rem`                          |
| `--radius-sticker`            | OrionSticker               | `0.5rem`                          |
| `--radius-popover`            | OrionPopover               | `0.5rem`                          |
| `--radius-btn`                | OrionButton                | `0.25rem`                         |
| `--radius-label`              | OrionLabel                 | `0.25rem`                         |
| `--radius-alert`              | OrionAlert                 | `0.25rem`                         |
| `--radius-notif`              | OrionNotification          | `0.25rem`                         |
| `--radius-aside`              | OrionAside                 | `1.25rem`                         |
| `--radius-modal`              | OrionModal                 | `1.25rem`                         |
| `--radius-input-range`        | OrionInputRange            | `0.5rem`                          |
| `--radius-input`              | OrionInput                 | `0.25rem`                         |
| `--radius-upload`             | OrionUpload                | `0.25rem`                         |
---

### Colors

#### Base RGB Variables

These variables store colors as **RGB triplets** and serve as the source for all other CSS variables.  
Each color has 3 additional variations (`light`, `dark`, `alt`).

| Color          | Variable                | Light Theme Value       | Dark Theme Value        |
|----------------|------------------------|------------------------|------------------------|
| **Primary**    | `--rgb-brand`          | `112, 39, 250`         | `156, 105, 252`        |
|                | `--rgb-brand-light`    | `242, 233, 255`        | `199, 169, 253`        |
|                | `--rgb-brand-dark`     | `83, 5, 228`           | `21, 1, 57`            |
|                | `--rgb-brand-alt`      | `163, 64, 205`         | `163, 64, 205`         |
| **Gray**       | `--rgb-grey-darker`    | `56, 61, 71`           | `235, 235, 235`        |
|                | `--rgb-grey-dark`      | `113, 122, 142`        | `173, 173, 175`        |
|                | `--rgb-grey`           | `183, 188, 198`        | `71, 71, 77`           |
|                | `--rgb-grey-light`     | `220, 223, 230`        | `42, 44, 47`           |
|                | `--rgb-grey-lighter`   | `246, 247, 249`        | `26, 28, 32`           |
| **Success**    | `--rgb-success`        | `0, 214, 118`          | `49, 253, 162`         |
|                | `--rgb-success-light`  | `225, 255, 242`        | `137, 254, 201`        |
|                | `--rgb-success-dark`   | `4, 170, 94`           | `0, 42, 23`            |
|                | `--rgb-success-alt`    | `185, 213, 4`          | `185, 213, 4`          |
| **Info**       | `--rgb-info`           | `0, 120, 255`          | `76, 160, 255`         |
|                | `--rgb-info-light`     | `229, 241, 255`        | `153, 201, 255`        |
|                | `--rgb-info-dark`      | `1, 94, 204`           | `0, 24, 51`            |
|                | `--rgb-info-alt`       | `0, 230, 244`          | `0, 230, 244`          |
| **Warning**    | `--rgb-warning`        | `253, 151, 73`         | `254, 182, 128`        |
|                | `--rgb-warning-light`  | `255, 233, 219`        | `254, 213, 182`        |
|                | `--rgb-warning-dark`   | `252, 114, 11`         | `64, 28, 1`            |
|                | `--rgb-warning-alt`    | `254, 203, 3`          | `254, 203, 3`          |
| **Danger**     | `--rgb-danger`         | `247, 53, 104`         | `247, 94, 135`         |
|                | `--rgb-danger-light`   | `253, 215, 225`        | `250, 135, 165`        |
|                | `--rgb-danger-dark`    | `230, 10, 69`          | `58, 2, 17`            |
|                | `--rgb-danger-alt`     | `240, 25, 72`          | `240, 25, 72`          |
| **Pink**       | `--rgb-pink`           | `247, 149, 237`        | `250, 182, 243`        |
|                | `--rgb-pink-light`     | `253, 234, 251`        | `252, 213, 248`        |
|                | `--rgb-pink-dark`      | `242, 77, 225`         | `74, 6, 67`            |
|                | `--rgb-pink-alt`       | `255, 0, 128`          | `255, 0, 128`          |

---

#### Derived CSS Variables

These variables use the RGB values to create CSS colors that can be used directly in styles.

| Color            | CSS Variable           |
|------------------|----------------------|
| **Primary**      | `--brand`            |
|                  | `--brand-light`      |
|                  | `--brand-dark`       |
|                  | `--brand-alt`        |
| **Gray**         | `--grey-darker`      |
|                  | `--grey-dark`        |
|                  | `--grey`             |
|                  | `--grey-light`       |
|                  | `--grey-lighter`     |
| **Inverse/Base** | `--inverse`           |
|                  | `--base`             |
| **Info**         | `--info`             |
|                  | `--info-light`       |
|                  | `--info-dark`        |
|                  | `--info-alt`         |
| **Success**      | `--success`          |
|                  | `--success-light`    |
|                  | `--success-dark`     |
|                  | `--success-alt`      |
| **Warning**      | `--warning`          |
|                  | `--warning-light`    |
|                  | `--warning-dark`     |
|                  | `--warning-alt`      |
| **Danger**       | `--danger`           |
|                  | `--danger-light`     |
|                  | `--danger-dark`      |
|                  | `--danger-alt`       |
| **Pink**         | `--pink`             |
|                  | `--pink-light`       |
|                  | `--pink-dark`        |
|                  | `--pink-alt`         |

---

#### Best Practices

1. **Always use derived CSS variables** (`--grey`, `--brand`, etc.) in your styles rather than raw RGB values to ensure theme consistency.
2. **Override colors for dark themes** only by modifying the corresponding RGB variables.
3. **Avoid directly modifying derived variables** to prevent breaking theme consistency.
4. **Use the `-light`, `-dark`, `-alt` suffixes** to manage color shades and variants.

---

#### Usage Example

```less
.button {
  background-color: var(--brand);
  color: var(--base);
}

.alert-success {
  background-color: var(--success-light);
  border-color: var(--success);
  color: rgb(var(--rgb-inverse), 0.2); // Example: using opacity
}
```

### Fluid

The `--spacing-*` variables are used to define padding and maintain consistency throughout the application.

| Variable        | Default Value          |
|-----------------|-----------------------|
| `--spacing-xs`   | `calc(3px + 0.125rem)`|
| `--spacing-xs`   | `calc(5px + 0.1875rem)`|
| `--spacing-xs`  | `calc(5px + 0.3125rem)`|
| `--spacing-xs`  | `calc(8px + 0.25rem)` |
| `--spacing-sm`  | `calc(10px + 0.3rem)` |
| `--spacing-sm`  | `calc(10px + 0.5rem)` |
| `--spacing-sm`  | `calc(12px + 0.5rem)` |
| `--spacing-sm`  | `calc(13px + 0.75rem)`|
| `--spacing-md`  | `calc(14px + 1rem)`   |
| `--spacing-md`  | `calc(19px + 1rem)`   |
| `--spacing-md`  | `calc(24px + 1rem)`   |
| `--spacing-lg`  | `calc(25px + 1.25rem)`|
| `--spacing-xl`  | `calc(36px + 1.5rem)` |

---

### Spacing

The `--spacing-*` variables define **standard margins and spacing** in the design grid.  
They are fixed (in `rem`) and ensure **vertical and horizontal consistency**.

| Variable        | Default Value | Recommended Use                              |
|-----------------|---------------|---------------------------------------------|
| `--spacing-xs`    | `0.5rem`      | Very small spacing (elements very close)    |
| `--spacing-sm`    | `1rem`        | Small spacing                               |
| `--spacing-md`    | `2rem`        | Medium spacing                              |
| `--spacing-lg`    | `3rem`        | Large spacing                               |
| `--spacing-xl`    | `4rem`        | Very large spacing                           |

:::tip Note
These values are ideal for setting **gaps between components, sections, or columns**.
:::
