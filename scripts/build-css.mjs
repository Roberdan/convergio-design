import { mkdirSync, readdirSync, copyFileSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const srcDir = 'src/css';
const outDir = 'dist/css';

mkdirSync(outDir, { recursive: true });

if (!existsSync(srcDir)) {
  console.log('CSS: no source files found');
  process.exit(0);
}

const files = readdirSync(srcDir).filter((f) => f.endsWith('.css'));

// Copy individual CSS files for selective import
for (const file of files) {
  copyFileSync(join(srcDir, file), join(outDir, file));
}
console.log(`CSS: copied ${files.length} individual file(s) to ${outDir}`);

// Concatenate into single maranello.css
// index.css first (if exists) as it contains @import order, then all others
const ordered = [];
if (files.includes('index.css')) ordered.push('index.css');
for (const f of files) {
  if (f !== 'index.css') ordered.push(f);
}

const concat = ordered
  .map((f) => {
    const content = readFileSync(join(srcDir, f), 'utf8');
    return `/* === ${f} === */\n${content}`;
  })
  .join('\n\n');

writeFileSync(join(outDir, 'maranello.css'), concat, 'utf8');
console.log(`CSS: created maranello.css (${(Buffer.byteLength(concat) / 1024).toFixed(1)} KB)`);

// Minify: strip comments, collapse whitespace, trim
const minified = concat
  .replace(/\/\*[\s\S]*?\*\//g, '')  // remove comments
  .replace(/\s+/g, ' ')             // collapse whitespace
  .replace(/\s*([{};:,>~+])\s*/g, '$1') // remove space around punctuation
  .replace(/;}/g, '}')              // remove trailing semicolons
  .trim();

writeFileSync(join(outDir, 'maranello.min.css'), minified, 'utf8');
console.log(`CSS: created maranello.min.css (${(Buffer.byteLength(minified) / 1024).toFixed(1)} KB)`);
