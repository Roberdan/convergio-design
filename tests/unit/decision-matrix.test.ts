/**
 * Unit tests for Decision Matrix weighted scoring table.
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { decisionMatrix } from '../../src/ts/decision-matrix';

const CRITERIA = [
  { id: 'cost', label: 'Cost Efficiency', weight: 3 },
  { id: 'scalability', label: 'Scalability', weight: 5 },
  { id: 'security', label: 'Security', weight: 4 },
];

const ALTERNATIVES = [
  { id: 'aws', label: 'AWS', scores: { cost: 7, scalability: 9, security: 8 } },
  { id: 'azure', label: 'Azure', scores: { cost: 6, scalability: 8, security: 9 } },
  { id: 'gcp', label: 'GCP', scores: { cost: 8, scalability: 7, security: 7 } },
];

describe('decisionMatrix', () => {
  let container: HTMLDivElement;

  beforeEach(() => { container = document.createElement('div'); });

  it('renders a table with role=grid', () => {
    const ctrl = decisionMatrix(container, { criteria: CRITERIA, alternatives: ALTERNATIVES });
    const table = container.querySelector('table[role="grid"]');
    expect(table).not.toBeNull();
    ctrl.destroy();
  });

  it('renders all alternatives as rows', () => {
    const ctrl = decisionMatrix(container, { criteria: CRITERIA, alternatives: ALTERNATIVES });
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
    ctrl.destroy();
  });

  it('renders all criteria as column headers', () => {
    const ctrl = decisionMatrix(container, { criteria: CRITERIA, alternatives: ALTERNATIVES });
    const headers = container.querySelectorAll('thead th');
    // Alternative + 3 criteria + Score = 5
    expect(headers.length).toBe(5);
    expect(container.innerHTML).toContain('Cost Efficiency');
    expect(container.innerHTML).toContain('Scalability');
    ctrl.destroy();
  });

  it('displays weighted total scores', () => {
    const ctrl = decisionMatrix(container, { criteria: CRITERIA, alternatives: ALTERNATIVES });
    const totals = container.querySelectorAll('.mn-decision-matrix__total');
    expect(totals.length).toBe(3);
    // Each total should be a numeric string like "8.3"
    for (const t of totals) {
      expect(parseFloat(t.textContent ?? '')).toBeGreaterThan(0);
    }
    ctrl.destroy();
  });

  it('displays rank numbers for alternatives', () => {
    const ctrl = decisionMatrix(container, { criteria: CRITERIA, alternatives: ALTERNATIVES });
    const ranks = container.querySelectorAll('.mn-decision-matrix__rank');
    expect(ranks.length).toBe(3);
    const rankTexts = [...ranks].map(r => r.textContent);
    expect(rankTexts).toContain('#1');
    expect(rankTexts).toContain('#2');
    expect(rankTexts).toContain('#3');
    ctrl.destroy();
  });

  it('marks the top-ranked row as winner', () => {
    const ctrl = decisionMatrix(container, { criteria: CRITERIA, alternatives: ALTERNATIVES });
    const winnerRow = container.querySelector('.mn-decision-matrix__row--winner');
    expect(winnerRow).not.toBeNull();
    ctrl.destroy();
  });

  it('update replaces alternatives and re-renders', () => {
    const ctrl = decisionMatrix(container, { criteria: CRITERIA, alternatives: ALTERNATIVES });
    ctrl.update([
      { id: 'oracle', label: 'Oracle Cloud', scores: { cost: 5, scalability: 6, security: 8 } },
    ]);
    expect(container.textContent).toContain('Oracle Cloud');
    expect(container.textContent).not.toContain('AWS');
    ctrl.destroy();
  });

  it('getScores returns a deep copy of alternatives', () => {
    const ctrl = decisionMatrix(container, { criteria: CRITERIA, alternatives: ALTERNATIVES });
    const scores = ctrl.getScores();
    expect(scores.length).toBe(3);
    scores[0].label = 'Mutated';
    expect(ctrl.getScores()[0].label).toBe('AWS');
    ctrl.destroy();
  });

  it('shows weight annotations in header', () => {
    const ctrl = decisionMatrix(container, { criteria: CRITERIA, alternatives: ALTERNATIVES });
    expect(container.innerHTML).toContain('(w:3)');
    expect(container.innerHTML).toContain('(w:5)');
    ctrl.destroy();
  });

  it('score cells have background style attribute for color coding', () => {
    const ctrl = decisionMatrix(container, { criteria: CRITERIA, alternatives: ALTERNATIVES });
    const scoreCells = container.querySelectorAll('td[data-alt]');
    expect(scoreCells.length).toBeGreaterThan(0);
    for (const cell of scoreCells) {
      expect(cell.getAttribute('style')).toContain('background');
    }
    ctrl.destroy();
  });

  it('editable cells get tabindex for keyboard access', () => {
    const ctrl = decisionMatrix(container, {
      criteria: CRITERIA, alternatives: ALTERNATIVES, editable: true,
    });
    const editCells = container.querySelectorAll('td[tabindex="0"]');
    expect(editCells.length).toBe(9); // 3 alternatives x 3 criteria
    ctrl.destroy();
  });

  it('destroy clears container content', () => {
    const ctrl = decisionMatrix(container, { criteria: CRITERIA, alternatives: ALTERNATIVES });
    ctrl.destroy();
    expect(container.innerHTML).toBe('');
  });
});
