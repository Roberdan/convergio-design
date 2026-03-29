import { describe, expect, it } from 'vitest';
import {
  createOpsDashboardConfig,
} from '../../starters/ops-dashboard/src/ops-config.js';

describe('ops-dashboard config', () => {
  it('returns a config with dashboard strip zones', () => {
    const config = createOpsDashboardConfig();

    expect(config.dashboardStrip).toBeDefined();
    expect(config.dashboardStrip.length).toBeGreaterThan(0);
  });

  it('includes gauge, pipeline, trend, and board strip zone types', () => {
    const config = createOpsDashboardConfig();
    const types = config.dashboardStrip.map((z) => z.type);

    expect(types).toContain('gauge');
    expect(types).toContain('pipeline');
    expect(types).toContain('trend');
    expect(types).toContain('board');
  });

  it('returns alert config with endpoint and refresh interval', () => {
    const config = createOpsDashboardConfig();

    expect(config.alerts).toBeDefined();
    expect(config.alerts?.endpoint).toBe('/api/alerts');
    expect(typeof config.alerts?.refreshInterval).toBe('number');
    expect(config.alerts?.refreshInterval).toBeGreaterThan(0);
  });

  it('returns status board with columns and swimlanes', () => {
    const config = createOpsDashboardConfig();

    expect(config.statusBoard).toBeDefined();
    expect(config.statusBoard?.columns.length).toBeGreaterThan(0);
    expect(config.statusBoard?.swimlanes.length).toBeGreaterThan(0);
    expect(config.statusBoard?.columns).toContain('Service');
    expect(config.statusBoard?.columns).toContain('Status');
    expect(config.statusBoard?.swimlanes).toContain('Production');
  });

  it('returns filters with realistic operational categories', () => {
    const config = createOpsDashboardConfig();

    expect(config.filters).toBeDefined();
    const ids = (config.filters ?? []).map((f) => f.id);
    expect(ids).toContain('environment');
    expect(ids).toContain('service');
  });

  it('merges overrides with base config', () => {
    const config = createOpsDashboardConfig({
      title: 'Platform SRE Dashboard',
      timelineView: { range: 'week' },
    });

    expect(config.title).toBe('Platform SRE Dashboard');
    expect(config.timelineView?.range).toBe('week');
    expect(config.dashboardStrip.length).toBeGreaterThan(0);
    expect(config.alerts?.endpoint).toBe('/api/alerts');
  });

  it('overrides dashboardStrip zones when provided', () => {
    const customZones = [
      { type: 'gauge' as const, label: 'Kubernetes Node CPU', dataEndpoint: '/api/k8s/cpu' },
      { type: 'trend' as const, label: 'HTTP 5xx Rate', dataEndpoint: '/api/http/errors' },
    ];

    const config = createOpsDashboardConfig({ dashboardStrip: customZones });

    expect(config.dashboardStrip).toHaveLength(2);
    expect(config.dashboardStrip[0].label).toBe('Kubernetes Node CPU');
  });

  it('has dashboard mode set', () => {
    const config = createOpsDashboardConfig();
    expect(config.mode).toBe('dashboard');
  });

  it('has executiveStrip feature flag enabled by default', () => {
    const config = createOpsDashboardConfig();
    expect(config.featureFlags.executiveStrip).toBe(true);
  });

  it('merges feature flags with overrides', () => {
    const config = createOpsDashboardConfig({
      featureFlags: { agentPanel: true },
    });

    expect(config.featureFlags.agentPanel).toBe(true);
    expect(config.featureFlags.executiveStrip).toBe(true);
  });
});
