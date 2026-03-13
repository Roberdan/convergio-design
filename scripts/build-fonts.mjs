import { mkdirSync, readdirSync, copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const srcDir = 'src/fonts';
const outDir = 'dist/fonts';

mkdirSync(outDir, { recursive: true });

if (!existsSync(srcDir)) {
  console.log('Fonts: no source files found');
  process.exit(0);
}

const files = readdirSync(srcDir);

for (const file of files) {
  copyFileSync(join(srcDir, file), join(outDir, file));
}

console.log(`Fonts: copied ${files.length} file(s) to ${outDir}`);
