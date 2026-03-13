/**
 * Build verification tests.
 * Checks that dist/ outputs exist, meet size limits, and contain no domain-specific tokens.
 */
import { describe, it, expect } from 'vitest';
import { existsSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = join(import.meta.dirname, '../../dist');

// Domain-specific strings that must NOT appear in published dist
const FORBIDDEN_TOKENS = [
  'VirtualBPM',
  'convergio',
  'ca-virtualbpm',
  'livelymoss',
  'roberdan',
];

describe('dist output files exist', () => {
  it('ESM bundle exists', () => {
    expect(existsSync(join(DIST, 'esm/index.js'))).toBe(true);
  });

  it('CJS bundle exists', () => {
    expect(existsSync(join(DIST, 'cjs/index.cjs'))).toBe(true);
  });

  it('IIFE bundle exists', () => {
    expect(existsSync(join(DIST, 'iife/maranello.min.js'))).toBe(true);
  });

  it('TypeScript declaration file exists', () => {
    expect(existsSync(join(DIST, 'types/ts/index.d.ts'))).toBe(true);
  });
});

describe('IIFE bundle size', () => {
  const IIFE_MAX_BYTES = 100 * 1024; // 100 KB

  it(`IIFE bundle is under ${IIFE_MAX_BYTES / 1024} KB`, () => {
    const path = join(DIST, 'iife/maranello.min.js');
    if (!existsSync(path)) return; // skip if not built
    const { size } = statSync(path);
    expect(size).toBeLessThan(IIFE_MAX_BYTES);
  });
});

describe('dist scrub check — no domain tokens', () => {
  const filesToCheck = [
    'iife/maranello.min.js',
    'esm/index.js',
    'cjs/index.cjs',
  ];

  for (const relPath of filesToCheck) {
    it(`${relPath} contains no project-specific identifiers`, () => {
      const fullPath = join(DIST, relPath);
      if (!existsSync(fullPath)) return; // skip if not built
      const content = readFileSync(fullPath, 'utf8');
      for (const token of FORBIDDEN_TOKENS) {
        expect(
          content,
          `Found forbidden token "${token}" in ${relPath}`,
        ).not.toContain(token);
      }
    });
  }
});

describe('TypeScript declarations', () => {
  it('declaration file exports VERSION', () => {
    const path = join(DIST, 'types/ts/index.d.ts');
    if (!existsSync(path)) return;
    const content = readFileSync(path, 'utf8');
    expect(content).toContain('VERSION');
  });

  it('declaration file exports EventBus', () => {
    const path = join(DIST, 'types/ts/index.d.ts');
    if (!existsSync(path)) return;
    const content = readFileSync(path, 'utf8');
    expect(content).toContain('EventBus');
  });

  it('declaration file exports cssVar utility', () => {
    const path = join(DIST, 'types/ts/index.d.ts');
    if (!existsSync(path)) return;
    const content = readFileSync(path, 'utf8');
    expect(content).toContain('cssVar');
  });
});
