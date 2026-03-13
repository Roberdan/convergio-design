import { mkdirSync, readdirSync, copyFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Copy static assets (images, vendor stubs) to dist/.
 * Fonts are handled separately by build-fonts.mjs.
 */

function copyDir(src, dest) {
  if (!existsSync(src)) return 0;
  mkdirSync(dest, { recursive: true });
  let count = 0;
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    if (entry.name === '.gitkeep') continue;
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      count += copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
      count++;
    }
  }
  return count;
}

const pairs = [
  ['src/assets', 'dist/assets'],
  ['src/vendor', 'dist/vendor'],
];

for (const [src, dest] of pairs) {
  const n = copyDir(src, dest);
  if (n > 0) {
    console.log(`Assets: copied ${n} file(s) from ${src} → ${dest}`);
  } else {
    console.log(`Assets: skipped ${src} (not found or empty)`);
  }
}
