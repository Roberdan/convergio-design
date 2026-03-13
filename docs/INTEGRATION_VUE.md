# Vue Integration

How to use Maranello Luce Design System with Vue 3.

## Install

```bash
npm install github:Roberdan/MaranelloLuceDesign#v2.0.0
```

## Layer 1: CSS-Only

Import CSS in your entry point or root component.

```ts
// main.ts
import { createApp } from 'vue';
import 'maranello-luce-design-business/css';
import App from './App.vue';

createApp(App).mount('#app');
```

Use CSS classes directly in templates:

```vue
<template>
  <section class="mn-section-dark">
    <h2 class="mn-title-section">Dashboard</h2>
    <div class="mn-stat-card">
      <span class="mn-stat-value">{{ count }}</span>
      <span class="mn-stat-label">Active projects</span>
    </div>
  </section>
</template>
```

## Layer 2: Web Components

Vue needs configuration to recognize `mn-*` elements as custom elements.

### Configure Vue compiler

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('mn-');

app.mount('#app');
```

### Vite config (alternative)

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('mn-')
        }
      }
    })
  ]
});
```

### Usage in templates

```vue
<script setup lang="ts">
import 'maranello-luce-design-business/wc';
import { ref } from 'vue';

const gaugeValue = ref(72);
const chartData = ref([
  { label: 'Active', value: 45 },
  { label: 'Pending', value: 30 }
]);
</script>

<template>
  <mn-gauge :value="gaugeValue" label="CPU Load" theme="nero"></mn-gauge>

  <mn-chart type="donut" :data="JSON.stringify(chartData)"></mn-chart>

  <mn-data-table src="/api/data" sortable paginate></mn-data-table>

  <mn-toast message="Saved" type="success" duration="3000"></mn-toast>
</template>
```

### Event handling

```vue
<template>
  <mn-gauge
    :value="value"
    label="RPM"
    @value-change="onValueChange"
  ></mn-gauge>
</template>

<script setup lang="ts">
function onValueChange(e: CustomEvent) {
  console.log('New value:', e.detail);
}
</script>
```

## Layer 3: Headless JS

Use `onMounted` + template refs for Canvas/SVG rendering.

### Charts

```vue
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { charts } from 'maranello-luce-design-business/charts';

const canvasRef = ref<HTMLCanvasElement>();
const data = ref([
  { label: 'Active', value: 45 },
  { label: 'Pending', value: 30 },
  { label: 'Done', value: 25 }
]);

onMounted(() => {
  if (canvasRef.value) {
    charts.renderDonut(canvasRef.value, data.value);
  }
});

watch(data, (newData) => {
  if (canvasRef.value) {
    charts.renderDonut(canvasRef.value, newData);
  }
}, { deep: true });
</script>

<template>
  <canvas ref="canvasRef" width="400" height="300"></canvas>
</template>
```

### Gantt timeline

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gantt } from 'maranello-luce-design-business/gantt';

const containerRef = ref<HTMLDivElement>();

const props = defineProps<{
  tasks: Array<{ id: string; name: string; start: string; end: string }>;
}>();

onMounted(() => {
  if (containerRef.value) {
    gantt.render(containerRef.value, props.tasks, { palette: 'nero' });
  }
});
</script>

<template>
  <div ref="containerRef" style="width: 100%; height: 400px"></div>
</template>
```

### Gauge

```vue
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { gauge } from 'maranello-luce-design-business/gauge';

const canvasRef = ref<HTMLCanvasElement>();
const props = defineProps<{ value: number; label: string }>();
let instance: ReturnType<typeof gauge.create>;

onMounted(() => {
  if (canvasRef.value) {
    instance = gauge.create(canvasRef.value, {
      value: props.value,
      label: props.label
    });
  }
});

watch(() => props.value, (val) => {
  instance?.update(val);
});
</script>

<template>
  <canvas ref="canvasRef" width="200" height="200"></canvas>
</template>
```

## Theme Switching

```vue
<script setup lang="ts">
import { ref, watch } from 'vue';

type Theme = 'editorial' | 'nero' | 'avorio' | 'colorblind';
const theme = ref<Theme>('nero');

watch(theme, (t) => {
  document.body.classList.remove('mn-nero', 'mn-avorio', 'mn-colorblind');
  if (t !== 'editorial') {
    document.body.classList.add(`mn-${t}`);
  }
});
</script>

<template>
  <select v-model="theme">
    <option value="editorial">Editorial</option>
    <option value="nero">Nero</option>
    <option value="avorio">Avorio</option>
    <option value="colorblind">Colorblind</option>
  </select>
</template>
```

## Nuxt 3 Notes

For SSR, wrap WC/Canvas in `<ClientOnly>`. Configure custom elements in `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  vue: { compilerOptions: { isCustomElement: (tag) => tag.startsWith('mn-') } }
});
```
