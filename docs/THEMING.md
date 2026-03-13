# Theming Guide

How to use, customize, and extend themes in Maranello Luce Design System.

## Built-in Themes

### Editorial (default)

The default mixed-mode theme. Dark sections for hero/navigation areas, light sections for content. No body class required.

- Accent: Giallo Ferrari (`#FFC72C`)
- Dark sections: `--nero-profondo` background, `--bianco-caldo` text
- Light sections: `--bianco-ghiaccio` background, `--nero-carbon` text
- Ivory sections: `--avorio-chiaro` background for warm content areas

### Nero

Full dark mode. All sections become dark. Body class: `mn-nero`.

- Accent: Giallo Ferrari (`#FFC72C`)
- All backgrounds: `--nero-profondo` (`#0a0a0a`)
- Text: `--bianco-caldo` / `--grigio-chiaro`
- Tables, cards, inputs: dark variants with subtle borders

```html
<body class="mn-nero">
```

### Avorio

Full warm-light mode inspired by Ferrari leather interiors. Body class: `mn-avorio`.

- Accent: Rosso Corsa (`#DC0000`)
- Backgrounds: `--avorio-chiaro` (`#faf3e6`) to `--avorio-caldo` (`#f5e5c7`)
- Text: dark tones for readability on warm backgrounds
- Borders: `--avorio-scuro` for subtle definition

```html
<body class="mn-avorio">
```

### Colorblind

High-contrast mode for color vision deficiencies. Body class: `mn-colorblind`.

- Accent: High-contrast blue (`#0072B2`)
- Inherits base layout from Editorial
- All status colors replaced with distinguishable alternatives
- Chart palettes use colorblind-safe combinations

```html
<body class="mn-colorblind">
```

## Applying Themes

### Static

```html
<body class="mn-nero">
```

### JavaScript toggle

```js
import { initThemeToggle } from 'maranello-luce-design-business';

// Adds a theme toggle control and respects prefers-color-scheme
initThemeToggle();
```

### Manual switching

```js
function setTheme(theme) {
  document.body.classList.remove('mn-nero', 'mn-avorio', 'mn-colorblind');
  if (theme !== 'editorial') {
    document.body.classList.add(`mn-${theme}`);
  }
}
```

### prefers-color-scheme Auto-switching

The built-in `initThemeToggle()` respects the OS preference:

| OS setting | Theme applied |
|------------|---------------|
| Dark | `mn-nero` |
| Light | Editorial (default) |

Override with explicit user choice (stored in `localStorage`):

```js
// User explicitly picks a theme -> overrides OS preference
localStorage.setItem('mn-theme', 'avorio');
```

## Token Override (Custom Branding)

All visual properties are CSS custom properties. Override any token in your own stylesheet, loaded after the design system CSS.

### Brand colors

```css
:root {
  /* Replace Ferrari yellow with your brand color */
  --giallo-ferrari: #0066CC;
  --giallo-hover: #0052a3;
  --mn-accent: var(--giallo-ferrari);
  --mn-accent-hover: var(--giallo-hover);
  --mn-accent-text: #ffffff;
}
```

### Typography

```css
:root {
  --font-display: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'Fira Code', monospace;
}
```

### Spacing scale

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
}
```

### Pipeline stage colors

```css
:root {
  --stage-1: #2196F3;
  --stage-2: #4CAF50;
  --stage-3: #FF9800;
  --stage-4: #F44336;
  --stage-1-label: 'Lead';
  --stage-2-label: 'Qualified';
  --stage-3-label: 'Proposal';
  --stage-4-label: 'Closed';
}
```

## Creating a Custom Theme

Create a new theme by defining overrides scoped to a body class.

### Step 1: Define the class

```css
/* my-theme.css */
body.mn-oceano {
  --mn-accent: #0077B6;
  --mn-accent-hover: #005f94;
  --mn-accent-text: #ffffff;
}

body.mn-oceano .mn-section-light,
body.mn-oceano .mn-section-ivory {
  background: #CAF0F8;
  color: #023E8A;
}

body.mn-oceano .mn-section-dark {
  background: #03045E;
  color: #CAF0F8;
}

body.mn-oceano .mn-nav {
  background: #023E8A;
  color: #CAF0F8;
}

body.mn-oceano .mn-stat-card {
  background: rgba(0, 119, 182, 0.1);
  border-color: rgba(0, 119, 182, 0.3);
}
```

### Step 2: Load after design system CSS

```html
<link rel="stylesheet" href="maranello-luce-design-business/css">
<link rel="stylesheet" href="my-theme.css">

<body class="mn-oceano">
```

### Step 3: Register in theme toggle (optional)

```js
function setTheme(theme) {
  const all = ['mn-nero', 'mn-avorio', 'mn-colorblind', 'mn-oceano'];
  document.body.classList.remove(...all);
  if (theme !== 'editorial') {
    document.body.classList.add(`mn-${theme}`);
  }
}
```

## Token Reference

### Color tokens

| Token | Default | Category |
|-------|---------|----------|
| `--nero-assoluto` | `#000000` | Base |
| `--nero-profondo` | `#0a0a0a` | Background |
| `--nero-carbon` | `#111111` | Surface |
| `--nero-soft` | `#1a1a1a` | Elevated surface |
| `--grigio-alluminio` | `#c8c8c8` | Border |
| `--grigio-medio` | `#616161` | Muted text |
| `--grigio-scuro` | `#2a2a2a` | Dark border |
| `--avorio-caldo` | `#f5e5c7` | Warm background |
| `--avorio-chiaro` | `#faf3e6` | Light warm background |
| `--giallo-ferrari` | `#FFC72C` | Primary accent |
| `--rosso-corsa` | `#DC0000` | Danger / Avorio accent |
| `--verde-racing` | `#00A651` | Success |

### Semantic tokens

| Token | Usage |
|-------|-------|
| `--mn-accent` | Primary interactive color (per-theme) |
| `--mn-accent-hover` | Hover state for accent |
| `--mn-accent-text` | Text on accent background |
| `--status-active` | Active/success indicator |
| `--status-warning` | Warning indicator |
| `--status-danger` | Error/danger indicator |
| `--status-info` | Informational indicator |

### Theme-aware sections

| Class | Editorial | Nero | Avorio |
|-------|-----------|------|--------|
| `.mn-section-dark` | Dark bg | Dark bg | Dark bg |
| `.mn-section-light` | Light bg | Dark bg (overridden) | Ivory bg |
| `.mn-section-ivory` | Warm bg | Dark bg (overridden) | Ivory bg |
| `.mn-section-accent` | Accent bg | Accent bg | Accent bg |
