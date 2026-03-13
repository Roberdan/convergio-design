import { build } from 'esbuild';

const banner = `/* Maranello Luce Design v2.0.0 | MIT | github.com/Roberdan/MaranelloLuceDesign */`;

const shared = {
  bundle: true,
  sourcemap: true,
  treeShaking: true,
  external: ['mapbox-gl'],
  banner: { js: banner },
  target: 'es2020',
};

async function run() {
  await Promise.all([
    // ESM — tree-shakeable, individual modules
    build({
      ...shared,
      entryPoints: ['src/ts/index.ts'],
      format: 'esm',
      outdir: 'dist/esm',
      splitting: true,
    }),
    // CJS — single bundle for Node.js/SSR
    build({
      ...shared,
      entryPoints: ['src/ts/index.ts'],
      format: 'cjs',
      outdir: 'dist/cjs',
      outExtension: { '.js': '.cjs' },
    }),
    // IIFE — single bundle for CDN/script tag, exposes window.Maranello
    build({
      ...shared,
      entryPoints: ['src/ts/maranello.ts'],
      format: 'iife',
      outfile: 'dist/iife/maranello.min.js',
      globalName: 'Maranello',
      minify: true,
    }),
  ]);

  console.log('Build complete: ESM, CJS, IIFE');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
