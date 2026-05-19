# Resources Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/resources/` section on samstrasser.com where clients can browse, read, copy, download, and open markdown documents in Google Docs.

**Architecture:** A flat static directory — `resources/index.html` lists all docs as boxed rows; `resources/viewer.html` is a shared template that fetches any `.md` file from `resources/docs/`, renders it with marked.js, and provides Copy / Download / Google Docs actions. Bespoke docs are hand-crafted HTML files linked directly from the index. No build step; deploy by committing files.

**Tech Stack:** Plain HTML, CSS (extending existing light.css / dark.css), vanilla JS, marked.js v9 (CDN), GitHub Pages.

---

## File Map

| Action | Path | Purpose |
|---|---|---|
| Modify | `style/light.css` | Add resource row + button styles |
| Modify | `style/dark.css` | Dark-mode variants of same |
| Create | `resources/index.html` | Document listing page |
| Create | `resources/docs/hiring-loop.md` | Sample doc for testing |
| Create | `resources/viewer.html` | Shared markdown viewer + actions |

---

## Task 1: Add resource styles to light.css and dark.css

**Files:**
- Modify: `style/light.css`
- Modify: `style/dark.css`

- [ ] **Step 1: Append resource styles to `style/light.css`**

Add this block to the end of the file:

```css
/* Resource index rows */
.resource-row {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 14px 16px;
  margin-bottom: 12px;
  background: #fff;
}
.resource-row-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}
.resource-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  text-decoration: none;
}
.resource-title:hover { text-decoration: underline; }
.resource-badge {
  font-size: 0.7rem;
  background: #f0f0f0;
  color: #666;
  padding: 2px 8px;
  border-radius: 3px;
  white-space: nowrap;
  flex-shrink: 0;
}
.resource-desc {
  margin: 6px 0 6px;
  color: #555;
  font-size: 0.9rem;
}
.resource-hints {
  font-size: 0.75rem;
  color: #999;
  margin: 0;
}
/* Viewer */
.resource-back { margin-bottom: 1.5em; }
.resource-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 0.8em 0 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid #e5e5e5;
}
.btn {
  display: inline-block;
  font-family: Georgia, serif;
  font-size: 0.75rem;
  padding: 5px 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: #fff;
  color: #444;
  cursor: pointer;
  text-decoration: none;
  line-height: 1.4;
}
.btn:hover { background: #f5f5f5; }
.btn-primary {
  border-color: #4285f4;
  background: #4285f4;
  color: #fff;
}
.btn-primary:hover { background: #3367d6; border-color: #3367d6; }
```

- [ ] **Step 2: Append resource styles to `style/dark.css`**

Add this block to the end of `style/dark.css`:

```css
/* Resource index rows */
.resource-row {
  border: 1px solid #333;
  border-radius: 6px;
  padding: 14px 16px;
  margin-bottom: 12px;
  background: #1a1a1a;
}
.resource-row-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}
.resource-title {
  font-size: 1rem;
  font-weight: 600;
  color: #f0ece4;
  text-decoration: none;
}
.resource-title:hover { text-decoration: underline; }
.resource-badge {
  font-size: 0.7rem;
  background: #2a2a2a;
  color: #908880;
  padding: 2px 8px;
  border-radius: 3px;
  white-space: nowrap;
  flex-shrink: 0;
}
.resource-desc {
  margin: 6px 0 6px;
  color: #c8c0b4;
  font-size: 0.9rem;
}
.resource-hints {
  font-size: 0.75rem;
  color: #555;
  margin: 0;
}
/* Viewer */
.resource-back { margin-bottom: 1.5em; }
.resource-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 0.8em 0 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid #333;
}
.btn {
  display: inline-block;
  font-family: Georgia, serif;
  font-size: 0.75rem;
  padding: 5px 12px;
  border: 1px solid #444;
  border-radius: 3px;
  background: #1a1a1a;
  color: #c8c0b4;
  cursor: pointer;
  text-decoration: none;
  line-height: 1.4;
}
.btn:hover { background: #252525; }
.btn-primary {
  border-color: #4285f4;
  background: #4285f4;
  color: #fff;
}
.btn-primary:hover { background: #3367d6; border-color: #3367d6; }
```

- [ ] **Step 3: Commit**

```bash
git add style/light.css style/dark.css
git commit -m "feat: add resource row and button styles"
```

---

## Task 2: Create the resources index page

**Files:**
- Create: `resources/index.html`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p resources
```

Create `resources/index.html` with this content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resources — Sam Strasser</title>
  <link id="theme" rel="stylesheet" href="../style/light.css">
  <script>
    if (new URLSearchParams(location.search).get('mode') === 'dark')
      document.getElementById('theme').href = '../style/dark.css';
  </script>
</head>
<body>
  <h1>Resources</h1>
  <p>Documents and templates I commonly share with clients.</p>

  <div class="resource-row">
    <div class="resource-row-header">
      <a class="resource-title" href="viewer.html?doc=hiring-loop">Engineering Hiring Loop</a>
      <span class="resource-badge">Template</span>
    </div>
    <p class="resource-desc">A structured process for hiring engineering leaders — scorecard, interview guide, and debrief format.</p>
    <p class="resource-hints">View · Copy · Download · Google Docs</p>
  </div>

</body>
</html>
```

- [ ] **Step 2: Verify the index page looks correct**

Start a local server from the repo root:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/resources/` in a browser. You should see:
- "Resources" heading
- One boxed row with title, "Template" badge, description, and hint text
- Light mode styles applied correctly

Then open `http://localhost:8080/resources/?mode=dark` and confirm dark mode applies.

- [ ] **Step 3: Commit**

```bash
git add resources/index.html
git commit -m "feat: add resources index page"
```

---

## Task 3: Create a sample markdown document

**Files:**
- Create: `resources/docs/hiring-loop.md`

- [ ] **Step 1: Create the docs directory and sample file**

```bash
mkdir -p resources/docs
```

Create `resources/docs/hiring-loop.md`:

```markdown
# Engineering Hiring Loop

A structured process for hiring engineering leaders, from defining the role through final offer.

## Scorecard

Evaluate candidates across four dimensions:

1. **Technical depth** — Can they go deep when needed? Do they know what they don't know?
2. **Leadership style** — How do they motivate, unblock, and grow their team?
3. **Communication** — How do they communicate up, down, and across the org?
4. **Cultural fit** — Do their values align with the company's at this stage?

## Interview Guide

### Round 1: Hiring Manager Screen (30 min)

- What drew you to this role?
- Tell me about a time you had to push back on a product or business decision. What happened?
- How do you think about technical debt?

### Round 2: Technical Deep Dive (60 min)

- Walk me through a system you're proud of building.
- How do you approach incident response on a team you lead?
- What's your philosophy on code review?

### Round 3: Leadership & Culture (45 min)

- Tell me about your best hire. What made them great?
- Describe a time a team member wasn't working out. How did you handle it?
- What does a healthy engineering culture look like to you?

## Debrief Format

After each round, each interviewer submits a scorecard before the debrief call. The debrief should:

1. Start with a go/no-go poll (thumbs up / thumbs down, no discussion first)
2. Discuss any split decisions
3. Identify gaps to address in the next round or reference checks
```

- [ ] **Step 2: Commit**

```bash
git add resources/docs/hiring-loop.md
git commit -m "feat: add hiring loop sample document"
```

---

## Task 4: Create the viewer page

**Files:**
- Create: `resources/viewer.html`

- [ ] **Step 1: Create `resources/viewer.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resources — Sam Strasser</title>
  <link id="theme" rel="stylesheet" href="../style/light.css">
  <script>
    if (new URLSearchParams(location.search).get('mode') === 'dark')
      document.getElementById('theme').href = '../style/dark.css';
  </script>
</head>
<body>
  <p class="resource-back"><a href="/resources/">← Resources</a></p>
  <div id="doc-header"></div>
  <hr>
  <div id="doc-content"></div>

  <script src="https://cdn.jsdelivr.net/npm/marked@9/marked.min.js"></script>
  <script>
    var params = new URLSearchParams(location.search);
    var docName = params.get('doc');

    if (!docName) {
      document.getElementById('doc-content').textContent = 'No document specified.';
    } else {
      var mdPath = 'docs/' + docName + '.md';
      fetch(mdPath)
        .then(function(r) {
          if (!r.ok) throw new Error('Not found');
          return r.text();
        })
        .then(function(markdown) {
          var titleMatch = markdown.match(/^#\s+(.+)$/m);
          var title = titleMatch ? titleMatch[1] : docName;
          document.title = title + ' — Sam Strasser';

          var absUrl = location.origin + '/resources/' + mdPath;
          var googleDocsUrl = 'https://docs.google.com/document/create?usp=sharing&url=' + encodeURIComponent(absUrl);

          document.getElementById('doc-header').innerHTML =
            '<h1>' + title + '</h1>' +
            '<div class="resource-actions">' +
              '<button class="btn" id="copy-btn">Copy Markdown</button>' +
              '<a class="btn" href="' + mdPath + '" download="' + docName + '.md">Download</a>' +
              '<a class="btn btn-primary" href="' + googleDocsUrl + '" target="_blank" rel="noopener">Open in Google Docs</a>' +
            '</div>';

          document.getElementById('copy-btn').addEventListener('click', function() {
            navigator.clipboard.writeText(markdown).then(function() {
              var btn = document.getElementById('copy-btn');
              btn.textContent = 'Copied!';
              setTimeout(function() { btn.textContent = 'Copy Markdown'; }, 2000);
            });
          });

          document.getElementById('doc-content').innerHTML = marked.parse(markdown);
        })
        .catch(function() {
          document.getElementById('doc-content').textContent = 'Document not found.';
        });
    }
  </script>
</body>
</html>
```

- [ ] **Step 2: Verify the viewer works locally**

With the local server still running (`python3 -m http.server 8080` from repo root):

Open `http://localhost:8080/resources/viewer.html?doc=hiring-loop`

Check:
- "← Resources" back link appears and links to `/resources/`
- Title renders as "Engineering Hiring Loop"
- Three action buttons appear below the title
- A horizontal rule separates header from content
- Markdown content renders correctly (headings, lists, bold)
- "Copy Markdown" button briefly shows "Copied!" when clicked (check clipboard contents)
- "Download" button triggers a file download named `hiring-loop.md`

- [ ] **Step 3: Test dark mode**

Open `http://localhost:8080/resources/viewer.html?doc=hiring-loop&mode=dark`

Check:
- Dark background, light text
- Buttons have correct dark styles
- Resource row border is visible against dark background

- [ ] **Step 4: Test error state**

Open `http://localhost:8080/resources/viewer.html?doc=nonexistent`

Expected: page shows "Document not found." without crashing.

Open `http://localhost:8080/resources/viewer.html` (no `?doc=` param)

Expected: page shows "No document specified."

- [ ] **Step 5: Test the Google Docs button**

> **Note:** This button won't work on localhost — Google Docs can't import from `localhost`. Deploy to GitHub Pages first (Task 5), then test the live URL.

Visually confirm the button renders correctly and its `href` is properly constructed (inspect element — it should be `https://docs.google.com/document/create?usp=sharing&url=http%3A%2F%2Flocalhost%3A8080%2Fresources%2Fdocs%2Fhiring-loop.md`).

- [ ] **Step 6: Commit**

```bash
git add resources/viewer.html
git commit -m "feat: add markdown viewer with copy/download/google-docs actions"
```

---

## Task 5: Deploy and test Google Docs import

**Files:** None (deploy only)

- [ ] **Step 1: Push to GitHub Pages**

```bash
git push origin ref
```

Wait ~60 seconds for GitHub Pages to deploy.

- [ ] **Step 2: Verify the live index page**

Open `https://samstrasser.com/resources/` (replace with actual domain if different). Confirm the boxed row renders correctly.

- [ ] **Step 3: Test Google Docs import on the live site**

Open `https://samstrasser.com/resources/viewer.html?doc=hiring-loop`

Click "Open in Google Docs." Two possible outcomes:

**If it works:** Google Docs opens with the document content imported. Done.

**If it fails (Google rejects the URL):** The fallback is to replace the "Open in Google Docs" button with a link to a pre-created Google Doc. For each markdown doc:
1. Create a Google Doc manually, paste the content.
2. Set sharing to "Anyone with the link can view."
3. In `resources/viewer.html`, change the Google Docs `href` from the dynamic `googleDocsUrl` to the static Google Doc URL.

To do this cleanly, add a `data-google-doc` attribute to the index entry and pass it as a query param to the viewer. But only implement this fallback if the import URL approach fails.

- [ ] **Step 4: Test Copy and Download on the live site**

- Copy: click "Copy Markdown," paste into a text editor, confirm raw markdown appears
- Download: click "Download," confirm `hiring-loop.md` downloads with correct content

---

## Adding Future Documents

Once the above is built, adding a new markdown doc is:

1. Create `resources/docs/<name>.md`
2. Add a `.resource-row` block to `resources/index.html` pointing to `viewer.html?doc=<name>`
3. Commit and push

For a bespoke doc:

1. Create `resources/bespoke/<name>.html` (hand-crafted, no shared template)
2. Add a `.resource-row` block to the index linking directly to `bespoke/<name>.html`
3. The `.resource-hints` line can be omitted or say "Custom page"
4. Commit and push
