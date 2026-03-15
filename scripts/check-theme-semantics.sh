#!/bin/bash
set -euo pipefail
# check-theme-semantics.sh — Catch the specific regression: var(--bianco-caldo) used as
# text color in unscoped component CSS. This token is static (#fafafa white) and renders
# invisible on the Avorio light theme. All text that adapts between themes must use
# var(--mn-text) / var(--mn-text-muted) instead.
#
# SKIPPED (intentional or already theme-gated):
#   themes-*, utilities.css, base.css, toast/tooltip overlays, ghost-light button
#   Lines already scoped: body.mn-*, .mn-avorio, .mn-nero, .mn-section-*
# Version: 1.1.0

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CSS_DIR="$ROOT/src/css"
errors=0

FILE_SKIP="themes-|utilities|base\.css|extended-toast|extended-tooltip|tokens"

echo "Checking for var(--bianco-caldo) as unscoped text color..."

while IFS= read -r match; do
  file="${match%%:*}"
  line="${match#*:*:}"

  # Skip allowed files
  if echo "$file" | grep -qE "$FILE_SKIP"; then continue; fi

  # Skip lines already scoped to a theme, section, or containing explicit contrast bg
  if echo "$line" | grep -qE "body\.mn-|grigio-scuro|ghost-light|\.mn-avorio|\.mn-nero|\.mn-colorblind|\.mn-section-|intentional:|bianco-caldo\b.*bianco-caldo"; then continue; fi

  echo "FAIL: $file"
  echo "  Line $(echo "$match" | cut -d: -f2): $line"
  echo "  Fix : Replace with var(--mn-text) — white in Nero, black in Avorio"
  ((errors++)) || true
done < <(grep -rn "[^-]color[[:space:]]*:[[:space:]]*var(--bianco-caldo)" "$CSS_DIR" 2>/dev/null || true)

echo ""
if [[ $errors -gt 0 ]]; then
  echo "FAIL: $errors unscoped --bianco-caldo text violations."
  echo "These will render invisible on light themes (Avorio). Use var(--mn-text)."
  exit 1
else
  echo "OK: No unscoped --bianco-caldo text violations."
  exit 0
fi
