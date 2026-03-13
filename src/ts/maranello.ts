/**
 * Maranello Luce Design - IIFE namespace bootstrap
 * Provides backward compatibility with window.Maranello for legacy consumers.
 */

import { VERSION, eventBus, cssVar, getTheme, setTheme, cycleTheme } from './index';
import { getAccent, clamp, lerp, hiDpiCanvas, createElement } from './core/utils';
import { formatNumber, formatDate, debounce, throttle } from './core/utils';
import { icons, renderIcon, iconCatalog } from './icons';
import { initThemeToggle } from './theme-toggle';
import { toast } from './toast';
import { openModal, closeModal } from './modal';
import { commandPalette } from './command-palette';
import { loginScreen } from './login';
import { systemStatus } from './system-status';
import { profileMenu } from './profile-menu';

declare global {
  interface Window {
    Maranello: Record<string, unknown>;
  }
}

const M: Record<string, unknown> = (window.Maranello = window.Maranello || {});

// Version
M.VERSION = VERSION;

// Event system (backward-compatible M.emit / M.on / M.off)
M.emit = (name: string, detail: unknown) => eventBus.emit(name, detail);
M.on = (name: string, handler: (detail: unknown) => void) => eventBus.on(name, handler);
M.off = (name: string, handler: (detail: unknown) => void) => eventBus.off(name, handler);

// Theme utilities
M.getTheme = getTheme;
M.setTheme = setTheme;
M.cycleTheme = cycleTheme;
M.initThemeToggle = initThemeToggle;
M.getAccent = getAccent;
M.cssVar = cssVar;

// Shared helpers
M.clamp = clamp;
M.lerp = lerp;
M.hiDpiCanvas = hiDpiCanvas;
M.createElement = createElement;
M.formatNumber = formatNumber;
M.formatDate = formatDate;
M.debounce = debounce;
M.throttle = throttle;

// Icons
M.icons = icons;
M.renderIcon = renderIcon;
M.iconCatalog = iconCatalog;

// Components
M.toast = toast;
M.openModal = openModal;
M.closeModal = closeModal;
M.commandPalette = commandPalette;
M.loginScreen = loginScreen;
M.systemStatus = systemStatus;
M.profileMenu = profileMenu;

// Internal namespaces (populated by component modules at load time)
M._charts = M._charts || {};
M._gantt = M._gantt || {};
M._gauge = M._gauge || {};
M._dataTable = M._dataTable || {};
M._mapView = M._mapView || {};
M._okrPanel = M._okrPanel || {};
M._chat = M._chat || {};
M._detailPanel = M._detailPanel || {};
M._forms = M._forms || {};
M._speedo = M._speedo || {};
M._hbar = M._hbar || {};
M._funnelHelpers = M._funnelHelpers || {};
M._loginDom = M._loginDom || {};
M._profileDom = M._profileDom || {};
M._a11yDom = M._a11yDom || {};
M._ferrariControls = M._ferrariControls || {};

export { M as Maranello };
