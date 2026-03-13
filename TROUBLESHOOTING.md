# Troubleshooting

Common issues and fixes for `maranello-luce-design-business`.

---

## Problem: Token override not working

**Symptom**: Custom `--token` values applied via `:root { }` or host element have no effect.

**Cause**: The consumer's CSS loads before the design system stylesheet, so the system tokens win.

**Fix**: Ensure your override stylesheet loads _after_ the design system CSS:

```html
<!-- 1. Design system first -->
<link rel="stylesheet" href="node_modules/maranello-luce-design-business/dist/css/index.css" />
<!-- 2. Your overrides after -->
<link rel="stylesheet" href="./my-theme.css" />
```

Or in a bundler, import design system CSS before your own:

```js
import 'maranello-luce-design-business/css';
import './my-theme.css';
```

---

## Problem: Web Components not registering / custom elements undefined

**Symptom**: `mn-*` elements render as unknown HTML elements; browser console shows `CustomElementRegistry` warnings.

**Cause**: The component registry was not called before the component is used in the DOM.

**Fix**: Call `registerAll()` early in your app entry point:

```js
import { registerAll } from 'maranello-luce-design-business/wc';
registerAll();
```

If using the IIFE bundle, call `window.Maranello.registerAll()` after the script tag loads.

---

## Problem: IIFE bundle not exposing globals

**Symptom**: `window.Maranello` is `undefined` after including the IIFE script.

**Cause**: Script tag order — the IIFE must finish executing before any dependent code runs.

**Fix**: Place the IIFE script tag before any inline script that accesses `window.Maranello`,
or use `defer` + `DOMContentLoaded`:

```html
<script src="dist/maranello.iife.js"></script>
<!-- inline scripts here can safely access window.Maranello -->
```

If you use `defer`, wait for `DOMContentLoaded`:

```js
document.addEventListener('DOMContentLoaded', () => {
  window.Maranello.registerAll();
});
```

---

## Problem: TypeScript can't find module / type errors

**Symptom**: `Cannot find module 'maranello-luce-design-business'` or missing type declarations.

**Cause**: The package `exports` map requires a TypeScript version that supports `moduleResolution: bundler` or `node16`.

**Fix**: In your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "module": "ESNext"
  }
}
```

If you use `node` resolution, add an explicit types path:

```json
{
  "compilerOptions": {
    "paths": {
      "maranello-luce-design-business": ["./node_modules/maranello-luce-design-business/dist/types/ts/index.d.ts"]
    }
  }
}
```

---

## Problem: Theme not switching / `data-theme` attribute ignored

**Symptom**: Changing `data-theme` on `<html>` or `<body>` has no visible effect.

**Cause**: Theme CSS files must be explicitly imported. Only `index.css` is auto-included; theme variants are opt-in.

**Fix**: Import the theme stylesheet you need:

```js
import 'maranello-luce-design-business/css/themes/nero.css';
```

Or include via `<link>` and set the attribute:

```html
<link rel="stylesheet" href="dist/css/themes/avorio.css" />
<html data-theme="avorio">
```

---

## Problem: Shadow DOM components ignore global CSS variables

**Symptom**: CSS tokens defined on `:root` are not applied inside `mn-*` web components.

**Cause**: Shadow DOM isolates styles. Only CSS custom properties (variables) pierce the boundary.

**Fix**: This is by design — CSS variables _do_ inherit into Shadow DOM. Confirm:
1. Your variable is defined on `:root` (not a class selector)
2. You are using the exact token name (check `dist/css/tokens/*.css` for the full list)
3. No `all: initial` or `contain: style` overrides are resetting inheritance on the host element
