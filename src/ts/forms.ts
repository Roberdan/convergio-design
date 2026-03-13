/**
 * Maranello Luce Design - Forms facade
 * Aggregates validation and widget initialization.
 */

import {
  validateForm,
  validateField,
  initLiveValidation,
  addValidator,
  validators,
  defaultMessages,
} from './forms-validate';
import type { FormValidator } from './forms-validate';
import {
  initAutoResize,
  initTagInput,
  initPasswordToggle,
  initFileUpload,
  initFormSteps,
  initInlineEdit,
  initCharCounter,
  initSearchClear,
} from './forms-widgets';

function qsa(root: Document | HTMLElement, ...sels: string[]): NodeListOf<HTMLElement> {
  return root.querySelectorAll(sels.join(',')) as NodeListOf<HTMLElement>;
}

/** Initialize all form widgets within a root element. */
export function initForms(root: Document | HTMLElement = document): void {
  qsa(root, '[data-mn-validate]', '.mn-form[data-live-validate]').forEach(
    (form) => initLiveValidation(form),
  );
  qsa(root, '[data-mn-autoresize]', '.mn-form-textarea--auto').forEach(
    (el) => initAutoResize(el as HTMLTextAreaElement),
  );
  qsa(root, '[data-mn-tags]', '.mn-tag-input').forEach(
    (el) => initTagInput(el),
  );
  qsa(root, '[data-mn-password-toggle]', '.mn-password-wrap').forEach(
    (el) => initPasswordToggle(el),
  );
  qsa(root, '[data-mn-file-upload]', '.mn-file-upload').forEach(
    (el) => initFileUpload(el),
  );
  qsa(root, '[data-mn-steps]', '.mn-form-steps').forEach(
    (el) => initFormSteps(el),
  );
  qsa(root, '[data-mn-inline-edit]', '.mn-inline-edit').forEach(
    (el) => initInlineEdit(el),
  );
  qsa(root, '[data-mn-char-counter]', '.mn-field__counter').forEach(
    (el) => initCharCounter(el),
  );
  qsa(root, '[data-mn-search-clear]', '.mn-search-input').forEach(
    (el) => initSearchClear(el),
  );
}

/** Forms public API object. */
export const forms = {
  init: initForms,
  initAll: initForms,
  validate: validateForm,
  validateField,
  initLiveValidation,
  addValidator,
  get validators() { return validators; },
  get defaultMessages() { return defaultMessages; },
  initAutoResize,
  initTagInput,
  initPasswordToggle,
  initFileUpload,
  initFormSteps,
  initInlineEdit,
  initCharCounter,
  initSearchClear,
} as const;
