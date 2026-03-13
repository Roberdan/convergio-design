import { mkdirSync, readdirSync, copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const srcDir = 'src/wc';
const outDir = 'dist/wc';

mkdirSync(outDir, { recursive: true });

if (!existsSync(srcDir)) {
  console.log('WC: no source files found');
  process.exit(0);
}

const files = readdirSync(srcDir).filter(
  (f) => f.endsWith('.js') || f.endsWith('.ts') || f.endsWith('.d.ts')
);

for (const file of files) {
  copyFileSync(join(srcDir, file), join(outDir, file));
}

console.log(`WC: copied ${files.length} file(s) to ${outDir}`);
