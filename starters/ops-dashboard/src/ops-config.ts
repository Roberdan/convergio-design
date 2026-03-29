import type { ShellConfig } from '../../shared-shell/src/config/shell-schema';

export interface StripZoneConfig {
  type: 'gauge' | 'pipeline' | 'trend' | 'board';
  label: string;
  dataEndpoint?: string;
}

export interface AlertConfig {
  endpoint: string;
  refreshInterval: number;
}

export interface StatusBoardConfig {
  columns: string[];
  swimlanes: string[];
}

export interface TimelineViewConfig {
  range: 'day' | 'week' | 'month';
}

export interface FilterConfig {
  id: string;
  label: string;
  type: 'select' | 'daterange' | 'search';
}

export interface OpsDashboardConfig extends ShellConfig {
  dashboardStrip: StripZoneConfig[];
  alerts?: AlertConfig;
  statusBoard?: StatusBoardConfig;
  timelineView?: TimelineViewConfig;
  filters?: FilterConfig[];
}

const DEFAULT_TOOLBAR_ACTIONS = [
  { id: 'refresh', label: 'Refresh', tone: 'default' as const },
  { id: 'export', label: 'Export', tone: 'default' as const },
  { id: 'settings', label: 'Settings', tone: 'default' as const },
];

const DEFAULT_STRIP_ZONES: StripZoneConfig[] = [
  {
    type: 'gauge',
    label: 'CPU Utilization',
    dataEndpoint: '/api/metrics/cpu',
  },
  {
    type: 'pipeline',
    label: 'CI/CD Pipeline',
    dataEndpoint: '/api/pipelines/status',
  },
  {
    type: 'trend',
    label: 'Error Rate (1h)',
    dataEndpoint: '/api/metrics/error-rate',
  },
  {
    type: 'board',
    label: 'Service Health',
    dataEndpoint: '/api/services/health',
  },
];

const DEFAULT_FILTERS: FilterConfig[] = [
  { id: 'environment', label: 'Environment', type: 'select' },
  { id: 'time-range', label: 'Time Range', type: 'daterange' },
  { id: 'service', label: 'Service', type: 'search' },
  { id: 'severity', label: 'Severity', type: 'select' },
];

const DEFAULT_STATUS_BOARD: StatusBoardConfig = {
  columns: ['Service', 'Status', 'Uptime', 'Last Incident', 'On-Call'],
  swimlanes: ['Production', 'Staging', 'DR'],
};

const DEFAULT_ALERT_CONFIG: AlertConfig = {
  endpoint: '/api/alerts',
  refreshInterval: 30000,
};

export function createOpsDashboardConfig(
  overrides: Partial<OpsDashboardConfig> = {},
): OpsDashboardConfig {
  const base: OpsDashboardConfig = {
    id: 'ops-dashboard',
    title: 'IT Operations Center',
    subtitle: 'Real-time infrastructure and service monitoring',
    mode: 'dashboard',
    defaultTheme: 'nero',
    toolbarActions: DEFAULT_TOOLBAR_ACTIONS,
    quickActions: [
      { id: 'new-incident', label: 'New Incident', tone: 'danger' },
      { id: 'runbook', label: 'Runbook', tone: 'default' },
    ],
    featureFlags: {
      agentPanel: false,
      detailPanel: true,
      executiveStrip: true,
      commandPalette: true,
    },
    dashboardStrip: DEFAULT_STRIP_ZONES,
    alerts: DEFAULT_ALERT_CONFIG,
    statusBoard: DEFAULT_STATUS_BOARD,
    timelineView: { range: 'day' },
    filters: DEFAULT_FILTERS,
  };

  return {
    ...base,
    ...overrides,
    toolbarActions: overrides.toolbarActions ?? base.toolbarActions,
    featureFlags: {
      ...base.featureFlags,
      ...(overrides.featureFlags ?? {}),
    },
    dashboardStrip: overrides.dashboardStrip ?? base.dashboardStrip,
    filters: overrides.filters ?? base.filters,
  };
}
