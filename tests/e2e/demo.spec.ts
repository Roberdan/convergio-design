/**
 * E2E tests for the demo page (static file checks).
 * Does not require a running server — reads the HTML file directly
 * and verifies expected structure and content.
 */
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DEMO_DIR = join(import.meta.dirname, '../../demo');
const DEMO_HTML = join(DEMO_DIR, 'index.html');

describe('demo/index.html structure', () => {
  it('demo HTML file exists', () => {
    expect(existsSync(DEMO_HTML)).toBe(true);
  });

  it('has correct document title', () => {
    const html = readFileSync(DEMO_HTML, 'utf8');
    expect(html).toContain('Maranello Luce Design System');
  });

  it('loads maranello.css stylesheet', () => {
    const html = readFileSync(DEMO_HTML, 'utf8');
    expect(html).toContain('maranello.css');
  });

  it('starts with mn-nero theme class on body', () => {
    const html = readFileSync(DEMO_HTML, 'utf8');
    expect(html).toMatch(/<body[^>]+mn-nero/);
  });

  it('includes theme toggle web component', () => {
    const html = readFileSync(DEMO_HTML, 'utf8');
    expect(html).toContain('mn-theme-toggle');
  });

  it('has a skip-to-content link for accessibility', () => {
    const html = readFileSync(DEMO_HTML, 'utf8');
    expect(html).toContain('mn-skip-link');
  });

  it('contains demo navigation', () => {
    const html = readFileSync(DEMO_HTML, 'utf8');
    expect(html).toContain('demo-nav');
  });

  it('has lang attribute on html element', () => {
    const html = readFileSync(DEMO_HTML, 'utf8');
    expect(html).toMatch(/<html[^>]+lang="/);
  });

  it('contains demo-root container', () => {
    const html = readFileSync(DEMO_HTML, 'utf8');
    expect(html).toContain('demo-root');
  });

  it('references local fonts stylesheet', () => {
    const html = readFileSync(DEMO_HTML, 'utf8');
    expect(html).toContain('local-fonts.css');
  });
});

describe('demo/app.js exists', () => {
  it('demo app script file is present', () => {
    expect(existsSync(join(DEMO_DIR, 'app.js'))).toBe(true);
  });
});

describe('demo sections directory', () => {
  it('sections directory exists', () => {
    expect(existsSync(join(DEMO_DIR, 'sections'))).toBe(true);
  });
});
