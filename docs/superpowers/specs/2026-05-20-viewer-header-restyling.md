# Viewer Header Restyling

**Date:** 2026-05-20
**Status:** Approved

## Summary

Restyle `resources/viewer.html` header to put the document title and action buttons on a single flex row, separated from content by one rule below. Remove the redundant `<hr>` element that currently creates a double-divider.

## Current State

The viewer header renders as two stacked blocks:
1. `<h1>` title
2. `.resource-actions` div (Copy + Download buttons) with its own `border-bottom`

Below those, an `<hr>` element adds a second dividing line before the content. This creates visual redundancy.

Buttons use an opaque white (`#fff`) background in light mode and near-black (`#1a1a1a`) in dark mode.

## Target State (B1)

Title and buttons share a single flex row:

```
← Resources

[Engineering Hiring Loop]          [Copy Markdown] [Download]
────────────────────────────────────────────────────────────
Body content begins here...
```

One rule below the row. No `<hr>`. Buttons use transparent backgrounds so they read as lightweight controls rather than primary actions.

## Changes

### `resources/viewer.html`
- Remove `<hr>` between `#doc-header` and `#doc-content`
- In the JS that builds `doc-header` innerHTML, wrap the `<h1>` and `.resource-actions` div in a new `.resource-header` container div

### `resources/style.css`
- Add `.resource-header`: `display: flex; justify-content: space-between; align-items: center; gap: 16px; border-bottom: 1px solid #e5e5e5; padding-bottom: 14px; margin-bottom: 20px;`
- Add `.resource-header h1 { margin: 0; }` to neutralize the main stylesheet's h1 margin within this context
- Remove `border-bottom`, `padding-bottom`, and `margin` from `.resource-actions` (those move to `.resource-header`)
- Keep `flex-shrink: 0` on `.resource-actions` so buttons don't wrap under long titles
- Change `.btn` background from `#fff` to `transparent` in light mode; remove the opaque dark fill (`#1a1a1a`) in dark mode
- Add `html.dark .resource-header { border-bottom-color: #333; }`

## Non-Goals

- No change to `resources/index.html` or the index row styles
- No change to `style/light.css` or `style/dark.css`
- No change to button colors — just transparency
