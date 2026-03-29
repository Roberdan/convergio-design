import { describe, expect, it } from 'vitest';
import { createCockpitConfig } from '../src/index';

describe('createCockpitConfig', () => {
  it('returns a config with required hero KPIs', () => {
    const config = createCockpitConfig();
    expect(config.heroKpis).toBeDefined();
    expect(config.heroKpis.length).toBeGreaterThan(0);
  });

  it('hero KPIs have required id, label, and value fields', () => {
    const config = createCockpitConfig();
    for (const kpi of config.heroKpis) {
      expect(kpi.id).toBeTruthy();
      expect(kpi.label).toBeTruthy();
      expect(kpi.value).toBeTruthy();
    }
  });

  it('includes revenue KPI with upward trend', () => {
    const config = createCockpitConfig();
    const revenue = config.heroKpis.find((k) => k.id === 'revenue');
    expect(revenue).toBeDefined();
    expect(revenue?.trend).toBe('up');
    expect(revenue?.unit).toBe('USD');
  });

  it('returns a narrative hero with headline and summary', () => {
    const config = createCockpitConfig();
    expect(config.narrativeHero).toBeDefined();
    expect(config.narrativeHero?.headline).toBeTruthy();
    expect(config.narrativeHero?.summary.length).toBeGreaterThan(50);
  });

  it('returns board summaries with columns and row count', () => {
    const config = createCockpitConfig();
    expect(config.boardSummaries).toBeDefined();
    expect(config.boardSummaries?.length).toBeGreaterThan(0);
    for (const board of config.boardSummaries ?? []) {
      expect(board.id).toBeTruthy();
      expect(board.title).toBeTruthy();
      expect(board.columns.length).toBeGreaterThan(0);
      expect(board.rows).toBeGreaterThan(0);
    }
  });

  it('returns drill-down paths mapped to KPI ids', () => {
    const config = createCockpitConfig();
    expect(config.drillDownPaths).toBeDefined();
    expect(config.drillDownPaths?.['revenue']).toBe('/revenue');
    expect(config.drillDownPaths?.['headcount']).toBe('/people');
  });

  it('sets cockpit mode and editorial theme by default', () => {
    const config = createCockpitConfig();
    expect(config.mode).toBe('cockpit');
    expect(config.defaultTheme).toBe('editorial');
  });

  it('includes CEO/CFO nav tabs: Overview, Revenue, Operations, Portfolio, People', () => {
    const config = createCockpitConfig();
    const tabIds = config.panel?.tabs?.map((t) => t.id) ?? [];
    expect(tabIds).toContain('overview');
    expect(tabIds).toContain('revenue');
    expect(tabIds).toContain('operations');
    expect(tabIds).toContain('portfolio');
    expect(tabIds).toContain('people');
  });

  it('enables executiveStrip and agentPanel feature flags', () => {
    const config = createCockpitConfig();
    expect(config.featureFlags.executiveStrip).toBe(true);
    expect(config.featureFlags.agentPanel).toBe(true);
  });

  it('merges overrides into the base config', () => {
    const config = createCockpitConfig({ title: 'CFO Dashboard', id: 'cfo-view' });
    expect(config.title).toBe('CFO Dashboard');
    expect(config.id).toBe('cfo-view');
    expect(config.heroKpis.length).toBeGreaterThan(0);
  });

  it('allows overriding hero KPIs while preserving other defaults', () => {
    const customKpis = [
      { id: 'capex', label: 'CapEx YTD', value: '$310M', trend: 'down' as const, unit: 'USD' },
    ];
    const config = createCockpitConfig({ heroKpis: customKpis });
    expect(config.heroKpis).toHaveLength(1);
    expect(config.heroKpis[0].id).toBe('capex');
    expect(config.mode).toBe('cockpit');
  });

  it('allows overriding feature flags partially', () => {
    const config = createCockpitConfig({ featureFlags: { agentPanel: false } });
    expect(config.featureFlags.agentPanel).toBe(false);
    expect(config.featureFlags.executiveStrip).toBe(true);
  });

  it('returns a frozen config object', () => {
    const config = createCockpitConfig();
    expect(Object.isFrozen(config)).toBe(true);
  });
});
