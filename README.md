# DIMS Intern Handbook

An interactive, offline HTML handbook that onboards new interns to **DIMS** and CNS — from zero
knowledge of drones, AI, and web software, to understanding the whole platform.

## How to open it

Just open **`index.html`** in any web browser (double-click it). No server, no install, no internet
required for the core experience. It works fully offline; only the embedded YouTube thumbnails and a
few "official docs" links need the internet.

> Tip: to read offline on the go, open any chapter and press the **⎙ PDF** button (top-right) to
> save/print that page as a PDF.

## What's inside (21 chapters)

- **Start Here (00–02)** — what DIMS is, the company, the 6 projects.
- **Foundations (03–06)** — drones, software/web, AI & computer vision, maps/3D/digital-twins, each from scratch.
- **The Hardware (07–10)** — DJI Dock 3, Matrice 4TD, Matrice 300/350 RTK, sensors & payloads.
- **The Software (11–16)** — DJI's tools, then the DIMS platform architecture, backend, frontend, AI, and the showcase prototype.
- **The Projects + Reference (17–20)** — the 6 CNS projects, a master glossary, a dev-setup guide, and videos to watch.

## Features

- Live sidebar navigation with page filter, prev/next paging, breadcrumbs, and read-time estimates.
- Hover any dotted term for an instant definition (all collected in the Glossary, chapter 18).
- Collapsible "deep-dive" boxes, comparison tabs, analogy boxes, spec cards, and copy-able code.
- Real DIMS console screenshots, official DJI product photos, custom diagrams, and curated videos.
- Print-to-PDF on every page. Fully responsive (works on phone/tablet).

## How it's built (for maintainers)

Plain static HTML/CSS/JS — no build step, no framework.

```
index.html                 home / learning-path
pages/NN-*.html            one file per chapter (only the content; the shell is shared)
assets/css/handbook.css    the house style
assets/js/manifest.js      SINGLE SOURCE OF TRUTH: the page list + the glossary
assets/js/handbook.js      runtime: builds sidebar/topbar/pager, tooltips, tabs, video facades
assets/img/                screenshots · dji photos · diagrams
_AUTHORING-GUIDE.md        the exact house-style spec for writing/adding a chapter
```

### To add or edit a chapter
1. Read `_AUTHORING-GUIDE.md` (the component catalog + skeleton).
2. Copy `pages/01-what-is-dims.html` as a starting template.
3. Add the page to the `pages` array in `assets/js/manifest.js` (this auto-wires the nav + pager).
4. To add a glossary term, add it to the `glossary` object in `manifest.js` — it appears in the
   Glossary page and as a hover-tooltip everywhere automatically.

## Privacy

This handbook is intentionally **technical only** — it contains no budgets, funding amounts,
salaries, equity, or other commercial/personal information.
