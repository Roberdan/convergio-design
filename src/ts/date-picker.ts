/**
 * Maranello Luce Design - Date picker
 * Themed calendar dropdown for date selection.
 */

import type { DatePickerOptions, DatePickerController } from './core/types';

interface ParsedDate { y: number; m: number; d: number }

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

let activePicker: HTMLDivElement | null = null;

function closePicker(): void {
  if (activePicker) { activePicker.remove(); activePicker = null; }
  document.removeEventListener('mousedown', onDocClick);
  document.removeEventListener('keydown', onDocKey);
}

function onDocClick(e: MouseEvent): void {
  if (activePicker && e.target instanceof Node && !activePicker.contains(e.target)) closePicker();
}

function onDocKey(e: KeyboardEvent): void {
  if (e.key === 'Escape') closePicker();
}

function pad(n: number): string { return n < 10 ? '0' + n : String(n); }
function toDateStr(y: number, m: number, d: number): string { return y + '-' + pad(m + 1) + '-' + pad(d); }
function parseVal(s?: string): ParsedDate | null {
  if (!s) return null;
  const p = String(s).split('-');
  return { y: Number(p[0]), m: Number(p[1]) - 1, d: Number(p[2]) || 1 };
}
function daysInMonth(y: number, m: number): number { return new Date(y, m + 1, 0).getDate(); }
function firstDayOfWeek(y: number, m: number): number {
  const d = new Date(y, m, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

/** Create a date picker dropdown anchored to an element. */
export function datePicker(anchor: HTMLElement, opts?: DatePickerOptions): DatePickerController {
  closePicker();
  const options = opts ?? {};

  let sel = parseVal(options.value);
  let viewY = sel ? sel.y : new Date().getFullYear();
  let viewM = sel ? sel.m : new Date().getMonth();
  const minD = parseVal(options.min);
  const maxD = parseVal(options.max);
  const todayY = new Date().getFullYear();
  const todayM = new Date().getMonth();
  const todayD = new Date().getDate();

  const picker = document.createElement('div');
  picker.className = 'mn-date-picker';
  activePicker = picker;

  function isDisabled(y: number, m: number, d: number): boolean {
    const ds = toDateStr(y, m, d);
    if (minD && ds < toDateStr(minD.y, minD.m, minD.d)) return true;
    if (maxD && ds > toDateStr(maxD.y, maxD.m, maxD.d)) return true;
    return false;
  }

  function renderCalendar(): void {
    picker.innerHTML = '';
    const nav = document.createElement('div');
    nav.className = 'mn-date-picker__nav';
    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'mn-date-picker__nav-btn';
    prevBtn.innerHTML = '\u25C0';
    prevBtn.title = 'Previous month';
    prevBtn.addEventListener('click', () => {
      viewM--;
      if (viewM < 0) { viewM = 11; viewY--; }
      renderCalendar();
    });
    const title = document.createElement('span');
    title.className = 'mn-date-picker__month-title';
    title.textContent = MONTHS[viewM] + ' ' + viewY;
    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'mn-date-picker__nav-btn';
    nextBtn.innerHTML = '\u25B6';
    nextBtn.title = 'Next month';
    nextBtn.addEventListener('click', () => {
      viewM++;
      if (viewM > 11) { viewM = 0; viewY++; }
      renderCalendar();
    });
    nav.appendChild(prevBtn);
    nav.appendChild(title);
    nav.appendChild(nextBtn);
    picker.appendChild(nav);

    const dayHeaders = document.createElement('div');
    dayHeaders.className = 'mn-date-picker__days-header';
    DAYS.forEach((d) => {
      const dh = document.createElement('span');
      dh.className = 'mn-date-picker__day-name';
      dh.textContent = d;
      dayHeaders.appendChild(dh);
    });
    picker.appendChild(dayHeaders);

    const grid = document.createElement('div');
    grid.className = 'mn-date-picker__grid';
    const startDay = firstDayOfWeek(viewY, viewM);
    const totalDays = daysInMonth(viewY, viewM);

    for (let e = 0; e < startDay; e++) {
      const empty = document.createElement('span');
      empty.className = 'mn-date-picker__day mn-date-picker__day--empty';
      grid.appendChild(empty);
    }

    for (let d = 1; d <= totalDays; d++) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'mn-date-picker__day';
      cell.textContent = String(d);
      const disabled = isDisabled(viewY, viewM, d);
      if (disabled) cell.classList.add('mn-date-picker__day--disabled');
      cell.disabled = disabled;
      if (d === todayD && viewM === todayM && viewY === todayY) {
        cell.classList.add('mn-date-picker__day--today');
      }
      if (sel && d === sel.d && viewM === sel.m && viewY === sel.y) {
        cell.classList.add('mn-date-picker__day--selected');
      }
      const day = d;
      cell.addEventListener('click', () => {
        sel = { y: viewY, m: viewM, d: day };
        if (options.onSelect) options.onSelect(toDateStr(viewY, viewM, day));
        closePicker();
      });
      grid.appendChild(cell);
    }
    picker.appendChild(grid);

    const todayBtn = document.createElement('button');
    todayBtn.type = 'button';
    todayBtn.className = 'mn-date-picker__today-btn';
    todayBtn.textContent = 'Today';
    todayBtn.addEventListener('click', () => {
      viewY = todayY;
      viewM = todayM;
      sel = { y: todayY, m: todayM, d: todayD };
      if (options.onSelect) options.onSelect(toDateStr(todayY, todayM, todayD));
      closePicker();
    });
    picker.appendChild(todayBtn);
  }

  renderCalendar();
  anchor.style.position = 'relative';
  anchor.appendChild(picker);

  setTimeout(() => {
    const first = picker.querySelector('.mn-date-picker__day:not(.mn-date-picker__day--empty)');
    if (first instanceof HTMLElement) first.focus();
  }, 50);

  setTimeout(() => {
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onDocKey);
  }, 0);

  return { close: closePicker };
}
