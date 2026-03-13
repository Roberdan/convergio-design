/**
 * Maranello Luce Design - Gauge color palette definitions
 * Theme-aware palette for FerrariGauge, including avorio/nero/colorblind variants.
 */

export interface GaugeRenderPalette {
  numbers: string;
  centerValue: string;
  centerUnit: string;
  centerLabel: string;
  muted: string;
  dimmed: string;
  subDialLabel: string;
  tickMajor: string;
  tickHalf: string;
  tickMinor: string;
  highlightRing: string;
  trackAlpha: string;
  arcDot: string;
  needleTail: string;
  needleTip: string;
  capOuter: string[];
  capInner: string[];
  capCenter: string;
  subDialBg: string[];
  subDialBorder: string;
  subDialTrack: string;
  odometerBg: string;
  odometerBorder: string;
  odometerText: string;
  ledLabel: null;
  axisLabel: string;
  axisTitle: string;
  gridScale: string;
  sparkMonth: string;
  sparkLabel: string;
  quadrant: string;
  quadrantDim: string;
  quadrantHi: string;
}

/** Build the gauge palette based on current body theme class. */
export function buildGaugePalette(accent: string): GaugeRenderPalette {
  const D: GaugeRenderPalette = {
    numbers: '#c8c8c8', centerValue: '#fafafa', centerUnit: '#9e9e9e',
    centerLabel: '#666', muted: '#666', dimmed: '#555', subDialLabel: '#888',
    tickMajor: '#D4A826', tickHalf: '#9A7B1C', tickMinor: '#5a4a14',
    highlightRing: 'rgba(255,255,255,0.04)', trackAlpha: 'rgba(255,255,255,0.06)',
    arcDot: '#fff', needleTail: '#555', needleTip: '#fff',
    capOuter: ['#888', '#555', '#333', '#1a1a1a'],
    capInner: ['#aaa', '#666', '#2a2a2a'], capCenter: '#444',
    subDialBg: ['#222', '#111'], subDialBorder: '#3a3a3a',
    subDialTrack: 'rgba(255,255,255,0.08)',
    odometerBg: '#1a1a1a', odometerBorder: '#333', odometerText: '#fafafa',
    ledLabel: null, axisLabel: '#888', axisTitle: '#9e9e9e',
    gridScale: '#666', sparkMonth: '#555', sparkLabel: '#666',
    quadrant: '#888', quadrantDim: '#555', quadrantHi: accent,
  };

  const cl = document.body.classList;
  if (cl.contains('mn-avorio')) {
    return { ...D,
      subDialBg: ['#e8e4dc', '#ddd8ce'], subDialBorder: '#c0b9ad',
      odometerBg: '#f0ede6', odometerBorder: '#ccc', odometerText: '#1a1a1a',
    };
  }
  if (cl.contains('mn-colorblind')) {
    return { ...D,
      tickMajor: '#FFB000', tickHalf: '#B87E00', tickMinor: '#7A5400',
      quadrantHi: '#0072B2',
    };
  }
  if (cl.contains('mn-nero')) {
    return { ...D,
      numbers: '#e0e0e0', subDialBg: ['#1a1a1a', '#0a0a0a'],
      subDialBorder: '#2a2a2a', odometerBg: '#0a0a0a', odometerBorder: '#222',
    };
  }
  return D;
}
