# Resources Library — Design Spec

**Date:** 2026-05-19
**Status:** Approved

## Overview

A public `/resources/` section on samstrasser.com for documents and templates Sam commonly shares with clients. Clients can read, copy, download, or open documents in Google Docs. A small number of bespoke documents are hand-crafted HTML pages linked from the same index.

## File Structure

```
/resources/
  index.html          ← listing page (manually updated when adding a doc)
  viewer.html         ← shared template for rendering markdown docs
  docs/
    <doc-name>.md     ← markdown source files (one per document)
  bespoke/
    <doc-name>.html   ← hand-crafted HTML pages
```

## Pages

### `/resources/index.html` — Listing Page

- A flat list of all documents (target: <5 initially)
- Each entry is a **boxed row** containing: title (linked), type badge, one-line description, and small inline action hints
- Standard markdown docs link to `viewer.html?doc=<name>`
- Bespoke docs link directly to their `.html` file
- Type badges distinguish "Template", "Guide", etc.
- Fully public — no auth

### `/resources/viewer.html` — Document Viewer

- Reads `?doc=<name>` query param, fetches `/resources/docs/<name>.md`
- Renders markdown client-side using **marked.js** (loaded from CDN)
- Page layout: back link ("← Resources"), then doc title + metadata, then action buttons, then a horizontal rule, then rendered content

**Action buttons (inline, below the title):**

| Button | Behavior |
|---|---|
| Copy Markdown | `navigator.clipboard.writeText()` on raw markdown; label briefly shows "Copied!" |
| Download | `<a href="docs/<name>.md" download>` — browser native file download |
| Open in Google Docs | Opens `https://docs.google.com/document/create?usp=sharing&url=<encoded absolute .md URL>` in new tab |

> **Note:** The Google Docs import URL approach is experimental. If Google's importer doesn't accept a raw GitHub Pages URL, the fallback is to link to a pre-created Google Doc for each document.

### Bespoke Pages (`/resources/bespoke/<name>.html`)

- Fully hand-crafted HTML — no shared template, no standard action buttons
- May or may not include downloadable materials at Sam's discretion
- Linked from the index like any other doc

## Navigation

A "Resources & Templates" link is added to the bottom of `index.html`, below a `<hr>`, consistent with the existing no-nav-bar site style.

## Styling

- Inherits the existing `style/light.css` and `style/dark.css` (via `?mode=dark` query param support)
- No new CSS framework — extend existing stylesheets as needed for the boxed-row layout and action buttons

## Workflow for Adding a New Document

1. Write the document in markdown, save to `/resources/docs/<name>.md`
2. Add one boxed-row entry to `/resources/index.html`
3. Deploy — done

For bespoke docs: write the HTML file to `/resources/bespoke/<name>.html`, add an entry to the index.

## Out of Scope

- Authentication or access control
- Search or filtering (revisit if list grows beyond ~10 items)
- Server-side rendering or a static site generator
- Automated sync between markdown and Google Docs
